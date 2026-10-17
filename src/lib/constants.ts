import type { NavLink } from "@/types";
import { ROUTES } from "./routes";

export const SITE = {
  name: "TokoRantau",
  logoPrefix: "Toko",
  logoSuffix: "Rantau",
  email: "adambis28@gmail.com",
  phone: "+4915204040529",
  openingHours: "07:00am to 10:00pm",
  address: "Trier Germany, 54290",
  creditLocation: "54290 Trier",
  year: 2022,
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: ROUTES.about },
  { label: "Menu", href: ROUTES.menu },
  { label: "Order", href: ROUTES.orders },
  { label: "Contact", href: ROUTES.contact },
];

export const ADMIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.admin.dashboard },
  { label: "Products", href: ROUTES.admin.products },
  { label: "Categories", href: ROUTES.admin.categories },
  { label: "Orders", href: ROUTES.admin.orders },
  { label: "Couriers", href: ROUTES.admin.couriers },
  { label: "Emails", href: ROUTES.admin.notifications },
];

export const MAX_QUANTITY = 99;
