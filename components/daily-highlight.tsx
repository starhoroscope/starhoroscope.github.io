"use client";

import { CalendarDays, MoonStar, Sunrise } from "lucide-react";

export function DailyHighlight() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("zh-CN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const moonPhase = moonPhases[Math.floor(dayOfYear / 3.7) % 8];

  return (
    <section className="relative px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
              <CalendarDays className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans tracking-widest">
                {"今日日期"}
              </p>
              <p className="font-serif text-lg text-foreground">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-border" />

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
              <MoonStar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans tracking-widest">
                {"月相"}
              </p>
              <p className="font-serif text-lg text-foreground">{moonPhase}</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-border" />

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
              <Sunrise className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans tracking-widest">
                {"宇宙能量"}
              </p>
              <p className="font-serif text-lg text-foreground">{"高频振动"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
