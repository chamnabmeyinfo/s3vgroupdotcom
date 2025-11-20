"use server";

import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/lib/prisma";
import { teamFormSchema, type TeamFormValues } from "@/lib/validations/team";

export async function createTeamMember(data: TeamFormValues) {
  const parsed = teamFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const member = await prisma.teamMember.create({
    data: {
      name: parsed.name,
      title: parsed.title,
      bio: parsed.bio || null,
      photo: parsed.photo || null,
      email: parsed.email || null,
      phone: parsed.phone || null,
      linkedin: parsed.linkedin || null,
      priority: parsed.priority,
      status: parsed.status,
    },
  });

  revalidatePath("/admin/team");
  return member;
}

export async function updateTeamMember(id: string, data: TeamFormValues) {
  const parsed = teamFormSchema.parse(data);
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      name: parsed.name,
      title: parsed.title,
      bio: parsed.bio || null,
      photo: parsed.photo || null,
      email: parsed.email || null,
      phone: parsed.phone || null,
      linkedin: parsed.linkedin || null,
      priority: parsed.priority,
      status: parsed.status,
    },
  });

  revalidatePath("/admin/team");
  return member;
}

export async function deleteTeamMember(id: string) {
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  await prisma.teamMember.delete({ where: { id } });
  
  revalidatePath("/admin/team");
}

