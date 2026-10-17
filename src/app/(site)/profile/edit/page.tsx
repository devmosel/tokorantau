import type { Metadata } from "next";
import { updateProfileAction } from "@/actions/auth";
import { FormContainer } from "@/components/features/FormContainer";
import { updateProfileFields } from "@/data/forms";
import { getMe } from "@/lib/api/account";

export const metadata: Metadata = { title: "Update Profile" };

export default async function UpdateProfilePage() {
  const user = await getMe();

  return (
    <FormContainer
      title="update profile"
      fields={updateProfileFields(user)}
      submitLabel="update now"
      action={updateProfileAction}
    />
  );
}
