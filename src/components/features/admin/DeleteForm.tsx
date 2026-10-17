import { Button } from "@/components/ui/Button";
import type { ActionState } from "@/types/actions";
import { ActionForm } from "./ActionForm";

interface DeleteFormProps {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  id: string;
  label?: string;
  confirm?: string;
}

/** Single-purpose delete form: posts the entity id to a delete action after confirmation. */
export function DeleteForm({ action, id, label = "delete", confirm = "Delete this item?" }: DeleteFormProps) {
  return (
    <ActionForm action={action} hidden={{ id }} confirm={confirm}>
      <Button variant="danger" className="w-full text-center">
        {label}
      </Button>
    </ActionForm>
  );
}
