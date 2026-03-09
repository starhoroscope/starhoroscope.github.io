"use client";

import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-sans tracking-wide text-primary">
            {"每日星座运势指南"}
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground text-balance leading-[1.1]">
          {"星辰之上"}
          <br />
          <span className="text-primary font-medium italic">{"命运所归"}</span>
        </h1>

        <p className="max-w-xl text-muted-foreground text-lg md:text-xl leading-relaxed font-sans">
          {"探索你的每日星座运势，揭晓宇宙的奥秘，获取十二星座的专属星象指引。"}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <a
            href="#zodiac-signs"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            {"查看你的星座"}
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3 rounded-full border border-border text-foreground font-sans font-medium text-sm tracking-wide hover:bg-secondary/50 transition-colors"
          >
            {"了解更多"}
          </a>
        </div>
      </div>
    </section>
  );
}
