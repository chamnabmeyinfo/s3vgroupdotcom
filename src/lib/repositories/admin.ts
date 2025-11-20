import { getPrismaClient } from "@/lib/prisma";

export async function getAllProducts() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];

  try {
    return await prisma.product.findMany({
      include: { category: true, tags: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.error("[admin] Failed to fetch products", error);
    return [];
  }
}

export async function getAllCategories() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];

  try {
    return await prisma.category.findMany({
      include: { products: true },
      orderBy: { priority: "desc" },
    });
  } catch (error) {
    console.error("[admin] Failed to fetch categories", error);
    return [];
  }
}

export async function getAllQuotes() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];

  try {
    return await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[admin] Failed to fetch quotes", error);
    return [];
  }
}

export async function getProductById(id: string) {
  const prisma = await getPrismaClient();
  if (!prisma) return null;

  try {
    return await prisma.product.findUnique({
      where: { id },
      include: { category: true, tags: true, media: true },
    });
  } catch (error) {
    console.error("[admin] Failed to fetch product", error);
    return null;
  }
}

export async function getDashboardStats() {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalQuotes: 0,
      quotesToday: 0,
    };
  }

  try {
    const [totalProducts, totalCategories, totalQuotes, quotesToday] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    return {
      totalProducts,
      totalCategories,
      totalQuotes,
      quotesToday,
    };
  } catch (error) {
    console.error("[admin] Failed to fetch stats", error);
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalQuotes: 0,
      quotesToday: 0,
    };
  }
}

