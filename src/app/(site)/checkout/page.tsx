import type { Metadata } from "next";
import { CheckoutForm } from "@/components/features/CheckoutForm";
import { EmptyState } from "@/components/features/EmptyState";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { getMe } from "@/lib/api/account";
import { getCart } from "@/lib/api/cart";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const [user, cart] = await Promise.all([getMe(), getCart()]);
  const lines = cart.items.map((item) => ({
    id: item.id,
    name: `${item.productName} × ${item.quantity}`,
    price: item.subtotal,
  }));

  return (
    <>
      <PageHeading title="checkout" crumb="checkout" />
      <Section>
        <Title>order summary</Title>
        {lines.length === 0 ? (
          <EmptyState>Your cart is empty.</EmptyState>
        ) : (
          <CheckoutForm lines={lines} grandTotal={cart.itemsSubtotal} user={user} />
        )}
      </Section>
    </>
  );
}
