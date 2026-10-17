import { Badge } from "@/components/ui/Badge";
import { Card, Fact } from "@/components/ui/Card";
import { ORDER_STATUS } from "@/data/orderStatus";
import type { Order } from "@/types/api";
import { CancelOrderForm } from "./CancelOrderForm";
import { OrderLines } from "./OrderLines";

const formatDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);

/** Buyer-facing order: status, delivery info, collapsible items, totals and cancel. */
export function OrderCard({ order }: { order: Order }) {
  const status = ORDER_STATUS[order.status];
  const canCancel = order.status === "PENDING_PAYMENT";

  return (
    <Card
      eyebrow={`placed ${formatDate(order.createdAt)}`}
      title={`Order ${order.id}`}
      badges={<Badge tone={status.badge}>{status.label}</Badge>}
      actions={canCancel ? <CancelOrderForm orderId={order.id} /> : undefined}
    >
      <Fact label="delivery address">{order.shippingAddress}</Fact>
      <Fact label="courier">
        {order.courier ? order.courier.name : "not shipped yet"}
        <span className="block text-[1.4rem] text-brand-muted">
          {order.courier ? (order.trackingNumber ?? "no tracking number") : "-"}
        </span>
      </Fact>
      <OrderLines order={order} shippingPending="to be confirmed" />
    </Card>
  );
}
