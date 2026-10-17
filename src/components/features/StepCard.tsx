import type { Step } from "@/data/steps";

export function StepCard({ image, title, description }: Step) {
  return (
    <div className="border-brand bg-brand-black p-20 text-center text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-100 w-full object-contain invert" />
      <h3 className="my-20 text-[2.3rem] capitalize text-brand-yellow">{title}</h3>
      <p className="text-[1.5rem] leading-[2] text-white">{description}</p>
    </div>
  );
}