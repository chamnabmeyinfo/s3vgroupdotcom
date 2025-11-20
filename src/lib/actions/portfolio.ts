"use server";

import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/lib/prisma";
import { portfolioFormSchema, type PortfolioFormValues } from "@/lib/validations/portfolio";

export async function createPortfolioProject(data: PortfolioFormValues) {
  const parsed = portfolioFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const images = parsed.images
    ? parsed.images.split(",").map((url) => url.trim()).filter(Boolean)
    : [];

  const project = await prisma.portfolioProject.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      industry: parsed.industry,
      client: parsed.client || null,
      description: parsed.description || null,
      challenge: parsed.challenge || null,
      solution: parsed.solution || null,
      results: parsed.results || null,
      heroImage: parsed.heroImage || null,
      images,
      completionDate: parsed.completionDate ? new Date(parsed.completionDate) : null,
      status: parsed.status,
      priority: parsed.priority,
    },
  });

  revalidatePath("/admin/portfolio");
  return project;
}

export async function updatePortfolioProject(id: string, data: PortfolioFormValues) {
  const parsed = portfolioFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const images = parsed.images
    ? parsed.images.split(",").map((url) => url.trim()).filter(Boolean)
    : [];

  const project = await prisma.portfolioProject.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      industry: parsed.industry,
      client: parsed.client || null,
      description: parsed.description || null,
      challenge: parsed.challenge || null,
      solution: parsed.solution || null,
      results: parsed.results || null,
      heroImage: parsed.heroImage || null,
      images,
      completionDate: parsed.completionDate ? new Date(parsed.completionDate) : null,
      status: parsed.status,
      priority: parsed.priority,
    },
  });

  revalidatePath("/admin/portfolio");
  return project;
}

export async function deletePortfolioProject(id: string) {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  await prisma.portfolioProject.delete({ where: { id } });
  
  revalidatePath("/admin/portfolio");
}

