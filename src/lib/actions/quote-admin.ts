"use server";

import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/lib/prisma";

export async function updateQuoteStatus(id: string, status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED") {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const quote = await prisma.quoteRequest.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/quotes");
  return quote;
}

export async function deleteQuote(id: string) {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  await prisma.quoteRequest.delete({ where: { id } });
  
  revalidatePath("/admin/quotes");
}

