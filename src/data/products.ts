import { DEFAULT_PAYMENT_LINK } from "@/lib/config";

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceGHS: number;
  priceUSD: number;
  coverImage: string;
  /**
   * FALLBACK checkout link (e.g. your Skillspad page). Checkout normally
   * runs through our own Paystack integration (BuyButton →
   * /api/paystack/initialize); this link is only used when
   * PAYSTACK_SECRET_KEY isn't configured on the server.
   */
  paymentLink: string;
  featured: boolean;
  comingSoon: boolean;
  /** Longer copy used on the product detail / sales page. Edit freely. */
  painPoints?: string[];
  whatsInside?: string[];
  whoItsFor?: string[];
  /** Reader quotes shown on the sales page; omit to hide the section. */
  testimonials?: { quote: string; name: string; role: string }[];
};

/**
 * All PDF guides sold on the site. Add a new guide by adding a new object
 * here — the /store grid and /store/[id] sales page are both generated
 * automatically from this array, so you never have to touch layout code.
 *
 * TODO: replace `paymentLink` with your real Skillspad page link — it's
 * the fallback checkout used until Paystack keys are configured.
 */
export const products: Product[] = [
  {
    id: "unshakeable",
    title: "Unshakeable",
    subtitle: "The practical guide to building confidence that doesn't crack under pressure.",
    description:
      "A no-fluff, chapter-by-chapter system for building real confidence — the kind that holds up in job interviews, hard conversations, and the moments that actually matter.",
    priceGHS: 79,
    priceUSD: 6,
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
    // TODO: replace with real reader testimonials once you have them.
    testimonials: [
      {
        quote:
          "I read this in a weekend and used the interview script the same week. Got the job.",
        name: "Efua A.",
        role: "Reader, Accra",
      },
      {
        quote:
          "Short, direct, no filler. The daily practice is the first 'confidence habit' I've actually kept up.",
        name: "Kwame O.",
        role: "Reader, Kumasi",
      },
      {
        quote:
          "Recommended it to my whole team. It's the rare self-help guide that tells you exactly what to do, not just what to feel.",
        name: "Naa T.",
        role: "Reader, Tema",
      },
    ],
  },
  {
    id: "study-abroad",
    title: "Study Abroad. Work Abroad.",
    subtitle: "A practical guide for Africans to succeed globally.",
    description:
      "The step-by-step playbook for studying and working abroad — choosing the right country and course, winning admissions and visas, and building a life and career once you land.",
    priceGHS: 90,
    priceUSD: 7,
    coverImage: "/covers/study-abroad.jpg",
    paymentLink: "https://www.skillspad.org/products/study-abroad-work-abroad-tips-japa",
    featured: false,
    comingSoon: false,
    painPoints: [
      "You want to study or work abroad, but every blog and agent tells you something different — and some just want your money.",
      "You don't know which country, school, or program actually fits your budget and your goals.",
      "Applications, scholarships, and visa requirements feel like a maze designed for you to fail.",
      "You worry about what happens after you land: fitting in, finding work, and actually building something lasting.",
    ],
    whatsInside: [
      "Choose smart: how to pick a country, course, and school with purpose — not hype",
      "Prepare well: applications, scholarships, and visa steps that make you stand out and get selected",
      "Adapt fast: settling in, handling culture shock, and thriving in a new environment",
      "Build a future: finding work, growing your career, and creating lasting impact abroad",
      "Checklists and timelines for every stage, from first decision to first job",
    ],
    whoItsFor: [
      "Students and graduates across Africa planning to study abroad",
      "Professionals who want to work internationally without wasting years on wrong moves",
      "Parents and sponsors who want a clear picture of the whole journey",
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
    coverImage: "/covers/side-hustle-blueprint.png",
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
    coverImage: "/covers/discipline-playbook.png",
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
