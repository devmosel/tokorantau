import type { IconType } from "react-icons";
import { BiMap, BiSolidEnvelope, BiSolidPhoneCall, BiTimeFive } from "react-icons/bi";
import { SITE } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

interface InfoBox {
  icon: IconType;
  title: string;
  text: string;
  href?: string;
}

const INFO_BOXES: InfoBox[] = [
  { icon: BiSolidEnvelope, title: "Our Email", text: SITE.email, href: `mailto:${SITE.email}` },
  { icon: BiTimeFive, title: "Opening Hours", text: SITE.openingHours },
  { icon: BiSolidPhoneCall, title: "Our Number", text: SITE.phone, href: `tel:${SITE.phone}` },
  { icon: BiMap, title: "Address", text: SITE.address, href: "#" },
];

const TEXT = "text-[1.5rem] text-brand-muted hover:underline";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Section className="grid grid-cols-[repeat(auto-fit,minmax(27rem,1fr))] items-start gap-15">
        {INFO_BOXES.map(({ icon: Icon, title, text, href }) => (
          <div key={title} className="flex flex-col items-center border-brand p-20 text-center">
            <Icon className="text-[10rem] text-brand-black" />
            <h3 className="my-10 text-[2rem] font-medium text-brand-black">{title}</h3>
            {href ? (
              <a href={href} className={TEXT}>
                {text}
              </a>
            ) : (
              <p className={TEXT}>{text}</p>
            )}
          </div>
        ))}
      </Section>

      <div className="bg-brand-black px-20 py-25 text-center text-[1.4rem] text-white">
        Copyright &copy; {SITE.year} - All rights reserved.{" "}
        <span className="text-brand-yellow">{SITE.name}</span> , {SITE.creditLocation}
      </div>
    </footer>
  );
}
