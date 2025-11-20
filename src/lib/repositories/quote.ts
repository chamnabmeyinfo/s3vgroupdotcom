import { mockProducts } from "@/lib/data/mock-data";
import { getPrismaClient } from "@/lib/prisma";

type QuotePayload = {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
  items?: { productId: string; quantity: number }[];
  source?: string;
};

export async function createQuoteRequest(payload: QuotePayload) {
  const client = await getPrismaClient();
  if (!client) {
    console.info("[quote] Mock quote captured", payload);
    return { id: `mock-${Date.now()}` };
  }

  const result = await client.quoteRequest.create({
    data: {
      companyName: payload.companyName,
      contactName: payload.contactName,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      items:
        payload.items ??
        mockProducts.slice(0, 2).map((product) => ({
          productId: product.id,
          quantity: 1,
        })),
      source: payload.source,
    },
    select: { id: true },
  });

  return result;
}

