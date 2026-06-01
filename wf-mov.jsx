/* Inventto — Wireframe · Módulo Movimentações de Estoque (Superfície 2 · 2.4)
   Tela 2.4.1 Histórico de movimentações (/movimentacoes): desktop (tabela imutável
   sem ações) e mobile (cards). Sheet 2.4.2 Registrar movimentação (lateral direita).
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
  x: mic(<path d="M6 6 18 18M18 6 6 18"/>),
  check: mic(<path d="M20 6 9 17l-5-5"/>),
  info: mic(<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>),
  inbox: mic(<><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5Z"/></>),
  lock: mic(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
};

/* ── dados de exemplo (org ativa: Ateliê Joana) ────────
   tipo: in | out · sistema=true => responsável "Sistema" (automática) */
const MOVEMENTS = [
  { id: "m1", date: "28/05/2026", time: "14:32", type: "in",  reason: "Compra", prod: "Vestido Linho Areia", sku: "VL-AREIA-01", qty: 20, cost: "R$ 48,00", avg: "R$ 46,30", who: "Joana Ribeiro" },
  { id: "m2", date: "28/05/2026", time: "11:05", type: "out", reason: "Venda (balcão)", prod: "Camisa Social — Branco / M", sku: "CS-ALG-BR-M", color: "#f1ede5", qty: 2, cost: null, avg: "R$ 32,10", who: null },
  { id: "m3", date: "27/05/2026", time: "16:48", type: "out", reason: "Perda / Avaria", prod: "Lenço de Seda Estampado", sku: "LS-EST-03", qty: 1, cost: null, avg: "R$ 21,40", who: "Marcos Lima" },
  { id: "m4", date: "27/05/2026", time: "09:20", type: "in",  reason: "Devolução de cliente", prod: "Calça Alfaiataria", sku: "CA-ALF-02", qty: 1, cost: "R$ 60,00", avg: "R$ 58,40", who: "Joana Ribeiro" },
  { id: "m5", date: "26/05/2026", time: "18:00", type: "in",  reason: "Ajuste de inventário (+)", prod: "Bolsa Tote Lona", sku: "BT-LONA", qty: 3, cost: "R$ 35,00", avg: "R$ 35,00", who: "Joana Ribeiro" },
  { id: "m6", date: "26/05/2026", time: "10:15", type: "out", reason: "Outro", desc: "Peças para brinde de campanha de inverno.", prod: "Camisa Social — Preto / P", sku: "CS-ALG-PR-P", color: "#2c2a28", qty: 2, cost: null, avg: "R$ 27,90", who: "Marcos Lima" },
  { id: "m7", date: "25/05/2026", time: "15:30", type: "in",  reason: "Compra", prod: "Camisa Social — Areia / M", sku: "CS-ALG-AR-M", color: "#cbb894", qty: 18, cost: "R$ 29,00", avg: "R$ 29,00", who: "Joana Ribeiro" },
];

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

function MvReason({ m }) {
  return (
    <span className="mv-reason">
      <span className="mv-reason-main">{m.reason}</span>
      {m.desc && <span className="mv-reason-desc">“{m.desc}”</span>}
    </span>
  );
}

function MvProdCell({ m }) {
  return (
    <span className="mv-prod">
      <span className="pd-thumb is-sm" />
      <span className="mv-prod-meta">
        <span className="mv-prod-name">
          {m.color && <span className="mv-prod-var"><span className="mv-swatch" style={{ background: m.color }} /></span>}
          {m.prod}
        </span>
        <span className="mv-prod-sku">{m.sku}</span>
      </span>
    </span>
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

/* ── barra de filtros (desktop) ───────────────────────── */
function MvFilters({ term, role = "owner", typeVal, reasonVal }) {
  return (
    <div className="mv-filters">
      <span className="mv-search"><WInput placeholder="Buscar por produto ou SKU" value={term} trail={MOV_I.search} /></span>
      <span className="mv-filter"><MvSelect value={typeVal || "Todos os tipos"} /></span>
      <span className="mv-filter"><MvSelect value={reasonVal || "Todos os motivos"} /></span>
      <span className="mv-filter is-date"><MvSelect value="Período: 30 dias" icon={MOV_I.calendar} /></span>
      {role !== "sales" && <span className="mv-filter"><MvSelect value="Responsável" placeholder="Responsável" /></span>}
      {role !== "sales" && (
        <span className="mv-filter-cta"><WBtn><span className="mv-ico">{MOV_I.plus}</span>Registrar movimentação</WBtn></span>
      )}
    </div>
  );
}

/* ── linha da tabela ──────────────────────────────────── */
function MvRow({ m, role }) {
  const showCost = role !== "sales";
  return (
    <tr>
      <td>
        <span className="mv-when">
          <span className="mv-when-date">{m.date}</span>
          <span className="mv-when-time">{m.time}</span>
        </span>
      </td>
      <td><MvTypeBadge type={m.type} /></td>
      <td><MvReason m={m} /></td>
      <td><MvProdCell m={m} /></td>
      <td className="is-right"><MvQty type={m.type} qty={m.qty} /></td>
      {showCost && <td className="is-right"><span className={["mv-cost", m.cost ? "" : "is-empty"].join(" ")}>{m.cost || "—"}</span></td>}
      {showCost && <td className="is-right"><span className={["mv-cost", m.avg ? "" : "is-empty"].join(" ")}>{m.avg || "—"}</span></td>}
      <td><MvResp who={m.who} /></td>
    </tr>
  );
}

/* ── tabela ───────────────────────────────────────────── */
function MvTable({ rows, empty, term, role }) {
  const showCost = role !== "sales";
  return (
    <div className="mv-tablewrap">
      <table className="mv-table">
        <thead>
          <tr>
            <th scope="col">Data / hora</th>
            <th scope="col">Tipo</th>
            <th scope="col">Motivo</th>
            <th scope="col">Produto / Variante</th>
            <th scope="col" className="is-right">Qtd.</th>
            {showCost && <th scope="col" className="is-right">Custo unit.</th>}
            {showCost && <th scope="col" className="is-right">Custo médio pós</th>}
            <th scope="col">Responsável</th>
          </tr>
        </thead>
        {!empty && <tbody>{rows}</tbody>}
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
  const rows = MOVEMENTS.map((m) => <MvRow key={m.id} m={m} role={role} />);
  const preRows = MOVEMENTS.filter((m) => m.sku.startsWith("CS-ALG")).map((m) => <MvRow key={m.id} m={m} role={role} />);

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
      <MvTable rows={isPre ? preRows : rows} empty={isEmpty} term="guarda-chuva" role={role} />
      {!isEmpty && (
        <div className="mv-tablefoot">
          <span className="mv-count"><b>{isPre ? preRows.length : MOVEMENTS.length}</b> {isPre ? "movimentações deste produto" : "movimentações"}</span>
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
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 16px", borderBottom: i < 5 ? "1px solid var(--wf-line-soft)" : "0" }}>
            <div style={{ width: 70 }}><div className="wf-sk" style={{ width: 64, height: 11 }} /><div className="wf-sk" style={{ width: 40, height: 9, marginTop: 6 }} /></div>
            <span className="wf-sk" style={{ width: 78, height: 22, borderRadius: 999, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 120, height: 11, flex: "0 0 auto" }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 11 }}><span className="wf-sk" style={{ width: 32, height: 32, borderRadius: 6 }} /><div><div className="wf-sk" style={{ width: 140, height: 11 }} /><div className="wf-sk" style={{ width: 80, height: 9, marginTop: 6 }} /></div></div>
            <span className="wf-sk" style={{ width: 36, height: 16, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 110, height: 11, flex: "0 0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function MvMCard({ m, role }) {
  const showCost = role !== "sales";
  return (
    <div className="mv-mcard">
      <div className="mv-mcard-top">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
          <MvTypeBadge type={m.type} />
          <span className="mv-mreason">{m.reason}</span>
        </span>
        <span className="mv-mcard-time">{m.date} · {m.time}</span>
      </div>
      <div className="mv-mcard-prod">
        {m.color && <span className="mv-swatch" style={{ background: m.color }} />}
        {m.prod}<span className="mv-mcard-sku">· {m.sku}</span>
      </div>
      {m.desc && <div className="mv-mcard-desc">“{m.desc}”</div>}
      <div className="mv-mcard-foot">
        <span className="mv-mcard-qty">
          <MvQty type={m.type} qty={m.qty} />
          {showCost && m.cost && <span className="mv-mcard-cost">{m.cost}/un.</span>}
        </span>
        <MvResp who={m.who} />
      </div>
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
          <div style={{ display: "flex", gap: 10 }}>
            <MvSelect value="Todos os tipos" />
            <MvSelect value="Todos os motivos" />
          </div>
        </div>
        <div className="mv-mcards">
          {MOVEMENTS.map((m) => <MvMCard key={m.id} m={m} role={role} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MOV: {
    MOV_I, MOVEMENTS,
    MvTypeBadge, MvQty, MvResp, MvReason, MvProdCell, MvSelect, MvFilters,
    MvRow, MvTable, MvHead, MvHistory, MvHistoryShell, MvHistoryLoading,
    MvMCard, MvHistoryMobile,
  },
});
