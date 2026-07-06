import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_TAGLINE, SOCIAL_LINKS } from "@/lib/config";
import { IconFacebook, IconInstagram, IconWhatsApp } from "./icons";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/store", label: "Store" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Flagship guide",
    links: [{ href: "/store/unshakeable", label: "Unshakeable" }],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-offwhite">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={40} height={49} className="h-10 w-auto" />
              <span className="font-heading text-base font-extrabold tracking-wide">
                KIP <span className="text-gold">ACADEMY</span>
              </span>
            </div>
            <p className="mt-4 font-heading text-xs font-bold tracking-[0.25em] text-gold/80">
              {SITE_TAGLINE.toUpperCase()}
            </p>
            <p className="mt-5 max-w-[36ch] font-body text-sm leading-relaxed text-offwhite/60">
              Practical PDF guides for building confidence, mindset, habits, and
              growth — made for people who want results, not hype.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KIP Academy on Facebook"
                className="text-offwhite/70 transition-colors hover:text-gold"
              >
                <IconFacebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KIP Academy on Instagram"
                className="text-offwhite/70 transition-colors hover:text-gold"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with KIP Academy on WhatsApp"
                className="text-offwhite/70 transition-colors hover:text-gold"
              >
                <IconWhatsApp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <p className="font-heading text-xs font-bold tracking-[0.2em] text-offwhite/45">
                {col.title.toUpperCase()}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-offwhite/75 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <p className="font-heading text-xs font-bold tracking-[0.2em] text-offwhite/45">
              CONTACT
            </p>
            <ul className="mt-5 flex flex-col gap-3 font-body text-sm text-offwhite/75">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-gold">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Message us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-offwhite/10 pt-8 font-body text-xs text-offwhite/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} KIP Academy. All rights reserved.</p>
          <p>Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
