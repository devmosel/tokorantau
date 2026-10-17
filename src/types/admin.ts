import type { IconType } from "react-icons";
import type { BadgeTone } from "@/components/ui/Badge";

export interface DashboardStat {
  key: string;
  label: string;
  value: number | string;
  icon: IconType;
  /** Accent colour of the icon chip. */
  tone: BadgeTone;
  /** Makes the tile a link to the matching admin page. */
  href?: string;
}

export interface DashboardGroup {
  title: string;
  stats: DashboardStat[];
}

export interface DataRow {
  label: string;
  value: string;
}
