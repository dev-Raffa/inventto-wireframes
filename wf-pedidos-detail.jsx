/* Inventto — Wireframe · Módulo Pedidos Online (Superfície 2 · 2.8)
   Telas 2.8.2 Atendimento do pedido (/pedidos/:id) — Sheet lateral sobre o
   Kanban no desktop e página completa no mobile — e 2.8.3 Modal Cancelar
   pedido. Reusa o kit (window.WF_*), a casca (window.SH) e window.PED.
   Exporta em window.PEDD. */

const { PED_I, PAY, OrdersBoard, PeBadge, ttlLabel } = window.PED;

/* pedido de exemplo aberto (#1042 · Mariana Alves) */
const DETAIL = {
  id: "1042",
  client: "Mariana Alves",
  initials: "MA",
  phone: "(11) 98765-4321",
  items: [
    { name: "Vestido de Linho", variant: "Areia / P", qty: 1, price: "289,90" },
    { name: "Camiseta Pima", variant: "Branco / G", qty: 2, price: "179,80" },
  ],
  total: "469,70",
  pay: "pix",
  address: { line1: "Av. Paulista, 1578", line2: "Apto 92 · Bela Vista", city: "São Paulo · SP", cep: "01310-100" },
  placedAt: "Hoje, 14:32",
  origin: "Coleção Verão",
  ttl: 56,
};

/* ── cartões de conteúdo ──────────────────────────────── */
function ClientCard() {
  return (
    <div className="pe-dcard">
      <div className="pe-dcard-head">{PED_I.user}Cliente</div>
      <div className="pe-dcard-body">
        <div className="pe-client">
          <span className="pe-client-av">{DETAIL.initials}</span>
          <span className="pe-client-meta">
            <span className="pe-client-name">{DETAIL.client}</span>
            <span className="pe-client-phone">{DETAIL.phone}</span>
          </span>
        </div>
        <div className="pe-wa-btn">{PED_I.whats}Chamar no WhatsApp</div>
      </div>
    </div>
  );
}

function ItemsCard() {
  const [payLabel, payIco] = PAY[DETAIL.pay];
  return (
    <div className="pe-dcard">
      <div className="pe-dcard-head">{PED_I.package}Itens do pedido</div>
      <div className="pe-dcard-body">
        <div className="pe-items">
          {DETAIL.items.map((it) => (
            <div key={it.name} className="pe-item">
              <span className="pe-item-thumb"><span className="pe-item-qty">{it.qty}</span></span>
              <span className="pe-item-main">
                <span className="pe-item-name">{it.name}</span>
                <span className="pe-item-var">{it.variant}</span>
              </span>
              <span className="pe-item-price">R$ {it.price}</span>
            </div>
          ))}
        </div>
        <div className="pe-sum">
          <div className="pe-sum-row"><span>Subtotal</span><span className="pe-sum-v">R$ {DETAIL.total}</span></div>
        </div>
        <div className="pe-sum-total">
          <span className="pe-st-k">Total</span>
          <span className="pe-st-v">R$ {DETAIL.total}</span>
        </div>
        <div className="pe-pay">{payIco}Pagamento: <b>{payLabel}</b></div>
      </div>
    </div>
  );
}

function DeliveryCard() {
  const a = DETAIL.address;
  return (
    <div className="pe-dcard">
      <div className="pe-dcard-head">{PED_I.mapPin}Entrega</div>
      <div className="pe-dcard-body">
        <div className="pe-address">
          <span className="pe-addr-strong">{a.line1}</span><br />
          {a.line2}<br />
          {a.city} · CEP {a.cep}
        </div>
        <div className="pe-snapshot">{PED_I.lock}Endereço registrado no momento do pedido</div>
      </div>
    </div>
  );
}

function MetaCard({ situation, seller }) {
  const sellerLabel = situation === "pool" ? "Pool" : (seller || "Você");
  return (
    <div className="pe-dcard">
      <div className="pe-dcard-head">{PED_I.calendar}Detalhes</div>
      <div className="pe-dcard-body">
        <div className="pe-meta-list">
          <div className="pe-meta-row"><span className="pe-meta-k">{PED_I.calendar}Recebido</span><span className="pe-meta-v">{DETAIL.placedAt}</span></div>
          <div className="pe-meta-row"><span className="pe-meta-k">{PED_I.user}Vendedor</span><span className="pe-meta-v">{sellerLabel}</span></div>
          <div className="pe-meta-row"><span className="pe-meta-k">{PED_I.store}Origem</span><span className="pe-meta-v">Vitrine online · {DETAIL.origin}</span></div>
          {(situation === "pool" || situation === "progress") && (
            <div className="pe-meta-row"><span className="pe-meta-k">{PED_I.hourglass}Expira em</span><span className="pe-meta-v" style={{ color: "var(--pe-danger)" }}><span className="pe-mono">{ttlLabel(DETAIL.ttl)}</span></span></div>
          )}
        </div>
      </div>
    </div>
  );
}

/* botão outline destrutivo (não existe no kit base) */
function PeDestructiveOutline({ children }) {
  return (
    <div className="wf-btn wf-btn--outline" style={{ borderColor: "var(--pe-danger)", color: "var(--pe-danger)" }}>{children}</div>
  );
}

/* área de ações por situação (RF034) */
function ActionArea({ situation = "pool", confirming }) {
  if (situation === "pool") {
    return (
      <div className="pe-actions">
        <WBtn>{PED_I.userCheck}Assumir pedido</WBtn>
        <p className="pe-action-hint">Ao assumir, o pedido sai do pool e fica sob sua responsabilidade.</p>
      </div>
    );
  }
  if (situation === "progress") {
    return (
      <div className="pe-actions">
        <WBtn loading={confirming}>{confirming ? "Confirmando…" : "Confirmar pedido"}</WBtn>
        <PeDestructiveOutline>Cancelar pedido</PeDestructiveOutline>
        <p className="pe-action-hint">Confirmar baixa o estoque definitivamente. Cancelar libera a reserva.</p>
      </div>
    );
  }
  const note = {
    confirmed: ["checkCircle", "Pedido confirmado — estoque baixado. Somente leitura."],
    cancelled: ["xCircle", "Pedido cancelado — reserva de estoque liberada. Somente leitura."],
    expired: ["hourglass", "Pedido expirado — reserva liberada automaticamente. Somente leitura."],
  }[situation];
  return (
    <div className="pe-readonly">{PED_I[note[0]]}<span>{note[1]}</span></div>
  );
}

/* badge + timer do cabeçalho conforme situação */
function statusOf(situation) {
  return { pool: "pending", progress: "progress", confirmed: "confirmed", cancelled: "cancelled", expired: "expired" }[situation];
}

/* ════ SHEET de atendimento (desktop · sobre o Kanban) ══ */
function OrderSheet({ situation = "pool", confirming, seller, standalone }) {
  const showTimer = situation === "pool" || situation === "progress";
  const urgent = DETAIL.ttl < 30;
  return (
    <div className={["pe-sheet wf", standalone ? "is-standalone" : ""].join(" ")}>
      <div className="pe-sheet-head">
        <div className="pe-back" style={{ marginBottom: 9 }}>{PED_I.chevL}Pedidos</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span className="pe-detail-id">#{DETAIL.id}</span>
          <PeBadge status={statusOf(situation)} />
          {showTimer && <span className={["pe-bigtimer", urgent ? "" : ""].join(" ")}>{PED_I.clock}Expira em {ttlLabel(DETAIL.ttl)}</span>}
        </div>
        <span className="pe-sheet-x">{PED_I.x}</span>
      </div>
      <div className="pe-sheet-body">
        <ClientCard />
        <ItemsCard />
        <DeliveryCard />
        <MetaCard situation={situation} seller={seller} />
      </div>
      <div className="pe-sheet-foot">
        <ActionArea situation={situation} confirming={confirming} />
      </div>
    </div>
  );
}

/* sheet montado sobre o Kanban (com scrim) */
function OrderSheetOverBoard({ situation = "pool", confirming, role = "owner" }) {
  return (
    <div className="pe-sheet-stage">
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.92)" }}>
        <div className="wf sh-app" style={{ height: "100%" }}>
          <window.SH.Sidebar role={role} active="pedidos" />
          <div className="sh-inset">
            <window.SH.TopHeader crumb={["Início", "Pedidos"]} />
            <div className="sh-main" style={{ overflow: "hidden" }}><OrdersBoard role={role} /></div>
          </div>
        </div>
      </div>
      <div className="pe-sheet-scrim" />
      <OrderSheet situation={situation} confirming={confirming} />
    </div>
  );
}

/* ════ PÁGINA COMPLETA (mobile · /pedidos/:id) ═════════ */
function OrderDetailPage({ situation = "progress", confirming, seller }) {
  const showTimer = situation === "pool" || situation === "progress";
  const urgent = DETAIL.ttl < 30;
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)" }}>
      <WStatusBar />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "14px 16px 20px" }}>
        <div className="pe-back" style={{ marginBottom: 14 }}>{PED_I.chevL}Pedidos</div>
        <div className="pe-detail-top">
          <span className="pe-detail-id">#{DETAIL.id}</span>
          <PeBadge status={statusOf(situation)} />
          {showTimer && <span className={["pe-bigtimer", urgent ? "is-urgent" : ""].join(" ")}>{PED_I.clock}Expira em {ttlLabel(DETAIL.ttl)}</span>}
        </div>
        <div className="pe-detail-col">
          <ClientCard />
          <ItemsCard />
          <DeliveryCard />
          <MetaCard situation={situation} seller={seller} />
        </div>
      </div>
      <div className="pe-foot">
        <ActionArea situation={situation} confirming={confirming} />
      </div>
    </div>
  );
}

/* ════ MODAL: cancelar pedido (2.8.3) ════════════════ */
function CancelModal({ executing, over }) {
  return (
    <div className="pe-modal-scrim">
      <div className="pe-dialog wf">
        <div className="pe-dialog-ico">{PED_I.xCircle}</div>
        <h2 className="pe-dialog-title">Cancelar pedido #{DETAIL.id}?</h2>
        <p className="pe-dialog-text">A reserva de estoque será liberada.</p>
        <div className="pe-dialog-foot">
          <div><WBtn variant="outline">Voltar</WBtn></div>
          <div><WBtn variant="destructive" loading={executing}>{executing ? "Cancelando…" : "Cancelar pedido"}</WBtn></div>
        </div>
      </div>
    </div>
  );
}

/* modal montado sobre a Sheet (desktop) */
function CancelModalOverSheet({ executing, role = "owner" }) {
  return (
    <div className="pe-modal-stage">
      <div style={{ position: "absolute", inset: 0 }}>
        <OrderSheetOverBoard situation="progress" role={role} />
      </div>
      <CancelModal executing={executing} />
    </div>
  );
}

window.PEDD = {
  DETAIL, ClientCard, ItemsCard, DeliveryCard, MetaCard, ActionArea,
  OrderSheet, OrderSheetOverBoard, OrderDetailPage, CancelModal, CancelModalOverSheet,
};
