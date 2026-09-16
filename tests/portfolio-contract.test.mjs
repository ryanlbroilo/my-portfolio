import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pagePath = new URL("../app/page.tsx", import.meta.url);

const cases = [
  {
    name: "Adaptare Pay",
    image: "/images/projects/adaptare-pay/dashboard.png",
    en: "Adaptare Pay merchant dashboard with balance, payment links and transaction tools",
    pt: "Dashboard do Adaptare Pay com saldo, links de pagamento e ferramentas de transação",
  },
  {
    name: "Evoris ID",
    image: "/images/projects/evoris-id/overview.png",
    en: "Evoris ID sign-in experience beside the unified Evoris account dashboard",
    pt: "Experiência de login do Evoris ID ao lado do painel unificado da conta Evoris",
  },
  {
    name: "AdapTare ERP",
    image: "/images/projects/adaptare-erp/dashboard.png",
    en: "AdapTare ERP operations dashboard with cash flow, sales and business controls",
    pt: "Dashboard operacional do AdapTare ERP com fluxo de caixa, vendas e controles do negócio",
  },
  {
    name: "OffCard",
    image: "/images/projects/offcard/marketplace.png",
    en: "OffCard dark marketplace interface with cashback offers and product cards",
    pt: "Interface escura do marketplace OffCard com ofertas de cashback e cards de produtos",
  },
];

test("the four project cases keep their image and bilingual accessibility contract", async () => {
  const source = await readFile(pagePath, "utf8");

  for (const project of cases) {
    assert.match(source, new RegExp(`name: ["']${project.name}["']`));
    assert.ok(source.includes(`image: "${project.image}"`));
    assert.ok(source.includes(`en: "${project.en}"`));
    assert.ok(source.includes(`pt: "${project.pt}"`));
    await access(`${root}/public${project.image}`);
  }
});

test("the page exposes English and Portuguese controls and copy", async () => {
  const source = await readFile(pagePath, "utf8");

  assert.ok(source.includes('type Language = "en" | "pt"'));
  assert.ok(source.includes('(["en", "pt"] as const)'));
  assert.ok(source.includes('document.documentElement.lang = language === "pt" ? "pt-BR" : "en"'));
  assert.ok(source.includes('projectVisual: "Product interface"'));
  assert.ok(source.includes('projectVisual: "Interface do produto"'));
});
