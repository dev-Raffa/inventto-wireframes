/* Inventto — Wireframe · Módulo Dashboard (Superfície 2 · 2.9)
   Tela 2.9 Dashboard (/): tela inicial pós-login (RN092). Três blocos
   verticais — atenção imediata (RF036) · resumo de vendas com gráfico
   (RF037) · atividade recente e atalhos (RF038) — adaptados por papel
   (RN091). Reusa o kit (window.WF_*) e a casca (window.SH).
   Exporta primitivos + dados em window.DASH. */

const { Sidebar, TopHeader } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const da_ic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const DA_I = {
  bag: da_ic(<><path d="M6 2 4 6v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4Z"/><path d="M4 6h16M16 10a4 4 0 0 1-8 0"/></>),
  orders: da_ic(<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3M9 11h6M9 15h4"/></>),
  triangle: da_ic(<><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/></>),
  clock: da_ic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  trending: da_ic(<><path d="m3 17 6-6 4 4 7-7"/><path d="M17 8h4v4"/></>),
  list: da_ic(<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>),
  globe: da_ic(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></>),
  plus: da_ic(<path d="M12 5v14M5 12h14"/>),
  chevR: da_ic(<path d="m9 6 6 6-6 6"/>),
  check: da_ic(<path d="M20 6 9 17l-5-5"/>),
  checkCircle: da_ic(<><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>),
  xCircle: da_ic(<><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></>),
  package: da_ic(<><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/></>),
  swap: da_ic(<><path d="M8 4 4 8l4 4M4 8h12M16 20l4-4-4-4M20 16H8"/></>),
  cart: da_ic(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  userCheck: da_ic(<><circle cx="9" cy="8" r="3.4"/><path d="M3 20a6.5 6.5 0 0 1 11 0M16 11l2 2 4-4"/></>),
  hourglass: da_ic(<><path d="M6 3h12M6 21h12M7 3c0 5 5 5 5 9s-5 4-5 9M17 3c0 5-5 5-5 9s5 4 5 9"/></>),
  coins: da_ic(<><ellipse cx="8" cy="6" rx="6" ry="3"/><path d="M2 6v6c0 1.7 2.7 3 6 3s6-1.3 6-3V6"/><path d="M14 11.5c2.5-.3 4-1.3 4-2.5M2 12c0 1.7 2.7 3 6 3M22 9v6c0 1.7-2.7 3-6 3-1.4 0-2.7-.2-3.7-.6"/></>),
  percent: da_ic(<><path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>),
  refresh: da_ic(<><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>),
  sparkles: da_ic(<><path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z"/><path d="M19 14l.8 2.2 2.2.8-2.2.8L19 20l-.8-2.2-2.2-.8 2.2-.8L19 14Z"/></>),
};

/* ── DADOS DE EXEMPLO (org Ateliê Joana) ──────────────── */
// atenção imediata
const ATTN = {
  pendentes: 5,
  critico: 3,
  expirando: 2,
  salesExpire: 2,
};

// resumo de vendas por período (faturamento por dia)
const SALES = {
  "hoje":   { fat: "1.890,00", n: 14, trend: "+8%", days: ["8h","10h","12h","14h","16h","18h","agora"], series: [2,5,3,8,6,11,14] },
  "7dias":  { fat: "9.640,00", n: 58, trend: "+12%", days: ["seg","ter","qua","qui","sex","sáb","dom"], series: [12,9,15,11,18,22,14] },
  "30dias": { fat: "38.420,00", n: 246, trend: "+5%", days: ["1","6","11","16","21","26","30"], series: [9,14,11,17,13,21,26] },
};
const OWNER_EXTRA = { inventario: "R$ 84.210,00", margem: "42%" };
const SALES_OWN = { n: 6, total: "1.240,00" };

// movimentações recentes
const MOVES = [
  { name: "Vestido Linho Areia", dir: "in", qty: "+12", reason: "Compra", time: "há 2h" },
  { name: "Bolsa Couro Caramelo", dir: "out", qty: "−1", reason: "Venda balcão", time: "há 3h" },
  { name: "Camisa Oxford Branca", dir: "in", qty: "+20", reason: "Ajuste", time: "ontem" },
  { name: "Sandália Corda Natural", dir: "out", qty: "−2", reason: "Pedido #1038", time: "ontem" },
];

// últimos pedidos
const RECENT_ORDERS = [
  { id: "1042", client: "Mariana Alves", total: "469,70", st: "warning", stLabel: "Pendente", stIco: "clock", time: "há 4 min" },
  { id: "1040", client: "Diego Souza", total: "712,50", st: "warning", stLabel: "Em andamento", stIco: "userCheck", time: "há 8 min" },
  { id: "1036", client: "Paulo Reis", total: "259,80", st: "healthy", stLabel: "Confirmado", stIco: "checkCircle", time: "há 38 min" },
  { id: "1031", client: "Letícia Gomes", total: "276,00", st: "zeroed", stLabel: "Expirado", stIco: "hourglass", time: "há 1h" },
];

// vendas próprias do Sales
const OWN_SALES = [
  { id: "B-204", n: 3, total: "318,80", time: "há 20 min" },
  { id: "B-203", n: 1, total: "89,90", time: "há 1h" },
  { id: "B-201", n: 2, total: "256,00", time: "há 2h" },
];

/* ════ BLOCO 1 — ATENÇÃO IMEDIATA (RF036) ═════════════ */
function AttnCard({ icon, num, label, acc, badge, badgeTone }) {
  const zero = num === 0;
  return (
    <div className={["da-attn", zero ? "is-zero" : "", !zero ? `da-acc-${acc} is-flagged` : ""].join(" ")}>
      <div className="da-attn-top">
        <span className="da-attn-ico">{DA_I[icon]}</span>
        <span className="da-attn-chev">{DA_I.chevR}</span>
      </div>
      {badge && !zero && (
        <span className={["da-attn-badge", `da-badge-${badgeTone}`].join(" ")}>{DA_I.triangle}{badge}</span>
      )}
      <span className="da-attn-num">{num}</span>
      <span className="da-attn-label">{label}</span>
    </div>
  );
}

function AttnBlock({ role }) {
  if (role === "sales") {
    return (
      <div className="da-block">
        <div className="da-block-head"><h2>Atenção imediata</h2><span className="da-eyebrow">RF036</span><span className="da-link">/pedidos {DA_I.chevR}</span></div>
        <div className="da-attn-grid is-single">
          <AttnCard icon="hourglass" num={ATTN.salesExpire} label="Pedidos do pool perto de expirar" acc="warning" badge="Urgente" badgeTone="warning" />
        </div>
      </div>
    );
  }
  return (
    <div className="da-block">
      <div className="da-block-head"><h2>Atenção imediata</h2><span className="da-eyebrow">RF036</span></div>
      <div className="da-attn-grid">
        <AttnCard icon="orders" num={ATTN.pendentes} label="Pedidos pendentes" acc="warning" />
        <AttnCard icon="triangle" num={ATTN.critico} label="Estoque crítico ou zerado" acc="critical" />
        <AttnCard icon="hourglass" num={ATTN.expirando} label="Expirando em breve" acc="warning" badge="< 30 min" badgeTone="warning" />
      </div>
    </div>
  );
}

/* ════ BLOCO 2 — RESUMO DE VENDAS (RF037) ═════════════ */
/* gráfico de linha lo-fi a partir de uma série numérica */
function LineChart({ series, days, h = 120 }) {
  const W = 320, H = h, padX = 6, padTop = 10, padBot = 6;
  const max = Math.max(...series) * 1.15;
  const stepX = (W - padX * 2) / (series.length - 1);
  const pts = series.map((v, i) => {
    const x = padX + i * stepX;
    const y = padTop + (1 - v / max) * (H - padTop - padBot);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H - padBot} L${pts[0][0].toFixed(1)} ${H - padBot} Z`;
  const grids = [0.25, 0.5, 0.75].map((g) => padTop + g * (H - padTop - padBot));
  return (
    <div className="da-chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: H }}>
        {grids.map((y, i) => <line key={i} className="da-chart-grid" x1={padX} y1={y} x2={W - padX} y2={y} />)}
        <path className="da-chart-area" d={area} />
        <path className="da-chart-line" d={line} />
        {pts.map((p, i) => <circle key={i} className="da-chart-dot" cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 3.5 : 2.5} />)}
      </svg>
      <div className="da-chart-xlabels">{days.map((d, i) => <span key={i}>{d}</span>)}</div>
    </div>
  );
}

function SalesBlock({ role, period = "30dias" }) {
  // Sales — contador simples, sem gráfico
  if (role === "sales") {
    return (
      <div className="da-sales">
        <div className="da-sales-top"><h2>Suas vendas hoje</h2><span className="da-eyebrow" style={{ fontFamily: "var(--wf-mono)", fontSize: 10, color: "var(--wf-faint)" }}>RF037</span></div>
        <div className="da-sales-simple">
          <div>
            <div className="da-ss-big">{SALES_OWN.n}</div>
            <div className="da-ss-k">vendas realizadas</div>
          </div>
          <div className="da-ss-sep" />
          <div>
            <div className="da-ss-big">R$ {SALES_OWN.total}</div>
            <div className="da-ss-k">total do dia</div>
          </div>
        </div>
      </div>
    );
  }
  // Manager / Owner — gráfico + período
  const d = SALES[period];
  const periods = [["hoje", "Hoje"], ["7dias", "7 dias"], ["30dias", "30 dias"]];
  return (
    <div className="da-sales">
      <div className="da-sales-top">
        <h2>Resumo de vendas</h2>
        <div className="da-seg">
          {periods.map(([k, lbl]) => <span key={k} className={k === period ? "is-active" : ""}>{lbl}</span>)}
        </div>
      </div>
      <div className="da-metric-main">
        <span className="da-metric-val">R$ {d.fat}</span>
        <span className="da-metric-trend">{DA_I.trending}{d.trend}</span>
      </div>
      <div className="da-metric-cap">Faturamento do período · <b>{d.n}</b> vendas (balcão + pedidos confirmados)</div>
      <LineChart series={d.series} days={d.days} />
      {role === "owner" && (
        <div className="da-owner">
          <div className="da-owner-cell">
            <span className="da-owner-k">{DA_I.coins}Inventário a custo</span>
            <div className="da-owner-v">{OWNER_EXTRA.inventario}</div>
            <span className="da-owner-lock">{WF_I.eye} exclusivo do Dono · RN091</span>
          </div>
          <div className="da-owner-sep" />
          <div className="da-owner-cell">
            <span className="da-owner-k">{DA_I.percent}Margem média</span>
            <div className="da-owner-v">{OWNER_EXTRA.margem}</div>
            <span className="da-owner-lock">{WF_I.eye} exclusivo do Dono · RN091</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════ BLOCO 3 — ATIVIDADE E ATALHOS (RF038) ══════════ */
function MovesCard() {
  return (
    <div className="da-card">
      <div className="da-card-head">{DA_I.swap}<h3>Movimentações recentes</h3><span className="da-link">Ver histórico</span></div>
      <div className="da-list">
        {MOVES.map((m, i) => (
          <div className="da-row" key={i}>
            <span className={["da-row-ico", m.dir === "in" ? "is-in" : "is-out"].join(" ")}>{m.dir === "in" ? DA_I.plus : DA_I.swap}</span>
            <span className="da-row-main">
              <span className="da-row-name">{m.name}</span>
              <span className="da-row-sub">{m.dir === "in" ? "Entrada" : "Saída"} · {m.reason}</span>
            </span>
            <span className="da-row-right">
              <span className={["da-row-qty", m.dir === "in" ? "is-in" : "is-out"].join(" ")}>{m.qty}</span>
              <span className="da-row-time">{m.time}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersCard() {
  return (
    <div className="da-card">
      <div className="da-card-head">{DA_I.orders}<h3>Últimos pedidos</h3><span className="da-link">Ver painel</span></div>
      <div className="da-list">
        {RECENT_ORDERS.map((o) => (
          <div className="da-row" key={o.id}>
            <span className="da-row-ico">{DA_I.bag}</span>
            <span className="da-row-main">
              <span className="da-row-name">{o.client}</span>
              <span className="da-row-sub"><span className="da-id">#{o.id}</span> · {o.time}</span>
            </span>
            <span className="da-row-right">
              <span className={["da-st", `is-${o.st}`].join(" ")}>{DA_I[o.stIco]}{o.stLabel}</span>
              <span className="da-row-val">R$ {o.total}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OwnSalesCard() {
  return (
    <div className="da-card">
      <div className="da-card-head">{DA_I.cart}<h3>Suas últimas vendas</h3></div>
      <div className="da-list">
        {OWN_SALES.map((s) => (
          <div className="da-row" key={s.id}>
            <span className="da-row-ico">{DA_I.cart}</span>
            <span className="da-row-main">
              <span className="da-row-name"><span style={{ fontFamily: "var(--wf-mono)" }}>#{s.id}</span></span>
              <span className="da-row-sub">{s.n} {s.n === 1 ? "item" : "itens"} · {s.time}</span>
            </span>
            <span className="da-row-right"><span className="da-row-val">R$ {s.total}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Shortcuts({ role }) {
  if (role === "sales") {
    return <div className="da-shortcuts"><div className="da-sc is-primary">{DA_I.plus}Nova venda</div></div>;
  }
  return (
    <div className="da-shortcuts">
      <div className="da-sc is-primary">{DA_I.plus}Nova venda</div>
      <div className="da-sc">{DA_I.plus}Entrada de estoque</div>
      <div className="da-sc">{DA_I.plus}Produto</div>
    </div>
  );
}

function ActivityBlock({ role }) {
  if (role === "sales") {
    return (
      <div className="da-block">
        <div className="da-block-head"><h2>Atividade e atalhos</h2><span className="da-eyebrow">RF038</span></div>
        <div className="da-col" style={{ gap: 12 }}>
          <OwnSalesCard />
          <Shortcuts role={role} />
        </div>
      </div>
    );
  }
  return (
    <div className="da-block">
      <div className="da-block-head"><h2>Atividade e atalhos</h2><span className="da-eyebrow">RF038</span></div>
      <div className="da-col" style={{ gap: 12 }}>
        <MovesCard />
        <OrdersCard />
        <Shortcuts role={role} />
      </div>
    </div>
  );
}

/* ════ DASHBOARD (conteúdo do main · desktop) ═════════ */
function GreetHeader({ role }) {
  const sub = role === "sales"
    ? "Aqui estão suas vendas e os pedidos a atender · Ateliê Joana"
    : "Aqui está o resumo operacional de hoje · Ateliê Joana";
  return (
    <div className="da-greet">
      <div>
        <h1>Bom dia, Joana</h1>
        <p>{sub}</p>
      </div>
      <span className="da-live"><span className="da-dot" />Atualizado agora</span>
    </div>
  );
}

function DashView({ role = "owner", period = "30dias" }) {
  return (
    <div className="da wf">
      <div className="da-scroll">
        <GreetHeader role={role} />
        <div className="da-grid">
          <div className="da-col">
            <AttnBlock role={role} />
            <ActivityBlock role={role} />
          </div>
          <div className="da-col">
            <SalesBlock role={role} period={period} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashShell({ role = "owner", period = "30dias", collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "da-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="dash" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início"]} />
        <div className="sh-main" style={{ overflow: "hidden" }}>
          <DashView role={role} period={period} />
        </div>
      </div>
    </div>
  );
}

/* ════ ONBOARDING — primeiro uso (RN091) ══════════════ */
const ONB_STEPS = [
  { t: "Cadastre seu primeiro produto", s: "Defina nome, SKU e estoque mínimo.", route: "/produtos/novo" },
  { t: "Crie um catálogo", s: "Defina o que você vende e por quanto.", route: "/catalogos" },
  { t: "Publique sua vitrine", s: "Coloque sua loja online para receber pedidos.", route: "/catalogos" },
];
function Onboarding({ done = 1, activeStep = 1 }) {
  return (
    <div className="da wf">
      <div className="da-scroll" style={{ display: "grid", placeItems: "center", padding: "30px 24px" }}>
        <div className="da-onb">
          <div className="da-onb-hero">
            <span className="da-onb-ico">{DA_I.sparkles}</span>
            <h1>Vamos preparar sua loja.</h1>
            <p>Três passos para começar a vender. Conclua na ordem — cada um destrava o próximo.</p>
          </div>
          <div className="da-onb-steps">
            {ONB_STEPS.map((st, i) => {
              const isDone = i < done;
              const isActive = i === activeStep && !isDone;
              return (
                <div key={i} className={["da-onb-card", isDone ? "is-done" : "", isActive ? "is-active" : ""].join(" ")}>
                  <span className="da-onb-num">{isDone ? DA_I.check : i + 1}</span>
                  <span className="da-onb-body">
                    <span className="da-onb-t">{st.t}</span>
                    <span className="da-onb-s">{st.s} <span style={{ fontFamily: "var(--wf-mono)", fontSize: 10.5, color: "var(--wf-faint)" }}>{st.route}</span></span>
                  </span>
                  {isDone
                    ? <span className="da-onb-done-tag">{DA_I.checkCircle}Concluído</span>
                    : <span className="da-onb-cta">{isActive ? "Começar" : "Começar"}{DA_I.chevR}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function OnboardingShell({ done = 1, activeStep = 1 }) {
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="dash" />
      <div className="sh-inset">
        <TopHeader crumb={["Início"]} />
        <div className="sh-main" style={{ overflow: "hidden" }}>
          <Onboarding done={done} activeStep={activeStep} />
        </div>
      </div>
    </div>
  );
}

/* ════ ESTADOS — carregando / erro de bloco isolado ═══ */
function BlockError() {
  return (
    <div className="da-block-err">
      {DA_I.triangle}
      <span className="da-be-t">Não foi possível carregar.</span>
      <span className="da-be-retry">{DA_I.refresh}Tentar de novo</span>
    </div>
  );
}

/* dashboard com 1 bloco degradado isolado (resumo de vendas falhou) */
function DashErrorView({ role = "owner" }) {
  return (
    <div className="da wf">
      <div className="da-scroll">
        <GreetHeader role={role} />
        <div className="da-grid">
          <div className="da-col">
            <AttnBlock role={role} />
            <ActivityBlock role={role} />
          </div>
          <div className="da-col">
            <div className="da-block">
              <div className="da-block-head"><h2>Resumo de vendas</h2><span className="da-eyebrow">RF037</span></div>
              <BlockError />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function DashErrorShell({ role = "owner" }) {
  return (
    <div className="wf sh-app">
      <Sidebar role={role} active="dash" />
      <div className="sh-inset">
        <TopHeader crumb={["Início"]} />
        <div className="sh-main" style={{ overflow: "hidden" }}>
          <DashErrorView role={role} />
        </div>
      </div>
    </div>
  );
}

/* skeleton por bloco (carregando) */
function DashSkeleton() {
  const sk = (w, h, mt = 0, r = 6) => <div className="wf-sk" style={{ width: w, height: h, marginTop: mt, borderRadius: r }} />;
  const attnSk = (
    <div style={{ flex: 1, border: "1.5px solid var(--wf-line-soft)", borderRadius: 13, background: "var(--wf-field)", padding: 15 }}>
      {sk(34, 34, 0, 9)}{sk("60%", 28, 12)}{sk("80%", 11, 10)}
    </div>
  );
  const cardSk = (
    <div style={{ border: "1.5px solid var(--wf-line-soft)", borderRadius: 14, background: "var(--wf-field)", padding: 16 }}>
      {sk("45%", 13)}
      {[0, 1, 2].map((i) => <div key={i} style={{ display: "flex", gap: 11, alignItems: "center", marginTop: 14 }}><div className="wf-sk" style={{ width: 30, height: 30, borderRadius: 8 }} />{sk("70%", 11)}</div>)}
    </div>
  );
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="dash" />
      <div className="sh-inset">
        <TopHeader crumb={["Início"]} />
        <div className="sh-main" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ marginBottom: 22 }}>{sk(220, 24)}{sk(300, 12, 9)}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", gap: 12 }}>{attnSk}{attnSk}{attnSk}</div>
                {cardSk}{cardSk}
              </div>
              <div style={{ border: "1.5px solid var(--wf-line-soft)", borderRadius: 14, background: "var(--wf-field)", padding: 18 }}>
                {sk("50%", 14)}{sk("65%", 30, 14)}{sk("90%", 11, 10)}
                <div className="wf-sk" style={{ width: "100%", height: 120, marginTop: 16, borderRadius: 8 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════ MOBILE — coluna única ══════════════════════════ */
function DashMobile({ role = "owner", period = "hoje" }) {
  return (
    <div className="da-m wf">
      <WStatusBar />
      <div className="da-m-scroll">
        <GreetHeader role={role} />
        <AttnBlock role={role} />
        <SalesBlock role={role} period={period} />
        <ActivityBlock role={role} />
      </div>
    </div>
  );
}
function OnboardingMobile() {
  return (
    <div className="da-m wf">
      <WStatusBar />
      <div className="da-m-scroll">
        <div className="da-onb-hero" style={{ marginTop: 8 }}>
          <span className="da-onb-ico">{DA_I.sparkles}</span>
          <h1 style={{ fontSize: 22 }}>Vamos preparar sua loja.</h1>
          <p>Três passos para começar a vender.</p>
        </div>
        <div className="da-onb-steps">
          {ONB_STEPS.map((st, i) => {
            const isDone = i < 1, isActive = i === 1;
            return (
              <div key={i} className={["da-onb-card", isDone ? "is-done" : "", isActive ? "is-active" : ""].join(" ")} style={{ flexWrap: "wrap" }}>
                <span className="da-onb-num">{isDone ? DA_I.check : i + 1}</span>
                <span className="da-onb-body"><span className="da-onb-t">{st.t}</span><span className="da-onb-s">{st.s}</span></span>
                {isDone ? <span className="da-onb-done-tag">{DA_I.checkCircle}Feito</span> : <span className="da-onb-cta">Começar{DA_I.chevR}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.DASH = {
  DA_I, ATTN, SALES, OWNER_EXTRA, MOVES, RECENT_ORDERS, OWN_SALES, ONB_STEPS,
  AttnCard, AttnBlock, LineChart, SalesBlock, MovesCard, OrdersCard, OwnSalesCard,
  Shortcuts, ActivityBlock, GreetHeader, DashView, DashShell,
  Onboarding, OnboardingShell, BlockError, DashErrorView, DashErrorShell,
  DashSkeleton, DashMobile, OnboardingMobile,
};
