import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={`flex flex-col border border-navy/10 bg-white ${
        product.comingSoon ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy">
        <Image
          src={product.coverImage}
          alt={`${product.title} ebook cover`}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-extrabold text-navy">{product.title}</h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-navy/65">
          {product.subtitle}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-heading text-xl font-extrabold text-navy">
            GH&#8373;{product.priceGHS}
          </span>
          <span className="font-body text-xs text-navy/45">
            (&asymp; ${product.priceUSD} USD)
          </span>
        </div>

        <div className="mt-5">
          {product.comingSoon ? (
            <a
              href="#notify-me"
              className="flex w-full items-center justify-center rounded-sm border border-navy/25 py-3 font-heading text-sm font-bold text-navy transition-colors hover:border-gold hover:text-gold-dark"
            >
              Notify Me
            </a>
          ) : (
            <div className="flex flex-col gap-2">
              <a
                href={product.paymentLink}
                className="flex w-full items-center justify-center rounded-sm bg-gold py-3 font-heading text-sm font-bold text-navy transition-colors hover:bg-gold-light"
              >
                Buy Now
              </a>
              <Link
                href={`/store/${product.id}`}
                className="flex w-full items-center justify-center py-1 font-body text-xs font-medium text-navy/60 transition-colors hover:text-gold-dark"
              >
                See details
              </Link>
            </div>
          )}
        </div>

        {product.comingSoon && (
          <p className="mt-3 text-center font-heading text-[0.65rem] font-bold tracking-[0.2em] text-navy/40">
            COMING SOON
          </p>
        )}
      </div>
    </div>
  );
}
