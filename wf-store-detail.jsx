/* Inventto — Wireframe · Storefront (Superfície 3 · 2.7)
   Telas 2.7.2 Detalhe do produto · 2.7.3 Detalhe da variação · 2.7.4 Carrinho
   (sheet/drawer). Reusa window.STORE. Exporta em window.STORE_D. */

const {
  STORE_I, SF_STORE, SfBtn,
} = window.STORE;

/* galeria de imagens (placeholder + thumbs + swipe dots) */
function SfGallery({ selThumb = 0 }) {
  return (
    <div>
      <div className="sf-gallery-main">
        <span className="sf-imgtag">imagem do produto · {selThumb + 1}/4</span>
        <span className="sf-swipe-dots">{[0,1,2,3].map((i) => <i key={i} className={i === selThumb ? "is-on" : ""} />)}</span>
      </div>
      <div className="sf-thumbs">
        {[0,1,2,3].map((i) => <span key={i} className={["sf-thumb", i === selThumb ? "is-sel" : ""].join(" ")} />)}
      </div>
    </div>
  );
}

/* seletor de variantes
   sizeSel: tamanho selecionado · colorSel: índice de cor · outSizes/outColors: esgotados */
function SfVariants({ sizeSel = "M", colorSel = 0, outSizes = ["PP"], outColors = [3], showColorName = "Areia" }) {
  const sizes = ["PP", "P", "M", "G", "GG"];
  const colors = [0, 1, 2, 3];
  return (
    <>
      <div className="sf-vargroup">
        <div className="sf-varlabel">Tamanho <span className="sf-varpick">· {sizeSel}</span></div>
        <div className="sf-varopts">
          {sizes.map((s) => {
            const out = outSizes.includes(s);
            return <span key={s} className={["sf-chipopt", s === sizeSel ? "is-sel" : "", out ? "is-out" : ""].join(" ")}>{s}</span>;
          })}
        </div>
      </div>
      <div className="sf-vargroup">
        <div className="sf-varlabel">Cor <span className="sf-varpick">· {showColorName}</span></div>
        <div className="sf-varopts">
          {colors.map((c) => {
            const out = outColors.includes(c);
            return <span key={c} className={["sf-swatch", c === colorSel ? "is-sel" : "", out ? "is-out" : ""].join(" ")} />;
          })}
        </div>
      </div>
    </>
  );
}

/* stepper de quantidade */
function SfStepper({ value = 1, disabled }) {
  return (
    <div className={["sf-stepper", disabled ? "is-disabled" : ""].join(" ")}>
      <span className="sf-step-btn">{STORE_I.minus}</span>
      <span className="sf-step-val">{value}</span>
      <span className="sf-step-btn">{STORE_I.plus}</span>
    </div>
  );
}

/* ════ 2.7.2 / 2.7.3 DETALHE DO PRODUTO ════════════════════
   variant: "default" (M selecionado) | "variation" (chega por /variacao/:id, P pré-sel)
   state: available | last | sold-out (item totalmente esgotado → CTA WhatsApp)
   desk: layout desktop (galeria esq + info dir) */
function ProductDetail({ variant = "default", state = "available", desk = false, hidePrice = false }) {
  const soldOut = state === "sold-out";
  const sizeSel = variant === "variation" ? "P" : "M";
  const colorName = variant === "variation" ? "Verde-musgo" : "Areia";
  const colorSel = variant === "variation" ? 2 : 0;

  const info = (
    <div>
      <h1 className="sf-detail-name">Vestido Linho Areia</h1>
      {hidePrice
        ? <div className="sf-detail-price is-hidden">Consultar</div>
        : <div className="sf-detail-price">R$ 189,90{state === "last" && false}</div>}
      <div className="sf-detail-avail">
        {state === "available" && <span className="sf-status is-open" style={{ fontSize: 11.5 }}><span className="sf-dot" />Disponível</span>}
        {state === "last" && <span className="sf-availbadge is-last" style={{ position: "static" }}>Últimas peças!</span>}
        {soldOut && <span className="sf-availbadge is-out" style={{ position: "static" }}>Esgotado</span>}
      </div>
      <p className="sf-detail-desc">Vestido midi em linho leve, com caimento fluido e bolsos laterais. Tecido natural, ideal para o verão. Modelagem soltinha.</p>

      <SfVariants
        sizeSel={sizeSel}
        colorSel={colorSel}
        showColorName={colorName}
        outSizes={soldOut ? ["PP","P","M","G","GG"] : ["PP"]}
        outColors={soldOut ? [0,1,2,3] : [3]}
      />

      <div className="sf-qtyrow">
        <span className="sf-qtylab">Quantidade</span>
        <SfStepper value={1} disabled={soldOut} />
      </div>

      <div className="sf-detail-cta">
        {soldOut
          ? <SfBtn variant="outline" icon={STORE_I.whats}>Falar no WhatsApp</SfBtn>
          : <SfBtn variant="primary" icon={STORE_I.cart}>Adicionar ao pedido</SfBtn>}
      </div>
    </div>
  );

  return (
    <div className="sf" style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div className="sf-detailtop">
        <span className="sf-back">{STORE_I.chevL}Voltar</span>
      </div>
      <div className={["sf-detail", desk ? "is-desk" : ""].join(" ")}>
        <SfGallery selThumb={variant === "variation" ? 2 : 0} />
        {info}
      </div>
    </div>
  );
}

/* ════ 2.7.4 CARRINHO (sheet/drawer) ════════════════════════
   side: right (desktop) | bottom (mobile) · state: filled | empty | out (RN085)
   standalone: renderiza só o painel (sem scrim) */
const SF_CART = [
  { id: "c1", name: "Vestido Linho Areia", var: "Tam. M · Areia", price: "R$ 189,90", qty: 1 },
  { id: "c2", name: "Bolsa Tiracolo Couro", var: "Caramelo", price: "R$ 240,00", qty: 1 },
  { id: "c3", name: "Brinco Argola Dourado", var: "Único", price: "R$ 46,00", qty: 2 },
];

function SfCartItem({ it, out }) {
  return (
    <div className={["sf-cartitem", out ? "is-out" : ""].join(" ")}>
      <div className="sf-cartthumb" />
      <div className="sf-cartmeta">
        <span className="sf-cartname">{it.name}</span>
        <span className="sf-cartvar">{out ? <span className="sf-cartbadge-out">Esgotado</span> : it.var}</span>
        <span className="sf-cartprice">{it.price}</span>
      </div>
      <div className="sf-cartright">
        <span className="sf-carttrash">{STORE_I.trash}</span>
        {!out && (
          <span className="sf-cart-stepper">
            <span className="sf-cs-btn">{STORE_I.minus}</span>
            <span className="sf-cs-val">{it.qty}</span>
            <span className="sf-cs-btn">{STORE_I.plus}</span>
          </span>
        )}
      </div>
    </div>
  );
}

function CartSheet({ side = "right", state = "filled", standalone = false }) {
  const empty = state === "empty";
  const hasOut = state === "out";

  const panel = (
    <div className={["sf-sheet sf", side === "right" ? "is-right" : "is-bottom"].join(" ")}>
      {side === "bottom" && <span className="sf-sheet-grab" />}
      <div className="sf-sheet-head">
        <span className="sf-sheet-title">Seu carrinho</span>
        {!empty && <span className="sf-sheet-count">{hasOut ? 3 : 4} itens</span>}
        <span className="sf-sheet-x">{STORE_I.x}</span>
      </div>

      {empty ? (
        <div className="sf-cart-empty">
          <div className="sf-ce-ico">{STORE_I.cart}</div>
          <p>Seu carrinho está vazio.</p>
          <SfBtn variant="outline" sm>Ver produtos</SfBtn>
        </div>
      ) : (
        <>
          <div className="sf-sheet-body">
            {SF_CART.map((it, i) => <SfCartItem key={it.id} it={it} out={hasOut && i === 1} />)}
            {hasOut && (
              <div className="sf-cart-outnote">
                {STORE_I.info}
                <span>Este item saiu de estoque. Remova para continuar.</span>
              </div>
            )}
          </div>
          <div className="sf-sheet-foot">
            <div className="sf-cart-summary">
              <span className="sf-sum-lab">Total</span>
              <span className="sf-sum-val">R$ 521,90</span>
            </div>
            <SfBtn variant="primary" disabled={hasOut}>Ir para o pedido</SfBtn>
            <SfBtn variant="ghost">Continuar comprando</SfBtn>
          </div>
        </>
      )}
    </div>
  );

  if (standalone) return panel;
  // overlay sobre a vitrine
  return (
    <div className="ct-overlay-stage">
      <div className="ct-scrim" style={{ alignItems: side === "bottom" ? "flex-end" : "stretch", justifyItems: side === "right" ? "end" : "stretch", padding: 0, display: "grid" }}>
        {panel}
      </div>
    </div>
  );
}

Object.assign(window, {
  STORE_D: {
    SfGallery, SfVariants, SfStepper, ProductDetail,
    SF_CART, SfCartItem, CartSheet,
  },
});
