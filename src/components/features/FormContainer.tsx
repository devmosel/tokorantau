"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import type { FormFieldConfig } from "@/data/forms";
import type { ActionState } from "@/types/actions";
import { AuthInput } from "./AuthInput";

interface FormContainerProps {
  title: string;
  fields: FormFieldConfig[];
  submitLabel: string;
  /** Server Action that handles the submission. */
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  /** Extra hidden inputs (e.g. the post-login redirect target). */
  hidden?: Record<string, string>;
  /** Optional "already have an account?" line under the submit button. */
  footer?: { text: string; linkLabel: string; href: string };
  /** Extra links shown under the footer line (e.g. "forgot password?"). */
  links?: { label: string; href: string }[];
  /** Info message above the fields (e.g. after a successful password reset). */
  notice?: string;
}

const INITIAL_STATE: ActionState = {};

/** Centred bordered form card shared by login, register, update profile and update address. */
export function FormContainer({ title, fields, submitLabel, action, hidden, footer, links, notice }: FormContainerProps) {
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);

  return (
    <Section className="flex min-h-[80vh] items-center justify-center">
      <Panel as="form" action={formAction} className="w-full max-w-450 text-center">
        <h3 className="mb-10 text-[2.5rem] uppercase text-brand-black">{title}</h3>

        {notice && <p className="my-10 text-[1.5rem] text-green-600">{notice}</p>}

        {Object.entries(hidden ?? {}).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}

        {fields.map((field) =>
          field.kind === "select" ? (
            <Select
              key={field.name}
              fieldSize="auth"
              name={field.name}
              required={field.required}
              defaultValue={state.values?.[field.name] ?? ""}
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          ) : (
            <AuthInput
              key={field.name}
              {...field}
              defaultValue={state.values?.[field.name] ?? field.defaultValue}
            />
          ),
        )}

        {state.error && (
          <p role="alert" className="my-10 text-[1.5rem] text-brand-red">
            {state.error}
          </p>
        )}

        {state.success && <p className="my-10 text-[1.5rem] text-green-600">{state.success}</p>}

        <Button className="mb-10 mt-10! hover:bg-brand-black hover:text-white" disabled={pending}>
          {submitLabel}
        </Button>

        {footer && (
          <p className="text-[1.5rem] text-brand-muted">
            {footer.text}{" "}
            <Link href={footer.href} className="text-brand-black hover:underline">
              {footer.linkLabel}
            </Link>
          </p>
        )}

        {links?.map((link) => (
          <p key={link.href} className="text-[1.5rem]">
            <Link href={link.href} className="text-brand-muted hover:text-brand-black hover:underline">
              {link.label}
            </Link>
          </p>
        ))}
      </Panel>
    </Section>
  );
}
