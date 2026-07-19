# Payments & Purchase Tracking — Setup Guide

The site now has its own Paystack checkout with verified Meta Purchase
tracking (browser Pixel + Conversions API, deduplicated). This guide is
everything left to do to switch it on. **Until step 2 is done, Buy Now
buttons automatically fall back to each product's `paymentLink`
(Skillspad), so the store keeps working the whole time.**

## How the flow works

1. Buyer clicks **Buy Now** → enters email → Meta `InitiateCheckout` fires.
2. `/api/paystack/initialize` starts the payment server-side — the price
   comes from `src/data/products.ts`, never from the browser, and
   `product_id`/`product_name` ride along in Paystack metadata.
3. Buyer pays on Paystack's hosted page (cards + Mobile Money), then
   lands on `/thank-you?reference=xxx`.
4. `/api/paystack/verify` confirms the charge with Paystack using the
   secret key. Only then:
   - the browser Pixel fires **Purchase** (eventID = reference),
   - the server fires the same Purchase via the **Conversions API**
     (same event ID → Meta deduplicates the pair),
   - a sessionStorage guard stops refresh double-counts.
5. The buyer gets a **Download your PDF** button → `/api/download`, which
   re-verifies the reference on every request and streams the PDF from
   `private/downloads/` (outside `public/`, so it can't be hotlinked).

## 1. Create the Paystack account

- Register at [paystack.com](https://paystack.com) as a Ghana business.
- **Test mode works immediately**; live payouts need business
  verification (can take a few days — start it early).
- Grab your **test secret key** (`sk_test_...`) from
  *Settings → API Keys & Webhooks*.

## 2. Set the environment variables on the VPS

Edit `/var/www/kip-academy/.env.local` and add:

```
PAYSTACK_SECRET_KEY=sk_test_...        # server-only; swap for sk_live_ at launch
NEXT_PUBLIC_FB_PIXEL_ID=...            # Meta Events Manager → your pixel
META_CAPI_ACCESS_TOKEN=...             # Events Manager → Settings → Conversions API
META_CAPI_TEST_EVENT_CODE=TEST...      # optional, from Test Events; REMOVE after testing
NEXT_PUBLIC_SITE_URL=https://thekipacademy.com
```

`NEXT_PUBLIC_*` vars are baked in at build time → rebuild required.
Then deploy as usual:

```bash
cd /var/www/kip-academy && git pull && npm install && npm run build && pm2 restart kip-academy
```

## 3. Upload the PDF(s)

```bash
ssh root@153.92.208.82 "mkdir -p /var/www/kip-academy/private/downloads"
scp "Unshakeable.pdf" root@153.92.208.82:/var/www/kip-academy/private/downloads/unshakeable.pdf
```

The id → filename map is in `src/lib/downloads.ts`. New guide = new line
there + new file on the VPS. Never commit PDFs (gitignored; repo is public).

## 4. Meta side

1. In **Events Manager**, verify the domain `thekipacademy.com`
   (Business Settings → Brand Safety → Domains).
2. Copy the **Pixel ID** and generate a **Conversions API access token**
   (pixel → Settings → Conversions API → Generate token).

## 5. Test before going live (costs nothing)

1. With the **test** secret key on the VPS, open Events Manager →
   **Test Events** and set `META_CAPI_TEST_EVENT_CODE`.
2. Buy a guide on the live site with a
   [Paystack test card](https://paystack.com/docs/payments/test-payments)
   (e.g. `4084 0840 8408 4081`, any future expiry, CVV `408`, OTP `123456`).
3. Confirm, in order:
   - you land on `/thank-you` and it says **Payment confirmed**,
   - the PDF download works,
   - **two** Purchase events appear in Test Events (one Browser, one
     Server) sharing the same event ID → shown as deduplicated,
   - refreshing the thank-you page does **not** add another Purchase.
4. Swap `sk_test_` → `sk_live_`, remove `META_CAPI_TEST_EVENT_CODE`,
   rebuild, restart. Done.

## Notes

- ~50 Purchases/week gets a Meta Sales campaign out of learning phase —
  until then run Leads/Engagement campaigns while the Pixel accumulates.
- The thank-you link keeps working after purchase (re-verifies each
  time), so buyers can re-download; Paystack emails them a receipt
  automatically.
- If a paid buyer sees "download isn't ready", the PDF is missing from
  `private/downloads/` on the VPS — the page points them to WhatsApp.
