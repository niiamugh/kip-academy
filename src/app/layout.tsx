import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";

const heading = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Knowledge Is Power`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Knowledge Is Power`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Knowledge Is Power`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    // ?v= busts browsers' sticky favicon caches — bump it whenever the
    // logo changes, or the old icon can linger in tabs for days.
    icon: [
      { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=2", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon.png?v=2" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-body antialiased`}>
        {/*
          Google Analytics 4 — base tag + page_view on every route change,
          handled by src/components/GoogleAnalytics.tsx. Set the ID in
          NEXT_PUBLIC_GA_MEASUREMENT_ID or src/lib/config.ts; it only
          loads once an ID is set.
        */}
        <GoogleAnalytics />

        {/*
          Meta / Facebook Pixel — base code + PageView on every route
          change, handled by src/components/MetaPixel.tsx. Paste your
          Pixel ID into NEXT_PUBLIC_FB_PIXEL_ID (see .env.local.example);
          it only loads once an ID is set.
        */}
        <MetaPixel />

        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
