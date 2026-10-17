"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelOrder, checkout } from "@/lib/api/orders";
import { runAction } from "@/lib/actions";
import { ROUTES } from "@/lib/routes";
import type { ActionState } from "@/types/actions";

/** Checks out the whole cart; the API uses the profile address as the shipping address. */
export async function checkoutAction(): Promise<ActionState> {
  return runAction(async () => {
    await checkout();
    revalidatePath("/", "layout");
    redirect(ROUTES.orders);
  });
}

export async function cancelOrderAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return runAction(async () => {
    await cancelOrder(String(formData.get("orderId") ?? ""));
    revalidatePath(ROUTES.orders);
    return { success: "Order cancelled" };
  });
}
