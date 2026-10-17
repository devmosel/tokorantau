import type { IconType } from "react-icons";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { User } from "@/types/api";

interface UserInfoRowProps {
  icon: IconType;
  className?: string;
  children: ReactNode;
}

/** An "icon + value" line used on the checkout and profile pages. */
export function UserInfoRow({ icon: Icon, className, children }: UserInfoRowProps) {
  return (
    <p className={cn("py-10 text-[2rem] leading-normal", className)}>
      <Icon className="mr-10 inline align-[-0.125em] text-brand-muted" />
      <span className="text-brand-black">{children}</span>
    </p>
  );
}

/** Name, phone and email rows of a user. */
export function UserContactRows({ user }: { user: Pick<User, "name" | "phone" | "email"> }) {
  return (
    <>
      <UserInfoRow icon={FaUser}>{user.name}</UserInfoRow>
      <UserInfoRow icon={FaPhone}>{user.phone}</UserInfoRow>
      <UserInfoRow icon={FaEnvelope}>{user.email}</UserInfoRow>
    </>
  );
}

export function UserAddressRow({ address, className }: { address: string | null; className?: string }) {
  return (
    <UserInfoRow icon={FaMapMarkerAlt} className={className}>
      {address || "No address yet"}
    </UserInfoRow>
  );
}
