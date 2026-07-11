import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json({ error: "Commerçant introuvable." }, { status: 404 });
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const siteUrl = configuredSiteUrl || request.nextUrl.origin;
  const publicUrl = `${siteUrl}/c/${merchant.slug}`;
  const png = await QRCode.toBuffer(publicUrl, {
    type: "png",
    width: 1024,
    margin: 3,
    errorCorrectionLevel: "M",
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });

  const shouldDownload = request.nextUrl.searchParams.get("download") === "1";

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "image/png",
      "Content-Disposition": `${shouldDownload ? "attachment" : "inline"}; filename="qr-${merchant.slug}.png"`,
      "X-QR-Target": publicUrl,
    },
  });
}
