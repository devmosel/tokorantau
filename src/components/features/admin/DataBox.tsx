import type { ReactNode } from "react";
import { Panel } from "@/components/ui/Panel";
import type { DataRow } from "@/types/admin";

interface DataBoxProps {
  rows: DataRow[];
  /** Action area (forms/buttons) rendered under the rows. */
  children?: ReactNode;
}

/** Bordered box listing `label: value` rows, used for orders, users, messages and admins. */
export function DataBox({ rows, children }: DataBoxProps) {
  return (
    <Panel className="flex flex-col gap-10">
      {rows.map((row) => (
        <p key={row.label} className="text-[1.8rem] text-brand-muted">
          {row.label} :{" "}
          <span className="break-words text-brand-black">{row.value}</span>
        </p>
      ))}
      {children}
    </Panel>
  );
}
