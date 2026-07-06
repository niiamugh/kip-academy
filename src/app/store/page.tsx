import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Browse KIP Academy's PDF guides on confidence, mindset, habits, and growth.",
};

export default function StorePage() {
  return (
    <>
      <section className="bg-navy py-16 text-offwhite md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="font-heading text-xs font-bold tracking-[0.25em] text-gold">
            THE STORE
          </p>
          <h1 className="mt-4 max-w-[24ch] font-heading text-3xl font-extrabold md:text-5xl">
            Guides built to be used, not just read.
          </h1>
          <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed text-offwhite/70">
            Every guide is a PDF you can start reading in the next two
            minutes. Pick one below, or come back — new guides are on the way.
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <div id="notify-me">
        <LeadMagnetSection />
      </div>
    </>
  );
}
