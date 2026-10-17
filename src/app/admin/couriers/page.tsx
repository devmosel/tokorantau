import type { Metadata } from "next";
import { AdminCourierCard } from "@/components/features/admin/AdminCourierCard";
import { DataBoxGrid } from "@/components/features/admin/DataBoxGrid";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { getCouriers } from "@/lib/api/admin/fulfilment";

export const metadata: Metadata = { title: "Admin Couriers" };

export default async function AdminCouriersPage() {
  const couriers = await getCouriers(true);

  return (
    <>
      <PageHeading title="couriers" />
      <Section>
        <DataBoxGrid title="couriers" emptyText="no couriers yet!" isEmpty={false}>
          <AdminCourierCard />
          {couriers.map((c) => (
            <AdminCourierCard key={c.id} courier={c} />
          ))}
        </DataBoxGrid>
      </Section>
    </>
  );
}
