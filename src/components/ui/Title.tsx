import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TitleProps {
  underlined?: boolean;
  className?: string;
  children: ReactNode;
}

/** Section title: centred, uppercase, 4rem (2.5rem on small phones). */
export function Title({ underlined, className, children }: TitleProps) {
  return (
    <h1
      className={cn(
        "mb-10 text-center text-[4rem] uppercase text-brand-black max-[499px]:text-[2.5rem]",
        underlined && "underline underline-offset-[1rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
}
