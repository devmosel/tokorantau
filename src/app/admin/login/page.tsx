import type { Metadata } from "next";
import { AdminKeyForm } from "@/components/features/admin/AdminKeyForm";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <>
      <PageHeading title="admin login" />
      <Section>
        <AdminKeyForm />
      </Section>
    </>
  );
}
