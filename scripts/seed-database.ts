/**
 * Database Seeding Script
 * Run this locally: npx tsx scripts/seed-database.ts
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Test connection
    await prisma.$connect();
    console.log("✅ Connected to database\n");

    // Create Categories
    console.log("📁 Creating categories...");
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: "truck-scale" },
        update: {},
        create: {
          name: "Truck Scale",
          slug: "truck-scale",
          description: "Heavy-duty weighing systems for vehicles and cargo",
          icon: "🚛",
          priority: 100,
        },
      }),
      prisma.category.upsert({
        where: { slug: "digital-scale" },
        update: {},
        create: {
          name: "Digital Scale",
          slug: "digital-scale",
          description: "Precision scales for various applications",
          icon: "⚖️",
          priority: 90,
        },
      }),
      prisma.category.upsert({
        where: { slug: "racking-system" },
        update: {},
        create: {
          name: "Racking System",
          slug: "racking-system",
          description: "Storage solutions and warehouse racking",
          icon: "📦",
          priority: 80,
        },
      }),
      prisma.category.upsert({
        where: { slug: "lifting-equipment" },
        update: {},
        create: {
          name: "Lifting Equipment",
          slug: "lifting-equipment",
          description: "Forklifts, stackers, and material handling",
          icon: "🏗️",
          priority: 70,
        },
      }),
      prisma.category.upsert({
        where: { slug: "plastic-solutions" },
        update: {},
        create: {
          name: "Plastic Solutions",
          slug: "plastic-solutions",
          description: "Pallets, baskets, and plastic products",
          icon: "🧺",
          priority: 60,
        },
      }),
    ]);
    console.log(`✅ Created ${categories.length} categories\n`);

    // Create Products
    console.log("📦 Creating products...");
    await prisma.product.upsert({
      where: { slug: "heavy-duty-truck-scale-100t" },
      update: {},
      create: {
        name: "Heavy Duty Truck Scale 100T",
        slug: "heavy-duty-truck-scale-100t",
        sku: "TS-HD-100",
        summary: "Industrial truck scale for heavy vehicles up to 100 tons",
        description:
          "Professional-grade weighbridge designed for high-traffic logistics operations. Features reinforced steel platform with digital load cells and weatherproof construction.",
        categoryId: categories[0].id,
        price: 45000,
        status: "PUBLISHED",
        highlights: [
          "100-ton capacity",
          "16m x 3m platform",
          "IP67 load cells",
          "Remote diagnostics",
          "3-year warranty",
        ],
        heroImage:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        specs: {
          capacity: "100,000 kg",
          platform: "16m x 3m",
          accuracy: "±20kg",
          material: "Reinforced steel",
          certification: "OIML R76",
        },
      },
    });

    await prisma.product.upsert({
      where: { slug: "digital-scale-indicator-x7" },
      update: {},
      create: {
        name: "Digital Scale Indicator X7",
        slug: "digital-scale-indicator-x7",
        sku: "IND-X7-001",
        summary: "Advanced digital indicator with MODBUS support",
        description:
          "Professional weighing indicator with stainless steel enclosure, dual-range support, and industrial communication protocols.",
        categoryId: categories[1].id,
        price: 850,
        status: "PUBLISHED",
        highlights: [
          "IP67 enclosure",
          "MODBUS TCP/RTU",
          "Dual range support",
          "Backlit LCD display",
          "2-year warranty",
        ],
        heroImage:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      },
    });

    await prisma.product.upsert({
      where: { slug: "adjustable-pallet-rack-system" },
      update: {},
      create: {
        name: "Adjustable Pallet Rack System",
        slug: "adjustable-pallet-rack-system",
        sku: "RACK-ADJ-001",
        summary: "Heavy-duty warehouse racking with customizable bay widths",
        description:
          "Powder-coated steel racking system suitable for warehouse and industrial storage. Adjustable beam heights and custom bay configurations available.",
        categoryId: categories[2].id,
        price: 2500,
        status: "PUBLISHED",
        highlights: [
          "Custom bay widths",
          "Powder-coated finish",
          "Load capacity 2T/level",
          "Quick installation",
          "Expandable system",
        ],
        heroImage:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
      },
    });

    await prisma.product.upsert({
      where: { slug: "electric-reach-stacker-16t" },
      update: {},
      create: {
        name: "Electric Reach Stacker 1.6T",
        slug: "electric-reach-stacker-16t",
        sku: "LIFT-RS-16",
        summary: "Lithium battery powered reach stacker for warehouse operations",
        description:
          "Compact electric reach stacker with lithium-ion battery, auto-leveling forks, and 5-meter lift height. Ideal for narrow-aisle operations.",
        categoryId: categories[3].id,
        price: 18500,
        status: "PUBLISHED",
        highlights: [
          "Li-ion battery",
          "1.6T capacity",
          "5m lift height",
          "2-hour fast charge",
          "Auto-leveling forks",
        ],
        heroImage:
          "https://images.unsplash.com/photo-1565288999155-38a6b8e25e5d?w=800&q=80",
      },
    });

    await prisma.product.upsert({
      where: { slug: "heavy-duty-plastic-pallet" },
      update: {},
      create: {
        name: "Heavy Duty Plastic Pallet",
        slug: "heavy-duty-plastic-pallet",
        sku: "PAL-HD-1210",
        summary: "Industrial plastic pallet 1200x1000mm with 2T capacity",
        description:
          "Durable HDPE plastic pallet suitable for export and warehouse storage. Resistant to chemicals, moisture, and temperature variations.",
        categoryId: categories[4].id,
        price: 45,
        status: "PUBLISHED",
        highlights: [
          "1200x1000mm",
          "2-ton capacity",
          "4-way entry",
          "Recyclable HDPE",
          "Stackable design",
        ],
        heroImage:
          "https://images.unsplash.com/photo-1605883705077-8d3d3d02fcf5?w=800&q=80",
      },
    });

    console.log("✅ Created 5 products\n");

    // Create Team Members
    console.log("👥 Creating team members...");
    await prisma.teamMember.upsert({
      where: { id: "team-1" },
      update: {},
      create: {
        id: "team-1",
        name: "Var Socheat",
        title: "Managing Director",
        bio: "With over 17 years of experience in metrology and industrial equipment, Var Socheat leads S3V Trading Group's mission to bring world-class weighing and logistics solutions to Cambodia.",
        email: "socheat@s3vtgroup.com.kh",
        phone: "+855 11 777 889",
        priority: 100,
        status: "ACTIVE",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      },
    });

    await prisma.teamMember.upsert({
      where: { id: "team-2" },
      update: {},
      create: {
        id: "team-2",
        name: "Sok Pisey",
        title: "Technical Director",
        bio: "Sok Pisey oversees all technical installations, calibrations, and service operations.",
        email: "pisey@s3vtgroup.com.kh",
        phone: "+855 67 777 988",
        priority: 90,
        status: "ACTIVE",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      },
    });

    await prisma.teamMember.upsert({
      where: { id: "team-3" },
      update: {},
      create: {
        id: "team-3",
        name: "Chea Sokha",
        title: "Sales Manager",
        bio: "Leading the sales and customer relations team. Expert in logistics planning.",
        email: "sokha@s3vtgroup.com.kh",
        priority: 80,
        status: "ACTIVE",
        photo:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      },
    });

    console.log("✅ Created 3 team members\n");

    // Create Portfolio Projects
    console.log("💼 Creating portfolio projects...");
    await prisma.portfolioProject.upsert({
      where: { slug: "angkor-rice-mill-automation" },
      update: {},
      create: {
        title: "Angkor Rice Mill Automation",
        slug: "angkor-rice-mill-automation",
        industry: "Agriculture",
        client: "Angkor Rice Processing Co., Ltd",
        description:
          "Complete weighing and logistics automation for a 500-ton daily capacity rice mill.",
        challenge:
          "Manual weighing processes leading to inconsistent batch weights and difficulties meeting export quality standards.",
        solution:
          "Implemented 60-ton truck scale with automated batch control, MODBUS integration, and racking system.",
        results:
          "Processing time reduced by 40%, achieved ISO 22000 certification, increased export volumes by 25%.",
        heroImage:
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        ],
        completionDate: new Date("2024-03-15"),
        status: "PUBLISHED",
        priority: 100,
      },
    });

    await prisma.portfolioProject.upsert({
      where: { slug: "phnom-penh-logistics-center" },
      update: {},
      create: {
        title: "Phnom Penh Logistics Center",
        slug: "phnom-penh-logistics-center",
        industry: "Logistics",
        client: "CamLog Distribution",
        description:
          "Modern 3PL facility with automated weighing, racking, and material handling.",
        challenge:
          "Needed to modernize 10,000 sqm warehouse to handle increasing e-commerce volumes.",
        solution:
          "Deployed twin 80-ton truck scales, 2,500 pallet positions, fleet of 8 electric stackers.",
        results:
          "Throughput increased from 200 to 450 containers/month, customs processing time cut by 60%.",
        heroImage:
          "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
        ],
        completionDate: new Date("2024-06-30"),
        status: "FEATURED",
        priority: 95,
      },
    });

    await prisma.portfolioProject.upsert({
      where: { slug: "garment-factory-upgrade" },
      update: {},
      create: {
        title: "Garment Factory Material Flow",
        slug: "garment-factory-upgrade",
        industry: "Manufacturing",
        client: "Confidential",
        description:
          "End-to-end material handling upgrade for 2,000-worker apparel facility.",
        challenge:
          "Factory expansion required efficient fabric roll storage and cutting table logistics.",
        solution:
          "Installed mezzanine racking, mobile cutting tables, roller conveyors, and cantilever racks.",
        results:
          "Production capacity target achieved, reduced fabric handling time by 50%.",
        heroImage:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        completionDate: new Date("2024-01-20"),
        status: "PUBLISHED",
        priority: 85,
      },
    });

    console.log("✅ Created 3 portfolio projects\n");

    // Create Quote Requests
    console.log("📝 Creating quote requests...");
    await prisma.quoteRequest.create({
      data: {
        companyName: "Mekong Agro Export Ltd",
        contactName: "Sok Vannith",
        email: "vannith@mekongagro.com",
        phone: "+855 12 345 678",
        message:
          "We are expanding our cassava processing facility and need a 60-ton truck scale with automated batch control. Target installation: Q1 2025. Location: Kampong Cham province.",
        status: "NEW",
        source: "Website",
      },
    });

    await prisma.quoteRequest.create({
      data: {
        companyName: "Royal Logistics Park",
        contactName: "Chann Dara",
        email: "dara@royallogistics.com.kh",
        phone: "+855 23 456 789",
        message:
          "Require selective pallet racking for new 8,000 sqm warehouse. Estimated 3,000 pallet positions. Need site survey and proposal by end of month.",
        status: "IN_PROGRESS",
        source: "Website",
      },
    });

    await prisma.quoteRequest.create({
      data: {
        companyName: "Cambodia Textile Manufacturing",
        contactName: "Lim Sophal",
        email: "sophal@ctm.com.kh",
        phone: "+855 89 123 456",
        message:
          "Looking for 3 electric reach stackers (1.5T capacity, 4.5m height) for factory expansion. Also interested in mobile conveyor systems.",
        status: "NEW",
        source: "Website",
      },
    });

    console.log("✅ Created 3 quote requests\n");

    console.log("🎉 Database seeded successfully!\n");
    console.log("Summary:");
    console.log("- 5 Categories");
    console.log("- 5 Products");
    console.log("- 3 Team Members");
    console.log("- 3 Portfolio Projects");
    console.log("- 3 Quote Requests\n");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

