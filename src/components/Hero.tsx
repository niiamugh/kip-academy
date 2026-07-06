import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-offwhite">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,162,62,0.7) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #C9A23E 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
        <p className="font-heading text-xs font-bold tracking-[0.3em] text-gold">
          KNOWLEDGE IS POWER
        </p>

        <h1 className="mt-6 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.08] md:text-6xl lg:text-[4rem]">
          Knowledge Is Power.{" "}
          <span className="text-gold">Own Both.</span>
        </h1>

        <p className="mt-7 max-w-[52ch] font-body text-base leading-relaxed text-offwhite/75 md:text-lg">
          Practical guides that help you build confidence, master your
          mindset, and turn what you know into how you live.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/store/unshakeable"
            className="flex items-center justify-center rounded-sm bg-gold px-8 py-4 text-center font-heading text-sm font-bold text-navy transition-colors hover:bg-gold-light"
          >
            Get Unshakeable
          </Link>
          <Link
            href="/store"
            className="flex items-center justify-center rounded-sm border border-offwhite/30 px-8 py-4 text-center font-heading text-sm font-bold text-offwhite transition-colors hover:border-gold hover:text-gold"
          >
            Browse All Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
