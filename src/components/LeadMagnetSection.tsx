import { LeadMagnetForm } from "./LeadMagnetForm";

export function LeadMagnetSection() {
  return (
    <section className="bg-offwhite py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="border border-navy/10 bg-navy px-6 py-12 text-offwhite sm:px-12 md:py-16">
          <p className="font-heading text-xs font-bold tracking-[0.25em] text-gold">
            FREE CHAPTER
          </p>
          <h2 className="mt-4 max-w-[26ch] font-heading text-2xl font-extrabold md:text-3xl">
            Get a free chapter of Unshakeable
          </h2>
          <p className="mt-4 max-w-[54ch] font-body text-sm leading-relaxed text-offwhite/70 md:text-base">
            No spam, just the first chapter — enough to see whether the rest
            of the book is worth your GH&#8373;.
          </p>

          <div className="mt-8">
            <LeadMagnetForm source="homepage-lead-magnet" />
          </div>
        </div>
      </div>
    </section>
  );
}
