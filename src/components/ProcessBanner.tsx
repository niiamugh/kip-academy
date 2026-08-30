import { PROCESS_LINE } from "@/lib/config";

export function ProcessBanner() {
  const words = PROCESS_LINE.split("•").map((w) => w.trim());

  return (
    <div className="bg-ink py-3.5">
      <p className="mx-auto max-w-7xl px-5 text-center font-body text-xs font-semibold tracking-[0.28em] text-white md:px-8 md:text-sm">
        {words.map((word, i) => (
          <span key={word}>
            {word.toUpperCase()}
            {i < words.length - 1 && (
              <span aria-hidden className="mx-3 text-red-bright md:mx-4">
                •
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
