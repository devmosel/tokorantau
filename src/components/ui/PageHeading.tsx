import Link from "next/link";
import { ROUTES } from "@/lib/routes";

interface PageHeadingProps {
  title: string;
  /** Breadcrumb label shown after "home /". Omit to hide the breadcrumb. */
  crumb?: string;
}

/** Black banner under the header with the page title and breadcrumb. */
export function PageHeading({ title, crumb }: PageHeadingProps) {
  return (
    <div className="flex min-h-200 flex-col items-center justify-center gap-10 bg-brand-black">
      <h3 className="text-[4rem] capitalize text-white">{title}</h3>
      {crumb && (
        <p className="text-[2rem]">
          <Link href={ROUTES.home} className="text-brand-yellow hover:text-white hover:underline">
            home
          </Link>{" "}
          <span className="text-brand-muted">/ {crumb}</span>
        </p>
      )}
    </div>
  );
}
