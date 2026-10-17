import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/features/ProductDetail";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { getCategories, getProduct } from "@/lib/api/catalog";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await getProduct((await params).id);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProduct(id), getCategories()]);
  if (!product) notFound();

  const categoryName = categories.find((c) => c.id === product.categoryId)?.name;

  return (
    <>
      <PageHeading title="product details" crumb="details" />
      <Section>
        <ProductDetail product={product} categoryName={categoryName} />
      </Section>
    </>
  );
}
