import { LeadMagnetForm } from "./LeadMagnetForm";

export function LeadMagnetSection() {
  return (
    <section className="bg-haze py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="border-t-4 border-red bg-white px-6 py-12 shadow-sm sm:px-12 md:py-16">
          <p className="font-body text-sm font-semibold text-red">Free chapter</p>
          <h2 className="mt-3 max-w-[26ch] font-heading text-2xl font-semibold text-ink md:text-3xl">
            Get a free chapter of Unshakeable
          </h2>
          <p className="mt-4 max-w-[54ch] font-body text-sm leading-relaxed text-ink/70 md:text-base">
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
