import Image from "next/image";
import Link from "next/link";
import { getFeaturedProduct } from "@/data/products";

export function Hero() {
  const product = getFeaturedProduct();

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
              href="/store/unshakeable"
              className="flex items-center justify-center rounded-sm bg-red px-8 py-4 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark"
            >
              Get Unshakeable
            </Link>
            <Link
              href="/store"
              className="flex items-center justify-center rounded-sm border border-ink/25 px-8 py-4 text-center font-body text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              Browse All Guides
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto w-56 md:w-64 lg:ml-auto lg:mr-6 lg:w-72">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full bg-red"
            />
            <Image
              src={product.coverImage}
              alt={`${product.title} ebook cover`}
              width={600}
              height={849}
              className="relative w-full shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
