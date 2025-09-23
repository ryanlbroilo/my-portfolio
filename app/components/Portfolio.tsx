"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

// --- ANIMAÇÃO FLUTUANTE ---
const floatAnim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(8px); }
  100% { transform: translateY(0px); }
`;

// --- CONTAINER ---
const IconsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 1rem;

  /* Modo "desktop retrô" */
  @media (min-width: 1024px) {
    display: block;
  }
`;

interface IconProps {
  top?: string;
  left?: string;
}

const IconContainer = styled.div<IconProps>`
  position: absolute;
  top: ${({ top }) => top || "0"};
  left: ${({ left }) => left || "0"};
  width: 100px;
  height: 90px;
  background-color: #c0c0c0;
  border: 2px solid #000080;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${floatAnim} 2.5s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 0 15px #00ffff;
  }

  /* Mobile/Tablet override */
  @media (max-width: 1023px) {
    position: static;
  }
`;

const IconImage = styled.img`
  width: 42px;
  height: 42px;
  margin-bottom: 5px;
`;

const IconLabel = styled.div`
  font-size: 12px;
  color: #000080;
  font-weight: bold;
  text-align: center;
  font-family: "Amiga Normal", monospace;
`;

export type ModalType = "projects" | "about" | "contact";

interface PortfolioProps {
  onIconClick: (type: ModalType) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onIconClick }) => {
  const icons: { src: string; label: string; modal: ModalType; top: string; left: string }[] = [
    { src: "/icons/projects.png", label: "Projetos", modal: "projects", top: "25%", left: "5%" },
    { src: "/icons/about.png", label: "Sobre mim", modal: "about", top: "60%", left: "10%" },
    { src: "/icons/contact.png", label: "Contato", modal: "contact", top: "40%", left: "85%" },
  ];

  return (
    <IconsWrapper>
      {icons.map((icon, idx) => (
        <IconContainer key={idx} top={icon.top} left={icon.left} onClick={() => onIconClick(icon.modal)}>
          <IconImage src={icon.src} alt={icon.label} />
          <IconLabel>{icon.label}</IconLabel>
        </IconContainer>
      ))}
    </IconsWrapper>
  );
};

export default Portfolio;
