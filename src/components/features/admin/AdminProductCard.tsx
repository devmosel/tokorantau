import { BiRestaurant } from "react-icons/bi";
import { deleteProductAction } from "@/actions/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import type { Product } from "@/types/api";
import { Card, Fact } from "@/components/ui/Card";
import { DeleteForm } from "./DeleteForm";

const LOW_STOCK = 5;

/** Product card for the admin list: photo, price, stock and update/delete actions. */
export function AdminProductCard({ product, categoryName }: { product: Product; categoryName?: string }) {
  const image = product.images[0];
  const soldOut = product.stock < 1;

  return (
    <Card
      eyebrow={categoryName ?? "uncategorised"}
      title={product.name}
      badges={<Badge tone={product.isActive ? "green" : "muted"}>{product.isActive ? "visible" : "hidden"}</Badge>}
      actions={
        <div className="flex gap-10">
          <Button href={`${ROUTES.admin.products}/${product.id}`} className="flex-1 text-center">
            update
          </Button>
          <div className="flex-1">
            <DeleteForm action={deleteProductAction} id={product.id} confirm="Delete this product?" />
          </div>
        </div>
      }
    >
      <div className="flex h-180 items-center justify-center bg-brand-black/5">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={product.name} className="h-full w-full object-contain" />
        ) : (
          <BiRestaurant aria-hidden className="text-[8rem] text-brand-muted" />
        )}
      </div>
      <div className="mt-auto flex items-end justify-between gap-10">
        <Fact label="price">
          <span className="text-[2.4rem] font-semibold">
            <span className="text-[1.7rem] text-brand-muted">€</span>
            {formatNumber(product.price)}
          </span>
        </Fact>
        <Fact label="stock">
          <Badge tone={soldOut ? "red" : product.stock <= LOW_STOCK ? "yellow" : "black"}>
            {soldOut ? "sold out" : `${product.stock} left`}
          </Badge>
        </Fact>
      </div>
    </Card>
  );
}
