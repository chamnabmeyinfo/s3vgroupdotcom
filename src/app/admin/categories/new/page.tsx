import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CategoryForm } from "@/components/admin/category-form";

export default async function NewCategoryPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Create Category</h1>
        <p className="text-sm text-[#475467]">
          Add a new product category
        </p>
      </div>
      <CategoryForm />
    </div>
  );
}

