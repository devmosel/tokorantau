import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { STEPS } from "@/data/steps";
import { StepCard } from "./StepCard";

export function StepsSection() {
  return (
    <Section>
      <Title underlined>simple steps</Title>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(30rem,1fr))] items-start gap-15 py-10">
        {STEPS.map((step) => (
          <StepCard key={step.title} {...step} />
        ))}
      </div>
    </Section>
  );
}