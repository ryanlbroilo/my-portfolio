"use client";

import React from "react";

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden
      style={{ minHeight: "100dvh" }}
    >
      {/* Base escuro - cobre todo o site */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Ondas de gradiente - animação contínua em todo o viewport */}
      <div
        className="absolute inset-0 opacity-100 animate-wave-gradient"
        style={{
          background: `
            linear-gradient(120deg, transparent 0%, rgba(16, 185, 129, 0.08) 25%, transparent 50%, rgba(6, 182, 212, 0.06) 75%, transparent 100%),
            linear-gradient(240deg, transparent 0%, rgba(6, 182, 212, 0.07) 30%, transparent 60%, rgba(16, 185, 129, 0.05) 100%),
            linear-gradient(360deg, transparent 0%, rgba(16, 185, 129, 0.06) 20%, transparent 40%, rgba(20, 184, 166, 0.05) 80%, transparent 100%)
          `,
          backgroundSize: "400% 400%, 350% 350%, 300% 300%",
          backgroundPosition: "0% 50%, 100% 50%, 50% 0%",
        }}
      />

      {/* Segunda camada de ondas - movimento em outra direção/velocidade */}
      <div
        className="absolute inset-0 opacity-100 animate-wave-gradient-2"
        style={{
          background: `
            linear-gradient(60deg, transparent 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%),
            linear-gradient(300deg, transparent 0%, rgba(6, 182, 212, 0.06) 40%, transparent 90%)
          `,
          backgroundSize: "500% 500%, 450% 450%",
          backgroundPosition: "0% 0%, 100% 100%",
        }}
      />

      {/* Grid sutil por cima das ondas */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vignette nas bordas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
