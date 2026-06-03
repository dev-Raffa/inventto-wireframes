/* Inventto — Wireframe · Módulo Catálogos · montagem do canvas (Superfície 2 · 2.5)
   Catálogo CANAL-AGNÓSTICO: lista com ações inline (Editar/Remover), Dialog Criar,
   Sheet Editar (nome + canais vinculados read-only), Produtos do catálogo
   (preço, sem destaque) e Dialog de remoção (variantes A/B · RN061). */

const {
  CAT_I, CatList, CatListShell, CatListLoading,
  RemoveDialog, CreateCatalogDialog, CatListMobile, CATALOGS,
  CatChannels, CreateCatalogMobile, RemoveCatalogMobile,
} = window.CAT;
const {
  CC_I, EditCatalogSheet, CuradoriaShell, Curadoria, AddProductsSheet,
  LinkedChannels, UndoToast, ProdutosMobile, EditCatalogMobile, AddProductsMobile,
} = window.CATC;

const CW = 1200, CPHONE = 390;

/* moldura neutra com caption (igual aos demais módulos) */
function CFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
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
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Catálogos (2.5)</h3>
      <p className="wf-legsub">Onde se define <b>o que se vende e por quanto</b>. O catálogo é <b>canal-agnóstico</b>: não tem tipo nem publicação — é só um <b>nome</b> e uma lista de <b>produtos com preço</b>. São os <b>canais</b> (PDV e storefronts) que escolhem qual catálogo usar nas próprias configurações. Cinco telas: a <b>lista /catalogos</b> (ações inline Editar/Remover), o <b>Dialog Criar</b> (nome), o <b>Sheet Editar</b> (nome + canais vinculados read-only), os <b>Produtos do catálogo</b> (itens + preço, com auto-save) e o <b>Dialog Remover</b> (A: confirmação por nome · B: bloqueada por canais). Lo-fi cinza-escala integral.</p>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-ink)", borderColor: "var(--wf-ink)" }} />Preenchimento sólido = CTA primária</div>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-note-bg)", borderColor: "var(--wf-note)" }} />Ardósia = nota de regra (RN)</div>
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF024–RF025 · RN058–RN063. Microcopy §2, §3, §4, §5.</div>
    </div>
  );
}

function CatCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Lista /catalogos dentro do App Shell · catálogo canal-agnóstico (nome + itens) — RF024">
        <DCArtboard id="legend" label="Legenda" width={600} height={460}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><CatLegend /></div>
        </DCArtboard>
        <DCArtboard id="list-desk" label="Lista · Desktop · Owner/Manager" width={CW} height={620}>
          <CatListShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="list-desk-collapsed" label="Mesma tela · sidebar recolhida (modelo do App Shell)" width={CW} height={620}>
          <CatListShell scenario="base" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={460} height={620}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Canal-agnóstico.</b> O catálogo não tem tipo (PDV/online) nem estado de publicação. É apenas um nome + uma curadoria de itens com preço.</WNote>
            <WNote><b>Canais vinculados.</b> A lista mostra quantos canais (PDV e storefronts) usam cada catálogo. Quem vincula é o canal, na própria configuração — aqui é read-only.</WNote>
            <WNote><b>Ações inline.</b> Editar (ícone lápis → Sheet de edição do nome) e Remover (ícone lixeira → Dialog). Sem publicar/copiar link — isso pertence ao storefront.</WNote>
            <WNote><b>Recorte por papel.</b> Sales: leitura — sem “Criar catálogo” e sem ícones de ação.</WNote>
            <WNote><b>Remoção (RN061).</b> Bloqueada enquanto houver canais vinculados (variante B). Sem canais → permitida, confirmada por digitação do nome (variante A).</WNote>
          </div>
        </DCArtboard>
        <DCArtboard id="cat-ref" label="Referência · contador de canais" width={420} height={300}>
          <div className="wf" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 16, padding: 26, background: "var(--wf-fieldbg)", justifyContent: "center" }}>
            <span className="wf-eyebrow">Coluna “Canais vinculados”</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}><CatChannels channels={[{}, {}]} /><span style={{ fontSize: 11.5, color: "var(--wf-muted)", fontFamily: "var(--wf-mono)" }}>· dois ou mais</span></div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}><CatChannels channels={[{}]} /><span style={{ fontSize: 11.5, color: "var(--wf-muted)", fontFamily: "var(--wf-mono)" }}>· singular</span></div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}><CatChannels channels={[]} /><span style={{ fontSize: 11.5, color: "var(--wf-muted)", fontFamily: "var(--wf-mono)" }}>· removível (variante A)</span></div>
            </div>
            <WNote><b>Sem cor semântica.</b> Sem o eixo PDV×Online, o módulo é cinza-escala integral.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── LISTA: ESTADOS & AÇÕES ───── */}
      <DCSection id="lista" title="01 · Lista de catálogos · estados e ações" subtitle="Carregando · vazio · ações inline (Editar/Remover) · recorte Vendedor — RF024, RN058">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={CW} height={480}>
          <CFrame tone="load" name="Abre em skeleton de tabela" refLabel="Matriz" center={false}>
            <CatListLoading />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Primeira vez · sem catálogos" width={CW} height={460}>
          <CFrame tone="empty" name="Microcopy + CTA “Criar catálogo”" refLabel="§4" center={false}>
            <CatList scenario="empty" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="st-sales" label="Recorte por papel · Vendedor (leitura)" width={CW} height={600}>
          <CFrame tone="empty" name="Sem “Criar catálogo”, sem coluna/ícones de ação" refLabel="RN058" center={false} pad={0}>
            <CatListShell scenario="base" role="sales" />
          </CFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CRIAR (dialog) & EDITAR (sheet) ───── */}
      <DCSection id="editar" title="02 · Criar (Dialog 2.5.2) & editar (Sheet 2.5.3) · sobre /catalogos" subtitle="Criar é um Dialog max-w-sm — campo único Nome → redireciona p/ os produtos (sem toast). Editar é um Sheet max-w-md — Nome + canais vinculados read-only → toast “Alterações salvas.” — RF024, RN058–RN062, §2/§5">
        <DCArtboard id="ed-novo" label="Dialog · Criar catálogo (sobre /catalogos)" width={CW} height={640}>
          <div className="ct-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0 }}><CatListShell scenario="base" /></div>
            <div className="ct-scrim"><CreateCatalogDialog /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="ed-novo-err" label="Criar · nome vazio ao salvar (erro §2)" width={520} height={400}>
          <CFrame tone="err" name="“Informe um nome para o catálogo.”" refLabel="§2">
            <CreateCatalogDialog state="error" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="ed-novo-saving" label="Criar · Criando… (Loader2 + botão desabilitado)" width={520} height={400}>
          <CFrame tone="load" name="“Criando…” → redireciona p/ /catalogos/:id/produtos" refLabel="RN060">
            <CreateCatalogDialog state="saving" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="ed-edit" label="Sheet · Editar catálogo (sobre /catalogos)" width={CW} height={640}>
          <div className="ct-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0 }}><CatListShell scenario="base" /></div>
            <div className="mv-sheet-scrim" />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, display: "flex" }}><EditCatalogSheet /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="ed-edit-solo" label="Sheet · standalone (Nome + canais vinculados)" width={560} height={620}>
          <CFrame tone="empty" name="Cabeçalho “Editar catálogo” · ghost Cancelar + Salvar" refLabel="2.5.3" center={false}>
            <EditCatalogSheet standalone />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="ed-edit-saving" label="Editar · Salvando… → toast" width={560} height={620}>
          <CFrame tone="load" name="“Salvando…” → toast “Alterações salvas.”" refLabel="§5" center={false} toast={<WToast ok>Alterações salvas.</WToast>}>
            <EditCatalogSheet standalone saving />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="ed-edit-nochan" label="Editar · sem canais vinculados" width={560} height={520}>
          <CFrame tone="empty" name="“Nenhum canal vinculado a este catálogo.”" refLabel="2.5.3" center={false}>
            <EditCatalogSheet standalone nameVal="Outlet & Promoções" channels={[]} />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="ed-edit-loading" label="Editar · carregando (skeleton)" width={560} height={560}>
          <CFrame tone="load" name="Abre em skeleton · botão Salvar desabilitado" refLabel="Matriz" center={false}>
            <EditCatalogSheet standalone loading />
          </CFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── PRODUTOS DO CATÁLOGO ───── */}
      <DCSection id="curadoria" title="03 · Produtos do catálogo · /catalogos/:id/produtos" subtitle="Itens + preço de venda/original · auto-save · sem destaque (pertence ao storefront) — RF025, RN063">
        <DCArtboard id="cur-base" label="Produtos · itens com preço (base)" width={CW} height={660}>
          <CuradoriaShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="cur-new" label="Item recém-adicionado · sem preço (warning)" width={CW} height={880}>
          <CFrame tone="err" name="Borda warning + “Defina um preço para incluir este item.”" refLabel="RN063 · §2" center={false} pad={0}>
            <CuradoriaShell scenario="new" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-saving" label="Auto-save de preço (spinner discreto)" width={CW} height={720}>
          <CFrame tone="load" name="Preço salva automaticamente · “salvando…”" refLabel="Matriz" center={false} pad={0}>
            <CuradoriaShell scenario="saving" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-undo" label="Remoção reversível (toast 5s)" width={CW} height={700}>
          <CFrame tone="empty" name="“{produto} removido. Desfazer”" refLabel="§3" center={false} pad={0} toast={<UndoToast />}>
            <CuradoriaShell scenario="base" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-empty" label="Produtos · vazio" width={CW} height={460}>
          <CFrame tone="empty" name="“Adicione produtos a este catálogo.” + CTA" refLabel="§4" center={false}>
            <Curadoria scenario="empty" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-sales" label="Vendedor · campos readonly, sem ações" width={CW} height={700}>
          <CFrame tone="empty" name="Sales: visualização — sem “Adicionar” e sem remover" refLabel="RN058" center={false} pad={0}>
            <CuradoriaShell scenario="base" role="sales" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="cur-sheet" label="Sheet · Adicionar produtos (max-w-lg)" width={CW} height={900}>
          <div className="ct-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0 }}><CuradoriaShell scenario="base" /></div>
            <div className="mv-sheet-scrim" />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, display: "flex" }}><AddProductsSheet /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="cur-sheet-solo" label="Sheet · standalone" width={560} height={700}>
          <CFrame tone="empty" name="Checkbox por produto · “Já adicionado” desabilitado" refLabel="RF025" center={false}>
            <AddProductsSheet standalone />
          </CFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── DIALOG REMOVER ───── */}
      <DCSection id="modal" title="04 · Dialog remover (2.5.5)" subtitle="A: remoção permitida — confirmada por digitação do nome · B: bloqueada por canais (RN061)">
        <DCArtboard id="rm-a" label="Variante A · idle (Remover desabilitado até confirmar)" width={520} height={470}>
          <CFrame tone="err" name="“Digite o nome do catálogo para confirmar”" refLabel="2.5.5 · A">
            <RemoveDialog variant="A" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="rm-a-confirmed" label="Variante A · nome digitado (Remover habilitado)" width={520} height={470}>
          <CFrame tone="err" name="Match exato → botão destrutivo habilitado" refLabel="2.5.5 · A">
            <RemoveDialog variant="A" state="confirmed" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="rm-a-saving" label="Variante A · removendo" width={520} height={470}>
          <CFrame tone="load" name="“Removendo…” → toast “Catálogo removido.”" refLabel="Matriz" toast={<WToast ok>Catálogo removido.</WToast>}>
            <RemoveDialog variant="A" state="saving" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="rm-b" label="Variante B · bloqueada por canais vinculados (RN061)" width={520} height={460}>
          <CFrame tone="empty" name="“Desvincule-os antes de remover.” + lista de canais" refLabel="2.5.5 · B">
            <RemoveDialog variant="B" />
          </CFrame>
        </DCArtboard>
        <DCArtboard id="rm-b-over" label="Variante B · sobre a lista" width={CW} height={640}>
          <div className="ct-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0 }}><CatListShell scenario="base" /></div>
            <div className="ct-scrim"><RemoveDialog variant="B" /></div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE (~390px) ───── */}
      <DCSection id="mobile" title="05 · Mobile (~390px)" subtitle="Todas as telas do módulo em ~390px: lista, criar (dialog), editar (bottom sheet), produtos e remover — RF024–RF025">
        <DCArtboard id="mob-list" label="Lista · cards (Owner/Manager)" width={CPHONE} height={720}>
          <CatListMobile />
        </DCArtboard>
        <DCArtboard id="mob-list-sales" label="Lista · Vendedor (sem + / sem ações)" width={CPHONE} height={720}>
          <CatListMobile role="sales" />
        </DCArtboard>
        <DCArtboard id="mob-create" label="Criar catálogo · Dialog (2.5.2)" width={CPHONE} height={720}>
          <CreateCatalogMobile />
        </DCArtboard>
        <DCArtboard id="mob-edit" label="Editar catálogo · bottom sheet (2.5.3)" width={CPHONE} height={720}>
          <EditCatalogMobile />
        </DCArtboard>
        <DCArtboard id="mob-produtos" label="Produtos do catálogo (2.5.4)" width={CPHONE} height={848}>
          <ProdutosMobile />
        </DCArtboard>
        <DCArtboard id="mob-produtos-sales" label="Produtos · Vendedor (readonly)" width={CPHONE} height={848}>
          <ProdutosMobile role="sales" />
        </DCArtboard>
        <DCArtboard id="mob-addprod" label="Adicionar produtos · bottom sheet (max-w-lg)" width={CPHONE} height={760}>
          <AddProductsMobile />
        </DCArtboard>
        <DCArtboard id="mob-remove" label="Remover catálogo · Dialog A (2.5.5)" width={CPHONE} height={720}>
          <RemoveCatalogMobile variant="A" state="confirmed" />
        </DCArtboard>
        <DCArtboard id="mob-remove-b" label="Remover bloqueado · Dialog B (RN061)" width={CPHONE} height={720}>
          <RemoveCatalogMobile variant="B" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.CatCanvas = CatCanvas;
