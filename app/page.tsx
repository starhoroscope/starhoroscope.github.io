import { StarField } from "@/components/star-field";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { DailyHighlight } from "@/components/daily-highlight";
import { ZodiacGrid } from "@/components/zodiac-grid";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { getZodiacData } from "@/lib/zodiac-data.server";

interface HomePageProps {
  searchParams?: Promise<{
    date?: string;
    tz?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const zodiacData = await getZodiacData(params?.date, params?.tz);

  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <HeroSection />
          <DailyHighlight
            selectedDate={zodiacData.selectedDate}
            resolvedDate={zodiacData.resolvedDate}
            hasExactMatch={zodiacData.hasExactMatch}
            minDate={zodiacData.minDate}
            maxDate={zodiacData.maxDate}
            timeZone={zodiacData.timeZone}
          />
          <ZodiacGrid
            signs={zodiacData.signs}
            resolvedDate={zodiacData.resolvedDate}
          />
          <HowItWorks />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
