import { z } from "zod";

export const portfolioFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  industry: z.string().min(1, "Industry is required"),
  client: z.string().optional(),
  description: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  heroImage: z.string().url().optional().or(z.literal("")),
  images: z.string().optional(), // comma-separated URLs
  completionDate: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "FEATURED"]),
  priority: z.number().int().min(0),
});

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;

