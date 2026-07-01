/* Inventto — Wireframe · Módulo Produtos · Tela 2.3.3 Detalhe de produto (leitura)
   /produtos/:id — galeria + identificação + seletor de variante + card de estoque +
   resumo da grade + barra de ações (Manager/Owner). Desktop (2 col), mobile e estados
   (carregando, 404). Reusa o kit + a casca. Exporta em window.PRODD. */

const { Sidebar, TopHeader, SH_I } = window.SH;
const {
  PROD_I, STK, PRODUCTS, gradeSummary, PdStatusBadge, PdCatBadges,
} = window.PROD;

/* descrições de exemplo (RF039 — exibidas só quando houver) */
const PD_DESC = {
  vestido: "Vestido midi em linho leve, corte reto com alças ajustáveis e fenda lateral. Caimento fluido, ideal para o verão.",
  camisa: "Camisa de algodão fio 50, modelagem regular com botões de madrepérola. Toque macio e acabamento que não amassa.",
};
/* custo médio ponderado de exemplo (RN057) — só Manager/Owner */
const PD_COST = { vestido: "R$ 38,50", camisa: "R$ 22,90" };
/* custo unitário numérico (para calcular o total do estoque) */
const PD_COST_N = { vestido: 38.5, camisa: 22.9 };
const brl = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/* atributos de leitura para produtos simples (cor + tamanho) */
const PD_ATTRS = {
  vestido: { cor: "Areia", color: "#cbb894", tam: "Único" },
  bolsa: { cor: "Cru", color: "#d8cdb6", tam: "Único" },
  calca: { cor: "Grafite", color: "#3a3733", tam: "40" },
};

/* atributos derivados da grade (cor + tamanho), preservando a ordem de 1ª ocorrência */
function variantAttrs(variants) {
  const cores = [], tams = [];
  variants.forEach((v) => {
    if (!cores.some((c) => c.cor === v.cor)) cores.push({ cor: v.cor, color: v.color });
    if (!tams.includes(v.tam)) tams.push(v.tam);
  });
  return { cores, tams };
}

/* ── galeria (carrossel) ──────────────────────────────── */
function PdGallery({ active = 0, count = 4 }) {
  return (
    <div className="pd-gallery">
      <div className="pd-gallery-main">
        <span className="pd-gallery-label">imagem do produto · 1:1</span>
        <span className="pd-gallery-arrow is-left" aria-label="Imagem anterior">{PROD_I.chevL}</span>
        <span className="pd-gallery-arrow is-right" aria-label="Próxima imagem">{PROD_I.chevR}</span>
        <span className="pd-gallery-dots">
          {Array.from({ length: count }).map((_, i) =>
            <span key={i} className={["pd-gallery-dot", i === active ? "is-on" : ""].join(" ")} />)}
        </span>
      </div>
      <div className="pd-gallery-thumbs">
        {Array.from({ length: count }).map((_, i) =>
          <span key={i} className={["pd-gallery-thumb", i === active ? "is-on" : ""].join(" ")} />)}
      </div>
    </div>);
}

/* ── seletor de variante (chips por atributo) ─────────── */
function PdVariantSelector({ p, sel }) {
  const { cores, tams } = variantAttrs(p.variants);
  return (
    <div className="pd-vselect">
      <div className="pd-vselect-attr">
        <span className="pd-vselect-label">Cor</span>
        <div className="pd-vselect-chips" role="group" aria-label="Cor">
          {cores.map((c) =>
            <span key={c.cor} className={["pd-vselect-chip", c.cor === sel.cor ? "is-on" : ""].join(" ")}>
              <span className="pd-swatch" style={{ background: c.color }} />{c.cor}
            </span>)}
        </div>
      </div>
      <div className="pd-vselect-attr">
        <span className="pd-vselect-label">Tamanho</span>
        <div className="pd-vselect-chips" role="group" aria-label="Tamanho">
          {tams.map((t) =>
            <span key={t} className={["pd-vselect-chip is-compact", t === sel.tam ? "is-on" : ""].join(" ")}>{t}</span>)}
        </div>
      </div>
    </div>);
}

/* ── card de estoque ──────────────────────────────────── */
function PdStockCard({ status, stock, min, role, cost, costN }) {
  const s = STK[status];
  const showCost = role !== "sales" && cost;
  return (
    <div className="pd-stockcard">
      <span className="pd-card-eyebrow">Estoque</span>
      <div className="pd-stockcard-main">
        <span className={["pd-stockcard-ico", s.st].join(" ")}>{PROD_I[s.icon]}</span>
        <span className="pd-stockcard-bal">{stock}<span className="pd-stockcard-unit">un.</span></span>
        <span className="pd-stockcard-badge"><PdStatusBadge status={status} /></span>
      </div>
      <div className="pd-stockcard-rows">
        <div className="pd-stockcard-row"><span className="pd-scr-k">Estoque mínimo</span><span className="pd-scr-v">{min} un.</span></div>
        {showCost &&
          <div className="pd-stockcard-row"><span className="pd-scr-k">Custo médio ponderado</span><span className="pd-scr-v">{cost}</span></div>}
        {showCost && costN != null &&
          <div className="pd-stockcard-row"><span className="pd-scr-k">Custo total do estoque</span><span className="pd-scr-v">{brl(stock * costN)}</span></div>}
      </div>
    </div>);
}

/* ── atributos de leitura (produto simples: cor + tamanho) ── */
function PdSimpleAttrs({ attr }) {
  if (!attr) return null;
  return (
    <div className="pd-vselect">
      <div className="pd-vselect-attr">
        <span className="pd-vselect-label">Cor</span>
        <div className="pd-vselect-chips">
          <span className="pd-vselect-chip is-on is-readonly"><span className="pd-swatch" style={{ background: attr.color }} />{attr.cor}</span>
        </div>
      </div>
      <div className="pd-vselect-attr">
        <span className="pd-vselect-label">Tamanho</span>
        <div className="pd-vselect-chips">
          <span className="pd-vselect-chip is-compact is-on is-readonly">{attr.tam}</span>
        </div>
      </div>
    </div>);
}

/* ── resumo da grade (variações) — reaproveita o conteúdo do Popover de 2.3.1 ──
   Produto com variações: uma badge por status + contagem. Produto simples:
   sintetiza uma "grade" de 1 item (o próprio produto). */
function PdGradeResumo({ p }) {
  const isVar = p.type === "var";
  const items = isVar ? p.variants : [{ status: p.status, stock: p.stock }];
  const sum = gradeSummary(items);
  const order = ["healthy", "warning", "critical", "zeroed"];
  return (
    <div className="pd-graderesumo">
      <span className="pd-card-eyebrow">Resumo da grade</span>
      <div className="pd-graderesumo-badges">
        {order.filter((k) => sum[k] > 0).map((k) =>
          <span key={k} className="pd-graderesumo-item"><PdStatusBadge status={k} /><b>{sum[k]}</b></span>)}
      </div>
      <div className="pd-graderesumo-total">Total físico <b>{sum.total} un.</b> · {items.length} {isVar ? "variantes" : "item único"}</div>
    </div>);
}

/* ── barra de ações (Manager/Owner) — agrupadas num popover ── */
function PdDetailActions({ active = true, open = true, stacked, kebab }) {
  if (kebab) {
    return (
      <div className="pd-detail-actions is-kebab">
        <span className="pd-actions-trig is-kebab" aria-haspopup="menu" aria-expanded={open} aria-label="Ações">
          {PROD_I.moreVert}
        </span>
        {open &&
          <div className="pd-detail-menu pd-menu wf" role="menu">
            <div className="pd-menu-item"><span className="pd-mi-ico">{PROD_I.pencil}</span>Editar produto</div>
            <div className="pd-menu-item"><span className="pd-mi-ico">{PROD_I.swap}</span>Registrar movimentação</div>
            {active && <div className="pd-menu-sep" />}
            {active &&
              <div className="pd-menu-item is-danger"><span className="pd-mi-ico">{PROD_I.eyeOff}</span>Inativar</div>}
          </div>}
      </div>);
  }
  return (
    <div className={["pd-detail-actions", stacked ? "is-stacked" : ""].join(" ")} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingRight: "4px" }}>
      <span className="pd-actions-trig" aria-haspopup="menu" aria-expanded={open} style={{ textAlign: "center", alignSelf: "flex-end", borderWidth: "1px", borderStyle: "solid", borderColor: "#000000", borderRadius: "5px", padding: "4px", width: "50px", height: "32px", justifyContent: "flex-end" }}>
        <span className="pd-ico" style={{ display: "none" }}>{PROD_I.swap}</span>
        <span style={{ fontSize: "14px", fontWeight: 500, textAlign: "center" }}>Ações</span>
        <span className="pd-actions-chev" style={{ display: "none" }}>{PROD_I.chevDown}</span>
      </span>
      {open &&
        <div className="pd-detail-menu pd-menu wf" role="menu" style={{ width: "100%" }}>
          <div className="pd-menu-item"><span className="pd-mi-ico">{PROD_I.pencil}</span>Editar produto</div>
          <div className="pd-menu-item"><span className="pd-mi-ico">{PROD_I.swap}</span>Registrar movimentação</div>
          {active && <div className="pd-menu-sep" />}
          {active &&
            <div className="pd-menu-item is-danger"><span className="pd-mi-ico">{PROD_I.eyeOff}</span>Inativar</div>}
        </div>}
    </div>);
}

/* identificação reaproveitável (badges + nome + sku + descrição) */
function PdIdentity({ p, status, sku }) {
  const active = p.status !== "inactive";
  return (
    <div className="pd-detail-titleblock">
      <div className="pd-detail-badges">
        {active
          ? <span className="pd-statusbadge is-active">{PROD_I.circleCheck}Ativo</span>
          : <span className="pd-statusbadge is-inactive">{PROD_I.eyeOff}Inativo</span>}
        <PdCatBadges cats={p.cats} />
      </div>
      <h1 className="pd-detail-name">{p.name}</h1>
      <span className="pd-detail-sku">{sku}</span>
    </div>);
}

/* ════ Conteúdo da tela /produtos/:id (desktop) ════════ */
function PdDetail({ id = "vestido", role = "owner" }) {
  const p = PRODUCTS.find((x) => x.id === id);
  const isVar = p.type === "var";
  const sel = { cor: "Branco", tam: "P" };
  const sv = isVar ? (p.variants.find((v) => v.cor === sel.cor && v.tam === sel.tam) || p.variants[0]) : null;
  const status = isVar ? sv.status : p.status;
  const sku = isVar ? sv.sku : p.sku;
  const stock = isVar ? sv.stock : p.stock;
  const min = isVar ? sv.min : p.min;
  const desc = PD_DESC[id];
  const canAct = role !== "sales" && p.status !== "inactive";

  return (
    <div className="pd-detail-col">
      <span className="pd-detail-back">{PROD_I.chevL}Produtos</span>
      <div className="pd-detail-grid">
        <PdGallery />
        <div className="pd-detail-info">
          <div className="pd-detail-head">
            <PdIdentity p={p} status={status} sku={sku} />
            {canAct && <PdDetailActions active={p.status !== "inactive"} kebab />}
          </div>
          {desc && <p className="pd-detail-desc">{desc}</p>}
          {isVar ? <PdVariantSelector p={p} sel={sel} /> : <PdSimpleAttrs attr={PD_ATTRS[id]} />}
          <PdStockCard status={status} stock={stock} min={min} role={role} cost={PD_COST[id]} costN={PD_COST_N[id]} />
          <PdGradeResumo p={p} />
        </div>
      </div>
    </div>);
}

/* ── shell completa (desktop) ─────────────────────────── */
function PdDetailShell({ id = "vestido", role = "owner", collapsed }) {
  const p = PRODUCTS.find((x) => x.id === id);
  return (
    <div className={["wf sh-app", collapsed ? "pd-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="produtos" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Produtos", p.name]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <PdDetail id={id} role={role} />
        </div>
      </div>
    </div>);
}

/* ── estado: carregando (skeleton) ────────────────────── */
function PdDetailLoading() {
  return (
    <div className="pd-detail-col">
      <div className="wf-sk" style={{ width: 90, height: 12, marginBottom: 18 }} />
      <div className="pd-detail-grid">
        <div className="pd-gallery">
          <div className="wf-sk" style={{ width: "100%", height: "auto", aspectRatio: "1", borderRadius: 14 }} />
          <div className="pd-gallery-thumbs">
            {[0, 1, 2, 3].map((i) => <div key={i} className="wf-sk" style={{ width: 64, height: 64, borderRadius: 9 }} />)}
          </div>
        </div>
        <div className="pd-detail-info">
          <div className="pd-detail-head" style={{ alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div className="wf-sk" style={{ width: 72, height: 22, borderRadius: 999 }} />
                <div className="wf-sk" style={{ width: 88, height: 22, borderRadius: 999 }} />
              </div>
              <div className="wf-sk" style={{ width: 250, height: 26, marginTop: 12 }} />
              <div className="wf-sk" style={{ width: 110, height: 12, marginTop: 10 }} />
            </div>
            <div className="wf-sk" style={{ width: 36, height: 36, borderRadius: 9 }} />
          </div>
          <div>
            <div className="wf-sk" style={{ width: "100%", height: 11 }} />
            <div className="wf-sk" style={{ width: "78%", height: 11, marginTop: 8 }} />
          </div>
          <div>
            <div className="wf-sk" style={{ width: 34, height: 9, marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 8 }}>
              {[78, 72, 74].map((w, i) => <div key={i} className="wf-sk" style={{ width: w, height: 32, borderRadius: 999 }} />)}
            </div>
          </div>
          <div>
            <div className="wf-sk" style={{ width: 60, height: 9, marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 8 }}>
              {[46, 46, 46].map((w, i) => <div key={i} className="wf-sk" style={{ width: w, height: 32, borderRadius: 999 }} />)}
            </div>
          </div>
          <div className="wf-sk" style={{ width: "100%", height: 132, borderRadius: 14 }} />
          <div className="wf-sk" style={{ width: "100%", height: 96, borderRadius: 14 }} />
        </div>
      </div>
    </div>);
}

/* ── estado: produto não encontrado (404 amigável) ────── */
function PdDetail404() {
  return (
    <div className="pd-detail-col">
      <span className="pd-detail-back">{PROD_I.chevL}Produtos</span>
      <div className="pd-tablewrap" style={{ marginTop: 18 }}>
        <div className="pd-empty">
          <div className="pd-empty-ico">{PROD_I.package}</div>
          <p className="pd-empty-title">Produto não encontrado</p>
          <p className="pd-empty-text">Este produto pode ter sido removido ou o endereço está incorreto. Volte para a lista e tente novamente.</p>
          <WBtn variant="outline"><span style={{ display: "inline-flex", marginRight: 4 }}>{PROD_I.chevL}</span>Voltar para Produtos</WBtn>
        </div>
      </div>
    </div>);
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function PdDetailMobile({ id = "camisa", role = "owner" }) {
  const p = PRODUCTS.find((x) => x.id === id);
  const isVar = p.type === "var";
  const sel = { cor: "Branco", tam: "P" };
  const sv = isVar ? (p.variants.find((v) => v.cor === sel.cor && v.tam === sel.tam) || p.variants[0]) : null;
  const status = isVar ? sv.status : p.status;
  const sku = isVar ? sv.sku : p.sku;
  const stock = isVar ? sv.stock : p.stock;
  const min = isVar ? sv.min : p.min;
  const desc = PD_DESC[id];
  const canAct = role !== "sales" && p.status !== "inactive";

  return (
    <div className="wf sh-mobile">
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className="sh-iconbtn">{PROD_I.chevL}</div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--wf-ink)" }}>Produtos</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 0 }}>
        <div className="pd-mdetail-gallery">
          <span className="pd-gallery-label">imagem do produto · 1:1</span>
          <span className="pd-gallery-arrow is-left">{PROD_I.chevL}</span>
          <span className="pd-gallery-arrow is-right">{PROD_I.chevR}</span>
          <span className="pd-gallery-dots">
            {[0, 1, 2, 3].map((i) => <span key={i} className={["pd-gallery-dot", i === 0 ? "is-on" : ""].join(" ")} />)}
          </span>
        </div>
        <div className="pd-mdetail-body">
          <div className="pd-detail-head">
            <PdIdentity p={p} status={status} sku={sku} />
            {canAct && <PdDetailActions active={p.status !== "inactive"} kebab />}
          </div>
          {desc && <p className="pd-detail-desc">{desc}</p>}
          {isVar ? <PdVariantSelector p={p} sel={sel} /> : <PdSimpleAttrs attr={PD_ATTRS[id]} />}
          <PdStockCard status={status} stock={stock} min={min} role={role} cost={PD_COST[id]} costN={PD_COST_N[id]} />
          <PdGradeResumo p={p} />
        </div>
      </div>
    </div>);
}

Object.assign(window, {
  PRODD: {
    PD_DESC, PD_COST, PD_COST_N, PD_ATTRS, brl, variantAttrs,
    PdGallery, PdVariantSelector, PdSimpleAttrs, PdStockCard, PdGradeResumo, PdDetailActions, PdIdentity,
    PdDetail, PdDetailShell, PdDetailLoading, PdDetail404, PdDetailMobile,
  },
});
