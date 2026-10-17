import Link from "next/link";
import { cn } from "@/lib/cn";
import type { DashboardStat } from "@/types/admin";

const CHIP: Record<DashboardStat["tone"], string> = {
  yellow: "bg-brand-yellow text-brand-black",
  red: "bg-brand-red text-white",
  green: "bg-green-600 text-white",
  blue: "bg-blue-600 text-white",
  muted: "bg-brand-muted text-white",
  black: "bg-brand-black text-white",
};

/** Dashboard tile: accent icon, big number and label. Links to its admin page when `href` is set. */
export function StatCard({ stat }: { stat: DashboardStat }) {
  const { icon: Icon, tone, label, value, href } = stat;

  const content = (
    <>
      <span className={cn("flex size-60 shrink-0 items-center justify-center text-[3rem]", CHIP[tone])}>
        <Icon aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[3.6rem] font-semibold leading-none text-brand-black">{value}</span>
        <span className="mt-5 block text-[1.5rem] capitalize text-brand-muted">{label}</span>
      </span>
    </>
  );

  const classes = "flex items-center gap-15 border-brand bg-white p-15";

  return href ? (
    <Link href={href} className={cn(classes, "transition-colors duration-200 hover:bg-brand-yellow/20")}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
