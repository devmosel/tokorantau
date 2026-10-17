import { orderStatusAction, shipmentAction, shippingCostAction } from "@/actions/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { ORDER_STATUS, ORDER_TRANSITIONS, SHIPMENT_EDITABLE } from "@/data/orderStatus";
import type { Courier, Order } from "@/types/api";
import { OrderLines } from "@/components/features/OrderLines";
import { ActionForm } from "./ActionForm";
import { Card, Fact } from "@/components/ui/Card";

interface AdminOrderCardProps {
  order: Order;
  /** Active couriers offered in the shipment form. */
  couriers: Courier[];
}

const formatDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);

/** One order with every admin action the API allows for its current status. */
export function AdminOrderCard({ order, couriers }: AdminOrderCardProps) {
  const status = ORDER_STATUS[order.status];
  const next = ORDER_TRANSITIONS[order.status];
  const canSetCost = order.status === "PENDING_PAYMENT";
  const canSetShipment = SHIPMENT_EDITABLE.includes(order.status);
  const hasActions = canSetCost || canSetShipment || next.length > 0;

  return (
    <Card
      eyebrow={formatDate(order.createdAt)}
      title={order.id}
      badges={<Badge tone={status.badge}>{status.label}</Badge>}
      actions={
        hasActions && (
          <>
            {canSetCost && (
              <ActionForm action={shippingCostAction} hidden={{ orderId: order.id }}>
                <Input
                  label="Shipping cost (€)"
                  fieldSize="checkout"
                  className="my-0"
                  type="number"
                  name="shippingCost"
                  min={0}
                  step="0.01"
                  required
                  placeholder="shipping cost"
                  defaultValue={order.shippingCost ?? undefined}
                />
                <Button className="w-full text-center">save shipping cost</Button>
              </ActionForm>
            )}

            {canSetShipment && (
              <ActionForm action={shipmentAction} hidden={{ orderId: order.id }}>
                <Select
                  label="Courier"
                  name="courierId"
                  fieldSize="checkout"
                  className="my-0"
                  required
                  defaultValue={order.courier?.id ?? ""}
                >
                  <option value="" disabled>
                    select courier
                  </option>
                  {couriers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
                <Input
                  label="Tracking number"
                  fieldSize="checkout"
                  className="my-0"
                  name="trackingNumber"
                  required
                  placeholder="tracking number"
                  defaultValue={order.trackingNumber ?? ""}
                />
                <Button className="w-full text-center">save shipment</Button>
              </ActionForm>
            )}

            {next.length > 0 && (
              <ActionForm action={orderStatusAction} hidden={{ orderId: order.id }}>
                <div className="flex flex-wrap gap-10">
                  {next.map((target) => (
                    <Button
                      key={target}
                      name="status"
                      value={target}
                      variant={target === "CANCELLED" ? "danger" : "dark"}
                      className="flex-1 text-center text-[1.6rem]!"
                    >
                      mark {ORDER_STATUS[target].label}
                    </Button>
                  ))}
                </div>
              </ActionForm>
            )}
          </>
        )
      }
    >
      <Fact label="buyer">{order.userId}</Fact>
      <Fact label="ship to">{order.shippingAddress}</Fact>
      <Fact label="courier">
        {order.courier ? order.courier.name : "not set"}
        <span className="block text-[1.4rem] text-brand-muted">
          {order.courier ? (order.trackingNumber ?? "no tracking number") : "-"}
        </span>
      </Fact>
      <OrderLines order={order} />
    </Card>
  );
}
