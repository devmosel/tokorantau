import type { ReactNode } from "react";

/** Responsive grid of equal-height product tiles (single column on small phones). */
export function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(26rem,1fr))] items-stretch gap-15 max-[499px]:grid-cols-1">
      {children}
    </div>
  );
}
