-- S3V Trading Group - Complete Database Reset and Seed
-- This will DROP existing tables and create new ones for the admin backend
-- ⚠️ WARNING: This deletes all existing data!

-- Step 1: Drop existing tables
DROP TABLE IF EXISTS "features" CASCADE;
DROP TABLE IF EXISTS "news_articles" CASCADE;
DROP TABLE IF EXISTS "partners" CASCADE;
DROP TABLE IF EXISTS "products" CASCADE;
DROP TABLE IF EXISTS "profiles" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "services" CASCADE;
DROP TABLE IF EXISTS "team_members" CASCADE;
DROP TABLE IF EXISTS "testimonials" CASCADE;

-- Step 2: Create new Prisma-compatible tables

-- Categories Table
CREATE TABLE "categories" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "icon" TEXT,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- Products Table
CREATE TABLE "products" (
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

CREATE INDEX "products_slug_idx" ON "products"("slug");
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- Product Media Table
CREATE TABLE "product_media" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "product_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "product_media_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "product_media_product_id_idx" ON "product_media"("product_id");

-- Product Tags Table
CREATE TABLE "product_tags" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "label" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE("product_id", "label")
);

-- Quote Requests Table
CREATE TABLE "quote_requests" (
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

CREATE INDEX "quote_requests_email_idx" ON "quote_requests"("email");

-- Team Members Table
CREATE TABLE "team_members" (
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

CREATE INDEX "team_members_priority_idx" ON "team_members"("priority");

-- Portfolio Projects Table
CREATE TABLE "portfolio_projects" (
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

CREATE INDEX "portfolio_projects_slug_idx" ON "portfolio_projects"("slug");
CREATE INDEX "portfolio_projects_status_idx" ON "portfolio_projects"("status");

-- Step 3: Insert sample data

-- Insert Categories
INSERT INTO "categories" ("id", "name", "slug", "description", "icon", "priority") VALUES
  ('cat-1', 'Truck Scale', 'truck-scale', 'Heavy-duty weighing systems for vehicles and cargo', '🚛', 100),
  ('cat-2', 'Digital Scale', 'digital-scale', 'Precision scales for various applications', '⚖️', 90),
  ('cat-3', 'Racking System', 'racking-system', 'Storage solutions and warehouse racking', '📦', 80),
  ('cat-4', 'Lifting Equipment', 'lifting-equipment', 'Forklifts, stackers, and material handling', '🏗️', 70),
  ('cat-5', 'Plastic Solutions', 'plastic-solutions', 'Pallets, baskets, and plastic products', '🧺', 60);

-- Insert Products
INSERT INTO "products" ("id", "name", "slug", "sku", "summary", "description", "category_id", "price", "status", "highlights", "hero_image", "specs") VALUES
  (
    'prod-1',
    'Heavy Duty Truck Scale 100T',
    'heavy-duty-truck-scale-100t',
    'TS-HD-100',
    'Industrial truck scale for heavy vehicles up to 100 tons',
    'Professional-grade weighbridge designed for high-traffic logistics operations. Features reinforced steel platform with digital load cells and weatherproof construction.',
    'cat-1',
    45000.00,
    'PUBLISHED',
    ARRAY['100-ton capacity', '16m x 3m platform', 'IP67 load cells', 'Remote diagnostics', '3-year warranty'],
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    '{"capacity":"100,000 kg","platform":"16m x 3m","accuracy":"±20kg","material":"Reinforced steel","certification":"OIML R76"}'::jsonb
  ),
  (
    'prod-2',
    'Digital Scale Indicator X7',
    'digital-scale-indicator-x7',
    'IND-X7-001',
    'Advanced digital indicator with MODBUS support',
    'Professional weighing indicator with stainless steel enclosure, dual-range support, and industrial communication protocols.',
    'cat-2',
    850.00,
    'PUBLISHED',
    ARRAY['IP67 enclosure', 'MODBUS TCP/RTU', 'Dual range support', 'Backlit LCD display', '2-year warranty'],
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    NULL
  ),
  (
    'prod-3',
    'Adjustable Pallet Rack System',
    'adjustable-pallet-rack-system',
    'RACK-ADJ-001',
    'Heavy-duty warehouse racking with customizable bay widths',
    'Powder-coated steel racking system suitable for warehouse and industrial storage. Adjustable beam heights and custom bay configurations available.',
    'cat-3',
    2500.00,
    'PUBLISHED',
    ARRAY['Custom bay widths', 'Powder-coated finish', 'Load capacity 2T/level', 'Quick installation', 'Expandable system'],
    'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    NULL
  ),
  (
    'prod-4',
    'Electric Reach Stacker 1.6T',
    'electric-reach-stacker-16t',
    'LIFT-RS-16',
    'Lithium battery powered reach stacker for warehouse operations',
    'Compact electric reach stacker with lithium-ion battery, auto-leveling forks, and 5-meter lift height. Ideal for narrow-aisle operations.',
    'cat-4',
    18500.00,
    'PUBLISHED',
    ARRAY['Li-ion battery', '1.6T capacity', '5m lift height', '2-hour fast charge', 'Auto-leveling forks'],
    'https://images.unsplash.com/photo-1565288999155-38a6b8e25e5d?w=800&q=80',
    NULL
  ),
  (
    'prod-5',
    'Heavy Duty Plastic Pallet',
    'heavy-duty-plastic-pallet',
    'PAL-HD-1210',
    'Industrial plastic pallet 1200x1000mm with 2T capacity',
    'Durable HDPE plastic pallet suitable for export and warehouse storage. Resistant to chemicals, moisture, and temperature variations.',
    'cat-5',
    45.00,
    'PUBLISHED',
    ARRAY['1200x1000mm', '2-ton capacity', '4-way entry', 'Recyclable HDPE', 'Stackable design'],
    'https://images.unsplash.com/photo-1605883705077-8d3d3d02fcf5?w=800&q=80',
    NULL
  );

-- Insert Team Members  
INSERT INTO "team_members" ("id", "name", "title", "bio", "email", "phone", "priority", "status", "photo") VALUES
  (
    'team-1',
    'Var Socheat',
    'Managing Director',
    'With over 17 years of experience in metrology and industrial equipment, Var Socheat leads S3V Trading Group''s mission to bring world-class weighing and logistics solutions to Cambodia.',
    'socheat@s3vtgroup.com.kh',
    '+855 11 777 889',
    100,
    'ACTIVE',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
  ),
  (
    'team-2',
    'Sok Pisey',
    'Technical Director',
    'Sok Pisey oversees all technical installations, calibrations, and service operations. With certifications in metrology and industrial automation.',
    'pisey@s3vtgroup.com.kh',
    '+855 67 777 988',
    90,
    'ACTIVE',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
  ),
  (
    'team-3',
    'Chea Sokha',
    'Sales Manager',
    'Leading the sales and customer relations team. Expert in logistics planning and ROI analysis.',
    'sokha@s3vtgroup.com.kh',
    NULL,
    80,
    'ACTIVE',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
  );

-- Insert Portfolio Projects
INSERT INTO "portfolio_projects" ("id", "title", "slug", "industry", "client", "description", "challenge", "solution", "results", "hero_image", "images", "completion_date", "status", "priority") VALUES
  (
    'port-1',
    'Angkor Rice Mill Automation',
    'angkor-rice-mill-automation',
    'Agriculture',
    'Angkor Rice Processing Co., Ltd',
    'Complete weighing and logistics automation for a 500-ton daily capacity rice mill.',
    'Manual weighing processes leading to inconsistent batch weights, long processing times, and difficulties meeting export quality standards.',
    'Implemented a 60-ton truck scale with automated batch control system, digital indicators with MODBUS integration, and complete racking system for finished goods storage.',
    'Processing time reduced by 40%, achieved ISO 22000 certification, eliminated weighing discrepancies, increased export volumes by 25%.',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'],
    '2024-03-15'::timestamp,
    'PUBLISHED',
    100
  ),
  (
    'port-2',
    'Phnom Penh Logistics Center',
    'phnom-penh-logistics-center',
    'Logistics',
    'CamLog Distribution',
    'Modern 3PL facility with automated weighing, racking, and material handling equipment.',
    'Client needed to modernize 10,000 sqm warehouse to handle increasing e-commerce volumes.',
    'Deployed twin 80-ton truck scales with yard management software, 2,500 pallet positions, fleet of 8 electric reach stackers.',
    'Throughput increased from 200 to 450 containers/month, customs processing time cut by 60%, achieved TAPA Level 1 certification.',
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80'],
    '2024-06-30'::timestamp,
    'FEATURED',
    95
  ),
  (
    'port-3',
    'Garment Factory Material Flow',
    'garment-factory-upgrade',
    'Manufacturing',
    'Confidential',
    'End-to-end material handling upgrade for a 2,000-worker apparel manufacturing facility.',
    'Factory expansion required efficient fabric roll storage, cutting table logistics, and finished goods handling.',
    'Installed mezzanine racking, mobile cutting tables with electric lifts, roller conveyors, and cantilever racks.',
    'Production capacity target achieved, reduced fabric handling time by 50%, eliminated damage from manual handling.',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    ARRAY[]::TEXT[],
    '2024-01-20'::timestamp,
    'PUBLISHED',
    85
  );

-- Insert Quote Requests
INSERT INTO "quote_requests" ("id", "company_name", "contact_name", "email", "phone", "message", "status", "source") VALUES
  (
    'quote-1',
    'Mekong Agro Export Ltd',
    'Sok Vannith',
    'vannith@mekongagro.com',
    '+855 12 345 678',
    'We are expanding our cassava processing facility and need a 60-ton truck scale with automated batch control. Target installation: Q1 2025. Location: Kampong Cham province.',
    'NEW',
    'Website'
  ),
  (
    'quote-2',
    'Royal Logistics Park',
    'Chann Dara',
    'dara@royallogistics.com.kh',
    '+855 23 456 789',
    'Require selective pallet racking for new 8,000 sqm warehouse. Estimated 3,000 pallet positions. Need site survey and proposal by end of month.',
    'IN_PROGRESS',
    'Website'
  ),
  (
    'quote-3',
    'Cambodia Textile Manufacturing',
    'Lim Sophal',
    'sophal@ctm.com.kh',
    '+855 89 123 456',
    'Looking for 3 electric reach stackers (1.5T capacity, 4.5m height) for factory expansion. Also interested in mobile conveyor systems.',
    'NEW',
    'Website'
  );

-- Verification query
SELECT 
  'Migration and seed complete!' as status,
  (SELECT COUNT(*) FROM categories) as categories_count,
  (SELECT COUNT(*) FROM products) as products_count,
  (SELECT COUNT(*) FROM team_members) as team_count,
  (SELECT COUNT(*) FROM portfolio_projects) as portfolio_count,
  (SELECT COUNT(*) FROM quote_requests) as quotes_count;

