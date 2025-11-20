"use client";

import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: ElementType;
};

export function Container({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

