/**
 * Site-wide constants — edit these in one place.
 *
 * Anything wrapped in an env var (process.env.NEXT_PUBLIC_...) can be
 * overridden without touching code by setting it in `.env.local` (copy
 * `.env.local.example`). If no env var is set, the fallback string below
 * is used instead, so you can also just edit the fallback directly.
 */

// TODO: Replace with your real n8n webhook URL (Production URL from the
// Webhook node). The lead-capture form POSTs { name, email, source } here
// via the server route at src/app/api/subscribe/route.ts, so this value
// never has to be exposed to the browser.
export const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "https://your-n8n-instance.example.com/webhook/kip-leads";

// TODO: Replace with your WhatsApp Business number, digits only, with
// country code and no leading "+" (e.g. Ghana number 024 123 4567 -> "233241234567").
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233000000000";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_PREFILL =
  "Hello KIP Academy, I'd like to know more about your guides.";
export const WHATSAPP_LINK_WITH_MESSAGE = `${WHATSAPP_LINK}?text=${encodeURIComponent(
  WHATSAPP_PREFILL
)}`;

// TODO: Replace with the real contact email.
export const CONTACT_EMAIL = "hello@kipacademy.com";

// TODO: Replace with your real social page URLs.
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/kipacademy",
  instagram: "https://instagram.com/kipacademy",
  whatsapp: WHATSAPP_LINK_WITH_MESSAGE,
};

// Checkout now runs through our own Paystack integration (see
// src/app/api/paystack/*). `paymentLink` on each product is only a
// FALLBACK used while PAYSTACK_SECRET_KEY isn't configured — point it at
// your Skillspad page so the store never dead-ends. This default is used
// if a product is missing one.
export const DEFAULT_PAYMENT_LINK = "https://paystack.com/pay/PLACEHOLDER";

export const PAYMENT_TRUST_NOTE =
  "Secure payment via Paystack — Mobile Money & cards accepted. Instant PDF delivery.";

// TODO: Paste your GA4 Measurement ID (e.g. "G-XXXXXXXXXX") to enable
// Google Analytics. Leave blank to keep analytics disabled.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// TODO: Paste your Meta/Facebook Pixel ID to enable Facebook Pixel.
// Leave blank to keep the pixel disabled.
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export const SITE_NAME = "KIP Academy";
export const SITE_TAGLINE = "Knowledge Is Power";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thekipacademy.com";
export const SITE_DESCRIPTION =
  "Practical PDF guides that help you build confidence, master your mindset, and turn what you know into how you live.";

export const PROCESS_LINE = "Learn • Apply • Grow • Succeed";

export const PILLARS = [
  {
    title: "Build Confidence",
    description:
      "Guides that help you speak up, show up, and stop shrinking to fit other people's comfort.",
    icon: "confidence" as const,
  },
  {
    title: "Improve Mindset",
    description:
      "Reframe setbacks, quiet self-doubt, and think like someone who expects to win.",
    icon: "mindset" as const,
  },
  {
    title: "Develop Habits",
    description:
      "Small, repeatable systems that compound — because discipline beats motivation every time.",
    icon: "habits" as const,
  },
  {
    title: "Achieve Growth",
    description:
      "Turn what you've learned into visible progress in your work, relationships, and income.",
    icon: "growth" as const,
  },
];
