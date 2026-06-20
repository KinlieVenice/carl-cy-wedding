/*
  Warnings:

  - You are about to drop the column `meal` on the `RSVP` table. All the data in the column will be lost.
  - Added the required column `phone` to the `RSVP` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RSVP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "attending" TEXT NOT NULL,
    "guestCount" INTEGER,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_RSVP" ("attending", "createdAt", "guestCount", "id", "message", "name") SELECT "attending", "createdAt", "guestCount", "id", "message", "name" FROM "RSVP";
DROP TABLE "RSVP";
ALTER TABLE "new_RSVP" RENAME TO "RSVP";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
