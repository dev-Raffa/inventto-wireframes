/* Inventto — Wireframe · Módulo Pedidos Online · montagem do canvas (Superfície 2 · 2.8) */

const {
  PED_I, ORDERS, COLS, OrdersBoard, OrdersShell, OrdersMobile,
} = window.PED;
const {
  OrderSheet, OrderSheetOverBoard, OrderDetailPage, CancelModal, CancelModalOverSheet,
} = window.PEDD;

const CW = 1200, CPHONE = 390;

/* moldura neutra com caption (igual aos demais módulos) */
function PeFrame({ tone = "empty", name, refLabel, children, center = true, pad = 28, toast }) {
  return (
    <div className="pe-frame wf">
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div className="pe-frame-body" style={{ padding: pad, alignItems: center ? "center" : "stretch" }}>
        {children}
      </div>
      {toast && <div className="pe-toast-anchor">{toast}</div>}
    </div>
  );
}

/* skeleton do Kanban (estado carregando) */
function BoardSkeleton() {
  return (
    <div className="wf sh-app">
      <window.SH.Sidebar role="owner" active="pedidos" />
      <div className="sh-inset">
        <window.SH.TopHeader crumb={["Início", "Pedidos"]} />
        <div className="sh-main" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
              <div className="wf-sk" style={{ width: 130, height: 26 }} />
              <div className="wf-sk" style={{ width: 90, height: 24, borderRadius: 999 }} />
            </div>
            <div style={{ flex: 1, display: "flex", gap: 14, minHeight: 0 }}>
              {[0, 1, 2, 3, 4].map((c) => (
                <div key={c} style={{ flex: "0 0 256px", border: "1.5px solid var(--wf-line-soft)", borderRadius: 13, background: "var(--wf-fieldbg)", padding: 11, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="wf-sk" style={{ width: "70%", height: 16, margin: "2px 0 6px" }} />
                  {[0, 1, c % 2].map((k, i) => <div key={i} className="wf-sk" style={{ width: "100%", height: 86, borderRadius: 11 }} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeLegend() {
  const sw = (bg, bd, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg, borderColor: bd }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Pedidos Online (2.8)</h3>
      <p className="wf-legsub">O painel interno onde a equipe <b>atende os pedidos da vitrine</b>: o <b>Painel</b> (/pedidos) — Kanban de 5 colunas no desktop, Tabs no mobile, com contagem e timers em <b>tempo real</b> — o <b>Atendimento</b> (/pedidos/:id) — Sheet lateral no desktop, página completa no mobile — e o <b>Modal de cancelamento</b>. Lo-fi cinza-escala; cor <b>funcional apenas</b>.</p>
      {sw("var(--pe-warning-bg)", "var(--pe-warning)", "Âmbar — pendente / em atendimento (warning) · urgência TTL < 30 min")}
      {sw("var(--pe-healthy-bg)", "var(--pe-healthy)", "Verde dessat. — confirmado / WhatsApp (healthy)")}
      {sw("var(--pe-zeroed-bg)", "var(--wf-line)", "Neutro — cancelado / expirado (zeroed)")}
      {sw("var(--pe-danger-bg)", "var(--pe-danger)", "Tijolo — timer de expiração e ação destrutiva")}
      {sw("var(--wf-ink)", "var(--wf-ink)", "Preenchimento sólido = CTA primária (Assumir / Confirmar)")}
      {sw("var(--wf-note-bg)", "var(--wf-note)", "Ardósia = nota de regra (RN)")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF034–RF035 · RN079–RN088. Microcopy §2–§5.</div>
    </div>
  );
}

function PedidosCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Painel /pedidos dentro do App Shell · Kanban de 5 colunas com scroll horizontal, contagem em tempo real e timers — RF034, RF035">
        <DCArtboard id="legend" label="Legenda" width={600} height={470}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><PeLegend /></div>
        </DCArtboard>
        <DCArtboard id="board-desk" label="Painel · Desktop · Kanban (Owner/Manager — todos os pedidos)" width={CW} height={720}>
          <OrdersShell role="owner" />
        </DCArtboard>
        <DCArtboard id="board-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={CW} height={720}>
          <OrdersShell role="owner" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={470} height={720}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Kanban de 5 colunas (lg+).</b> Pool · Em atendimento · Confirmados · Cancelados · Expirados. Scroll horizontal; cada coluna rola na vertical. Mobile usa Tabs com a mesma divisão.</WNote>
            <WNote><b>Tempo real (RF035).</b> Novo pedido entra no Pool com animação e incrementa a contagem; o timer faz countdown ao vivo; ao expirar o card migra sozinho para Expirados.</WNote>
            <WNote><b>Pool = fila compartilhada (RN081/082).</b> “Assumir” atribui o pedido ao usuário; ele sai do Pool e vai para Em atendimento. A contagem para de contar ao assumir.</WNote>
            <WNote><b>Urgência (RN084).</b> Badge âmbar “Expira em breve” quando TTL &lt; 30 min; abaixo de 15 min o timer pulsa.</WNote>
            <WNote><b>Clique no card →</b> Sheet de atendimento sobre o Kanban (desktop). No mobile, abre a página /pedidos/:id.</WNote>
          </div>
        </DCArtboard>
        <DCArtboard id="sheet-solo" label="Sheet de atendimento · referência" width={460} height={720}>
          <div style={{ height: "100%", display: "flex", background: "var(--wf-fieldbg)", padding: 0 }}>
            <OrderSheet situation="progress" standalone />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── PAINEL: ESTADOS ───── */}
      <DCSection id="painel" title="01 · Painel · estados (Matriz)" subtitle="Carregando · Pool vazio · novo pedido (Realtime) · expirando · recorte por papel — RN081, RN084, §4">
        <DCArtboard id="st-loading" label="Carregando · skeleton do Kanban" width={CW} height={620}>
          <PeFrame tone="load" name="Skeleton por coluna enquanto carrega" refLabel="Matriz" center={false} pad={0}>
            <BoardSkeleton />
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Pool vazio" width={CW} height={620}>
          <PeFrame tone="empty" name="“Nenhum pedido pendente. Os novos chegam aqui em tempo real.”" refLabel="§4" center={false} pad={0}>
            <OrdersShell role="owner" empty />
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="st-new" label="Novo pedido (Realtime) · entra no Pool com animação" width={CW} height={620}>
          <PeFrame tone="ok" name="Card surge no Pool (borda destacada) + contagem incrementa" refLabel="RF035" center={false} pad={0}>
            <OrdersShell role="owner" newIn="1042" />
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte · Vendedor (pool + os que assumiu)" width={CW} height={620}>
          <PeFrame tone="empty" name="Em atendimento mostra só os próprios; Pool é compartilhado" refLabel="RN081/082" center={false} pad={0}>
            <OrdersShell role="sales" />
          </PeFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── ATENDIMENTO: SITUAÇÕES ───── */}
      <DCSection id="atendimento" title="02 · Atendimento · situações (RF034)" subtitle="Sheet lateral sobre o Kanban (desktop) · ações por situação: Assumir · Confirmar/Cancelar · Confirmando · somente leitura — RN086, RN087">
        <DCArtboard id="at-pool" label="Pendente no pool · [Assumir pedido]" width={CW} height={760}>
          <OrderSheetOverBoard situation="pool" role="owner" />
        </DCArtboard>
        <DCArtboard id="at-progress" label="Em andamento · [Confirmar] + [Cancelar]" width={CW} height={760}>
          <OrderSheetOverBoard situation="progress" role="owner" />
        </DCArtboard>
        <DCArtboard id="at-confirming" label="Confirmando · loader + ações bloqueadas" width={CW} height={760}>
          <PeFrame tone="load" name="“Confirmando…” → toast “Pedido confirmado e estoque baixado.”" refLabel="§5" center={false} pad={0} toast={<WToast ok>Pedido confirmado e estoque baixado.</WToast>}>
            <OrderSheetOverBoard situation="progress" confirming role="owner" />
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="at-confirmed" label="Confirmado · somente leitura" width={460} height={720}>
          <PeFrame tone="ok" name="Sem ações — reserva virou saída definitiva" refLabel="RN086">
            <div style={{ height: "100%", display: "flex", background: "var(--wf-fieldbg)" }}><OrderSheet situation="confirmed" standalone /></div>
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="at-cancelled" label="Cancelado · somente leitura" width={460} height={720}>
          <PeFrame tone="err" name="Sem ações — reserva de estoque liberada" refLabel="RN086">
            <div style={{ height: "100%", display: "flex", background: "var(--wf-fieldbg)" }}><OrderSheet situation="cancelled" standalone /></div>
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="at-expired" label="Expirado · somente leitura" width={460} height={720}>
          <PeFrame tone="empty" name="Realtime migrou o pedido; ações desaparecem" refLabel="RN084">
            <div style={{ height: "100%", display: "flex", background: "var(--wf-fieldbg)" }}><OrderSheet situation="expired" standalone /></div>
          </PeFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MODAL CANCELAR ───── */}
      <DCSection id="modal" title="03 · Modal · cancelar pedido (2.8.3)" subtitle="Dialog max-w-sm sobre a Sheet · confirma o cancelamento e libera a reserva — RF034, RN086, §3">
        <DCArtboard id="md-over" label="Modal sobre a Sheet de atendimento" width={CW} height={760}>
          <CancelModalOverSheet role="owner" />
        </DCArtboard>
        <DCArtboard id="md-solo" label="Dialog · standalone" width={460} height={420}>
          <PeFrame tone="err" name="“Cancelar pedido #1042?” · “A reserva de estoque será liberada.”" refLabel="§3">
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", border: "1.5px solid var(--wf-line)" }}>
              <CancelModal />
            </div>
          </PeFrame>
        </DCArtboard>
        <DCArtboard id="md-exec" label="Executando · loader" width={460} height={420}>
          <PeFrame tone="load" name="“Cancelando…” → toast “Pedido cancelado.”" refLabel="§3" toast={<WToast ok>Pedido cancelado.</WToast>}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", border: "1.5px solid var(--wf-line)" }}>
              <CancelModal executing />
            </div>
          </PeFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="04 · Mobile (~390px)" subtitle="Painel em Tabs + lista de cards · atendimento em página completa /pedidos/:id">
        <DCArtboard id="mob-pool" label="Painel · tab Pool" width={CPHONE} height={760}>
          <OrdersMobile active="pool" role="owner" />
        </DCArtboard>
        <DCArtboard id="mob-active" label="Painel · tab Em atendimento" width={CPHONE} height={760}>
          <OrdersMobile active="active" role="owner" />
        </DCArtboard>
        <DCArtboard id="mob-empty" label="Painel · tab Confirmados (encerrados)" width={CPHONE} height={760}>
          <OrdersMobile active="confirm" role="owner" />
        </DCArtboard>
        <DCArtboard id="mob-detail-pool" label="Atendimento · pendente no pool" width={CPHONE} height={820}>
          <OrderDetailPage situation="pool" />
        </DCArtboard>
        <DCArtboard id="mob-detail-progress" label="Atendimento · em andamento" width={CPHONE} height={820}>
          <OrderDetailPage situation="progress" />
        </DCArtboard>
        <DCArtboard id="mob-detail-confirmed" label="Atendimento · confirmado (leitura)" width={CPHONE} height={820}>
          <OrderDetailPage situation="confirmed" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.PedidosCanvas = PedidosCanvas;
