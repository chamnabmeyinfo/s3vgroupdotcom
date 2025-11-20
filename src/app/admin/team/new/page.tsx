import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TeamForm } from "@/components/admin/team-form";

export default async function NewTeamMemberPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Add Team Member</h1>
        <p className="text-sm text-[#475467]">
          Create a new team member profile
        </p>
      </div>
      <TeamForm />
    </div>
  );
}

