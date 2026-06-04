/* Inventto — Wireframe · Módulo Storefront / Vitrine pública (Superfície 3 · 2.7)
   Telas 2.7.1 Vitrine pública (inventto.app/{slug}) + molduras públicas
   (navegador desktop / telefone) + cards de produto + badges. Pública: sem
   login, sem App Shell; tema HERDADO DO CATÁLOGO (RN075) — representado por
   tokens neutros stand-in (--sf-*). Exporta em window.STORE. */

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const sic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const STORE_I = {
  search: sic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  cart: sic(<><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  star: sic(<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.6 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"/>),
  starFill: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.6 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"/></svg>,
  instagram: sic(<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></>),
  facebook: sic(<path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>),
  globe: sic(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  phone: sic(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l2 5v0a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 1-2Z"/>),
  whats: sic(<><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21Z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5"/></>),
  chevL: sic(<path d="m15 6-6 6 6 6"/>),
  chevR: sic(<path d="m9 6 6 6-6 6"/>),
  chevD: sic(<path d="m6 9 6 6 6-6"/>),
  x: sic(<path d="M6 6 18 18M18 6 6 18"/>),
  plus: sic(<path d="M12 5v14M5 12h14"/>),
  minus: sic(<path d="M5 12h14"/>),
  trash: sic(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>),
  mapPin: sic(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>),
  card: sic(<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>),
  cash: sic(<><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></>),
  pix: sic(<path d="M12 3 5 10l7 7 7-7-7-7ZM5 10 3 12l2 2M19 10l2 2-2 2"/>),
  check: sic(<path d="M20 6 9 17l-5-5"/>),
  checkBig: <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  info: sic(<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>),
  clock: sic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  storeOff: sic(<><path d="M3 9 4.5 4h15L21 9M4 9h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9ZM3 3l18 18"/></>),
  lock: sic(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
};

/* ── dados de exemplo (vitrine: Ateliê Joana · slug atelie-joana) ── */
const SF_STORE = { name: "Ateliê Joana", slug: "atelie-joana", initials: "AJ" };
const SF_CATS = ["Tudo", "Vestidos", "Blusas", "Acessórios", "Calçados", "Promoção"];
const SF_PRODUTOS = [
  { id: "p1", name: "Vestido Linho Areia", price: "R$ 189,90", feat: true },
  { id: "p2", name: "Blusa Gola Alta", price: "R$ 92,00", avail: "last" },
  { id: "p3", name: "Bolsa Tiracolo Couro", price: "R$ 240,00", was: "R$ 320,00" },
  { id: "p4", name: "Brinco Argola Dourado", price: "Consultar", hidden: true },
  { id: "p5", name: "Calça Pantalona", price: "R$ 156,00", avail: "out" },
  { id: "p6", name: "Sandália Trançada", price: "R$ 178,00" },
];

/* ════ MOLDURAS PÚBLICAS ════════════════════════════════ */
/* navegador desktop — barra de URL + corpo rolável da vitrine */
function SfBrowser({ url, children }) {
  return (
    <div className="sf-browser sf">
      <div className="sf-browser-bar">
        <span className="sf-browser-dots"><i /><i /><i /></span>
        <span className="sf-url">{STORE_I.lock}inventto.app/<b>{url || SF_STORE.slug}</b></span>
      </div>
      <div className="sf-browser-body">{children}</div>
    </div>
  );
}

/* telefone (~390) — barra de status (reusa WStatusBar) + corpo rolável */
function SfPhone({ children }) {
  return (
    <div className="sf-phone sf">
      <WStatusBar />
      <div className="sf-phone-body">{children}</div>
    </div>
  );
}

/* ════ PRIMITIVOS ═══════════════════════════════════════ */
function SfStatusBadge({ state = "open", reabre = "seg às 9h" }) {
  return state === "open"
    ? <span className="sf-status is-open"><span className="sf-dot" />Aberto agora</span>
    : <span className="sf-status is-closed"><span className="sf-dot" />Fechado · Abre {reabre}</span>;
}

function SfAvailBadge({ kind }) {
  if (kind === "last") return <span className="sf-availbadge is-last">Últimas peças!</span>;
  if (kind === "out") return <span className="sf-availbadge is-out">Esgotado</span>;
  return null;
}

/* botão temático da vitrine */
function SfBtn({ variant = "primary", icon, disabled, sm, children }) {
  return (
    <div className={["sf-btn", `sf-btn--${variant}`, sm ? "sf-btn--sm" : "", disabled ? "is-disabled" : ""].join(" ")}>
      {icon && icon}{children}
    </div>
  );
}

/* ── header / hero da vitrine ── */
function SfHeader({ status = "open", reabre }) {
  return (
    <div className="sf-hero-wrap">
      <div className="sf-cover"><span className="sf-cover-tag">imagem de capa</span></div>
      <div className="sf-header">
        <div className="sf-logo">{SF_STORE.initials}</div>
        <div className="sf-headmeta">
          <div className="sf-storename">{SF_STORE.name}</div>
          <div className="sf-headrow2">
            <span className="sf-socials">
              <span className="sf-social">{STORE_I.instagram}</span>
              <span className="sf-social">{STORE_I.facebook}</span>
              <span className="sf-social">{STORE_I.globe}</span>
            </span>
            <SfStatusBadge state={status} reabre={reabre} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── busca + chips de categoria (catálogo > 12 itens) ── */
function SfSearch({ active = "Tudo", sticky = true }) {
  return (
    <div className="sf-searchwrap" style={sticky ? null : { position: "static" }}>
      <div className="sf-search">{STORE_I.search}<span>Buscar produtos…</span></div>
      <div className="sf-chips">
        {SF_CATS.map((c) => (
          <span key={c} className={["sf-chip", c === active ? "is-active" : ""].join(" ")}>{c}</span>
        ))}
      </div>
    </div>
  );
}

/* ── card de produto (grade) ── */
function SfProductCard({ p }) {
  return (
    <div className={["sf-pcard", p.avail === "out" ? "is-out" : ""].join(" ")}>
      <div className="sf-pcard-imgwrap">
        <span className="sf-imgtag">imagem 1:1</span>
        {p.avail && <SfAvailBadge kind={p.avail} />}
        {p.feat && <span className="sf-featflag">{STORE_I.starFill}</span>}
      </div>
      <div className="sf-pcard-b">
        <span className="sf-pcard-name">{p.name}</span>
        <span className={["sf-pcard-price", p.hidden ? "is-hidden" : ""].join(" ")}>
          {p.price}{p.was && <s>{p.was}</s>}
        </span>
      </div>
    </div>
  );
}

/* ── card de produto (lista) ── */
function SfProductRow({ p }) {
  return (
    <div className={["sf-pcard is-listcard", p.avail === "out" ? "is-out" : ""].join(" ")}>
      <div className="sf-pcard-imgwrap"><span className="sf-imgtag" /></div>
      <div className="sf-pcard-b">
        <span className="sf-pcard-name">{p.name}</span>
        <span className={["sf-pcard-price", p.hidden ? "is-hidden" : ""].join(" ")}>
          {p.price}{p.was && <s>{p.was}</s>}
        </span>
      </div>
      {p.avail && <span className="sf-listbadge"><SfAvailBadge kind={p.avail} /></span>}
    </div>
  );
}

/* ── botão flutuante de carrinho ── */
function SfFab({ count = 3, total = "R$ 521,90" }) {
  return (
    <div className="sf-fab">
      {STORE_I.cart}
      <span className="sf-fab-count">{count}</span>
      <span className="sf-fab-total">{total}</span>
    </div>
  );
}

/* ── rodapé fixo: 2× CTA (RN077/RN078) ── */
function SfFooter({ orderDisabled, row }) {
  return (
    <div className={["sf-footer", row ? "is-row" : ""].join(" ")}>
      <SfBtn variant="primary" disabled={orderDisabled} icon={STORE_I.cart}>Fazer pedido</SfBtn>
      <SfBtn variant="outline" icon={STORE_I.whats}>Chamar no WhatsApp</SfBtn>
    </div>
  );
}

/* skeleton de card */
function SfSkCard() {
  return (
    <div className="sf-sk-card">
      <div className="sf-sk-img" />
      <div className="sf-sk-b">
        <div className="wf-sk" style={{ width: "80%", height: 11 }} />
        <div className="wf-sk" style={{ width: "45%", height: 12, marginTop: 8 }} />
      </div>
    </div>
  );
}

/* ════ 2.7.1 VITRINE — conteúdo (mobile-first) ════════════
   scenario: open | closed-accept | closed-noaccept | unavailable | loading
   layout: grid | list · cart: mostra FAB · aside: sidebar de filtros (desktop) */
function Vitrine({ scenario = "open", layout = "grid", cart = false, aside = false, cols }) {
  if (scenario === "unavailable") {
    return (
      <div className="sf">
        <div className="sf-unavailable">
          <div className="sf-un-ico">{STORE_I.storeOff}</div>
          <h2>Esta loja não está disponível no momento.</h2>
          <p>Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  const closed = scenario === "closed-accept" || scenario === "closed-noaccept";
  const orderDisabled = scenario === "closed-noaccept";

  const grid = (
    layout === "list"
      ? <div className="sf-grid is-list">{SF_PRODUTOS.map((p) => <SfProductRow key={p.id} p={p} />)}</div>
      : <div className={["sf-grid", cols ? `cols-${cols}` : ""].join(" ")}>
          {scenario === "loading"
            ? [0,1,2,3,4,5].map((i) => <SfSkCard key={i} />)
            : SF_PRODUTOS.map((p) => <SfProductCard key={p.id} p={p} />)}
        </div>
  );

  return (
    <div className="sf" style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <SfHeader status={closed ? "closed" : "open"} reabre="seg às 9h" />
        {scenario === "closed-accept" && (
          <div className="sf-closed-banner">
            {STORE_I.clock}
            <p><b>Estamos fechados agora.</b> Você pode fazer seu pedido — confirmamos quando reabrirmos, segunda às 9h.</p>
          </div>
        )}
        {scenario === "closed-noaccept" && (
          <div className="sf-closed-banner">
            {STORE_I.info}
            <p>Voltamos segunda às 9h. Fale com a gente no WhatsApp.</p>
          </div>
        )}
        <SfSearch active="Tudo" sticky={!aside} />
        <div className={["sf-shell", aside ? "has-aside" : ""].join(" ")}>
          {aside && (
            <aside className="sf-aside">
              <p className="sf-aside-h">Categorias</p>
              <div className="sf-filtgroup">
                {[["Tudo", 32, true], ["Vestidos", 9], ["Blusas", 7], ["Acessórios", 8], ["Calçados", 5], ["Promoção", 3]].map(([c, n, on]) => (
                  <div key={c} className={["sf-filtrow", on ? "is-on" : ""].join(" ")}>
                    <span className="sf-fcheck" />{c}<span className="sf-fct">{n}</span>
                  </div>
                ))}
              </div>
            </aside>
          )}
          <div>{grid}</div>
        </div>
      </div>
      {cart && <SfFab />}
    </div>
  );
}

Object.assign(window, {
  STORE: {
    STORE_I, SF_STORE, SF_CATS, SF_PRODUTOS,
    SfBrowser, SfPhone, SfStatusBadge, SfAvailBadge, SfBtn,
    SfHeader, SfSearch, SfProductCard, SfProductRow, SfFab, SfFooter, SfSkCard,
    Vitrine,
  },
});
