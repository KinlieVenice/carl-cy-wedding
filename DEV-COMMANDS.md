# Dev Commands

## Compress Images to WebP

Run this once whenever you add new images to `public/images/`:

```powershell
node scripts/compress-images.mjs
```

- Converts all PNG/JPG → WebP at quality 80
- Originals are kept — delete them manually once you've verified WebP looks good
- After running, update any new `src` references in JSX from `.png`/`.jpg` → `.webp`

---

## Preview on Phone (Cloudflare Tunnel)

**Step 1 — Start the dev servers** (two separate terminals):

```powershell
# Terminal 1 — Vite frontend
npm run dev

# Terminal 2 — Express backend
node server/index.js
```

**Step 2 — Start the tunnel** (third terminal, after Vite is running):

```powershell
npx cloudflared tunnel --url http://localhost:5173
```

- Wait for a line like: `https://some-words-here.trycloudflare.com`
- Open that URL on your phone
- If the browser shows a warning, tap **Visit Site** to proceed

---

## Ports

| Service  | Port |
|----------|------|
| Vite     | 5173 |
| Express  | 3001 |
