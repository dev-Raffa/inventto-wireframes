/* Inventto — Wireframe · Módulo Vendas no Balcão / PDV (Superfície 2 · 2.6)
   Revisão jun/2026 (sessão de design):
   • 2.6.1  /pdv — LAYOUT ÚNICO (mobile e desktop): tela inteira dedicada ao
     catálogo, SEM split-screen. Carrinho não fica visível durante a montagem;
     um FAB (canto inferior direito) abre o Sheet do carrinho.
   • 2.6.1a Dialog "Adicionar produto" — quantidade + desconto POR ITEM (RN073).
   • 2.6.1b Sheet "Carrinho da venda" — itens (preço de referência + final),
     cliente opcional (RN072), resumo, confirmar.
   • A consulta de vendas SAIU deste módulo → agora vive em /movimentacoes
     (tipo Saída · motivo Venda). Ver wireframe de Movimentações.
   Reusa o kit (window.WF_*), a casca (window.SH) e classes pv-/pd-/mv-.
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
  chevR: pic(<path d="m9 6 6 6-6 6"/>),
  check: pic(<path d="M20 6 9 17l-5-5"/>),
  alert: pic(<><path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>),
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
  { id: "p7", name: "Cardigã Tricô", variant: "Cinza / M", price: "179,90", stock: 4 },
  { id: "p8", name: "Cinto de Couro", variant: "Caramelo / U", price: "99,90", stock: 0 },
];

/* ════ CATÁLOGO (tela cheia) ═══════════════════════════ */
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
          <span className={["pv-addbtn", out ? "is-disabled" : ""].join(" ")} aria-label="Adicionar produto">{PDV_I.plus}</span>
        </div>
      </div>
    </div>
  );
}

function PvProductCardSk() {
  return (
    <div className="pv-prodcard is-sk">
      <div className="pv-prodcard-img" />
      <div className="pv-prodcard-body">
        <div className="wf-sk" style={{ width: "85%", height: 11 }} />
        <div className="wf-sk" style={{ width: "55%", height: 9, marginTop: 6 }} />
        <div className="pv-prodcard-foot">
          <div className="wf-sk" style={{ width: 64, height: 14 }} />
          <div className="wf-sk" style={{ width: 32, height: 32, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

/* tela /pdv — catálogo. scenario: base | loading | noresult */
function PvCatalogScreen({ scenario = "base", query = "espadrille" }) {
  return (
    <div className="pv-screen">
      <div className="pv-screen-head">
        <div className="pv-screen-titlerow">
          <h1 className="pv-screen-h1">Venda no balcão</h1>
          <span className="pv-cat-badge">{PDV_I.cart}Catálogo: Loja do balcão</span>
        </div>
        <div className="pv-searchrow">
          <span className="pv-search"><WInput value={scenario === "noresult" ? query : ""} placeholder="Buscar produto ou SKU no catálogo…" trail={PDV_I.search} /></span>
          <span className="pd-select"><span className="pd-grow">Todas as categorias</span><span className="pd-chev">{PDV_I.chevDown}</span></span>
        </div>
      </div>

      <div className="pv-screen-scroll">
        {scenario === "loading" && (
          <div className="pv-grid">{Array.from({ length: 8 }).map((_, i) => <PvProductCardSk key={i} />)}</div>
        )}
        {scenario === "noresult" && (
          <div className="pd-empty">
            <div className="pd-empty-ico">{PDV_I.search}</div>
            <p className="pd-empty-title">Nenhum produto encontrado para “{query}”.</p>
            <p className="pd-empty-text">Verifique o termo buscado ou limpe o filtro de categoria.</p>
          </div>
        )}
        {scenario === "base" && (
          <div className="pv-grid">{PV_PRODUCTS.map((p) => <PvProductCard key={p.id} p={p} />)}</div>
        )}
      </div>
    </div>
  );
}

/* FAB do carrinho — oculto com carrinho vazio; aparece ao 1º item */
function PvFab({ count = 3 }) {
  if (!count) return null;
  return (
    <button className="pv-fab" type="button" aria-label="Abrir carrinho">
      {PDV_I.cart}
      <span className="pv-fab-badge">{count}</span>
    </button>
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

/* ════ DIALOG 2.6.1a — Adicionar produto (max-w-sm) ════
   variant: base | discount | pct | limit | invalid */
function PvQtyStepper({ qty = 1, atMin, atMax }) {
  return (
    <span className="pv-qstepper">
      <span className={["pv-step-btn", atMin ? "is-disabled" : ""].join(" ")}>{PDV_I.minus}</span>
      <span className="pv-qstepper-val">{qty}</span>
      <span className={["pv-step-btn", atMax ? "is-disabled" : ""].join(" ")}>{PDV_I.plus}</span>
    </span>
  );
}

function AddProductDialog({ variant = "base", standalone }) {
  const p = { name: "Vestido Linho", variant: "Areia / P", price: "289,90", stock: 3 };
  const discountOn = variant === "discount" || variant === "pct" || variant === "invalid";
  const pct = variant === "pct";
  const invalid = variant === "invalid";
  const atMax = variant === "limit" || variant === "discount" || variant === "pct" || variant === "invalid";
  const qty = atMax ? p.stock : 1;
  const lowStock = p.stock < 5;
  const discVal = invalid ? "999,00" : pct ? "10" : "30,00";

  return (
    <div className={["pv-dialog wf", standalone ? "is-standalone" : ""].join(" ")}>
      <div className="pv-dialog-head">
        <span className="pv-dialog-thumb" />
        <span className="pv-dialog-meta">
          <span className="pv-dialog-name">{p.name}</span>
          <span className="pv-dialog-var">{p.variant}</span>
          <span className="pv-dialog-ref">Preço de referência · R$ {p.price}</span>
        </span>
        <span className="mv-sheet-x">{PDV_I.x}</span>
      </div>

      <div className="pv-dialog-body">
        <div className="pv-field-block">
          <span className="pv-field-label">Quantidade</span>
          <div className="pv-qty-row">
            <PvQtyStepper qty={qty} atMin={qty <= 1} atMax={atMax} />
            {lowStock && <span className="pv-qty-helper">Apenas {p.stock} disponíveis.</span>}
          </div>
        </div>

        <div className="pv-field-block pv-disc-block">
          <div className="pv-section-head">
            <span className="pv-section-label">{PDV_I.tag}Aplicar desconto <span className="pv-opt">· opcional</span></span>
            <WSwitch on={discountOn} />
          </div>
          {discountOn && (
            <>
              <div className="pv-discount-fields">
                <span className={["pv-disc-input", invalid ? "is-error" : ""].join(" ")}><WInput value={discVal} error={invalid} mono /></span>
                <span className="pv-toggle">
                  <span className={["pv-toggle-opt", !pct ? "is-active" : ""].join(" ")}>R$</span>
                  <span className={["pv-toggle-opt", pct ? "is-active" : ""].join(" ")}>%</span>
                </span>
              </div>
              {invalid
                ? <WError>O desconto não pode ser maior que o preço de referência.</WError>
                : (
                  <div className="pv-disc-readout">
                    <div className="pv-disc-line"><span className="pv-disc-k">Referência</span><span className="pv-disc-v">R$ {p.price}</span></div>
                    <div className="pv-disc-line is-discount"><span className="pv-disc-k">Desconto</span><span className="pv-disc-v">− R$ {pct ? "29,00" : "30,00"}</span></div>
                    <div className="pv-disc-line is-final"><span className="pv-disc-k">Preço final</span><span className="pv-disc-v">R$ {pct ? "260,90" : "259,90"}</span></div>
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      <div className="pv-dialog-foot">
        <div className="pv-foot-cancel"><WBtn variant="outline">Cancelar</WBtn></div>
        <div className="pv-foot-add"><WBtn disabled={invalid}>Adicionar</WBtn></div>
      </div>
    </div>
  );
}

/* ════ SHEET 2.6.1b — Carrinho da venda ════════════════ */
function PvStepper({ qty = 1, warn }) {
  return (
    <span className={["pv-stepper", warn ? "is-warn" : ""].join(" ")}>
      <span className={["pv-step-btn", qty <= 1 ? "is-disabled" : ""].join(" ")}>{PDV_I.minus}</span>
      <span className="pv-step-val">{qty}</span>
      <span className="pv-step-btn">{PDV_I.plus}</span>
    </span>
  );
}

/* item do carrinho — desconto exibido como linha (definido no Dialog) */
function PvCartItem({ it }) {
  return (
    <div className={["pv-item", it.warn ? "is-warn" : ""].join(" ")}>
      <span className="pv-item-thumb" />
      <div className="pv-item-main">
        <div className="pv-item-toprow">
          <div style={{ minWidth: 0 }}>
            <div className="pv-item-name">{it.name}</div>
            <div className="pv-item-var">{it.variant}</div>
            {it.disc && <div className="pv-item-disc">Desconto: − R$ {it.disc}</div>}
          </div>
          <span className="pv-item-del" aria-label="Remover item">{PDV_I.trash}</span>
        </div>
        <div className="pv-item-botrow">
          <PvStepper qty={it.qty} warn={it.warn} />
          <span className="pv-item-prices">
            {it.disc && <span className="pv-item-ref">R$ {it.ref}</span>}
            <span className="pv-item-sub">R$ {it.sub}</span>
          </span>
        </div>
        {it.warn && <div className="pv-item-warn">{PDV_I.alert}Apenas {it.stock} disponíveis.</div>}
      </div>
    </div>
  );
}

/* seção de cliente (RN072) — customer: empty | found | new */
function PvCustomerSection({ customer = "empty" }) {
  const filled = customer !== "empty";
  return (
    <div className="pv-section">
      <span className="pv-section-label">{PDV_I.user}Cliente <span className="pv-opt">· opcional</span></span>
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

function PvSummary({ subtotal, discount, total }) {
  return (
    <div className="pv-summary">
      <div className="pv-sum-line"><span className="pv-sum-k">Subtotal</span><span className="pv-sum-v">R$ {subtotal}</span></div>
      {discount && <div className="pv-sum-line is-discount"><span className="pv-sum-k">Total de descontos</span><span className="pv-sum-v">− R$ {discount}</span></div>}
      <div className="pv-sum-total"><span className="pv-sum-tk">Total</span><span className="pv-sum-tv">R$ {total}</span></div>
    </div>
  );
}

/* corpo do Sheet — state: filled | empty | warn | saving · side: right | bottom */
function CartSheet({ standalone, state = "filled", side = "right" }) {
  const empty = state === "empty";
  const warn = state === "warn";
  const saving = state === "saving";

  const items = [
    { id: "i1", name: "Camisa Social Algodão", variant: "Branco / M", qty: 2, ref: "259,80", sub: "259,80", stock: 12 },
    { id: "i2", name: "Vestido Linho", variant: "Areia / P", qty: warn ? 5 : 1,
      ref: warn ? "1.449,50" : "289,90", sub: warn ? "1.449,50" : "259,90", disc: warn ? null : "30,00", stock: 3, warn },
  ];
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className={["mv-sheet pv-cartsheet wf", standalone ? "is-standalone" : "", side === "bottom" ? "is-bottom" : ""].join(" ")}>
      <div className="mv-sheet-head">
        <h2 className="mv-sheet-title">{PDV_I.cart}Venda atual</h2>
        {!empty && <p className="mv-sheet-desc">{count} {count === 1 ? "item" : "itens"} · revise antes de confirmar.</p>}
        <span className="mv-sheet-x">{PDV_I.x}</span>
      </div>

      {empty ? (
        <>
          <div className="mv-sheet-body">
            <div className="pv-cart-empty">
              <span className="pv-empty-ico">{PDV_I.cart}</span>
              <span className="pv-cart-empty-text">Adicione produtos para iniciar a venda.</span>
            </div>
          </div>
          <div className="mv-sheet-foot pv-sheet-foot is-empty">
            <WBtn variant="outline" full>Ver catálogo</WBtn>
          </div>
        </>
      ) : (
        <>
          <div className="mv-sheet-body">
            <div className="pv-items">
              {items.map((it) => <PvCartItem key={it.id} it={it} />)}
            </div>
            <PvCustomerSection customer="found" />
          </div>
          <div className="mv-sheet-foot pv-sheet-foot">
            <PvSummary subtotal={warn ? "1.709,30" : "549,70"} discount={warn ? null : "30,00"} total={warn ? "1.709,30" : "519,70"} />
            <WBtn loading={saving} disabled={warn} full>{saving ? "Registrando…" : "Confirmar venda"}</WBtn>
          </div>
        </>
      )}
    </div>
  );
}

/* ── shell desktop ────────────────────────────────────── */
function NewSaleShell({ scenario = "base", block, collapsed, fab = 3 }) {
  return (
    <div className={["wf sh-app", collapsed ? "pv-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role="owner" active="pdv" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Venda no balcão"]} notif={false} />
        <div className="sh-main pv-main" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
          {block ? <NoCatalogBlock /> : <><PvCatalogScreen scenario={scenario} /><PvFab count={fab} /></>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PDV: {
    PDV_I, PV_PRODUCTS,
    PvProductCard, PvProductCardSk, PvCatalogScreen, PvFab,
    PvQtyStepper, AddProductDialog,
    PvStepper, PvCartItem, PvCustomerSection, PvSummary, CartSheet,
    NoCatalogBlock, NewSaleShell,
  },
});
