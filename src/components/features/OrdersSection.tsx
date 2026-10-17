import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import type { Order } from "@/types/api";
import { EmptyState } from "./EmptyState";
import { OrderCard } from "./OrderCard";

export function OrdersSection({ orders, footer }: { orders: Order[]; footer?: React.ReactNode }) {
  return (
    <Section>
      <Title>your orders</Title>
      {orders.length === 0 ? (
        <EmptyState>You have no orders yet.</EmptyState>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] items-stretch gap-15 max-[499px]:grid-cols-1">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
      {footer}
    </Section>
  );
}
