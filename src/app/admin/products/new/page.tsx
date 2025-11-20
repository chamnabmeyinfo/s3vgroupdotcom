import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ProductForm } from "@/components/admin/product-form";
import { getAllCategories } from "@/lib/repositories/admin";

export default async function NewProductPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Create Product</h1>
        <p className="text-sm text-[#475467]">
          Add a new product to your catalog
        </p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}

