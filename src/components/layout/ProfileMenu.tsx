import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/routes";

interface ProfileMenuProps {
  /** Logged-in user's name; null shows the login/register links only. */
  name: string | null;
  profileHref: string;
  open: boolean;
  /** Server Action that ends the session. */
  logoutAction?: () => Promise<void>;
}

const AUTH_LINK =
  "text-brand-black transition-colors duration-200 hover:text-brand-yellow hover:underline";

/** Dropdown card under the user icon: account actions when logged in, auth links otherwise. */
export function ProfileMenu({ name, profileHref, open, logoutAction }: ProfileMenuProps) {
  return (
    <div
      className={cn(
        "absolute right-20 top-[120%] w-300 border-brand bg-white p-15 text-center",
        open ? "inline-block animate-fade-in" : "hidden",
      )}
    >
      {name ? (
        <>
          <p className="mb-10 text-[2rem] font-semibold text-brand-black">{name}</p>
          <form action={logoutAction} className="flex items-center justify-between">
            <Button href={profileHref} className="ml-30 mt-10 px-13">
              Profile
            </Button>
            <Button variant="danger" className="mr-30 mt-10 px-13">
              log out
            </Button>
          </form>
        </>
      ) : (
        <p className="mt-10 text-[2rem] text-brand-muted">
          <Link href={ROUTES.login} className={AUTH_LINK}>
            Login
          </Link>{" "}
          or{" "}
          <Link href={ROUTES.register} className={AUTH_LINK}>
            Register
          </Link>
        </p>
      )}
    </div>
  );
}
