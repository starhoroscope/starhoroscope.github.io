import { Suspense } from "react";

import { StarField } from "@/components/star-field";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { HomePageContent } from "@/components/home-page-content";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { getRawDateManifest } from "@/lib/zodiac-data.server";

export default async function HomePage() {
  const availableDates = await getRawDateManifest();

  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <HeroSection />
          <Suspense fallback={null}>
            <HomePageContent availableDates={availableDates} />
          </Suspense>
          <HowItWorks />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
