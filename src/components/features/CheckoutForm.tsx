"use client";

import { useActionState } from "react";
import { checkoutAction } from "@/actions/orders";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { Panel } from "@/components/ui/Panel";
import { ROUTES } from "@/lib/routes";
import type { ActionState } from "@/types/actions";
import type { User } from "@/types/api";
import { OrderSummary, type SummaryLine } from "./OrderSummary";
import { UserAddressRow, UserContactRows } from "./UserInfoRow";

interface CheckoutFormProps {
  lines: SummaryLine[];
  grandTotal: number;
  user: User;
}

const HEADING = "py-15 text-[3rem] capitalize";
const INITIAL_STATE: ActionState = {};

export function CheckoutForm({ lines, grandTotal, user }: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(checkoutAction, INITIAL_STATE);
  const hasAddress = Boolean(user.address);

  return (
    <Panel as="form" action={formAction} className="mx-auto max-w-500">
      <OrderSummary lines={lines} grandTotal={grandTotal} />

      <div>
        <h3 className={HEADING}>your info</h3>
        <UserContactRows user={user} />
        <Button href={ROUTES.updateProfile}>update info</Button>

        <h3 className={HEADING}>delivery address</h3>
        <UserAddressRow address={user.address} />
        <Button href={ROUTES.updateAddress}>update address</Button>

        {/* The API has no payment method yet; shown for layout parity with the design. */}
        <Select name="method" disabled defaultValue="" aria-label="Payment method">
          <option value="">payment is arranged after ordering</option>
        </Select>
        <p className="mb-20 text-[1.5rem] text-brand-muted">
          Shipping cost is added by the shop after you place your order.
        </p>

        {state.error && (
          <p role="alert" className="mb-10 text-[1.5rem] text-brand-red">
            {state.error}
          </p>
        )}
        {!hasAddress && (
          <p className="mb-10 text-[1.5rem] text-brand-red">Add a delivery address to place your order.</p>
        )}

        <Button variant="danger" className="w-full" disabled={pending || !hasAddress}>
          place order
        </Button>
      </div>
    </Panel>
  );
}
