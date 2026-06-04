/* Inventto — Wireframe · Módulo Pedidos Online · montagem do canvas (Superfície 2 · 2.8) */

const {
  PED_I, ORDERS, MICRO, MACRO_META, byMacro,
  PedBadge, PedTimer, PedActionsMenu, PedCard,
  PedBoard, PedBoardShell, PedBoardLoading, PedBoardMobile,
} = window.PED;
const {
  PedSheet, PedSheetOverShell, PedCancelDialog, PedCancelOverSheet,
  PedSheetMobile, PedCancelMobile, findOrder,
} = window.PEDS;

const PW = 1320, PPHONE = 390;
const ord = (id) => findOrder(id);

/* moldura neutra com caption (igual aos demais módulos) */
function PFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, justify = "center", toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-fieldbg)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: justify, position: "relative" }}>
        {children}
      </div>
      {toast && <div className="pe-toast-anchor">{toast}</div>}
    </div>
  );
}

/* legenda do canvas */
function PedLegend() {
  const sw = (cls, label) => <div className="wf-legrow"><span className={["wf-swatch", cls].join(" ")} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Pedidos Online (2.8)</h3>
      <p className="wf-legsub">O painel interno de pedidos da <b>vitrine online</b>: o <b>Kanban /pedidos</b> de 4 colunas por macro-estado (desktop · Tabs no mobile), a <b>Sheet de atendimento</b> que conduz a esteira de fulfillment, e o <b>Modal de cancelamento</b>. Lo-fi cinza-escala — exceção deliberada: o <b>ciclo de vida do pedido</b> ganha cor (DS §1.2).</p>
      {sw("pe-leg-swatch-pool", "Pool — neutro · novos aguardando um vendedor assumir")}
      {sw("pe-leg-swatch-active", "Em atendimento — alerta · ciclo ativo (Confirmando, Em separação, Em entrega)")}
      {sw("pe-leg-swatch-fulfil", "Destaque — ardósia · etapas de fulfillment (separação / entrega)")}
      {sw("pe-leg-swatch-done", "Finalizados — sucesso · entregue, pago e com baixa no estoque")}
      {sw("pe-leg-swatch-dead", "Cancelados — inativo · abortado manualmente ou expirado")}
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-ink)", borderColor: "var(--wf-ink)" }} />Preenchimento sólido = CTA primária / botão Assumir</div>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-note-bg)", borderColor: "var(--wf-note)" }} />Ardósia = nota de regra (snapshot / concorrência)</div>
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF034, RF035 · RN079–RN088. Microcopy §2, §3, §4, §5.</div>
    </div>
  );
}

/* referência de primitivos — badges de micro-estado + timer */
function PedRef() {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 26, background: "var(--wf-fieldbg)", height: "100%", justifyContent: "center" }}>
      <span className="wf-eyebrow">Badge de micro-estado (por coluna)</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
        {["pendente", "confirmando", "separacao", "entrega", "finalizado", "cancelado", "expirado"].map((m) => <PedBadge key={m} micro={m} />)}
      </div>
      <span className="wf-eyebrow" style={{ marginTop: 6 }}>Timer de expiração — normal vs. urgente</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        <PedTimer value="12:45" /><PedTimer value="02:48" urgent />
      </div>
      <WNote><b>Tom por etapa.</b> Pendente/Confirmando = <b>alerta</b> (atenção). Em separação/Em entrega = <b>destaque</b> (fulfillment em curso). Finalizado = <b>sucesso</b>. Cancelado = <b>inativo sólido</b>; Expirado = <b>inativo contorno</b> (distingue aborto manual de expiração automática). DS §1.2 · RF034.</WNote>
    </div>
  );
}

/* card isolado para anatomia das duas zonas (o card já tem largura fixa própria) */
function PedCardSolo({ o, menuOpen }) {
  return <PedCard o={o} menuOpen={menuOpen} />;
}

function PedidosCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Painel /pedidos dentro do App Shell · Kanban de 4 colunas por macro-estado — RF034, RF035">
        <DCArtboard id="legend" label="Legenda" width={600} height={520}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><PedLegend /></div>
        </DCArtboard>
        <DCArtboard id="board-desk" label="Painel · Desktop · Owner/Manager (vê todos)" width={PW} height={920}>
          <PedBoardShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="board-collapsed" label="Mesma tela · sidebar recolhida (modelo do App Shell)" width={PW} height={920}>
          <PedBoardShell scenario="base" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={460} height={780}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Macro-estados (RF034).</b> Quatro colunas: <b>Pool</b> (neutro) · <b>Em atendimento</b> (alerta) · <b>Finalizados</b> (sucesso) · <b>Cancelados</b> (inativo). Cabeçalho de cada coluna = nome + contador.</WNote>
            <WNote><b>Filtros.</b> Busca por <b>nome ou telefone</b> do cliente · filtro de <b>período</b> · filtro de <b>vendedor</b> (visível apenas para Dono/Gerente — oculto no recorte do Vendedor).</WNote>
            <WNote><b>Ordenação.</b> Na coluna <b>Em atendimento</b>, cards ordenados pela data da última ação realizada.</WNote>
            <WNote><b>Tempo real (RF035).</b> Novo pedido entra no Pool com animação + incrementa a contagem. Timer em countdown; ao zerar, o pedido migra para o topo de <b>Cancelados</b> com badge <b>Expirado</b>.</WNote>
            <WNote><b>Card · 2 zonas.</b> <i>Corpo</i> (clique abre a Sheet) + <i>Rodapé</i> (botão Chat + DropdownMenu de ações).</WNote>
            <WNote><b>Recorte por papel (RN081).</b> Vendedor vê o pool + os que assumiu. Gerente/Dono veem e agem em todos.</WNote>
            <WNote><b>Mobile.</b> 4 Tabs (Pool · Em atendimento · Finalizados · Cancelados) no lugar do Kanban.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── CARD ───── */}
      <DCSection id="card" title="01 · Card — duas zonas & rodapé por macro-estado" subtitle="Corpo navega (abre Sheet) · rodapé age (Chat + DropdownMenu) — o rodapé muda conforme a coluna">
        <DCArtboard id="card-ref" label="Referência · badges & timers" width={560} height={440}>
          <PedRef />
        </DCArtboard>
        <DCArtboard id="card-pool" label="Pool · Chat primário (assume + WhatsApp) · Ações off" width={340} height={300}>
          <PFrame tone="empty" name="Botão Chat assume o pedido e abre o WhatsApp" refLabel="RN081" justify="center">
            <PedCardSolo o={ord("#3411")} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-pool-urgent" label="Pool · timer urgente (expirando)" width={340} height={300}>
          <PFrame tone="err" name="Countdown < 3 min vira vermelho" refLabel="RF035" justify="center">
            <PedCardSolo o={ord("#3410")} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-new" label="Pool · novo pedido em tempo real" width={340} height={300}>
          <PFrame tone="ok" name="Anel de destaque + flag “Novo” (animação de entrada)" refLabel="RF035" justify="center">
            <PedCardSolo o={ord("#3412")} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-att" label="Em atendimento · Chat fantasma + DropdownMenu ativo" width={340} height={360}>
          <PFrame tone="empty" name="Ações exibe só o aplicável ao micro-estado" refLabel="RF034" justify="center" center={false}>
            <PedCardSolo o={ord("#3409")} menuOpen />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-att-sep" label="Em separação · DropdownMenu (Despachar / Cancelar)" width={340} height={360}>
          <PFrame tone="empty" name="“Despachar entrega” · “Cancelar pedido”" refLabel="§8" justify="center" center={false}>
            <PedCardSolo o={ord("#3408")} menuOpen />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-done" label="Finalizado · rodapé presente, ações desabilitadas" width={340} height={300}>
          <PFrame tone="ok" name="Chat e ações permanecem visíveis, porém desabilitados — pedido encerrado" refLabel="RF034" justify="center">
            <PedCardSolo o={ord("#3405")} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-canc" label="Cancelado · motivo no rodapé do corpo" width={340} height={280}>
          <PFrame tone="empty" name="Badge inativo sólido + motivo estruturado" refLabel="RN086" justify="center">
            <PedCardSolo o={ord("#3406")} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="card-exp" label="Expirado · inativo contorno (migrou do Pool)" width={340} height={280}>
          <PFrame tone="empty" name="Badge contornado distingue expiração de cancelamento" refLabel="RF035" justify="center">
            <PedCardSolo o={ord("#3404")} />
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS DO PAINEL ───── */}
      <DCSection id="estados" title="02 · Estados do painel" subtitle="Carregando · pool vazio · tempo real (novo / expirando) · concorrência · recorte por papel — Matriz §2.8">
        <DCArtboard id="st-loading" label="Carregando (skeleton de colunas)" width={1290} height={820}>
          <PFrame tone="load" name="Abre em skeleton de Kanban" refLabel="Matriz" center={false}>
            <PedBoardLoading />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-poolempty" label="Pool vazio · microcopy em tempo real" width={1290} height={860}>
          <PFrame tone="empty" name="“Nenhum pedido pendente. Os novos chegam aqui em tempo real.”" refLabel="§4" center={false}>
            <PedBoard scenario="poolEmpty" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-conflict" label="Concorrência (RN081) — pedido já assumido" width={560} height={364}>
          <PFrame tone="err" name="Toast de erro + card atualizado para “Em atendimento”" refLabel="§2" center={false} justify="stretch"
            toast={<SH.SHToast type="error" action="Atualizar">Este pedido já foi assumido por outro vendedor.</SH.SHToast>}>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="pe-conflict-note">
                <span className="pe-cn-ico">{PED_I.alert}</span>
                <span className="pe-cn-text"><b>Este pedido já foi assumido.</b> Outro vendedor clicou em “Assumir” primeiro — o card sai do seu Pool e aparece em Em atendimento com o responsável atualizado.</span>
              </div>
              <div style={{ width: 300 }}><PedCard o={{ ...ord("#3411"), micro: "confirmando", seller: "Marcos Lima", timer: null }} /></div>
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-expiring" label="Expirando · migração automática para Cancelados" width={620} height={420}>
          <PFrame tone="empty" name="Timer zera no Pool → card vai ao topo de Cancelados (Expirado)" refLabel="RF035" center={false}>
            <div style={{ width: "100%", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div className="wf-eyebrow" style={{ marginBottom: 8, display: "block" }}>Pool · timer em 00:00</div>
                <PedCard o={{ ...ord("#3404"), micro: "pendente", timer: "00:00", urgent: true, reason: null, migrated: false }} />
              </div>
              <div style={{ flex: "0 0 auto", alignSelf: "center", color: "var(--wf-faint)", paddingTop: 18 }}>{PED_I.chevR}</div>
              <div style={{ flex: 1 }}>
                <div className="wf-eyebrow" style={{ marginBottom: 8, display: "block" }}>Cancelados · topo</div>
                <PedCard o={ord("#3404")} />
              </div>
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (pool + os próprios)" width={PW} height={920}>
          <PFrame tone="empty" name="Vendedor vê o pool e os pedidos que assumiu" refLabel="RN081" center={false} pad={0}>
            <PedBoardShell scenario="base" role="sales" />
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── SHEET: ATENDIMENTO ───── */}
      <DCSection id="sheet" title="03 · Sheet — Atendimento do pedido" subtitle="Lateral direita sobre o Kanban · cards (cliente · itens · entrega · metadados) + rodapé de ações dinâmicas por micro-estado — 2.8.2, RF034">
        <DCArtboard id="sheet-anatomy" label="Anatomia · Sheet sobre o Kanban (Em separação)" width={PW} height={912}>
          <PedSheetOverShell order={ord("#3408")} micro="separacao" />
        </DCArtboard>
        <DCArtboard id="sheet-pool" label="Pendente (Pool) · “Iniciar atendimento” (sem secundária)" width={520} height={972}>
          <PFrame tone="empty" name="Pool: única ação assume o pedido" refLabel="RF034" center={false}>
            <PedSheet order={ord("#3411")} micro="pendente" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sheet-confirm" label="Confirmando · “Iniciar separação” + Cancelar" width={520} height={972}>
          <PFrame tone="empty" name="Ação primária avança · destrutiva cancela" refLabel="RF034" center={false}>
            <PedSheet order={ord("#3409")} micro="confirmando" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sheet-sep" label="Em separação · “Despachar entrega” + Cancelar" width={520} height={1024}>
          <PFrame tone="empty" name="Esteira de fulfillment — etapa de separação" refLabel="RF034" center={false}>
            <PedSheet order={ord("#3408")} micro="separacao" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sheet-deliver" label="Em entrega · “Finalizar pedido” + Cancelar" width={520} height={1024}>
          <PFrame tone="empty" name="Última etapa antes da baixa de estoque" refLabel="RF034" center={false}>
            <PedSheet order={ord("#3407")} micro="entrega" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sheet-saving" label="Finalizando · ação em processamento" width={520} height={1024}>
          <PFrame tone="load" name="“Finalizando…” → toast + retorna à lista" refLabel="§5" center={false}
            toast={<WToast ok>Pedido finalizado e estoque baixado.</WToast>}>
            <PedSheet order={ord("#3407")} micro="entrega" state="saving" savingLabel="Finalizando…" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sheet-closed" label="Cancelado · somente leitura" width={520} height={1024}>
          <PFrame tone="empty" name="Sem ações — exibe motivo do encerramento" refLabel="RF034" center={false}>
            <PedSheet order={ord("#3406")} micro="cancelado" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sheet-notfound" label="Não encontrado / sem permissão (404)" width={520} height={420}>
          <PFrame tone="err" name="Página 404 + retorno para a lista" refLabel="Matriz" center={true}>
            <div style={{ width: 360 }}>
              <WFeedback icon="alert" title="Pedido não encontrado" text="Este pedido não existe, foi removido ou você não tem permissão para vê-lo." />
              <div style={{ marginTop: 16 }}><WBtn variant="outline">Voltar para a lista de pedidos</WBtn></div>
            </div>
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MODAL: CANCELAR ───── */}
      <DCSection id="modal" title="04 · Modal — Cancelar pedido" subtitle="Dialog pequeno sobre o card ou a Sheet · motivo obrigatório libera o botão destrutivo — 2.8.3, RN086">
        <DCArtboard id="modal-anatomy" label="Anatomia · Dialog sobre a Sheet" width={PW} height={912}>
          <PedCancelOverSheet order={ord("#3408")} micro="separacao" reason={0} />
        </DCArtboard>
        <DCArtboard id="modal-empty" label="Inicial · nenhum motivo (Confirmar desabilitado)" width={460} height={584}>
          <PFrame tone="empty" name="Botão destrutivo travado até escolher um motivo" refLabel="RN086" center={true}>
            <PedCancelDialog orderId="#3408" reason={-1} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="modal-selected" label="Motivo selecionado · Confirmar habilitado" width={460} height={584}>
          <PFrame tone="ok" name="“Falta de estoque” marcado → libera confirmação" refLabel="§3" center={true}>
            <PedCancelDialog orderId="#3408" reason={0} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="modal-saving" label="Processando · formulário bloqueado" width={460} height={584}>
          <PFrame tone="load" name="“Cancelando…” → toast + status muda para Cancelado" refLabel="Matriz"
            toast={<WToast ok>Pedido cancelado.</WToast>}>
            <PedCancelDialog orderId="#3408" reason={1} state="saving" />
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="05 · Mobile (~390px)" subtitle="Tabs no lugar do Kanban · Sheet ocupa 80% da tela (painel inferior) · Dialog centralizado">
        <DCArtboard id="mob-pool" label="Tab Pool · cards com timer" width={PPHONE} height={936}>
          <PedBoardMobile active="pool" />
        </DCArtboard>
        <DCArtboard id="mob-att" label="Tab Em atendimento · Chat fantasma + Ações" width={PPHONE} height={936}>
          <PedBoardMobile active="atendimento" />
        </DCArtboard>
        <DCArtboard id="mob-done" label="Tab Finalizados" width={PPHONE} height={744}>
          <PedBoardMobile active="finalizados" />
        </DCArtboard>
        <DCArtboard id="mob-poolempty" label="Tab Pool · vazio (microcopy)" width={PPHONE} height={680}>
          <PedBoardMobile active="pool" empty />
        </DCArtboard>
        <DCArtboard id="mob-sheet" label="Sheet de atendimento · painel inferior 80%" width={PPHONE} height={820}>
          <PedSheetMobile order={ord("#3408")} micro="separacao" />
        </DCArtboard>
        <DCArtboard id="mob-cancel" label="Modal cancelar · sobre a sheet inferior" width={PPHONE} height={820}>
          <PedCancelMobile order={ord("#3408")} micro="separacao" reason={0} />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.PedidosCanvas = PedidosCanvas;
