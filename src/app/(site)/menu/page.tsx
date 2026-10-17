import type { Metadata } from "next";
import { EmptyState } from "@/components/features/EmptyState";
import { Pagination } from "@/components/features/Pagination";
import { ProductCatalog } from "@/components/features/ProductCatalog";
import { ProductSection } from "@/components/features/ProductSection";
import { PageHeading } from "@/components/ui/PageHeading";
import { getCategories, getProducts } from "@/lib/api/catalog";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Menu" };

const PAGE_SIZE = 12;

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [categories, { items: products, meta }] = await Promise.all([
    getCategories(),
    getProducts({ page: currentPage, limit: PAGE_SIZE, categoryId: category }),
  ]);

  const hrefFor = (target: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    params.set("page", String(target));
    return `${ROUTES.menu}?${params}`;
  };

  const activeCategory = categories.find((c) => c.id === category);

  return (
    <>
      <PageHeading title="menu" crumb="menu" />
      <ProductSection
        title={activeCategory?.name ?? "latest dishes"}
        empty={products.length === 0 ? <EmptyState>No dishes found.</EmptyState> : undefined}
        footer={<Pagination meta={meta} hrefFor={hrefFor} />}
      >
        <ProductCatalog products={products} categories={categories} />
      </ProductSection>
    </>
  );
}
