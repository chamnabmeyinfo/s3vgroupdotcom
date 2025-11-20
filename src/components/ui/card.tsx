"use client";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

