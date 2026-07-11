export function normalizeSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidGoogleReviewUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    if (url.protocol !== "https:") return false;

    return (
      hostname === "g.page" ||
      hostname.endsWith(".g.page") ||
      hostname === "goo.gl" ||
      hostname.endsWith(".goo.gl") ||
      hostname === "google.com" ||
      hostname.endsWith(".google.com") ||
      hostname.startsWith("google.") ||
      hostname.includes(".google.")
    );
  } catch {
    return false;
  }
}

export function getPublicMerchantUrl(slug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return `${baseUrl}/c/${slug}`;
}
