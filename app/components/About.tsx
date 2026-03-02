"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-16 flex flex-col justify-center scroll-mt-20">
      <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
        {t.about.label}
      </p>
      <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl mb-14">
        {t.about.title}
      </h2>
      <div className="max-w-xl space-y-6 text-white/80 text-base md:text-lg leading-relaxed">
        {t.about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
