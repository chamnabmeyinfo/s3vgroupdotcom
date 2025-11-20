"use server";

import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/lib/prisma";
import { productFormSchema, type ProductFormValues } from "@/lib/validations/product";

export async function createProduct(data: ProductFormValues) {
  const parsed = productFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const highlights = parsed.highlights
    ? parsed.highlights.split(",").map((h) => h.trim()).filter(Boolean)
    : [];

  const specs = parsed.specs ? JSON.parse(parsed.specs) : null;
  const price = parsed.price ? parseFloat(parsed.price) : null;

  const product = await prisma.product.create({
    data: {
      name: parsed.name,
      slug: parsed.slug,
      sku: parsed.sku || null,
      summary: parsed.summary || null,
      description: parsed.description || null,
      categoryId: parsed.categoryId,
      heroImage: parsed.heroImage || null,
      price: price,
      status: parsed.status,
      highlights,
      specs,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return product;
}

export async function updateProduct(id: string, data: ProductFormValues) {
  const parsed = productFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const highlights = parsed.highlights
    ? parsed.highlights.split(",").map((h) => h.trim()).filter(Boolean)
    : [];

  const specs = parsed.specs ? JSON.parse(parsed.specs) : null;
  const price = parsed.price ? parseFloat(parsed.price) : null;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      sku: parsed.sku || null,
      summary: parsed.summary || null,
      description: parsed.description || null,
      categoryId: parsed.categoryId,
      heroImage: parsed.heroImage || null,
      price: price,
      status: parsed.status,
      highlights,
      specs,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return product;
}

export async function deleteProduct(id: string) {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  await prisma.product.delete({ where: { id } });
  
  revalidatePath("/admin/products");
  revalidatePath("/");
}

