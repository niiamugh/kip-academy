import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { SITE_URL } from "@/lib/config";
import { getPaystackSecretKey, verifyTransaction } from "@/lib/paystack";
import { sendPurchaseEvent } from "@/lib/meta-capi";
import { hasDownload } from "@/lib/downloads";

export const runtime = "nodejs";

/**
 * GET ?reference=xxx → verification result for the thank-you page.
 *
 * Checks the transaction with Paystack server-side using the secret key.
 * Only when Paystack itself says "success" (and the amount matches the
 * product's real price) do we treat it as a purchase — so nobody can fake
 * a conversion or a download by guessing thank-you URLs, and the ad data
 * stays clean.
 *
 * On success this also fires the server-side Meta Purchase (Conversions
 * API) with event_id = reference. The browser Pixel fires the same event
 * with the same ID, and Meta deduplicates the pair.
 */
export async function GET(request: Request) {
  if (!getPaystackSecretKey()) {
    return NextResponse.json({ error: "checkout_not_configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference")?.trim();
  if (!reference) {
    return NextResponse.json({ error: "missing_reference" }, { status: 400 });
  }

  let tx;
  try {
    tx = await verifyTransaction(reference);
  } catch (err) {
    console.error("[paystack/verify]", err);
    return NextResponse.json({ error: "verify_failed" }, { status: 502 });
  }

  if (!tx.success) {
    return NextResponse.json({ verified: false });
  }

  // Belt-and-braces: the charge must at least cover the product's real
  // price in GHS (guards against tampered/partial charges).
  const product = tx.productId ? getProductById(tx.productId) : undefined;
  if (product && (tx.currency !== "GHS" || tx.amountGHS < product.priceGHS)) {
    console.error(
      `[paystack/verify] amount mismatch for ${reference}: ` +
        `paid ${tx.amountGHS} ${tx.currency}, expected ≥ ${product.priceGHS} GHS`
    );
    return NextResponse.json({ verified: false });
  }

  // Server-side Meta Purchase (no-ops until META_CAPI_ACCESS_TOKEN is set).
  // Refreshing the thank-you page re-sends it, but the event_id keeps it
  // deduplicated on Meta's side.
  await sendPurchaseEvent({
    reference: tx.reference,
    valueGHS: tx.amountGHS,
    currency: tx.currency || "GHS",
    productId: tx.productId,
    productName: tx.productName,
    customerEmail: tx.customerEmail,
    clientIp: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    clientUserAgent: request.headers.get("user-agent"),
    eventSourceUrl: `${SITE_URL}/thank-you`,
  });

  return NextResponse.json({
    verified: true,
    reference: tx.reference,
    product: product
      ? { id: product.id, title: product.title }
      : tx.productId
        ? { id: tx.productId, title: tx.productName ?? tx.productId }
        : null,
    amountGHS: tx.amountGHS,
    currency: tx.currency || "GHS",
    downloadReady: tx.productId ? hasDownload(tx.productId) : false,
  });
}
