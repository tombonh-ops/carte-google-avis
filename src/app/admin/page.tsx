import Link from "next/link";
import { AddMerchantForm } from "@/components/admin/add-merchant-form";
import { MerchantCard } from "@/components/admin/merchant-card";
import type { MerchantWithScanCount } from "@/lib/database.types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

async function getMerchants(): Promise<{ merchants: MerchantWithScanCount[]; error: string | null }> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("merchants")
      .select("*, scans(count)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Impossible de charger les commerçants", error);
      return { merchants: [], error: "Les commerçants n’ont pas pu être chargés." };
    }

    const merchants = (data ?? []).map(({ scans, ...merchant }) => ({
      ...merchant,
      total_scans: scans[0]?.count ?? 0,
    }));

    return { merchants, error: null };
  } catch {
    return {
      merchants: [],
      error: "Supabase n’est pas encore configuré. Renseignez les variables d’environnement pour afficher les données.",
    };
  }
}

export default async function AdminPage() {
  const { merchants, error } = await getMerchants();
  const totalScans = merchants.reduce((sum, merchant) => sum + merchant.total_scans, 0);
  const activeMerchants = merchants.filter((merchant) => merchant.is_active).length;

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 font-bold text-slate-950">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-600 text-sm text-white">C</span>
            Carte Google Avis
          </Link>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">Administration</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-700">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Vos commerçants</h1>
          </div>
          <p className="text-sm text-slate-500">Gérez les destinations sans remplacer les cartes physiques.</p>
        </div>

        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Statistiques générales">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-2xl font-bold tabular-nums text-slate-950 sm:text-3xl">{merchants.length}</p>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Commerçants</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-2xl font-bold tabular-nums text-slate-950 sm:text-3xl">{activeMerchants}</p>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Cartes actives</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-1 sm:p-5">
            <p className="text-2xl font-bold tabular-nums text-accent-700 sm:text-3xl">{totalScans}</p>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Scans au total</p>
          </div>
        </section>

        {error ? (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong className="block font-semibold">Configuration requise</strong>
            {error}
          </div>
        ) : null}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Ajouter un commerçant</h2>
            <p className="mt-1 text-sm text-slate-500">Le lien public restera stable, même lorsque l’URL Google change.</p>
          </div>
          <AddMerchantForm />
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-950">Cartes configurées</h2>
            <span className="text-sm text-slate-500">{merchants.length} au total</span>
          </div>

          {merchants.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {merchants.map((merchant) => (
                <MerchantCard key={merchant.id} merchant={merchant} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              Aucun commerçant pour le moment. Utilisez le formulaire ci-dessus pour créer la première carte.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
