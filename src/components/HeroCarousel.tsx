"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeroSlide = {
  id: string;
  title: string;
  priceGHS: number;
  coverImage: string;
  comingSoon: boolean;
};

const INTERVAL_MS = 4500;

/**
 * Auto-rotating showcase of every guide in the store, so first-time
 * visitors see the whole catalog before ever opening /store. Pauses on
 * hover/focus and never auto-advances for reduced-motion users.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = slides[index];

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  return (
    <div
      className="mx-auto w-56 md:w-64 lg:ml-auto lg:mr-6 lg:w-72"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Link
        href={`/store/${active.id}`}
        aria-label={`${active.title} — view guide`}
        className="group block"
      >
        <div className="relative">
          <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full bg-red" />
          <div className="relative aspect-[600/849] w-full overflow-hidden bg-ink shadow-xl">
            {slides.map((s, i) => (
              <Image
                key={s.id}
                src={s.coverImage}
                alt={i === index ? `${s.title} ebook cover` : ""}
                fill
                sizes="(min-width: 1024px) 18rem, 16rem"
                className={`object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-baseline justify-between gap-3">
          <span className="truncate font-heading text-base font-semibold text-ink group-hover:text-red">
            {active.title}
          </span>
          {active.comingSoon ? (
            <span className="whitespace-nowrap font-body text-xs font-semibold tracking-[0.15em] text-ink/60">
              COMING SOON
            </span>
          ) : (
            <span className="whitespace-nowrap font-heading text-base font-semibold text-red">
              GH&#8373;{active.priceGHS}
            </span>
          )}
        </div>
      </Link>

      {slides.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show ${s.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-red" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
