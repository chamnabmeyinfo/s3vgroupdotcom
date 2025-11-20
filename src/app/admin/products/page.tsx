import Link from "next/link";
import { getPrismaClient } from "@/lib/prisma";
import { mockProducts, mockCategories } from "@/lib/data/mock-data";
import { Card } from "@/components/ui/card";

async function getProducts() {
  const prisma = await getPrismaClient();
  if (!prisma) {
    return mockProducts.map((product) => ({
      id: product.id,
      name: product.name,
      category: mockCategories.find((c) => c.slug === product.categorySlug)
        ?.name,
      status: product.badge ? "PUBLISHED" : "DRAFT",
      updatedAt: new Date(),
    }));
  }

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
    take: 25,
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category.name,
    status: product.status,
    updatedAt: product.updatedAt,
  }));
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
            Catalog
          </p>
          <h1 className="text-3xl font-semibold text-[#0b3a63]">Products</h1>
          <p className="text-sm text-[#475467]">
            Manage published systems and drafts.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center rounded-full bg-[#0b3a63] px-5 py-2 text-sm font-semibold text-white"
        >
          + New product
        </Link>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8fafc] text-[#475467]">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 font-semibold">{product.name}</td>
                <td className="px-6 py-4 text-[#475467]">
                  {product.category ?? "—"}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-[#e2e8f0] px-3 py-1 text-xs font-semibold text-[#0b3a63]">
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#475467]">
                  {product.updatedAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

