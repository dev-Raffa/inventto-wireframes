/* Inventto — Protótipo · peças interativas compartilhadas pelas 4 abordagens.
   MoneyInput real (digita em centavos), StatusPill, SelectRow, PromoField,
   VariantBlock, ProductConfigBody (núcleo reutilizável de configuração). */

const { centsToBRL: P_brl, digitsToCents: P_digits, isVariantProduct: P_isVar } = window.AP;
const APX = window.CATC.CC_I; /* ícones: plus, x, warn, check, chev, trash, search, arrow */

/* mini ícone extra (tag de promoção) */
const apIco = (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const AP_I = {
  tag: apIco(<><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.2" /></>),
  spark: apIco(<><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></>),
  layers: apIco(<><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>),
};

/* ── campo de dinheiro editável (prefixo R$ · digita centavos) ─────── */
function MoneyInput({ cents, onChange, placeholder = "0,00", invalid, disabled, small, autoFocus }) {
  const ref = useRef(null);
  useEffect(() => { if (autoFocus && ref.current) ref.current.focus(); }, [autoFocus]);
  return (
    <div className={["mv-prefix-input ap-money-wrap", invalid ? "is-error" : "", disabled ? "is-disabled" : "", small ? "is-sm" : ""].join(" ")}>
      <span className="mv-prefix">R$</span>
      <input
        ref={ref}
        className="ap-money"
        inputMode="numeric"
        disabled={disabled}
        value={cents === null || cents === undefined ? "" : P_brl(cents)}
        placeholder={placeholder}
        onChange={(e) => onChange(P_digits(e.target.value))}
      />
    </div>
  );
}

/* ── pílula de status (reusa .pd-statusbadge) ──────────────────────── */
const STATUS_META = {
  configured: { cls: "is-healthy", label: "Configurado" },
  pending: { cls: "is-warning", label: "Preço pendente" },
  attention: { cls: "is-critical", label: "Requer atenção" },
};
function StatusPill({ status, compact }) {
  const m = STATUS_META[status] || STATUS_META.pending;
  return (
    <span className={["pd-statusbadge", m.cls, compact ? "ap-pill-sm" : ""].join(" ")}>
      <span className="ap-pill-dot" />{compact ? null : m.label}
    </span>
  );
}
function StatusDot({ status }) {
  const m = STATUS_META[status] || STATUS_META.pending;
  return <span className={["ap-statusdot", m.cls].join(" ")} title={m.label} />;
}

/* ── linha selecionável (etapa de seleção) ─────────────────────────── */
function SelectRow({ p, checked, onToggle }) {
  const variant = P_isVar(p);
  const price = variant ? null : p.basePriceCents;
  return (
    <button type="button" className={["ap-selrow", checked ? "is-checked" : ""].join(" ")} onClick={onToggle}>
      <span className={["pd-cb", checked ? "is-checked" : ""].join(" ")}>{checked && APX.check}</span>
      <span className="pd-thumb is-sm" />
      <span className="ap-selmeta">
        <span className="ap-selname">{p.name}</span>
        <span className="ap-selsku">{p.sku}</span>
      </span>
      <span className="ap-selprice">
        {variant
          ? <span className="ap-selprice-var">{p.variants.length} variantes</span>
          : (price !== null
            ? <><span className="ap-selprice-lab">cadastro</span><span className="ap-selprice-val">R$ {P_brl(price)}</span></>
            : <span className="ap-selprice-none">sem preço no cadastro</span>)}
      </span>
    </button>
  );
}

/* ── campo de promoção (preço original, opcional) ──────────────────── */
function PromoField({ price, promo, orig, onChange, dense }) {
  const invalid = promo && orig !== null && orig !== 0 && price !== null && orig <= price;
  if (!promo) {
    return (
      <button type="button" className="ap-promo-add" onClick={() => onChange({ promo: true })}>
        <span className="ap-promo-add-ico">{AP_I.tag}</span>Adicionar promoção
      </button>
    );
  }
  return (
    <div className={["ap-promo-open", dense ? "is-dense" : ""].join(" ")}>
      <div className="ap-promo-head">
        <span className="ap-promo-title">{AP_I.tag}Promoção</span>
        <button type="button" className="ap-promo-remove" onClick={() => onChange({ promo: false, orig: null })}>{APX.x}Remover</button>
      </div>
      <label className="ap-field-lab">Preço original (de) <span className="ct-lab-opt">antes da promoção</span></label>
      <MoneyInput cents={orig} onChange={(c) => onChange({ orig: c })} invalid={invalid} small />
      {invalid
        ? <span className="ap-inline-err">{APX.warn}O preço original deve ser maior que o preço de venda.</span>
        : <span className="ap-inline-hint">Aparece riscado ao lado do preço na vitrine.</span>}
    </div>
  );
}

/* ── bloco de variantes (preço único vs por variante + quais entram) ── */
function VariantBlock({ p, d, onChange }) {
  const inc = d.variants.filter((v) => v.included).length;
  const setVar = (vid, patch) => onChange({ variants: d.variants.map((v) => v.id === vid ? { ...v, ...patch } : v) });
  return (
    <div className="ap-varblock">
      <div className="ap-moderow" role="radiogroup">
        <button type="button" className={["ap-radio", d.priceMode === "single" ? "is-on" : ""].join(" ")} onClick={() => onChange({ priceMode: "single" })}>
          <span className="ap-radio-dot" /><span className="ap-radio-lab">Mesmo preço para todas</span>
        </button>
        <button type="button" className={["ap-radio", d.priceMode === "perVariant" ? "is-on" : ""].join(" ")} onClick={() => onChange({ priceMode: "perVariant" })}>
          <span className="ap-radio-dot" /><span className="ap-radio-lab">Preço por variante</span>
        </button>
      </div>

      {d.priceMode === "single" && (
        <div className="ap-single-price">
          <label className="ap-field-lab">Preço de venda <span className="ap-req">obrigatório</span></label>
          <MoneyInput cents={d.price} onChange={(c) => onChange({ price: c })} invalid={d.price === 0} />
          <PromoField price={d.price} promo={d.promo} orig={d.orig} onChange={onChange} />
        </div>
      )}

      <div className="ap-varlist">
        <div className="ap-varlist-head">
          <span>Variantes no catálogo</span>
          <span className="ap-varcount">{inc} de {d.variants.length}</span>
        </div>
        {d.variants.map((v) => {
          const perV = d.priceMode === "perVariant";
          const invalid = perV && v.included && (v.price === null || v.price === 0);
          return (
            <div key={v.id} className={["ap-varrow", v.included ? "" : "is-off", perV ? "is-per" : ""].join(" ")}>
              <button type="button" className="ap-varcheck" onClick={() => setVar(v.id, { included: !v.included })}>
                <span className={["pd-cb", v.included ? "is-checked" : ""].join(" ")}>{v.included && APX.check}</span>
                <span className="ap-varname">{v.name}</span>
              </button>
              {perV && (
                <span className="ap-varprice">
                  <MoneyInput cents={v.price} onChange={(c) => setVar(v.id, { price: c })} disabled={!v.included} invalid={invalid} small />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── núcleo de configuração de um produto (layout-agnóstico) ───────── */
function ProductConfigBody({ p, d, onChange }) {
  if (P_isVar(p)) return <VariantBlock p={p} d={d} onChange={onChange} />;
  return (
    <div className="ap-simple">
      <label className="ap-field-lab">Preço de venda <span className="ap-req">obrigatório</span></label>
      <MoneyInput cents={d.price} onChange={(c) => onChange({ price: c })} invalid={d.price === 0} />
      {p.basePriceCents === null && d.price === null && (
        <span className="ap-inline-hint ap-hint-warn">{APX.warn}Este produto não tinha preço no cadastro.</span>
      )}
      <PromoField price={d.price} promo={d.promo} orig={d.orig} onChange={onChange} />
    </div>
  );
}

/* botão primário com loading (reusa wf-btn) */
function ApButton({ children, onClick, disabled, loading, variant = "primary", wide }) {
  return (
    <button type="button" className={["wf-btn", `wf-btn--${variant}`, disabled || loading ? "is-disabled" : "", wide ? "ap-btn-wide" : ""].join(" ")}
      style={{ width: "auto", cursor: disabled || loading ? "default" : "pointer" }}
      disabled={disabled || loading} onClick={onClick}>
      {loading && <span className="wf-spin" />}{children}
    </button>
  );
}

Object.assign(window, {
  APP: { MoneyInput, StatusPill, StatusDot, SelectRow, PromoField, VariantBlock, ProductConfigBody, ApButton, AP_I, APX },
});
