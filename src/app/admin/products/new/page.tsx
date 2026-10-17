import type { Metadata } from "next";
import { AdminProductForm } from "@/components/features/admin/AdminProductForm";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { getAdminCategories } from "@/lib/api/admin/catalog";

export const metadata: Metadata = { title: "Add Product" };

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <>
      <PageHeading title="add product" />
      <Section>
        <AdminProductForm categories={categories} />
      </Section>
    </>
  );
}
