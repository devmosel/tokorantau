import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-center gap-15">
        <div className="flex-[1_1_40rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/contact-amico.svg" alt="" className="w-full" />
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}