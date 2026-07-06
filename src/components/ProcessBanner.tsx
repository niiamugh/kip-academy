import { PROCESS_LINE } from "@/lib/config";

export function ProcessBanner() {
  return (
    <div className="bg-gold py-3">
      <p className="mx-auto max-w-7xl px-5 text-center font-heading text-xs font-extrabold tracking-[0.3em] text-navy md:text-sm md:px-8">
        {PROCESS_LINE}
      </p>
    </div>
  );
}
