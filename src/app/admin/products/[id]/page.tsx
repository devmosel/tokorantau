import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/features/admin/AdminProductForm";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { getAdminCategories, getAdminProduct } from "@/lib/api/admin/catalog";
import { ApiError } from "@/lib/api/client";

export const metadata: Metadata = { title: "Update Product" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProduct(id).catch((error) => {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }),
    getAdminCategories(),
  ]);
  if (!product) notFound();

  return (
    <>
      <PageHeading title="update product" />
      <Section>
        <AdminProductForm categories={categories} product={product} />
      </Section>
    </>
  );
}
