import type { Category, Product } from "@/types/api";
import { ProductCard } from "./ProductCard";

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
}

/** Product cards with their category names resolved; shared by home, menu and search. */
export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const names = new Map(categories.map((category) => [category.id, category.name]));

  return products.map((product) => (
    <ProductCard key={product.id} product={product} categoryName={names.get(product.categoryId)} />
  ));
}