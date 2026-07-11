import Link from "next/link";

export const metadata = {
  title: "Lien indisponible",
};

export default function UnavailablePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100 text-2xl" aria-hidden="true">
          !
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-950">Ce lien est indisponible</h1>
        <p className="mt-3 leading-7 text-slate-600">
          La carte n’est pas encore activée ou sa destination doit être mise à jour. Merci de réessayer plus tard.
        </p>
        <Link href="/" className="mt-7 inline-block text-sm font-semibold text-accent-700 hover:text-accent-600">
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
