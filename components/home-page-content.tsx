"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { DailyHighlight } from "@/components/daily-highlight";
import { ZodiacGrid } from "@/components/zodiac-grid";
import { type ZodiacSign } from "@/lib/zodiac-data";
import {
  buildFallbackSigns,
  buildZodiacSigns,
  dateKeyToInputValue,
  getDateInputForTimeZone,
  inputValueToDateKey,
  normalizeDateInput,
  type RawDailyPayload,
} from "@/lib/zodiac-data-transform";

interface HomePageContentProps {
  availableDates: string[];
}

function resolveDateFromManifest(selectedDate: string, availableDates: string[]) {
  if (availableDates.length === 0) {
    return selectedDate;
  }

  const previousMatch = [...availableDates].reverse().find((date) => date <= selectedDate);
  return previousMatch ?? availableDates[availableDates.length - 1];
}

export function HomePageContent({ availableDates }: HomePageContentProps) {
  const searchParams = useSearchParams();
  const [signs, setSigns] = useState<ZodiacSign[]>(() => buildFallbackSigns());
  const [isLoading, setIsLoading] = useState(true);

  const browserTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const selectedDate =
    normalizeDateInput(searchParams.get("date")) ??
    getDateInputForTimeZone(browserTimeZone);
  const resolvedDate = resolveDateFromManifest(selectedDate, availableDates);

  useEffect(() => {
    let isActive = true;
    const dateKey = inputValueToDateKey(resolvedDate);

    setIsLoading(true);

    fetch(`/raw/${dateKey}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load raw data for ${dateKey}`);
        }

        return response.json() as Promise<RawDailyPayload>;
      })
      .then((payload) => {
        if (!isActive) {
          return;
        }

        setSigns(buildZodiacSigns(payload));
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setSigns(buildFallbackSigns());
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [resolvedDate]);

  return (
    <>
      <DailyHighlight
        selectedDate={selectedDate}
        resolvedDate={resolvedDate}
        hasExactMatch={selectedDate === resolvedDate}
        minDate={availableDates[0] ?? null}
        maxDate={availableDates[availableDates.length - 1] ?? null}
        timeZone={browserTimeZone}
      />
      <ZodiacGrid signs={signs} resolvedDate={resolvedDate} />
      {isLoading ? null : null}
    </>
  );
}
