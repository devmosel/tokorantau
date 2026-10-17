"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  confirmPasswordReset,
  login,
  registerUser,
  requestPasswordReset,
  revokeRefreshToken,
  updateMe,
} from "@/lib/api/account";
import { runAction } from "@/lib/actions";
import { clearSession, getRefreshToken, setSession } from "@/lib/auth/session";
import { ROUTES } from "@/lib/routes";
import type { ActionState } from "@/types/actions";

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

/** Only allow same-site relative redirects (blocks open redirects like //evil.com). */
function safeNext(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? value : ROUTES.home;
}

/** Adds the submitted values to a failed result so the form keeps what the user typed. */
function keepValues(result: ActionState, formData: FormData, keys: string[]): ActionState {
  if (!result.error) return result;
  return { ...result, values: Object.fromEntries(keys.map((key) => [key, text(formData, key)])) };
}

async function signIn(email: string, password: string, next: string): Promise<never> {
  const tokens = await login(email, password);
  await setSession(tokens.accessToken, tokens.refreshToken);
  revalidatePath("/", "layout");
  redirect(next);
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const result = await runAction(() =>
    signIn(text(formData, "email"), String(formData.get("pass") ?? ""), safeNext(text(formData, "next"))),
  );
  return keepValues(result, formData, ["email"]);
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("pass") ?? "");
  if (password !== String(formData.get("confirm_pass") ?? "")) {
    return { error: "Passwords do not match." };
  }

  const result = await runAction(async () => {
    const email = text(formData, "email");
    await registerUser({ name: text(formData, "name"), email, password, phone: text(formData, "phone") });
    await signIn(email, password, ROUTES.home);
  });
  return keepValues(result, formData, ["name", "email", "phone"]);
}

export async function logoutAction(): Promise<void> {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      await revokeRefreshToken(refreshToken);
    } catch {
      // The cookies are cleared either way; a stale server-side token expires on its own.
    }
  }
  await clearSession();
  revalidatePath("/", "layout");
  redirect(ROUTES.home);
}

export async function updateProfileAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const result = await runAction(async () => {
    await updateMe({ name: text(formData, "name"), phone: text(formData, "phone") });
    revalidatePath("/", "layout");
    redirect(ROUTES.profile);
  });
  return keepValues(result, formData, ["name", "phone"]);
}

/** The API stores a single address string, so the mockup's address fields are joined. */
export async function updateAddressAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const address = ["flat", "street", "city", "state", "post_code", "country"]
    .map((key) => text(formData, key))
    .filter(Boolean)
    .join(", ");

  const result = await runAction(async () => {
    await updateMe({ address });
    revalidatePath("/", "layout");
    redirect(ROUTES.profile);
  });
  return keepValues(result, formData, ["flat", "street", "city", "state", "post_code", "country"]);
}

export async function forgotPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const result = await runAction(async () => {
    await requestPasswordReset(text(formData, "email").toLowerCase());
    return { success: "If the email is registered, a reset link has been sent." };
  });
  return keepValues(result, formData, ["email"]);
}

export async function resetPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("new_pass") ?? "");
  if (password !== String(formData.get("confirm_pass") ?? "")) {
    return { error: "Passwords do not match." };
  }

  return runAction(async () => {
    await confirmPasswordReset(text(formData, "token"), password);
    redirect(`${ROUTES.login}?reset=1`);
  });
}
