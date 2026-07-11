import type { MerchantWithScanCount } from "@/lib/database.types";
import { toggleMerchant } from "@/app/admin/actions";
import { CopyLinkButton } from "./copy-link-button";
import { EditMerchantForm } from "./edit-merchant-form";

export function MerchantCard({ merchant }: { merchant: MerchantWithScanCount }) {
  const publicPath = `/c/${merchant.slug}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-bold text-slate-950">{merchant.business_name}</h2>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  merchant.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}
              >
                {merchant.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mt-2 truncate font-mono text-sm text-slate-500">{publicPath}</p>
          </div>

          <div className="shrink-0 rounded-xl bg-accent-50 px-4 py-3 text-center">
            <p className="text-2xl font-bold tabular-nums text-accent-700">{merchant.total_scans}</p>
            <p className="text-xs font-medium text-accent-700">scan{merchant.total_scans === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <CopyLinkButton path={publicPath} />
          <a
            href={`/admin/qr/${merchant.slug}?download=1`}
            className="rounded-lg border border-accent-500 bg-white px-3 py-2 text-xs font-semibold text-accent-700 transition hover:bg-accent-50"
          >
            Télécharger le QR
          </a>
          <form action={toggleMerchant}>
            <input type="hidden" name="merchant_id" value={merchant.id} />
            <input type="hidden" name="next_status" value={String(!merchant.is_active)} />
            <button
              type="submit"
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                merchant.is_active
                  ? "border border-slate-300 bg-white text-slate-700 hover:border-red-300 hover:text-red-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {merchant.is_active ? "Désactiver" : "Activer"}
            </button>
          </form>
        </div>
      </div>

      <details className="group border-t border-slate-200">
        <summary className="cursor-pointer list-none px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:px-6">
          <span className="group-open:hidden">Afficher le QR code</span>
          <span className="hidden group-open:inline">Masquer le QR code</span>
        </summary>
        <div className="bg-slate-50 px-5 pb-6 text-center sm:px-6">
          {/* Le QR dynamique est servi par une route protégée de l'administration. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/admin/qr/${merchant.slug}`}
            alt={`QR code de ${merchant.business_name}`}
            width={256}
            height={256}
            loading="lazy"
            className="mx-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          />
          <p className="mt-3 break-all font-mono text-xs text-slate-500">{publicPath}</p>
        </div>
      </details>

      <details className="group">
        <summary className="cursor-pointer list-none border-t border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:px-6">
          <span className="group-open:hidden">Modifier</span>
          <span className="hidden group-open:inline">Fermer les modifications</span>
        </summary>
        <EditMerchantForm merchant={merchant} />
      </details>
    </article>
  );
}
