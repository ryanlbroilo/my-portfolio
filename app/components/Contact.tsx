"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

const linkKeys = ["email", "instagram", "linkedin", "github"] as const;

export default function Contact() {
  const { t } = useLanguage();

  const hrefs: Record<(typeof linkKeys)[number], string> = {
    email: "mailto:ryanlizzebroilo@gmail.com",
    instagram: "https://www.instagram.com/ryanlbroilo",
    linkedin: "https://www.linkedin.com/in/ryanlbroilo/",
    github: "https://github.com/ryanlbroilo",
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-16 flex flex-col justify-center scroll-mt-20">
      <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
        {t.contact.label}
      </p>
      <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl mb-16">
        {t.contact.title}
      </h2>
      <ul className="space-y-6 max-w-md">
        {linkKeys.map((key) => (
          <li key={key}>
            <a
              href={hrefs[key]}
              target={key !== "email" ? "_blank" : undefined}
              rel={key !== "email" ? "noopener noreferrer" : undefined}
              className="text-white text-lg md:text-xl hover:text-emerald-400/90 transition-colors inline-flex flex-wrap items-baseline gap-2"
            >
              <span className="text-white/60 text-sm uppercase tracking-wider">
                {t.contact[key]}:
              </span>
              <span className="border-b border-transparent hover:border-emerald-400/50">
                {t.contact.links[key]}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
