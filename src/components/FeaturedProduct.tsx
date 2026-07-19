import Image from "next/image";
import Link from "next/link";
import { getFeaturedProduct } from "@/data/products";
import { PAYMENT_TRUST_NOTE } from "@/lib/config";
import { BuyButton } from "@/components/BuyButton";

export function FeaturedProduct() {
  const product = getFeaturedProduct();

  return (
    <section className="bg-navy py-20 text-offwhite md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-xs lg:mx-0">
            <Image
              src={product.coverImage}
              alt={`${product.title} ebook cover`}
              width={600}
              height={849}
              className="w-full shadow-2xl"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-heading text-xs font-bold tracking-[0.25em] text-gold">
            THE FLAGSHIP GUIDE
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold md:text-4xl">
            {product.title}
          </h2>
          <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-offwhite/75">
            {product.subtitle}
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-heading text-3xl font-extrabold text-gold">
              GH&#8373;{product.priceGHS}
            </span>
            <span className="font-body text-sm text-offwhite/50">
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
              className="flex items-center justify-center rounded-sm border border-offwhite/30 px-8 py-4 text-center font-heading text-sm font-bold text-offwhite transition-colors hover:border-gold hover:text-gold"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-5 font-body text-xs text-offwhite/45">{PAYMENT_TRUST_NOTE}</p>
        </div>
      </div>
    </section>
  );
}
