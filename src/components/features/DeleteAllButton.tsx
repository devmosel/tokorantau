"use client";

import { useActionState } from "react";
import { clearCartAction } from "@/actions/cart";
import { Button } from "@/components/ui/Button";
import type { ActionState } from "@/types/actions";

const INITIAL_STATE: ActionState = {};

/** Clears the whole cart after a confirmation prompt. */
export function DeleteAllButton() {
  const [state, formAction, pending] = useActionState(clearCartAction, INITIAL_STATE);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("delete all from cart?")) event.preventDefault();
      }}
    >
      <Button variant="danger" className="px-13" disabled={pending}>
        delete all
      </Button>
      {state.error && (
        <p role="alert" className="mt-10 text-[1.5rem] text-brand-red">
          {state.error}
        </p>
      )}
    </form>
  );
}
