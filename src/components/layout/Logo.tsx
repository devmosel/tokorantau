import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export function Logo({ href = ROUTES.home }: { href?: string }) {
  return (
    <Link
      href={href}
      className="text-[3rem] font-extrabold text-brand-black [-webkit-text-fill-color:var(--color-brand-red)] [-webkit-text-stroke-width:1.5px]"
    >
      <span className="[-webkit-text-fill-color:var(--color-brand-yellow)]">
        {SITE.logoPrefix}
      </span>
      {SITE.logoSuffix}
    </Link>
  );
}
