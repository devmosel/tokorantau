"use client";

import Link from "next/link";
import { useActionState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { FaEdit, FaShoppingCart, FaTimes } from "react-icons/fa";
import { cartAction } from "@/actions/cart";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { QuantityInput } from "@/components/ui/QuantityInput";
import { formatNumber, formatPrice } from "@/lib/format";
import { ROUTES, categoryHref } from "@/lib/routes";
import type { ActionState } from "@/types/actions";
import type { CartItem, Product } from "@/types/api";

type ProductCardProps =
  | { variant?: "catalog"; product: Product; categoryName?: string }
  | { variant: "cart"; item: CartItem; product?: Product; categoryName?: string };

const INITIAL_STATE: ActionState = {};
const LOW_STOCK = 5;

/** Product tile. `catalog` adds to the cart; `cart` edits the quantity or removes the line. */
export function ProductCard(props: ProductCardProps) {
  const [state, formAction, pending] = useActionState(cartAction, INITIAL_STATE);
  const inCart = props.variant === "cart";

  const name = inCart ? props.item.productName : props.product.name;
  const price = inCart ? props.item.price : props.product.price;
  const image = props.product?.images[0];
  const categoryId = props.product?.categoryId;
  const productId = inCart ? props.item.productId : props.product.id;
  const stock = props.product?.stock;
  const soldOut = stock !== undefined && stock < 1;
  const detailsHref = ROUTES.product(productId);

  return (
    <form action={formAction} className="flex h-full flex-col overflow-hidden border-brand bg-white">
      <input
        type="hidden"
        name={inCart ? "itemId" : "productId"}
        value={inCart ? props.item.id : props.product.id}
      />

      <Link
        href={detailsHref}
        aria-label={`View ${name}`}
        className="relative flex h-220 items-center justify-center bg-brand-black/5 p-15"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="h-full w-full object-contain" />
        ) : (
          <BiRestaurant aria-hidden className="text-[9rem] text-brand-muted" />
        )}
        {soldOut && (
          <span className="absolute left-10 top-10">
            <Badge tone="red">sold out</Badge>
          </span>
        )}
        {!soldOut && stock !== undefined && stock <= LOW_STOCK && (
          <span className="absolute left-10 top-10">
            <Badge tone="yellow">only {stock} left</Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-5 p-15">
        {props.categoryName && categoryId ? (
          <Link
            href={categoryHref(categoryId)}
            className="text-[1.3rem] uppercase text-brand-muted hover:text-brand-black hover:underline"
          >
            {props.categoryName}
          </Link>
        ) : (
          <span className="text-[1.3rem] uppercase text-brand-muted">&nbsp;</span>
        )}
        <Link href={detailsHref} className="text-[2rem] font-medium text-brand-black hover:underline">
          {name}
        </Link>
        <p className="mt-auto pt-10 text-[2.6rem] font-semibold text-brand-black">
          <span className="text-[1.8rem] text-brand-muted">€</span>
          {formatNumber(price)}
        </p>

        {inCart && (
          <p className="text-[1.6rem] text-brand-muted">
            sub total: <span className="font-semibold text-brand-red">{formatPrice(props.item.subtotal)}</span>
          </p>
        )}

        {state.error && (
          <p role="alert" className="text-[1.4rem] text-brand-red">
            {state.error}
          </p>
        )}
        {state.success && <p className="text-[1.4rem] text-green-600">{state.success}</p>}
      </div>

      <div className="flex items-center gap-10 bg-brand-yellow/20 p-15">
        <QuantityInput className="w-80 shrink-0" defaultValue={inCart ? props.item.quantity : 1} />
        {inCart ? (
          <>
            <IconButton
              tone="yellow"
              name="intent"
              value="update"
              aria-label="Update quantity"
              disabled={pending}
              className="h-45 flex-1"
            >
              <FaEdit />
            </IconButton>
            {/* Last in DOM order is irrelevant: Enter submits the first submit button (update). */}
            <IconButton
              tone="danger"
              name="intent"
              value="remove"
              aria-label="Remove from cart"
              disabled={pending}
              onClick={(event) => {
                if (!window.confirm("delete this item?")) event.preventDefault();
              }}
              className="h-45 w-45"
            >
              <FaTimes />
            </IconButton>
          </>
        ) : (
          <Button name="intent" value="add" disabled={pending || soldOut} className="flex-1 text-center text-[1.6rem]!">
            <FaShoppingCart aria-hidden className="mr-8 inline align-[-0.15em]" />
            add to cart
          </Button>
        )}
      </div>
    </form>
  );
}
