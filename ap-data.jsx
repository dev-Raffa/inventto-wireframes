/* Inventto — Protótipo · Adicionar produtos ao catálogo · 4 abordagens.
   Dados + modelo de rascunho + validação/status. Carregado PRIMEIRO — declara os
   hooks do React uma única vez no escopo global (os demais scripts só usam). */

const { useState, useMemo, useEffect, useRef, Fragment } = React;

/* ── catálogo de produtos disponíveis para adicionar ────────────────
   basePriceCents = preço herdado do cadastro (Produtos). null = cadastro sem
   preço → item nasce pendente (nunca com "erro"). Variantes têm preço próprio. */
const PRODUCTS = [
  { id: "vestido-linho", name: "Vestido Linho Areia", sku: "VL-AREIA", basePriceCents: 18900, attrs: ["Areia"] },
  { id: "camisa-social", name: "Camisa Social Algodão", sku: "CS-ALG", variants: [
    { id: "p", name: "P · Branco", basePriceCents: 12900 },
    { id: "m", name: "M · Branco", basePriceCents: 12900 },
    { id: "g", name: "G · Branco", basePriceCents: 13900 },
    { id: "gg", name: "GG · Branco", basePriceCents: 13900 },
  ] },
  { id: "calca-alf", name: "Calça Alfaiataria", sku: "CA-ALF", basePriceCents: 21500, attrs: ["Preto"] },
  { id: "bolsa-tote", name: "Bolsa Tote Lona", sku: "BT-LONA", basePriceCents: 9500, attrs: ["Cru"] },
  { id: "lenco-seda", name: "Lenço de Seda Estampado", sku: "LS-EST", basePriceCents: 7900, attrs: ["Floral"] },
  { id: "vestido-floral", name: "Vestido Floral Midi", sku: "VF-MIDI", variants: [
    { id: "p", name: "P", basePriceCents: 24900 },
    { id: "m", name: "M", basePriceCents: 24900 },
    { id: "g", name: "G", basePriceCents: 24900 },
    { id: "gg", name: "GG", basePriceCents: 26900 },
  ] },
  { id: "cinto-couro", name: "Cinto de Couro", sku: "CT-COURO", basePriceCents: null, attrs: ["Caramelo"] },
  { id: "tenis-camurca", name: "Tênis Casual Camurça", sku: "TN-CAM", variants: [
    { id: "36", name: "36", basePriceCents: 31900 },
    { id: "37", name: "37", basePriceCents: 31900 },
    { id: "38", name: "38", basePriceCents: 31900 },
    { id: "39", name: "39", basePriceCents: 31900 },
    { id: "40", name: "40", basePriceCents: 33900 },
  ] },
];

/* itens já no catálogo (semente da tela base) */
const SEED_ITEMS = [
  { id: "blazer-cropped", name: "Blazer Cropped Alfaiataria", sku: "BZ-CROP", priceCents: 28900, origCents: null, meta: "Tam. 40 · Preto" },
];

const isVariantProduct = (p) => Array.isArray(p.variants) && p.variants.length > 0;

/* ── formatação de dinheiro (centavos ⇄ BRL pt-BR) ─────────────────── */
function centsToBRL(c) {
  if (c === null || c === undefined || c === "") return "";
  return (c / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function digitsToCents(str) {
  const d = String(str).replace(/\D/g, "");
  return d === "" ? null : parseInt(d, 10);
}

/* ── rascunho de configuração de um produto ────────────────────────── */
function makeDraft(p) {
  if (isVariantProduct(p)) {
    return {
      id: p.id,
      priceMode: "single",            // 'single' | 'perVariant'
      price: null,                    // preço único (modo single) — herda no 1º toque
      promo: false, orig: null,
      variants: p.variants.map((v) => ({
        id: v.id, name: v.name, included: true,
        price: v.basePriceCents, promo: false, orig: null,
      })),
    };
  }
  return { id: p.id, price: p.basePriceCents, promo: false, orig: null, variants: null };
}

/* ── status de um rascunho ──────────────────────────────────────────
   'configured' (verde) · 'pending' (âmbar, falta preço) · 'attention' (tijolo,
   promoção inválida). Vazio/zero de preço ORIGINAL nunca é erro — só o de venda
   é obrigatório. */
function priceIssue(price, promo, orig) {
  if (price === null || price === 0) return "pending";
  if (promo && orig !== null && orig !== 0 && orig <= price) return "attention";
  return "ok";
}
function draftStatus(p, d) {
  if (isVariantProduct(p)) {
    const inc = d.variants.filter((v) => v.included);
    if (inc.length === 0) return { status: "pending", reason: "Nenhuma variante no catálogo" };
    if (d.priceMode === "single") {
      const is = priceIssue(d.price, d.promo, d.orig);
      if (is === "pending") return { status: "pending", reason: "Defina o preço de venda" };
      if (is === "attention") return { status: "attention", reason: "Promoção ≤ preço de venda" };
      return { status: "configured", reason: `${inc.length} variante(s) · preço único` };
    }
    let anyPending = false, anyAtt = false;
    inc.forEach((v) => { const is = priceIssue(v.price, v.promo, v.orig); if (is === "pending") anyPending = true; if (is === "attention") anyAtt = true; });
    if (anyPending) return { status: "pending", reason: "Variante(s) sem preço" };
    if (anyAtt) return { status: "attention", reason: "Promoção inválida em variante" };
    return { status: "configured", reason: `${inc.length} variante(s) · preço por variante` };
  }
  const is = priceIssue(d.price, d.promo, d.orig);
  if (is === "pending") return { status: "pending", reason: "Defina o preço de venda" };
  if (is === "attention") return { status: "attention", reason: "Promoção ≤ preço de venda" };
  return { status: "configured", reason: "Preço definido" };
}
const isDraftValid = (p, d) => draftStatus(p, d).status === "configured";

/* converte rascunhos válidos em itens de catálogo (para a lista base) */
function draftsToItems(products, drafts) {
  return drafts.map((d) => {
    const p = products.find((x) => x.id === d.id);
    if (isVariantProduct(p)) {
      const inc = d.variants.filter((v) => v.included);
      const prices = d.priceMode === "single" ? [d.price] : inc.map((v) => v.price);
      const lo = Math.min(...prices), hi = Math.max(...prices);
      return {
        id: p.id, name: p.name, sku: p.sku,
        priceCents: lo, priceHi: hi === lo ? null : hi,
        origCents: d.priceMode === "single" ? (d.promo ? d.orig : null) : null,
        meta: `${inc.length} variante(s)${d.priceMode === "perVariant" ? " · preço por variante" : ""}`,
      };
    }
    return { id: p.id, name: p.name, sku: p.sku, priceCents: d.price, origCents: d.promo ? d.orig : null, meta: p.attrs ? p.attrs.join(" · ") : "" };
  });
}

const APPROACHES = [
  { key: "A", label: "Wizard", full: "A · Wizard (2 etapas)" },
  { key: "B", label: "Dialog", full: "B · Dialog Inteligente" },
  { key: "C", label: "Side Sheet", full: "C · Side Sheet Multi-Step" },
  { key: "D", label: "Master–Detail", full: "D · Configuração progressiva" },
];

Object.assign(window, {
  AP: {
    PRODUCTS, SEED_ITEMS, APPROACHES, isVariantProduct,
    centsToBRL, digitsToCents, makeDraft, draftStatus, isDraftValid, draftsToItems,
  },
});
