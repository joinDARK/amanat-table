/*
  Warnings:

  - You are about to drop the column `lookup_options` on the `columns` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_base" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "space_id" TEXT,
    "name" TEXT NOT NULL,
    "order" REAL NOT NULL,
    "deleted_time" DATETIME,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "last_modified_by" TEXT,
    "last_modified_time" DATETIME,
    CONSTRAINT "base_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "space" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_base" ("created_by", "created_time", "deleted_time", "id", "last_modified_by", "last_modified_time", "name", "order", "space_id") SELECT "created_by", "created_time", "deleted_time", "id", "last_modified_by", "last_modified_time", "name", "order", "space_id" FROM "base";
DROP TABLE "base";
ALTER TABLE "new_base" RENAME TO "base";
CREATE INDEX "base_order_idx" ON "base"("order");
CREATE TABLE "new_columns" (
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
    "table_id" TEXT NOT NULL,
    "order" REAL NOT NULL,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_time" DATETIME,
    "deleted_time" DATETIME,
    "created_by" TEXT NOT NULL,
    "last_modified_by" TEXT,
    CONSTRAINT "columns_lookup_linked_field_id_fkey" FOREIGN KEY ("lookup_linked_field_id") REFERENCES "columns" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "columns_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table_meta" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_columns" ("cell_value_type", "created_by", "created_time", "db_field_name", "db_field_type", "deleted_time", "description", "has_error", "id", "is_computed", "is_lookup", "is_multiple_cell_value", "is_pending", "is_primary", "last_modified_by", "last_modified_time", "lookup_linked_field_id", "name", "not_null", "options", "order", "table_id", "type", "unique") SELECT "cell_value_type", "created_by", "created_time", "db_field_name", "db_field_type", "deleted_time", "description", "has_error", "id", "is_computed", "is_lookup", "is_multiple_cell_value", "is_pending", "is_primary", "last_modified_by", "last_modified_time", "lookup_linked_field_id", "name", "not_null", "options", "order", "table_id", "type", "unique" FROM "columns";
DROP TABLE "columns";
ALTER TABLE "new_columns" RENAME TO "columns";
CREATE INDEX "columns_lookup_linked_field_id_idx" ON "columns"("lookup_linked_field_id");
CREATE TABLE "new_record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "table_id" TEXT NOT NULL,
    "data" JSONB,
    "created_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "last_modified_time" DATETIME,
    "last_modified_by" TEXT,
    CONSTRAINT "record_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table_meta" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_record" ("created_by", "created_time", "data", "id", "last_modified_by", "last_modified_time", "table_id") SELECT "created_by", "created_time", "data", "id", "last_modified_by", "last_modified_time", "table_id" FROM "record";
DROP TABLE "record";
ALTER TABLE "new_record" RENAME TO "record";
CREATE TABLE "new_table_meta" (
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
    CONSTRAINT "table_meta_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "base" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_table_meta" ("base_id", "created_by", "created_time", "db_table_name", "deleted_time", "description", "id", "last_modified_by", "last_modified_time", "name", "order") SELECT "base_id", "created_by", "created_time", "db_table_name", "deleted_time", "description", "id", "last_modified_by", "last_modified_time", "name", "order" FROM "table_meta";
DROP TABLE "table_meta";
ALTER TABLE "new_table_meta" RENAME TO "table_meta";
CREATE INDEX "table_meta_order_idx" ON "table_meta"("order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
