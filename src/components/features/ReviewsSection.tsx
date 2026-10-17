import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { REVIEWS } from "@/data/reviews";
import { ReviewsSlider } from "./ReviewsSlider";

export function ReviewsSection() {
  return (
    <Section>
      <Title>customer&apos;s review</Title>
      <Suspense fallback={null}>
        <ReviewsSlider reviews={REVIEWS} />
      </Suspense>
    </Section>
  );
}