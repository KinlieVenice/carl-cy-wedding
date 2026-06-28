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
    "https://carl-cy-wedding.site",
    "https://www.carl-cy-wedding.site",
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
