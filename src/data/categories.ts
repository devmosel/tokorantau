import type { IconType } from "react-icons";
import {
  BiBaguette,
  BiDrink,
  BiRestaurant,
  BiSolidBowlRice,
  BiSolidPopsicle,
} from "react-icons/bi";

/** Icons for known category slugs; unknown categories fall back to a generic one. */
const ICONS_BY_SLUG: Record<string, IconType> = {
  "fast-food": BiBaguette,
  "main-dishes": BiSolidBowlRice,
  drinks: BiDrink,
  desserts: BiSolidPopsicle,
};

export function getCategoryIcon(slug: string): IconType {
  return ICONS_BY_SLUG[slug] ?? BiRestaurant;
}