import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import { PAYMENT_TRUST_NOTE } from "@/lib/config";
import { TrustStrip } from "@/components/product/TrustStrip";
import { Testimonials } from "@/components/product/Testimonials";
import { FAQAccordion } from "@/components/product/FAQAccordion";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { BuyButton } from "@/components/BuyButton";
import { IconCheck, IconClose } from "@/components/icons";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  if (product.comingSoon) {
    return (
      <>
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
            <div className="mx-auto max-w-xs lg:col-span-5 lg:mx-0">
              <Image
                src={product.coverImage}
                alt={`${product.title} ebook cover`}
                width={600}
                height={800}
                className="w-full opacity-80 shadow-lg"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="font-body text-sm font-semibold text-red">
                Coming soon
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold text-ink md:text-5xl">
                {product.title}
              </h1>
              <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed text-ink/70">
                {product.subtitle}
              </p>
              <Link
                href="/store#notify-me"
                className="mt-8 inline-flex items-center justify-center rounded-sm bg-red px-8 py-4 font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark"
              >
                Notify Me When It Launches
              </Link>
            </div>
          </div>
        </section>
        <div id="notify-me">
          <LeadMagnetSection />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
          <div className="mx-auto w-64 max-w-full lg:col-span-5 lg:mx-0 lg:w-80">
            <div className="relative">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full bg-red" />
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
          <div className="lg:col-span-7">
            <p className="font-body text-sm font-semibold text-red">PDF guide</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-ink md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed text-ink/70 md:text-lg">
              {product.subtitle}
            </p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-semibold text-red">
                GH&#8373;{product.priceGHS}
              </span>
              <span className="font-body text-sm text-ink/55">
                (&asymp; ${product.priceUSD} USD)
              </span>
            </div>

            <div className="mt-8">
              <BuyButton
                productId={product.id}
                productName={product.title}
                priceGHS={product.priceGHS}
                fallbackLink={product.paymentLink}
              />
            </div>
            <p className="mt-4 font-body text-xs text-ink/55">{PAYMENT_TRUST_NOTE}</p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-ink py-10">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <TrustStrip />
        </div>
      </section>

      {/* Is this you? */}
      {product.painPoints && (
        <section className="bg-haze py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              Is this you?
            </h2>
            <ul className="mt-8 flex flex-col gap-5">
              {product.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <IconClose className="mt-1 h-4 w-4 flex-shrink-0 text-red" />
                  <span className="font-body text-base leading-relaxed text-ink/75">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* What's inside */}
      {product.whatsInside && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              What&rsquo;s inside
            </h2>
            <ul className="mt-8 flex flex-col gap-5">
              {product.whatsInside.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconCheck className="mt-1 h-4 w-4 flex-shrink-0 text-red" />
                  <span className="font-body text-base leading-relaxed text-ink/75">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Who it's for */}
      {product.whoItsFor && (
        <section className="bg-haze py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              Who this is for
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {product.whoItsFor.map((item) => (
                <li
                  key={item}
                  className="border-t-2 border-ink pt-4 font-body text-sm leading-relaxed text-ink/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {product.testimonials && product.testimonials.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              What readers say
            </h2>
            <div className="mt-10">
              <Testimonials items={product.testimonials} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-haze py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <h2 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
            Ready to start with {product.title}?
          </h2>
          <p className="mt-4 font-body text-base text-ink/70">
            Instant download. GH&#8373;{product.priceGHS} once, yours for good.
          </p>
          <div className="mx-auto mt-8 flex justify-center">
            <BuyButton
              productId={product.id}
              productName={product.title}
              priceGHS={product.priceGHS}
              fallbackLink={product.paymentLink}
            />
          </div>
        </div>
      </section>
    </>
  );
}
