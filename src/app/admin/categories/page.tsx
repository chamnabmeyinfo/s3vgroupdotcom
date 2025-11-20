import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getAllCategories } from "@/lib/repositories/admin";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3a63]">Categories</h1>
          <p className="text-sm text-[#475467]">
            Manage product categories ({categories.length} total)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">+ New Category</Link>
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No categories yet. Create your first category.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#0b3a63]">{category.name}</p>
                      {category.description && (
                        <p className="text-xs text-gray-500">{category.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {category.priority}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {category.products?.length || 0}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/categories/${category.id}`}
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

