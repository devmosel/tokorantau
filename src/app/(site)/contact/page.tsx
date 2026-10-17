import type { Metadata } from "next";
import { ContactSection } from "@/components/features/ContactSection";
import { PageHeading } from "@/components/ui/PageHeading";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeading title="contact us" crumb="contact" />
      <ContactSection />
    </>
  );
}