import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PortfolioForm } from "@/components/admin/portfolio-form";

export default async function NewPortfolioProjectPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Create Portfolio Project</h1>
        <p className="text-sm text-[#475467]">
          Add a new case study or project showcase
        </p>
      </div>
      <PortfolioForm />
    </div>
  );
}

