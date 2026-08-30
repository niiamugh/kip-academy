"use client";

import { useState } from "react";
import { IconChevronDown } from "../icons";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "How do I pay, and is it safe?",
    answer:
      "Checkout runs through Paystack, which accepts Mobile Money (MTN, Vodafone, AirtelTigo) and debit or credit cards. Your card and mobile money details are handled entirely by Paystack — we never see or store them.",
  },
  {
    question: "How do I get the PDF after I pay?",
    answer:
      "Delivery is instant. Once payment is confirmed, Paystack redirects you to a download page and sends a copy of the link to your email, so you can also grab it later from your inbox.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "No — because the guide is a PDF delivered the moment you pay, all sales are final. So ask us anything before you buy: message us on WhatsApp and we'll tell you honestly whether the guide is right for you. If you paid and didn't receive your guide, that's different — message us and we'll deliver it straight away.",
  },
  {
    question: "Can I read it on my phone?",
    answer:
      "Yes. It's a standard PDF, so it opens on any phone, tablet, or computer with a PDF reader — including the one already built into your phone's browser.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-heading text-base font-semibold text-ink">
                {faq.question}
              </span>
              <IconChevronDown
                className={`h-5 w-5 flex-shrink-0 text-red transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 pr-8 font-body text-sm leading-relaxed text-ink/70">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
