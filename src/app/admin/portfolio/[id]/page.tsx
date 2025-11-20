import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PortfolioForm } from "@/components/admin/portfolio-form";
import { getPrismaClient } from "@/lib/prisma";
import { format } from "date-fns";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPortfolioProjectPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const { id } = await params;
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    redirect("/admin/portfolio");
  }

  const project = await prisma.portfolioProject.findUnique({
    where: { id },
  });

  if (!project) {
    redirect("/admin/portfolio");
  }

  const initialData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    industry: project.industry,
    client: project.client || "",
    description: project.description || "",
    challenge: project.challenge || "",
    solution: project.solution || "",
    results: project.results || "",
    heroImage: project.heroImage || "",
    images: project.images.join(", "),
    completionDate: project.completionDate
      ? format(new Date(project.completionDate), "yyyy-MM-dd")
      : "",
    status: project.status as "DRAFT" | "PUBLISHED" | "FEATURED",
    priority: project.priority,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Edit Portfolio Project</h1>
        <p className="text-sm text-[#475467]">
          Update project details and case study
        </p>
      </div>
      <PortfolioForm initialData={initialData} />
    </div>
  );
}

