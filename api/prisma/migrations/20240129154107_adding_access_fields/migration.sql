/*
  Warnings:

  - Added the required column `access` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invited` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "user_email" TEXT NOT NULL DEFAULT '',
    "access" TEXT NOT NULL,
    "invited" TEXT NOT NULL,
    CONSTRAINT "Schedule_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("dateEnd", "dateStart", "description", "id", "user_email") SELECT "dateEnd", "dateStart", "description", "id", "user_email" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
