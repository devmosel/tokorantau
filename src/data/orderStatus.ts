import type { BadgeTone } from "@/components/ui/Badge";
import type { OrderStatus } from "@/types/api";

interface StatusStyle {
  label: string;
  /** Tailwind text colour class. */
  tone: string;
  /** Pill colour used in admin views. */
  badge: BadgeTone;
}

export const ORDER_STATUS: Record<OrderStatus, StatusStyle> = {
  PENDING_PAYMENT: { label: "pending payment", tone: "text-brand-red", badge: "yellow" },
  PAID: { label: "paid", tone: "text-blue-600", badge: "blue" },
  SHIPPED: { label: "shipped", tone: "text-blue-600", badge: "blue" },
  COMPLETED: { label: "completed", tone: "text-green-600", badge: "green" },
  CANCELLED: { label: "cancelled", tone: "text-brand-muted", badge: "muted" },
};

/** Valid admin status transitions (mirrors the API's state machine). */
export const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING_PAYMENT: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

/** Statuses in which courier/tracking can still be set or corrected. */
export const SHIPMENT_EDITABLE: OrderStatus[] = ["PENDING_PAYMENT", "PAID", "SHIPPED"];

export const ORDER_STATUSES = Object.keys(ORDER_STATUS) as OrderStatus[];
