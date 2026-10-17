/** DTOs matching "api documentation/api-contract.md" (v3.0.0). */

export interface Meta {
  page: number;
  limit: number;
  total: number;
}

export interface Paginated<T> {
  items: T[];
  meta: Meta;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  categoryId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  itemsSubtotal: number;
}

export type OrderStatus = "PENDING_PAYMENT" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

export interface CourierRef {
  id: string;
  name: string;
  code: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  shippingAddress: string;
  itemsSubtotal: number;
  shippingCost: number | null;
  totalAmount: number | null;
  items: OrderItem[];
  courier: CourierRef | null;
  trackingNumber: string | null;
  createdAt: string;
}

export interface Courier {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
}

export type EmailType =
  | "ORDER_CREATED"
  | "ORDER_PAID"
  | "ORDER_SHIPPED"
  | "ORDER_CANCELLED"
  | "PASSWORD_RESET";

export interface EmailNotification {
  id: string;
  recipient: string;
  type: EmailType;
  orderId: string | null;
  subject: string;
  status: "SENT" | "FAILED";
  provider: string;
  errorMessage: string | null;
  createdAt: string;
}

/** Writable product fields (create = all required except images/isActive; update = partial). */
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  isActive: boolean;
}
