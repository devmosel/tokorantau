import "server-only";
import type { User } from "@/types/api";
import { apiRequest } from "./client";
import { authedRequest } from "./authed";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) {
  await apiRequest("/users", { method: "POST", body: input });
}

export async function login(email: string, password: string): Promise<Tokens> {
  const { data } = await apiRequest<Tokens>("/authentications", {
    method: "POST",
    body: { email, password },
  });
  return data;
}

export async function revokeRefreshToken(refreshToken: string) {
  await apiRequest("/authentications", { method: "DELETE", body: { refreshToken } });
}

export async function getMe(): Promise<User> {
  const { data } = await authedRequest<User>("/users/me");
  return data;
}

export async function updateMe(input: { name?: string; phone?: string; address?: string }): Promise<User> {
  const { data } = await authedRequest<User>("/users/me", { method: "PUT", body: input });
  return data;
}

/** Always succeeds for any email (the API never reveals whether it is registered). */
export async function requestPasswordReset(email: string): Promise<void> {
  await apiRequest("/password-reset/request", { method: "POST", body: { email } });
}

export async function confirmPasswordReset(token: string, newPassword: string): Promise<void> {
  await apiRequest("/password-reset/confirm", { method: "POST", body: { token, newPassword } });
}
