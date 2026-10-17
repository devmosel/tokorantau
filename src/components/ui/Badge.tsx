import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "yellow" | "red" | "green" | "blue" | "muted" | "black";

const TONES: Record<BadgeTone, string> = {
  yellow: "bg-brand-yellow text-brand-black",
  red: "bg-brand-red text-white",
  green: "bg-green-600 text-white",
  blue: "bg-blue-600 text-white",
  muted: "bg-brand-muted text-white",
  black: "bg-brand-black text-white",
};

/** Small uppercase pill for statuses and types. */
export function Badge({ tone = "black", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block px-10 py-3 text-[1.2rem] font-semibold uppercase tracking-[0.05rem]",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
