import Image from "next/image";
import Link from "next/link";

export function AboutStrip() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image
            src="/logo-full.png"
            alt="KIP Academy — Knowledge Is Power"
            width={679}
            height={400}
            className="mx-auto w-full max-w-xs lg:mx-0"
          />
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
            KIP stands for <span className="text-red">Knowledge Is Power</span>.
          </h2>
          {/* TODO: replace with the real founder story */}
          <p className="mt-5 max-w-[62ch] font-body text-lg leading-relaxed text-ink/75">
            KIP Academy started with a simple frustration: the best advice on
            confidence and mindset was either locked behind expensive courses
            or buried in vague motivational posts. We built practical,
            plain-language guides instead — the kind you can finish on a Tuesday
            evening and start using on Wednesday morning.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-red underline-offset-4 transition-colors hover:text-red-dark hover:underline"
          >
            Read our story
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
