/* Inventto — Wireframe · Storefront (Superfície 3 · 2.7)
   Telas 2.7.5 Checkout (inventto.app/{slug}/pedido) · 2.7.6 Confirmação.
   Reusa window.STORE / window.STORE_D. Exporta em window.STORE_C. */

const { STORE_I, SfBtn } = window.STORE;
const { SF_CART } = window.STORE_D;

/* campo de formulário temático da vitrine */
function SfField({ label, opt, value, placeholder, focus, helper, loading, mono }) {
  const cls = ["sf-input", value ? "is-filled" : "", focus ? "is-focus" : ""].join(" ");
  return (
    <div className="sf-field">
      {label && <span className="sf-flabel">{label}{opt && <span className="sf-opt"> · opcional</span>}</span>}
      <div className={cls}>
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: mono ? "var(--wf-mono)" : null }}>
          {value || placeholder}
        </span>
        {loading && <span className="sf-spin" />}
      </div>
      {helper && <p className="sf-fhelper">{helper}</p>}
    </div>
  );
}

/* radio de pagamento (intenção apenas — RN080) */
function SfPayRadios({ sel = "pix" }) {
  const opts = [["card", "Cartão", STORE_I.card], ["cash", "Dinheiro", STORE_I.cash], ["pix", "Pix", STORE_I.pix]];
  return (
    <div className="sf-radios">
      {opts.map(([k, lab, ico]) => (
        <div key={k} className={["sf-radio", k === sel ? "is-sel" : ""].join(" ")}>
          {ico}<span className="sf-radio-lab">{lab}</span>
        </div>
      ))}
    </div>
  );
}

/* resumo do pedido (sidebar desktop / colapsável mobile) */
function SfSummary({ collapsed = false, sticky = false }) {
  return (
    <div className={["sf-summary", sticky ? "is-sticky" : ""].join(" ")}>
      <div className="sf-sum-head">
        <span className="sf-sum-h-lab">Resumo do pedido</span>
        <span className="sf-sum-h-ct">· 3 itens</span>
        {collapsed && <span className="sf-sum-chev">{STORE_I.chevD}</span>}
      </div>
      {!collapsed && (
        <div className="sf-sum-items">
          {SF_CART.map((it) => (
            <div key={it.id} className="sf-sum-item">
              <span className="sf-sum-thumb"><span className="sf-sum-qty">{it.qty}</span></span>
              <span className="sf-sum-meta">
                <span className="sf-sum-name">{it.name}</span>
                <span className="sf-sum-var">{it.var}</span>
              </span>
              <span className="sf-sum-line">{it.price}</span>
            </div>
          ))}
        </div>
      )}
      <div className="sf-sum-total">
        <span className="sf-st-lab">Total</span>
        <span className="sf-st-val">R$ 521,90</span>
      </div>
    </div>
  );
}

/* corpo do formulário de checkout
   state: idle | cep-loading | submitting */
function CheckoutForm({ state = "idle" }) {
  const submitting = state === "submitting";
  return (
    <div className="sf-checkout-form">
      <div className="sf-form-h">{STORE_I.phone}Seus dados</div>
      <SfField label="Nome completo" value="Mariana Alves" />
      <SfField label="Telefone (WhatsApp)" value="(11) 98765-4321" helper="Usamos seu WhatsApp para confirmar o pedido." />

      <div className="sf-form-h">{STORE_I.mapPin}Endereço de entrega</div>
      <div className="sf-frow c-cep">
        <SfField label="CEP" value={state === "cep-loading" ? "01310-100" : "01310-100"} loading={state === "cep-loading"} mono />
        <SfField label="Logradouro" value={state === "cep-loading" ? "" : "Av. Paulista"} placeholder={state === "cep-loading" ? "Consultando…" : "Rua, avenida…"} />
      </div>
      <div className="sf-frow c-numcomp">
        <SfField label="Número" value="1578" />
        <SfField label="Complemento" opt placeholder="Apto, bloco…" />
      </div>
      <div className="sf-frow c-citystate" style={{ marginTop: 0 }}>
        <SfField label="Bairro" value={state === "cep-loading" ? "" : "Bela Vista"} />
        <SfField label="UF" value={state === "cep-loading" ? "" : "SP"} />
      </div>
      <SfField label="Cidade" value={state === "cep-loading" ? "" : "São Paulo"} />

      <div className="sf-form-h">{STORE_I.card}Como prefere pagar?</div>
      <SfPayRadios sel="pix" />

      <div className="sf-checkout-cta">
        {submitting
          ? <div className="sf-btn sf-btn--primary"><span className="wf-spin" style={{ borderColor: "rgba(255,255,255,.4)", borderTopColor: "#fff" }} />Enviando…</div>
          : <SfBtn variant="primary">Fazer pedido</SfBtn>}
      </div>
    </div>
  );
}

/* ════ 2.7.5 CHECKOUT ═══════════════════════════════════════
   desk: form esq + resumo fixo dir · mobile: resumo colapsável no topo */
function Checkout({ desk = false, state = "idle" }) {
  if (desk) {
    return (
      <div className="sf" style={{ minHeight: "100%" }}>
        <div className="sf-detailtop"><span className="sf-back">{STORE_I.chevL}Voltar para a loja</span></div>
        <div className="sf-checkout is-desk">
          <CheckoutForm state={state} />
          <SfSummary sticky />
        </div>
      </div>
    );
  }
  return (
    <div className="sf" style={{ minHeight: "100%" }}>
      <div className="sf-detailtop"><span className="sf-back">{STORE_I.chevL}Voltar</span></div>
      <div className="sf-checkout">
        <div style={{ marginBottom: 18 }}><SfSummary collapsed /></div>
        <CheckoutForm state={state} />
      </div>
    </div>
  );
}

/* ════ 2.7.6 CONFIRMAÇÃO ════════════════════════════════════ */
function OrderConfirmed() {
  return (
    <div className="sf" style={{ minHeight: "100%" }}>
      <div className="sf-confirm">
        <div className="sf-check">{STORE_I.checkBig}</div>
        <h1>Pedido enviado!</h1>
        <p>A loja confirma com você pelo WhatsApp.</p>
        <div className="sf-confirm-card">
          <div className="sf-confirm-row"><span className="sf-cr-k">Pedido</span><span className="sf-cr-v">#1042</span></div>
          <div className="sf-confirm-row"><span className="sf-cr-k">Itens</span><span className="sf-cr-v">3 produtos</span></div>
          <div className="sf-confirm-row"><span className="sf-cr-k">Pagamento</span><span className="sf-cr-v">Pix</span></div>
          <div className="sf-confirm-row is-total"><span className="sf-cr-k">Total</span><span className="sf-cr-v">R$ 521,90</span></div>
        </div>
        <SfBtn variant="primary" icon={STORE_I.whats}>Chamar no WhatsApp agora</SfBtn>
        <SfBtn variant="ghost">Voltar para a loja</SfBtn>
      </div>
    </div>
  );
}

Object.assign(window, {
  STORE_C: {
    SfField, SfPayRadios, SfSummary, CheckoutForm, Checkout, OrderConfirmed,
  },
});
