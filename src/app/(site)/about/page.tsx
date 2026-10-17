import type { Metadata } from "next";
import { AboutSection } from "@/components/features/AboutSection";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { StepsSection } from "@/components/features/StepsSection";
import { PageHeading } from "@/components/ui/PageHeading";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <>
      <PageHeading title="about us" crumb="about" />
      <AboutSection />
      <StepsSection />
      <ReviewsSection />
    </>
  );
}