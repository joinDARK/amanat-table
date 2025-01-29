/*
  Warnings:

  - You are about to drop the `records` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `columns` on the `role_permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tables_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "records";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tables";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "space" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "credit" INTEGER,
    "deleted_time" DATETIME,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "last_modified_by" TEXT,
    "last_modified_time" DATETIME
);

-- CreateTable
CREATE TABLE "base" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "space_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" REAL NOT NULL,
    "deleted_time" DATETIME,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "last_modified_by" TEXT,
    "last_modified_time" DATETIME,
    CONSTRAINT "base_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "space" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "table_meta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "base_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "db_table_name" TEXT NOT NULL,
    "order" REAL NOT NULL,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_time" DATETIME,
    "deleted_time" DATETIME,
    "created_by" TEXT NOT NULL,
    "last_modified_by" TEXT,
    CONSTRAINT "table_meta_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "base" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "columns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "options" TEXT,
    "type" TEXT NOT NULL,
    "cell_value_type" TEXT NOT NULL,
    "is_multiple_cell_value" BOOLEAN,
    "db_field_type" TEXT NOT NULL,
    "db_field_name" TEXT NOT NULL,
    "not_null" BOOLEAN,
    "unique" BOOLEAN,
    "is_primary" BOOLEAN,
    "is_computed" BOOLEAN,
    "is_lookup" BOOLEAN,
    "is_pending" BOOLEAN,
    "has_error" BOOLEAN,
    "lookup_linked_field_id" TEXT,
    "lookup_options" TEXT,
    "table_id" TEXT NOT NULL,
    "order" REAL NOT NULL,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_time" DATETIME,
    "deleted_time" DATETIME,
    "created_by" TEXT NOT NULL,
    "last_modified_by" TEXT,
    CONSTRAINT "columns_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table_meta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "table_id" TEXT NOT NULL,
    "data" JSONB,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "last_modified_time" DATETIME,
    "last_modified_by" TEXT,
    CONSTRAINT "record_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table_meta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_role_permissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" INTEGER NOT NULL,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "role_permissions_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table_meta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_role_permissions" ("id", "roleId", "tableId") SELECT "id", "roleId", "tableId" FROM "role_permissions";
DROP TABLE "role_permissions";
ALTER TABLE "new_role_permissions" RENAME TO "role_permissions";
CREATE UNIQUE INDEX "role_permissions_roleId_tableId_key" ON "role_permissions"("roleId", "tableId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "base_order_idx" ON "base"("order");

-- CreateIndex
CREATE INDEX "table_meta_order_idx" ON "table_meta"("order");

-- CreateIndex
CREATE INDEX "columns_lookup_linked_field_id_idx" ON "columns"("lookup_linked_field_id");
