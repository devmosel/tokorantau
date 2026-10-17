import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import type { Review } from "@/data/reviews";

const MAX_STARS = 5;

export function ReviewCard({ image, name, text, rating }: Review) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="mb-40 border-brand p-20 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="mx-auto mb-5 h-100 w-100 rounded-full object-contain"
      />
      <p className="py-10 text-[1.5rem] leading-[2] text-brand-muted">{text}</p>
      <div
        className="inline-flex gap-1 border-brand px-15 py-5 text-[1.5rem] text-brand-yellow"
        aria-label={`${rating} out of ${MAX_STARS} stars`}
      >
        {Array.from({ length: full }, (_, i) => (
          <FaStar key={i} />
        ))}
        {hasHalf && <FaStarHalfAlt />}
      </div>
      <h3 className="mt-15 text-[1.8rem] capitalize text-brand-black">{name}</h3>
    </div>
  );
}