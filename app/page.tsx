"use client";

import React, { useState } from "react";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import RetroWindow from "./components/RetroWindow";
import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: #000;

  display: flex;
  flex-direction: column;

  /* Mobile-first*/
  @media (min-width: 1024px) {
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<
    "projects" | "about" | "contact" | null
  >(null);

  return (
    <Main>
      <Hero />
      <Portfolio onIconClick={(modal) => setActiveModal(modal)} />
      {activeModal && (
        <RetroWindow
          activeModal={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </Main>
  );
}
