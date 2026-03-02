"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

const SKIP_STORAGE_KEY = "portfolio-intro-seen";

/** Duração (ms) de cada etapa antes de passar para a próxima */
const PHASE_DURATIONS = [
  1400,  // 0: welcome
  1100,  // 1: iam
  2200,  // 2: name
  1900,  // 3: role
  2200,  // 4: focus
  2400,  // 5: where
  2800,  // 6: mission
  2200,  // 7: enter
];

const FADE_OUT_MS = 700;

type Phase =
  | "welcome"
  | "iam"
  | "name"
  | "role"
  | "focus"
  | "where"
  | "mission"
  | "enter"
  | "out";

type Props = { onComplete: () => void };

const slideUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function IntroOverlay({ onComplete }: Props) {
  const { t } = useLanguage();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  const phases: Phase[] = ["welcome", "iam", "name", "role", "focus", "where", "mission", "enter"];
  const phase = exiting ? "out" : phases[phaseIndex];

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SKIP_STORAGE_KEY)) {
      onComplete();
      return;
    }

    if (phase === "out") return;

    const duration = PHASE_DURATIONS[phaseIndex] ?? PHASE_DURATIONS[7];
    const timer = setTimeout(() => {
      if (phaseIndex < phases.length - 1) {
        setPhaseIndex((i) => i + 1);
      } else {
        setExiting(true);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [phaseIndex, phase, phases.length, onComplete]);

  const handleExitComplete = () => {
    if (exiting) {
      sessionStorage.setItem(SKIP_STORAGE_KEY, "1");
      onComplete();
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem(SKIP_STORAGE_KEY, "1");
    setExiting(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] px-6"
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: FADE_OUT_MS / 1000, ease: "easeInOut" }}
      onAnimationComplete={handleExitComplete}
    >
      <div className="max-w-2xl mx-auto text-center min-h-[220px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === "welcome" && (
            <motion.p
              key="welcome"
              className="text-white/90 text-2xl sm:text-3xl md:text-4xl tracking-wide"
              {...slideUp}
            >
              {t.intro.welcome}
            </motion.p>
          )}

          {phase === "iam" && (
            <motion.p
              key="iam"
              className="text-white/70 text-lg sm:text-xl tracking-wide"
              {...slideUp}
            >
              {t.intro.iam}
            </motion.p>
          )}

          {phase === "name" && (
            <motion.div
              key="name"
              className="overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1
                className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.name}
              </motion.h1>
            </motion.div>
          )}

          {phase === "role" && (
            <motion.p
              key="role"
              className="text-emerald-400/95 text-xl sm:text-2xl md:text-3xl tracking-[0.2em] uppercase font-medium"
              {...slideUp}
            >
              {t.hero.role}
            </motion.p>
          )}

          {phase === "focus" && (
            <motion.p
              key="focus"
              className="text-white/85 text-base sm:text-lg md:text-xl"
              {...slideUp}
            >
              {t.intro.focus}
            </motion.p>
          )}

          {phase === "where" && (
            <motion.p
              key="where"
              className="text-white/70 text-sm sm:text-base max-w-md"
              {...slideUp}
            >
              {t.intro.where}
            </motion.p>
          )}

          {phase === "mission" && (
            <motion.p
              key="mission"
              className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
              {...slideUp}
            >
              {t.intro.mission}
            </motion.p>
          )}

          {phase === "enter" && (
            <motion.p
              key="enter"
              className="text-emerald-400/90 text-sm sm:text-base tracking-[0.3em] uppercase font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {t.intro.enter}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1">
        {phases.map((_, i) => (
          <motion.span
            key={i}
            className="h-0.5 w-6 rounded-full bg-white/25 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phaseIndex >= i ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ transformOrigin: "left" }}
          />
        ))}
      </div>

      <motion.button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest hover:text-white/70 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Skip
      </motion.button>
    </motion.div>
  );
}
