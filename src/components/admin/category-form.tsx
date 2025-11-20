"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { categoryFormSchema, type CategoryFormValues } from "@/lib/validations/category";
import { Button } from "@/components/ui/button";

type CategoryFormProps = {
  initialData?: CategoryFormValues & { id?: string };
};

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      icon: "",
      priority: 0,
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateCategory(initialData.id, values);
        } else {
          await createCategory(values);
        }
        router.push("/admin/categories");
        router.refresh();
      } catch (err) {
        console.error(err);
        setError("Failed to save category. Please try again.");
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
          <label className="text-sm font-medium text-[#0b3a63]">Category Name *</label>
          <input
            {...form.register("name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="Truck Scale"
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
            placeholder="truck-scale"
          />
          {form.formState.errors.slug && (
            <p className="text-sm text-red-600">{form.formState.errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Icon (emoji or icon name)</label>
          <input
            {...form.register("icon")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="📦 or TruckIcon"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Priority (higher = appears first)</label>
          <input
            {...form.register("priority", { valueAsNumber: true })}
            type="number"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Description</label>
        <textarea
          {...form.register("description")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="Category description for SEO and display..."
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData?.id ? "Update Category" : "Create Category"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/categories")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

