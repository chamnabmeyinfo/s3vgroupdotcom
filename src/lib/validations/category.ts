import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().optional(),
  icon: z.string().optional(),
  priority: z.number().int().min(0),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

