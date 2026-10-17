import { saveProductAction } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Panel } from "@/components/ui/Panel";
import type { Category, Product } from "@/types/api";
import { ActionForm } from "./ActionForm";

interface AdminProductFormProps {
  categories: Category[];
  /** Prefill values when updating; omit for a new product. */
  product?: Product;
}

export function AdminProductForm({ categories, product }: AdminProductFormProps) {
  return (
    <Panel className="mx-auto w-full max-w-[50rem]">
      <ActionForm action={saveProductAction} hidden={product ? { id: product.id } : undefined} className="gap-0">
        <h3 className="mb-10 text-center text-[2.5rem] uppercase text-brand-black">
          {product ? "update product" : "add new product"}
        </h3>
        <Input label="Name" type="text" name="name" placeholder="enter product name" required defaultValue={product?.name} />
        <Textarea
          label="Description"
          fieldSize="auth"
          name="description"
          placeholder="enter product description"
          required
          defaultValue={product?.description}
        />
        <Input
          label="Price (€)"
          type="number"
          name="price"
          placeholder="enter product price"
          required
          min={0}
          step="0.01"
          defaultValue={product?.price}
        />
        <Input
          label="Stock"
          type="number"
          name="stock"
          placeholder="enter stock"
          required
          min={0}
          step={1}
          defaultValue={product?.stock}
        />
        <Select label="Category" name="categoryId" fieldSize="auth" required defaultValue={product?.categoryId ?? ""}>
          <option value="" disabled>
            select category
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Textarea
          label="Images (URLs, one per line)"
          fieldSize="auth"
          name="images"
          placeholder="image URLs, one per line (optional)"
          defaultValue={product?.images.join("\n")}
          className="h-100"
        />
        <label className="my-10 flex items-center gap-10 text-[1.8rem] text-brand-black">
          <input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} className="size-20" />
          visible in the shop
        </label>
        <Button className="w-full text-center">{product ? "update product" : "add product"}</Button>
      </ActionForm>
    </Panel>
  );
}
