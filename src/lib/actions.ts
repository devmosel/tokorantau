import "server-only";
import { unstable_rethrow } from "next/navigation";
import type { ActionState } from "@/types/actions";
import { ApiError } from "./api/client";

/**
 * Runs a Server Action body and converts API failures into form-friendly state.
 * Redirects (including the ones thrown by the auth guard) are re-thrown untouched.
 */
export async function runAction(body: () => Promise<ActionState | void>): Promise<ActionState> {
  try {
    return (await body()) ?? {};
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Terjadi kesalahan. Coba lagi." };
  }
}