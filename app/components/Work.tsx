"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

const PROJECT_IMAGES: Record<string, string[]> = {
  logma: ["logma.png"],
  evolve: ["evolve.png"],
  evoris: ["home.png"],
  corsa: ["home.png", "clubs.png", "feed.png"],
};

const projectKeys = ["logma", "evolve", "evoris", "corsa"] as const;

export default function Work() {
  const { t } = useLanguage();
  const [corsaGalleryIndex, setCorsaGalleryIndex] = useState(0);

  return (
    <section id="work" className="py-32 px-6 md:px-12 lg:px-16 scroll-mt-20">
      <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
        {t.work.label}
      </p>
      <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight max-w-4xl mb-4">
        {t.work.title}
      </h2>
      <p className="text-white/55 text-base md:text-lg max-w-xl mb-20">
        {t.work.subtitle}
      </p>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-12 max-w-6xl">
        {projectKeys.map((key) => {
          const p = t.work.projects[key];
          const isCorsa = key === "corsa";
          const isExternal = p.url !== "#";

          return (
            <article
              key={key}
              className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-emerald-400/30 transition-colors"
            >
              {/* Imagem do projeto */}
              <div className="relative aspect-video bg-white/5">
                {isCorsa ? (
                  <>
                    <Image
                      src={`/images/projects/corsa-nobile/${PROJECT_IMAGES.corsa[corsaGalleryIndex]}`}
                      alt={`Corsa Nobile - screenshot ${corsaGalleryIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {PROJECT_IMAGES.corsa.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCorsaGalleryIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === corsaGalleryIndex ? "bg-emerald-400" : "bg-white/40"
                          }`}
                          aria-label={`Imagem ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <Image
                    src={`/images/projects/${key}/${PROJECT_IMAGES[key][0]}`}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-white font-semibold text-xl md:text-2xl mb-2">
                  {p.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                  {p.description}
                </p>
                {isExternal && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:underline"
                  >
                    {p.link}
                    <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <a
        href="https://github.com/ryanlbroilo?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-12 text-white text-sm tracking-widest group"
      >
        <span className="border-b border-emerald-400/60 pb-1 group-hover:border-emerald-400 transition-colors">
          {t.work.viewAll}
        </span>
        <span className="text-emerald-400/80 group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </section>
  );
}
