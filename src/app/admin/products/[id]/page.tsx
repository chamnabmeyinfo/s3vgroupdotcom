import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ProductForm } from "@/components/admin/product-form";
import { getAllCategories, getProductById } from "@/lib/repositories/admin";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const { id } = await params;
  const [categories, product] = await Promise.all([
    getAllCategories(),
    getProductById(id),
  ]);

  if (!product) {
    redirect("/admin/products");
  }

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku || "",
    summary: product.summary || "",
    description: product.description || "",
    categoryId: product.categoryId,
    heroImage: product.heroImage || "",
    price: product.price ? String(product.price) : "",
    status: product.status,
    highlights: product.highlights.join(", "),
    specs: product.specs ? JSON.stringify(product.specs) : "",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0b3a63]">Edit Product</h1>
        <p className="text-sm text-[#475467]">
          Update product details and specifications
        </p>
      </div>
      <ProductForm categories={categories} initialData={initialData} />
    </div>
  );
}

