import "server-only";
import type { Meta, Order, Paginated } from "@/types/api";
import { authedRequest } from "./authed";

export async function checkout(shippingAddress?: string): Promise<Order> {
  const { data } = await authedRequest<Order>("/orders", {
    method: "POST",
    body: shippingAddress ? { shippingAddress } : {},
  });
  return data;
}

export async function getOrders(page = 1, limit = 20): Promise<Paginated<Order>> {
  const { data, meta } = await authedRequest<Order[]>("/orders", { query: { page, limit } });
  return { items: data, meta: meta as Meta };
}

export async function cancelOrder(id: string): Promise<Order> {
  const { data } = await authedRequest<Order>(`/orders/${id}/cancel`, { method: "PUT" });
  return data;
}
