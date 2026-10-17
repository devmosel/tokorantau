import Link from "next/link";
import { cn } from "@/lib/cn";

interface FilterLinksProps {
  options: { label: string; value: string | undefined }[];
  current: string | undefined;
  /** Builds the href for an option value (`undefined` = "all"). */
  hrefFor: (value: string | undefined) => string;
}

/** Row of pill links used to filter admin lists by a query param. */
export function FilterLinks({ options, current, hrefFor }: FilterLinksProps) {
  return (
    <nav aria-label="Filter" className="mb-20 flex flex-wrap justify-center gap-10">
      {options.map(({ label, value }) => (
        <Link
          key={label}
          href={hrefFor(value)}
          className={cn(
            "border-brand px-13 py-5 text-[1.6rem] capitalize",
            value === current ? "bg-brand-black text-white" : "text-brand-black hover:bg-brand-yellow",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
