-- CreateTable
CREATE TABLE "RSVP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "attending" TEXT NOT NULL,
    "guestCount" INTEGER,
    "meal" TEXT,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
