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

// Daily digest — called every 5 mins by cron-job.org
// Sends once per day after 7PM PHT, retries until successful
app.post("/api/send-digest", async (req, res) => {
  if (req.headers["x-cron-secret"] !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // current time in PHT (UTC+8)
  const now = new Date();
  const pht = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const phtHour = pht.getHours();

  const force = req.query.force === "1";
  if (!force && phtHour < 19) {
    return res.json({ skip: true, reason: "Before 7PM PHT" });
  }

  const dateStr = `${pht.getFullYear()}-${String(pht.getMonth() + 1).padStart(2, "0")}-${String(pht.getDate()).padStart(2, "0")}`;

  const existing = await prisma.digestLog.findUnique({ where: { date: dateStr } });
  if (existing) {
    return res.json({ skip: true, reason: "Already sent today" });
  }

  const all = await prisma.rSVP.findMany({ orderBy: { createdAt: "asc" } });
  if (all.length === 0) {
    return res.json({ skip: true, reason: "No RSVPs yet" });
  }

  const attending = all.filter((r) => r.attending === "yes").length;
  const notAttending = all.filter((r) => r.attending === "no").length;

  const table = all
    .map((r, i) =>
      `${i + 1}. ${r.name} | ${r.phone} | ${r.email || "-"} | ${r.attending} | guests: ${r.guestCount ?? "-"} | ${new Date(r.createdAt).toLocaleDateString("en-PH")}`
    )
    .join("\n");

  const recipients = ["deguzmankinlie@gmail.com", "kinsellshere@gmail.com"];
  for (const to_email of recipients) {
    const res2 = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: { to_email, date: dateStr, total: all.length, attending, not_attending: notAttending, table },
      }),
    });
    if (!res2.ok) {
      const text = await res2.text();
      throw new Error(`EmailJS ${res2.status}: ${text}`);
    }
  }

  await prisma.digestLog.create({ data: { date: dateStr, sentAt: new Date() } });

  res.json({ ok: true, total: all.length, date: dateStr });
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
