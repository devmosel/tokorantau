import type { ReactNode } from "react";

/** Responsive grid whose cards stretch to equal height within a row. */
export function AdminGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] items-stretch gap-15 max-[499px]:grid-cols-1">
      {children}
    </div>
  );
}