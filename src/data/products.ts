import { DEFAULT_PAYMENT_LINK } from "@/lib/config";

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceGHS: number;
  priceUSD: number;
  coverImage: string;
  paymentLink: string;
  featured: boolean;
  comingSoon: boolean;
  /** Longer copy used on the product detail / sales page. Edit freely. */
  painPoints?: string[];
  whatsInside?: string[];
  whoItsFor?: string[];
};

/**
 * All PDF guides sold on the site. Add a new guide by adding a new object
 * here — the /store grid and /store/[id] sales page are both generated
 * automatically from this array, so you never have to touch layout code.
 *
 * TODO: replace `paymentLink` with your real Paystack or Selar payment
 * page link once it's created.
 */
export const products: Product[] = [
  {
    id: "unshakeable",
    title: "Unshakeable",
    subtitle: "The practical guide to building confidence that doesn't crack under pressure.",
    description:
      "A no-fluff, chapter-by-chapter system for building real confidence — the kind that holds up in job interviews, hard conversations, and the moments that actually matter.",
    priceGHS: 60,
    priceUSD: 5,
    coverImage: "/covers/unshakeable.jpg",
    paymentLink: "https://paystack.com/pay/PLACEHOLDER-unshakeable",
    featured: true,
    comingSoon: false,
    painPoints: [
      "You freeze up right when you need to speak up — in meetings, interviews, or difficult conversations.",
      "You know what you should do, but self-doubt keeps talking you out of it.",
      "You've read the generic 'be more confident' advice before, and none of it changed anything.",
      "You perform fine until the pressure is on, then old habits take over.",
    ],
    whatsInside: [
      "The confidence-competence loop, and why most advice gets the order backwards",
      "A daily 10-minute practice for rewiring how you respond to pressure",
      "Scripts for high-stakes conversations: asking for a raise, setting boundaries, disagreeing with a superior",
      "How to recover in the moment when your confidence slips mid-conversation",
      "A 30-day tracker to make the habit stick after you finish the book",
    ],
    whoItsFor: [
      "Early-career professionals who freeze up in meetings and interviews",
      "Anyone who over-prepares for conversations and still feels unready",
      "People who've tried generic confidence advice and want something more specific",
    ],
  },
  {
    id: "side-hustle-blueprint",
    title: "The Side Hustle Blueprint",
    subtitle: "A practical roadmap for building income on the side, without burning out.",
    description:
      "TODO: replace with final copy. A step-by-step guide to starting and growing a side income stream around a full-time job or studies.",
    priceGHS: 60,
    priceUSD: 5,
    coverImage: "/covers/side-hustle-blueprint.svg",
    paymentLink: DEFAULT_PAYMENT_LINK,
    featured: false,
    comingSoon: true,
  },
  {
    id: "discipline-playbook",
    title: "The Discipline Playbook",
    subtitle: "Build the daily discipline that makes every other goal easier to reach.",
    description:
      "TODO: replace with final copy. A practical system for building consistency when motivation runs out.",
    priceGHS: 60,
    priceUSD: 5,
    coverImage: "/covers/discipline-playbook.svg",
    paymentLink: DEFAULT_PAYMENT_LINK,
    featured: false,
    comingSoon: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProduct(): Product {
  return products.find((p) => p.featured) ?? products[0];
}
