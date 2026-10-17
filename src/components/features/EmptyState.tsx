import type { ReactNode } from "react";

/** Centred muted message for empty lists (no products, empty cart, no orders). */
export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="py-30 text-center text-[2rem] text-brand-muted">{children}</p>;
}