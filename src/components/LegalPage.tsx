import type { ReactNode } from "react";

/**
 * Shared shell for the policy pages, so Privacy and Refund stay visually
 * identical and any future policy page inherits the same typography.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h1 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 font-body text-sm text-ink/60">Last updated: {updated}</p>

        <div className="mt-10 flex flex-col gap-8 font-body text-base leading-relaxed text-ink/80 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  );
}
