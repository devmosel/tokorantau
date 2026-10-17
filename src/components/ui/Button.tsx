import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "danger" | "dark";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-yellow text-brand-black",
  danger: "bg-brand-red text-white",
  dark: "bg-brand-black text-white",
};

const SIZES: Record<Size, string> = {
  md: "p-10 text-[2rem]",
  lg: "p-10 text-[2.5rem]",
};

const BASE =
  "mt-0 inline-block cursor-pointer capitalize leading-normal transition-all duration-200 hover:tracking-[0.2rem] hover:opacity-85";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type LinkProps = CommonProps & { href: string };

/** The mockup's `.btn` / `.logout-btn`: renders a link when `href` is given, else a button. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps | LinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="submit" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}