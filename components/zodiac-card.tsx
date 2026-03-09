"use client";

import { type ZodiacSign, elementColors } from "@/lib/zodiac-data";

interface ZodiacCardProps {
  sign: ZodiacSign;
  onSelect: (sign: ZodiacSign) => void;
}

export function ZodiacCard({ sign, onSelect }: ZodiacCardProps) {
  return (
    <button
      onClick={() => onSelect(sign)}
      className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80 transition-all duration-300 cursor-pointer text-left"
      aria-label={`查看${sign.name}运势`}
    >
      <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

      <span
        className="relative text-5xl md:text-6xl transition-transform duration-300 group-hover:scale-110"
        role="img"
        aria-label={sign.name}
      >
        {sign.symbol}
      </span>

      <div className="relative flex flex-col items-center gap-1">
        <h3 className="font-serif text-xl font-medium text-foreground tracking-wide">
          {sign.name}
        </h3>
        <p className="text-xs font-sans text-muted-foreground tracking-wider uppercase">
          {sign.dates}
        </p>
        <span
          className={`text-xs font-sans mt-1 ${elementColors[sign.element]}`}
        >
          {sign.element}
        </span>
      </div>
    </button>
  );
}
