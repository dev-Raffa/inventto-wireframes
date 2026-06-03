/* Inventto — Wireframe · Módulo Movimentações de Estoque · montagem do canvas (Superfície 2 · 2.4) */

const {
  MOV_I, MvHistory, MvHistoryShell, MvHistoryLoading, MvHistoryMobile,
  MvTypeBadge, MvQty, MvResp, MvPresetSelect, MvDateRange,
} = window.MOV;
const { MvSheet, MvSheetOverShell, MvItemDialog, MvDialogOverSheet, MvDialogMobile, MvSeg } = window.MOVS;

const MW = 1200, MPHONE = 390;

/* moldura neutra com caption (igual ao produtos/equipe canvas) */
function MFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, justify = "center", toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: justify, position: "relative" }}>
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
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-fieldbg)", borderColor: "var(--wf-line)" }} />Linha expansível (chevron) → card com itens da movimentação</div>
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
      <WNote><b>“Sistema” = automática.</b> Saídas geradas pelo PDV (venda no balcão) ou rotinas entram sem responsável humano. A coluna <b>Valor</b> traz o total da movimentação; o detalhe por item abre na sublinha. DS §1.2 · RN054.</WNote>
    </div>
  );
}

function MovCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Histórico /movimentacoes dentro do App Shell · tabela imutável sem ações — RF023, RN051">
        <DCArtboard id="legend" label="Legenda" width={600} height={470}>
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
            <WNote><b>Colunas.</b> <i>(chevron)</i> · Data (data + hora) · Tipo · Motivo / Doc. (vertical) · Responsável · Qtd. de itens · Valor.</WNote>
            <WNote><b>Linha expansível.</b> Clicar na linha abre uma sublinha com um <b>card</b>: cabeçalho + detalhes da movimentação + tabela de itens (Produto · Quantidade · Valor). Cada movimentação agrupa um ou mais produtos.</WNote>
            <WNote><b>Recorte por papel (RN057).</b> Sales: leitura — sem botão “Registrar”, sem filtro de responsável e <b>sem a coluna Valor</b> (some também na tabela de itens).</WNote>
            <WNote><b>Pré-filtro por produto.</b> Acessada via atalho do produto (<span style={{ fontFamily: "var(--wf-mono)" }}>?produto=:id</span>) chega filtrada, com badge de filtro ativo + X.</WNote>
            <WNote><b>Registrar (Manager/Owner).</b> O botão abre a Sheet 2.4.2 sobre esta tela.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS DA LISTA ───── */}
      <DCSection id="estados" title="01 · Estados do histórico" subtitle="Carregando · primeira vez (vazio) · filtro sem resultado · pré-filtrado por produto — Matriz §2.4">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={980} height={585}>
          <MFrame tone="load" name="Abre em skeleton de tabela" refLabel="Matriz" center={false}>
            <MvHistoryLoading />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-firstrun" label="Primeira vez · sem movimentações" width={980} height={600}>
          <MFrame tone="empty" name="Microcopy + CTA “Registrar entrada”" refLabel="§4" center={false}>
            <MvHistory scenario="firstrun" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Filtro sem resultado" width={980} height={585}>
          <MFrame tone="empty" name="Mensagem inline — “Nada encontrado”" refLabel="§4" center={false}>
            <MvHistory scenario="empty" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-prefiltered" label="Pré-filtrado por produto (via atalho)" width={MW} height={1072}>
          <MFrame tone="empty" name="Campo preenchido + badge de filtro ativo com X" refLabel="RF023" center={false} pad={0}>
            <MvHistoryShell scenario="prefiltered" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (leitura)" width={MW} height={1212}>
          <MFrame tone="empty" name="Sem CTA, sem filtro de responsável, sem colunas de custo" refLabel="RN057" center={false} pad={0}>
            <MvHistoryShell scenario="base" role="sales" />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="mov-ref" label="Referência · primitivos" width={520} height={520}>
          <MovRef />
        </DCArtboard>
        <DCArtboard id="st-period-presets" label="Filtro de período · presets" width={520} height={420}>
          <MFrame tone="empty" name="Select de preset aberto + intervalo de datas" refLabel="RF023" center={false} justify="flex-start">
            <div className="wf" style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingTop: 6 }}>
              <MvPresetSelect value="Personalizado" open />
              <MvDateRange from="02/05/2026" to="31/05/2026" />
            </div>
          </MFrame>
        </DCArtboard>
        <DCArtboard id="st-period-calendar" label="Filtro de período · calendário (dois meses)" width={760} height={420}>
          <MFrame tone="empty" name="Range picker — início e fim destacados" refLabel="RF023" center={false} justify="flex-start">
            <div className="wf" style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingTop: 6 }}>
              <MvPresetSelect value="Personalizado" />
              <MvDateRange from="02/05/2026" to="31/05/2026" open />
            </div>
          </MFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── SHEET: REGISTRAR MOVIMENTAÇÃO ───── */}
      <DCSection id="sheet" title="02 · Sheet — Registrar movimentação" subtitle="Lateral direita (max-w-lg) sobre /movimentacoes ou /produtos · Manager/Owner · um ou mais produtos por movimentação — RF022, RN052–RN056">
        <DCArtboard id="sheet-anatomy" label="Anatomia · Sheet sobre o histórico (Entrada · com itens)" width={MW} height={760}>
          <MvSheetOverShell type="in" state="filled" />
        </DCArtboard>
        <DCArtboard id="sheet-in-initial" label="Entrada · inicial (tabela de itens vazia)" width={560} height={910}>
          <MFrame tone="empty" name="Empty state da seção + “Registrar” desabilitado" refLabel="RF022" center={false}>
            <MvSheet type="in" state="initial" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-in-filled" label="Entrada · com itens (Custo total)" width={560} height={935}>
          <MFrame tone="ok" name="Tabela de itens · coluna “Custo total” · Registrar ativo" refLabel="RF022" center={false}>
            <MvSheet type="in" state="filled" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-out-filled" label="Saída · com itens (Valor total)" width={560} height={935}>
          <MFrame tone="ok" name="Coluna “Valor total” · motivo de saída" refLabel="RF022" center={false}>
            <MvSheet type="out" state="filled" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-row-hover" label="Linha em hover · ações Pencil / X" width={560} height={935}>
          <MFrame tone="empty" name="Lápis reabre o Dialog · X remove a linha" refLabel="§8" center={false}>
            <MvSheet type="in" state="filled" standalone hoverIdx={0} />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-row-remove" label="Linha · confirmação inline de remoção" width={560} height={935}>
          <MFrame tone="empty" name="X → “Remover? · Remover / Manter”" refLabel="§8" center={false}>
            <MvSheet type="in" state="filled" standalone removingIdx={1} />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-out-invalid" label="Saída · linha com estoque insuficiente" width={560} height={955}>
          <MFrame tone="err" name="Badge de erro na linha + “Registrar” desabilitado" refLabel="RN055 · §2" center={false}>
            <MvSheet type="out" state="invalid" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-other" label="Motivo “Outro” (descrição obrigatória)" width={560} height={1075}>
          <MFrame tone="empty" name="Textarea de descrição aparece (RN053)" refLabel="RN053" center={false}>
            <MvSheet type="out" state="other" standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="sheet-saving" label="Registrando" width={560} height={935}>
          <MFrame tone="load" name="“Registrando…” → fecha + toast" refLabel="Matriz" center={false} toast={<WToast ok>Movimentação registrada.</WToast>}>
            <MvSheet type="in" state="saving" standalone />
          </MFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── DIALOG: ADICIONAR / EDITAR ITEM ───── */}
      <DCSection id="dialog" title="03 · Dialog — Adicionar / Editar item" subtitle="Dialog (max-w-md) sobre o Sheet · lista as variantes do produto · linhas com quantidade 0 são ignoradas">
        <DCArtboard id="dialog-anatomy" label="Anatomia · Dialog sobre o Sheet (Entrada)" width={MW} height={760}>
          <MvDialogOverSheet mode="add" type="in" variant="list" filled={[0, 2]} />
        </DCArtboard>
        <DCArtboard id="dialog-add" label="Adicionar item · produto com variações" width={520} height={840}>
          <MFrame tone="empty" name="Lista de variantes · valor unitário + quantidade por linha" refLabel="RF022" center={false}>
            <MvItemDialog mode="add" type="in" variant="list" filled={[0, 2]} standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="dialog-edit" label="Editar item (reaberto pelo lápis)" width={520} height={840}>
          <MFrame tone="empty" name="Título “Editar item” · valores preenchidos" refLabel="§8" center={false}>
            <MvItemDialog mode="edit" type="in" variant="list" filled={[0, 2]} standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="dialog-out-invalid" label="Saída · estoque insuficiente na linha" width={520} height={870}>
          <MFrame tone="err" name="Borda destructive + “Estoque insuficiente”" refLabel="RN055 · §2" center={false}>
            <MvItemDialog mode="add" type="out" variant="list" invalidIdx={0} standalone />
          </MFrame>
        </DCArtboard>
        <DCArtboard id="dialog-single" label="Produto sem variações (linha única)" width={520} height={420}>
          <MFrame tone="empty" name="Uma única linha · label “Preço de venda” (Saída)" refLabel="RF022" center={false}>
            <MvItemDialog mode="add" type="out" variant="single" filled={[0]} standalone />
          </MFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="04 · Mobile (~390px)" subtitle="Histórico em cards · header com Plus icon-only · Sheet ocupa a tela cheia">
        <DCArtboard id="mob-hist" label="Histórico · cards" width={MPHONE} height={860}>
          <MvHistoryMobile />
        </DCArtboard>
        <DCArtboard id="mob-hist-sales" label="Histórico · Vendedor (sem custo, sem +)" width={MPHONE} height={860}>
          <MvHistoryMobile role="sales" />
        </DCArtboard>
        <DCArtboard id="mob-sheet" label="Sheet · Saída com itens (tela cheia)" width={MPHONE} height={940}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-field)", display: "flex" }}>
            <MvSheet type="out" state="filled" standalone mobile />
          </div>
        </DCArtboard>
        <DCArtboard id="mob-dialog" label="Dialog · Adicionar item (bottom sheet)" width={MPHONE} height={760}>
          <MvDialogMobile mode="add" type="in" variant="list" filled={[0, 2]} />
        </DCArtboard>
        <DCArtboard id="mob-dialog-invalid" label="Dialog · Saída com estoque insuficiente" width={MPHONE} height={760}>
          <MvDialogMobile mode="add" type="out" variant="list" invalidIdx={0} />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.MovCanvas = MovCanvas;
