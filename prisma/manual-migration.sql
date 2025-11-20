-- S3V Trading Group - Manual Database Migration
-- Run this in Supabase SQL Editor if Prisma migrate fails

-- Create Categories Table
CREATE TABLE IF NOT EXISTS "categories" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "icon" TEXT,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories"("slug");

-- Create Products Table
CREATE TABLE IF NOT EXISTS "products" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "sku" TEXT,
  "summary" TEXT,
  "description" TEXT,
  "specs" JSONB,
  "hero_image" TEXT,
  "price" DECIMAL(12,2),
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "highlights" TEXT[],
  "category_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products"("slug");
CREATE INDEX IF NOT EXISTS "products_category_id_idx" ON "products"("category_id");

-- Create Product Media Table
CREATE TABLE IF NOT EXISTS "product_media" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "product_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "product_media_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "product_media_product_id_idx" ON "product_media"("product_id");

-- Create Product Tags Table
CREATE TABLE IF NOT EXISTS "product_tags" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "label" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  UNIQUE("product_id", "label")
);

-- Create Quote Requests Table
CREATE TABLE IF NOT EXISTS "quote_requests" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "company_name" TEXT NOT NULL,
  "contact_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "message" TEXT,
  "items" JSONB,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "source" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "quote_requests_email_idx" ON "quote_requests"("email");

-- Create Team Members Table
CREATE TABLE IF NOT EXISTS "team_members" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "bio" TEXT,
  "photo" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "linkedin" TEXT,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "team_members_priority_idx" ON "team_members"("priority");

-- Create Portfolio Projects Table
CREATE TABLE IF NOT EXISTS "portfolio_projects" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "industry" TEXT NOT NULL,
  "client" TEXT,
  "description" TEXT,
  "challenge" TEXT,
  "solution" TEXT,
  "results" TEXT,
  "hero_image" TEXT,
  "images" TEXT[],
  "completion_date" TIMESTAMP(3),
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "priority" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "portfolio_projects_slug_idx" ON "portfolio_projects"("slug");
CREATE INDEX IF NOT EXISTS "portfolio_projects_status_idx" ON "portfolio_projects"("status");

-- Success message
SELECT 'Migration completed successfully!' as status;

