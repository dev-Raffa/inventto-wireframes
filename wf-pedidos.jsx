/* Inventto — Wireframe · Módulo Pedidos Online (Superfície 2 · 2.8)
   Tela 2.8.1 Painel de pedidos (/pedidos): Kanban de 5 colunas no desktop e
   Tabs + lista de cards no mobile, com badge de contagem em tempo real,
   timers de expiração e ação inline "Assumir". Reusa o kit (window.WF_*) e a
   casca (window.SH). Exporta primitivos + dados em window.PED. */

const { Sidebar, TopHeader } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const pe_ic = (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const PED_I = {
  clock: pe_ic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  phone: pe_ic(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>),
  whats: pe_ic(<><path d="M3 21l1.6-4.5A8 8 0 1 1 8 19.5L3 21Z"/><path d="M8.5 9.5c.4 2 2 3.6 4 4l1-1.2 2 .8.3 2c-3 .7-6.6-1.6-7.6-5l1.3-.4Z"/></>),
  userCheck: pe_ic(<><circle cx="9" cy="8" r="3.4"/><path d="M3 20a6.5 6.5 0 0 1 11 0M16 11l2 2 4-4"/></>),
  user: pe_ic(<><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/></>),
  check: pe_ic(<path d="M20 6 9 17l-5-5"/>),
  checkCircle: pe_ic(<><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>),
  xCircle: pe_ic(<><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></>),
  alert: pe_ic(<><path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>),
  package: pe_ic(<><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/></>),
  mapPin: pe_ic(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>),
  store: pe_ic(<><path d="M3 9 4.5 4h15L21 9M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M3 9h18"/></>),
  calendar: pe_ic(<><rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></>),
  hourglass: pe_ic(<><path d="M6 3h12M6 21h12M7 3c0 5 5 5 5 9s-5 4-5 9M17 3c0 5-5 5-5 9s5 4 5 9"/></>),
  card: pe_ic(<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>),
  cash: pe_ic(<><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></>),
  pix: pe_ic(<path d="m12 3 4 4 5 5-5 5-4 4-4-4-5-5 5-5 4-4Z"/>),
  chevR: pe_ic(<path d="m9 6 6 6-6 6"/>),
  chevL: pe_ic(<path d="m15 6-6 6 6 6"/>),
  x: pe_ic(<path d="M6 6 18 18M18 6 6 18"/>),
  lock: pe_ic(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>),
};

const PAY = { pix: ["Pix", PED_I.pix], card: ["Cartão", PED_I.card], cash: ["Dinheiro", PED_I.cash] };

/* ── pedidos de exemplo (org Ateliê Joana · vitrine "Coleção Verão") ──
   col:  pool | active | confirm | cancel | expire
   ttl:  minutos restantes de reserva (RN084: <30 = urgência; <15 = pulsa)
   own:  true = atribuído ao usuário logado (Sales)              */
const ORDERS = [
  { id: "1042", col: "pool", client: "Mariana Alves", phone: "(11) 98765-4321", n: 3, total: "469,70", pay: "pix", ago: 4, ttl: 56 },
  { id: "1041", col: "pool", client: "Bruno Tavares", phone: "(21) 99432-1187", n: 1, total: "199,00", pay: "card", ago: 12, ttl: 24 },
  { id: "1039", col: "pool", client: "Carla Nunes", phone: "(11) 98120-7765", n: 2, total: "318,80", pay: "cash", ago: 26, ttl: 9 },
  { id: "1040", col: "active", client: "Diego Souza", phone: "(31) 98800-2031", n: 4, total: "712,50", pay: "pix", ago: 8, ttl: 41, seller: "João P.", sellerAv: "JP" },
  { id: "1038", col: "active", client: "Helena Lima", phone: "(11) 99765-0098", n: 1, total: "89,90", pay: "card", ago: 17, ttl: 28, seller: "Você", sellerAv: "JR", own: true },
  { id: "1036", col: "confirm", client: "Paulo Reis", phone: "—", n: 2, total: "259,80", pay: "pix", ago: 38, seller: "Você", sellerAv: "JR" },
  { id: "1035", col: "confirm", client: "Sofia Dias", phone: "—", n: 3, total: "449,00", pay: "card", ago: 52, seller: "João P.", sellerAv: "JP" },
  { id: "1033", col: "cancel", client: "Rafael Pinto", phone: "—", n: 1, total: "129,90", pay: "cash", ago: 64 },
  { id: "1031", col: "expire", client: "Letícia Gomes", phone: "—", n: 2, total: "276,00", pay: "pix", ago: 88 },
];

const COLS = [
  { key: "pool",    name: "Pool",          cls: "col-pool" },
  { key: "active",  name: "Em atendimento", cls: "col-active" },
  { key: "confirm", name: "Confirmados",    cls: "col-confirm" },
  { key: "cancel",  name: "Cancelados",     cls: "col-cancel" },
  { key: "expire",  name: "Expirados",      cls: "col-expire" },
];

const TABS = [
  { key: "pool", name: "Pool" }, { key: "active", name: "Em atendimento" },
  { key: "confirm", name: "Confirmados" }, { key: "cancel", name: "Cancelados" },
  { key: "expire", name: "Expirados" },
];

/* ── badge de status semântico ────────────────────────── */
function PeBadge({ status }) {
  const map = {
    pending: ["is-warning", PED_I.clock, "Pendente"],
    progress: ["is-healthy", PED_I.userCheck, "Em andamento"],
    confirmed: ["is-healthy", PED_I.checkCircle, "Confirmado"],
    cancelled: ["is-zeroed", PED_I.xCircle, "Cancelado"],
    expired: ["is-zeroed", PED_I.hourglass, "Expirado"],
  };
  const [cls, ico, label] = map[status];
  return <span className={["pe-badge", cls].join(" ")}>{ico}{label}</span>;
}

/* formata ttl em "Expira em Xh Ym" / "Xm" */
function ttlLabel(min) {
  if (min == null) return null;
  if (min >= 60) return `${Math.floor(min / 60)}h ${min % 60}m`;
  return `${min}m`;
}

/* ── card do pedido (Kanban) ──────────────────────────── */
function PeCard({ o, isNew }) {
  const showTimer = (o.col === "pool" || o.col === "active") && o.ttl != null;
  const urgent = o.ttl != null && o.ttl < 30;
  const pulsing = o.ttl != null && o.ttl < 15;
  return (
    <div className={["pe-card", isNew ? "is-new" : ""].join(" ")}>
      <div className="pe-card-top">
        <span className="pe-card-id">#{o.id}</span>
        {showTimer && (
          <span className={["pe-card-timer", pulsing ? "is-urgent" : ""].join(" ")}>
            {PED_I.clock}{ttlLabel(o.ttl)}
          </span>
        )}
      </div>
      <span className="pe-card-client">{o.client}</span>
      {urgent && o.col === "pool" && <span className="pe-urgency">{PED_I.alert}Expira em breve</span>}
      <div className="pe-card-meta">
        <span className="pe-card-ago">Há {o.ago} min · {o.n} {o.n === 1 ? "item" : "itens"}</span>
        <span className="pe-card-total">R$ {o.total}</span>
      </div>
      {o.seller && (
        <span className="pe-card-seller">
          <span className="pe-seller-av">{o.sellerAv}</span>{o.seller}
        </span>
      )}
      {o.col === "pool" && <div className="pe-cardbtn pe-cardbtn--primary">{PED_I.userCheck}Assumir</div>}
      {o.col === "active" && o.own && <div className="pe-cardbtn pe-cardbtn--outline">Ver pedido</div>}
    </div>
  );
}

/* ── coluna do Kanban ─────────────────────────────────── */
function PeColumn({ col, orders, role, newIn }) {
  let list = orders.filter((o) => o.col === col.key);
  // Recorte por papel (RN081/RN082): Sales vê pool + os próprios
  if (role === "sales") {
    list = list.filter((o) => o.col === "pool" || o.own || (col.key !== "active"));
    if (col.key === "active") list = orders.filter((o) => o.col === "active" && o.own);
  }
  const muted = col.key === "cancel" || col.key === "expire";
  return (
    <div className={["pe-col", col.cls, muted ? "is-muted" : ""].join(" ")}>
      <div className="pe-col-head">
        <span className="pe-col-dot" />
        <span className="pe-col-name">{col.name}</span>
        <span className="pe-col-ct">{list.length}</span>
      </div>
      <div className="pe-col-body">
        {list.length === 0 ? (
          <div className="pe-col-empty">
            <div className="pe-col-empty-ico">{col.key === "pool" ? PED_I.package : PED_I.clock}</div>
            {col.key === "pool" ? "Nenhum pedido pendente. Os novos chegam aqui em tempo real." : "Nenhum pedido encerrado neste período."}
          </div>
        ) : (
          list.map((o) => <PeCard key={o.id} o={o} isNew={newIn === o.id} />)
        )}
      </div>
    </div>
  );
}

/* ── Painel de pedidos · Kanban (conteúdo do main) ────── */
function OrdersBoard({ role = "owner", orders = ORDERS, newIn, empty }) {
  const visible = empty ? orders.filter((o) => o.col !== "pool") : orders;
  const poolCount = visible.filter((o) => o.col === "pool").length;
  return (
    <div className="wf pe-boardcol" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="pe-head">
        <h1>Pedidos</h1>
        <span className="pe-count"><span className="pe-live" />{poolCount} no pool</span>
        <span className="pe-head-spacer" />
        <span className="pe-head-hint">{PED_I.store}atualização em tempo real</span>
      </div>
      <div className="pe-board">
        {COLS.map((c) => <PeColumn key={c.key} col={c} orders={visible} role={role} newIn={newIn} />)}
      </div>
    </div>
  );
}

/* ── Painel completo dentro do App Shell (desktop) ────── */
function OrdersShell({ role = "owner", orders, newIn, empty, collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "pe-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="pedidos" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Pedidos"]} />
        <div className="sh-main" style={{ overflow: "hidden" }}>
          <OrdersBoard role={role} orders={orders} newIn={newIn} empty={empty} />
        </div>
      </div>
    </div>
  );
}

/* ════ MOBILE — Tabs + lista de cards ═════════════════ */
function PeMobileCard({ o }) {
  const showTimer = (o.col === "pool" || o.col === "active") && o.ttl != null;
  const pulsing = o.ttl != null && o.ttl < 15;
  const status = { pool: "pending", active: "progress", confirm: "confirmed", cancel: "cancelled", expire: "expired" }[o.col];
  const [payLabel] = PAY[o.pay];
  return (
    <div className="pe-mcard">
      <div className="pe-mcard-line">
        <span className="pe-card-id" style={{ fontSize: 14 }}>#{o.id}</span>
        <PeBadge status={status} />
      </div>
      <div className="pe-mcard-line">
        <span className="pe-card-client" style={{ fontSize: 14 }}>{o.client}</span>
        {showTimer && <span className={["pe-card-timer", pulsing ? "is-urgent" : ""].join(" ")}>{PED_I.clock}{ttlLabel(o.ttl)}</span>}
      </div>
      {o.phone !== "—" && <span className="pe-mcard-phone">{PED_I.phone}{o.phone}</span>}
      <div className="pe-mcard-line">
        <span className="pe-card-sub">{o.n} {o.n === 1 ? "item" : "itens"} · <b style={{ color: "var(--wf-ink)" }}>R$ {o.total}</b></span>
        <span className="pe-card-sub">{payLabel}</span>
      </div>
      {o.col === "pool" && <div className="pe-cardbtn pe-cardbtn--primary">{PED_I.userCheck}Assumir</div>}
      {o.col === "active" && o.own && <div className="pe-cardbtn pe-cardbtn--outline">Ver pedido</div>}
    </div>
  );
}

function OrdersMobile({ active = "pool", role = "owner" }) {
  let list = ORDERS.filter((o) => o.col === active);
  if (role === "sales" && active === "active") list = list.filter((o) => o.own);
  const poolCount = ORDERS.filter((o) => o.col === "pool").length;
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)" }}>
      <WStatusBar />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", padding: "16px 16px 0" }}>
        <div className="pe-head" style={{ marginBottom: 14 }}>
          <h1 style={{ fontSize: 21 }}>Pedidos</h1>
          <span className="pe-count"><span className="pe-live" />{poolCount}</span>
        </div>
        <div className="pe-tabs">
          {TABS.map((t) => {
            const ct = ORDERS.filter((o) => o.col === t.key && (role !== "sales" || t.key !== "active" || o.own)).length;
            return (
              <span key={t.key} className={["pe-tab", t.key === active ? "is-active" : ""].join(" ")}>
                {t.name}{(t.key === "pool" || t.key === "active") && <span className="pe-tab-ct">{ct}</span>}
              </span>
            );
          })}
        </div>
        <div className="pe-mlist" style={{ paddingBottom: 16 }}>
          {list.length === 0 ? (
            <div className="pe-col-empty" style={{ marginTop: 40 }}>
              <div className="pe-col-empty-ico">{PED_I.package}</div>
              {active === "pool" ? "Nenhum pedido pendente. Os novos chegam aqui em tempo real." : "Nenhum pedido encerrado neste período."}
            </div>
          ) : list.map((o) => <PeMobileCard key={o.id} o={o} />)}
        </div>
      </div>
    </div>
  );
}

window.PED = {
  PED_I, PAY, ORDERS, COLS, TABS, ttlLabel,
  PeBadge, PeCard, PeColumn, OrdersBoard, OrdersShell,
  PeMobileCard, OrdersMobile,
};
