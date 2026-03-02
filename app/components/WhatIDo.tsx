"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export default function WhatIDo() {
  const { t } = useLanguage();

  return (
    <section id="what-i-do" className="py-32 px-6 md:px-12 lg:px-16 scroll-mt-20">
      <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
        {t.whatIDo.label}
      </p>
      <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl mb-14">
        {t.whatIDo.title}
      </h2>
      <ul className="space-y-5 max-w-2xl">
        {t.whatIDo.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-white/80 text-base md:text-lg leading-relaxed">
            <span className="text-emerald-400/90 mt-1.5 shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
