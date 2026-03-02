"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export default function Find() {
  const { t } = useLanguage();

  return (
    <section id="find" className="py-32 px-6 md:px-12 lg:px-16 scroll-mt-20">
      <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
        {t.find.label}
      </p>
      <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl mb-8">
        {t.find.title}
      </h2>
      <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
        {t.find.description}
      </p>
      <ul className="space-y-2 max-w-xl">
        {t.find.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-white/80 text-sm md:text-base">
            <span className="text-emerald-400/90">✓</span>
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  );
}
