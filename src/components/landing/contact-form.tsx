"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/data/site-content";

export function ContactForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Demande de contact - Carte Google Avis");
    const body = encodeURIComponent(
      [
        `Nom : ${name}`,
        `Commerce : ${business}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    );

    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }, [business, message, name]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoHref;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Nom
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-100"
            placeholder="Votre nom"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Commerce
          <input
            required
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-100"
            placeholder="Nom du commerce"
          />
        </label>
      </div>
      <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-100"
          placeholder="Bonjour, je souhaite commander une carte NFC pour mon commerce..."
        />
      </label>
      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 focus:outline-none focus:ring-4 focus:ring-accent-100 sm:w-auto"
      >
        Envoyer ma demande
      </button>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Le formulaire ouvre votre application email avec le message prérempli.
      </p>
    </form>
  );
}
