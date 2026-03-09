import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative px-4 py-16 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-serif text-xl text-foreground tracking-wide">
            {"星语"}
          </span>
        </div>
        <p className="max-w-md text-sm text-muted-foreground font-sans leading-relaxed">
          {
            "你的每日星座指南。运势解读仅供娱乐和自我反思。请相信自己的智慧高于一切。"
          }
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#zodiac-signs"
            className="text-sm text-muted-foreground hover:text-foreground font-sans transition-colors"
          >
            {"十二星座"}
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground font-sans transition-colors"
          >
            {"使用指南"}
          </a>
        </div>
        <div className="w-16 h-px bg-border" />
        <p className="text-xs text-muted-foreground font-sans">
          {new Date().getFullYear()} {"星语 版权所有"}
        </p>
      </div>
    </footer>
  );
}
