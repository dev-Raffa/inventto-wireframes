/* Inventto — Wireframe · Módulo Catálogos · montagem do canvas (Superfície 2 · 2.5) */

const {
  CAT_I, CatTypeBadge, CatStateBadge, CatList, CatListShell, CatListLoading,
  CatActionsMenu, PrereqDialog, RemoveDialog, CatListMobile, CATALOGS,
} = window.CAT;
const {
  CC_I, ConfigShell, CuradoriaShell, Curadoria, AddProductsSheet, VitrinePreview, CatColorPicker,
} = window.CATC;

const CW = 1200, CPHONE = 390;

/* moldura neutra com caption (igual aos demais módulos) */
function CFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, scrim, toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {children}
      </div>
      {toast && <div className="ct-toast-anchor">{toast}</div>}
    </div>
  );
}

function CatLegend() {
  const sw = (cls, label) => <div className="wf-legrow"><span className={["wf-swatch", cls].join(" ")} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Catálogos (2.5)</h3>
      <p className="wf-legsub">Onde se define <b>o que se vende e por quanto</b>: a <b>lista /catalogos</b> (PDV + vitrines online, com ciclo de vida), o <b>Configurar</b> (abas que mudam por tipo, com preview ao vivo da vitrine), a <b>Curadoria</b> (produtos + preço, com auto-save) e o <b>Modal de remoção</b>. Lo-fi cinza-escala — exceção: o <b>eixo de canal</b> (PDV × Online) e o <b>estado</b> da vitrine ganham cor (DS §1.2).</p>
      {sw("ct-leg-pdv", "PDV — catálogo de balcão (sem endereço público)")}
      {sw("ct-leg-online", "Online — vitrine com slug inventto.app/")}
      {sw("ct-leg-live", "No ar — vitrine publicada e visível")}
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-ink)", borderColor: "var(--wf-ink)" }} />Preenchimento sólido = CTA primária</div>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-note-bg)", borderColor: "var(--wf-note)" }} />Ardósia = nota de regra (RN)</div>
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF024–RF026 · RN058–RN067. Microcopy §2, §4, §5, §8.</div>
    </div>
  );
}

/* referência de primitivos (badges de canal/estado + colorpicker) */
function CatRef() {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 26, background: "var(--wf-fieldbg)", height: "100%", justifyContent: "center" }}>
      <span className="wf-eyebrow">Badge de tipo — coluna Tipo</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <CatTypeBadge type="pdv" /><CatTypeBadge type="online" />
      </div>
      <span className="wf-eyebrow" style={{ marginTop: 6 }}>Estado da vitrine — coluna Estado (público)</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <CatStateBadge state="live" /><CatStateBadge state="off" /><CatStateBadge state={null} />
      </div>
      <span className="wf-eyebrow" style={{ marginTop: 6 }}>ColorPicker [a construir] — identidade da vitrine</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <CatColorPicker label="Cor primária" color="#2F5D4A" hex="#2F5D4A" />
        <CatColorPicker label="Secundária" color="#C98A3A" hex="#C98A3A" />
      </div>
      <WNote><b>PDV × Online é o eixo do módulo.</b> Catálogos de balcão alimentam o PDV e não têm endereço; vitrines online têm slug, identidade visual e ciclo de publicação (No ar / Despublicado). Só esse eixo recebe cor — todo o resto é cinza-escala. DS §1.2.</WNote>
    </div>
  );
}

function CatCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Lista /catalogos dentro do App Shell · PDV + vitrines online com ciclo de vida — RF024">
        <DCArtboard id="legend" label="Legenda" width={600} height={460}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><CatLegend /></div>
        </DCArtboard>
        <DCArtboard id="list-desk" label="Lista · Desktop · Owner/Manager" width={CW} height={640}>
          <CatListShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="list-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={CW} height={640}>
          <CatListShell scenario="base" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={460} height={640}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Dois tipos, uma lista.</b> Catálogo <b>PDV</b> (balcão, sem endereço) e <b>Online</b> (vitrine com slug). A coluna <b>Estado</b> só se aplica a vitrines online (No ar / Despublicado).</WNote>
            <WNote><b>Ciclo de vida (RN066).</b> Publicar uma vitrine verifica pré-requisitos (WhatsApp + horários + ≥1 produto com preço). Faltando algo → Dialog orientativo com atalhos.</WNote>
            <WNote><b>Ações (DropdownMenu).</b> Configurar · Curadoria · Publicar/Despublicar · Copiar link (só No ar) · Remover. Copiar link fica desabilitado em vitrines fora do ar.</WNote>
            <WNote><b>Recorte por papel.</b> Sales: leitura — sem “Criar catálogo” e sem dropdown de ações.</WNote>
            <WNote><b>Remoção (RN063).</b> Vitrine pública removida deixa o slug em quarentena por 30 dias.</WNote>
          </div>
        </DCArtboard>
        <DCArtboard id="cat-ref" label="Referência · primitivos" width={560} height={560}>
          <CatRef />
        </DCArtboard>
      </DCSection>

      {/* ───── LISTA: ESTADOS & AÇÕES ───── */}
      <DCSection id="lista" title="01 · Lista de catálogos · estados e ações" subtitle="Carregando · vazio · dropdown de ações · Dialog de pré-requisitos · recorte Vendedor — RF024, RN066">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={980} height={460}>
          <CFrame tone="load" name="Abre em skeleton de tabela" refLabel="Matriz" center={false}>
            <CatListLoading />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Primeira vez · sem catálogos" width={980} height={460}>
          <CFrame tone="empty" name="Microcopy + CTA “Criar catálogo”" refLabel="§4" center={false}>
            <CatList scenario="empty" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="st-menu" label="DropdownMenu de ações (vitrine No ar)" width={CW} height={640}>
          <CFrame tone="empty" name="Configurar · Curadoria · Despublicar · Copiar link · Remover" refLabel="RN058–64" center={false} pad={0}>
            <CatListShell scenario="base" menuFor="c2" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="st-prereq" label="Dialog · pré-requisitos de publicação" width={CW} height={640}>
          <div className="ct-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}><CatListShell scenario="base" /></div>
            <div className="ct-scrim"><PrereqDialog /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (leitura)" width={CW} height={600}>
          <CFrame tone="empty" name="Sem “Criar catálogo”, sem coluna/dropdown de ações" refLabel="RN058" center={false} pad={0}>
            <CatListShell scenario="base" role="sales" />
          </CFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CONFIGURAR ───── */}
      <DCSection id="config" title="02 · Configurar catálogo · /catalogos/:id" subtitle="Abas por tipo · Geral (slug com validação) · Vitrine com preview ao vivo · PDV — RF024, RF026, RN062">
        <DCArtboard id="cfg-vitrine" label="Vitrine (público) · identidade + comportamento + preview" width={CW} height={860}>
          <ConfigShell type="online" tab="vitrine" dirty layout="grid" showPrices={true} showSoldout={true} />
        </DCArtboard>
        <DCArtboard id="cfg-geral" label="Geral (público) · slug disponível" width={CW} height={680}>
          <ConfigShell type="online" tab="geral" slugState="ok" />
        </DCArtboard>
        <DCArtboard id="cfg-slug-taken" label="Geral · slug em uso (erro inline)" width={760} height={560}>
          <CFrame tone="err" name="“Este endereço já está em uso.”" refLabel="RN062 · §2" center={false}>
            <div className="wf" style={{ width: "100%", maxWidth: 560 }}>
              <ConfigShell type="online" tab="geral" slugState="taken" />
            </div>
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cfg-saving" label="Vitrine · salvando alterações" width={CW} height={860}>
          <CFrame tone="load" name="“Salvando…” → toast “Alterações salvas.”" refLabel="§5" center={false} pad={0} toast={<WToast ok>Alterações salvas.</WToast>}>
            <ConfigShell type="online" tab="vitrine" saving layout="list" showPrices={false} showSoldout={true} />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cfg-pdv" label="PDV · abas reduzidas (Geral + Curadoria)" width={CW} height={560}>
          <ConfigShell type="pdv" tab="geral" />
        </DCArtboard>
        <DCArtboard id="cfg-preview-vars" label="Preview · variações de comportamento" width={460} height={900}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 22, display: "flex", flexDirection: "column", gap: 18, overflow: "auto" }}>
            <VitrinePreview layout="grid" showPrices={true} showSoldout={true} />
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>↓ preços ocultos · lista · sem esgotados</div>
            <VitrinePreview layout="list" showPrices={false} showSoldout={false} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── CURADORIA ───── */}
      <DCSection id="curadoria" title="03 · Curadoria de itens · /catalogos/:id/itens" subtitle="Produtos + preço de venda/original + destaque · auto-save · Sheet adicionar produtos — RF025, RN065">
        <DCArtboard id="cur-base" label="Curadoria · itens com preço (base)" width={CW} height={640}>
          <CuradoriaShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="cur-new" label="Item recém-adicionado · sem preço (warning)" width={CW} height={720}>
          <CFrame tone="err" name="Borda warning + “Defina um preço para incluir este item.”" refLabel="RN065 · §2" center={false} pad={0}>
            <CuradoriaShell scenario="new" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-empty" label="Curadoria · vazia" width={980} height={460}>
          <CFrame tone="empty" name="“Adicione produtos a este catálogo.” + CTA" refLabel="§4" center={false}>
            <Curadoria scenario="empty" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-sheet" label="Sheet · Adicionar produtos (max-w-lg)" width={CW} height={760}>
          <div className="ct-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}><CuradoriaShell scenario="base" /></div>
            <div className="mv-sheet-scrim" />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, display: "flex" }}><AddProductsSheet /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="cur-sheet-solo" label="Sheet · standalone" width={560} height={720}>
          <CFrame tone="empty" name="Checkbox por produto · “Já adicionado” desabilitado" refLabel="RF025" center={false}>
            <AddProductsSheet standalone />
          </CFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MODAL & MOBILE ───── */}
      <DCSection id="modal-mobile" title="04 · Modal de remoção & Mobile (~390px)" subtitle="Modal 2.5.4 (slug em quarentena) · lista em cards · header com Plus icon-only">
        <DCArtboard id="rm-online" label="Remover vitrine pública (slug 30 dias)" width={520} height={420}>
          <CFrame tone="err" name="“ficará reservado por 30 dias” (RN063)" refLabel="2.5.4">
            <RemoveDialog variant="online" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="rm-pdv" label="Remover catálogo PDV · removendo" width={520} height={400}>
          <CFrame tone="load" name="“Removendo…” → toast “Catálogo removido.”" refLabel="Matriz">
            <RemoveDialog variant="pdv" state="saving" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="mob-list" label="Lista · cards (mobile)" width={CPHONE} height={720}>
          <CatListMobile />
        </DCArtboard>
        <DCArtboard id="mob-list-sales" label="Lista · Vendedor (sem + / sem ações)" width={CPHONE} height={720}>
          <CatListMobile role="sales" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.CatCanvas = CatCanvas;
