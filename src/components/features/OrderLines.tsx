import { BiChevronDown } from "react-icons/bi";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/types/api";

/** Collapsible line items (closed by default) with an always-visible totals block. */
export function OrderLines({ order, shippingPending = "not set" }: { order: Order; shippingPending?: string }) {
  const count = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mt-auto bg-brand-black/5">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-10 px-10 py-8 text-[1.5rem] text-brand-black marker:hidden [&::-webkit-details-marker]:hidden">
          <span>
            {count} {count === 1 ? "item" : "items"}
          </span>
          <BiChevronDown aria-hidden className="text-[2rem] transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <ul className="divide-y divide-brand-black/10">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-10 px-10 py-8 text-[1.5rem]">
              <span className="min-w-0 break-words text-brand-black">
                {item.productName} <span className="text-brand-muted">× {item.quantity}</span>
              </span>
              <span className="shrink-0 text-brand-black">{formatPrice(item.subtotal)}</span>
            </li>
          ))}
        </ul>
      </details>
      <dl className="space-y-3 bg-brand-black/10 px-10 py-8 text-[1.5rem]">
        <div className="flex justify-between text-brand-muted">
          <dt>items</dt>
          <dd>{formatPrice(order.itemsSubtotal)}</dd>
        </div>
        <div className="flex justify-between text-brand-muted">
          <dt>shipping</dt>
          <dd>{order.shippingCost === null ? shippingPending : formatPrice(order.shippingCost)}</dd>
        </div>
        <div className="flex justify-between text-[1.8rem] font-semibold text-brand-black">
          <dt>total</dt>
          <dd className={order.totalAmount === null ? "text-brand-muted" : "text-brand-red"}>
            {order.totalAmount === null ? shippingPending : formatPrice(order.totalAmount)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
