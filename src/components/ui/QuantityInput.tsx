"use client";

import type { InputHTMLAttributes, KeyboardEvent } from "react";
import { MAX_QUANTITY } from "@/lib/constants";
import { cn } from "@/lib/cn";

/** Blocks a third digit, like the mockup's `onkeypress` guard. */
function limitToTwoDigits(e: KeyboardEvent<HTMLInputElement>) {
  const { value, selectionStart, selectionEnd } = e.currentTarget;
  if (/^\d$/.test(e.key) && value.length >= 2 && selectionStart === selectionEnd) {
    e.preventDefault();
  }
}

/** Number input limited to 1..99. */
export function QuantityInput({
  className,
  defaultValue = 1,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "min" | "max">) {
  return (
    <input
      type="number"
      name="qty"
      min={1}
      max={MAX_QUANTITY}
      defaultValue={defaultValue}
      onKeyDown={limitToTwoDigits}
      className={cn("border-brand p-8 text-[1.8rem]", className)}
      {...props}
    />
  );
}
