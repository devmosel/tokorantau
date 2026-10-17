"use client";

import { useActionState } from "react";
import { cancelOrderAction } from "@/actions/orders";
import { Button } from "@/components/ui/Button";
import type { ActionState } from "@/types/actions";

const INITIAL_STATE: ActionState = {};

/** "Cancel order" button; the API only allows it while the order awaits payment. */
export function CancelOrderForm({ orderId }: { orderId: string }) {
  const [state, formAction, pending] = useActionState(cancelOrderAction, INITIAL_STATE);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("cancel this order?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="orderId" value={orderId} />
      <Button variant="danger" className="mt-10 px-13 text-[1.5rem]!" disabled={pending}>
        cancel order
      </Button>
      {state.error && (
        <p role="alert" className="mt-10 text-[1.2rem] text-brand-red">
          {state.error}
        </p>
      )}
    </form>
  );
}
