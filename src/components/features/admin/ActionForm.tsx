"use client";

import { useActionState, type ReactNode } from "react";
import type { ActionState } from "@/types/actions";
import { cn } from "@/lib/cn";

interface ActionFormProps {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  /** Hidden inputs, e.g. the entity id. */
  hidden?: Record<string, string>;
  /** Asks for confirmation before submitting (destructive actions). */
  confirm?: string;
  /** Lets buttons elsewhere submit this form via their `form` attribute. */
  id?: string;
  className?: string;
  children: ReactNode;
}

const INITIAL_STATE: ActionState = {};

/** A `<form>` bound to a Server Action that shows the action's error/success message. */
export function ActionForm({ action, hidden, confirm, id, className, children }: ActionFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  return (
    <form
      id={id}
      action={formAction}
      className={cn("flex flex-col gap-10", className)}
      onSubmit={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
    >
      {Object.entries(hidden ?? {}).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children}
      {state.error && (
        <p role="alert" className="text-[1.4rem] text-brand-red">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-[1.4rem] text-green-600">{state.success}</p>}
    </form>
  );
}
