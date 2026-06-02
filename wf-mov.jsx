/* Inventto — Wireframe · Módulo Movimentações de Estoque (Superfície 2 · 2.4)
   Tela 2.4.1 Histórico de movimentações (/movimentacoes): desktop (tabela imutável
   sem ações, linhas expansíveis) e mobile (cards). Sheet 2.4.2 Registrar movimentação.
   Cada movimentação é um DOCUMENTO com vários itens de produto; a linha mostra os
   agregados (qtd. de itens · valor) e expande para os itens.
   Reusa o kit (window.WF_*), a casca (window.SH) e classes pd- (wf-produtos.css).
   Exporta em window.MOV. */

const { Sidebar, TopHeader, SH_I } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const mic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const MOV_I = {
  plus: mic(<path d="M12 5v14M5 12h14"/>),
  search: mic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  chevDown: mic(<path d="m6 9 6 6 6-6"/>),
  chevL: mic(<path d="m15 6-6 6 6 6"/>),
  chevR: mic(<path d="m9 6 6 6-6 6"/>),
  arrowUp: mic(<path d="M12 19V5M6 11l6-6 6 6"/>),
  arrowDown: mic(<path d="M12 5v14M6 13l6 6 6-6"/>),
  swap: mic(<><path d="M8 4 4 8l4 4M4 8h12M16 20l4-4-4-4M20 16H8"/></>),
  user: mic(<><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/></>),
  cpu: mic(<><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></>),
  calendar: mic(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>),
  doc: mic(<><path d="M14 3v5h5"/><path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/></>),
  x: mic(<path d="M6 6 18 18M18 6 6 18"/>),
  check: mic(<path d="M20 6 9 17l-5-5"/>),
  info: mic(<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>),
  inbox: mic(<><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5Z"/></>),
  lock: mic(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
  pencil: mic(<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></>),
  clock: mic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
};

const { useState } = React;

/* moeda BRL */
const brl = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── dados de exemplo (org ativa: Ateliê Joana) ────────
   Cada movimentação = um documento com 1+ itens.
   tipo: in | out · who null => responsável "Sistema" (automática) */
const RAW_MOVEMENTS = [
  { id: "m1", date: "28/05/2026", time: "14:32", type: "in", reason: "Compra", doc: "NF-e 004821", who: "Joana Ribeiro",
    items: [
      { prod: "Vestido Linho Areia", sku: "VL-AREIA-01", attrs: ["Cor: Areia", "Tam: M"], qty: 20, value: 960 },
      { prod: "Camisa Social Algodão", sku: "CS-ALG-AR-M", color: "#cbb894", attrs: ["Cor: Areia", "Tam: M"], qty: 18, value: 522 },
      { prod: "Bolsa Tote Lona", sku: "BT-LONA", attrs: ["Cor: Crua", "Tam: Único"], qty: 3, value: 105 },
    ] },
  { id: "m2", date: "28/05/2026", time: "11:05", type: "out", reason: "Venda (balcão)", doc: "PDV #20518", who: null,
    items: [
      { prod: "Camisa Social Algodão", sku: "CS-ALG-BR-M", color: "#f1ede5", attrs: ["Cor: Branco", "Tam: M"], qty: 2, value: 64.2 },
      { prod: "Lenço de Seda Estampado", sku: "LS-EST-03", attrs: ["Estampa: Folhas"], qty: 1, value: 39.9 },
    ] },
  { id: "m3", date: "27/05/2026", time: "16:48", type: "out", reason: "Perda / Avaria", doc: "Ocorrência #12", who: "Marcos Lima",
    items: [
      { prod: "Lenço de Seda Estampado", sku: "LS-EST-03", attrs: ["Estampa: Folhas"], qty: 1, value: 21.4 },
    ] },
  { id: "m4", date: "27/05/2026", time: "09:20", type: "in", reason: "Devolução de cliente", doc: "Pedido #3391", who: "Joana Ribeiro",
    items: [
      { prod: "Calça Alfaiataria", sku: "CA-ALF-02", attrs: ["Cor: Preto", "Tam: 40"], qty: 1, value: 60 },
    ] },
  { id: "m5", date: "26/05/2026", time: "18:00", type: "in", reason: "Ajuste de inventário (+)", doc: null, who: "Joana Ribeiro",
    items: [
      { prod: "Bolsa Tote Lona", sku: "BT-LONA", attrs: ["Cor: Crua", "Tam: Único"], qty: 3, value: 105 },
    ] },
  { id: "m6", date: "26/05/2026", time: "10:15", type: "out", reason: "Outro", desc: "Peças para brinde de campanha de inverno.", doc: null, who: "Marcos Lima",
    items: [
      { prod: "Camisa Social Algodão", sku: "CS-ALG-PR-P", color: "#2c2a28", attrs: ["Cor: Preto", "Tam: P"], qty: 2, value: 55.8 },
    ] },
  { id: "m7", date: "25/05/2026", time: "15:30", type: "in", reason: "Compra", doc: "NF-e 004790", who: "Joana Ribeiro",
    items: [
      { prod: "Camisa Social Algodão", sku: "CS-ALG-AR-M", color: "#cbb894", attrs: ["Cor: Areia", "Tam: M"], qty: 18, value: 522 },
      { prod: "Camisa Social Algodão", sku: "CS-ALG-BR-M", color: "#f1ede5", attrs: ["Cor: Branco", "Tam: M"], qty: 12, value: 348 },
    ] },
];

/* agrega totalUnits e totalValue */
const MOVEMENTS = RAW_MOVEMENTS.map((m) => ({
  ...m,
  totalUnits: m.items.reduce((s, it) => s + it.qty, 0),
  totalValue: m.items.reduce((s, it) => s + it.value, 0),
}));

/* ════ PRIMITIVOS ══════════════════════════════════════ */
function MvTypeBadge({ type }) {
  return type === "in"
    ? <span className="mv-typebadge is-in">{MOV_I.arrowUp}Entrada</span>
    : <span className="mv-typebadge is-out">{MOV_I.arrowDown}Saída</span>;
}

const MvQty = ({ type, qty }) => (
  <span className={["mv-qty", type === "in" ? "is-in" : "is-out"].join(" ")}>{type === "in" ? "+" : "−"}{qty}</span>
);

function MvResp({ who }) {
  if (!who) return <span className="mv-resp is-system"><span className="mv-resp-ico">{MOV_I.cpu}</span>Sistema</span>;
  return <span className="mv-resp"><span className="mv-resp-ico">{MOV_I.user}</span>{who}</span>;
}

/* coluna Motivo / Doc. — orientação vertical */
function MvReasonDoc({ m }) {
  return (
    <span className="mv-reasondoc">
      <span className="mv-rd-reason">{m.reason}</span>
      {m.doc
        ? <span className="mv-rd-doc"><span className="mv-rd-doc-ico">{MOV_I.doc}</span>{m.doc}</span>
        : <span className="mv-rd-doc is-empty">Sem documento</span>}
    </span>
  );
}

/* célula data / hora */
function MvWhen({ m }) {
  return (
    <span className="mv-when">
      <span className="mv-when-date">{m.date}</span>
      <span className="mv-when-time">{m.time}</span>
    </span>
  );
}

/* valor total (coluna Valor) */
const MvValue = ({ value }) => <span className="mv-value">{brl(value)}</span>;

/* ── célula de produto da tabela de itens (thumb + nome/sku/atributos vertical) ── */
function MvItemProd({ it }) {
  return (
    <span className="mv-item-prod">
      <span className="pd-thumb is-sm" />
      <span className="mv-item-meta">
        <span className="mv-item-name">
          {it.color && <span className="mv-swatch" style={{ background: it.color }} />}
          {it.prod}
        </span>
        <span className="mv-item-sku">{it.sku}</span>
        {it.attrs && it.attrs.length > 0 && (
          <span className="mv-item-attrs">
            {it.attrs.map((a) => <span key={a} className="mv-item-attr">{a}</span>)}
          </span>
        )}
      </span>
    </span>
  );
}

/* ── card de detalhe (sublinha expandida) ─────────────── */
function MvDetailCard({ m, role }) {
  const showValue = role !== "sales";
  return (
    <div className="mv-detail">
      {/* header */}
      <div className="mv-detail-head">
        <span className="mv-detail-title">
          <MvTypeBadge type={m.type} />
          Detalhes da movimentação
        </span>
        <span className="mv-detail-id">{m.date} · {m.time}</span>
      </div>

      {/* descrição (só quando motivo = "Outro" — não aparece na linha) */}
      {m.desc && <div className="mv-detail-desc">“{m.desc}”</div>}

      {/* tabela de itens */}
      <table className="mv-itemtable">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col" className="is-right">Quantidade</th>
            {showValue && <th scope="col" className="is-right">Valor</th>}
          </tr>
        </thead>
        <tbody>
          {m.items.map((it, i) => (
            <tr key={i}>
              <td><MvItemProd it={it} /></td>
              <td className="is-right">
                <span className={["mv-item-qty", m.type === "in" ? "is-in" : "is-out"].join(" ")}>
                  {m.type === "in" ? "+" : "−"}{it.qty}
                </span>
                <span className="mv-item-unit">{it.qty === 1 ? "unidade" : "unidades"}</span>
              </td>
              {showValue && <td className="is-right"><span className="mv-item-value">{brl(it.value)}</span></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* select compacto (filtro) — reusa pd-select */
function MvSelect({ value, placeholder, icon, minw }) {
  return (
    <span className={["pd-select", value ? "" : "is-placeholder"].join(" ")} style={minw ? { minWidth: minw } : null}>
      {icon && <span className="pd-chev" style={{ marginRight: 2 }}>{icon}</span>}
      <span className="pd-grow">{value || placeholder}</span>
      <span className="pd-chev">{MOV_I.chevDown}</span>
    </span>
  );
}

/* ── filtro de período: preset + intervalo de datas (com popovers) ── */
const MV_PRESETS = ["Hoje", "Últimos 7 dias", "Últimos 30 dias", "Últimos 60 dias", "Últimos 90 dias", "Personalizado"];

function MvPresetSelect({ value = "Personalizado", open }) {
  return (
    <span className="mv-presetwrap">
      <span className="pd-select mv-preset">
        <span className="pd-grow">{value}</span>
        <span className="pd-chev">{MOV_I.chevDown}</span>
      </span>
      {open && (
        <span className="mv-presetpop">
          {MV_PRESETS.map((p) => (
            <span key={p} className={["mv-preset-item", p === value ? "is-active" : ""].join(" ")}>
              {p}{p === value && <span className="mv-preset-check">{MOV_I.check}</span>}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}

/* grade de um mês (semana começa no domingo) */
function mvMonthCells(year, month) {
  const startDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startDow - 1; i >= 0; i--) cells.push({ day: prevDays - i, out: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, out: false });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - (startDow + daysInMonth) + 1, out: true });
  return cells;
}

const MV_DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MV_MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

/* um painel de mês · range = [startDay, endDay] aplicável só a este mês */
function MvCalMonth({ year, month, nav, range }) {
  const cells = mvMonthCells(year, month);
  return (
    <span className="mv-cal-month">
      <span className="mv-cal-head">
        {nav === "prev" && <span className="mv-cal-nav is-prev">{MOV_I.chevL}</span>}
        <span className="mv-cal-title">{MV_MONTHS[month]} {year}</span>
        {nav === "next" && <span className="mv-cal-nav is-next">{MOV_I.chevR}</span>}
      </span>
      <span className="mv-cal-grid">
        {MV_DOW.map((d) => <span key={d} className="mv-cal-dow">{d}</span>)}
        {cells.map((c, i) => {
          const sel = range && !c.out && c.day >= range[0] && c.day <= range[1];
          const cap = sel && (c.day === range[0] || c.day === range[1]);
          return (
            <span key={i} className={["mv-cal-day", c.out ? "is-out" : "", sel && !cap ? "is-inrange" : "", cap ? "is-end" : ""].join(" ")}>{c.day}</span>
          );
        })}
      </span>
    </span>
  );
}

function MvDateRange({ from = "02/05/2026", to = "31/05/2026", open }) {
  return (
    <span className="mv-rangewrap">
      <span className="mv-rangepill">
        <span className="mv-range-ico">{MOV_I.calendar}</span>
        <span className="mv-range-val">{from} – {to}</span>
      </span>
      {open && (
        <span className="mv-calpop">
          <MvCalMonth year={2026} month={4} nav="prev" range={[2, 31]} />
          <MvCalMonth year={2026} month={5} nav="next" />
        </span>
      )}
    </span>
  );
}

/* tabs de tipo (filtro primário) — Entradas · Saídas · Todos */
function MvTabs({ active = "all" }) {
  const tabs = [
    { id: "in",  label: "Entradas", ico: MOV_I.arrowUp,   cls: "is-in" },
    { id: "out", label: "Saídas",   ico: MOV_I.arrowDown, cls: "is-out" },
    { id: "all", label: "Todos" },
  ];
  return (
    <span className="mv-tabs" role="tablist">
      {tabs.map((t) => (
        <span key={t.id} role="tab" className={["mv-tab", active === t.id ? "is-active" : "", active === t.id ? (t.cls || "") : ""].join(" ")}>
          {t.ico}{t.label}
        </span>
      ))}
    </span>
  );
}

/* ── barra de filtros (desktop) ───────────────────────── */
function MvFilters({ term, role = "owner", typeTab = "all", reasonVal }) {
  return (
    <div className="mv-filterbar">
      <div className="mv-filters-row1">
        <MvTabs active={typeTab} />
        {role !== "sales" && (
          <span className="mv-filter-cta"><WBtn><span className="mv-ico">{MOV_I.plus}</span>Registrar</WBtn></span>
        )}
      </div>
      <div className="mv-filters">
        <span className="mv-search"><WInput placeholder="Buscar por produto ou SKU" value={term} trail={MOV_I.search} /></span>
        <span className="mv-filter"><MvSelect value={reasonVal || "Todos os motivos"} /></span>
        <span className="mv-filter"><MvPresetSelect value="Personalizado" /></span>
        <span className="mv-filter is-date"><MvDateRange from="02/05/2026" to="31/05/2026" /></span>
      </div>
    </div>
  );
}

/* ── linha da tabela (expansível) ─────────────────────── */
function MvRow({ m, role, open, onToggle, colCount }) {
  const showValue = role !== "sales";
  return (
    <>
      <tr className={["mv-row", open ? "is-open" : ""].join(" ")} onClick={onToggle} aria-expanded={open}>
        <td className="mv-cell-chev">
          <span className={["mv-rowchev", open ? "is-open" : ""].join(" ")}>{MOV_I.chevR}</span>
        </td>
        <td><MvWhen m={m} /></td>
        <td><MvTypeBadge type={m.type} /></td>
        <td><MvReasonDoc m={m} /></td>
        <td><MvResp who={m.who} /></td>
        <td className="is-right">
          <span className="mv-itemcount">
            <MvQty type={m.type} qty={m.totalUnits} />
            <span className="mv-itemcount-sub">{m.items.length} {m.items.length > 1 ? "itens" : "item"}</span>
          </span>
        </td>
        {showValue && <td className="is-right"><MvValue value={m.totalValue} /></td>}
      </tr>
      {open && (
        <tr className="mv-detail-row">
          <td colSpan={colCount}>
            <MvDetailCard m={m} role={role} />
          </td>
        </tr>
      )}
    </>
  );
}

/* ── tabela ───────────────────────────────────────────── */
function MvTable({ movements, empty, term, role, defaultOpen }) {
  const showValue = role !== "sales";
  const colCount = showValue ? 7 : 6;
  const [openId, setOpenId] = useState(defaultOpen ?? (movements && movements[0] && movements[0].id));
  return (
    <div className="mv-tablewrap">
      <table className="mv-table mv-table--expandable">
        <thead>
          <tr>
            <th scope="col" className="mv-cell-chev" aria-label="Expandir"></th>
            <th scope="col">Data</th>
            <th scope="col">Tipo</th>
            <th scope="col">Motivo / Doc.</th>
            <th scope="col">Responsável</th>
            <th scope="col" className="is-right">Qtd. de itens</th>
            {showValue && <th scope="col" className="is-right">Valor</th>}
          </tr>
        </thead>
        {!empty && (
          <tbody>
            {movements.map((m) => (
              <MvRow
                key={m.id}
                m={m}
                role={role}
                colCount={colCount}
                open={openId === m.id}
                onToggle={() => setOpenId((cur) => (cur === m.id ? null : m.id))}
              />
            ))}
          </tbody>
        )}
      </table>
      {empty && (
        <div className="mv-empty">
          <div className="mv-empty-ico">{MOV_I.search}</div>
          <p className="mv-empty-title">Nada encontrado para “{term}”.</p>
          <p className="mv-empty-text">Tente outro termo ou ajuste os filtros de tipo, motivo e período.</p>
        </div>
      )}
    </div>
  );
}

function MvHead({ role }) {
  return (
    <div className="mv-headrow">
      <div>
        <h1 className="wf-h1" style={{ fontSize: 27 }}>Movimentações</h1>
        <p className="mv-head-sub">Histórico cronológico e auditável de entradas e saídas de estoque. Registros são imutáveis.</p>
      </div>
    </div>
  );
}

/* ════ Conteúdo da tela /movimentacoes (desktop) ════════
   scenario: base · empty(filtro) · firstrun(vazio) · prefiltered */
function MvHistory({ scenario = "base", role = "owner" }) {
  if (scenario === "firstrun") {
    return (
      <div className="mv-col">
        <MvHead role={role} />
        <MvFilters role={role} />
        <div className="mv-tablewrap">
          <div className="mv-empty">
            <div className="mv-empty-ico">{MOV_I.inbox}</div>
            <p className="mv-empty-title">Nenhuma movimentação ainda.</p>
            <p className="mv-empty-text">Entradas e saídas aparecem aqui assim que houver registros. Comece adicionando estoque a um produto.</p>
            {role !== "sales" && <WBtn><span className="mv-empty-cta-ico">{MOV_I.arrowUp}</span>Registrar entrada</WBtn>}
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = scenario === "empty";
  const isPre = scenario === "prefiltered";
  const list = isPre ? MOVEMENTS.filter((m) => m.items.some((it) => it.sku.startsWith("CS-ALG"))) : MOVEMENTS;

  return (
    <div className="mv-col">
      <MvHead role={role} />
      <MvFilters role={role} term={isEmpty ? "guarda-chuva" : (isPre ? "Camisa Social Algodão" : "")} />
      {isPre && (
        <div className="mv-activefilter">
          <span className="mv-af-label">Filtrando por produto:</span>
          <span className="mv-filterchip">
            <span className="mv-fc-k">Produto</span>
            Camisa Social Algodão
            <span className="mv-fc-x">{MOV_I.x}</span>
          </span>
        </div>
      )}
      <MvTable movements={list} empty={isEmpty} term="guarda-chuva" role={role} />
      {!isEmpty && (
        <div className="mv-tablefoot">
          <span className="mv-count"><b>{list.length}</b> {isPre ? "movimentações deste produto" : "movimentações"}</span>
          <span className="mv-pager">
            <span className="mv-pagebtn is-disabled">{MOV_I.chevL}</span>
            <span className="mv-count" style={{ margin: "0 4px" }}>1 de 1</span>
            <span className="mv-pagebtn is-disabled">{MOV_I.chevR}</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* ── shell completa (desktop) ─────────────────────────── */
function MvHistoryShell({ scenario, role = "owner", collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "mv-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="mov" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Movimentações"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <MvHistory scenario={scenario} role={role} />
        </div>
      </div>
    </div>
  );
}

/* ── skeleton (carregando) ────────────────────────────── */
function MvHistoryLoading() {
  return (
    <div className="mv-col">
      <div className="wf-sk" style={{ width: 190, height: 26 }} />
      <div className="wf-sk" style={{ width: 360, height: 11, marginTop: 11 }} />
      <div style={{ display: "flex", gap: 10, margin: "24px 0 16px", flexWrap: "wrap" }}>
        <div className="wf-sk" style={{ flex: 1, minWidth: 200, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 140, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 140, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 150, height: 40, borderRadius: 9 }} />
      </div>
      <div className="mv-tablewrap">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 16px", borderBottom: i < 5 ? "1px solid var(--wf-line-soft)" : "0" }}>
            <span className="wf-sk" style={{ width: 14, height: 14, borderRadius: 4, flex: "0 0 auto" }} />
            <div style={{ width: 70 }}><div className="wf-sk" style={{ width: 64, height: 11 }} /><div className="wf-sk" style={{ width: 40, height: 9, marginTop: 6 }} /></div>
            <span className="wf-sk" style={{ width: 78, height: 22, borderRadius: 999, flex: "0 0 auto" }} />
            <div style={{ width: 150 }}><div className="wf-sk" style={{ width: 120, height: 11 }} /><div className="wf-sk" style={{ width: 90, height: 9, marginTop: 6 }} /></div>
            <span className="wf-sk" style={{ width: 110, height: 11, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 36, height: 16, marginLeft: "auto", flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 70, height: 13, flex: "0 0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function MvMCard({ m, role, defaultOpen }) {
  const showValue = role !== "sales";
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={["mv-mcard", open ? "is-open" : ""].join(" ")}>
      <div className="mv-mcard-tap" onClick={() => setOpen((o) => !o)}>
        <div className="mv-mcard-top">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <MvTypeBadge type={m.type} />
            <span className="mv-mreason">{m.reason}</span>
          </span>
          <span className={["mv-rowchev", open ? "is-open" : ""].join(" ")}>{MOV_I.chevR}</span>
        </div>
        <div className="mv-mcard-line">
          <span className="mv-mcard-time">{m.date} · {m.time}</span>
          <span className="mv-mcard-dot">·</span>
          <span className="mv-mcard-items">{m.items.length} {m.items.length > 1 ? "produtos" : "produto"}</span>
        </div>
        {m.doc && <div className="mv-mcard-doc"><span className="mv-rd-doc-ico">{MOV_I.doc}</span>{m.doc}</div>}
        <div className="mv-mcard-foot">
          <span className="mv-mcard-qty">
            <MvQty type={m.type} qty={m.totalUnits} />
            <span className="mv-mcard-unit">un.</span>
          </span>
          <span className="mv-mcard-right">
            {showValue && <span className="mv-mcard-value">{brl(m.totalValue)}</span>}
            <MvResp who={m.who} />
          </span>
        </div>
      </div>
      {open && (
        <div className="mv-mcard-items-list">
          {m.desc && <div className="mv-mcard-desc">“{m.desc}”</div>}
          {m.items.map((it, i) => (
            <div key={i} className="mv-mitem">
              <span className="pd-thumb is-sm" />
              <span className="mv-mitem-meta">
                <span className="mv-item-name">
                  {it.color && <span className="mv-swatch" style={{ background: it.color }} />}
                  {it.prod}
                </span>
                <span className="mv-item-sku">{it.sku}</span>
                {it.attrs && it.attrs.length > 0 && (
                  <span className="mv-item-attrs">{it.attrs.map((a) => <span key={a} className="mv-item-attr">{a}</span>)}</span>
                )}
              </span>
              <span className="mv-mitem-num">
                <span className={["mv-item-qty", m.type === "in" ? "is-in" : "is-out"].join(" ")}>{m.type === "in" ? "+" : "−"}{it.qty}</span>
                {showValue && <span className="mv-item-value">{brl(it.value)}</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MvHistoryMobile({ role = "owner" }) {
  return (
    <div className="wf sh-mobile">
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 22 }}>Movimentações</h1>
          {role !== "sales" && <span className="mv-iconcta" aria-label="Registrar movimentação">{MOV_I.plus}</span>}
        </div>
        <div className="mv-filters-stack">
          <span className="wf-input" style={{ color: "var(--wf-faint)" }}><span className="wf-grow">Buscar por produto ou SKU</span><span className="wf-trail">{MOV_I.search}</span></span>
          <MvTabs active="all" />
          <MvSelect value="Todos os motivos" />
        </div>
        <div className="mv-mcards">
          {MOVEMENTS.map((m, i) => <MvMCard key={m.id} m={m} role={role} defaultOpen={i === 0} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MOV: {
    MOV_I, MOVEMENTS, brl,
    MvTypeBadge, MvQty, MvResp, MvReasonDoc, MvWhen, MvValue, MvItemProd, MvDetailCard,
    MvSelect, MvTabs, MvFilters, MvPresetSelect, MvDateRange, MvCalMonth,
    MvRow, MvTable, MvHead, MvHistory, MvHistoryShell, MvHistoryLoading,
    MvMCard, MvHistoryMobile,
  },
});
