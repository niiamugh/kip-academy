import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME, WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "KIP Academy sells instantly delivered digital guides. All sales are final.",
};

const UPDATED = "30 August 2026";

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated={UPDATED}>
      <p className="text-lg font-semibold text-ink">
        All sales are final. {SITE_NAME} does not offer refunds on its digital
        guides.
      </p>

      <div>
        <h2>Why</h2>
        <p>
          Every guide we sell is a digital PDF delivered immediately after
          payment. Once it has been sent, it cannot be returned or taken back, so
          we cannot offer refunds, exchanges, or cancellations after purchase.
        </p>
      </div>

      <div>
        <h2>Before you buy</h2>
        <p>
          Please make sure the guide is right for you before paying. Every guide
          has a full sales page listing what is inside and who it is for, and you
          can{" "}
          <a
            href={WHATSAPP_LINK_WITH_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red underline-offset-4 hover:underline"
          >
            message us on WhatsApp
          </a>{" "}
          with any question before you buy. We would much rather answer a
          question first than take money from someone the guide will not help.
        </p>
      </div>

      <div>
        <h2>If something goes wrong</h2>
        <p>
          This policy covers change of mind, not failed transactions. Contact us
          straight away and we will fix it if:
        </p>
        <ul className="mt-4">
          <li>You paid but never received your guide.</li>
          <li>You were charged twice for the same guide.</li>
          <li>Your download link does not work or the file will not open.</li>
        </ul>
        <p className="mt-4">
          In those cases we will deliver the guide you paid for, or return a
          duplicate charge. Message us with your payment receipt and we will sort
          it out quickly.
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
            href="/privacy"
            className="font-semibold text-red underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </LegalPage>
  );
}
