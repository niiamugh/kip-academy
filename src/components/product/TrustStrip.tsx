import { IconCheck } from "../icons";

const ITEMS = [
  "Instant PDF download after payment",
  "Secure checkout — Mobile Money & cards",
  "Lifetime access, read on any device",
];

export function TrustStrip() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {ITEMS.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-dark" />
          <span className="font-body text-sm text-navy/75">{item}</span>
        </li>
      ))}
    </ul>
  );
}
