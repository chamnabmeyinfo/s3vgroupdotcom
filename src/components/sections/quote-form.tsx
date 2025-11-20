"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitQuoteAction } from "@/lib/actions/quote";
import { quoteSchema, type QuoteFormValues } from "@/lib/validations/quote";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: QuoteFormValues) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await submitQuoteAction(values);
        setSuccessMessage("Thanks! Our team will reach out within one business day.");
        form.reset();
      } catch (error) {
        console.error(error);
        setErrorMessage("Could not send your request. Please try again or call us.");
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 rounded-3xl border border-[#0b3a63]/10 bg-white p-6 shadow-lg"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Company"
          error={form.formState.errors.companyName?.message}
          {...form.register("companyName")}
        />
        <Field
          label="Contact name"
          error={form.formState.errors.contactName?.message}
          {...form.register("contactName")}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Work email"
          type="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <Field
          label="Phone"
          error={form.formState.errors.phone?.message}
          {...form.register("phone")}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-[#0b3a63]">
          Project details
        </label>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#0b3a63] focus:border-[#0b3a63] focus:outline-none"
          placeholder="Volumes, locations, target go-live, equipment of interest..."
          {...form.register("message")}
        />
        {form.formState.errors.message?.message && (
          <p className="mt-1 text-sm text-[#b42318]">
            {form.formState.errors.message?.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Send request"}
      </Button>
      {successMessage && (
        <p className="text-sm font-medium text-[#0f8a5f]">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-sm font-medium text-[#b42318]">{errorMessage}</p>
      )}
    </form>
  );
}

import { forwardRef } from "react";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, ...props }, ref) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[#0b3a63]">{label}</label>
      <input
        ref={ref}
        className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#0b3a63] focus:border-[#0b3a63] focus:outline-none"
        {...props}
      />
      {error && <p className="text-sm text-[#b42318]">{error}</p>}
    </div>
  ),
);
Field.displayName = "Field";

