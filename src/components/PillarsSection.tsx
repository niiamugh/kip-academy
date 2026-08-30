import { PILLARS } from "@/lib/config";
import { PillarIcon } from "./icons";

export function PillarsSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="max-w-[24ch] font-heading text-3xl font-semibold text-ink md:text-4xl">
          Everything we publish stands on four ideas.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}
