import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "yellow" | "danger";

const TONES: Record<Tone, string> = {
  light: "bg-white text-brand-black hover:bg-brand-black hover:text-white",
  yellow: "bg-brand-yellow text-brand-black hover:bg-brand-black hover:text-white",
  danger: "bg-brand-red text-white hover:bg-brand-black",
};

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

/** Square bordered icon button used on product cards (view, add, edit, delete). */
export function IconButton({ tone = "light", className, children, ...props }: IconButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "flex cursor-pointer items-center justify-center border-brand text-[2rem] transition-all duration-200",
        TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
