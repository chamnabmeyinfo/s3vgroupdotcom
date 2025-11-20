import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { getPrismaClient } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

async function getPortfolioProjects() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];
  return prisma.portfolioProject.findMany({
    orderBy: { priority: "desc" },
  });
}

export default async function PortfolioPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const projects = await getPortfolioProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3a63]">Portfolio</h1>
          <p className="text-sm text-[#475467]">
            Manage case studies and projects ({projects.length} total)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/portfolio/new">+ New Project</Link>
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No portfolio projects yet. Add your first case study.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.heroImage && (
                          <Image
                            src={project.heroImage}
                            alt={project.title}
                            width={60}
                            height={40}
                            className="h-10 w-16 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-[#0b3a63]">{project.title}</p>
                          <p className="text-xs text-gray-500">{project.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.industry}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.client || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          project.status === "FEATURED"
                            ? "default"
                            : project.status === "PUBLISHED"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {project.completionDate
                        ? format(new Date(project.completionDate), "MMM yyyy")
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/portfolio/${project.id}`}
                        className="text-sm font-medium text-[#0b3a63] hover:text-[#ff8a00]"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
