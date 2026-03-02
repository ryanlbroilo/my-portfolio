"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.projects, href: "#work" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16 bg-transparent md:bg-black/40 md:backdrop-blur-sm border-b border-white/0 md:border-white/5 transition-colors">
      <Link href="#" className="flex items-center gap-1 text-white text-sm md:text-base font-medium tracking-widest hover:opacity-80 transition-opacity">
        RYAN
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm tracking-widest hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`text-white text-sm tracking-widest transition-opacity relative py-1 ${
                  index === 0 ? "hover:opacity-90" : "hover:opacity-80"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                {index === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" aria-hidden />
                )}
              </Link>
            )
          )}
        </nav>
        <LanguageSwitcher />
        <button
          type="button"
          aria-label="Menu"
          className="md:hidden text-white text-sm tracking-widest"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? t.nav.close : t.nav.menu}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-black md:hidden flex flex-col gap-6 p-6 border-t border-white/10">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm tracking-widest"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-sm tracking-widest"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="pt-2">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
