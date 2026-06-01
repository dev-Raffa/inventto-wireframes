/* Inventto — Wireframe · Módulo Movimentações de Estoque · montagem do canvas (Superfície 2 · 2.4) */

const {
  MOV_I, MvHistory, MvHistoryShell, MvHistoryLoading, MvHistoryMobile,
  MvTypeBadge, MvQty, MvResp,
} = window.MOV;
const { MvSheet, MvSheetOverShell, MvSeg } = window.MOVS;

const MW = 1200, MPHONE = 390;

/* moldura neutra com caption (igual ao produtos/equipe canvas) */
function MFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center", position: "relative" }}>
        {children}
      </div>
      {toast && <div className="mv-toast-anchor">{toast}</div>}
    </div>
  );
}

function MovLegend() {
  const sw = (cls, label) => <div className="wf-legrow"><span className={["wf-swatch", cls].join(" ")} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Movimentações (2.4)</h3>
      <p className="wf-legsub">O registro auditável do estoque: o <b>histórico /movimentacoes</b> (tabela cronológica <b>sem ações</b> — registros imutáveis, RN051 · cards no mobile) e a <b>Sheet de registrar movimentação</b> (entrada/saída manual, RF022). Lo-fi cinza-escala — exceção deliberada: o eixo <b>Entrada × Saída</b> ganha cor (DS §1.2).</p>
      {sw("mv-leg-swatch-in", "Entrada — soma ao saldo · +N verde (ArrowUp)")}
      {sw("mv-leg-swatch-out", "Saída — subtrai do saldo · −N tijolo (ArrowDown)")}
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-ink)", borderColor: "var(--wf-ink)" }} />Preenchimento sólido = CTA primária</div>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-note-bg)", borderColor: "var(--wf-note)" }} />Ardósia = nota de regra (imutabilidade / Sistema)</div>
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF022, RF023 · RN051–RN057. Microcopy §2, §4, §8.</div>
    </div>
  );
}

/* referência de primitivos (badges / qty / responsável) */
function MovRef() {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 26, background: "var(--wf-fieldbg)", height: "100%", justifyContent: "center" }}>
      <span className="wf-eyebrow">Badge de tipo — coluna Tipo</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <MvTypeBadge type="in" /><MvTypeBadge type="out" />
      </div>
      <span className="wf-eyebrow" style={{ marginTop: 6 }}>Quantidade — sinal + cor</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
        <MvQty type="in" qty={20} /><MvQty type="out" qty={2} />
      </div>
      <span className="wf-eyebrow" style={{ marginTop: 6 }}>Responsável — pessoa vs. automática</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <MvResp who="Joana Ribeiro" /><MvResp who={null} />
      </div>
      <WNote><b>“Sistema” = automática.</b> Saídas geradas pelo PDV (venda no balcão) ou rotinas entram sem responsável humano. Custo unitário em saídas é sempre “—” (o saldo já carrega o custo médio). DS §1.2 · RN054.</WNote>
    </div>
  );
}

function MovCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Histórico /movimentacoes dentro do App Shell · tabela imutável sem ações — RF023, RN051">
        <DCArtboard id="legend" label="Legenda" width={600} height={420}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><MovLegend /></div>
        </DCArtboard>
        <DCArtboard id="hist-desk" label="Histórico · Desktop · Owner/Manager" width={MW} height={720}>
          <MvHistoryShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="hist-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={MW} height={720}>
          <MvHistoryShell scenario="base" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={440} height={720}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Imutável (RN051).</b> A tabela <b>não tem coluna de ações</b> — movimentações não se editam nem estornam. Correções entram como nova movimentação inversa.</WNote>
            <WNote><b>Colunas.</b> Data/hora · Tipo · Motivo (+ descrição se “Outro”) · Produto/Variante · Quantidade · <b>Custo unit.</b> · <b>Custo médio pós</b> · Responsável.</WNote>
            <WNote><b>Recorte por papel (RN057).</b> Sales: leitura — sem botão “Registrar”, sem filtro de responsável e <b>sem as duas colunas de custo</b>.</WNote>
            <WNote><b>Pré-filtro por produto.</b> Acessada via atalho do produto (<span style={{ fontFamily: "var(--wf-mono)" }}>?produto=:id</span>) chega filtrada, com badge de filtro ativo + X.</WNote>
            <WNote><b>Registrar (Manager/Owner).</b> O botão abre a Sheet 2.4.2 sobre esta tela.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS DA LISTA ───── */}
      <DCSection id="estados" title="01 · Estados do histórico" subtitle="Carregando · primeira vez (vazio) · filtro sem resultado · pré-filtrado por produto — Matriz §2.4">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={980} height={560}>
          <MFrame tone="load" name="Abre em skeleton de tabela" refLabel="Matriz" center={false}>
            <MvHistoryLoading />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-firstrun" label="Primeira vez · sem movimentações" width={980} height={540}>
          <MFrame tone="empty" name="Microcopy + CTA “Registrar entrada”" refLabel="§4" center={false}>
            <MvHistory scenario="firstrun" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Filtro sem resultado" width={980} height={520}>
          <MFrame tone="empty" name="Mensagem inline — “Nada encontrado”" refLabel="§4" center={false}>
            <MvHistory scenario="empty" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-prefiltered" label="Pré-filtrado por produto (via atalho)" width={MW} height={680}>
          <MFrame tone="empty" name="Campo preenchido + badge de filtro ativo com X" refLabel="RF023" center={false} pad={0}>
            <MvHistoryShell scenario="prefiltered" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (leitura)" width={MW} height={680}>
          <MFrame tone="empty" name="Sem CTA, sem filtro de responsável, sem colunas de custo" refLabel="RN057" center={false} pad={0}>
            <MvHistoryShell scenario="base" role="sales" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="mov-ref" label="Referência · primitivos" width={520} height={520}>
          <MovRef />
        </DCArtboard>
      </DCSection>

      {/* ───── SHEET: REGISTRAR MOVIMENTAÇÃO ───── */}
      <DCSection id="sheet" title="02 · Sheet — Registrar movimentação" subtitle="Lateral direita (max-w-md) sobre /movimentacoes ou /produtos · Manager/Owner — RF022, RN052–RN056">
        <DCArtboard id="sheet-anatomy" label="Anatomia · Sheet sobre o histórico (Entrada)" width={MW} height={720}>
          <MvSheetOverShell type="in" state="initial" />
        </DCArtboard>
        <DCArtboard id="sheet-in" label="Entrada · inicial (custo obrigatório)" width={500} height={880}>
          <MFrame tone="empty" name="Custo unitário visível só na Entrada (RN054)" refLabel="RF022" center={false}>
            <MvSheet type="in" state="initial" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-search" label="Entrada · busca de produto (Command)" width={500} height={620}>
          <MFrame tone="empty" name="Command/Select com busca + saldo por item" refLabel="RF022" center={false}>
            <MvSheet type="in" state="initial" standalone searchOpen />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-prefilled" label="Entrada · pré-preenchida (via atalho)" width={500} height={900}>
          <MFrame tone="empty" name="Produto readonly + travado (aberto pelo produto)" refLabel="RF023" center={false}>
            <MvSheet type="in" state="prefilled" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-out-valid" label="Saída · quantidade válida" width={500} height={760}>
          <MFrame tone="ok" name="Helper verde “Disponível: N un.” · sem custo" refLabel="RN055" center={false}>
            <MvSheet type="out" state="valid" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-out-invalid" label="Saída · estoque insuficiente" width={500} height={760}>
          <MFrame tone="err" name="Erro inline + “Registrar” desabilitado" refLabel="RN055 · §2" center={false}>
            <MvSheet type="out" state="invalid" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-other" label="Saída · motivo “Outro” (descrição obrigatória)" width={500} height={840}>
          <MFrame tone="empty" name="Textarea obrigatória aparece (RN053)" refLabel="RN053" center={false}>
            <MvSheet type="out" state="other" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-saving" label="Entrada · registrando" width={500} height={900}>
          <MFrame tone="load" name="“Registrando…” → fecha + toast" refLabel="Matriz" center={false} toast={<WToast ok>Movimentação registrada.</WToast>}>
            <MvSheet type="in" state="saving" standalone />
          </MFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="03 · Mobile (~390px)" subtitle="Histórico em cards · header com Plus icon-only · Sheet ocupa a tela cheia">
        <DCArtboard id="mob-hist" label="Histórico · cards" width={MPHONE} height={860}>
          <MvHistoryMobile />
        </DCArtboard>
        <DCArtboard id="mob-hist-sales" label="Histórico · Vendedor (sem custo, sem +)" width={MPHONE} height={860}>
          <MvHistoryMobile role="sales" />
        </DCArtboard>
        <DCArtboard id="mob-sheet" label="Sheet · Saída válida (tela cheia)" width={MPHONE} height={900}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-field)", display: "flex" }}>
            <MvSheet type="out" state="valid" standalone />
          </div>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.MovCanvas = MovCanvas;
