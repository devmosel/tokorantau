"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMenu, BiSearch, BiSolidCartAlt, BiSolidUser } from "react-icons/bi";
import type { NavLink } from "@/types";
import { ROUTES } from "@/lib/routes";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import { ProfileMenu } from "./ProfileMenu";

interface HeaderProps {
  links: NavLink[];
  /** Logged-in user's name, or null when browsing anonymously. */
  userName: string | null;
  profileHref: string;
  logoutAction?: () => Promise<void>;
  logoHref?: string;
  /** When set, shows the search and cart icons with this count. Omit for admin. */
  cartCount?: number;
}

type Panel = "nav" | "profile" | null;

const ICON_LINK =
  "ml-15 flex cursor-pointer items-center text-[2.4rem] text-brand-black transition-colors duration-200 hover:text-brand-yellow";

/** Sticky site header. Owns the open/closed state of the nav and profile panels. */
export function Header({ links, userName, profileHref, logoHref, cartCount, logoutAction }: HeaderProps) {
  const [openPanel, setOpenPanel] = useState<Panel>(null);

  const toggle = (panel: Exclude<Panel, null>) =>
    setOpenPanel((current) => (current === panel ? null : panel));

  useEffect(() => {
    const close = () => setOpenPanel(null);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <header className="sticky inset-x-0 top-0 z-100 border-b-[0.2rem] border-solid border-brand-black bg-white">
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between p-20">
        <Logo href={logoHref} />

        <Navbar links={links} open={openPanel === "nav"} />

        <div className="flex items-center">
          {cartCount !== undefined && (
            <>
              <Link href={ROUTES.search} className={ICON_LINK} aria-label="Search">
                <BiSearch />
              </Link>
              <Link href={ROUTES.cart} className={ICON_LINK} aria-label="Cart">
                <BiSolidCartAlt />
                {cartCount > 0 && <span className="text-[1.5rem]">({cartCount})</span>}
              </Link>
            </>
          )}
          <button
            type="button"
            className={ICON_LINK}
            aria-label="Account"
            onClick={() => toggle("profile")}
          >
            <BiSolidUser />
          </button>
          <button
            type="button"
            className={`${ICON_LINK} md:hidden`}
            aria-label="Menu"
            onClick={() => toggle("nav")}
          >
            <BiMenu />
          </button>
        </div>

        <ProfileMenu
          name={userName}
          profileHref={profileHref}
          open={openPanel === "profile"}
          logoutAction={logoutAction}
        />
      </div>
    </header>
  );
}
