"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/config";

/**
 * Google Analytics 4 base tag.
 *
 * Route changes are covered by GA4's enhanced measurement, which reports
 * App Router navigations via the History API — verified in the browser.
 * Don't add a manual page_view on pathname change: it double-counts
 * every navigation, because the automatic one still fires (and it fires
 * even with `send_page_view: false`).
 *
 * Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID (or the fallback
 * in src/lib/config.ts) is set.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
