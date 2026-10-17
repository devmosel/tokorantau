import type { Metadata } from "next";
import { DataBoxGrid } from "@/components/features/admin/DataBoxGrid";
import { FilterLinks } from "@/components/features/admin/FilterLinks";
import { NotificationCard } from "@/components/features/admin/NotificationCard";
import { Pagination } from "@/components/features/Pagination";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { getNotifications } from "@/lib/api/admin/fulfilment";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Admin Emails" };

const PAGE_SIZE = 12;

const FILTERS = [
  { label: "all", value: undefined },
  { label: "sent", value: "SENT" as string | undefined },
  { label: "failed", value: "FAILED" as string | undefined },
];

export default async function AdminNotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page } = await searchParams;
  const activeStatus = status === "SENT" || status === "FAILED" ? status : undefined;
  const { items, meta } = await getNotifications({
    status: activeStatus,
    page: Math.max(1, Number(page) || 1),
    limit: PAGE_SIZE,
  });

  const hrefFor = (value: string | undefined, target = 1) => {
    const params = new URLSearchParams();
    if (value) params.set("status", value);
    if (target > 1) params.set("page", String(target));
    const query = params.toString();
    return query ? `${ROUTES.admin.notifications}?${query}` : ROUTES.admin.notifications;
  };

  return (
    <>
      <PageHeading title="email log" />
      <Section>
        <FilterLinks options={FILTERS} current={activeStatus} hrefFor={(value) => hrefFor(value)} />
        <DataBoxGrid title="emails sent" emptyText="no emails logged yet!" isEmpty={items.length === 0}>
          {items.map((n) => (
            <NotificationCard key={n.id} notification={n} />
          ))}
        </DataBoxGrid>
        <Pagination meta={meta} hrefFor={(target) => hrefFor(activeStatus, target)} />
      </Section>
    </>
  );
}
