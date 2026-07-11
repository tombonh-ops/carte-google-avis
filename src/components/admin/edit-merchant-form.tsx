"use client";

import { useActionState } from "react";
import { updateMerchant } from "@/app/admin/actions";
import { initialActionState } from "@/lib/action-state";
import type { Merchant } from "@/lib/database.types";
import { ActionMessage } from "./action-message";
import { MerchantFormFields } from "./form-fields";
import { SubmitButton } from "./submit-button";

export function EditMerchantForm({ merchant }: { merchant: Merchant }) {
  const updateThisMerchant = updateMerchant.bind(null, merchant.id);
  const [state, formAction] = useActionState(updateThisMerchant, initialActionState);

  return (
    <form action={formAction} className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6">
      <MerchantFormFields merchant={merchant} />
      <ActionMessage state={state} />
      <SubmitButton className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        Enregistrer les modifications
      </SubmitButton>
    </form>
  );
}
