import type { Metadata } from "next";
import { AdminOrderCard } from "@/components/features/admin/AdminOrderCard";
import { DataBoxGrid } from "@/components/features/admin/DataBoxGrid";
import { FilterLinks } from "@/components/features/admin/FilterLinks";
import { Pagination } from "@/components/features/Pagination";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { ORDER_STATUS, ORDER_STATUSES } from "@/data/orderStatus";
import { getAdminOrders, getCouriers } from "@/lib/api/admin/fulfilment";
import { ROUTES } from "@/lib/routes";
import type { OrderStatus } from "@/types/api";

export const metadata: Metadata = { title: "Admin Orders" };

const PAGE_SIZE = 12;

const FILTERS = [
  { label: "all", value: undefined },
  ...ORDER_STATUSES.map((s) => ({ label: ORDER_STATUS[s].label, value: s as string | undefined })),
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page } = await searchParams;
  const activeStatus = ORDER_STATUSES.includes(status as OrderStatus) ? status : undefined;

  const [{ items, meta }, couriers] = await Promise.all([
    getAdminOrders({ status: activeStatus, page: Math.max(1, Number(page) || 1), limit: PAGE_SIZE }),
    getCouriers(),
  ]);

  const hrefFor = (value: string | undefined, target = 1) => {
    const params = new URLSearchParams();
    if (value) params.set("status", value);
    if (target > 1) params.set("page", String(target));
    const query = params.toString();
    return query ? `${ROUTES.admin.orders}?${query}` : ROUTES.admin.orders;
  };

  return (
    <>
      <PageHeading title="orders" />
      <Section>
        <FilterLinks options={FILTERS} current={activeStatus} hrefFor={(value) => hrefFor(value)} />
        <DataBoxGrid title="placed orders" emptyText="no orders found!" isEmpty={items.length === 0}>
          {items.map((o) => (
            <AdminOrderCard key={o.id} order={o} couriers={couriers} />
          ))}
        </DataBoxGrid>
        <Pagination meta={meta} hrefFor={(target) => hrefFor(activeStatus, target)} />
      </Section>
    </>
  );
}
