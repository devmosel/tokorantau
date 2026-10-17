import type { Metadata } from "next";
import { CartSummary } from "@/components/features/CartSummary";
import { DeleteAllButton } from "@/components/features/DeleteAllButton";
import { EmptyState } from "@/components/features/EmptyState";
import { ProductCard } from "@/components/features/ProductCard";
import { ProductSection } from "@/components/features/ProductSection";
import { PageHeading } from "@/components/ui/PageHeading";
import { getCartLines } from "@/lib/api/cart";
import { getCategories } from "@/lib/api/catalog";

export const metadata: Metadata = { title: "Cart" };

export default async function CartPage() {
  const [{ lines, total }, categories] = await Promise.all([getCartLines(), getCategories()]);
  const names = new Map(categories.map((category) => [category.id, category.name]));

  return (
    <>
      <PageHeading title="shopping cart" crumb="cart" />
      <ProductSection
        title="your cart"
        className="min-h-screen"
        intro={lines.length > 0 ? <CartSummary total={total} /> : undefined}
        empty={lines.length === 0 ? <EmptyState>Your cart is empty.</EmptyState> : undefined}
        footer={lines.length > 0 ? <DeleteAllButton /> : undefined}
      >
        {lines.map(({ item, product }) => (
          <ProductCard
            key={item.id}
            variant="cart"
            item={item}
            product={product ?? undefined}
            categoryName={product ? names.get(product.categoryId) : undefined}
          />
        ))}
      </ProductSection>
    </>
  );
}
