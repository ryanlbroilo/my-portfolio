"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type ModalType = "projects" | "about" | "contact";

interface RetroWindowProps {
  activeModal: ModalType;
  onClose: () => void;
}

const floatAnim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(2px); }
  100% { transform: translateY(0px); }
`;

const WindowContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 800px;
  background-color: #c0c0c0;
  border: 2px solid #000080;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 20;
  font-family: "Amiga Normal", monospace;
`;

const WindowHeader = styled.div`
  background-color: #000080;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

const WindowTitle = styled.div`
  font-weight: bold;
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border: 1px solid #fff;
  border-radius: 2px;
  cursor: pointer;
  animation: ${floatAnim} 2s infinite;
`;

const WindowContent = styled.div`
  padding: 15px;
  color: #000;
  max-height: 400px;
  overflow-y: auto;
`;

const ProjectItem = styled.div`
  margin-bottom: 15px;
  a {
    font-weight: bold;
    color: #000080;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    margin: 2px 0 5px 0;
    font-size: 0.9em;
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  background-color: #000080;
  color: #fff;
  font-size: 11px;
  padding: 3px 6px;
  border: 1px solid #fff;
  border-radius: 3px;
  font-family: "Amiga Normal", monospace;
  box-shadow: 2px 2px 0px #000;
`;

const SobreMimContent = styled.div`
  line-height: 1.5;
`;

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ activeModal, onClose }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    if (activeModal === "projects") {
      fetch("https://api.github.com/users/ryanlbroilo/repos")
        .then((res) => res.json())
        .then((data: GitHubRepo[]) => {
          const filtered = data.map((repo) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
          }));
          setRepos(filtered);
        })
        .catch((err) => console.error(err));
    }
  }, [activeModal]);

  const windowTitles: Record<ModalType, string> = {
    projects: "Projetos",
    about: "Sobre mim",
    contact: "Contato",
  };
  
  const extractTags = (desc: string | null): string[] => {
    if (!desc) return [];
    const lower = desc.toLowerCase();
    const tags: string[] = [];
    if (lower.includes("react")) tags.push("React");
    if (lower.includes("next")) tags.push("Next.js");
    if (lower.includes("firebase")) tags.push("Firebase");
    if (lower.includes("node")) tags.push("Node.js");
    if (lower.includes("typescript")) tags.push("TypeScript");
    if (lower.includes("javascript")) tags.push("JavaScript");
    if (lower.includes("css")) tags.push("CSS");
    if (lower.includes("html")) tags.push("HTML");
    return tags;
  };

  return (
    <WindowContainer>
      <WindowHeader>
        <WindowTitle>{windowTitles[activeModal]}</WindowTitle>
        <WindowButtons>
          <Button color="red" onClick={onClose} />
          <Button color="yellow" />
          <Button color="green" />
        </WindowButtons>
      </WindowHeader>
      <WindowContent>
        {activeModal === "projects" &&
          (repos.length > 0 ? (
            repos.map((repo) => (
              <ProjectItem key={repo.name}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                <p>{repo.description || "Sem descrição"}</p>
                <TechTags>
                  {extractTags(repo.description).map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                  ))}
                </TechTags>
              </ProjectItem>
            ))
          ) : (
            <p>Carregando repositórios...</p>
          ))}

        {activeModal === "about" && (
          <SobreMimContent>
            <p>
              Sou estudante de Análise e Desenvolvimento de Sistemas e atuo como
              Analista de TI na Kem Distribuidora.
            </p>
            <p>
              Entusiasta em desenvolvimento Frontend e Cybersegurança,
              apaixonado por interfaces interativas e design responsivo.
            </p>
            <p>
              Busco constantemente aprimorar minhas habilidades em React,
              Next.js e tecnologias web modernas.
            </p>
          </SobreMimContent>
        )}

        {activeModal === "contact" && (
          <div>
            <p>
              Email:{" "}
              <a href="mailto:ryanlizzebroilo@gmail.com">
                ryanlizzebroilo@gmail.com
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/ryanlbroilo"
                target="_blank"
                rel="noreferrer"
              >
                @ryanlbroilo
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://br.linkedin.com/in/ryan-lizze-broilo-737102209"
                target="_blank"
                rel="noreferrer"
              >
                Ryan Lizze Broilo
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/ryanlbroilo"
                target="_blank"
                rel="noreferrer"
              >
                ryanlbroilo
              </a>
            </p>
          </div>
        )}
      </WindowContent>
    </WindowContainer>
  );
};

export default RetroWindow;
