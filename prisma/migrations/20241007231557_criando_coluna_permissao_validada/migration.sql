/*
  Warnings:

  - Added the required column `loginErrado` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "IPAutorizado" TEXT NOT NULL,
    "loginErrado" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_users" ("IPAutorizado", "createdAt", "email", "hash", "id", "nome", "role", "updatedAt", "username") SELECT "IPAutorizado", "createdAt", "email", "hash", "id", "nome", "role", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
