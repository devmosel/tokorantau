import type { Metadata } from "next";
import { ProfileCard } from "@/components/features/ProfileCard";
import { Section } from "@/components/ui/Section";
import { getMe } from "@/lib/api/account";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <Section>
      <ProfileCard user={user} />
    </Section>
  );
}
