import "server-only";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { ROUTES } from "@/lib/routes";
import { ApiError, apiRequest, type ApiResult } from "./client";

type Options = Parameters<typeof apiRequest>[1];

/** Request on behalf of the logged-in buyer; sends anonymous or expired sessions to /login. */
export async function authedRequest<T>(path: string, options: Options = {}): Promise<ApiResult<T>> {
  const token = await getAccessToken();
  if (!token) redirect(ROUTES.login);

  try {
    return await apiRequest<T>(path, { ...options, token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect(ROUTES.login);
    throw error;
  }
}
