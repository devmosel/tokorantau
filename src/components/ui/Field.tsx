import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

/** Spacing and type scale per context; the bordered look is shared. */
export type FieldSize = "auth" | "contact" | "checkout" | "search";

const FIELD_BASE = "w-full border-brand text-brand-black";

const FIELD_SIZES: Record<FieldSize, string> = {
  auth: "my-7 p-15 text-[1.8rem]",
  contact: "my-10 p-5 text-[2rem]",
  checkout: "my-20 p-10 text-[1.6rem]",
  search: "p-10 text-[1.7rem]",
};

export function fieldClasses(size: FieldSize, className?: string) {
  return cn(FIELD_BASE, FIELD_SIZES[size], className);
}

interface FieldProps {
  fieldSize?: FieldSize;
  /** Visible label shown above the control; omit to render the bare control. */
  label?: string;
}

/** Wraps a control with its visible label (clicking the label focuses the control). */
function Labelled({ label, children }: { label?: string; children: ReactNode }) {
  if (!label) return children;
  return (
    <label className="block text-left">
      <span className="mt-10 block text-[1.5rem] font-medium text-brand-black">{label}</span>
      {children}
    </label>
  );
}

export function Input({
  fieldSize = "auth",
  label,
  className,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Labelled label={label}>
      <input className={fieldClasses(fieldSize, className)} {...props} />
    </Labelled>
  );
}

export function Textarea({
  fieldSize = "contact",
  label,
  className,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Labelled label={label}>
      <textarea className={fieldClasses(fieldSize, cn("h-200 resize-none", className))} {...props} />
    </Labelled>
  );
}

export function Select({
  fieldSize = "checkout",
  label,
  className,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Labelled label={label}>
      <select className={fieldClasses(fieldSize, className)} {...props} />
    </Labelled>
  );
}
