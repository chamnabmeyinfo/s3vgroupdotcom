"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeamMember, updateTeamMember } from "@/lib/actions/team";
import { teamFormSchema, type TeamFormValues } from "@/lib/validations/team";
import { Button } from "@/components/ui/button";

type TeamFormProps = {
  initialData?: TeamFormValues & { id?: string };
};

export function TeamForm({ initialData }: TeamFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: initialData || {
      name: "",
      title: "",
      bio: "",
      photo: "",
      email: "",
      phone: "",
      linkedin: "",
      priority: 0,
      status: "ACTIVE" as const,
    },
  });

  const onSubmit = (values: TeamFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateTeamMember(initialData.id, values);
        } else {
          await createTeamMember(values);
        }
        router.push("/admin/team");
        router.refresh();
      } catch (err) {
        console.error(err);
        setError("Failed to save team member. Please try again.");
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
          <label className="text-sm font-medium text-[#0b3a63]">Full Name *</label>
          <input
            {...form.register("name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Job Title *</label>
          <input
            {...form.register("title")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="Managing Director"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Email</label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="john@s3vtgroup.com"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Phone</label>
          <input
            {...form.register("phone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="+855 11 777 889"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Photo URL</label>
          <input
            {...form.register("photo")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">LinkedIn URL</label>
          <input
            {...form.register("linkedin")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Priority (display order)</label>
          <input
            {...form.register("priority", { valueAsNumber: true })}
            type="number"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0b3a63]">Status</label>
          <select
            {...form.register("status")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0b3a63]">Bio</label>
        <textarea
          {...form.register("bio")}
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b3a63] focus:outline-none"
          placeholder="Professional background and expertise..."
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData?.id ? "Update Member" : "Add Member"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/team")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

