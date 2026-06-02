/* Inventto — Wireframe kit (primitivos lo-fi). Exporta em window.WF. */

const I = {
  eye: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8Z" /><circle cx="8" cy="8" r="2" /></svg>,
  chevron: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 5.5 7 9l3.5-3.5" /></svg>,
  mail: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  check: <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5 5 9.5 10 3" /></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8.5 3.5 5 7l3.5 3.5" /></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
  alert: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 9v4m0 4h.01" /><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>,
  send: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>,
  key: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7.5" cy="15.5" r="4.5" /><path d="m10.5 12.5 8-8M16 5l3 3M14 7l3 3" /></svg>
};

const Spin = () => <span className="wf-spin" />;

function WField({ label, htmlFor, children }) {
  return (
    <div className="wf-field">
      {label && <span className="wf-label">{label}</span>}
      {children}
    </div>);

}

function WInput({ placeholder, value, focus, error, trail, mono }) {
  const cls = ["wf-input", value ? "is-filled" : "", focus ? "is-focus" : "", error ? "is-error" : ""].join(" ");
  return (
    <div className={cls} style={{ height: "36px" }}>
      <span className="wf-grow" style={mono ? { fontFamily: "var(--wf-mono)" } : null}>{value || placeholder}</span>
      {trail && <span className="wf-trail">{trail}</span>}
    </div>);

}

function WSelect({ placeholder, value, focus }) {
  return (
    <div className={["wf-input", value ? "is-filled" : "", focus ? "is-focus" : ""].join(" ")}>
      <span className="wf-grow">{value || placeholder}</span>
      <span className="wf-trail">{I.chevron}</span>
    </div>);

}

function WCheckbox({ checked, error, children }) {
  return (
    <div className={["wf-check", checked ? "is-checked" : "", error ? "is-error" : ""].join(" ")}>
      <span className="wf-box">{checked && <span style={{ color: "#fff" }}>{I.check}</span>}</span>
      <span className="wf-checktext">{children}</span>
    </div>);

}

const WHelper = ({ children }) => <p className="wf-helper">{children}</p>;
const WError = ({ children }) => <p className="wf-errortext">{children}</p>;

function WBtn({ variant = "primary", loading, disabled, full, children }) {
  return (
    <div className={["wf-btn", `wf-btn--${variant}`, full ? "is-full" : "", disabled || loading ? "is-disabled" : ""].join(" ")} style={{ height: "36px" }}>
      {loading && variant !== "ghost" && variant !== "link" && <Spin />}
      {children}
    </div>);

}

/* OTP slots. filled = nº de dígitos preenchidos; sample dá os caracteres. */
function WOTP({ filled = 0, error, disabled, sample = "418205" }) {
  return (
    <div className="wf-otp">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const has = i < filled;
        const cursor = i === filled && !error && !disabled;
        const cls = ["wf-otp-slot", has ? "" : "is-empty", error ? "is-error" : "", cursor ? "is-cursor" : "", disabled ? "is-disabled" : ""].join(" ");
        return <div key={i} className={cls}>{has ? sample[i] : cursor ? "|" : ""}</div>;
      })}
    </div>);

}

const WStep = ({ children }) => <span className="wf-step">{children}</span>;
const WTag = ({ children }) => <span className="wf-tag">{children}</span>;
const WTags = ({ items }) => <span className="wf-tags">{items.map((t) => <WTag key={t}>{t}</WTag>)}</span>;
const WNote = ({ children }) => <div className="wf-note">{children}</div>;

function WToast({ ok, children }) {
  return (
    <div className={["wf-toast", ok ? "is-ok" : ""].join(" ")}>
      {ok && <span className="wf-tick">{I.check}</span>}
      <span>{children}</span>
    </div>);

}

function WFeedback({ icon = "mail", title, text }) {
  return (
    <div className="wf-feedback">
      <div className="wf-fbicon">{I[icon]}</div>
      <p className="wf-fbtitle">{title}</p>
      <p className="wf-fbtext">{text}</p>
    </div>);

}

/* faixa superior do card: passo (esq) + tags ref (dir) */
function WCardTop({ step, refs }) {
  return (
    <div className="wf-cardtop">
      <WStep>{step || ""}</WStep>
      {refs && <WTags items={refs} />}
    </div>);

}

/* caption de estado para cards de variação */
function WStateCap({ tone = "empty", name, refLabel }) {
  return (
    <div className="wf-statecap">
      <span className={`wf-statedot dot-${tone}`} />
      <span className="wf-statename">{name}</span>
      {refLabel && <span className="wf-stateref">{refLabel}</span>}
    </div>);

}

const WLogo = () =>
<span className="wf-logo"><span className="wf-logomark">i</span>Inventto</span>;


const WStatusBar = () =>
<div className="wf-statusbar">
    <span>9:41</span>
    <span className="wf-dots"><span className="wf-dot" /><span className="wf-dot" /><span className="wf-dot" /><span style={{ marginLeft: 4 }}>inventto.app</span></span>
  </div>;


/* painel de marca esquerdo (split desktop) */
function WBrandPanel() {
  return (
    <div className="wf-brandpanel">
      <span className="wf-dotgrid" />
      <span className="wf-hatch" />
      <div style={{ position: "relative", zIndex: 1 }}><WLogo /></div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 360 }}>
        <h1 className="wf-brand-h1">Sua loja inteira em um só lugar.</h1>
        <p className="wf-brand-p">Estoque auditável, catálogos com preço e uma vitrine online que recebe pedidos direto no seu painel. Sem planilha, sem perder venda no WhatsApp.</p>
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {["Controle de estoque que não mente", "Vitrine pronta para vender pelo link", "Equipe com permissões por papel"].map((t) =>
        <div className="wf-brand-li" key={t}><span className="wf-tick">{I.check}</span>{t}</div>
        )}
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
        <span className="wf-tag" style={{ background: "rgba(255,255,255,.12)", color: "rgba(239,236,230,.8)" }}>= --primary (verde-pinho)</span>
      </div>
    </div>);

}

/* SHELL desktop split-screen. children = conteúdo do card de formulário. */
function WSplit({ children, height = 660 }) {
  return (
    <div className="wf" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height }}>
      <WBrandPanel />
      <div className="wf-formpane">
        <div className="wf-card">{children}</div>
      </div>
    </div>);

}

/* SHELL mobile (~390). Painel de marca oculto (hidden lg:flex). */
function WPhone({ children, pad = 22 }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)" }}>
      <WStatusBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: pad }}>
        <div className="wf-card" style={{ maxWidth: "none" }}>{children}</div>
      </div>
    </div>);

}

/* card de variação de estado: caption + corpo (form-pane) */
function WStateCard({ tone, name, refLabel, children, pad = 22 }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-field)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="wf-card" style={{ maxWidth: "none" }}>{children}</div>
      </div>
    </div>);

}

/* Bloco OTP reutilizável (passo de verificação por código). */
function OTPStep({ title, sub, cta, state = "typing", showBack, backLabel = "Voltar para a etapa anterior", resendLabel = "Não recebeu? Reenviar código" }) {
  const map = {
    empty: { filled: 0, error: false, disabled: false },
    typing: { filled: 3, error: false, disabled: false },
    error: { filled: 6, error: true, disabled: false },
    sending: { filled: 6, error: false, disabled: true },
    cooldown: { filled: 2, error: false, disabled: false }
  }[state];
  return (
    <div style={{ textAlign: "center" }}>
      <div className="wf-otp-icon">{I.mail}</div>
      <h2 className="wf-h2">{title}</h2>
      <p className="wf-sub" style={{ marginBottom: 22 }}>{sub}</p>
      <WOTP filled={map.filled} error={map.error} disabled={map.disabled} />
      {state === "error" && <WError>Código inválido ou expirado. Tente novamente.</WError>}
      <div style={{ marginTop: 22 }}>
        <WBtn loading={state === "sending"}>{state === "sending" ? "Verificando…" : cta}</WBtn>
      </div>
      <div style={{ marginTop: 4 }}>
        <WBtn variant="ghost">{state === "cooldown" ? "Reenviar código (45s)" : resendLabel}</WBtn>
      </div>
      {showBack && <div><WBtn variant="ghost">{backLabel}</WBtn></div>}
    </div>);

}

Object.assign(window, {
  WF_I: I, WField, WInput, WSelect, WCheckbox, WHelper, WError, WBtn, WOTP,
  WStep, WTag, WTags, WNote, WToast, WFeedback, WCardTop, WStateCap,
  WLogo, WStatusBar, WBrandPanel, WSplit, WPhone, WStateCard, OTPStep
});