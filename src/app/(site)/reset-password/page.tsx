import type { Metadata } from "next";
import { resetPasswordAction } from "@/actions/auth";
import { EmptyState } from "@/components/features/EmptyState";
import { FormContainer } from "@/components/features/FormContainer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RESET_PASSWORD_FIELDS } from "@/data/forms";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Reset Password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Section className="flex min-h-[60vh] flex-col items-center justify-center gap-20">
        <EmptyState>This reset link is invalid. Request a new one.</EmptyState>
        <Button href={ROUTES.forgotPassword}>request new link</Button>
      </Section>
    );
  }

  return (
    <FormContainer
      title="reset password"
      fields={RESET_PASSWORD_FIELDS}
      submitLabel="change password"
      action={resetPasswordAction}
      hidden={{ token }}
    />
  );
}
