"use client";

import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[#ffead6] px-3 py-1 text-xs font-semibold text-[#a54b00]",
        className,
      )}
      {...props}
    />
  );
}

