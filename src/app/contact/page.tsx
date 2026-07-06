import type { Metadata } from "next";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/config";
import { IconFacebook, IconInstagram, IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with KIP Academy on WhatsApp, email, or social media.",
};

export default function ContactPage() {
  return (
    <section className="bg-navy py-20 text-offwhite md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="font-heading text-xs font-bold tracking-[0.25em] text-gold">
          GET IN TOUCH
        </p>
        <h1 className="mt-4 max-w-[22ch] font-heading text-3xl font-extrabold md:text-5xl">
          Questions before you buy? Message us.
        </h1>
        <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed text-offwhite/70">
          WhatsApp is the fastest way to reach us — most messages get a reply
          the same day.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-sm bg-[#25D366] px-8 py-4 font-heading text-sm font-bold text-navy transition-transform hover:scale-[1.02]"
          >
            <IconWhatsApp className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center justify-center rounded-sm border border-offwhite/30 px-8 py-4 font-heading text-sm font-bold text-offwhite transition-colors hover:border-gold hover:text-gold"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="mt-14 border-t border-offwhite/10 pt-10">
          <p className="font-heading text-xs font-bold tracking-[0.2em] text-offwhite/45">
            FOLLOW ALONG
          </p>
          <div className="mt-5 flex items-center gap-5">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KIP Academy on Facebook"
              className="text-offwhite/70 transition-colors hover:text-gold"
            >
              <IconFacebook className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KIP Academy on Instagram"
              className="text-offwhite/70 transition-colors hover:text-gold"
            >
              <IconInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
