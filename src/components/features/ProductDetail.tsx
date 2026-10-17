"use client";

import Link from "next/link";
import { useActionState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { cartAction } from "@/actions/cart";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { QuantityInput } from "@/components/ui/QuantityInput";
import { formatNumber } from "@/lib/format";
import { categoryHref } from "@/lib/routes";
import type { ActionState } from "@/types/actions";
import type { Product } from "@/types/api";

interface ProductDetailProps {
  product: Product;
  categoryName?: string;
}

const INITIAL_STATE: ActionState = {};

/** Full product view: gallery image, description, stock and an add-to-cart form. */
export function ProductDetail({ product, categoryName }: ProductDetailProps) {
  const [state, formAction, pending] = useActionState(cartAction, INITIAL_STATE);
  const [image] = product.images;
  const soldOut = product.stock < 1;

  return (
    <Panel className="flex flex-wrap items-center gap-20">
      <div className="flex-[1_1_40rem]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={product.name} className="max-h-400 w-full object-contain" />
        ) : (
          <div className="flex h-300 items-center justify-center text-[14rem] text-brand-muted">
            <BiRestaurant aria-hidden />
          </div>
        )}
      </div>

      <form action={formAction} className="flex-[1_1_40rem]">
        <input type="hidden" name="productId" value={product.id} />
        {categoryName && (
          <Link
            href={categoryHref(product.categoryId)}
            className="text-[2rem] text-brand-muted hover:text-brand-black hover:underline"
          >
            {categoryName}
          </Link>
        )}
        <h2 className="my-10 text-[3.5rem] capitalize text-brand-black">{product.name}</h2>
        <div className="text-[3rem] text-brand-black">
          <span className="text-[2rem] text-brand-muted">€</span>
          {formatNumber(product.price)}
        </div>
        <p className="my-15 whitespace-pre-line text-[1.7rem] leading-loose text-brand-muted">
          {product.description}
        </p>
        <p className={`mb-15 text-[1.6rem] ${soldOut ? "text-brand-red" : "text-brand-muted"}`}>
          {soldOut ? "Out of stock" : `${product.stock} in stock`}
        </p>

        <div className="flex items-center gap-10">
          <QuantityInput />
          <Button name="intent" value="add" disabled={pending || soldOut}>
            add to cart
          </Button>
        </div>

        {state.error && (
          <p role="alert" className="mt-10 text-[1.5rem] text-brand-red">
            {state.error}
          </p>
        )}
        {state.success && <p className="mt-10 text-[1.5rem] text-green-600">{state.success}</p>}
      </form>
    </Panel>
  );
}
