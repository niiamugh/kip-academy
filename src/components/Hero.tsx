import Link from "next/link";
import { products } from "@/data/products";
import { HeroCarousel } from "@/components/HeroCarousel";

export function Hero() {
  // Live guides first, coming-soon titles at the end of the rotation.
  const slides = [...products]
    .sort((a, b) => Number(a.comingSoon) - Number(b.comingSoon))
    .map((p) => ({
      id: p.id,
      title: p.title,
      priceGHS: p.priceGHS,
      coverImage: p.coverImage,
      comingSoon: p.comingSoon,
    }));

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-7">
          <p className="font-body text-xs font-semibold tracking-[0.28em] text-red">
            KNOWLEDGE IS POWER
          </p>

          <h1 className="mt-6 max-w-[18ch] font-heading text-4xl font-semibold leading-[1.1] text-ink md:text-6xl">
            Knowledge is power. <span className="text-red">Own both.</span>
          </h1>

          <p className="mt-7 max-w-[52ch] font-body text-base leading-relaxed text-ink/70 md:text-lg">
            Practical guides that help you build confidence, master your
            mindset, and turn what you know into how you live.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/store"
              className="flex items-center justify-center rounded-sm bg-red px-8 py-4 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark"
            >
              Browse All Guides
            </Link>
            <Link
              href="/store/unshakeable"
              className="flex items-center justify-center rounded-sm border border-ink/25 px-8 py-4 text-center font-body text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              Get Unshakeable
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroCarousel slides={slides} />
        </div>
      </div>
    </section>
  );
}
