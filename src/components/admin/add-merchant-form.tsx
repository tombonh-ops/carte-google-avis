"use client";

import { useActionState } from "react";
import { addMerchant } from "@/app/admin/actions";
import { initialActionState } from "@/lib/action-state";
import { ActionMessage } from "./action-message";
import { MerchantFormFields } from "./form-fields";
import { SubmitButton } from "./submit-button";

export function AddMerchantForm() {
  const [state, formAction] = useActionState(addMerchant, initialActionState);

  return (
    <form action={formAction} className="mt-6">
      <MerchantFormFields />
      <ActionMessage state={state} />
      <SubmitButton className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-accent-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        Ajouter le commerçant
      </SubmitButton>
    </form>
  );
}
