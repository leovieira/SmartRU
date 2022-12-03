-- AlterTable
ALTER TABLE "User" ADD COLUMN "mercadopagoId" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "areaCode" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("areaCode", "id", "number", "updatedAt", "userId") SELECT "areaCode", "id", "number", "updatedAt", "userId" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
