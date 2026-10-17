import type { Metadata } from "next";
import {
  BiCheckCircle,
  BiCreditCard,
  BiEnvelope,
  BiFoodMenu,
  BiPackage,
  BiTime,
  BiSolidTruck,
  BiUserX,
  BiCategory,
} from "react-icons/bi";
import { StatGroups } from "@/components/features/admin/StatGroups";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { getAdminCategories, getAdminProducts } from "@/lib/api/admin/catalog";
import { countOrders, getCouriers, getNotifications } from "@/lib/api/admin/fulfilment";
import { ROUTES } from "@/lib/routes";
import type { DashboardGroup } from "@/types/admin";
import type { OrderStatus } from "@/types/api";

export const metadata: Metadata = { title: "Admin Dashboard" };

const ordersHref = (status: OrderStatus) => `${ROUTES.admin.orders}?status=${status}`;

async function loadGroups(): Promise<DashboardGroup[]> {
  const [pending, paid, shipped, completed, cancelled, products, categories, couriers, notifications] =
    await Promise.all([
      countOrders("PENDING_PAYMENT"),
      countOrders("PAID"),
      countOrders("SHIPPED"),
      countOrders("COMPLETED"),
      countOrders("CANCELLED"),
      getAdminProducts({ limit: 1 }),
      getAdminCategories(),
      getCouriers(true),
      getNotifications({ limit: 1 }),
    ]);

  return [
    {
      title: "Orders",
      stats: [
        { key: "pending", label: "awaiting payment", value: pending, icon: BiTime, tone: "yellow", href: ordersHref("PENDING_PAYMENT") },
        { key: "paid", label: "paid", value: paid, icon: BiCreditCard, tone: "blue", href: ordersHref("PAID") },
        { key: "shipped", label: "shipped", value: shipped, icon: BiSolidTruck, tone: "blue", href: ordersHref("SHIPPED") },
        { key: "completed", label: "completed", value: completed, icon: BiCheckCircle, tone: "green", href: ordersHref("COMPLETED") },
        { key: "cancelled", label: "cancelled", value: cancelled, icon: BiUserX, tone: "muted", href: ordersHref("CANCELLED") },
      ],
    },
    {
      title: "Shop & system",
      stats: [
        { key: "products", label: "products", value: products.meta.total, icon: BiFoodMenu, tone: "black", href: ROUTES.admin.products },
        { key: "categories", label: "categories", value: categories.length, icon: BiCategory, tone: "black", href: ROUTES.admin.categories },
        { key: "couriers", label: "couriers", value: couriers.length, icon: BiPackage, tone: "black", href: ROUTES.admin.couriers },
        { key: "emails", label: "emails logged", value: notifications.meta.total, icon: BiEnvelope, tone: "red", href: ROUTES.admin.notifications },
      ],
    },
  ];
}

export default async function AdminDashboardPage() {
  const groups = await loadGroups();

  return (
    <>
      <PageHeading title="admin dashboard" />
      <Section>
        <Title>dashboard</Title>
        <StatGroups groups={groups} />
      </Section>
    </>
  );
}
