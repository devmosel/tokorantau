import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";

export function AboutSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-center justify-center gap-15">
        <div className="flex-[1_1_40rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/5708180.jpg" alt="" className="w-full" />
        </div>

        <div className="flex-[1_1_40rem] text-center">
          <h3 className="text-[3rem] capitalize text-brand-black">why choose us?</h3>
          <p className="mb-20 py-10 text-[1.7rem] leading-[2] text-brand-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ipsa ea ipsam omnis,
            nisi facilis velit eum facere, nostrum iste nam porro harum sed earum eaque culpa totam,
            eligendi necessitatibus?
          </p>
          <Button href={ROUTES.menu}>See menus</Button>
        </div>
      </div>
    </Section>
  );
}