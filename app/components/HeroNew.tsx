"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

const BIRTH_DATE = new Date(2003, 11, 6); // 06/12/2003 (mês 0-indexed)
const EXPERIENCE_START_YEAR = 2021;

function getAge(): number {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const m = today.getMonth() - BIRTH_DATE.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < BIRTH_DATE.getDate())) age--;
  return age;
}

function getExperienceYears(): number {
  return new Date().getFullYear() - EXPERIENCE_START_YEAR;
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ryanlbroilo/", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/ryanlbroilo", Icon: Github },
  { label: "Instagram", href: "https://www.instagram.com/ryanlbroilo", Icon: Instagram },
];

export default function HeroNew() {
  const { t } = useLanguage();
  const taglines = t.hero.taglines;
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const age = useMemo(() => getAge(), []);
  const experienceYears = useMemo(() => getExperienceYears(), []);

  useEffect(() => {
    const fullText = taglines[taglineIndex];
    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, TYPE_SPEED);
        return () => clearTimeout(timeout);
      }
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(pause);
    }
    if (displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, DELETE_SPEED);
      return () => clearTimeout(timeout);
    }
    setIsDeleting(false);
    setTaglineIndex((i) => (i + 1) % taglines.length);
    return () => {};
  }, [taglineIndex, displayText, isDeleting, taglines]);

  const stats = t.hero.stats;
  const getStatValue = (valueKey: string) => {
    switch (valueKey) {
      case "projects":
        return "+20";
      case "age":
        return String(age);
      case "experience":
        return `${experienceYears}+`;
      case "focus":
        return "100%";
      default:
        return valueKey;
    }
  };

  return (
    <section className="min-h-screen h-screen min-h-[100dvh] flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-28 pb-6 relative box-border">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full py-6">
        {/* Linha: texto (Hi, I'm / Nome / role / tagline) + avatar ao lado */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1">
            <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-2 font-mono">
              {t.hero.role}
            </p>
            <p className="text-white/90 text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
              {t.hero.greeting}
            </p>
            <h1 className="text-emerald-400 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl tracking-tight leading-[0.95]">
              {t.hero.name}
            </h1>
            <div className="mt-6 min-h-[2rem] flex items-center">
              <span className="text-white/80 font-medium text-lg md:text-xl">
                {displayText}
              </span>
              <span className="text-emerald-400/90 ml-0.5 animate-blink">|</span>
            </div>
            <p className="text-white/55 text-sm md:text-base mt-4 max-w-lg">
              {t.hero.taglineShort}
            </p>
          </div>

          {/* Avatar ao lado do bloco de texto — foto estática, só a borda tracejada gira */}
          <div className="flex shrink-0 self-center relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-80 xl:h-80">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="/images/avatar.jpg"
                alt="Ryan Broilo"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 208px, (max-width: 1280px) 256px, 320px"
                priority
              />
            </div>
            <div className="absolute inset-0 rounded-full avatar-dashed-ring pointer-events-none" aria-hidden />
          </div>
        </div>

        {/* CTA + redes sociais (abaixo do bloco nome + avatar) */}
        <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-emerald-400 text-emerald-400 text-sm font-medium tracking-wider hover:bg-emerald-400 hover:text-black transition-colors"
            >
              {t.hero.cta}
              <span>→</span>
            </a>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.Icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-emerald-400/60 flex items-center justify-center text-white/80 hover:bg-emerald-400/20 hover:border-emerald-400 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </a>
                );
              })}
            </div>
        </div>
      </div>

      {/* Barra de estatísticas */}
      <div className="pt-6 border-t border-white/10 grid grid-cols-4 gap-4 md:gap-6 max-w-4xl">
        {stats.map((stat, i) => (
          <div key={i}>
            <p className="text-white font-bold text-2xl md:text-3xl">
              {getStatValue(stat.valueKey)}
            </p>
            <p className="text-white/50 text-xs md:text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      </section>
  );
}
