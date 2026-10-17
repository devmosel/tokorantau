import type { Metadata } from "next";
import { updateAddressAction } from "@/actions/auth";
import { FormContainer } from "@/components/features/FormContainer";
import { UPDATE_ADDRESS_FIELDS } from "@/data/forms";

export const metadata: Metadata = { title: "Update Address" };

export default function UpdateAddressPage() {
  return (
    <FormContainer
      title="your address"
      fields={UPDATE_ADDRESS_FIELDS}
      submitLabel="update address"
      action={updateAddressAction}
    />
  );
}
