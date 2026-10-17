import "server-only";
import type { Cart, CartItem, Product } from "@/types/api";
import { authedRequest } from "./authed";
import { getProduct } from "./catalog";

export async function getCart(): Promise<Cart> {
  const { data } = await authedRequest<Cart>("/carts");
  return data;
}

export async function addCartItem(productId: string, quantity: number): Promise<CartItem> {
  const { data } = await authedRequest<CartItem>("/carts/items", {
    method: "POST",
    body: { productId, quantity },
  });
  return data;
}

export async function updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
  const { data } = await authedRequest<CartItem>(`/carts/items/${itemId}`, {
    method: "PUT",
    body: { quantity },
  });
  return data;
}

export async function removeCartItem(itemId: string): Promise<void> {
  await authedRequest(`/carts/items/${itemId}`, { method: "DELETE" });
}

export interface CartLine {
  item: CartItem;
  /** Null when the product was deactivated after being added. */
  product: Product | null;
}

/** Cart lines joined with their product (the cart endpoint has no images or categories). */
export async function getCartLines(): Promise<{ lines: CartLine[]; total: number }> {
  const { items, itemsSubtotal } = await getCart();
  const lines = await Promise.all(
    items.map(async (item) => ({ item, product: await getProduct(item.productId) })),
  );
  return { lines, total: itemsSubtotal };
}