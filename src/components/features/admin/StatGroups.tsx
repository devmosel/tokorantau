import type { DashboardGroup } from "@/types/admin";
import { StatCard } from "./StatCard";

/** Titled groups of stat tiles. */
export function StatGroups({ groups }: { groups: DashboardGroup[] }) {
  return (
    <div className="flex flex-col gap-30">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="mb-10 border-b-[0.2rem] border-solid border-brand-black pb-5 text-[2rem] uppercase text-brand-black">
            {group.title}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-15">
            {group.stats.map((stat) => (
              <StatCard key={stat.key} stat={stat} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
