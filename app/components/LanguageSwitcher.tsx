"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center rounded-full bg-emerald-400/15 border border-emerald-400/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setLocale("pt")}
        className={`px-3 py-1.5 text-sm font-medium tracking-wider transition-colors ${
          locale === "pt"
            ? "bg-emerald-400 text-black"
            : "text-white/80 hover:text-white hover:bg-emerald-400/20"
        }`}
        aria-label="Português"
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 text-sm font-medium tracking-wider transition-colors ${
          locale === "en"
            ? "bg-emerald-400 text-black"
            : "text-white/80 hover:text-white hover:bg-emerald-400/20"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
