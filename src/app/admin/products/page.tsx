import type { Metadata } from "next";
import { AdminGrid } from "@/components/features/admin/AdminGrid";
import { AdminProductCard } from "@/components/features/admin/AdminProductCard";
import { EmptyState } from "@/components/features/EmptyState";
import { Pagination } from "@/components/features/Pagination";

import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { getAdminCategories, getAdminProducts } from "@/lib/api/admin/catalog";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Admin Products" };

const PAGE_SIZE = 12;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const [{ items, meta }, categories] = await Promise.all([
    getAdminProducts({ page: Math.max(1, Number(page) || 1), limit: PAGE_SIZE }),
    getAdminCategories(),
  ]);
  const names = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <>
      <PageHeading title="products" />
      <Section>
        <Title>products added</Title>
        <div className="mb-20 text-center">
          <Button href={ROUTES.admin.addProduct}>add product</Button>
        </div>
        {items.length === 0 ? (
          <EmptyState>No products added yet.</EmptyState>
        ) : (
          <AdminGrid>
            {items.map((p) => (
              <AdminProductCard key={p.id} product={p} categoryName={names.get(p.categoryId)} />
            ))}
          </AdminGrid>
        )}
        <Pagination meta={meta} hrefFor={(n) => `${ROUTES.admin.products}?page=${n}`} />
      </Section>
    </>
  );
}
