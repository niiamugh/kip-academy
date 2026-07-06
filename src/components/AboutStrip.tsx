import Image from "next/image";
import Link from "next/link";

export function AboutStrip() {
  return (
    <section className="bg-offwhite py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image
            src="/founder-placeholder.svg"
            alt="Founder of KIP Academy"
            width={480}
            height={480}
            className="w-full max-w-xs border border-navy/10"
          />
        </div>
        <div className="lg:col-span-8">
          <p className="font-heading text-xs font-bold tracking-[0.25em] text-gold-dark">
            WHY KIP ACADEMY EXISTS
          </p>
          {/* TODO: replace with the real founder story */}
          <p className="mt-4 max-w-[62ch] font-body text-lg leading-relaxed text-navy/80">
            KIP Academy started with a simple frustration: the best advice on
            confidence and mindset was either locked behind expensive courses
            or buried in vague motivational posts. We built practical, plain-
            language guides instead — the kind you can finish on a Tuesday
            evening and start using on Wednesday morning.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-navy transition-colors hover:text-gold-dark"
          >
            Read our story
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
