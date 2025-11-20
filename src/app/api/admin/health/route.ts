import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";

export async function GET() {
  try {
    const prisma = await getPrismaClient();
    
    if (!prisma) {
      return NextResponse.json(
        {
          connected: false,
          error: "Prisma client not available. Check DATABASE_URL environment variable.",
        },
        { status: 200 }
      );
    }

    // Try a simple query to test connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check if we have any data
    const [productCount, categoryCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
    ]);

    return NextResponse.json({
      connected: true,
      productCount,
      categoryCount,
      message: productCount === 0 && categoryCount === 0 
        ? "Database connected but empty. Consider seeding data."
        : "Database connected and operational",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        error: error?.message || "Database connection failed",
      },
      { status: 200 }
    );
  }
}

