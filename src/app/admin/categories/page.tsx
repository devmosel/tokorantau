import type { Metadata } from "next";
import { AdminCategoryCard } from "@/components/features/admin/AdminCategoryCard";
import { DataBoxGrid } from "@/components/features/admin/DataBoxGrid";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { getAdminCategories } from "@/lib/api/admin/catalog";

export const metadata: Metadata = { title: "Admin Categories" };

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <>
      <PageHeading title="categories" />
      <Section>
        <DataBoxGrid title="categories" emptyText="no categories yet!" isEmpty={false}>
          <AdminCategoryCard />
          {categories.map((c) => (
            <AdminCategoryCard key={c.id} category={c} />
          ))}
        </DataBoxGrid>
      </Section>
    </>
  );
}
