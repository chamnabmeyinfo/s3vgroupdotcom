"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, updateProduct } from "@/lib/actions/product";
import { productFormSchema, type ProductFormValues } from "@/lib/validations/product";
import { Button } from "@/components/ui/button";

type ProductFormProps = {
  categories: Array<{ id: string; name: string }>;
  initialData?: ProductFormValues & { id?: string };
};

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      sku: "",
      summary: "",
      description: "",
      categoryId: "",
      heroImage: "",
      price: "",
      status: "DRAFT" as const,
      highlights: "",
      specs: "",
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateProduct(initialData.id, values);
        } else {
          await createProduct(values);
        }
        router.push("/admin/products");
        router.refresh();
      } catch (err) {
        console.error(err);
        setError("Failed to save product. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Product Name *</label>
          <input
            {...form.register("name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="Heavy Duty Truck Scale"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Slug *</label>
          <input
            {...form.register("slug")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="heavy-duty-truck-scale"
          />
          {form.formState.errors.slug && (
            <p className="text-sm text-red-600">{form.formState.errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">SKU</label>
          <input
            {...form.register("sku")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="TS-HD-001"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Category *</label>
          <select
            {...form.register("categoryId")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {form.formState.errors.categoryId && (
            <p className="text-sm text-red-600">{form.formState.errors.categoryId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Price</label>
          <input
            {...form.register("price")}
            type="number"
            step="0.01"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Status *</label>
          <select
            {...form.register("status")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Hero Image URL</label>
        <input
          {...form.register("heroImage")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Summary</label>
        <textarea
          {...form.register("summary")}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="Short product description..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Full Description</label>
        <textarea
          {...form.register("description")}
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="Detailed product description..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">
          Highlights (comma-separated)
        </label>
        <input
          {...form.register("highlights")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="50-ton capacity, Weatherproof, Digital display"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">
          Specifications (JSON)
        </label>
        <textarea
          {...form.register("specs")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#0b3a63] focus:outline-none"
          placeholder='{"capacity": "50T", "dimensions": "16m x 3m"}'
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData?.id ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

