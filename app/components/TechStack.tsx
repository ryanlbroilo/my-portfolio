"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const techIcons: { name: string; path: string }[] = [
  { name: "React", path: "react/react-original.svg" },
  { name: "Next.js", path: "nextjs/nextjs-original.svg" },
  { name: "Vue.js", path: "vuejs/vuejs-original.svg" },
  { name: "TypeScript", path: "typescript/typescript-original.svg" },
  { name: "JavaScript", path: "javascript/javascript-original.svg" },
  { name: "Node.js", path: "nodejs/nodejs-original.svg" },
  { name: "Python", path: "python/python-original.svg" },
  { name: "Angular", path: "angularjs/angularjs-original.svg" },
  { name: "React Native", path: "react/react-original.svg" },
  { name: "Svelte", path: "svelte/svelte-original.svg" },
  { name: "Vite", path: "vitejs/vitejs-original.svg" },
  { name: "Tailwind CSS", path: "tailwindcss/tailwindcss-original.svg" },
  { name: "Firebase", path: "firebase/firebase-plain.svg" },
  { name: "Figma", path: "figma/figma-original.svg" },
  { name: "Vercel", path: "vercel/vercel-original.svg" },
  { name: "Git", path: "git/git-original.svg" },
];

export default function TechStack() {
  const { t } = useLanguage();

  const sections = [
    { title: t.tech.frontend, items: t.tech.frontendItems },
    { title: t.tech.backend, items: t.tech.backendItems },
    { title: t.tech.ui, items: t.tech.uiItems },
    { title: t.tech.extras, items: t.tech.extrasItems },
  ];

  return (
    <section id="tech" className="py-32 px-6 md:px-12 lg:px-16 scroll-mt-20">
      <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
        {t.tech.label}
      </p>
      <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-14">
        {t.tech.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-10 mb-16 max-w-4xl">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-emerald-400/90 font-medium text-sm tracking-wider uppercase mb-3">
              {section.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 rounded-md bg-white/5 text-white/80 text-sm border border-white/10 hover:border-emerald-400/30 hover:text-white transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-white/50 text-xs tracking-wider uppercase mb-4 font-mono">
        {t.tech.snapshot}
      </p>
      {/* Ícones dos frameworks */}
      <div className="flex flex-wrap gap-4">
        {techIcons.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400/30 transition-colors"
            title={tech.name}
          >
            <Image
              src={`${CDN}/${tech.path}`}
              alt={tech.name}
              width={28}
              height={28}
              className="object-contain"
              unoptimized
            />
            <span className="text-white/80 text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
