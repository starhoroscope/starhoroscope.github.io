"use client";

import { X, Heart, Briefcase, Star, Sparkles, ArrowRight } from "lucide-react";
import {
  type ZodiacSign,
  elementColors,
  elementBgColors,
  zodiacSigns,
} from "@/lib/zodiac-data";
import { useEffect, useCallback } from "react";

interface ZodiacDetailProps {
  sign: ZodiacSign;
  onClose: () => void;
  onNavigate: (sign: ZodiacSign) => void;
}

export function ZodiacDetail({ sign, onClose, onNavigate }: ZodiacDetailProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const compatibleSign = zodiacSigns.find((s) => s.name === sign.compatibility);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        role="dialog"
        aria-modal="true"
        aria-label={`${sign.name}运势详情`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-card/95 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center gap-4">
            <span className="text-4xl" role="img" aria-label={sign.name}>
              {sign.symbol}
            </span>
            <div>
              <h2 className="font-serif text-3xl font-medium text-foreground">
                {sign.name}
              </h2>
              <p className="text-sm text-muted-foreground font-sans">
                {sign.dates}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="关闭详情"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Element & Ruling Planet */}
          <div className="flex flex-wrap gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-sans border ${elementBgColors[sign.element]} ${elementColors[sign.element]}`}
            >
              {sign.element}
              {"象星座"}
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-sans border border-primary/20 bg-primary/5 text-primary">
              {"守护星："}
              {sign.ruling}
            </span>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap gap-2">
            {sign.traits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1 rounded-full text-xs font-sans border border-border bg-secondary/50 text-foreground"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Daily Horoscope */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl text-foreground">
                {"今日运势"}
              </h3>
            </div>
            <p className="text-muted-foreground font-sans leading-relaxed text-[15px]">
              {sign.horoscope}
            </p>
          </div>

          {/* Love & Career */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-secondary/30">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <h4 className="font-serif text-lg text-foreground">{"爱情"}</h4>
              </div>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {sign.love}
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-secondary/30">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <h4 className="font-serif text-lg text-foreground">{"事业"}</h4>
              </div>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {sign.career}
              </p>
            </div>
          </div>

          {/* Lucky & Compatibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-secondary/30">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                <h4 className="font-serif text-lg text-foreground">
                  {"今日幸运"}
                </h4>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div>
                  <p className="text-xs text-muted-foreground font-sans tracking-wider">
                    {"幸运数字"}
                  </p>
                  <p className="text-2xl font-serif text-foreground">
                    {sign.lucky.number}
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground font-sans tracking-wider">
                    {"幸运颜色"}
                  </p>
                  <p className="text-lg font-serif text-foreground">
                    {sign.lucky.color}
                  </p>
                </div>
              </div>
            </div>

            {compatibleSign && (
              <button
                onClick={() => onNavigate(compatibleSign)}
                className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-secondary/30 hover:border-primary/30 transition-colors cursor-pointer text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <h4 className="font-serif text-lg text-foreground">
                      {"最佳配对"}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className="text-3xl"
                    role="img"
                    aria-label={compatibleSign.name}
                  >
                    {compatibleSign.symbol}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-foreground">
                      {compatibleSign.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-sans">
                      {compatibleSign.dates}
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
