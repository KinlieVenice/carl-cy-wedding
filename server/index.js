import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// POST /api/rsvp — save a guest's RSVP
app.post("/api/rsvp", async (req, res) => {
  const { name, phone, email, attending, guestCount, message } = req.body;

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
        guestCount: attending === "yes" ? (parseInt(guestCount) || 1) : null,
        message: message?.trim() || null,
      },
    });
    res.json({ ok: true, id: rsvp.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

// GET /api/rsvp/all — list all RSVPs (admin view)
app.get("/api/rsvp/all", async (_req, res) => {
  const all = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
  res.json(all);
});

app.listen(PORT, () =>
  console.log(`RSVP server running → http://localhost:${PORT}`)
);
