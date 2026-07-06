import { redirect } from "next/navigation";

// Convenience alias so /unshakeable (a natural URL to share/advertise) always
// resolves to the canonical product page at /store/unshakeable.
export default function UnshakeableRedirect() {
  redirect("/store/unshakeable");
}
