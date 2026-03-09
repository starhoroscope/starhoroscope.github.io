"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoonStar,
  Sunrise,
} from "lucide-react";

interface DailyHighlightProps {
  selectedDate: string;
  resolvedDate: string;
  hasExactMatch: boolean;
  minDate: string | null;
  maxDate: string | null;
  timeZone: string;
}

function parseDateInput(dateInput: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return null;
  }

  const [year, month, day] = dateInput.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));

  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatDisplayDate(dateInput: string, timeZone: string) {
  const date = parseDateInput(dateInput);

  if (!date) {
    return dateInput;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function shiftDate(dateInput: string, offset: number) {
  const date = parseDateInput(dateInput);

  if (!date) {
    return dateInput;
  }

  date.setUTCDate(date.getUTCDate() + offset);

  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

function getTodayDateInput(timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date());
}

export function DailyHighlight({
  selectedDate,
  resolvedDate,
  hasExactMatch,
  minDate,
  maxDate,
  timeZone,
}: DailyHighlightProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [draftDate, setDraftDate] = useState(selectedDate);
  const formattedDate = formatDisplayDate(resolvedDate, timeZone);
  const todayDate = getTodayDateInput(timeZone);
  const browserTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  const moonPhases = [
    "新月",
    "蛾眉月",
    "上弦月",
    "盈凸月",
    "满月",
    "亏凸月",
    "下弦月",
    "残月",
  ];
  const activeDate = parseDateInput(resolvedDate) ?? new Date();
  const dayOfYear = Math.floor(
    (activeDate.getTime() - new Date(activeDate.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const moonPhase = moonPhases[Math.floor(dayOfYear / 3.7) % 8];

  useEffect(() => {
    setDraftDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const currentTimeZone = searchParams.get("tz");

    if (currentTimeZone === browserTimeZone) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("tz", browserTimeZone);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [browserTimeZone, pathname, router, searchParams, startTransition]);

  const updateDate = (nextDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", nextDate);
    params.set("tz", browserTimeZone);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const previousDate = shiftDate(selectedDate, -1);
  const nextDate = shiftDate(selectedDate, 1);
  const canGoPrev = !minDate || previousDate >= minDate;
  const canGoNext = !maxDate || nextDate <= maxDate;
  const canJumpToday =
    selectedDate !== todayDate &&
    (!minDate || todayDate >= minDate) &&
    (!maxDate || todayDate <= maxDate);

  return (
    <section className="relative px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-sans tracking-widest text-muted-foreground">
                  {"当前日期"}
                </p>
                <p className="font-serif text-lg text-foreground">
                  {formattedDate}
                </p>
                {!hasExactMatch && (
                  <p className="mt-1 text-xs font-sans text-amber-300">
                    {`所选日期暂无数据，已回退到 ${resolvedDate}`}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateDate(previousDate)}
                  disabled={!canGoPrev || isPending}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary/50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="上一天"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <input
                  type="date"
                  value={draftDate}
                  min={minDate ?? undefined}
                  max={maxDate ?? undefined}
                  onChange={(event) => setDraftDate(event.target.value)}
                  className="h-10 rounded-full border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition-colors focus:border-primary/40"
                />

                <button
                  type="button"
                  onClick={() => updateDate(nextDate)}
                  disabled={!canGoNext || isPending}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary/50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="下一天"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => updateDate(todayDate)}
                disabled={isPending || !canJumpToday}
                className="h-10 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "切换中" : "今日"}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <MoonStar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-sans tracking-widest text-muted-foreground">
                  {"月相"}
                </p>
                <p className="font-serif text-lg text-foreground">{moonPhase}</p>
              </div>
            </div>

            <div className="hidden h-12 w-px bg-border md:block" />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <Sunrise className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-sans tracking-widest text-muted-foreground">
                  {"宇宙能量"}
                </p>
                <p className="font-serif text-lg text-foreground">{"高频振动"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
