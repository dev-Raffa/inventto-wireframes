/* Inventto — Wireframe · Módulo PDV · 2.6.2 Consulta de vendas (/pdv/vendas) +
   versões mobile (nova venda com barra fixa + Sheet do carrinho · consulta em
   cards). Tabela imutável (sem ações na v1), sub-row expansível com itens da
   venda, recorte por papel (Sales vê só as próprias, sem filtro de vendedor).
   Reusa o kit, a casca e window.PDV / classes pd-. Exporta em window.PDVV. */

const { Sidebar, TopHeader, SH_I } = window.SH;
const { PDV_I, PvCatalogPanel, PvCartItem, PvDiscountSection, PvCustomerSection, PvSummary } = window.PDV;

/* ── dados de exemplo (vendas registradas) ─────────────
   itens: [{name, variant, qty, total}] · disc: string|null */
const PV_SALES = [
  { id: "v1", date: "31 mai 2026", time: "14:32", vendor: "Joana Ribeiro", vi: "JR",
    subtotal: "549,70", disc: "30,00", total: "519,70", customer: "Marina Costa",
    items: [
      { name: "Camisa Social Algodão", variant: "Branco / M", qty: 2, total: "259,80" },
      { name: "Vestido Linho", variant: "Areia / P", qty: 1, total: "289,90" },
    ] },
  { id: "v2", date: "31 mai 2026", time: "11:08", vendor: "Pedro Lima", vi: "PL",
    subtotal: "89,90", disc: null, total: "89,90", customer: null,
    items: [{ name: "Camiseta Pima", variant: "Branco / G", qty: 1, total: "89,90" }] },
  { id: "v3", date: "31 mai 2026", time: "10:21", vendor: "Joana Ribeiro", vi: "JR",
    subtotal: "508,90", disc: null, total: "508,90", customer: "Rafael Souza",
    items: [
      { name: "Blazer Estruturado", variant: "Caramelo / M", qty: 1, total: "349,00" },
      { name: "Saia Midi Plissada", variant: "Verde / 38", qty: 1, total: "159,90" },
    ] },
  { id: "v4", date: "31 mai 2026", time: "09:47", vendor: "Pedro Lima", vi: "PL",
    subtotal: "199,00", disc: "19,90", total: "179,10", customer: null,
    items: [{ name: "Calça Alfaiataria", variant: "Preto / 40", qty: 1, total: "199,00" }] },
];

/* ── célula: contador de itens com chevron ─────────────── */
function PvItemCount({ n, open }) {
  return (
    <span className={["pv-itemcount", open ? "is-open" : ""].join(" ")}>
      {n} {n === 1 ? "item" : "itens"}
      <span className="pv-ic-chev">{PDV_I.chevDown}</span>
    </span>
  );
}

/* ── sub-row expansível (itens da venda) ───────────────── */
function PvSubRow({ s, role }) {
  return (
    <tr className="pv-subrow">
      <td colSpan={role === "sales" ? 6 : 7}>
        <div className="pv-subitems">
          {s.items.map((it, i) => (
            <div className="pv-subitem" key={i}>
              <span className="pv-subitem-name">{it.name} <span className="pv-subitem-var">· {it.variant}</span></span>
              <span className="pv-subitem-qty">{it.qty} ×</span>
              <span className="pv-subitem-price">R$ {it.total}</span>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}

/* ── linha da tabela ──────────────────────────────────── */
function PvSaleRow({ s, role, open }) {
  return (
    <>
      <tr>
        <td>
          <span className="pv-datetime">
            <span className="pv-dt-date">{s.date}</span>
            <span className="pv-dt-time">{s.time}</span>
          </span>
        </td>
        {role !== "sales" && (
          <td>
            <span className="pv-vendor-cell">
              <span className="pv-vendor-av">{s.vi}</span>
              <span className="pv-vendor-name">{s.vendor}</span>
            </span>
          </td>
        )}
        <td><PvItemCount n={s.items.length} open={open} /></td>
        <td><span className="pv-money">R$ {s.subtotal}</span></td>
        <td>{s.disc ? <span className="pv-money is-discount">− R$ {s.disc}</span> : <span className="pv-money is-muted">—</span>}</td>
        <td><span className="pv-money" style={{ fontSize: 14 }}>R$ {s.total}</span></td>
        <td>{s.customer ? <span style={{ fontSize: 13, color: "var(--wf-ink)" }}>{s.customer}</span> : <span className="pv-anon">Anônimo</span>}</td>
      </tr>
      {open && <PvSubRow s={s} role={role} />}
    </>
  );
}

/* ── filtros ──────────────────────────────────────────── */
function PvFilters({ role }) {
  return (
    <div className="pv-vfilters">
      <span className="pv-daterange">
        <span className="pd-select"><span className="pd-chev" style={{ marginRight: 2 }}>{PDV_I.calendar}</span><span className="pd-grow">Hoje · 31 mai 2026</span><span className="pd-chev">{PDV_I.chevDown}</span></span>
      </span>
      {role !== "sales" && (
        <span className="pv-vendor">
          <span className="pd-select is-placeholder"><span className="pd-grow">Todos os vendedores</span><span className="pd-chev">{PDV_I.chevDown}</span></span>
        </span>
      )}
    </div>
  );
}

/* ── conteúdo /pdv/vendas (desktop) ════════════════════
   scenario: base | empty · openFor: id da venda expandida */
function SalesConsult({ scenario = "base", role = "owner", openFor }) {
  return (
    <div className="pv-vcol">
      <div>
        <h1 className="wf-h1" style={{ fontSize: 27 }}>Vendas no balcão</h1>
        <p className="ct-head-sub">Histórico de vendas registradas no PDV. {role === "sales" ? "Você vê as suas próprias vendas." : "Vendas de toda a equipe."}</p>
      </div>
      <PvFilters role={role} />
      {scenario === "empty" ? (
        <div className="pd-tablewrap">
          <div className="pd-empty">
            <div className="pd-empty-ico">{PDV_I.cart}</div>
            <p className="pd-empty-title">Nenhuma venda neste período.</p>
            <p className="pd-empty-text">Ajuste o intervalo de datas ou registre uma nova venda no balcão.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="pd-tablewrap">
            <table className="pd-table">
              <thead>
                <tr>
                  <th scope="col">Data / hora</th>
                  {role !== "sales" && <th scope="col">Vendedor</th>}
                  <th scope="col">Itens</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Desconto</th>
                  <th scope="col">Total</th>
                  <th scope="col">Cliente</th>
                </tr>
              </thead>
              <tbody>
                {PV_SALES.map((s) => <PvSaleRow key={s.id} s={s} role={role} open={openFor === s.id} />)}
              </tbody>
            </table>
          </div>
          <div className="pd-tablefoot">
            <span className="pd-count"><b>{PV_SALES.length}</b> vendas · total R$ 1.296,80</span>
            <span className="pd-pager">
              <span className="pd-pagebtn is-disabled">{PDV_I.chevL}</span>
              <span className="pd-count" style={{ margin: "0 4px" }}>1 de 1</span>
              <span className="pd-pagebtn is-disabled">{PDV_I.chevR}</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function SalesConsultShell({ scenario = "base", role = "owner", openFor }) {
  return (
    <div className="wf sh-app">
      <Sidebar role={role} active="pdv" />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Venda no balcão", "Vendas"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <SalesConsult scenario={scenario} role={role} openFor={openFor} />
        </div>
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
/* nova venda mobile: busca + resultados + barra fixa de carrinho */
function NewSaleMobile() {
  const results = window.PDV.PV_PRODUCTS.slice(0, 4);
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="pv-m-main">
        <div style={{ marginBottom: 12 }}>
          <h1 className="wf-h1" style={{ fontSize: 21 }}>Venda no balcão</h1>
        </div>
        <div className="pv-m-searchbar">
          <span className="pv-search"><WInput placeholder="Buscar produto ou SKU…" trail={PDV_I.search} /></span>
        </div>
        <div className="pv-m-results">
          {results.map((p) => {
            const out = p.stock === 0;
            return (
              <div className="pv-result" key={p.id} style={out ? { opacity: .5 } : null}>
                <span className="pv-item-thumb" />
                <span className="pv-result-meta">
                  <span className="pv-result-name">{p.name}</span>
                  <span className="pv-result-var">{p.variant}{out ? " · esgotado" : ""}</span>
                </span>
                <span className="pv-result-price">R$ {p.price}</span>
                <span className={["pv-addbtn", out ? "is-disabled" : ""].join(" ")}>{PDV_I.plus}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pv-m-cartbar">
        <span className="pv-m-cb-ico">{PDV_I.cart}<span className="pv-m-cb-badge">3</span></span>
        <span className="pv-m-cb-meta">
          <span className="pv-m-cb-label">3 itens no carrinho</span>
          <span className="pv-m-cb-total">R$ 549,70</span>
        </span>
        <span className="pv-m-cb-cta">Ver carrinho {PDV_I.chevR}</span>
      </div>
    </div>
  );
}

/* Sheet do carrinho (mobile) — abre da barra fixa */
function CartSheet({ standalone, state = "filled" }) {
  const items = [
    { id: "i1", name: "Camisa Social Algodão", variant: "Branco / M", qty: 2, unit: "129,90", sub: "259,80", stock: 12 },
    { id: "i2", name: "Vestido Linho", variant: "Areia / P", qty: 1, unit: "289,90", sub: "289,90", stock: 3 },
  ];
  return (
    <div className={["mv-sheet wf", standalone ? "is-standalone" : ""].join(" ")} style={standalone ? { maxWidth: 400 } : { width: 400 }}>
      <div className="mv-sheet-head">
        <h2 className="mv-sheet-title">Venda atual</h2>
        <p className="mv-sheet-desc">3 itens · revise antes de confirmar.</p>
        <span className="mv-sheet-x">{PDV_I.x}</span>
      </div>
      <div className="mv-sheet-body">
        <div className="pv-items">
          {items.map((it) => <PvCartItem key={it.id} it={it} />)}
        </div>
        <PvDiscountSection discount="rs" />
        <PvCustomerSection customer="found" />
      </div>
      <div className="mv-sheet-foot" style={{ flexDirection: "column", alignItems: "stretch", gap: 12 }}>
        <PvSummary subtotal="549,70" discount="30,00" total="519,70" />
        <WBtn full>Confirmar venda</WBtn>
      </div>
    </div>
  );
}

function CartSheetOverMobile() {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}><NewSaleMobile /></div>
      <div className="mv-sheet-scrim" />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 60 }}>
        <CartSheet />
      </div>
    </div>
  );
}

/* consulta de vendas mobile (cards) */
function PvSaleCard({ s, role }) {
  return (
    <div className="pv-vcard">
      <div className="pv-vcard-top">
        <div className="pv-vcard-meta">
          <span className="pv-dt-date">{s.date}</span>
          <span className="pv-dt-time">{s.time}{role !== "sales" ? ` · ${s.vendor}` : ""}</span>
        </div>
        <span className="pv-vcard-total">R$ {s.total}</span>
      </div>
      <div className="pv-vcard-foot">
        <span className="pv-channel-badge">{PDV_I.cart}PDV</span>
        <span className="pv-vcard-items">{PDV_I.chevDown}{s.items.length} {s.items.length === 1 ? "item" : "itens"}</span>
        {s.disc && <span className="pv-vcard-disc">Desconto: − R$ {s.disc}</span>}
        <span style={{ marginLeft: "auto", fontSize: 12, color: s.customer ? "var(--wf-body)" : "var(--wf-faint)" }}>{s.customer || "Anônimo"}</span>
      </div>
    </div>
  );
}

function SalesConsultMobile({ role = "owner" }) {
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
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-fieldbg)", padding: 16 }}>
        <h1 className="wf-h1" style={{ fontSize: 22 }}>Vendas no balcão</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "14px 0 16px" }}>
          <span className="pd-select"><span className="pd-chev" style={{ marginRight: 2 }}>{PDV_I.calendar}</span><span className="pd-grow">Hoje · 31 mai 2026</span><span className="pd-chev">{PDV_I.chevDown}</span></span>
          {role !== "sales" && <span className="pd-select is-placeholder"><span className="pd-grow">Todos os vendedores</span><span className="pd-chev">{PDV_I.chevDown}</span></span>}
        </div>
        <div className="pv-vcards">
          {PV_SALES.map((s) => <PvSaleCard key={s.id} s={s} role={role} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PDVV: {
    PV_SALES, PvItemCount, PvSubRow, PvSaleRow, PvFilters,
    SalesConsult, SalesConsultShell,
    NewSaleMobile, CartSheet, CartSheetOverMobile,
    PvSaleCard, SalesConsultMobile,
  },
});
