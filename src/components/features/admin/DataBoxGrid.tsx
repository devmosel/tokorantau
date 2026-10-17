import type { ReactNode } from "react";
import { Title } from "@/components/ui/Title";
import { AdminGrid } from "./AdminGrid";

interface DataBoxGridProps {
  title: string;
  /** Shown instead of the grid when there are no children. */
  emptyText: string;
  isEmpty: boolean;
  children: ReactNode;
}

/** Titled responsive grid of bordered data boxes, with an empty state. */
export function DataBoxGrid({
  title,
  emptyText,
  isEmpty,
  children,
}: DataBoxGridProps) {
  return (
    <>
      <Title>{title}</Title>
      {isEmpty ? (
        <p className="border-brand p-20 text-center text-[2rem] capitalize text-brand-muted">
          {emptyText}
        </p>
      ) : (
        <AdminGrid>{children}</AdminGrid>
      )}
    </>
  );
}
