"use client";

import { useState } from "react";
import { fbqTrack } from "@/components/MetaPixel";

/**
 * "Buy Now" → inline email step → Paystack hosted checkout.
 *
 * Flow: first click expands a small email field (Paystack needs the
 * buyer's email to start a transaction, and it's how they get their
 * receipt). Submitting calls /api/paystack/initialize, which returns the
 * Paystack checkout URL; after paying, Paystack redirects the buyer to
 * /thank-you?reference=xxx where the purchase is verified and delivered.
 *
 * Also fires Meta InitiateCheckout on the first click, so ads can be
 * optimised on checkout intent even before Purchase volume builds up.
 *
 * If Paystack isn't configured yet (no PAYSTACK_SECRET_KEY on the
 * server), the button falls back to `fallbackLink` (e.g. your Skillspad
 * page) so the store never dead-ends.
 */
export function BuyButton({
  productId,
  productName,
  priceGHS,
  fallbackLink,
  className,
}: {
  productId: string;
  productName: string;
  priceGHS: number;
  fallbackLink?: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buttonClasses =
    className ??
    "flex w-full max-w-xs items-center justify-center rounded-sm bg-red px-8 py-4 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60";

  function handleExpand() {
    fbqTrack("InitiateCheckout", {
      content_ids: [productId],
      content_name: productName,
      content_type: "product",
      value: priceGHS,
      currency: "GHS",
    });
    setExpanded(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, email }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.status === 503 && fallbackLink) {
        // Paystack not set up yet — send the buyer to the external
        // checkout (Skillspad) instead of a dead end.
        window.location.href = fallbackLink;
        return;
      }
      if (!res.ok || !json.authorizationUrl) {
        setError(
          json.error === "invalid_email"
            ? "That email doesn't look right — please check it."
            : "Sorry, checkout couldn't start. Please try again or reach us on WhatsApp."
        );
        setLoading(false);
        return;
      }
      window.location.href = json.authorizationUrl;
    } catch {
      setError("Network error — please check your connection and try again.");
      setLoading(false);
    }
  }

  if (!expanded) {
    return (
      <button type="button" onClick={handleExpand} className={buttonClasses}>
        Buy Now
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col gap-3">
      <label htmlFor={`buy-email-${productId}`} className="sr-only">
        Email for your receipt and download
      </label>
      <input
        id={`buy-email-${productId}`}
        type="email"
        required
        autoFocus
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-sm border border-ink/25 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/60 focus:border-red focus:outline-none"
      />
      <button type="submit" disabled={loading} className={buttonClasses}>
        {loading ? "Starting checkout…" : `Pay GH₵${priceGHS} with Paystack`}
      </button>
      {error && <p className="font-body text-xs text-red">{error}</p>}
    </form>
  );
}
