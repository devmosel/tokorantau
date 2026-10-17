"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Panel } from "@/components/ui/Panel";
import type { ActionState } from "@/types/actions";

const INITIAL_STATE: ActionState = {};

/** Admin sign-in: the backend uses a shared API key, not a username/password. */
export function AdminKeyForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, INITIAL_STATE);

  return (
    <Panel as="form" action={formAction} className="mx-auto w-full max-w-[50rem]">
      <h3 className="mb-10 text-center text-[2.5rem] uppercase text-brand-black">admin login</h3>
      <Input label="Admin key" type="password" name="key" placeholder="enter the admin key" required autoComplete="off" />
      {state.error && (
        <p role="alert" className="mb-10 text-[1.5rem] text-brand-red">
          {state.error}
        </p>
      )}
      <Button className="w-full text-center" disabled={pending}>
        login now
      </Button>
    </Panel>
  );
}
