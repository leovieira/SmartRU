-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER,
    "neighborhood" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "country", "id", "neighborhood", "number", "state", "street", "updatedAt", "userId", "zipCode") SELECT "city", "country", "id", "neighborhood", "number", "state", "street", "updatedAt", "userId", "zipCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");
CREATE TABLE "new_Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "areaCode" INTEGER NOT NULL,
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
