"use server";

import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/lib/prisma";
import { categoryFormSchema, type CategoryFormValues } from "@/lib/validations/category";

export async function createCategory(data: CategoryFormValues) {
  const parsed = categoryFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const category = await prisma.category.create({
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      icon: parsed.icon || null,
      priority: parsed.priority,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return category;
}

export async function updateCategory(id: string, data: CategoryFormValues) {
  const parsed = categoryFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      icon: parsed.icon || null,
      priority: parsed.priority,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return category;
}

export async function deleteCategory(id: string) {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  await prisma.category.delete({ where: { id } });
  
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

