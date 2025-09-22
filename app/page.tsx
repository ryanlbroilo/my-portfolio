"use client";

import React, { useState } from "react";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import RetroWindow from "./components/RetroWindow";

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<"projects" | "about" | "contact" | null>(null);

  return (
    <main>
      <Hero />
      <Portfolio onIconClick={(modal) => setActiveModal(modal)} />
      {activeModal && (
        <RetroWindow
          activeModal={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </main>
  );
}
