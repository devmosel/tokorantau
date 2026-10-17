import type { Metadata } from "next";
import { forgotPasswordAction } from "@/actions/auth";
import { FormContainer } from "@/components/features/FormContainer";
import { FORGOT_PASSWORD_FIELDS } from "@/data/forms";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <FormContainer
      title="forgot password"
      fields={FORGOT_PASSWORD_FIELDS}
      submitLabel="send reset link"
      action={forgotPasswordAction}
      footer={{ text: "remembered it?", linkLabel: "login now", href: ROUTES.login }}
    />
  );
}
