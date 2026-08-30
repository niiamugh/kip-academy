import Image from "next/image";
import Link from "next/link";
import { getFeaturedProduct } from "@/data/products";
import { PAYMENT_TRUST_NOTE } from "@/lib/config";
import { BuyButton } from "@/components/BuyButton";

export function FeaturedProduct() {
  const product = getFeaturedProduct();

  return (
    <section className="bg-haze py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-xs lg:mx-0">
            <Image
              src={product.coverImage}
              alt={`${product.title} ebook cover`}
              width={600}
              height={849}
              className="w-full shadow-xl"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-body text-sm font-semibold text-red">
            The flagship guide
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-ink md:text-4xl">
            {product.title}
          </h2>
          <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-ink/70">
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

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <BuyButton
              productId={product.id}
              productName={product.title}
              priceGHS={product.priceGHS}
              fallbackLink={product.paymentLink}
            />
            <Link
              href={`/store/${product.id}`}
              className="flex items-center justify-center rounded-sm border border-ink/25 px-8 py-4 text-center font-body text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-5 font-body text-xs text-ink/55">{PAYMENT_TRUST_NOTE}</p>
        </div>
      </div>
    </section>
  );
}
