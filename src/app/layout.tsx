import type { Metadata } from "next";
import { siteConfig } from "@/data/site-content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: "%s · Carte Google Avis",
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.brandName,
  keywords: [
    "carte google avis",
    "carte NFC avis Google",
    "QR code avis Google",
    "avis Google commerce",
    "NFC commerçant",
  ],
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  publisher: siteConfig.brandName,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteUrl,
    siteName: siteConfig.brandName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: siteConfig.seo.image,
        width: 1200,
        height: 630,
        alt: "Carte Google Avis - cartes NFC et QR codes pour avis Google",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.image],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
