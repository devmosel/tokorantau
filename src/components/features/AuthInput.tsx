"use client";

import type { InputEvent } from "react";
import { Input } from "@/components/ui/Field";
import type { InputFieldConfig } from "@/data/forms";

/** Auth-sized input that optionally strips whitespace as the user types. */
export function AuthInput({ noSpaces, ...props }: Omit<InputFieldConfig, "kind">) {
  const handleInput = noSpaces
    ? (e: InputEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
      }
    : undefined;

  return <Input fieldSize="auth" onInput={handleInput} {...props} />;
}