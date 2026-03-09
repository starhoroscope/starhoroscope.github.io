"use client";

import { useState } from "react";
import { zodiacSigns, type ZodiacSign } from "@/lib/zodiac-data";
import { ZodiacCard } from "./zodiac-card";
import { ZodiacDetail } from "./zodiac-detail";

const elements = ["全部", "火", "土", "风", "水"] as const;

export function ZodiacGrid() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [filter, setFilter] = useState<string>("全部");

  const filteredSigns =
    filter === "全部"
      ? zodiacSigns
      : zodiacSigns.filter((s) => s.element === filter);

  return (
    <section id="zodiac-signs" className="relative px-4 py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground tracking-tight text-balance">
            {"十二星座"}
          </h2>
          <p className="max-w-lg text-muted-foreground font-sans leading-relaxed">
            {"选择你的星座，揭示今天宇宙为你排列的命运。"}
          </p>
        </div>

        {/* Element Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {elements.map((el) => (
            <button
              key={el}
              onClick={() => setFilter(el)}
              className={`px-5 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-200 ${
                filter === el
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {el}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredSigns.map((sign) => (
            <ZodiacCard
              key={sign.name}
              sign={sign}
              onSelect={setSelectedSign}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSign && (
        <ZodiacDetail
          sign={selectedSign}
          onClose={() => setSelectedSign(null)}
          onNavigate={(sign) => setSelectedSign(sign)}
        />
      )}
    </section>
  );
}
