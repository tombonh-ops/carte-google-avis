"use client";

import { useState } from "react";

export function CopyLinkButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const fullUrl = new URL(path, window.location.origin).toString();
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-accent-500 hover:text-accent-700"
    >
      {copied ? "Lien copié ✓" : "Copier le lien"}
    </button>
  );
}
