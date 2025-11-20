import {
  mockCategories,
  mockProducts,
  mockSolutions,
  serviceOfferings,
} from "@/lib/data/mock-data";
import { getPrismaClient } from "@/lib/prisma";
import type {
  CategorySummary,
  ProductSummary,
  ServiceOffering,
  SolutionStory,
} from "@/types/catalog";

export async function getFeaturedCategories(): Promise<CategorySummary[]> {
  const client = await getPrismaClient();
  if (!client) return mockCategories;

  try {
    const categories = await client.category.findMany({
      orderBy: { priority: "desc" },
      take: 6,
    });
    if (!categories.length) return mockCategories;
    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description ?? "",
      icon: cat.icon ?? undefined,
    }));
  } catch (error) {
    console.error("[catalog] Failed to fetch categories", error);
    return mockCategories;
  }
}

export async function getHighlightedProducts(): Promise<ProductSummary[]> {
  const client = await getPrismaClient();
  if (!client) return mockProducts;

  try {
    const products = await client.product.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true, tags: true },
      orderBy: { updatedAt: "desc" },
      take: 6,
    });
    if (!products.length) return mockProducts;
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      summary: product.summary ?? "",
      heroImage: product.heroImage ?? undefined,
      highlights: product.highlights,
      price: product.price ? Number(product.price) : undefined,
      categorySlug: product.category.slug,
      badge: product.tags?.[0]?.label,
    }));
  } catch (error) {
    console.error("[catalog] Failed to fetch products", error);
    return mockProducts;
  }
}

export async function getSolutionStories(): Promise<SolutionStory[]> {
  return mockSolutions;
}

export async function getServiceOfferings(): Promise<ServiceOffering[]> {
  return serviceOfferings;
}

