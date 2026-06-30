import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

const app = express();
app.set("trust proxy", 1);

const prisma = new PrismaClient();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://carlcywedding.site",
    "https://www.carlcywedding.site",
  ],
}));
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
}));

const rsvpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many RSVP submissions from this device. Please try again later." },
});

app.post("/api/rsvp", rsvpLimiter, async (req, res) => {
  const { name, phone, email, attending, message } = req.body;
  if (!name?.trim() || !phone?.trim() || !attending) {
    return res.status(400).json({ error: "Name, phone, and attendance are required." });
  }
  try {
    const rsvp = await prisma.rSVP.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        attending,
        message: message?.trim() || null,
      },
    });
    res.json({ ok: true, id: rsvp.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

// manually trigger to send RSVP list to both emails
// GET version: open in browser/phone — https://carlcywedding.site/api/send-digest?key=kin_cy_carl_0401
app.get("/api/send-digest", async (req, res) => {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).send("Unauthorized");
  }
  return handleDigest(req, res);
});

app.post("/api/send-digest", async (req, res) => {
  if (req.headers["x-cron-secret"] !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return handleDigest(req, res);
});

async function handleDigest(_req, res) {

  try {
    const all = await prisma.rSVP.findMany({ orderBy: { createdAt: "asc" } });
    if (all.length === 0) {
      return res.json({ skip: true, reason: "No RSVPs yet" });
    }

    const attending = all.filter((r) => r.attending === "yes").length;
    const notAttending = all.filter((r) => r.attending === "no").length;
    const dateStr = new Date().toLocaleDateString("en-PH", { timeZone: "Asia/Manila", year: "numeric", month: "long", day: "numeric" });

    const rows = all.map((r, i) => `
      <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f9f9f9"}">
        <td style="padding:8px 12px;border:1px solid #e0e0e0">${i + 1}</td>
        <td style="padding:8px 12px;border:1px solid #e0e0e0">${r.name}</td>
        <td style="padding:8px 12px;border:1px solid #e0e0e0;color:${r.attending === "yes" ? "#2e7d32" : "#c62828"};font-weight:600">${r.attending === "yes" ? "Attending" : "Not Attending"}</td>
        <td style="padding:8px 12px;border:1px solid #e0e0e0">${r.phone}</td>
        <td style="padding:8px 12px;border:1px solid #e0e0e0">${new Date(r.createdAt).toLocaleDateString("en-PH")}</td>
      </tr>`).join("");

    const html_table = `
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
        <thead>
          <tr style="background:#722F37;color:#fff">
            <th style="padding:10px 12px;border:1px solid #5a1f25;text-align:left">#</th>
            <th style="padding:10px 12px;border:1px solid #5a1f25;text-align:left">Name</th>
            <th style="padding:10px 12px;border:1px solid #5a1f25;text-align:left">Attending</th>
            <th style="padding:10px 12px;border:1px solid #5a1f25;text-align:left">Phone</th>
            <th style="padding:10px 12px;border:1px solid #5a1f25;text-align:left">Date</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;

    const recipients = ["deguzmankinlie@gmail.com"];
    for (const to_email of recipients) {
      const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: { to_email, date: dateStr, total: all.length, attending, not_attending: notAttending, html_table },
        }),
      });
      if (!r.ok) throw new Error(`EmailJS ${r.status}: ${await r.text()}`);
    }

    res.json({ ok: true, total: all.length, attending, notAttending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
}

app.get("/api/rsvp/check-name", async (req, res) => {
  const { name } = req.query;
  if (!name?.trim()) return res.json({ exists: false });
  try {
    const all = await prisma.rSVP.findMany({ select: { name: true } });
    const normalized = name.trim().toLowerCase();
    const match = all.find(r => r.name.toLowerCase() === normalized);
    res.json({ exists: !!match, matchedName: match?.name ?? null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ exists: false });
  }
});

app.get("/api/rsvp/carycyadmin", async (_req, res) => {
  try {
    const all = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.put("/api/rsvp/carycyadmin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, phone, email, attending, message } = req.body;
  if (!name?.trim() || !phone?.trim() || !attending) {
    return res.status(400).json({ error: "Name, phone, and attendance are required." });
  }
  try {
    const rsvp = await prisma.rSVP.update({
      where: { id },
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        attending,
        message: message?.trim() || null,
      },
    });
    res.json({ ok: true, rsvp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.delete("/api/rsvp/carycyadmin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.rSVP.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

export default app;
