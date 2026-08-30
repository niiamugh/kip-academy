type Testimonial = { quote: string; name: string; role: string };

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
      {items.map((t) => (
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
