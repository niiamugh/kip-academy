import type { Metadata } from "next";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/config";
import { IconFacebook, IconInstagram, IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with KIP Academy on WhatsApp, email, or social media.",
};

export default function ContactPage() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="font-body text-sm font-semibold text-red">Get in touch</p>
        <h1 className="mt-3 max-w-[22ch] font-heading text-3xl font-semibold text-ink md:text-5xl">
          Questions before you buy? Message us.
        </h1>
        <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed text-ink/70">
          WhatsApp is the fastest way to reach us — most messages get a reply
          the same day.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-sm bg-[#25D366] px-8 py-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-[#1fb355]"
          >
            <IconWhatsApp className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center justify-center rounded-sm border border-ink/25 px-8 py-4 font-body text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="mt-14 border-t border-ink/10 pt-10">
          <p className="font-body text-xs font-semibold tracking-[0.18em] text-ink/50">
            FOLLOW ALONG
          </p>
          <div className="mt-5 flex items-center gap-5">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KIP Academy on Facebook"
              className="text-ink/60 transition-colors hover:text-red"
            >
              <IconFacebook className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KIP Academy on Instagram"
              className="text-ink/60 transition-colors hover:text-red"
            >
              <IconInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
