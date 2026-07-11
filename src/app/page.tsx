import Link from "next/link";
import { ContactForm } from "@/components/landing/contact-form";
import { faqItems, getWhatsappUrl, siteConfig, trustedMerchants } from "@/data/site-content";

const steps = [
  {
    title: "Le client approche son téléphone",
    description: "La puce NFC est détectée instantanément. Un QR code peut aussi être imprimé sur le support.",
  },
  {
    title: "La page Google Avis s’ouvre",
    description: "La carte utilise votre URL courte, puis redirige vers le lien Google Avis du commerçant.",
  },
  {
    title: "Le client publie son avis",
    description: "Le parcours est fluide, rapide et pensé pour capter les clients satisfaits au bon moment.",
  },
];

const offerItems = ["Carte NFC personnalisée", "Programmation incluse", "Prête à être utilisée"];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const whatsappUrl = getWhatsappUrl();
  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.orderSubject)}`;

  return (
    <main className="overflow-hidden">
      <section className="relative px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
          <Link href="/" className="flex items-center gap-3" aria-label="Accueil Carte Google Avis">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
              CG
            </span>
            <span className="text-sm font-bold text-slate-950 sm:text-base">{siteConfig.brandName}</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#fonctionnement" className="transition hover:text-slate-950">
              Fonctionnement
            </a>
            <a href="#offre" className="transition hover:text-slate-950">
              Offre
            </a>
            <a href="#contact" className="transition hover:text-slate-950">
              Contact
            </a>
          </div>
          <Link
            href="/admin"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Admin
          </Link>
        </div>
      </section>

      <section className="relative px-6 pb-20 pt-12 sm:px-8 sm:pt-16 lg:pb-28">
        <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-100 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-accent-100 bg-white px-4 py-2 text-sm font-semibold text-accent-700 shadow-sm">
              NFC · QR code · Avis Google
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Transformez vos clients satisfaits en avis Google
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Une carte NFC personnalisée permet à vos clients d’ouvrir votre page d’avis Google en approchant leur
              téléphone. Le lien reste modifiable depuis votre plateforme, sans remplacer la carte physique.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent-700"
              >
                Commander ma carte
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:border-accent-500 hover:text-accent-700"
              >
                WhatsApp
              </a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center text-sm text-slate-600">
              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                <strong className="block text-xl text-slate-950">40 €</strong>
                Prix unique
              </div>
              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                <strong className="block text-xl text-slate-950">NFC</strong>
                Sans app
              </div>
              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                <strong className="block text-xl text-slate-950">QR</strong>
                Inclus
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-accent-500/20 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-soft">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                    Carte NFC
                  </span>
                  <span className="size-10 rounded-full border border-white/20 bg-white/10" />
                </div>
                <div className="mt-20">
                  <p className="text-sm text-slate-300">Avis Google</p>
                  <p className="mt-2 text-3xl font-black">Votre commerce</p>
                </div>
                <div className="mt-10 grid grid-cols-[1fr_auto] items-end gap-5">
                  <p className="text-sm leading-6 text-slate-300">
                    Approchez votre téléphone ou scannez le QR code pour laisser un avis.
                  </p>
                  <div className="grid size-24 grid-cols-4 gap-1 rounded-2xl bg-white p-3">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <span
                        key={index}
                        className={`rounded-sm ${index % 3 === 0 || index === 10 ? "bg-slate-950" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {offerItems.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnement" className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Comment ça fonctionne ?"
            title="Trois gestes simples pour obtenir plus d’avis"
            description="Le parcours est conçu pour être compris immédiatement par le commerçant comme par le client."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-600 text-lg font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Ils nous font confiance"
            title="Des commerçants qui rendent l’avis client plus naturel"
            description="Ces cartes sont alimentées depuis un fichier de données, pour ajouter ou retirer facilement des exemples."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {trustedMerchants.map((merchant) => (
              <article key={merchant.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-50 text-sm font-black text-accent-700">
                    {merchant.name
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{merchant.name}</h3>
                    <p className="text-sm text-slate-500">
                      {merchant.category} · {merchant.city}
                    </p>
                  </div>
                </div>
                <p className="mt-5 leading-7 text-slate-600">“{merchant.quote}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="offre" className="bg-slate-950 px-6 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-100">L’offre</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Une carte prête à poser sur votre comptoir
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Une solution simple pour commencer vite : carte physique, programmation du lien court et QR code associé.
              Le lien Google reste modifiable depuis le dashboard.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-soft">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">Pack essentiel</p>
                <p className="mt-3 text-5xl font-black">{siteConfig.price} €</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-accent-700"
              >
                Commander
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {offerItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="FAQ" title="Questions fréquentes" />
          <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
            {faqItems.map((item) => (
              <details key={item.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950">
                  {item.question}
                  <span className="text-2xl text-accent-700 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">Contact</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Commander votre carte
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Envoyez votre demande avec le nom de votre commerce. Vous pourrez ensuite recevoir votre lien court, votre
              QR code et la carte NFC prête à l’emploi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Écrire sur WhatsApp
              </a>
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:border-accent-500 hover:text-accent-700"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. Cartes NFC et QR codes pour avis Google.</p>
          <p>Le lien NFC reste toujours une URL courte de votre plateforme.</p>
        </div>
      </footer>
    </main>
  );
}
