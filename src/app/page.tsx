import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProcessBanner } from "@/components/ProcessBanner";
import { PillarsSection } from "@/components/PillarsSection";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { AboutStrip } from "@/components/AboutStrip";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { SITE_DESCRIPTION } from "@/lib/config";

export const metadata: Metadata = {
  title: "Knowledge Is Power. Own Both.",
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessBanner />
      <PillarsSection />
      <FeaturedProduct />
      <AboutStrip />
      <LeadMagnetSection />
    </>
  );
}
