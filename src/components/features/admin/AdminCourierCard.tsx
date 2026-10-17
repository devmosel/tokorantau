import { deleteCourierAction, saveCourierAction } from "@/actions/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import type { Courier } from "@/types/api";
import { ActionForm } from "./ActionForm";
import { Card } from "@/components/ui/Card";
import { DeleteForm } from "./DeleteForm";

/** Add card (no `courier`) or edit/delete card for an existing courier. */
export function AdminCourierCard({ courier }: { courier?: Courier }) {
  const formId = `courier-${courier?.id ?? "new"}`;

  return (
    <Card
      eyebrow={courier ? courier.code : "add"}
      title={courier ? courier.name : "new courier"}
      badges={
        courier ? (
          <Badge tone={courier.isActive ? "green" : "muted"}>{courier.isActive ? "active" : "inactive"}</Badge>
        ) : (
          <Badge tone="yellow">new</Badge>
        )
      }
      actions={
        <div className="flex gap-10">
          <Button form={formId} className="flex-1 text-center">
            {courier ? "update" : "add courier"}
          </Button>
          {courier && (
            <div className="flex-1">
              <DeleteForm action={deleteCourierAction} id={courier.id} confirm="Delete this courier?" />
            </div>
          )}
        </div>
      }
    >
      <ActionForm id={formId} action={saveCourierAction} hidden={courier ? { id: courier.id } : undefined} className="gap-0">
        <Input
          label="Name"
          fieldSize="checkout"
          name="name"
          placeholder="courier name (e.g. JNE Reguler)"
          required
          defaultValue={courier?.name}
          className="my-5"
        />
        <Input
          label="Code"
          fieldSize="checkout"
          name="code"
          placeholder="code (e.g. JNE)"
          required
          defaultValue={courier?.code}
          className="my-5"
        />
        {courier && (
          <label className="mt-10 flex items-center gap-10 text-[1.6rem] text-brand-black">
            <input type="checkbox" name="isActive" defaultChecked={courier.isActive} className="size-20" />
            active (can be chosen for new shipments)
          </label>
        )}
      </ActionForm>
    </Card>
  );
}
