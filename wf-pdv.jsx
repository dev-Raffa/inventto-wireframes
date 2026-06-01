/* Inventto — Wireframe · Módulo Vendas no Balcão / PDV (Superfície 2 · 2.6)
   Tela 2.6.1 Nova venda no balcão (/pdv): split-screen desktop (catálogo +
   painel do carrinho) com seções de desconto (RN073) e cliente (RN072),
   estados de estoque insuficiente (RN055/RN070), bloqueio sem catálogo (RN069)
   e sucesso. Reusa o kit (window.WF_*), a casca (window.SH) e classes pd-/mv-.
   Exporta em window.PDV. */

const { Sidebar, TopHeader, SH_I, WSwitch } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const pic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const PDV_I = {
  search: pic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  plus: pic(<path d="M12 5v14M5 12h14"/>),
  minus: pic(<path d="M5 12h14"/>),
  trash: pic(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>),
  cart: pic(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  user: pic(<><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/></>),
  tag: pic(<><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/></>),
  x: pic(<path d="M6 6 18 18M18 6 6 18"/>),
  chevDown: pic(<path d="m5 8 7 7 7-7"/>),
  chevL: pic(<path d="m15 6-6 6 6 6"/>),
  chevR: pic(<path d="m9 6 6 6-6 6"/>),
  check: pic(<path d="M20 6 9 17l-5-5"/>),
  alert: pic(<><path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>),
  link: pic(<><path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 17.5l-1 1a4 4 0 0 1-6-6l1-1"/></>),
  calendar: pic(<><rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></>),
  layers: pic(<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  phone: pic(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v2a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>),
};

/* ── catálogo de exemplo (org Ateliê Joana · catálogo "Loja do balcão") ─ */
const PV_PRODUCTS = [
  { id: "p1", name: "Camisa Social Algodão", variant: "Branco / M", price: "129,90", stock: 12 },
  { id: "p2", name: "Calça Alfaiataria", variant: "Preto / 40", price: "199,00", stock: 6 },
  { id: "p3", name: "Vestido Linho", variant: "Areia / P", price: "289,90", stock: 3 },
  { id: "p4", name: "Blazer Estruturado", variant: "Caramelo / M", price: "349,00", stock: 0 },
  { id: "p5", name: "Saia Midi Plissada", variant: "Verde / 38", price: "159,90", stock: 9 },
  { id: "p6", name: "Camiseta Pima", variant: "Branco / G", price: "89,90", stock: 24 },
];

/* ════ PRIMITIVOS · CATÁLOGO ═══════════════════════════ */
function PvProductCard({ p }) {
  const out = p.stock === 0;
  return (
    <div className={["pv-prodcard", out ? "is-out" : ""].join(" ")}>
      <div className="pv-prodcard-img">
        <span className="pv-img-label">foto do produto</span>
        {out && <span className="pv-prodcard-badge">esgotado</span>}
      </div>
      <div className="pv-prodcard-body">
        <span className="pv-prodcard-name">{p.name}</span>
        <span className="pv-prodcard-var">{p.variant}</span>
        <div className="pv-prodcard-foot">
          <span className="pv-prodcard-price">R$ {p.price}</span>
          <span className={["pv-addbtn", out ? "is-disabled" : ""].join(" ")} aria-label="Adicionar">{PDV_I.plus}</span>
        </div>
      </div>
    </div>
  );
}

function PvCatalogPanel({ title = "Loja do balcão" }) {
  return (
    <div className="pv-catalog">
      <div className="pv-cat-head">
        <div className="pv-cat-headrow">
          <h2 className="pv-cat-title">{title}</h2>
          <span className="pv-cat-badge">{PDV_I.cart}Catálogo do PDV</span>
        </div>
        <div className="pv-searchrow">
          <span className="pv-search"><WInput placeholder="Buscar produto ou SKU no catálogo…" trail={PDV_I.search} /></span>
          <span className="pd-select"><span className="pd-grow">Todas as categorias</span><span className="pd-chev">{PDV_I.chevDown}</span></span>
        </div>
      </div>
      <div className="pv-cat-scroll">
        <div className="pv-grid">
          {PV_PRODUCTS.map((p) => <PvProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}

/* ════ PRIMITIVOS · CARRINHO ═══════════════════════════ */
function PvStepper({ qty, warn, min }) {
  return (
    <span className={["pv-stepper", warn ? "is-warn" : ""].join(" ")}>
      <span className={["pv-step-btn", qty <= 1 ? "is-disabled" : ""].join(" ")}>{PDV_I.minus}</span>
      <span className="pv-step-val">{qty}</span>
      <span className="pv-step-btn">{PDV_I.plus}</span>
    </span>
  );
}

function PvCartItem({ it }) {
  return (
    <div className={["pv-item", it.warn ? "is-warn" : ""].join(" ")}>
      <span className="pv-item-thumb" />
      <div className="pv-item-main">
        <div className="pv-item-toprow">
          <div style={{ minWidth: 0 }}>
            <div className="pv-item-name">{it.name}</div>
            <div className="pv-item-var">{it.variant}</div>
          </div>
          <span className="pv-item-del" aria-label="Remover">{PDV_I.trash}</span>
        </div>
        <div className="pv-item-botrow">
          <PvStepper qty={it.qty} warn={it.warn} />
          <span className="pv-item-sub">R$ {it.sub}</span>
        </div>
        <div className="pv-item-botrow" style={{ marginTop: -2 }}>
          <span className="pv-item-unit">R$ {it.unit} un.</span>
        </div>
        {it.warn && <div className="pv-item-warn">{PDV_I.alert}Apenas {it.stock} disponíveis.</div>}
      </div>
    </div>
  );
}

/* seção de desconto (RN073) — discount: off | rs | pct */
function PvDiscountSection({ discount = "off" }) {
  const on = discount !== "off";
  const pct = discount === "pct";
  return (
    <div className="pv-section">
      <div className="pv-section-head">
        <span className="pv-section-label">{PDV_I.tag}Aplicar desconto</span>
        <WSwitch on={on} />
      </div>
      {on && (
        <>
          <div className="pv-discount-fields">
            <span className="pv-disc-input"><WInput value={pct ? "10" : "30,00"} mono /></span>
            <span className="pv-toggle">
              <span className={["pv-toggle-opt", !pct ? "is-active" : ""].join(" ")}>R$</span>
              <span className={["pv-toggle-opt", pct ? "is-active" : ""].join(" ")}>%</span>
            </span>
          </div>
          <div className="pv-disc-readout">
            <div className="pv-disc-line"><span className="pv-disc-k">Referência</span><span className="pv-disc-v">R$ 418,80</span></div>
            <div className="pv-disc-line is-discount"><span className="pv-disc-k">Desconto {pct ? "(10%)" : ""}</span><span className="pv-disc-v">− R$ {pct ? "41,88" : "30,00"}</span></div>
            <div className="pv-disc-line"><span className="pv-disc-k">Preço final</span><span className="pv-disc-v">R$ {pct ? "376,92" : "388,80"}</span></div>
          </div>
        </>
      )}
    </div>
  );
}

/* seção de cliente (RN072) — customer: empty | found | new */
function PvCustomerSection({ customer = "empty" }) {
  const filled = customer !== "empty";
  return (
    <div className="pv-section">
      <span className="pv-section-label">{PDV_I.user}Cliente <span style={{ fontWeight: 400, color: "var(--wf-faint)", fontSize: 12 }}>· opcional</span></span>
      <div className="pv-customer-field">
        <WInput value={filled ? "(11) 98765-4321" : ""} placeholder="Telefone do cliente" trail={PDV_I.phone} mono={filled} />
        {customer === "empty" && <WHelper>Opcional — para registrar no histórico do cliente.</WHelper>}
      </div>
      {customer === "found" && (
        <div className="pv-customer-found">
          <span className="pv-customer-av">MC</span>
          <span className="pv-customer-meta">
            <span className="pv-customer-name">Marina Costa</span>
            <span className="pv-customer-sub">cliente desde set/2024</span>
          </span>
          <span className="pv-customer-tick">{PDV_I.check}</span>
        </div>
      )}
      {customer === "new" && (
        <div className="pv-customer-field">
          <WField label="Nome"><WInput placeholder="Nome do cliente" /></WField>
          <WHelper>Cliente novo — será criado ao confirmar a venda.</WHelper>
        </div>
      )}
    </div>
  );
}

/* resumo */
function PvSummary({ subtotal, discount, total }) {
  return (
    <div className="pv-summary">
      <div className="pv-sum-line"><span className="pv-sum-k">Subtotal</span><span className="pv-sum-v">R$ {subtotal}</span></div>
      {discount && <div className="pv-sum-line is-discount"><span className="pv-sum-k">Desconto</span><span className="pv-sum-v">− R$ {discount}</span></div>}
      <div className="pv-sum-total"><span className="pv-sum-tk">Total</span><span className="pv-sum-tv">R$ {total}</span></div>
    </div>
  );
}

/* ════ painel do carrinho ══════════════════════════════
   state: empty | filled | warn | discount | customer-found | customer-new | saving */
function PvCartPanel({ state = "filled" }) {
  const empty = state === "empty";
  const warn = state === "warn";
  const saving = state === "saving";
  const discountOn = state === "discount";
  const customer = state === "customer-found" ? "found" : state === "customer-new" ? "new" : "empty";

  const items = [
    { id: "i1", name: "Camisa Social Algodão", variant: "Branco / M", qty: 2, unit: "129,90", sub: "259,80", stock: 12 },
    { id: "i2", name: "Vestido Linho", variant: "Areia / P", qty: warn ? 5 : 1, unit: "289,90", sub: warn ? "1.449,50" : "289,90", stock: 3, warn },
  ];
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="pv-cart">
      <div className="pv-cart-head">
        <h3 className="pv-cart-title">{PDV_I.cart}Venda atual</h3>
        {!empty && <span className="pv-cart-count">{count} {count === 1 ? "item" : "itens"}</span>}
      </div>

      {empty ? (
        <>
          <div className="pv-cart-body">
            <div className="pv-cart-empty">
              <span className="pv-empty-ico">{PDV_I.cart}</span>
              <span className="pv-cart-empty-text">Adicione produtos para iniciar a venda.</span>
            </div>
          </div>
          <div className="pv-cart-foot">
            <WBtn disabled full>Confirmar venda</WBtn>
          </div>
        </>
      ) : (
        <>
          <div className="pv-cart-body">
            <div className="pv-items">
              {items.map((it) => <PvCartItem key={it.id} it={it} />)}
            </div>
            <PvDiscountSection discount={discountOn ? "rs" : "off"} />
            <PvCustomerSection customer={customer} />
          </div>
          <div className="pv-cart-foot">
            {discountOn
              ? <PvSummary subtotal="549,70" discount="30,00" total="519,70" />
              : <PvSummary subtotal={warn ? "1.709,30" : "549,70"} total={warn ? "1.709,30" : "549,70"} />}
            <WBtn loading={saving} disabled={warn} full>{saving ? "Registrando…" : "Confirmar venda"}</WBtn>
          </div>
        </>
      )}
    </div>
  );
}

/* ════ tela /pdv (split desktop) ═══════════════════════ */
function NewSale({ cart = "filled", catalogTitle }) {
  return (
    <div className="pv-split">
      <PvCatalogPanel title={catalogTitle} />
      <PvCartPanel state={cart} />
    </div>
  );
}

/* bloqueio orientativo — sem catálogo vinculado (RN069) */
function NoCatalogBlock() {
  return (
    <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 24 }}>
      <div className="pv-block wf">
        <span className="pv-block-ico">{PDV_I.layers}</span>
        <h2 className="pv-block-title">Vincule um catálogo ao PDV para começar a vender.</h2>
        <p className="pv-block-text">O balcão usa um catálogo de PDV para saber o que está à venda e por quanto. Escolha ou crie um catálogo com ao menos um produto.</p>
        <WBtn>Escolher catálogo</WBtn>
      </div>
    </div>
  );
}

/* ── shell completa (desktop) ─────────────────────────── */
function NewSaleShell({ cart = "filled", block, collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "pv-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role="owner" active="pdv" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Venda no balcão"]} notif={false} />
        <div className="sh-main" style={{ padding: 0, overflow: "hidden" }}>
          {block ? <NoCatalogBlock /> : <NewSale cart={cart} />}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PDV: {
    PDV_I, PV_PRODUCTS,
    PvProductCard, PvCatalogPanel, PvStepper, PvCartItem,
    PvDiscountSection, PvCustomerSection, PvSummary, PvCartPanel,
    NewSale, NoCatalogBlock, NewSaleShell,
  },
});
