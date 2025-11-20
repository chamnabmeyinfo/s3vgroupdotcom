import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  sku: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  heroImage: z.string().url().optional().or(z.literal("")),
  price: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  highlights: z.string().optional(), // comma-separated, we'll split
  specs: z.string().optional(), // JSON string
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

