"use client";

import { StarField } from "@/components/star-field";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { DailyHighlight } from "@/components/daily-highlight";
import { ZodiacGrid } from "@/components/zodiac-grid";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <HeroSection />
          <DailyHighlight />
          <ZodiacGrid />
          <HowItWorks />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
