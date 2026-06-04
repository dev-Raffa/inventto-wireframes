/* Inventto — Wireframe · Módulo Pedidos Online (Superfície 2 · 2.8)
   Tela 2.8.1 Painel de pedidos (/pedidos): desktop Kanban de 4 colunas por
   macro-estado · mobile Tabs. Cada pedido vem do storefront (vitrine online) e
   percorre a esteira de fulfillment exclusiva para entrega (RF034, RF035).
   O card tem DUAS zonas: corpo (navegação → abre Sheet) e rodapé (ações).
   Reusa o kit (window.WF_*), a casca (window.SH) e classes pd-/wf-.
   Exporta em window.PED. */

const { Sidebar, TopHeader, SH_I } = window.SH;
const { useState } = React;

/* moeda BRL */
const peBrl = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const pic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const PED_I = {
  clock: pic(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  chat: pic(<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />),
  whats: pic(<><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.2-5.6A8.4 8.4 0 1 1 21 11.5Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-2-1-.9.8a4 4 0 0 1-2.3-2.3l.8-.9-1-2L9 9.5Z" /></>),
  more: pic(<><circle cx="12" cy="6" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="12" cy="18" r="1.3" /></>),
  bag: pic(<><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>),
  user: pic(<><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></>),
  phone: pic(<path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 17l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2Z" transform="scale(.85) translate(2 1)" />),
  pin: pic(<><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>),
  store: pic(<><path d="M3 9 4.5 4h15L21 9M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M3 9h18" /></>),
  chevR: pic(<path d="m9 6 6 6-6 6" />),
  chevL: pic(<path d="m15 6-6 6 6 6" />),
  chevDown: pic(<path d="m6 9 6 6 6-6" />),
  x: pic(<path d="M6 6 18 18M18 6 6 18" />),
  check: pic(<path d="M20 6 9 17l-5-5" />),
  play: pic(<path d="M7 4v16l13-8L7 4Z" />),
  pkg: pic(<><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" /><path d="m3 7 9 5 9-5M12 12v10" /></>),
  truck: pic(<><path d="M3 5h11v10H3zM14 8h4l3 3v4h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>),
  flag: pic(<><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>),
  ban: pic(<><circle cx="12" cy="12" r="9" /><path d="m5.6 5.6 12.8 12.8" /></>),
  alert: pic(<><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>),
  inbox: pic(<><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5Z" /></>),
  archive: pic(<><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M9 12h6" /></>),
  lock: pic(<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  zap: pic(<path d="M13 2 4 14h7l-2 8 9-12h-7l2-8Z" />),
  info: pic(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>),
  camera: pic(<><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.2" /><path d="M8 7l1.5-2.5h5L16 7" /></>),
  search: pic(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></>),
  calendar: pic(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>)
};

/* ════ MICRO-ESTADOS ═══════════════════════════════════
   Mapa: macro (coluna/aba) · tom do badge · texto. */
const MICRO = {
  pendente: { macro: "pool", tone: "is-alert", text: "Pendente", ico: "clock" },
  confirmando: { macro: "atendimento", tone: "is-alert", text: "Confirmando", ico: "info" },
  separacao: { macro: "atendimento", tone: "is-accent", text: "Em separação", ico: "pkg" },
  entrega: { macro: "atendimento", tone: "is-accent", text: "Em entrega", ico: "truck" },
  finalizado: { macro: "finalizados", tone: "is-done", text: "Finalizado", ico: "check" },
  cancelado: { macro: "cancelados", tone: "is-dead", text: "Cancelado", ico: "ban" },
  expirado: { macro: "cancelados", tone: "is-deadline", text: "Expirado", ico: "clock" }
};

const MACRO_META = {
  pool: { cls: "is-pool", name: "Pool" },
  atendimento: { cls: "is-active", name: "Em atendimento" },
  finalizados: { cls: "is-done", name: "Finalizados" },
  cancelados: { cls: "is-dead", name: "Cancelados" }
};

/* ── dados de exemplo (org: Ateliê Joana · vitrine online) ── */
const ADDR_A = { line1: "Rua das Acácias, 218 — Apto 52", line2: "Jardim Paulista · São Paulo / SP · 01410-001" };
const ADDR_B = { line1: "Av. Beira-Mar, 1040 — Casa", line2: "Centro · Florianópolis / SC · 88015-200" };
const ADDR_C = { line1: "Travessa do Carmo, 47", line2: "Boa Viagem · Recife / PE · 51020-090" };

const ITEMS_3 = [
{ name: "Vestido Linho Areia", attrs: "Areia · Tam M", qty: 1, price: 168 },
{ name: "Lenço de Seda Estampado", attrs: "Folhas", qty: 1, price: 49.9 },
{ name: "Bolsa Tote Lona", attrs: "Crua · Único", qty: 1, price: 30.1 }];

const ITEMS_2 = [
{ name: "Camisa Social Algodão", attrs: "Branco · Tam M", qty: 1, price: 89 },
{ name: "Calça Alfaiataria", attrs: "Preto · 40", qty: 1, price: 69 }];

const ITEMS_1 = [{ name: "Camisa Social Algodão", attrs: "Areia · Tam M", qty: 1, price: 89.9 }];
const ITEMS_4 = [
{ name: "Vestido Linho Areia", attrs: "Areia · Tam G", qty: 2, price: 168 },
{ name: "Lenço de Seda Estampado", attrs: "Folhas", qty: 1, price: 49.9 },
{ name: "Bolsa Tote Lona", attrs: "Crua · Único", qty: 1, price: 49.9 }];


const ORDERS = [
// POOL — pendentes, com timer de expiração
{ id: "#3412", micro: "pendente", cust: "Mariana Costa", phone: "(11) 98842-1190", items: ITEMS_3, total: 248, age: "há 2 min", timer: "12:45", seller: null, addr: ADDR_A, isNew: true },
{ id: "#3411", micro: "pendente", cust: "Rafael Souza", phone: "(21) 99715-3380", items: ITEMS_1, total: 89.9, age: "há 8 min", timer: "06:20", seller: null, addr: ADDR_B },
{ id: "#3410", micro: "pendente", cust: "Beatriz Lima", phone: "(81) 98230-7744", items: ITEMS_4, total: 415.9, age: "há 11 min", timer: "02:48", urgent: true, seller: null, addr: ADDR_C },
// EM ATENDIMENTO — ciclo ativo (ordenado pela última ação)
{ id: "#3409", micro: "confirmando", cust: "Paulo Mendes", phone: "(11) 97402-5561", items: ITEMS_2, total: 158, age: "há 18 min", seller: "Marcos Lima", addr: ADDR_A },
{ id: "#3408", micro: "separacao", cust: "Carla Dias", phone: "(48) 99188-2030", items: ITEMS_4, total: 415.9, age: "há 24 min", seller: "Joana Ribeiro", addr: ADDR_B },
{ id: "#3407", micro: "entrega", cust: "Lucas Antunes", phone: "(11) 98011-7723", items: ITEMS_1, total: 119.9, age: "há 41 min", seller: "Marcos Lima", addr: ADDR_C },
// FINALIZADOS
{ id: "#3405", micro: "finalizado", cust: "Helena Rocha", phone: "(11) 99620-4412", items: ITEMS_3, total: 274, age: "há 1 h", seller: "Joana Ribeiro", addr: ADDR_A },
{ id: "#3402", micro: "finalizado", cust: "Diego Farias", phone: "(85) 98144-9087", items: ITEMS_2, total: 167.8, age: "há 2 h", seller: "Marcos Lima", addr: ADDR_C },
// CANCELADOS
{ id: "#3406", micro: "cancelado", cust: "Tânia Melo", phone: "(11) 98890-3321", items: ITEMS_2, total: 143, age: "há 1 h", seller: "Joana Ribeiro", reason: "Falta de estoque", addr: ADDR_B },
{ id: "#3404", micro: "expirado", cust: "André Pinto", phone: "(21) 99004-6650", items: ITEMS_1, total: 79.9, age: "há 2 h", seller: null, reason: "Expirou no Pool", addr: ADDR_C, migrated: true }];


const byMacro = (macro, list = ORDERS) => list.filter((o) => MICRO[o.micro].macro === macro);

/* ════ PRIMITIVOS ══════════════════════════════════════ */

/* badge de micro-estado */
function PedBadge({ micro }) {
  const m = MICRO[micro];
  const solid = micro === "cancelado";
  return (
    <span className={["pe-badge", m.tone].join(" ")}>
      {solid ? <span className="pe-badge-dot" /> : PED_I[m.ico]}
      {m.text}
    </span>);

}

/* timer de expiração (countdown) */
function PedTimer({ value, urgent }) {
  return (
    <span className={["pe-timer", urgent ? "is-urgent" : ""].join(" ")}>
      {PED_I.clock}{value}
    </span>);

}

/* dropdown de ações por micro-estado (DropdownMenu) */
const DROPDOWN_ACTIONS = {
  confirmando: [{ label: "Iniciar separação", ico: "pkg" }, { label: "Cancelar pedido", ico: "ban", danger: true }],
  separacao: [{ label: "Despachar entrega", ico: "truck" }, { label: "Cancelar pedido", ico: "ban", danger: true }],
  entrega: [{ label: "Finalizar pedido", ico: "flag" }, { label: "Cancelar pedido", ico: "ban", danger: true }]
};
function PedActionsMenu({ micro }) {
  const acts = DROPDOWN_ACTIONS[micro] || [];
  return (
    <div className="pd-menu" style={{ width: 210 }}>
      {acts.map((a, i) =>
      <React.Fragment key={a.label}>
          {a.danger && i > 0 && <div className="pd-menu-sep" />}
          <div className={["pd-menu-item", a.danger ? "is-danger" : ""].join(" ")}>
            <span className="pd-mi-ico">{PED_I[a.ico]}</span>{a.label}
          </div>
        </React.Fragment>
      )}
    </div>);

}

/* ── CARD de pedido (duas zonas) ──────────────────────── */
function PedCard({ o, menuOpen }) {
  const macro = MICRO[o.micro].macro;
  const isPool = macro === "pool";
  const isAtt = macro === "atendimento";
  const isClosed = macro === "finalizados" || macro === "cancelados";

  // rodapé: botão Chat + botão Ações conforme macro-estado
  const chat = isPool ?
  { cls: "is-primary", label: "Iniciar atendimento" } :
  isAtt ?
  { cls: "is-ghost", label: "Abrir WhatsApp" } :
  { cls: "is-disabled", label: "Abrir WhatsApp" }; // finalizados/cancelados/expirados: presente, desabilitado

  return (
    <div className={["pe-card", o.isNew ? "is-new" : "", o.migrated ? "is-migrated" : "", isClosed ? "is-dim" : ""].join(" ")}>
      {o.isNew && <span className="pe-newflag">{PED_I.zap}Novo</span>}
      {/* zona 1 — corpo de navegação (grade de 2 colunas) */}
      <div className="pe-card-nav">
        <div className="pe-card-grid">
          {/* L1 nº do pedido · R1 timer de expiração (pool) */}
          <span className="pe-card-id">{o.id}</span>
          {o.timer ? <PedTimer value={o.timer} urgent={o.urgent} /> : <i />}

          {/* L2 nome do cliente · R2 badge de status */}
          <span className="pe-card-cust">{o.cust}</span>
          <PedBadge micro={o.micro} />

          {/* L3 quantidade de itens · R3 preço */}
          <span className="pe-card-items">{PED_I.bag}{o.items.length} {o.items.length > 1 ? "itens" : "item"}</span>
          <span className="pe-card-total">{peBrl(o.total)}</span>

          {/* L4 tempo desde a última ação · R4 vendedor / motivo */}
          <span className="pe-card-age">{PED_I.clock}{o.age}</span>
          {o.reason ?
          <span className="pe-card-reason">{PED_I.ban}<span>{o.reason}</span></span> :
          o.seller ?
          <span className="pe-card-seller">{PED_I.user}<span>{o.seller}</span></span> :
          <i />}
        </div>
      </div>
      {/* zona 2 — rodapé de ações (encerrados mantêm a área, porém desabilitada) */}
      <div className="pe-card-foot">
        <span className={["pe-chatbtn", chat.cls].join(" ")}>{PED_I.chat}{chat.label}</span>
        <span className={["pe-actbtn", isAtt ? menuOpen ? "is-open" : "" : "is-disabled"].join(" ")}>{PED_I.more}</span>
      </div>
      {/* DropdownMenu aberto (anatomia) */}
      {menuOpen && isAtt &&
      <div style={{ position: "absolute", right: 5, marginTop: 4, zIndex: 8 }}>
          <PedActionsMenu micro={o.micro} />
        </div>
      }
    </div>);

}

/* ── coluna do Kanban ─────────────────────────────────── */
function PedColumn({ macro, orders, emptyText, menuFor }) {
  const meta = MACRO_META[macro];
  return (
    <div className={["pe-col", meta.cls].join(" ")}>
      <div className="pe-col-head">
        <span className="pe-col-dot" />
        <span className="pe-col-name">{meta.name}</span>
        <span className="pe-col-count">{orders.length}</span>
      </div>
      <div className="pe-col-body">
        {orders.length === 0 ?
        <div className="pe-col-empty">
            <span className="pe-col-empty-ico">{macro === "pool" ? PED_I.inbox : PED_I.archive}</span>
            <span className="pe-col-empty-text">{emptyText}</span>
          </div> :

        orders.map((o) => <PedCard key={o.id} o={o} menuOpen={menuFor === o.id} />)
        }
      </div>
    </div>);

}

/* ── cabeçalho da tela ────────────────────────────────── */
function PedHead({ role = "owner" }) {
  const live = visibleOrders(role).filter((o) => ["pool", "atendimento"].includes(MICRO[o.micro].macro)).length;
  return (
    <div className="pe-headrow">
      <div>
        <div className="pe-head-title">
          <h1 className="wf-h1" style={{ fontSize: 27 }}>Pedidos</h1>
          <span className="pe-livecount"><span className="pe-live-dot" /><b>{live}</b> em andamento</span>
        </div>
        <p className="pe-head-sub">Visibilidade em tempo real dos pedidos da vitrine online. Assuma do pool e conduza a entrega pela esteira de fulfillment.</p>
      </div>
    </div>);

}

/* ── microcopy de coluna vazia ────────────────────────── */
const EMPTY = {
  pool: "Nenhum pedido pendente. Os novos chegam aqui em tempo real.",
  atendimento: "Nenhum pedido em atendimento agora.",
  finalizados: "Nenhum pedido encerrado neste período.",
  cancelados: "Nenhum pedido encerrado neste período."
};

/* vendedor logado (usado no recorte por papel — RN081) */
const SELF_SELLER = "Joana Ribeiro";
/* lista visível conforme o papel: vendedor vê o Pool + os que assumiu */
function visibleOrders(role, list = ORDERS) {
  if (role === "sales")
  return list.filter((o) => MICRO[o.micro].macro === "pool" || o.seller === SELF_SELLER);
  return list;
}

/* lista de vendedores p/ o filtro (owner/manager) */
const SELLERS = ["Joana Ribeiro", "Marcos Lima"];

/* ── barra de filtros do Kanban ───────────────────────── */
function PedFilters({ role = "owner", seller = "Todos", period = "Últimos 7 dias" }) {
  const canSeller = role === "owner" || role === "manager";
  return (
    <div className="pe-filters">
      <div className="pe-search">
        <span className="pe-search-ico">{PED_I.search}</span>
        <span className="pe-search-ph">Buscar por nome ou telefone do cliente</span>
      </div>
      <div className="pe-fbtn">
        <span className="pe-fbtn-ico">{PED_I.calendar}</span>
        <span className="pe-fbtn-k">Período</span>
        <span className="pe-fbtn-v">{period}</span>
        <span className="pe-fbtn-chev">{PED_I.chevDown}</span>
      </div>
      {canSeller &&
      <div className="pe-fbtn">
          <span className="pe-fbtn-ico">{PED_I.user}</span>
          <span className="pe-fbtn-k">Vendedor</span>
          <span className="pe-fbtn-v">{seller}</span>
          <span className="pe-fbtn-chev">{PED_I.chevDown}</span>
        </div>
      }
    </div>);

}

/* ════ Painel Kanban (desktop) ═════════════════════════
   scenario: base · poolEmpty · menu (dropdown aberto) */
function PedBoard({ scenario = "base", role = "owner", menuFor, seller, period }) {
  let list = visibleOrders(role);
  if (scenario === "poolEmpty") list = list.filter((o) => MICRO[o.micro].macro !== "pool");

  return (
    <div>
      <PedHead role={role} />
      <PedFilters role={role} seller={seller} period={period} />
      <div className="pe-board">
        {["pool", "atendimento", "finalizados", "cancelados"].map((macro) =>
        <PedColumn key={macro} macro={macro} orders={byMacro(macro, list)} emptyText={EMPTY[macro]} menuFor={menuFor} />
        )}
      </div>
    </div>);

}

/* ── shell completa (desktop) ─────────────────────────── */
function PedBoardShell({ scenario = "base", role = "owner", collapsed, menuFor }) {
  return (
    <div className="wf sh-app" style={{ width: "1320px" }}>
      <Sidebar role={role} active="pedidos" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Pedidos"]} notif={true} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <PedBoard scenario={scenario} role={role} menuFor={menuFor} />
        </div>
      </div>
    </div>);

}

/* ── skeleton (carregando) ────────────────────────────── */
function PedBoardLoading() {
  const SkCard = () =>
  <div className="pe-sk-card">
      <div className="pe-sk-grid">
        {/* L1 nº · R1 timer */}
        <div className="wf-sk" style={{ width: 42, height: 11 }} />
        <div className="wf-sk" style={{ width: 52, height: 17, borderRadius: 6, justifySelf: "end" }} />
        {/* L2 cliente · R2 badge */}
        <div className="wf-sk" style={{ width: "74%", height: 14 }} />
        <div className="wf-sk" style={{ width: 74, height: 18, borderRadius: 999, justifySelf: "end" }} />
        {/* L3 qtd itens · R3 preço */}
        <div className="wf-sk" style={{ width: 50, height: 11 }} />
        <div className="wf-sk" style={{ width: 62, height: 12, borderRadius: 5, justifySelf: "end" }} />
        {/* L4 tempo · R4 vendedor */}
        <div className="wf-sk" style={{ width: 58, height: 10 }} />
        <div className="wf-sk" style={{ width: 70, height: 10, borderRadius: 5, justifySelf: "end" }} />
      </div>
      <div className="pe-sk-foot">
        <div className="wf-sk" style={{ flex: 1, height: 34, borderRadius: 8 }} />
        <div className="wf-sk" style={{ width: 34, height: 34, borderRadius: 8 }} />
      </div>
    </div>;

  return (
    <div>
      {/* título + contador */}
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div className="wf-sk" style={{ width: 128, height: 26 }} />
        <div className="wf-sk" style={{ width: 104, height: 22, borderRadius: 999 }} />
      </div>
      <div className="wf-sk" style={{ width: 420, height: 11, marginTop: 11 }} />
      {/* barra de filtros */}
      <div className="pe-sk-filters">
        <div className="wf-sk" style={{ width: 300, height: 38, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 152, height: 38, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 140, height: 38, borderRadius: 9 }} />
      </div>
      <div className="pe-board">
        {["pool", "atendimento", "finalizados", "cancelados"].map((macro, ci) =>
        <div key={macro} className={["pe-col", MACRO_META[macro].cls].join(" ")}>
            <div className="pe-col-head">
              <span className="pe-col-dot" />
              <div className="wf-sk" style={{ width: 80, height: 11 }} />
              <div className="wf-sk" style={{ width: 22, height: 22, borderRadius: 999, marginLeft: "auto" }} />
            </div>
            <div className="pe-col-body">
              {Array.from({ length: ci === 0 ? 3 : ci === 1 ? 2 : 1 }).map((_, i) => <SkCard key={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>);

}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
const MOBILE_TABS = [
{ macro: "pool", label: "Pool", cls: "is-pool" },
{ macro: "atendimento", label: "Em atendimento", cls: "is-active2" },
{ macro: "finalizados", label: "Finalizados", cls: "is-done" },
{ macro: "cancelados", label: "Cancelados", cls: "is-dead" }];


function PedTabs({ active }) {
  return (
    <div className="pe-tabs" role="tablist">
      {MOBILE_TABS.map((t) => {
        const n = byMacro(t.macro).length;
        const on = t.macro === active;
        return (
          <span key={t.macro} role="tab" className={["pe-tab", on ? "is-active " + t.cls : ""].join(" ")}>
            {t.label}<span className="pe-tab-count">{n}</span>
          </span>);

      })}
    </div>);

}

function PedBoardMobile({ active = "pool", role = "owner", empty }) {
  const visible = visibleOrders(role);
  const list = byMacro(active, visible);
  const showList = !empty && list.length > 0;
  const total = visible.filter((o) => ["pool", "atendimento"].includes(MICRO[o.micro].macro)).length;
  return (
    <div className="wf sh-mobile">
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}<span className="sh-bell-badge" /></div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 22 }}>Pedidos</h1>
          <span className="pe-livecount" style={{ marginLeft: "auto" }}><span className="pe-live-dot" /><b>{total}</b> ativos</span>
        </div>
        <PedFilters role={role} />
        <PedTabs active={active} />
        {showList ?
        <div className="pe-mcards">
            {list.map((o) => <PedCard key={o.id} o={o} />)}
          </div> :

        <div className="pe-empty">
            <span className="pe-empty-ico">{active === "pool" ? PED_I.inbox : PED_I.archive}</span>
            <p className="pe-empty-title">{active === "pool" ? "Pool vazio" : "Período sem pedidos"}</p>
            <p className="pe-empty-text">{EMPTY[active]}</p>
          </div>
        }
      </div>
    </div>);

}

Object.assign(window, {
  PED: {
    PED_I, ORDERS, MICRO, MACRO_META, EMPTY, peBrl, byMacro, visibleOrders, SELLERS,
    PedBadge, PedTimer, PedActionsMenu, PedCard, PedColumn, PedHead, PedFilters,
    PedBoard, PedBoardShell, PedBoardLoading,
    PedTabs, PedBoardMobile, MOBILE_TABS
  }
});