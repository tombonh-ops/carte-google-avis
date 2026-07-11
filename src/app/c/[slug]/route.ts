import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isValidGoogleReviewUrl } from "@/lib/merchants";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id, google_review_url, is_active")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Impossible de rechercher le commerçant", error);
    return NextResponse.redirect(new URL("/c/indisponible?reason=technical", request.url), 302);
  }

  if (!merchant || !merchant.is_active) {
    return NextResponse.redirect(new URL("/c/indisponible?reason=inactive", request.url), 302);
  }

  if (!isValidGoogleReviewUrl(merchant.google_review_url)) {
    console.error(`URL Google invalide pour le commerçant ${merchant.id}`);
    return NextResponse.redirect(new URL("/c/indisponible?reason=link", request.url), 302);
  }

  const { error: scanError } = await supabase.from("scans").insert({
    merchant_id: merchant.id,
    user_agent: request.headers.get("user-agent")?.slice(0, 1000) ?? null,
    referer: request.headers.get("referer")?.slice(0, 2000) ?? null,
  });

  // Un incident de statistiques ne doit pas empêcher le client de laisser son avis.
  if (scanError) {
    console.error("Impossible d'enregistrer le scan", scanError);
  }

  return NextResponse.redirect(merchant.google_review_url, 302);
}
