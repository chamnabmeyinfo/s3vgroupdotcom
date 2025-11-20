import { z } from "zod";

export const teamFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title is required"),
  bio: z.string().optional(),
  photo: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  priority: z.number().int().min(0),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type TeamFormValues = z.infer<typeof teamFormSchema>;

