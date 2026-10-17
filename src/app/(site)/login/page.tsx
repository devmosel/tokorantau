import type { Metadata } from "next";
import { loginAction } from "@/actions/auth";
import { FormContainer } from "@/components/features/FormContainer";
import { LOGIN_FIELDS } from "@/data/forms";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; reset?: string }>;
}) {
  const { next, reset } = await searchParams;

  return (
    <FormContainer
      title="Login Now"
      fields={LOGIN_FIELDS}
      submitLabel="login now"
      action={loginAction}
      hidden={next ? { next } : undefined}
      notice={reset ? "Password changed. Please log in with your new password." : undefined}
      links={[{ label: "forgot password?", href: ROUTES.forgotPassword }]}
      footer={{ text: "Don't have an account?", linkLabel: "register now", href: ROUTES.register }}
    />
  );
}
