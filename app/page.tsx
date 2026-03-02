"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import HeroNew from "./components/HeroNew";
import AnimatedBackground from "./components/AnimatedBackground";
import IntroOverlay from "./components/IntroOverlay";
import SectionReveal from "./components/SectionReveal";
import WhatIDo from "./components/WhatIDo";
import TechStack from "./components/TechStack";
import Work from "./components/Work";
import Find from "./components/Find";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function HomePage() {
  const [introVisible, setIntroVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("portfolio-intro-seen")) {
      setIntroVisible(false);
    }
  }, []);

  const showIntro = mounted && introVisible;

  return (
    <>
      {showIntro && (
        <IntroOverlay onComplete={() => setIntroVisible(false)} />
      )}

      <main
        className={`text-white min-h-screen relative transition-opacity duration-300 ${
          showIntro ? "overflow-hidden h-screen" : ""
        }`}
      >
        <AnimatedBackground />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: introVisible ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Header />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: introVisible ? 0 : 1,
              y: introVisible ? 16 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroNew />
          </motion.div>

          <SectionReveal>
            <WhatIDo />
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <TechStack />
          </SectionReveal>
          <SectionReveal delay={0.06}>
            <Work />
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <Find />
          </SectionReveal>
          <SectionReveal delay={0.06}>
            <About />
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <Contact />
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <Footer />
          </SectionReveal>
        </motion.div>
      </main>
    </>
  );
}
