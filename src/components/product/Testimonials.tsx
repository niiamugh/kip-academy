// TODO: replace these with real reader testimonials once you have them.
const TESTIMONIALS = [
  {
    quote:
      "I read this in a weekend and used the interview script the same week. Got the job.",
    name: "Efua A.",
    role: "Reader, Accra",
  },
  {
    quote:
      "Short, direct, no filler. The daily practice is the first 'confidence habit' I've actually kept up.",
    name: "Kwame O.",
    role: "Reader, Kumasi",
  },
  {
    quote:
      "Recommended it to my whole team. It's the rare self-help guide that tells you exactly what to do, not just what to feel.",
    name: "Naa T.",
    role: "Reader, Tema",
  },
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="border-t-2 border-ink pt-6">
          <span aria-hidden className="font-heading text-4xl font-semibold leading-none text-red">
            &ldquo;
          </span>
          <blockquote className="mt-2 font-body text-sm leading-relaxed text-ink/75">
            {t.quote}
          </blockquote>
          <figcaption className="mt-5 font-heading text-sm font-semibold text-ink">
            {t.name}
            <span className="mt-0.5 block font-body text-xs font-normal text-ink/60">
              {t.role}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
