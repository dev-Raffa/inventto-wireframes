/* Inventto — Wireframe · Módulo Produtos · montagem do canvas (Superfície 2 · 2.3) */

const {
  PROD_I, STK, PRODUCTS, PdListShell, PdList, PdListLoading, PdListMobile,
  PdStockPop, PdGradePop, PdActionsMenu, PdStatusBadge,
} = window.PROD;
const {
  PdWizardShell, PdWizard, PdInativarDialog, PdAssociarImagensDialog, PdImageCard, PdSubScreenShell, PdImportMobile, PdProgress,
} = window.PRODF;

const PW = 1200, PPHONE = 390;

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
        <DCArtboard id="legend" label="Legenda" width={600} height={520}>
          <div style={{ height: "100%", boxSizing: "border-box", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><ProdLegend /></div>
        </DCArtboard>
        <DCArtboard id="list-desk" label="Lista de produtos · Desktop · Owner/Manager" width={PW} height={780}>
          <PdListShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="list-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={PW} height={780}>
          <PdListShell scenario="base" collapsed />
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
        <DCArtboard id="list-expanded" label="Sub-row de variantes expandida (Camisa Social)" width={PW} height={1150}>
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
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={920} height={600}>
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
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (leitura)" width={PW} height={830}>
          <Frame tone="empty" name="Sem +, sem MoreVertical, sem ações" refLabel="RF015" center={false} pad={0}>
            <PdListShell scenario="base" role="sales" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="stock-ref" label="Referência · estados de estoque" width={520} height={520}>
          <StockRef />
        </DCArtboard>
      </DCSection>

      {/* ───── WIZARD DE CADASTRO ───── */}
      <DCSection id="cadastro" title="03 · Cadastro de produto (wizard 3–4 passos)" subtitle="/produtos/novo · Informações (+ switch de variações) → Imagens → [Variações] → Resumo — RF016, RN041–RN045">
        <DCArtboard id="wiz-1" label="Passo 1 · Informações básicas (sem variações)" width={PW} height={980}>
          <PdWizardShell mode="create" step={1} variations={false} />
        </DCArtboard>
        <DCArtboard id="wiz-1-dup" label="Passo 1 · SKU duplicado (validação em tempo real)" width={820} height={965}>
          <Frame tone="err" name="“Já existe um produto com este SKU.”" refLabel="RN041 · §2" center={false}>
            <PdWizard mode="create" step={1} skuState="dup" variations={false} />
          </Frame>
        </DCArtboard>

        <DCArtboard id="wiz-1-combo" label="Passo 1 · Categoria · combobox pesquisável (RF020)" width={820} height={970}>
          <Frame tone="empty" name="Pesquisar + selecionar com ✓ — multi-seleção" refLabel="RF020" center={false}>
            <PdWizard mode="create" step={1} comboOpen="list" variations={false} />
          </Frame>
        </DCArtboard>

        <DCArtboard id="wiz-1-create" label="Passo 1 · Categoria · criação inline (RF020)" width={820} height={965}>
          <Frame tone="empty" name="Termo inexistente → “Criar nova: …”" refLabel="RF020" center={false}>
            <PdWizard mode="create" step={1} comboOpen="create" variations={false} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-1-var" label="Passo 1 · Variações ligadas (estoque mín. desabilitado → 4 passos)" width={820} height={965}>
          <Frame tone="empty" name="Switch ON · estoque mínimo passa a ser por variante" refLabel="RN044" center={false}>
            <PdWizard mode="create" step={1} variations />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-2" label="Passo 2 · Imagens · produto SEM variações (Card de imagem)" width={820} height={780}>
          <Frame tone="empty" name="Galeria usa o Card de imagem · capa + remover no hover" refLabel="RF010 · RF016" center={false}>
            <PdWizard mode="create" step={2} variations={false} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-2-var" label="Passo 2 · Imagens · produto COM variações (cards simples)" width={820} height={760}>
          <Frame tone="empty" name="Cards simples, sem ações · capa é por variante" refLabel="RF016 · RN044" center={false}>
            <PdWizard mode="create" step={2} variations />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-2-up" label="Passo 2 · Upload em andamento (com variações)" width={820} height={780}>
          <Frame tone="load" name="“Continuar” desabilitado até concluir" refLabel="Matriz" center={false}>
            <PdWizard mode="create" step={2} variations uploading />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-3" label="Passo 3 · Atributos e variações (só quando o switch está ON)" width={820} height={1210}>
          <Frame tone="empty" name="Atributos → grade · SKU + estoque mín. + imagens por variante" refLabel="RN044 · RN045" center={false}>
            <PdWizard mode="create" step={3} variations />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-4" label="Passo 4 · Resumo + aviso estoque zero" width={820} height={880}>
          <Frame tone="empty" name="Somente leitura + aviso RN042" refLabel="RN042 · §7" center={false}>
            <PdWizard mode="create" step={4} variations />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-3-resumo-noVar" label="Resumo sem variações · Passo 3 de 3" width={820} height={735}>
          <Frame tone="empty" name="Sem o card de variações · estoque mínimo no produto" refLabel="RF016" center={false}>
            <PdWizard mode="create" step={3} variations={false} />
          </Frame>
        </DCArtboard>
        <DCArtboard id="wiz-4-save" label="Passo final · Salvando" width={820} height={880}>
          <Frame tone="load" name="“Salvando…” → toast + navegação" refLabel="§5" center={false}>
            <PdWizard mode="create" step={4} variations saving />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── EDIÇÃO & INATIVAR ───── */}
      <DCSection id="edicao" title="04 · Edição & inativação" subtitle="/produtos/:id reusa o wizard · SKU travado se há movimentações · modal de inativar — RF018, RF019, RN046">
        <DCArtboard id="edit-1" label="Editar · Passo 1 · SKU readonly (há movimentações)" width={820} height={965}>
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

      {/* ───── COMPONENTE: CARD DE IMAGEM ───── */}
      <DCSection id="card-image" title="05 · Componente — Card de imagem" subtitle="Estados do card de imagem na associação à variante / capa do produto — RF010, RN044">
        <DCArtboard id="ci-states" label="4 estados · destaque/normal × repouso/hover" width={760} height={300}>
          <Frame tone="empty" name="Estrela = define a capa · X = desassociar" refLabel="RF010" center>
            <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
              {[
                { principal: true, state: undefined, cap: "Destaque · repouso", sub: "estrela dourada fixa" },
                { principal: true, state: "hover", cap: "Destaque · hover", sub: "X desassocia" },
                { principal: false, state: undefined, cap: "Normal · repouso", sub: "só a imagem" },
                { principal: false, state: "hover", cap: "Normal · hover", sub: "estrela + X" },
              ].map((it, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <PdImageCard principal={it.principal} state={it.state} />
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--wf-ink)" }}>{it.cap}</span>
                    <span style={{ fontSize: 10.5, color: "var(--wf-muted)", fontFamily: "var(--wf-mono)" }}>{it.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── ASSOCIAR IMAGENS À VARIAÇÃO (2.3.5) ───── */}
      <DCSection id="assoc-imagens" title="06 · Modal — Associar imagens à variação (2.3.5)" subtitle="Acionado pelo botão ImagePlus na célula de imagens da variante (Passo 3 / Edição) — RF010, RF016, RN044, RN045">
        <DCArtboard id="assoc-base" label="Inicial · nada selecionado (Confirmar desabilitado)" width={820} height={700}>
          <Frame tone="empty" name="Pool de imagens não associadas · grid 5 col" refLabel="RF010" center>
            <PdAssociarImagensDialog scenario="base" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="assoc-selected" label="Com seleção · sem replicação (Confirmar habilitado)" width={820} height={700}>
          <Frame tone="empty" name="3 imagens marcadas → contador atualiza" refLabel="RF016" center>
            <PdAssociarImagensDialog scenario="selected" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="assoc-rep-open" label="Replicação ativada · sem regra (Confirmar desabilitado)" width={820} height={770}>
          <Frame tone="empty" name="RadioGroup por atributo da variante ativa" refLabel="RN045" center>
            <PdAssociarImagensDialog scenario="replicate-open" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="assoc-rep-chosen" label="Replicação ativada · regra escolhida (Confirmar habilitado)" width={820} height={770}>
          <Frame tone="empty" name="“Todas as variações: Branco” selecionada" refLabel="RN045" center>
            <PdAssociarImagensDialog scenario="replicate-chosen" />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── IMPORTAR ───── */}
      <DCSection id="importar" title="07 · Importar produtos" subtitle="/produtos/importar · copiar de outra unidade do tenant — RF021, RN048, RN049">
        <DCArtboard id="imp-base" label="Lista de origem · seleção" width={PW} height={780}>
          <Frame tone="empty" name="Checkbox por item · “Já importado” travado" refLabel="RF021 · RN049" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="base" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="imp-importing" label="Importando" width={PW} height={730}>
          <Frame tone="load" name="Loader + checkboxes bloqueadas" refLabel="Matriz" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="importing" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="imp-empty-prods" label="Sem produtos disponíveis" width={PW} height={610}>
          <Frame tone="empty" name="Mensagem inline" refLabel="RN049" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="empty-prods" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="imp-empty-orgs" label="Sem outras organizações" width={PW} height={610}>
          <Frame tone="empty" name="Estado orientativo" refLabel="RN017" center={false} pad={0}>
            <PdSubScreenShell screen="importar" scenario="empty-orgs" />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="08 · Mobile (~390px)" subtitle="Lista em cards · resumo de variantes expansível · wizard com Progress">
        <DCArtboard id="mob-list" label="Lista · cards (4:3)" width={PPHONE} height={2710}>
          <PdListMobile />
        </DCArtboard>
        <DCArtboard id="mob-list-exp" label="Lista · sub-lista de variantes aberta" width={PPHONE} height={2890}>
          <PdListMobile expandedVar="camisa" />
        </DCArtboard>
        <DCArtboard id="mob-wiz" label="Cadastro · Passo 1 com Progress (switch de variações)" width={PPHONE} height={1000}>
          <PhoneWrap><PdWizard mode="create" step={1} compact /></PhoneWrap>
        </DCArtboard>
        <DCArtboard id="mob-wiz3" label="Cadastro · Passo 3 · variantes em cards" width={PPHONE} height={1820}>
          <PhoneWrap><PdWizard mode="create" step={3} compact variations /></PhoneWrap>
        </DCArtboard>
        <DCArtboard id="mob-imp" label="Importar · seleção de produtos" width={PPHONE} height={710}>
          <PdImportMobile scenario="base" />
        </DCArtboard>
        <DCArtboard id="mob-imp-importing" label="Importar · importando" width={PPHONE} height={665}>
          <PdImportMobile scenario="importing" />
        </DCArtboard>
        <DCArtboard id="mob-imp-empty" label="Importar · sem produtos disponíveis" width={PPHONE} height={470}>
          <PdImportMobile scenario="empty-prods" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.ProdCanvas = ProdCanvas;
