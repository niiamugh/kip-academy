import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { SITE_URL } from "@/lib/config";
import { getPaystackSecretKey, initializeTransaction } from "@/lib/paystack";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST { productId, email } → { authorizationUrl }
 *
 * Starts a Paystack checkout for one of our guides. The price is looked
 * up server-side from src/data/products.ts — the client only names the
 * product, so nobody can tamper with the amount. product_id/product_name
 * ride along in Paystack metadata so the verify step (and Meta) know
 * which guide sold.
 */
export async function POST(request: Request) {
  if (!getPaystackSecretKey()) {
    // Paystack keys not configured yet — the BuyButton falls back to the
    // product's external payment link (e.g. Skillspad) when it sees this.
    return NextResponse.json({ error: "checkout_not_configured" }, { status: 503 });
  }

  let body: { productId?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const product = getProductById(body.productId ?? "");
  if (!product || product.comingSoon) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }

  try {
    const { authorizationUrl } = await initializeTransaction({
      email,
      amountGHS: product.priceGHS,
      callbackUrl: `${SITE_URL}/thank-you`,
      metadata: { product_id: product.id, product_name: product.title },
    });
    return NextResponse.json({ authorizationUrl });
  } catch (err) {
    console.error("[paystack/initialize]", err);
    return NextResponse.json({ error: "paystack_error" }, { status: 502 });
  }
}
