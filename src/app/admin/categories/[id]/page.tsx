import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CategoryForm } from "@/components/admin/category-form";
import { getPrismaClient } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const { id } = await params;
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    redirect("/admin/categories");
  }

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    redirect("/admin/categories");
  }

  const initialData = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    icon: category.icon || "",
    priority: category.priority,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Edit Category</h1>
        <p className="text-sm text-[#475467]">
          Update category details
        </p>
      </div>
      <CategoryForm initialData={initialData} />
    </div>
  );
}

