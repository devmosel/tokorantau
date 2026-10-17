import "server-only";
import type { Courier, EmailNotification, Meta, Order, OrderStatus, Paginated } from "@/types/api";
import { adminRequest } from "./request";

export async function getAdminOrders(
  query: { page?: number; limit?: number; status?: string } = {},
): Promise<Paginated<Order>> {
  const { data, meta } = await adminRequest<Order[]>("/admin/orders", { query });
  return { items: data, meta: meta as Meta };
}

/** Total orders in a status, using the list endpoint's `meta.total` (limit=1 keeps it cheap). */
export async function countOrders(status?: OrderStatus): Promise<number> {
  const { meta } = await getAdminOrders({ limit: 1, status });
  return meta.total;
}

export async function setShippingCost(orderId: string, shippingCost: number) {
  await adminRequest(`/admin/orders/${orderId}/shipping-cost`, { method: "PUT", body: { shippingCost } });
}

export async function setOrderStatus(orderId: string, status: OrderStatus) {
  await adminRequest(`/admin/orders/${orderId}/status`, { method: "PUT", body: { status } });
}

export async function setShipment(orderId: string, courierId: string, trackingNumber: string) {
  await adminRequest(`/admin/orders/${orderId}/shipment`, {
    method: "PUT",
    body: { courierId, trackingNumber },
  });
}

/** Courier responses are wrapped: `data.courier` / `data.couriers`. */
export async function getCouriers(includeInactive = false): Promise<Courier[]> {
  const { data } = await adminRequest<{ couriers: Courier[] }>("/admin/couriers", {
    query: { includeInactive: includeInactive ? "true" : undefined },
  });
  return data.couriers;
}

export async function createCourier(input: { name: string; code: string }) {
  await adminRequest("/admin/couriers", { method: "POST", body: input });
}

export async function updateCourier(id: string, input: { name?: string; code?: string; isActive?: boolean }) {
  await adminRequest(`/admin/couriers/${id}`, { method: "PUT", body: input });
}

export async function deleteCourier(id: string) {
  await adminRequest(`/admin/couriers/${id}`, { method: "DELETE" });
}

/** Notification responses are wrapped: `data.notifications`. */
export async function getNotifications(
  query: { page?: number; limit?: number; status?: string } = {},
): Promise<Paginated<EmailNotification>> {
  const { data, meta } = await adminRequest<{ notifications: EmailNotification[] }>("/admin/notifications", {
    query,
  });
  return { items: data.notifications, meta: meta as Meta };
}
