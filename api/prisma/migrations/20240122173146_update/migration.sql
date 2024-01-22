/*
  Warnings:

  - You are about to drop the column `user_id` on the `Schedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "user_email" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Schedule_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("dateEnd", "dateStart", "description", "id") SELECT "dateEnd", "dateStart", "description", "id" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
