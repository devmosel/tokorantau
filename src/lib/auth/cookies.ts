/** Cookie names and helpers shared by the proxy and server code (no server-only imports). */
export const ACCESS_COOKIE = "tr_access";
export const REFRESH_COOKIE = "tr_refresh";
export const ADMIN_COOKIE = "tr_admin";

export const ADMIN_LOGIN_PATH = "/admin/login";

/** Routes that require a logged-in buyer. */
export const PROTECTED_PATHS = ["/cart", "/checkout", "/orders", "/profile"];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Admin pages other than the login form need the admin key cookie. */
export function isAdminProtectedPath(pathname: string): boolean {
  return (pathname === "/admin" || pathname.startsWith("/admin/")) && pathname !== ADMIN_LOGIN_PATH;
}

/** Reads the `exp` claim (seconds since epoch) from a JWT without verifying it. */
export function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const { exp } = JSON.parse(json) as { exp?: number };
    return typeof exp === "number" ? exp : null;
  } catch {
    return null;
  }
}

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7;

/** Cookie options for a token; lifetime follows the token's own expiry when known. */
export function cookieOptions(token: string) {
  const exp = getTokenExpiry(token);
  const remaining = exp ? exp - Math.floor(Date.now() / 1000) : DEFAULT_MAX_AGE;
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.max(remaining, 0),
  };
}
