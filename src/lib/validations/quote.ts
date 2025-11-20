import { z } from "zod";

export const quoteSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

