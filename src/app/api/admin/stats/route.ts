import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";

export async function GET() {
  try {
    const prisma = await getPrismaClient();
    
    if (!prisma) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }

    // Get comprehensive stats
    const [
      totalProducts,
      totalCategories,
      totalQuotes,
      publishedProducts,
      draftProducts,
      quotesToday,
      quotesThisWeek,
      quotesThisMonth,
      quotesByStatus,
      recentQuotes,
      productsByCategory,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.quoteRequest.count(),
      prisma.product.count({ where: { status: "PUBLISHED" } }),
      prisma.product.count({ where: { status: "DRAFT" } }),
      prisma.quoteRequest.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.quoteRequest.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.quoteRequest.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.quoteRequest.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          companyName: true,
          contactName: true,
          email: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.product.groupBy({
        by: ["categoryId"],
        _count: true,
      }),
    ]);

    // Get category names for products by category
    const categoryIds = productsByCategory.map((p) => p.categoryId);
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true },
    });

    const productsByCategoryWithNames = productsByCategory.map((item) => {
      const category = categories.find((c) => c.id === item.categoryId);
      return {
        category: category?.name || "Unknown",
        count: item._count,
      };
    });

    return NextResponse.json({
      overview: {
        totalProducts,
        totalCategories,
        totalQuotes,
        publishedProducts,
        draftProducts,
      },
      quotes: {
        today: quotesToday,
        thisWeek: quotesThisWeek,
        thisMonth: quotesThisMonth,
        byStatus: quotesByStatus.map((q) => ({
          status: q.status,
          count: q._count,
        })),
        recent: recentQuotes,
      },
      products: {
        byCategory: productsByCategoryWithNames,
      },
    });
  } catch (error: any) {
    console.error("[api/admin/stats] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

