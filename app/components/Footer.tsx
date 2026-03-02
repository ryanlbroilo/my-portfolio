"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-16 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
      <Link
        href="#"
        className="text-white/60 text-sm tracking-widest hover:text-emerald-400/90 transition-colors"
      >
        {t.footer.backToTop}
      </Link>
      <p className="text-white/50 text-sm">© {new Date().getFullYear()} {t.footer.copyright}</p>
    </footer>
  );
}
