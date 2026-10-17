import type { Metadata } from "next";
import { registerAction } from "@/actions/auth";
import { FormContainer } from "@/components/features/FormContainer";
import { REGISTER_FIELDS } from "@/data/forms";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <FormContainer
      title="Register Now"
      fields={REGISTER_FIELDS}
      submitLabel="register now"
      action={registerAction}
      footer={{ text: "already have an account?", linkLabel: "login now", href: ROUTES.login }}
    />
  );
}
