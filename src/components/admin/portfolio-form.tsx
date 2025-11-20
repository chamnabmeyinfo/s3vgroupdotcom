"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortfolioProject, updatePortfolioProject } from "@/lib/actions/portfolio";
import { portfolioFormSchema, type PortfolioFormValues } from "@/lib/validations/portfolio";
import { Button } from "@/components/ui/button";

type PortfolioFormProps = {
  initialData?: PortfolioFormValues & { id?: string };
};

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      industry: "",
      client: "",
      description: "",
      challenge: "",
      solution: "",
      results: "",
      heroImage: "",
      images: "",
      completionDate: "",
      status: "DRAFT" as const,
      priority: 0,
    },
  });

  const onSubmit = (values: PortfolioFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updatePortfolioProject(initialData.id, values);
        } else {
          await createPortfolioProject(values);
        }
        router.push("/admin/portfolio");
        router.refresh();
      } catch (err) {
        console.error(err);
        setError("Failed to save portfolio project. Please try again.");
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
          <label className="text-sm font-medium text-[#0b3a63]">Project Title *</label>
          <input
            {...form.register("title")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="Rice Mill Automation System"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Slug *</label>
          <input
            {...form.register("slug")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="rice-mill-automation"
          />
          {form.formState.errors.slug && (
            <p className="text-sm text-red-600">{form.formState.errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Industry *</label>
          <input
            {...form.register("industry")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="Agriculture"
          />
          {form.formState.errors.industry && (
            <p className="text-sm text-red-600">{form.formState.errors.industry.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Client</label>
          <input
            {...form.register("client")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="Company Name (optional)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Completion Date</label>
          <input
            {...form.register("completionDate")}
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
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
            <option value="FEATURED">Featured</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Priority</label>
          <input
            {...form.register("priority", { valueAsNumber: true })}
            type="number"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Hero Image URL</label>
          <input
            {...form.register("heroImage")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="https://example.com/hero.jpg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Gallery Images (comma-separated URLs)</label>
        <input
          {...form.register("images")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Project Description</label>
        <textarea
          {...form.register("description")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="Overall project summary..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Challenge</label>
        <textarea
          {...form.register("challenge")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="What problem needed solving..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Solution</label>
        <textarea
          {...form.register("solution")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="How we addressed it..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Results</label>
        <textarea
          {...form.register("results")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="Outcomes and metrics achieved..."
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData?.id ? "Update Project" : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/portfolio")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

