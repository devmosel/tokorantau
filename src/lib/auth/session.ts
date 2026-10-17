import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, ADMIN_COOKIE, REFRESH_COOKIE, cookieOptions } from "./cookies";

/** Reads and writes the session cookies. Writing only works in Server Actions / Route Handlers. */
export async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}

export async function setSession(accessToken: string, refreshToken: string): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, cookieOptions(accessToken));
  store.set(REFRESH_COOKIE, refreshToken, cookieOptions(refreshToken));
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

const ADMIN_MAX_AGE = 60 * 60 * 8;

export async function getAdminKey(): Promise<string | undefined> {
  return (await cookies()).get(ADMIN_COOKIE)?.value;
}

/** The admin key is a shared secret, so it lives only in an httpOnly cookie scoped to /admin. */
export async function setAdminKey(key: string): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: ADMIN_MAX_AGE,
  });
}

export async function clearAdminKey(): Promise<void> {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}
