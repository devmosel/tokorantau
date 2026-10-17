import type { Metadata } from "next";
import { OrdersSection } from "@/components/features/OrdersSection";
import { Pagination } from "@/components/features/Pagination";
import { PageHeading } from "@/components/ui/PageHeading";
import { getOrders } from "@/lib/api/orders";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Orders" };

const PAGE_SIZE = 12;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const { items, meta } = await getOrders(Math.max(1, Number(page) || 1), PAGE_SIZE);

  return (
    <>
      <PageHeading title="Orders" crumb="orders" />
      <OrdersSection
        orders={items}
        footer={<Pagination meta={meta} hrefFor={(target) => `${ROUTES.orders}?page=${target}`} />}
      />
    </>
  );
}
