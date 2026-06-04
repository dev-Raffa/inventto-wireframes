/* Inventto — Wireframe · Sheet 2.8.2 Atendimento do pedido (/pedidos/:id) +
   Modal 2.8.3 Cancelar pedido. A Sheet abre lateral à direita sobre o Kanban
   (desktop) ou como painel inferior 80% (mobile). Cards: cliente · itens ·
   entrega (snapshot) · metadados. Rodapé com ações dinâmicas por micro-estado.
   Reusa o kit (window.WF_*), o painel (window.PED) e classes pe-/pd-.
   Exporta em window.PEDS. */

const { PED_I, ORDERS, MICRO, peBrl, PedBadge, PedTimer } = window.PED;
const { PedBoardShell } = window.PED;
const { SH_I } = window.SH;

/* ── ações dinâmicas no rodapé por micro-estado ───────── */
const FOOT_ACTIONS = {
  pendente:    { primary: "Iniciar atendimento", primIco: "play",  secondary: null },
  confirmando: { primary: "Iniciar separação",   primIco: "pkg",   secondary: "Cancelar" },
  separacao:   { primary: "Despachar entrega",   primIco: "truck", secondary: "Cancelar" },
  entrega:     { primary: "Finalizar pedido",    primIco: "flag",  secondary: "Cancelar" },
  finalizado:  null, // somente leitura
  cancelado:   null,
  expirado:    null,
};

/* helper de pedido por id */
const findOrder = (id) => ORDERS.find((o) => o.id === id) || ORDERS[0];

/* ════ SHEET — Atendimento ═════════════════════════════
   order: objeto de pedido · micro override opcional
   state: "view" | "saving" (ação em processamento) · savingLabel
   standalone / bottom (mobile) */
function PedSheet({ order, micro, state = "view", savingLabel, standalone, bottom }) {
  const o = order || ORDERS[0];
  const mk = micro || o.micro;
  const macro = MICRO[mk].macro;
  const isPool = macro === "pool";
  const isClosed = macro === "finalizados" || macro === "cancelados";
  const foot = FOOT_ACTIONS[mk];
  const saving = state === "saving";

  // vendedor exibido
  const sellerLabel = o.seller || (isPool ? "Pool" : "—");

  return (
    <div className={["pe-sheet wf", standalone ? "is-standalone" : "", bottom ? "is-bottom" : ""].join(" ")}>
      {bottom && <span className="pe-sheet-grab" />}
      {/* cabeçalho: navegação estrutural + id + badge */}
      <div className="pe-sheet-head">
        <div className="pe-sheet-nav">
          <span className="pe-sheet-back">{PED_I.chevL}</span>
          <span>Pedidos</span>
          <span className="pe-sheet-crumb-sep">›</span>
          <span className="pe-sheet-crumb-cur">{o.id}</span>
        </div>
        <div className="pe-sheet-headrow">
          <span className="pe-sheet-id">{o.id}</span>
          <PedBadge micro={mk} />
          {o.timer && isPool && <PedTimer value={o.timer} urgent={o.urgent} />}
        </div>
        <span className="pe-sheet-x">{PED_I.x}</span>
      </div>

      <div className="pe-sheet-body">
        {/* CARD cliente */}
        <div className="pe-dcard">
          <div className="pe-dcard-head"><span className="pe-dcard-ico">{PED_I.user}</span><span className="pe-dcard-label">Cliente</span></div>
          <div className="pe-dcard-body">
            <div className="pe-cust-row">
              <span className="pe-cust-avatar">{o.cust.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
              <span className="pe-cust-meta">
                <span className="pe-cust-name">{o.cust}</span>
                <span className="pe-cust-phone">{PED_I.phone}{o.phone}</span>
              </span>
            </div>
            <div className="pe-whatsbtn">{PED_I.whats}Chamar no WhatsApp</div>
          </div>
        </div>

        {/* CARD itens */}
        <div className="pe-dcard">
          <div className="pe-dcard-head"><span className="pe-dcard-ico">{PED_I.bag}</span><span className="pe-dcard-label">Itens · {o.items.length}</span></div>
          <div className="pe-dcard-body" style={{ paddingBottom: 4 }}>
            {o.items.map((it, i) => (
              <div key={i} className="pe-itemrow">
                <span className="pd-thumb is-sm" />
                <span className="pe-item-meta">
                  <span className="pe-item-name">{it.name}</span>
                  <span className="pe-item-attrs">{it.attrs}</span>
                </span>
                <span className="pe-item-qty">{it.qty}×</span>
                <span className="pe-item-price">{peBrl(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div className="pe-items-total">
            <span className="pe-tot-k">Total do pedido</span>
            <span className="pe-tot-v">{peBrl(o.total)}</span>
          </div>
        </div>

        {/* CARD entrega (snapshot) */}
        <div className="pe-dcard">
          <div className="pe-dcard-head"><span className="pe-dcard-ico">{PED_I.pin}</span><span className="pe-dcard-label">Endereço de entrega</span></div>
          <div className="pe-dcard-body">
            <div className="pe-addr">
              {o.addr.line1}
              <div className="pe-addr-line2">{o.addr.line2}</div>
            </div>
            <span className="pe-snapshot-tag">{PED_I.lock}Snapshot no momento do pedido · RN083</span>
          </div>
        </div>

        {/* CARD metadados */}
        <div className="pe-dcard">
          <div className="pe-dcard-head"><span className="pe-dcard-ico">{PED_I.info}</span><span className="pe-dcard-label">Detalhes</span></div>
          <div className="pe-dcard-body">
            <div className="pe-metagrid">
              <div className="pe-meta-item">
                <div className="pe-meta-k">Recebido</div>
                <div className="pe-meta-v">{PED_I.clock}{o.age}</div>
              </div>
              <div className="pe-meta-item">
                <div className="pe-meta-k">Vendedor</div>
                <div className={["pe-meta-v", o.seller ? "" : "is-muted"].join(" ")}>{PED_I.user}{sellerLabel}</div>
              </div>
              <div className="pe-meta-item is-full">
                <div className="pe-meta-k">Origem</div>
                <div className="pe-meta-v">{PED_I.store}Vitrine online · Coleção Inverno</div>
              </div>
              {isPool && o.timer && (
                <div className="pe-meta-item is-full">
                  <div className="pe-meta-k">Expira em</div>
                  <div className="pe-meta-v"><PedTimer value={o.timer} urgent={o.urgent} /></div>
                </div>
              )}
              {o.reason && (
                <div className="pe-meta-item is-full">
                  <div className="pe-meta-k">Motivo do encerramento</div>
                  <div className="pe-meta-v is-muted">{PED_I.ban}{o.reason}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* rodapé — ações dinâmicas */}
      {foot ? (
        <div className="pe-sheet-foot">
          {foot.secondary && (
            <div className="pe-foot-secondary"><WBtn variant="destructive" disabled={saving}>{foot.secondary}</WBtn></div>
          )}
          <div className="pe-foot-primary">
            <WBtn loading={saving} disabled={saving}>
              {saving ? (savingLabel || "Processando…") : foot.primary}
            </WBtn>
          </div>
        </div>
      ) : (
        <div className="pe-sheet-foot is-readonly">
          <span className="pe-readonly-note">{PED_I.lock}Pedido encerrado — somente leitura.</span>
        </div>
      )}
    </div>
  );
}

/* sheet montada sobre o Kanban (scrim) — anatomia */
function PedSheetOverShell({ order, micro, state }) {
  return (
    <div className="pe-stage">
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.92)" }}>
        <PedBoardShell scenario="base" />
      </div>
      <div className="pe-scrim" />
      <PedSheet order={order} micro={micro} state={state} />
    </div>
  );
}

/* ════ MODAL 2.8.3 — Cancelar pedido ═══════════════════
   reason: índice do motivo selecionado (-1 = nenhum → confirmar off)
   state: "view" | "saving" */
const CANCEL_REASONS = ["Falta de estoque", "Cliente solicitou", "Dados inválidos", "Área não atendida"];

function PedCancelDialog({ orderId = "#3408", reason = -1, state = "view", standalone }) {
  const saving = state === "saving";
  const disabled = reason < 0 || saving;
  return (
    <div className="pe-canceldialog wf">
      <span className="pe-cd-icon">{PED_I.alert}</span>
      <h2 className="pe-cd-title">Cancelar pedido <b>{orderId}</b>?</h2>
      <p className="pe-cd-lead">A reserva de estoque será desfeita. Selecione o motivo do cancelamento para registrar nas métricas do negócio.</p>

      <span className="wf-label">Motivo do cancelamento</span>
      <div className="pe-reasonlist" style={{ marginTop: 6, opacity: saving ? 0.55 : 1 }}>
        {CANCEL_REASONS.map((r, i) => (
          <div key={r} className={["pe-reason", i === reason ? "is-on" : ""].join(" ")}>
            <span className="pe-reason-rb" />
            <span className="pe-reason-txt">{r}</span>
          </div>
        ))}
      </div>

      <div className="pe-cd-foot">
        <div className="pe-cd-back"><WBtn variant="outline" disabled={saving}>Voltar</WBtn></div>
        <div className="pe-cd-confirm"><WBtn variant="destructive" loading={saving} disabled={disabled}>{saving ? "Cancelando…" : "Confirmar cancelamento"}</WBtn></div>
      </div>
    </div>
  );
}

/* dialog de cancelamento sobre a Sheet (scrim) — anatomia */
function PedCancelOverSheet({ order, micro = "separacao", reason = 0 }) {
  const o = order || findOrder("#3408");
  return (
    <div className="pe-stage">
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.92)" }}>
        <PedBoardShell scenario="base" />
      </div>
      <div className="pe-scrim" />
      <PedSheet order={o} micro={micro} />
      <div className="pe-dialog-scrim" />
      <div className="pe-dialog-center">
        <PedCancelDialog orderId={o.id} reason={reason} />
      </div>
    </div>
  );
}

/* sheet no mobile — painel inferior 80% sobre o painel de tabs */
function PedSheetMobile({ order, micro, state }) {
  const o = order || ORDERS[0];
  return (
    <div className="pe-stage wf" style={{ background: "var(--wf-appbg)" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <div className="wf sh-mobile" style={{ height: "100%" }}>
          <div className="sh-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div className="sh-iconbtn">{SH_I.bell}<span className="sh-bell-badge" /></div><span className="sh-avatar">JR</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pe-scrim" />
      <PedSheet order={o} micro={micro} state={state} bottom />
    </div>
  );
}

/* dialog de cancelamento no mobile — sobre a sheet inferior */
function PedCancelMobile({ order, micro = "separacao", reason = 0 }) {
  const o = order || findOrder("#3408");
  return (
    <div className="pe-stage wf" style={{ background: "var(--wf-appbg)" }}>
      <div className="pe-scrim" />
      <PedSheet order={o} micro={micro} bottom />
      <div className="pe-dialog-scrim" />
      <div className="pe-dialog-center">
        <PedCancelDialog orderId={o.id} reason={reason} />
      </div>
    </div>
  );
}

Object.assign(window, {
  PEDS: {
    FOOT_ACTIONS, CANCEL_REASONS, findOrder,
    PedSheet, PedSheetOverShell, PedCancelDialog, PedCancelOverSheet,
    PedSheetMobile, PedCancelMobile,
  },
});
