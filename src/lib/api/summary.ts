import "server-only";
import type { User } from "@/types/api";
import { ApiError, apiRequest } from "./client";
import { getAccessToken } from "@/lib/auth/session";

export interface SessionSummary {
  user: User;
  cartCount: number;
}

/**
 * Header data: who is logged in and how many items are in their cart.
 * Never redirects; any auth failure just means "logged out".
 */
export async function getSessionSummary(): Promise<SessionSummary | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const [me, cart] = await Promise.all([
      apiRequest<User>("/users/me", { token }),
      apiRequest<{ items: { quantity: number }[] }>("/carts", { token }),
    ]);
    const cartCount = cart.data.items.reduce((sum, item) => sum + item.quantity, 0);
    return { user: me.data, cartCount };
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}
