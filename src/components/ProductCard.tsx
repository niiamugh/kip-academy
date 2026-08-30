import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { BuyButton } from "@/components/BuyButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={`flex flex-col border border-ink/10 bg-white transition-colors hover:border-ink/40 ${
        product.comingSoon ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
        <Image
          src={product.coverImage}
          alt={`${product.title} ebook cover`}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-ink">{product.title}</h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/65">
          {product.subtitle}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-heading text-xl font-semibold text-red">
            GH&#8373;{product.priceGHS}
          </span>
          <span className="font-body text-xs text-ink/55">
            (&asymp; ${product.priceUSD} USD)
          </span>
        </div>

        <div className="mt-5">
          {product.comingSoon ? (
            <a
              href="#notify-me"
              className="flex w-full items-center justify-center rounded-sm border border-ink/25 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              Notify Me
            </a>
          ) : (
            <div className="flex flex-col gap-2">
              <BuyButton
                productId={product.id}
                productName={product.title}
                priceGHS={product.priceGHS}
                fallbackLink={product.paymentLink}
                className="flex w-full items-center justify-center rounded-sm bg-red py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60"
              />
              <Link
                href={`/store/${product.id}`}
                className="flex w-full items-center justify-center py-1 font-body text-xs font-medium text-ink/60 underline-offset-4 transition-colors hover:text-red hover:underline"
              >
                See details
              </Link>
            </div>
          )}
        </div>

        {product.comingSoon && (
          <p className="mt-3 text-center font-body text-[0.65rem] font-semibold tracking-[0.2em] text-ink/50">
            COMING SOON
          </p>
        )}
      </div>
    </div>
  );
}
