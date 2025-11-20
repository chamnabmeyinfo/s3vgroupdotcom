"use client";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "text-center items-center" : "",
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3a63]/70">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold text-[#0b3a63] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base text-[#334155] max-w-2xl">{description}</p>
      )}
    </div>
  );
}

