# KIP Academy — Website

Marketing site + PDF guide store for **KIP Academy** ("Knowledge Is Power"),
built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Requirements

- Node.js **18.17+** or **20+** (Next.js 14 will refuse to run on older
  Node 18 patch versions — check with `node -v`).

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production locally:

```bash
npm run build
npm run start
```

## Where to edit things

Everything you're likely to need to change lives in one of these files:

| What | Where |
|---|---|
| Payment links, prices, product copy | `src/data/products.ts` |
| n8n webhook URL (lead capture) | `.env.local` → `N8N_WEBHOOK_URL` (see below) |
| WhatsApp number | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Social links, email, taglines, pillars copy | `src/lib/config.ts` |
| Google Analytics / Facebook Pixel IDs | `.env.local` (see below) |
| Logo | `public/logo.png` — replace the file directly |
| Product cover images | `public/covers/*.svg` — replace with real JPG/PNG covers and update `coverImage` in `src/data/products.ts` |
| Testimonials | `src/components/product/Testimonials.tsx` |
| FAQ answers | `src/components/product/FAQAccordion.tsx` |
| Founder story / About page copy | `src/app/about/page.tsx` and `src/components/AboutStrip.tsx` |

### Environment variables

Copy `.env.local.example` to `.env.local` and fill in your real values:

```bash
cp .env.local.example .env.local
```

```env
# Server-side only — used by src/app/api/subscribe/route.ts
N8N_WEBHOOK_URL=https://your-n8n-instance.example.com/webhook/kip-leads

# Public — safe to expose in the browser
NEXT_PUBLIC_WHATSAPP_NUMBER=233241234567
NEXT_PUBLIC_SITE_URL=https://www.kipacademy.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_FB_PIXEL_ID=
```

`.env.local` is git-ignored, so these values never get committed. If you
skip this step, the site still runs using the fallback placeholder values
defined in `src/lib/config.ts` — but the lead-capture form will show an
error message until `N8N_WEBHOOK_URL` points at a real webhook.

### Adding a new PDF guide

Open `src/data/products.ts` and add a new object to the `products` array:

```ts
{
  id: "my-new-guide",              // becomes the URL: /store/my-new-guide
  title: "My New Guide",
  subtitle: "One-line pitch shown on the store grid.",
  description: "Longer description used in page metadata.",
  priceGHS: 60,
  priceUSD: 5,
  coverImage: "/covers/my-new-guide.svg", // or .jpg/.png
  paymentLink: "https://paystack.com/pay/xxxxx",
  featured: false,
  comingSoon: false,
  painPoints: ["...", "..."],       // powers the "Is this you?" section
  whatsInside: ["...", "..."],      // powers "What's inside"
  whoItsFor: ["...", "..."],        // powers "Who this is for"
}
```

The `/store` grid and the `/store/[id]` sales page are both generated
automatically from this array — no other files need to change. Leave
`painPoints` / `whatsInside` / `whoItsFor` off (or set `comingSoon: true`)
for a guide that isn't ready yet; it renders a simpler "coming soon" page
with a notify-me link instead of the full sales page.

### Payments

Buttons never touch card or Mobile Money details directly. Each product's
"Buy Now" button just links to its `paymentLink` — a hosted payment page you
create on [Paystack](https://paystack.com) or [Selar](https://selar.co).
Both support Ghanaian Mobile Money and cards, and can auto-deliver a PDF on
successful payment. Create one payment page per guide, then paste the link
into `paymentLink`.

### Lead capture flow

The email form on the homepage and store page posts to
`src/app/api/subscribe/route.ts`, a server route that forwards
`{ name, email, source }` to `N8N_WEBHOOK_URL`. Point that at an n8n
Webhook node (POST), and build whatever automation you like downstream
(add to a mailing list, send the free chapter, etc.) — the site code
doesn't need to change.

## Deploying

### Vercel (recommended, made by the Next.js team)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.local` in the Vercel project
   settings (Settings → Environment Variables).
4. Deploy. Vercel builds and hosts Next.js apps natively, no extra config
   needed.

### Netlify

1. Push this repo to GitHub.
2. Create a new site at [app.netlify.com](https://app.netlify.com) from
   that repo. Netlify auto-detects Next.js via `@netlify/plugin-nextjs`.
3. Add the same environment variables in Site settings → Environment
   variables.
4. Deploy.

## Project structure

```
src/
  app/
    page.tsx              Homepage
    store/page.tsx        Store grid
    store/[id]/page.tsx   Product sales page (dynamic)
    unshakeable/page.tsx  Redirects to /store/unshakeable
    about/page.tsx        About page
    contact/page.tsx      Contact page
    api/subscribe/route.ts Lead-capture webhook proxy
    sitemap.ts, robots.ts  SEO
    opengraph-image.tsx   Auto-generated social share image
  components/              Shared UI (Header, Footer, cards, forms, icons)
  data/products.ts         Single source of truth for all guides
  lib/config.ts            Brand constants (edit here first)
public/
  logo.png                 KIP Academy emblem
  covers/*.svg             Placeholder book covers
  founder-placeholder.svg  Placeholder founder photo
```

All placeholder content (founder story, testimonials, coming-soon guide
copy, payment links) is marked with `TODO:` comments in the source —
search for `TODO:` to find everything that still needs your real content.
