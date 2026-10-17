import Link from "next/link";
import type { NavLink } from "@/types";
import { cn } from "@/lib/cn";

interface NavbarProps {
  links: NavLink[];
  open: boolean;
}

/** Inline list on desktop; a dropdown panel below 787px that opens with `open`. */
export function Navbar({ links, open }: NavbarProps) {
  return (
    <nav
      className={cn(
        "max-md:absolute max-md:inset-x-0 max-md:top-[99%] max-md:border-y-[0.2rem] max-md:border-solid max-md:border-brand-black max-md:bg-white max-md:transition-all max-md:duration-200",
        open
          ? "max-md:[clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
          : "max-md:[clip-path:polygon(0_0,100%_0,100%_0,0_0)]",
      )}
    >
      <ul className="flex items-center justify-between max-md:m-20 max-md:block">
        {links.map((link) => (
          <li key={link.href} className="relative max-md:my-10">
            <Link
              href={link.href}
              className="mx-15 text-[2.5rem] font-normal text-brand-black after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-400 after:content-[''] hover:after:w-full"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
