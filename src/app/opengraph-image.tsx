import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#020617",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 28,
              background: "#020617",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            CG
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800 }}>{siteConfig.brandName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#0e6fa8", fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
            NFC · QR code · Avis Google
          </div>
          <div style={{ display: "flex", maxWidth: 900, fontSize: 72, lineHeight: 1.02, fontWeight: 900 }}>
            Transformez vos clients satisfaits en avis Google
          </div>
        </div>
        <div style={{ display: "flex", color: "#475569", fontSize: 28 }}>
          Carte NFC personnalisée · Programmation incluse · {siteConfig.price} €
        </div>
      </div>
    ),
    size,
  );
}
