import { PILLARS } from "@/lib/config";
import { PillarIcon } from "./icons";

export function PillarsSection() {
  return (
    <section className="bg-offwhite py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-[42ch]">
          <p className="font-heading text-xs font-bold tracking-[0.25em] text-gold-dark">
            THE FOUR PILLARS
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-navy md:text-4xl">
            Everything we publish stands on four ideas.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-navy/10 bg-white p-7 transition-colors hover:border-gold/50"
            >
              <PillarIcon icon={pillar.icon} className="h-10 w-10 text-gold-dark" />
              <h3 className="mt-6 font-heading text-lg font-extrabold text-navy">
                {pillar.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-navy/65">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
