"use client";

import { useState, useTransition } from "react";
import { updateQuoteStatus } from "@/lib/actions/quote-admin";

type QuoteStatusUpdaterProps = {
  quoteId: string;
  currentStatus: string;
};

const statuses = ["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"] as const;

export function QuoteStatusUpdater({ quoteId, currentStatus }: QuoteStatusUpdaterProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = (newStatus: typeof statuses[number]) => {
    setError(null);
    startTransition(async () => {
      try {
        await updateQuoteStatus(quoteId, newStatus);
      } catch (err) {
        console.error(err);
        setError("Failed to update status");
      }
    });
  };

  return (
    <div className="space-y-2">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value as typeof statuses[number])}
        disabled={isPending}
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0b3a63] focus:outline-none disabled:opacity-50"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.replace("_", " ")}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

