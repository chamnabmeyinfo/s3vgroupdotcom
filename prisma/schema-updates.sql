-- Add Team and Portfolio tables to support admin management

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
  "updated_at" TIMESTAMP(3) NOT NULL
);

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
  "updated_at" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "team_members_priority_idx" ON "team_members"("priority");
CREATE INDEX IF NOT EXISTS "portfolio_projects_slug_idx" ON "portfolio_projects"("slug");
CREATE INDEX IF NOT EXISTS "portfolio_projects_status_idx" ON "portfolio_projects"("status");

