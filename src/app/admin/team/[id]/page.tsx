import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TeamForm } from "@/components/admin/team-form";
import { getPrismaClient } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTeamMemberPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const { id } = await params;
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    redirect("/admin/team");
  }

  const member = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    redirect("/admin/team");
  }

  const initialData = {
    id: member.id,
    name: member.name,
    title: member.title,
    bio: member.bio || "",
    photo: member.photo || "",
    email: member.email || "",
    phone: member.phone || "",
    linkedin: member.linkedin || "",
    priority: member.priority,
    status: member.status as "ACTIVE" | "INACTIVE",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Edit Team Member</h1>
        <p className="text-sm text-[#475467]">
          Update team member profile
        </p>
      </div>
      <TeamForm initialData={initialData} />
    </div>
  );
}

