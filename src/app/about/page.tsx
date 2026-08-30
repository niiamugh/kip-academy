import type { Metadata } from "next";
import Image from "next/image";
import { PILLARS } from "@/lib/config";
import { PillarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind KIP Academy and the mission to make practical knowledge accessible.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h1 className="max-w-[24ch] font-heading text-3xl font-semibold text-ink md:text-5xl">
            Making practical knowledge{" "}
            <span className="text-red">accessible</span>.
          </h1>
          <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed text-ink/70 md:text-lg">
            KIP stands for Knowledge Is Power — and we exist to put that power
            in more hands.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/logo-full.png"
              alt="KIP Academy — Knowledge Is Power"
              width={679}
              height={400}
              className="w-full max-w-sm border border-ink/10 p-6"
            />
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              Our story
            </h2>
            {/* TODO: replace with the real founder story */}
            <div className="mt-6 flex flex-col gap-5 font-body text-base leading-relaxed text-ink/75">
              <p>
                KIP Academy started with a simple frustration: the best advice
                on confidence and mindset was either locked behind expensive
                courses or buried in vague motivational posts that never told
                you what to actually do on a Monday morning.
              </p>
              <p>
                So we started writing it down ourselves — short, direct PDF
                guides built around one practical system per book, not a
                library of theory. Unshakeable, our first guide, came out of
                years of watching capable people talk themselves out of
                opportunities they were ready for.
              </p>
              <p>
                Everything we publish has to pass one test: could someone
                finish it on a Tuesday evening and use it by Wednesday
                morning? If not, it doesn&rsquo;t get published.
              </p>
            </div>

            <h2 className="mt-12 font-heading text-2xl font-semibold text-ink md:text-3xl">
              Our mission
            </h2>
            <p className="mt-6 max-w-[62ch] font-body text-base leading-relaxed text-ink/75">
              Making practical knowledge accessible, so people can transform
              their lives without needing a big budget or a lot of spare
              time — just a guide that respects both.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-haze py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
            The four pillars
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t-2 border-ink pt-6">
                <PillarIcon icon={pillar.icon} className="h-9 w-9 text-red" />
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
