import { Suspense } from "react";
import { logoutAction } from "@/actions/auth";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSessionSummary } from "@/lib/api/summary";
import { NAV_LINKS } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const HEADER_PROPS = { links: NAV_LINKS, profileHref: ROUTES.profile } as const;

/** Reads the session, so it streams in behind Suspense while the rest of the layout is static. */
async function SiteHeader() {
  const session = await getSessionSummary();

  return (
    <Header
      {...HEADER_PROPS}
      userName={session?.user.name ?? null}
      cartCount={session?.cartCount ?? 0}
      logoutAction={logoutAction}
    />
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Header {...HEADER_PROPS} userName={null} cartCount={0} />}>
        <SiteHeader />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
