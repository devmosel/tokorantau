"use server";

import { revalidatePath } from "next/cache";
import { addCartItem, getCart, removeCartItem, updateCartItem } from "@/lib/api/cart";
import { runAction } from "@/lib/actions";
import type { ActionState } from "@/types/actions";

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "");

/** One action for every cart form; the clicked button's `intent` picks the operation. */
export async function cartAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const intent = text(formData, "intent");
  const quantity = Number(text(formData, "qty"));

  return runAction(async () => {
    if (intent === "add") {
      await addCartItem(text(formData, "productId"), quantity);
    } else if (intent === "update") {
      await updateCartItem(text(formData, "itemId"), quantity);
    } else if (intent === "remove") {
      await removeCartItem(text(formData, "itemId"));
    }
    revalidatePath("/", "layout");
    return intent === "add" ? { success: "Added to cart" } : {};
  });
}

export async function clearCartAction(): Promise<ActionState> {
  return runAction(async () => {
    const { items } = await getCart();
    for (const item of items) await removeCartItem(item.id);
    revalidatePath("/", "layout");
  });
}