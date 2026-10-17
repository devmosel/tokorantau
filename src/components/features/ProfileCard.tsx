import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { ROUTES } from "@/lib/routes";
import type { User } from "@/types/api";
import { UserAddressRow, UserContactRows } from "./UserInfoRow";

const ACTION = "my-10";

export function ProfileCard({ user }: { user: User }) {
  return (
    <Panel className="mx-auto max-w-500">
      <div className="flex h-200 items-center justify-center text-[12rem] text-brand-muted">
        <FaUserCircle aria-hidden />
      </div>
      <UserContactRows user={user} />
      <Button href={ROUTES.updateProfile} className={`${ACTION} mt-10!`}>
        update info
      </Button>
      <UserAddressRow address={user.address} />
      <Button href={ROUTES.updateAddress} className={`${ACTION} mt-10!`}>
        update address
      </Button>
    </Panel>
  );
}
