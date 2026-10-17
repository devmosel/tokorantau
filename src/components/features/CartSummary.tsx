import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";

/** Bordered bar with the cart total and the checkout call to action. */
export function CartSummary({ total }: { total: number }) {
  return (
    <div className="mb-30 flex flex-wrap items-center justify-between gap-15 border-brand p-15">
      <p className="text-[2.5rem] text-brand-muted">
        cart total : <span className="text-brand-red">{formatPrice(total)}</span>
      </p>
      <Button href={ROUTES.checkout} size="lg">
        proceed to checkout
      </Button>
    </div>
  );
}