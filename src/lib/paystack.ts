/**
 * Server-side Paystack helpers. Never import this from a client component —
 * it reads PAYSTACK_SECRET_KEY, which must stay on the server.
 *
 * Get your keys from the Paystack dashboard: Settings → API Keys & Webhooks.
 * Use the TEST secret key (sk_test_...) until you've watched a full test
 * purchase succeed, then swap in the LIVE key (sk_live_...) on the VPS.
 */

const PAYSTACK_API = "https://api.paystack.co";

export function getPaystackSecretKey(): string | null {
  return process.env.PAYSTACK_SECRET_KEY || null;
}

export type PaystackInitResult = {
  authorizationUrl: string;
  reference: string;
};

export async function initializeTransaction(params: {
  email: string;
  /** Amount in GHS (whole cedis) — converted to pesewas here. */
  amountGHS: number;
  callbackUrl: string;
  metadata: { product_id: string; product_name: string };
}): Promise<PaystackInitResult> {
  const secretKey = getPaystackSecretKey();
  if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not set");

  const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: Math.round(params.amountGHS * 100), // pesewas
      currency: "GHS",
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || !json.status || !json.data?.authorization_url) {
    throw new Error(json.message || `Paystack initialize failed (${res.status})`);
  }
  return {
    authorizationUrl: json.data.authorization_url,
    reference: json.data.reference,
  };
}

export type VerifiedTransaction = {
  /** Paystack confirmed the charge succeeded. */
  success: boolean;
  reference: string;
  /** Amount actually paid, in GHS. */
  amountGHS: number;
  currency: string;
  customerEmail: string | null;
  productId: string | null;
  productName: string | null;
  paidAt: string | null;
};

export async function verifyTransaction(reference: string): Promise<VerifiedTransaction> {
  const secretKey = getPaystackSecretKey();
  if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not set");

  const res = await fetch(
    `${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: "no-store",
    }
  );

  const json = await res.json();
  if (!res.ok || !json.status || !json.data) {
    throw new Error(json.message || `Paystack verify failed (${res.status})`);
  }

  const data = json.data;
  return {
    success: data.status === "success",
    reference: data.reference,
    amountGHS: (data.amount ?? 0) / 100,
    currency: data.currency ?? "",
    customerEmail: data.customer?.email ?? null,
    productId: data.metadata?.product_id ?? null,
    productName: data.metadata?.product_name ?? null,
    paidAt: data.paid_at ?? null,
  };
}
