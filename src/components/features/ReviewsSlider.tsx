"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Review } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";

const BREAKPOINTS = {
  640: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
};

export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  return (
    <Swiper
      modules={[Pagination]}
      loop
      grabCursor
      spaceBetween={20}
      pagination={{ clickable: true }}
      breakpoints={BREAKPOINTS}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <ReviewCard {...review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}