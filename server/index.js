import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

const app = express();
app.set("trust proxy", 1);
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Global: max 100 requests per 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
}));

// RSVP-specific: max 5 submissions per hour per IP
const rsvpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many RSVP submissions from this device. Please try again later." },
});

// POST /api/rsvp — save a guest's RSVP
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

// GET /api/rsvp/all — list all RSVPs (legacy)
app.get("/api/rsvp/all", async (_req, res) => {
  const all = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
  res.json(all);
});

// GET /api/rsvp/carycyadmin — list all RSVPs
app.get("/api/rsvp/carycyadmin", async (_req, res) => {
  const all = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
  res.json(all);
});

// PUT /api/rsvp/carycyadmin/:id — update an RSVP
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

// DELETE /api/rsvp/carycyadmin/:id — delete an RSVP
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

app.listen(PORT, () =>
  console.log(`RSVP server running → http://localhost:${PORT}`)
);
