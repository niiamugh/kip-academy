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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="border border-navy/10 bg-white p-6">
          <blockquote className="font-body text-sm leading-relaxed text-navy/75">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 font-heading text-sm font-bold text-navy">
            {t.name}
            <span className="block font-body text-xs font-normal text-navy/50">
              {t.role}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
