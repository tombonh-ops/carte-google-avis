import type { Merchant } from "@/lib/database.types";

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100";

type MerchantFormFieldsProps = {
  merchant?: Merchant;
};

export function MerchantFormFields({ merchant }: MerchantFormFieldsProps) {
  return (
    <div className="grid gap-5">
      <label className="block text-sm font-medium text-slate-700">
        Nom du commerce
        <input
          name="business_name"
          required
          minLength={2}
          maxLength={120}
          defaultValue={merchant?.business_name}
          placeholder="La Table de Camille"
          className={inputClassName}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Slug public
        <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-100">
          <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">/c/</span>
          <input
            name="slug"
            required
            maxLength={80}
            defaultValue={merchant?.slug}
            placeholder="la-table-de-camille"
            className="min-w-0 flex-1 px-3.5 py-2.5 text-sm text-slate-950 outline-none placeholder:text-slate-400"
          />
        </div>
        <span className="mt-1.5 block text-xs font-normal text-slate-500">
          Les espaces et accents seront automatiquement normalisés.
        </span>
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Lien Google Avis
        <input
          name="google_review_url"
          type="url"
          inputMode="url"
          required
          defaultValue={merchant?.google_review_url}
          placeholder="https://g.page/r/.../review"
          className={inputClassName}
        />
      </label>

      <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
        <input
          name="is_active"
          type="checkbox"
          defaultChecked={merchant?.is_active ?? true}
          className="size-4 rounded border-slate-300 accent-accent-600"
        />
        Carte active
      </label>
    </div>
  );
}
