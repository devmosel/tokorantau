import { Button } from "@/components/ui/Button";
import type { Meta } from "@/types/api";

interface PaginationProps {
  meta: Meta;
  /** Builds the href for a page number, keeping other query params. */
  hrefFor: (page: number) => string;
}

/** Previous / next links with the current page indicator. Hidden when there is one page. */
export function Pagination({ meta, hrefFor }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-30 flex items-center justify-center gap-20">
      {meta.page > 1 && <Button href={hrefFor(meta.page - 1)}>previous</Button>}
      <span className="text-[2rem] text-brand-muted">
        {meta.page} / {totalPages}
      </span>
      {meta.page < totalPages && <Button href={hrefFor(meta.page + 1)}>next</Button>}
    </nav>
  );
}