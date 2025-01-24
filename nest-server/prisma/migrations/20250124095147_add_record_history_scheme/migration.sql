-- CreateTable
CREATE TABLE "RecordsHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "tableName" TEXT NOT NULL,
    "diff" JSONB NOT NULL,
    "changedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
