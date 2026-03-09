"use client";

import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";

const navLinks = [
  { label: "十二星座", href: "#zodiac-signs" },
  { label: "使用指南", href: "#how-it-works" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-serif text-xl text-foreground tracking-wide">
            {"星语"}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#zodiac-signs"
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            {"查看运势"}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors tracking-wide py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#zodiac-signs"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium tracking-wide text-center hover:opacity-90 transition-opacity"
          >
            {"查看运势"}
          </a>
        </div>
      )}
    </header>
  );
}
