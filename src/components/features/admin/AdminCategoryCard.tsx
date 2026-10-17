import { deleteCategoryAction, saveCategoryAction } from "@/actions/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import type { Category } from "@/types/api";
import { ActionForm } from "./ActionForm";
import { Card } from "@/components/ui/Card";
import { DeleteForm } from "./DeleteForm";

/** Add card (no `category`) or edit/delete card for an existing category. */
export function AdminCategoryCard({ category }: { category?: Category }) {
  const formId = `category-${category?.id ?? "new"}`;

  return (
    <Card
      eyebrow={category ? "category" : "add"}
      title={category ? category.name : "new category"}
      badges={category ? <Badge tone="muted">{category.slug}</Badge> : <Badge tone="yellow">new</Badge>}
      actions={
        <div className="flex gap-10">
          <Button form={formId} className="flex-1 text-center">
            {category ? "update" : "add category"}
          </Button>
          {category && (
            <div className="flex-1">
              <DeleteForm action={deleteCategoryAction} id={category.id} confirm="Delete this category?" />
            </div>
          )}
        </div>
      }
    >
      <ActionForm id={formId} action={saveCategoryAction} hidden={category ? { id: category.id } : undefined} className="gap-0">
        <Input
          label="Name"
          fieldSize="checkout"
          name="name"
          placeholder="category name"
          required
          defaultValue={category?.name}
          className="my-5"
        />
        <Input
          label="Description"
          fieldSize="checkout"
          name="description"
          placeholder="description (optional)"
          defaultValue={category?.description ?? ""}
          className="my-5"
        />
      </ActionForm>
    </Card>
  );
}
