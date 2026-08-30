"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fbqTrack } from "@/components/MetaPixel";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/config";

type VerifyResponse = {
  verified?: boolean;
  reference?: string;
  product?: { id: string; title: string } | null;
  amountGHS?: number;
  currency?: string;
  downloadReady?: boolean;
  error?: string;
};

type State =
  | { status: "verifying" }
  | { status: "success"; data: VerifyResponse }
  | { status: "failed" }
  | { status: "error" };

export function ThankYouClient() {
  const searchParams = useSearchParams();
  // Paystack sends both ?reference= and ?trxref= — accept either.
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const [state, setState] = useState<State>({ status: "verifying" });

  useEffect(() => {
    if (!reference) {
      setState({ status: "failed" });
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(reference)}`
        );
        const json: VerifyResponse = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (res.ok && json.verified) {
          // Browser-side Meta Purchase, deduped against the server copy by
          // eventID = reference. The sessionStorage guard stops a refresh
          // of this page from double-counting in the browser.
          const guardKey = `kip_purchase_${reference}`;
          if (!sessionStorage.getItem(guardKey)) {
            fbqTrack(
              "Purchase",
              {
                value: json.amountGHS,
                currency: json.currency || "GHS",
                content_type: "product",
                ...(json.product ? { content_ids: [json.product.id] } : {}),
                ...(json.product ? { content_name: json.product.title } : {}),
              },
              { eventID: reference }
            );
            sessionStorage.setItem(guardKey, "1");
          }
          setState({ status: "success", data: json });
        } else if (res.ok) {
          setState({ status: "failed" });
        } else {
          setState({ status: "error" });
        }
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
        {state.status === "verifying" && (
          <>
            <h1 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
              Confirming your payment…
            </h1>
            <p className="mt-4 font-body text-base text-ink/70">
              One moment while we check with Paystack.
            </p>
          </>
        )}

        {state.status === "success" && (
          <>
            <p className="font-body text-sm font-semibold text-red">
              Payment confirmed
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-ink md:text-4xl">
              Thank you — {state.data.product?.title ?? "your guide"} is yours.
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
              A receipt has been sent to your email by Paystack. Download your
              PDF below — and keep this page's link if you ever need to
              download it again.
            </p>

            {state.data.downloadReady ? (
              <a
                href={`/api/download?reference=${encodeURIComponent(
                  state.data.reference ?? ""
                )}`}
                className="mx-auto mt-8 flex max-w-xs items-center justify-center rounded-sm bg-red px-8 py-4 font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark"
              >
                Download your PDF
              </a>
            ) : (
              <p className="mx-auto mt-8 max-w-md font-body text-sm leading-relaxed text-ink/70">
                Your payment is confirmed, but the download isn&rsquo;t ready on
                our end — message us on{" "}
                <a
                  href={WHATSAPP_LINK_WITH_MESSAGE}
                  className="font-semibold text-red underline-offset-4 hover:underline"
                >
                  WhatsApp
                </a>{" "}
                with your receipt and we&rsquo;ll send your guide right away.
              </p>
            )}

            <Link
              href="/store"
              className="mt-6 inline-block font-body text-sm text-ink/60 underline-offset-4 transition-colors hover:text-red hover:underline"
            >
              Browse more guides →
            </Link>
          </>
        )}

        {state.status === "failed" && (
          <>
            <h1 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
              We couldn&rsquo;t confirm that payment.
            </h1>
            <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-ink/70">
              If you were charged, don&rsquo;t worry — your money isn&rsquo;t
              lost. Message us on{" "}
              <a
                href={WHATSAPP_LINK_WITH_MESSAGE}
                className="font-semibold text-red underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>{" "}
              with your payment receipt and we&rsquo;ll sort it out quickly.
            </p>
            <Link
              href="/store"
              className="mt-8 inline-block font-body text-sm text-ink/60 underline-offset-4 transition-colors hover:text-red hover:underline"
            >
              ← Back to the store
            </Link>
          </>
        )}

        {state.status === "error" && (
          <>
            <h1 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
              Something went wrong on our end.
            </h1>
            <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-ink/70">
              Please refresh this page in a moment. If it keeps happening,
              reach us on{" "}
              <a
                href={WHATSAPP_LINK_WITH_MESSAGE}
                className="font-semibold text-red underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>{" "}
              with your payment receipt.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
