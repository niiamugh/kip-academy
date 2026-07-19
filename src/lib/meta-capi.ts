import { createHash } from "crypto";
import { FB_PIXEL_ID } from "@/lib/config";

/**
 * Meta Conversions API (CAPI) — server-side Purchase events.
 *
 * Why this exists: ad blockers and iOS privacy settings drop a large share
 * of browser Pixel events (a big deal in Ghana), and every lost Purchase
 * makes Meta's Sales optimisation worse. So the browser Pixel AND this
 * server route both send the Purchase, using the Paystack reference as the
 * event ID — Meta deduplicates the pair automatically.
 *
 * Needs META_CAPI_ACCESS_TOKEN (Events Manager → your pixel → Settings →
 * Conversions API → Generate access token). Silently no-ops when unset,
 * so the site works fine before you've created the token.
 */

const GRAPH_API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendPurchaseEvent(params: {
  /** Paystack reference — used as event_id for browser/server dedup. */
  reference: string;
  valueGHS: number;
  currency: string;
  productId: string | null;
  productName: string | null;
  customerEmail: string | null;
  clientIp: string | null;
  clientUserAgent: string | null;
  eventSourceUrl: string;
}): Promise<{ sent: boolean; error?: string }> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken || !FB_PIXEL_ID) {
    return { sent: false, error: "CAPI not configured" };
  }

  const userData: Record<string, unknown> = {};
  if (params.customerEmail) userData.em = [sha256(params.customerEmail)];
  if (params.clientIp) userData.client_ip_address = params.clientIp;
  if (params.clientUserAgent) userData.client_user_agent = params.clientUserAgent;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.reference,
        event_source_url: params.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          currency: params.currency || "GHS",
          value: params.valueGHS,
          content_type: "product",
          ...(params.productId ? { content_ids: [params.productId] } : {}),
          ...(params.productName ? { content_name: params.productName } : {}),
        },
      },
    ],
  };

  // Optional: set META_CAPI_TEST_EVENT_CODE (from Events Manager → Test
  // Events) to see server events live in the test console before launch.
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testEventCode) body.test_event_code = testEventCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${encodeURIComponent(
        accessToken
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      const message = json?.error?.message || `CAPI request failed (${res.status})`;
      console.error("[meta-capi]", message);
      return { sent: false, error: message };
    }
    return { sent: true };
  } catch (err) {
    // Never let a CAPI hiccup break the customer's thank-you page.
    console.error("[meta-capi]", err);
    return { sent: false, error: String(err) };
  }
}
