import "server-only";
import { redirect } from "next/navigation";
import { getAdminKey } from "@/lib/auth/session";
import { ADMIN_LOGIN_PATH } from "@/lib/auth/cookies";
import { ApiError, apiRequest, type ApiResult } from "../client";

type Options = Parameters<typeof apiRequest>[1];

/** Request with the admin key cookie; a missing or rejected key sends the user to the admin login. */
export async function adminRequest<T>(path: string, options: Options = {}): Promise<ApiResult<T>> {
  const adminKey = await getAdminKey();
  if (!adminKey) redirect(ADMIN_LOGIN_PATH);

  try {
    return await apiRequest<T>(path, { ...options, adminKey });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect(ADMIN_LOGIN_PATH);
    throw error;
  }
}

/** Checks a candidate key against the API without storing it. */
export async function verifyAdminKey(adminKey: string): Promise<boolean> {
  try {
    await apiRequest("/admin/categories", { adminKey });
    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return false;
    throw error;
  }
}
