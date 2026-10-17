"use client";

import { Autoplay, EffectFlip, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { HeroSlide } from "@/data/hero";

/** Auto-playing flip carousel shown at the top of the home page. */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  // Looping needs more slides than are visible; with one slide, show it statically.
  const multiple = slides.length > 1;

  return (
    <Section>
      <Swiper
        modules={[Autoplay, EffectFlip, Pagination]}
        loop={multiple}
        autoplay={multiple ? { delay: 4500 } : false}
        effect="flip"
        grabCursor
        pagination={{ clickable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="my-40 flex flex-wrap-reverse items-center gap-20">
              <div className="flex-[1_1_40rem] text-center">
                <span className="text-[2rem] text-brand-muted">{slide.eyebrow}</span>
                <h3 className="text-[5rem] capitalize text-brand-black">{slide.title}</h3>
                <Button href={slide.href} className="mt-10 px-13">
                  Order Now
                </Button>
              </div>
              <div className="flex-[1_1_40rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image} alt={slide.title} className="w-full" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}