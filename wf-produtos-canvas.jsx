/* Inventto — Wireframe · Módulo Produtos · montagem do canvas (Superfície 2 · 2.3) */

const {
  PROD_I, STK, PRODUCTS, PdListShell, PdList, PdListLoading, PdListMobile,
  PdStockPop, PdGradePop, PdActionsMenu, PdStatusBadge,
} = window.PROD;
const {
  PdWizardShell, PdWizard, PdInativarDialog, PdSubScreenShell, PdProgress,
} = window.PRODF;

const PW = 1240, PPHONE = 390;

/* moldura neutra com caption (igual ao org/equipe canvas) */
function Frame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center", position: "relative" }}>
        {children}
      </div>
      {toast && <div className="pd-toast-anchor">{toast}</div>}
    </div>
  );
}

/* chrome mobile genérico (para wizard mobile) */
function PhoneWrap({ children }) {
  return (
    <div className="wf sh-mobile">
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{window.SH.SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{window.SH.SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>{children}</div>
    </div>
  );
}

function ProdLegend() {
  const sw = (bg, bd, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg, borderColor: bd || "var(--wf-line)" }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Produtos (2.3)</h3>
      <p className="wf-legsub">O coração do inventário: a <b>lista /produtos</b> (tabela com sub-rows e tooltip de estoque · cards no mobile), o <b>wizard de cadastro</b> em 4 passos, a <b>edição</b>, o modal de <b>inativação</b>, as <b>categorias</b> e a <b>importação entre unidades</b>. Lo-fi cinza-escala — exceção deliberada: os quatro <b>estados semânticos de estoque</b> ganham cor (DS §1.2).</p>
      {sw("var(--pd-healthy)", "var(--pd-healthy)", "Saudável — saldo confortável (CircleCheck)")}
      {sw("var(--pd-warning)", "var(--pd-warning)", "Atenção — zona de buffer acima do mínimo (TriangleAlert)")}
      {sw("var(--pd-critical)", "var(--pd-critical)", "Crítico — saldo ≤ mínimo, > 0 (CircleX)")}
      {sw("var(--pd-zeroed)", "var(--wf-line)", "Zerado — esgotado, neutro e não vermelho (Ban)")}
      {sw("var(--wf-ink)", "var(--wf-ink)", "Preenchimento sólido = CTA primária / passo ativo")}
      {sw("var(--wf-err)", "var(--wf-err)", "Tijolo = inativar / ação destrutiva")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF016–RF021 · RN041–RN049, RN091. Microcopy §2–§8.</div>
    </div>
  );
}

/* referência de estados de estoque (badges) */
function StockRef() {
  const order = ["healthy", "warning", "critical", "zeroed", "inactive"];
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 26, background: "var(--wf-fieldbg)", height: "100%", justifyContent: "center" }}>
      <span className="wf-eyebrow">Badges de status — coluna Status</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {order.map((k) => <PdStatusBadge key={k} status={k} />)}
      </div>
      <span className="wf-eyebrow" style={{ marginTop: 8 }}>Ícone interativo — coluna Estoque</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {order.slice(0, 4).map((k) => (
          <span key={k} className="pd-stockicon" style={{ border: "1.5px solid var(--wf-line-soft)" }}>
            <span className={STK[k].st}>{PROD_I[STK[k].icon]}</span>
            <span className="pd-stockqty">{k === "zeroed" ? 0 : k === "critical" ? 6 : k === "warning" ? 14 : 45}</span>
          </span>
        ))}
      </div>
      <WNote><b>Zerado em neutro.</b> "Esgotado" lê como indisponível/apagado; o vermelho fica reservado à urgência real de reposição (Crítico). DS §1.2.</WNote>
    </div>
  );
}

function ProdCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Lista /produtos dentro do App Shell · tela inicial pós-login (RN091) — RF017">
        <DCArtboard id="legend" label="Legenda" width={600} height={470}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><ProdLegend /></div>
        </DCArtboard>
        <DCArtboard id="list-desk" label="Lista de produtos · Desktop · Owner/Manager" width={PW} height={780}>
          <PdListShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={440} height={780}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Tela inicial (RN091).</b> Enquanto o Dashboard não existe, <b>/produtos</b> é o destino pós-login.</WNote>
            <WNote><b>Tabela densa.</b> Produto (thumb+nome+SKU) · Categorias · <b>Estoque</b> (ícone interativo) · Status · Ações. Custo médio <b>não</b> entra na listagem — só na edição.</WNote>
            <WNote><b>Variações.</b> Linha-mãe mostra resumo compacto da grade; <b>ChevronDown</b> expande a sub-row de variantes (SKU mono · chips de atributo · status individual).</WNote>
            <WNote><b>Estoque interativo.</b> Hover/tap no ícone abre Tooltip (simples) ou Popover "Resumo da grade" (variações).</WNote>
            <WNote><b>Recorte por papel.</b> Sales: leitura pura — sem botão +, sem MoreVertical, sem ações.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── LISTA: VARIAÇÕES & ESTOQUE ───── */}
      <DCSection id="lista" title="01 · Lista — variações & estoque" subtitle="Sub-row de variantes expandida · tooltip (simples) · popover de grade — RN057">
        <DCArtboard id="list-expanded" label="Sub-row de variantes expandida (Camisa Social)" width={PW} height={1020}>
          <PdListShell scenario="expanded" />
        </DCArtboard>
        <DCArtboard id="pop-simple" label="Tooltip de estoque · produto simples" width={420} height={360}>
          <Frame tone="empty" name="Hover no ícone de estoque" refLabel="RF017" center>
            <div style={{ paddingTop: 30 }}><PdStockPop p={PRODUCTS.find((p) => p.id === "calca")} /></div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="pop-grade" label="Popover · resumo da grade (variações)" width={420} height={400}>
          <Frame tone="empty" name="Hover no resumo compacto de grade" refLabel="RN057" center>
            <div style={{ paddingTop: 30 }}><PdGradePop p={PRODUCTS.find((p) => p.id === "camisa")} /></div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="actions-menu" label="DropdownMenu de ações (Manager/Owner)" width={360} height={400}>
          <Frame tone="empty" name="MoreVertical por produto" refLabel="RF018 · RF019" center>
            <PdActionsMenu />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS DA TELA ───── */}
      <DCSection id="estados" title="02 · Estados da lista" subtitle="Carregando · primeira vez (vazio) · filtro sem resultado · recorte Sales — Matriz §2.3">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={920} height={560}>
          <Frame tone="load" name="Abre em skeleton de tabela" refLabel="Matriz" center={false}>
            <PdListLoading />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-firstrun" label="Primeira vez · sem produtos" width={920} height={560}>
          <Frame tone="empty" name="Ilustração + microcopy + CTA" refLabel="§4" center={false}>
            <PdList scenario="firstrun" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Filtro sem resultado" width={920} height={520}>
          <Frame tone="empty" name="Mensagem inline — “Nada encontrado”" refLabel="§4" center={false}>
            <PdList scenario="empty" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (leitura)" width={PW} height={780}>
          <Frame tone="empty" name="Sem +, sem MoreVertical, sem ações" refLabel="RF015" center={false} pad={0}>
            <PdListShell scenario="base" role="sales" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="stock-ref" label="Referência · estados de estoque" width={520} height={520}>
          <StockRef />
        </DCArtboard>
      </DCSection>

      {/* ───── WIZARD DE CADASTRO ───── */}
      <DCSection id="cadastro" title="03 · Cadastro de produto (wizard 4 passos)" subtitle="/produtos/novo · Informações → Imagens → Variações → Resumo — RF016, RN041–RN045">
        <DCArtboard id="wiz-1" label="Passo 1 · Informações básicas" width={PW} height={900}>
          <PdWizardShell mode="create" step={1} />
        </DCArtboard>
        <DCArtboard id="wiz-1-dup" label="Passo 1 · SKU duplicado (validação em tempo real)" width={820} height={820}>
          <Frame tone="err" name="“Já existe um produto com este SKU.”" refLabel="RN041 · §2" center={false}>
            <PdWizard mode="create" step={1} skuState="dup" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-2" label="Passo 2 · Imagens (upload em background)" width={820} height={760}>
          <Frame tone="empty" name="Drag-and-drop + grid · 1ª = destaque" refLabel="RF016" center={false}>
            <PdWizard mode="create" step={2} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-2-up" label="Passo 2 · Upload em andamento" width={820} height={780}>
          <Frame tone="load" name="“Continuar” desabilitado até concluir" refLabel="Matriz" center={false}>
            <PdWizard mode="create" step={2} uploading />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-3" label="Passo 3 · Atributos e variações (ligado)" width={820} height={980}>
          <Frame tone="empty" name="Atributos → grade gerada automaticamente" refLabel="RN044 · RN045" center={false}>
            <PdWizard mode="create" step={3} variations />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-3-off" label="Passo 3 · Sem variações" width={820} height={560}>
          <Frame tone="empty" name="Switch desligado (default)" refLabel="RF016" center={false}>
            <PdWizard mode="create" step={3} variations={false} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-4" label="Passo 4 · Resumo + aviso estoque zero" width={820} height={880}>
          <Frame tone="empty" name="Somente leitura + aviso RN042" refLabel="RN042 · §7" center={false}>
            <PdWizard mode="create" step={4} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-4-save" label="Passo 4 · Salvando" width={820} height={880}>
          <Frame tone="load" name="“Salvando…” → toast + navegação" refLabel="§5" center={false}>
            <PdWizard mode="create" step={4} saving />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── EDIÇÃO & INATIVAR ───── */}
      <DCSection id="edicao" title="04 · Edição & inativação" subtitle="/produtos/:id reusa o wizard · SKU travado se há movimentações · modal de inativar — RF018, RF019, RN046">
        <DCArtboard id="edit-1" label="Editar · Passo 1 · SKU readonly (há movimentações)" width={820} height={820}>
          <Frame tone="empty" name="SKU travado + “Inativar produto” no rodapé" refLabel="RF018 · RN041" center={false}>
            <PdWizard mode="edit" step={1} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="inativar" label="Modal: inativar produto" width={500} height={420}>
          <Frame tone="err" name="Soft delete — histórico mantido" refLabel="RF019 · RN046 · §3" center>
            <PdInativarDialog />
          </Frame>
        </DCArtboard>
        <DCArtboard id="inativar-exec" label="Modal: inativando" width={500} height={420}>
          <Frame tone="load" name="“Inativando…” → toast → redirect" refLabel="Matriz" center>
            <PdInativarDialog executing />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── CATEGORIAS ───── */}
      <DCSection id="categorias" title="05 · Categorias" subtitle="/produtos/categorias · criar e renomear · sem exclusão na v1 — RF020, RN047">
        <DCArtboard id="cat-base" label="Lista de categorias" width={760} height={620}>
          <Frame tone="empty" name="Nome + contador + editar inline" refLabel="RF020" center={false} pad={0}>
            <PdSubScreenShell screen="categorias" scenario="base" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="cat-editing" label="Edição inline ativa" width={760} height={620}>
          <Frame tone="empty" name="Nome vira Input + Check / X" refLabel="RF020" center={false} pad={0}>
            <PdSubScreenShell screen="categorias" scenario="editing" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="cat-saving" label="Salvando renomeação" width={760} height={620}>
          <Frame tone="load" name="Loader no confirmar" refLabel="§5" center={false} pad={0}>
            <PdSubScreenShell screen="categorias" scenario="saving" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="cat-empty" label="Vazio · primeira categoria" width={760} height={560}>
          <Frame tone="empty" name="Microcopy + CTA" refLabel="§4" center={false} pad={0}>
            <PdSubScreenShell screen="categorias" scenario="empty" />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── IMPORTAR ───── */}
      <DCSection id="importar" title="06 · Importar produtos" subtitle="/produtos/importar · copiar de outra unidade do tenant — RF021, RN048, RN049">
        <DCArtboard id="imp-base" label="Lista de origem · seleção" width={760} height={640}>
          <Frame tone="empty" name="Checkbox por item · “Já importado” travado" refLabel="RF021 · RN049" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="base" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="imp-importing" label="Importando" width={760} height={640}>
          <Frame tone="load" name="Loader + checkboxes bloqueadas" refLabel="Matriz" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="importing" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="imp-empty-prods" label="Sem produtos disponíveis" width={760} height={560}>
          <Frame tone="empty" name="Mensagem inline" refLabel="RN049" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="empty-prods" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="imp-empty-orgs" label="Sem outras organizações" width={760} height={520}>
          <Frame tone="empty" name="Estado orientativo" refLabel="RN017" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="empty-orgs" />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="07 · Mobile (~390px)" subtitle="Lista em cards · resumo de variantes expansível · wizard com Progress">
        <DCArtboard id="mob-list" label="Lista · cards (4:3)" width={PPHONE} height={860}>
          <PdListMobile />
        </DCArtboard>
        <DCArtboard id="mob-list-exp" label="Lista · sub-lista de variantes aberta" width={PPHONE} height={900}>
          <PdListMobile expandedVar="camisa" />
        </DCArtboard>
        <DCArtboard id="mob-wiz" label="Cadastro · Passo 1 com Progress" width={PPHONE} height={880}>
          <PhoneWrap><PdWizard mode="create" step={1} compact /></PhoneWrap>
        </DCArtboard>
        <DCArtboard id="mob-wiz3" label="Cadastro · Passo 3 (variações)" width={PPHONE} height={980}>
          <PhoneWrap><PdWizard mode="create" step={3} compact variations /></PhoneWrap>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.ProdCanvas = ProdCanvas;
