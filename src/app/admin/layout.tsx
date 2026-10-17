import { Suspense } from "react";
import { adminLogoutAction } from "@/actions/admin";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ADMIN_NAV_LINKS } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const HEADER = (
  <Header
    links={ADMIN_NAV_LINKS}
    userName="admin"
    profileHref={ROUTES.admin.dashboard}
    logoHref={ROUTES.admin.dashboard}
    logoutAction={adminLogoutAction}
  />
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {HEADER}
      {/* Admin pages read the key cookie, so they stream in behind this boundary. */}
      <Suspense fallback={<p className="min-h-screen p-40 text-center text-[2rem] text-brand-muted">Loading…</p>}>
        {children}
      </Suspense>
      <Footer />
    </>
  );
}
