import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

/**
 * Paystack redirects here after checkout with ?reference=xxx. The client
 * component verifies the reference server-side before showing the
 * download or firing any Purchase event.
 */
export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-white py-24 text-center md:py-32">
          <p className="font-body text-ink/70">Loading…</p>
        </section>
      }
    >
      <ThankYouClient />
    </Suspense>
  );
}
