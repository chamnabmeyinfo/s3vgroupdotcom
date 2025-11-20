import type { PrismaClient } from "@/generated/prisma/client";

let prisma: PrismaClient | null = null;

export async function getPrismaClient() {
  if (prisma) return prisma;

  const datasourceUrl = process.env.DATABASE_URL;
  if (!datasourceUrl) {
    console.warn("[prisma] Missing DATABASE_URL. Falling back to mock data.");
    return null;
  }

  try {
    const { PrismaClient } = await import("@/generated/prisma/client");
    // @ts-ignore - Prisma 7 type mismatch with generated client
    prisma = new PrismaClient();
    return prisma;
  } catch (error) {
    console.warn("[prisma] Client unavailable. Using fallback.", error);
    return null;
  }
}

