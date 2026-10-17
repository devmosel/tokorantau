import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryGrid } from "@/components/features/CategoryGrid";
import { EmptyState } from "@/components/features/EmptyState";
import { HeroSlider } from "@/components/features/HeroSlider";
import { ProductCatalog } from "@/components/features/ProductCatalog";
import { ProductSection } from "@/components/features/ProductSection";
import { Button } from "@/components/ui/Button";
import { toHeroSlides } from "@/data/hero";
import { getCategories, getProducts } from "@/lib/api/catalog";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Home" };

const LATEST_COUNT = 6;

export default async function HomePage() {
  const [categories, { items: products }] = await Promise.all([
    getCategories(),
    getProducts({ limit: LATEST_COUNT }),
  ]);

  return (
    <>
      {products.length > 0 && (
        <Suspense fallback={null}>
          <HeroSlider slides={toHeroSlides(products)} />
        </Suspense>
      )}
      <CategoryGrid categories={categories} />
      <ProductSection
        title="latest dishes"
        empty={products.length === 0 ? <EmptyState>No dishes available yet.</EmptyState> : undefined}
        footer={
          <Button href={ROUTES.menu} size="lg">
            view all
          </Button>
        }
      >
        <ProductCatalog products={products} categories={categories} />
      </ProductSection>
    </>
  );
}
