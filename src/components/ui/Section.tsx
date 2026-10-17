import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** The mockup's global `section` rule: centred, 1200px max, 2rem padding. */
export function Section({ as: Tag = "section", className, children }: SectionProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1200px] p-20", className)}>{children}</Tag>;
}
