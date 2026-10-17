import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";

export interface SummaryLine {
  id: string;
  name: string;
  price: number;
}

interface OrderSummaryProps {
  lines: SummaryLine[];
  grandTotal: number;
}

const LINE = "my-10 flex items-center justify-between gap-15 text-[2rem] leading-normal";

/** Black panel listing cart lines and the grand total. */
export function OrderSummary({ lines, grandTotal }: OrderSummaryProps) {
  return (
    <div className="mb-20 bg-brand-black p-20">
      <h3 className="py-15 text-[3rem] capitalize text-white">cart items</h3>
      {lines.map((line) => (
        <p key={line.id} className={LINE}>
          <span className="text-brand-muted">{line.name}</span>
          <span className="text-brand-yellow">{formatPrice(line.price)}</span>
        </p>
      ))}
      <p className={`${LINE} my-20 bg-white p-12`}>
        <span className="text-brand-muted">grand total :</span>
        <span className="text-brand-red">{formatPrice(grandTotal)}</span>
      </p>
      <Button href={ROUTES.cart}>view cart</Button>
    </div>
  );
}
