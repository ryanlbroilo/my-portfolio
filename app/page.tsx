"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "pt";

const copy = {
  en: {
    role: "Full-stack software engineer",
    thesis: "Full-stack, end to end.",
    systems: "Product / Identity / Payments / Data / Infrastructure",
    viewWork: "View work",
    talk: "Let's talk",
    statement: "I build the whole path from idea to production.",
    statementBody:
      "Interfaces are only the visible layer. I design APIs, data models, authentication, payment flows, tests, infrastructure and deployment so the product works as one system.",
    proof: "Production work across fintech, SaaS, telecom, identity and AI.",
    featured: "EvaHub",
    featuredLine: "AI specialists that work with Brazilian teams.",
    featuredBody:
      "A no-code platform where companies create specialists grounded in their own documents, publish them to the web, WhatsApp and APIs, monitor conversations live and hand complex cases to people.",
    productWork: "Product engineering at Evoris Labs",
    visit: "Visit EvaHub",
    dashboardCaption: "Live product interface · official asset · demo data shown",
    evaHint: "Move across the capabilities to scan the product",
    projectVisual: "Product interface",
    layers: ["Knowledge", "Channels", "Human handoff", "Auditability"],
    facts: ["5 ready Brazilian personas", "24/7 with the team", "LGPD-ready and auditable"],
    selected: "Selected systems",
    selectedBody:
      "Different products, one recurring responsibility: make every layer hold under production pressure.",
    experience: "Experience",
    experienceBody: "From document operations at scale to building the systems behind the business.",
    contact: "Build something that has to work?",
    contactBody: "I'm open to international full-stack software engineering roles and ambitious product teams.",
    email: "Start a conversation",
    cv: "Download CV",
    current: "Present",
  },
  pt: {
    role: "Engenheiro de software full-stack",
    thesis: "Full-stack, de ponta a ponta.",
    systems: "Produto / Identidade / Pagamentos / Dados / Infraestrutura",
    viewWork: "Ver projetos",
    talk: "Vamos conversar",
    statement: "Eu construo o caminho inteiro da ideia até produção.",
    statementBody:
      "Interfaces são apenas a camada visível. Eu projeto APIs, modelos de dados, autenticação, fluxos de pagamento, testes, infraestrutura e deploy para o produto funcionar como um sistema só.",
    proof: "Sistemas em produção para fintech, SaaS, telecom, identidade e IA.",
    featured: "EvaHub",
    featuredLine: "Especialistas de IA que trabalham com times brasileiros.",
    featuredBody:
      "Uma plataforma no-code onde empresas criam especialistas a partir dos próprios documentos, publicam no site, WhatsApp e APIs, acompanham conversas ao vivo e passam casos complexos para pessoas.",
    productWork: "Engenharia de produto na Evoris Labs",
    visit: "Visitar EvaHub",
    dashboardCaption: "Interface real do produto · asset oficial · dados demonstrativos",
    evaHint: "Passe pelas capacidades para explorar o produto",
    projectVisual: "Interface do produto",
    layers: ["Conhecimento", "Canais", "Handoff humano", "Auditabilidade"],
    facts: ["5 personas brasileiras prontas", "24/7 com o time", "LGPD e histórico auditável"],
    selected: "Sistemas selecionados",
    selectedBody:
      "Produtos diferentes, uma responsabilidade recorrente: fazer cada camada aguentar a pressão de produção.",
    experience: "Experiência",
    experienceBody: "Da operação documental em escala aos sistemas que sustentam o negócio.",
    contact: "Vamos construir algo que precisa funcionar?",
    contactBody: "Estou aberto a oportunidades internacionais em engenharia de software full-stack e times de produto ambiciosos.",
    email: "Começar uma conversa",
    cv: "Baixar CV",
    current: "Atual",
  },
} as const;

const projects = [
  {
    name: "Adaptare Pay",
    domain: "Fintech / Payments",
    color: "red",
    image: "/images/projects/adaptare-pay/dashboard.png",
    imageAlt: {
      en: "Adaptare Pay merchant dashboard with balance, payment links and transaction tools",
      pt: "Dashboard do Adaptare Pay com saldo, links de pagamento e ferramentas de transação",
    },
    summary: {
      en: "Payment orchestration with PIX, split, settlement, financial ledger, mTLS and signed webhooks.",
      pt: "Orquestração de pagamentos com PIX, split, liquidação, ledger financeiro, mTLS e webhooks assinados.",
    },
    stack: "PostgreSQL · Docker · Transactional systems",
    flow: ["PIX", "Ledger", "Settlement"],
  },
  {
    name: "Evoris ID",
    domain: "Identity / Security",
    color: "blue",
    image: "/images/projects/evoris-id/overview.png",
    imageAlt: {
      en: "Evoris ID sign-in experience beside the unified Evoris account dashboard",
      pt: "Experiência de login do Evoris ID ao lado do painel unificado da conta Evoris",
    },
    summary: {
      en: "Central identity platform with WebAuthn, MFA, JOSE, SSO and role-based access control.",
      pt: "Plataforma central de identidade com WebAuthn, MFA, JOSE, SSO e controle de acesso por papéis.",
    },
    stack: "Fastify · PostgreSQL · Redis",
    flow: ["WebAuthn", "JOSE", "SSO"],
  },
  {
    name: "AdapTare ERP",
    domain: "Enterprise / Operations",
    color: "yellow",
    image: "/images/projects/adaptare-erp/dashboard.png",
    imageAlt: {
      en: "AdapTare ERP operations dashboard with cash flow, sales and business controls",
      pt: "Dashboard operacional do AdapTare ERP com fluxo de caixa, vendas e controles do negócio",
    },
    summary: {
      en: "Enterprise ERP with layered architecture for business, fiscal and operational workflows.",
      pt: "ERP corporativo com arquitetura em camadas para fluxos empresariais, fiscais e operacionais.",
    },
    stack: ".NET · ASP.NET Core · SQL",
    flow: ["Business", "Fiscal", "Operations"],
  },
  {
    name: "OffCard",
    domain: "Transactional SaaS",
    color: "paper",
    image: "/images/projects/offcard/marketplace.png",
    imageAlt: {
      en: "OffCard dark marketplace interface with cashback offers and product cards",
      pt: "Interface escura do marketplace OffCard com ofertas de cashback e cards de produtos",
    },
    summary: {
      en: "Transactional SaaS with payments, idempotency, S3 storage, CI and automated tests.",
      pt: "SaaS transacional com pagamentos, idempotência, storage S3, CI e testes automatizados.",
    },
    stack: "React · NestJS · Prisma · PostgreSQL",
    flow: ["Payments", "S3", "CI"],
  },
] as const;

const experience = [
  {
    company: "Evoris Labs",
    role: "Co-Founder & Full-Stack Software Engineer",
    dates: "May 2025 — Present",
    datesPt: "mai/2025 — atual",
    note: {
      en: "Production systems across fintech, SaaS, telecom, identity and AI — from interface to deployment.",
      pt: "Sistemas em produção para fintech, SaaS, telecom, identidade e IA — da interface ao deploy.",
    },
  },
  {
    company: "KEM Distribuidora de Alimentos",
    role: "IT Analyst",
    rolePt: "Analista de TI",
    dates: "Sep 2025 — Apr 2026",
    datesPt: "set/2025 — abr/2026",
    note: {
      en: "Internal web applications for checklists, refueling and maintenance, plus infrastructure and ERP support.",
      pt: "Aplicações internas para checklists, abastecimentos e manutenção, além de infraestrutura e suporte ao ERP.",
    },
  },
  {
    company: "CAF",
    role: "Backoffice Analyst",
    rolePt: "Analista de Backoffice",
    dates: "Jun 2022 — Sep 2023",
    datesPt: "jun/2022 — set/2023",
    note: {
      en: "Validated 15,000+ documents per month and contributed to the OCR pipeline used by the company's AI.",
      pt: "Validação de mais de 15.000 documentos por mês e contribuição para o OCR utilizado pela IA da empresa.",
    },
  },
] as const;

function RegisteredWord({ children, className }: { children: string; className: string }) {
  return (
    <span className={`registered-word ${className}`} aria-hidden="true">
      <span className="ink-layer ink-layer--yellow">{children}</span>
      <span className="ink-layer ink-layer--blue">{children}</span>
      <span className="ink-layer ink-layer--red">{children}</span>
      <span className="ink-layer ink-layer--key">{children}</span>
      <span className="ink-layer ink-layer--texture">{children}</span>
    </span>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeProject, setActiveProject] = useState(0);
  const [activeEvaLayer, setActiveEvaLayer] = useState(0);
  const t = copy[language];
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const evaRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: evaProgress } = useScroll({ target: evaRef, offset: ["start end", "end start"] });
  const { scrollYProgress: experienceProgress } = useScroll({ target: experienceRef, offset: ["start 75%", "end 35%"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, -90]);
  const heroScale = useTransform(heroProgress, [0, 0.9], [1, 0.94]);
  const dashboardRotate = useTransform(evaProgress, [0, 0.45, 1], [8, 0, -3]);
  const dashboardY = useTransform(evaProgress, [0, 1], [70, -55]);
  const contactX = useTransform(pageProgress, [0.78, 1], [-90, 0]);
  const pressWords = language === "pt"
    ? ["PRODUTO", "IDENTIDADE", "PAGAMENTOS", "DADOS", "INFRAESTRUTURA"]
    : ["PRODUCT", "IDENTITY", "PAYMENTS", "DATA", "INFRASTRUCTURE"];

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const registerInk = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
    event.currentTarget.style.setProperty("--cursor-x", `${((x + 0.5) * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty("--cursor-y", `${((y + 0.5) * 100).toFixed(2)}%`);
  }, []);

  const cvHref = useMemo(
    () => (language === "en" ? "/cv/ryan-broilo-cv-en.pdf" : "/cv/ryan-broilo-cv-pt.pdf"),
    [language],
  );

  return (
    <main>
      <section
        ref={heroRef}
        className="hero-frame"
        aria-labelledby="hero-title"
        onPointerMove={registerInk}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--pointer-x", "0");
          event.currentTarget.style.setProperty("--pointer-y", "0");
          event.currentTarget.style.setProperty("--cursor-x", "50%");
          event.currentTarget.style.setProperty("--cursor-y", "50%");
        }}
      >
        <motion.div className="press-spine" style={reduceMotion ? undefined : { scaleY: pageProgress }} aria-hidden="true" />
        <div className="hero-pressure" aria-hidden="true" />
        <div className="registration-corner registration-corner--top" aria-hidden="true" />
        <div className="registration-corner registration-corner--bottom" aria-hidden="true" />

        <header className="hero-masthead">
          <p>{t.role}</p>
          <div className="masthead-rule" aria-hidden="true" />
          <div className="locale" aria-label="Language">
            {(["en", "pt"] as const).map((item, index) => (
              <span className="locale-option" key={item}>
                {index > 0 && <span>/</span>}
                <button
                  type="button"
                  aria-pressed={language === item}
                  onClick={() => setLanguage(item)}
                >
                  {item.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
        </header>

        <motion.h1
          id="hero-title"
          className="hero-name"
          aria-label="Ryan Broilo"
          style={reduceMotion ? undefined : { y: heroY, scale: heroScale }}
        >
          <RegisteredWord className="registered-word--ryan">RYAN</RegisteredWord>
          <RegisteredWord className="registered-word--broilo">BROILO</RegisteredWord>
        </motion.h1>

        <div className="hero-thesis">
          <p>{t.thesis}</p>
          <span>{t.systems}</span>
        </div>

        <nav className="hero-actions" aria-label="Primary navigation">
          <a className="action action--filled" href="#work">
            {t.viewWork}<ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a className="action action--outline" href="mailto:ryanlizzebroilo@gmail.com">
            {t.talk}<ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>

        <div className="process-swatches" aria-label="Chromatic Stack Press process colors">
          <span className="swatch swatch--red" />
          <span className="swatch swatch--blue" />
          <span className="swatch swatch--yellow" />
          <span className="swatch swatch--key" />
        </div>
      </section>

      <div className="press-feed" aria-hidden="true">
        <div className="press-feed-track">
          {[...pressWords, ...pressWords].map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}
        </div>
      </div>

      <section id="statement" className="statement-section">
        <div className="statement-mark" aria-hidden="true"><span>FRONT</span><span>BACK</span><span>FULL.</span></div>
        <div className="statement-copy">
          <h2>{t.statement}</h2>
          <p>{t.statementBody}</p>
          <span>{t.proof}</span>
        </div>
      </section>

      <section ref={evaRef} id="work" className="eva-section" aria-labelledby="eva-heading">
        <div className="eva-type" aria-hidden="true">
          <span>EVA</span>
          <span>HUB</span>
        </div>

        <div className="eva-copy">
          <h2 id="eva-heading">{t.featuredLine}</h2>
          <p className="eva-description">{t.featuredBody}</p>
          <a href="https://evorislabs.com.br/br/produtos/eva-hub" target="_blank" rel="noreferrer">
            {t.visit}<ArrowUpRight size={18} />
          </a>
        </div>

        <motion.div
          className="eva-dashboard"
          style={reduceMotion ? undefined : { rotate: dashboardRotate, y: dashboardY }}
          initial={false}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="dashboard-registration dashboard-registration--red" />
          <div className="dashboard-registration dashboard-registration--blue" />
          <Image
            src="/images/projects/eva-hub/dashboard.webp"
            alt={language === "pt" ? "Painel EvaHub com assistentes de IA e uso da plataforma" : "EvaHub dashboard showing AI assistants and usage"}
            width={1080}
            height={548}
            priority={false}
          />
          <div className="eva-live-mark" aria-hidden="true">
            <span /> {language === "pt" ? "PRODUTO ATIVO" : "LIVE PRODUCT"}
          </div>
          <motion.div
            key={activeEvaLayer}
            className={`eva-scan eva-scan--${activeEvaLayer}`}
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0.35 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />
          <span>{t.dashboardCaption}</span>
        </motion.div>

        <div className="eva-layers" aria-label="EvaHub capabilities">
          {t.layers.map((layer, index) => (
            <motion.button
              type="button"
              key={layer}
              className={activeEvaLayer === index ? "is-active" : ""}
              aria-pressed={activeEvaLayer === index}
              onPointerEnter={() => setActiveEvaLayer(index)}
              onFocus={() => setActiveEvaLayer(index)}
              onClick={() => setActiveEvaLayer(index)}
              initial={false}
              animate={reduceMotion ? undefined : { x: activeEvaLayer === index ? 8 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {layer}
            </motion.button>
          ))}
          <span className="eva-hint">{t.evaHint}</span>
        </div>

        <div className="eva-facts">
          {t.facts.map((fact) => <p key={fact}>{fact}</p>)}
        </div>
      </section>

      <section className="projects-section" aria-labelledby="projects-heading">
        <header className="section-heading">
          <h2 id="projects-heading">{t.selected}</h2>
          <p>{t.selectedBody}</p>
        </header>

        <div className="project-press">
          <div className="project-index" role="tablist" aria-label={t.selected}>
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                role="tab"
                aria-selected={activeProject === index}
                aria-controls="project-detail"
                className={`project-tab project-tab--${project.color}`}
                onClick={() => setActiveProject(index)}
              >
                <span>{project.name}</span>
                <small>{language === "pt" ? ["Fintech / Pagamentos", "Identidade / Segurança", "Empresas / Operações", "SaaS transacional"][index] : project.domain}</small>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              id="project-detail"
              key={projects[activeProject].name}
              role="tabpanel"
              className={`project-detail project-detail--${projects[activeProject].color}`}
              initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={reduceMotion ? undefined : { clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-visual" aria-label={t.projectVisual}>
                <span className="project-visual-label">{t.projectVisual}</span>
                <motion.div
                  className="project-shot"
                  initial={reduceMotion ? false : { scale: 1.035, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ scale: 1, clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: reduceMotion ? 0 : 0.68, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="project-shot-register project-shot-register--red" aria-hidden="true" />
                  <span className="project-shot-register project-shot-register--blue" aria-hidden="true" />
                  <Image
                    src={projects[activeProject].image}
                    alt={projects[activeProject].imageAlt[language]}
                    fill
                    sizes="(max-width: 620px) 100vw, 58vw"
                  />
                </motion.div>
                <div className="project-flow" aria-hidden="true">
                  {projects[activeProject].flow.map((node, index) => (
                    <span key={node} className={`project-node project-node--${index}`}>{node}</span>
                  ))}
                  <motion.i
                    className="project-pulse"
                    initial={reduceMotion ? false : { x: "-20%" }}
                    animate={reduceMotion ? undefined : { x: "320%" }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
              <h3>{projects[activeProject].name}</h3>
              <div className="project-copy">
                <p>{projects[activeProject].summary[language]}</p>
                <span>{language === "pt" && activeProject === 0 ? "PostgreSQL · Docker · Sistemas transacionais" : projects[activeProject].stack}</span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section ref={experienceRef} className="experience-section" aria-labelledby="experience-heading">
        <header className="section-heading section-heading--light">
          <h2 id="experience-heading">{t.experience}</h2>
          <p>{t.experienceBody}</p>
        </header>

        <div className="experience-list">
          <motion.div className="timeline-ink" style={reduceMotion ? undefined : { scaleY: experienceProgress }} aria-hidden="true" />
          {experience.map((item) => (
            <motion.article
              key={item.company}
              initial={false}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{language === "en" ? item.dates : item.datesPt}</span>
              <h3>{item.company}</h3>
              <p className="experience-role">
                {language === "pt" ? ("rolePt" in item ? item.rolePt : "Cofundador e engenheiro de software full-stack") : item.role}
              </p>
              <p>{item.note[language]}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="contact-section">
        <motion.div className="contact-type" style={reduceMotion ? undefined : { x: contactX }} aria-hidden="true">LET&apos;S PRINT</motion.div>
        <div className="contact-content">
          <h2>{t.contact}</h2>
          <p>{t.contactBody}</p>
          <div className="contact-actions">
            <a href="mailto:ryanlizzebroilo@gmail.com"><Mail size={20} />{t.email}</a>
            <a href={cvHref} download><ArrowDown size={20} />{t.cv}</a>
          </div>
          <nav aria-label="Social links">
            <a href="https://linkedin.com/in/ryanlbroilo" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href="https://github.com/ryanlbroilo" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          </nav>
        </div>
        <div className="contact-registration" aria-hidden="true">
          <span /> <span /> <span /> <span />
        </div>
      </footer>
    </main>
  );
}
