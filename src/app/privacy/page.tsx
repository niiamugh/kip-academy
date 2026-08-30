import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME, WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How KIP Academy collects, uses, and protects your personal information.",
};

const UPDATED = "30 August 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={UPDATED}>
      <p>
        {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) sells digital guides at
        thekipacademy.com. This policy explains what personal information we
        collect, why we collect it, and what we do with it. We are based in
        Accra, Ghana, and we handle personal data in line with Ghana&rsquo;s Data
        Protection Act, 2012 (Act 843).
      </p>

      <div>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Your email address</strong> — when you start a purchase or
            request a free chapter. We need it to send your guide and your
            receipt.
          </li>
          <li>
            <strong>Your name</strong> — only if you enter it when requesting a
            free chapter.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, approximate location
            (country or city level), device and browser type, and how you
            reached the site. This is collected automatically by the analytics
            tools described below.
          </li>
        </ul>
        <p className="mt-4">
          We do <strong>not</strong> collect or store your card details, mobile
          money number, or PIN. Payments are handled entirely by our payment
          providers, and those details never reach our servers.
        </p>
      </div>

      <div>
        <h2>How we use your information</h2>
        <ul>
          <li>To deliver the guide you bought and send your receipt.</li>
          <li>To send the free chapter or resource you asked for.</li>
          <li>
            To send occasional emails about new guides and offers, if you signed
            up for them. Every such email has an unsubscribe link.
          </li>
          <li>To answer your messages when you contact us.</li>
          <li>
            To understand how the site is used and to measure our advertising, so
            we can improve both.
          </li>
        </ul>
        <p className="mt-4">
          We do not sell your personal information, and we do not share it with
          anyone except the service providers listed below.
        </p>
      </div>

      <div>
        <h2>Services we use</h2>
        <ul>
          <li>
            <strong>Paystack and Skillspad</strong> — process payments and
            deliver purchased guides. They receive your email and payment
            details directly.
          </li>
          <li>
            <strong>Meta (Facebook) Pixel</strong> — tells us which pages and
            adverts lead to sales, and lets us show adverts to people likely to
            be interested. Meta receives usage data from this site.
          </li>
          <li>
            <strong>Google Analytics</strong> — reports how visitors use the
            site, in aggregate.
          </li>
          <li>
            <strong>Hostinger</strong> — hosts the website and its server logs.
          </li>
        </ul>
        <p className="mt-4">
          These providers process data on their own terms and may store it
          outside Ghana.
        </p>
      </div>

      <div>
        <h2>Cookies and tracking</h2>
        <p>
          This site uses cookies and similar technologies for analytics and
          advertising measurement. You can block or delete cookies in your
          browser settings, and you can opt out of personalised adverts in your
          Facebook and Google account settings. Blocking cookies does not stop
          you from browsing or buying.
        </p>
      </div>

      <div>
        <h2>How long we keep your data</h2>
        <p>
          We keep purchase records for as long as we need them for accounting and
          customer support. We keep mailing-list details until you unsubscribe or
          ask us to delete them.
        </p>
      </div>

      <div>
        <h2>Your rights</h2>
        <p>
          You can ask us to show you the personal data we hold about you, correct
          it, or delete it. You can unsubscribe from our emails at any time. To
          make any of these requests, email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-red underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      <div>
        <h2>Children</h2>
        <p>
          Our guides are written for adults. We do not knowingly collect personal
          information from children under 18.
        </p>
      </div>

      <div>
        <h2>Changes to this policy</h2>
        <p>
          If we change this policy, we will update the date at the top of this
          page.
        </p>
      </div>

      <div>
        <h2>Contact us</h2>
        <p>
          Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-red underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          or{" "}
          <a
            href={WHATSAPP_LINK_WITH_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red underline-offset-4 hover:underline"
          >
            message us on WhatsApp
          </a>
          . See also our{" "}
          <Link
            href="/refund-policy"
            className="font-semibold text-red underline-offset-4 hover:underline"
          >
            Refund Policy
          </Link>
          .
        </p>
      </div>
    </LegalPage>
  );
}
