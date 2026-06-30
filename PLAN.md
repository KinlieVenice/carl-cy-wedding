# Plan: /wedding-pics Upload & Gallery Page + Security Hardening

## Context
Two things to build/fix:
1. `/wedding-pics` page — guests upload photos/videos via Cloudinary, metadata saved to Neon DB
2. Security hardening — RSVP PIN and Admin PIN are currently hardcoded in the frontend JS bundle (readable by anyone via DevTools), and all `/api/rsvp/carycyadmin/*` endpoints have zero server-side auth

**Storage choice: Cloudinary free tier**
- 25 GB storage, 100 MB/file — comfortably fits 50–100 guests' photos + videos
- Unsigned upload preset = guest browser uploads direct to Cloudinary, bypasses Vercel 4.5 MB serverless limit
- Runner-up (ImageKit) has only 3 GB free — too tight for videos

---

## Security Fixes (do first)

### Current vulnerabilities
| Issue | Risk |
|---|---|
| RSVP PIN `"0401"` hardcoded in RSVPModal.jsx | Anyone reads JS bundle → bypasses RSVP gate |
| Admin PIN `"090122"` hardcoded in Admin.jsx | Anyone reads JS bundle → bypasses admin gate |
| `GET /api/rsvp/carycyadmin` — no auth | Anyone who knows the URL gets all guest data |
| `PUT/DELETE /api/rsvp/carycyadmin/:id` — no auth | Anyone can edit or delete RSVPs |

### Fix: PIN validation moves to backend

**New env vars (Vercel dashboard, never in code):**
```
RSVP_PIN=0401
ADMIN_PIN=090122
```

**New API endpoints in `api/index.js`:**

```js
// RSVP PIN verify — returns signed token on success
app.post("/api/rsvp/verify-pin", (req, res) => {
  const { pin } = req.body;
  if (pin !== process.env.RSVP_PIN)
    return res.status(401).json({ error: "Wrong PIN." });
  // simple HMAC token: "rsvp:" + timestamp signed with ADMIN_PIN as secret
  const token = Buffer.from(`rsvp:${Date.now()}`).toString("base64");
  res.json({ token });
});

// Admin PIN verify — returns admin token
app.post("/api/admin/verify-pin", (req, res) => {
  const { pin } = req.body;
  if (pin !== process.env.ADMIN_PIN)
    return res.status(401).json({ error: "Wrong PIN." });
  const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
  res.json({ token });
});
```

**Protect admin endpoints with middleware:**
```js
function requireAdminToken(req, res, next) {
  const token = req.headers["x-admin-token"] || "";
  try {
    const decoded = Buffer.from(token, "base64").toString();
    if (!decoded.startsWith("admin:")) throw new Error();
    const ts = parseInt(decoded.split(":")[1]);
    // token valid for 8 hours
    if (Date.now() - ts > 8 * 60 * 60 * 1000) throw new Error("expired");
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized." });
  }
}
```
Apply to: `GET/PUT/DELETE /api/rsvp/carycyadmin*`

**Frontend changes:**

`RSVPModal.jsx`:
- Remove `const PIN = "0401"`
- On PIN submit → `POST /api/rsvp/verify-pin` → store returned token in `sessionStorage`
- On RSVP form submit → include `x-rsvp-token` header (or just remove RSVP PIN entirely since `/api/rsvp` is already rate-limited — RSVP PIN is lower-stakes)

`Admin.jsx`:
- Remove `const PIN = "090122"`
- On PIN submit → `POST /api/admin/verify-pin` → store `adminToken` in `sessionStorage`
- All admin API calls include `x-admin-token: ${adminToken}` header

> Note: This is "good enough" security for a wedding site. The token is not cryptographically signed (no JWT library needed), but it prevents casual unauthorized access. The admin panel only holds guest names + phone numbers.

---

## /wedding-pics Page

### 0. /wedding-pics PIN gate
Same pattern as RSVP/Admin. Guest must enter a PIN before the upload form + gallery appears.

**New env var:** `WEDDING_PICS_PIN` (Vercel backend)

**New endpoint:**
```js
app.post("/api/wedding-pics/verify-pin", (req, res) => {
  const { pin } = req.body;
  if (pin !== process.env.WEDDING_PICS_PIN)
    return res.status(401).json({ error: "Wrong PIN." });
  const token = Buffer.from(`pics:${Date.now()}`).toString("base64");
  res.json({ token });
});
```

Frontend: PIN entry screen → POST verify → store token in `sessionStorage` → show upload + gallery. Token valid for session (no expiry needed here since gallery is read-only for non-uploaders).

---

### 1. Cloudinary setup (user does manually)
- Sign up → Settings → Upload → Add upload preset → set **Unsigned**, folder `wedding-pics`
- Add to Vercel env vars:
  ```
  VITE_CLOUDINARY_CLOUD_NAME=xxx
  VITE_CLOUDINARY_UPLOAD_PRESET=xxx
  ```

### 2. Prisma: new WeddingPic model
File: `prisma/schema.prisma`
```prisma
model WeddingPic {
  id           Int      @id @default(autoincrement())
  fileUrl      String
  mediaType    String   // "image" | "video"
  uploaderName String
  caption      String?
  uploadedAt   DateTime @default(now())
}
```
Run `npx prisma migrate dev --name add-wedding-pics` then deploy.

### 3. API endpoints (in `api/index.js`)

**POST `/api/wedding-pics`** — save metadata after Cloudinary upload (rate-limited)
```js
app.post("/api/wedding-pics", rsvpLimiter, async (req, res) => {
  const { fileUrl, mediaType, uploaderName, caption } = req.body;
  if (!fileUrl?.startsWith("https://res.cloudinary.com/") || !uploaderName?.trim())
    return res.status(400).json({ error: "Invalid upload." });
  const pic = await prisma.weddingPic.create({
    data: { fileUrl, mediaType, uploaderName: uploaderName.trim(), caption: caption?.trim() || null }
  });
  res.json({ ok: true, id: pic.id });
});
```

**GET `/api/wedding-pics`** — public, fetch all (newest first)
```js
app.get("/api/wedding-pics", async (_req, res) => {
  const pics = await prisma.weddingPic.findMany({ orderBy: { uploadedAt: "desc" } });
  res.json(pics);
});
```

### 4. New page: `src/pages/wedding-pics/WeddingPics.jsx`
Upload flow:
1. Guest enters name + optional caption + picks file (image or video)
2. File uploads directly to Cloudinary via `fetch("https://api.cloudinary.com/v1_1/{cloud_name}/upload", FormData)` — show progress %
3. On success → `secure_url` + `resource_type` → POST to `/api/wedding-pics`
4. New pic prepended to local gallery state

Gallery:
- 2-col responsive grid
- `<img>` for images, `<video controls playsinline>` for videos
- Card shows uploader name + caption + date
- Styled in site's cream/scrapbook aesthetic (matching Home.jsx)

### 5. Routing in `src/App.jsx`
```jsx
if (path === "/wedding-pics") return <WeddingPics />;
```

---

## Files modified
| File | Change |
|---|---|
| `prisma/schema.prisma` | Add WeddingPic model |
| `api/index.js` | Add verify-pin endpoints (rsvp/admin/wedding-pics), requireAdminToken middleware, protect admin routes, add wedding-pics endpoints |
| `src/App.jsx` | Add /wedding-pics route |
| `src/pages/home/RSVPModal.jsx` | Remove hardcoded PIN, call /api/rsvp/verify-pin |
| `src/pages/admin/Admin.jsx` | Remove hardcoded PIN, call /api/admin/verify-pin, send token in all admin requests |
| `src/pages/wedding-pics/WeddingPics.jsx` | New file |

## New env vars
| Var | Where | Notes |
|---|---|---|
| `RSVP_PIN` | Vercel backend | replaces hardcoded "0401" |
| `ADMIN_PIN` | Vercel backend | replaces hardcoded "090122" |
| `WEDDING_PICS_PIN` | Vercel backend | PIN guests use to enter /wedding-pics |
| `VITE_CLOUDINARY_CLOUD_NAME` | Vercel frontend | your Cloudinary cloud name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Vercel frontend | unsigned upload preset name |

## Verification
1. Check DevTools → Sources → RSVPModal bundle → PIN should NOT appear
2. Try `curl /api/rsvp/carycyadmin` without token → should get 401
3. Login to admin with correct PIN → data loads normally
4. Upload photo on /wedding-pics → appears in Cloudinary dashboard + gallery
5. Upload video → plays in gallery
6. Try POST /api/wedding-pics with fake fileUrl not from cloudinary.com → rejected
