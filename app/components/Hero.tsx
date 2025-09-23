"use client";

import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

const topLines = [
  "Luzes apagadas... Pise fundo!",
  "Velocidade é minha linguagem favorita.",
  "Bem-vindo à pista!",
  "Hora de acelerar meu portfolio.",
];

const typewriterTexts = [
  "Desenvolvedor Front End",
  "Entusiasta em Cybersegurança",
  "Analista de TI",
];

// --- CONTAINERS ---
const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  font-family: "Amiga Normal", monospace;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  text-align: center;
  z-index: 10;
`;

const CarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// --- SPEED LINES ---
interface SpeedLineProps {
  top: number;
  width: number;
  speed: number;
  color: string;
  blur: number;
  opacity: number;
}

const SpeedLineDiv = styled.div<SpeedLineProps>`
  position: absolute;
  height: 2px;
  width: ${({ width }) => width}px;
  background: ${({ color }) => color};
  top: ${({ top }) => top}px;
  left: 0;
  opacity: ${({ opacity }) => opacity};
  filter: blur(${({ blur }) => blur}px);
  box-shadow: 0 0 6px ${({ color }) => color};
  z-index: 2;

  ${({ speed }) => css`
    animation: ${keyframes`
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(${window.innerWidth + 100}px); opacity: 0; }
    `} ${speed}s linear forwards;
  `}
`;

// --- TEXTO ---
const GradientText = styled.h2`
  color: #fff;
  font-size: 3em;
  font-weight: bold;
  margin: 0.5em 0;
`;

const TypewriterText = styled.div`
  color: #fff;
  font-size: 1.5em;
  margin-top: 0.3em;
  white-space: nowrap;
  overflow: hidden;
`;

const TopLineText = styled.div`
  font-size: 1.5em;
  color: #fff;
  margin-bottom: 0.5em;
`;

// --- LINHA RGB + CARRO ---
const rgbAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const RoadContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px; /* altura da "pista" */
  display: flex;
  align-items: flex-end;
  pointer-events: none;
`;

const RGBLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(
    270deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet,
    red
  );
  background-size: 200% 200%;
  animation: ${rgbAnim} 5s linear infinite;
  z-index: 5;
`;

const CarImg = styled.img<{ left: number }>`
  position: absolute;
  bottom: 6px; /* sempre colado em cima da faixa */
  width: 250px;
  height: auto;
  z-index: 10;
  left: ${({ left }) => left}px;
  transform: translateX(-50%);
  filter: drop-shadow(0 5px 20px rgba(255, 255, 255, 0.6));
`;

// --- HERO COMPONENT ---
const Hero: React.FC = () => {
  const [lines, setLines] = useState<SpeedLineProps[]>([]);
  const [topLine, setTopLine] = useState("");
  const [currentText, setCurrentText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [carLeft, setCarLeft] = useState(0);

  useEffect(() => setCarLeft(window.innerWidth / 2), []);

  // Typewriter
  useEffect(() => {
    let i = 0;
    let textPos = 0;
    let currentString = typewriterTexts[i];
    const speed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;

    function type() {
      setCurrentText(currentString.substring(0, textPos) + "_");
      if (textPos++ === currentString.length) setTimeout(deleteText, waitTime);
      else setTimeout(type, speed);
    }

    function deleteText() {
      setCurrentText(currentString.substring(0, textPos) + "_");
      if (textPos-- === 0) {
        i = (i + 1) % typewriterTexts.length;
        currentString = typewriterTexts[i];
        setTimeout(type, speed);
      } else setTimeout(deleteText, deleteSpeed);
    }

    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
    type();
  }, []);

  // Speed lines
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const colors = ["#fff", "#ff6bff", "#66faff"];
        const newLine: SpeedLineProps = {
          top: containerHeight * 0.65 + Math.random() * containerHeight * 0.25,
          width: 10 + Math.random() * 20,
          speed: 0.6 + Math.random() * 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          blur: 1 + Math.random() * 2,
          opacity: 0.5 + Math.random() * 0.5,
        };
        setLines((prev) => [...prev, newLine]);
        setTimeout(
          () => setLines((prev) => prev.filter((l) => l !== newLine)),
          newLine.speed * 1000
        );
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Carro horizontal
  useEffect(() => {
    const carSpeed = 2;
    const interval = setInterval(() => {
      setCarLeft((prev) => {
        if (prev < -150) return window.innerWidth + 150;
        return prev - carSpeed;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <TextContainer>
        <TopLineText>{topLine}</TopLineText>
        <GradientText>Eu sou Ryan</GradientText>
        <TypewriterText>{currentText}</TypewriterText>
      </TextContainer>

      <CarContainer ref={containerRef}>
        <RoadContainer>
          <CarImg src="/images/car2.gif" alt="Car" left={carLeft} />
          <RGBLine />
        </RoadContainer>

        {lines.map((line, idx) => (
          <SpeedLineDiv
            key={idx}
            top={line.top}
            width={line.width}
            speed={line.speed}
            color={line.color}
            blur={line.blur}
            opacity={line.opacity}
          />
        ))}
      </CarContainer>
    </HeroContainer>
  );
};

export default Hero;
