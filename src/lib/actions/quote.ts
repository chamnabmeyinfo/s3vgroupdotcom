"use server";

import { z } from "zod";
import { createQuoteRequest } from "@/lib/repositories/quote";
import { quoteSchema } from "@/lib/validations/quote";

const extendedSchema = quoteSchema.extend({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1).max(99),
      }),
    )
    .optional(),
});

export async function submitQuoteAction(values: z.infer<typeof extendedSchema>) {
  const parsed = extendedSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid quote form submission");
  }

  const result = await createQuoteRequest({
    ...parsed.data,
    source: "website",
  });

  return result;
}

