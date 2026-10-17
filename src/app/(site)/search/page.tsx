import type { Metadata } from "next";
import { EmptyState } from "@/components/features/EmptyState";
import { Pagination } from "@/components/features/Pagination";
import { ProductCatalog } from "@/components/features/ProductCatalog";
import { ProductSection } from "@/components/features/ProductSection";
import { SearchForm } from "@/components/features/SearchForm";
import { getCategories, getProducts } from "@/lib/api/catalog";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Search" };

const PAGE_SIZE = 12;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page } = await searchParams;
  const query = q.trim();
  const currentPage = Math.max(1, Number(page) || 1);

  const [categories, result] = query
    ? await Promise.all([
        getCategories(),
        getProducts({ q: query, page: currentPage, limit: PAGE_SIZE }),
      ])
    : [[], null];

  const hrefFor = (target: number) =>
    `${ROUTES.search}?${new URLSearchParams({ q: query, page: String(target) })}`;

  return (
    <>
      <SearchForm defaultValue={query} />
      <ProductSection
        className="min-h-screen pt-0"
        empty={
          result && result.items.length === 0 ? (
            <EmptyState>No results for “{query}”.</EmptyState>
          ) : undefined
        }
        footer={result && <Pagination meta={result.meta} hrefFor={hrefFor} />}
      >
        {result && <ProductCatalog products={result.items} categories={categories} />}
      </ProductSection>
    </>
  );
}
