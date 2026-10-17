import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  ADMIN_COOKIE,
  ADMIN_LOGIN_PATH,
  REFRESH_COOKIE,
  cookieOptions,
  getTokenExpiry,
  isAdminProtectedPath,
  isProtectedPath,
} from "@/lib/auth/cookies";

const REFRESH_MARGIN_SECONDS = 30;

function redirectToLogin(request: NextRequest) {
  const url = new URL("/login", request.url);
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

/**
 * Runs before rendering: renews an expired access token with the refresh token (Server
 * Components cannot set cookies) and sends anonymous visitors away from protected routes.
 */
export async function proxy(request: NextRequest) {
  if (isAdminProtectedPath(request.nextUrl.pathname)) {
    return request.cookies.get(ADMIN_COOKIE)
      ? NextResponse.next()
      : NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }
  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  const protectedPath = isProtectedPath(request.nextUrl.pathname);

  if (!refresh) {
    return protectedPath ? redirectToLogin(request) : NextResponse.next();
  }

  const expiry = access ? getTokenExpiry(access) : null;
  const now = Math.floor(Date.now() / 1000);
  const stillValid = access && (expiry === null || expiry - now > REFRESH_MARGIN_SECONDS);
  if (stillValid) return NextResponse.next();

  const baseUrl = process.env.API_BASE_URL?.replace(/\/$/, "");
  try {
    const res = await fetch(`${baseUrl}/authentications`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    const json = (await res.json()) as { data?: { accessToken?: string } };
    const newAccess = json.data?.accessToken;
    if (!res.ok || !newAccess) throw new Error("refresh rejected");

    // Make the new token visible to this request's render, and persist it in the browser.
    request.cookies.set(ACCESS_COOKIE, newAccess);
    const headers = new Headers(request.headers);
    headers.set("cookie", request.cookies.toString());
    const response = NextResponse.next({ request: { headers } });
    response.cookies.set(ACCESS_COOKIE, newAccess, cookieOptions(newAccess));
    return response;
  } catch {
    const response = protectedPath ? redirectToLogin(request) : NextResponse.next();
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|img/|favicon.ico).*)"],
};
