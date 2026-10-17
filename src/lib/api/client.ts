import "server-only";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: Method;
  body?: unknown;
  /** Bearer access token for buyer endpoints. */
  token?: string;
  /** Admin API key for `/admin/*` endpoints. */
  adminKey?: string;
  query?: Record<string, string | number | undefined>;
}

interface Envelope<T> {
  status: "success" | "fail" | "error";
  data?: T;
  message?: string;
  meta?: unknown;
}

export interface ApiResult<T> {
  data: T;
  meta?: unknown;
}

function baseUrl(): string {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error("API_BASE_URL is not set (see .env.example)");
  return url.replace(/\/$/, "");
}

/** The single place that talks HTTP to the backend. Unwraps the `{status,data}` envelope. */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, token, adminKey, query }: RequestOptions = {},
): Promise<ApiResult<T>> {
  const url = new URL(baseUrl() + path);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  if (adminKey) headers["X-Admin-Key"] = adminKey;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Server tidak dapat dihubungi. Coba lagi nanti.", 503);
  }

  let json: Envelope<T> | null = null;
  try {
    json = (await response.json()) as Envelope<T>;
  } catch {
    // Non-JSON body; handled below.
  }

  if (!response.ok || !json || json.status !== "success") {
    const fallback = response.status >= 500 ? "Terjadi kegagalan pada server." : "Permintaan gagal.";
    throw new ApiError(json?.message ?? fallback, response.status);
  }

  return { data: json.data as T, meta: json.meta };
}
