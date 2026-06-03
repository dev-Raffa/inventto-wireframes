/* Inventto — Wireframe · Módulo Vendas no Balcão / PDV · montagem do canvas
   (Superfície 2 · 2.6) — revisão jun/2026. */

const {
  PDV_I, PvCatalogScreen, AddProductDialog, CartSheet, NoCatalogBlock, NewSaleShell,
} = window.PDV;
const {
  NewSaleMobile, AddDialogOverDesktop, AddDialogOverMobile,
  CartSheetOverDesktop, CartSheetOverMobile,
} = window.PDVV;

const CW = 1200, CPHONE = 390;

/* moldura neutra com caption (igual aos demais módulos) */
function PFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-fieldbg)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {children}
      </div>
      {toast && <div className="ct-toast-anchor">{toast}</div>}
    </div>
  );
}

function PdvLegend() {
  const sw = (bg, bd, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg, borderColor: bd }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Vendas no Balcão / PDV (2.6)</h3>
      <p className="wf-legsub">Onde se <b>vende presencialmente</b>. <b>Layout único</b> (mobile e desktop): a tela inteira é o <b>catálogo</b>; o carrinho fica fora de vista durante a montagem. Clique num produto → <b>Dialog “Adicionar produto”</b> (quantidade + desconto por item · RN073). O <b>FAB</b> abre o <b>Sheet “Venda atual”</b> p/ revisar e confirmar. A <b>consulta de vendas saiu deste módulo</b> → vive em <span style={{ fontFamily: "var(--wf-mono)" }}>/movimentacoes</span> (Saída · motivo Venda). Cor <b>funcional apenas</b>.</p>
      {sw("var(--pd-warning-bg2)", "var(--pd-warning)", "Âmbar — item com estoque insuficiente (RN055/RN070)")}
      {sw("var(--wf-err-bg)", "var(--wf-err)", "Tijolo — valor de desconto e erro")}
      {sw("var(--wf-ok-bg)", "var(--wf-ok)", "Verde dessat. — cliente reconhecido / sucesso")}
      {sw("var(--wf-ink)", "var(--wf-ink)", "Preenchimento sólido = CTA primária + FAB")}
      {sw("var(--wf-note-bg)", "var(--wf-note)", "Ardósia = nota de regra (RN)")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF027 · RN055 · RN068–RN073. Microcopy §2, §5.</div>
    </div>
  );
}

function PdvCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="/pdv dentro do App Shell · catálogo em tela cheia (sem split-screen) + FAB do carrinho — RF027">
        <DCArtboard id="legend" label="Legenda" width={640} height={460}>
          <div style={{ height: "100%", boxSizing: "border-box", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><PdvLegend /></div>
        </DCArtboard>
        <DCArtboard id="newsale-desk" label="Nova venda · Desktop · catálogo + FAB (3 itens no carrinho)" width={CW} height={720}>
          <NewSaleShell scenario="base" fab={3} />
        </DCArtboard>
        <DCArtboard id="newsale-desk-collapsed" label="Mesma tela · sidebar recolhida (modelo do App Shell)" width={CW} height={736}>
          <NewSaleShell scenario="base" fab={3} collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={480} height={720}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Layout único.</b> Mobile e desktop usam a mesma estrutura: tela inteira dedicada ao catálogo. O carrinho não fica visível durante a montagem — o vendedor foca em selecionar produtos.</WNote>
            <WNote><b>Adição via Dialog (2.6.1a).</b> Clique no card ou no <span style={{ fontFamily: "var(--wf-mono)" }}>+</span> abre um Dialog para definir <b>quantidade</b> e <b>desconto por item</b> (RN073) antes de incluir no carrinho.</WNote>
            <WNote><b>FAB → Sheet (2.6.1b).</b> O botão flutuante (canto inferior direito) é <b>oculto com carrinho vazio</b> e aparece ao primeiro item, com contador. Abre o Sheet “Venda atual” para revisar e confirmar.</WNote>
            <WNote><b>Venda = pedido pos (RN068).</b> Confirmar cria um pedido <span style={{ fontFamily: "var(--wf-mono)" }}>pos</span> confirmado, gera saída de estoque (motivo “Venda”) e vincula/cria o cliente.</WNote>
            <WNote><b>Consulta migrada.</b> O histórico de vendas de balcão não tem tela própria: é consultado em <span style={{ fontFamily: "var(--wf-mono)" }}>/movimentacoes</span> (Saída · motivo Venda).</WNote>
            <WNote><b>Acesso idêntico (RN071).</b> Sales, Manager e Owner usam o PDV da mesma forma.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── CATÁLOGO: ESTADOS ───── */}
      <DCSection id="catalogo" title="01 · Catálogo · estados" subtitle="Bloqueio sem catálogo · carregando · busca sem resultado · carrinho vazio (FAB oculto) — RN069, RN055">
        <DCArtboard id="st-block" label="Bloqueio · sem catálogo PDV vinculado" width={CW} height={620}>
          <PFrame tone="empty" name="“Vincule um catálogo ao PDV para começar a vender.” + [Escolher catálogo]" refLabel="RN069 · §2" center={false} pad={0}>
            <NewSaleShell block />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-loading" label="Catálogo carregando · skeleton de cards" width={CW} height={680}>
          <PFrame tone="load" name="Skeleton enquanto o catálogo carrega" refLabel="Matriz" center={false} pad={0}>
            <NewSaleShell scenario="loading" fab={0} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-noresult" label="Busca sem resultado" width={CW} height={620}>
          <PFrame tone="empty" name="“Nenhum produto encontrado para ‘{termo}’.”" refLabel="§2" center={false} pad={0}>
            <NewSaleShell scenario="noresult" fab={0} />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-empty-cart" label="Carrinho vazio · FAB oculto" width={CW} height={620}>
          <PFrame tone="empty" name="Sem itens no carrinho → o FAB não aparece" refLabel="Matriz" center={false} pad={0}>
            <NewSaleShell scenario="base" fab={0} />
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── DIALOG ADICIONAR PRODUTO ───── */}
      <DCSection id="dialog" title="02 · Dialog · Adicionar produto (2.6.1a)" subtitle="max-w-sm · quantidade + desconto por item · limite de saldo · desconto inválido — RN073, RN055">
        <DCArtboard id="dlg-base" label="Base · quantidade 1 · sem desconto" width={520} height={400}>
          <PFrame tone="empty" name="Thumbnail + nome + preço de referência · quantidade · switch de desconto" refLabel="2.6.1a">
            <AddProductDialog variant="base" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="dlg-discount" label="Desconto aplicado (R$)" width={520} height={540}>
          <PFrame tone="empty" name="Switch ligado · referência · desconto · preço final" refLabel="RN073">
            <AddProductDialog variant="discount" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="dlg-pct" label="Desconto aplicado (%)" width={520} height={540}>
          <PFrame tone="empty" name="Toggle em % · recalcula desconto e preço final" refLabel="RN073">
            <AddProductDialog variant="pct" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="dlg-limit" label="Quantidade no limite do saldo" width={520} height={400}>
          <PFrame tone="err" name="Botão + desabilitado + “Apenas N disponíveis.”" refLabel="RN055/RN070">
            <AddProductDialog variant="limit" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="dlg-invalid" label="Desconto inválido · Adicionar desabilitado" width={520} height={500}>
          <PFrame tone="err" name="Input em erro + “Adicionar” desabilitado" refLabel="RN073">
            <AddProductDialog variant="invalid" standalone />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="dlg-over" label="Dialog sobre o catálogo · Desktop" width={CW} height={720}>
          <AddDialogOverDesktop variant="discount" />
        </DCArtboard>
      </DCSection>

      {/* ───── SHEET DO CARRINHO ───── */}
      <DCSection id="sheet" title="03 · Sheet · Carrinho da venda (2.6.1b)" subtitle="Lateral direita (desktop) · itens c/ preço de referência + final · cliente · resumo · confirmar — RN072, RN073, RN055">
        <DCArtboard id="sh-filled" label="Carrinho com itens · desconto por item + cliente" width={520} height={820}>
          <PFrame tone="ok" name="Itens (ref + final) · cliente reconhecido · resumo · Confirmar venda" refLabel="2.6.1b">
            <CartSheet standalone state="filled" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sh-empty" label="Carrinho vazio (Sheet aberto)" width={520} height={520}>
          <PFrame tone="empty" name="“Adicione produtos para iniciar a venda.” + [Ver catálogo]" refLabel="Matriz">
            <CartSheet standalone state="empty" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sh-warn" label="Item com estoque insuficiente · CTA off" width={520} height={780}>
          <PFrame tone="err" name="Borda âmbar + “Apenas N disponíveis.” · Confirmar desabilitado" refLabel="RN055/RN070">
            <CartSheet standalone state="warn" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sh-saving" label="Registrando venda" width={520} height={820}>
          <PFrame tone="load" name="“Registrando…” → toast “Venda registrada.” + carrinho limpo + FAB some" refLabel="§5" toast={<WToast ok>Venda registrada.</WToast>}>
            <CartSheet standalone state="saving" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="sh-over" label="Sheet sobre o catálogo · Desktop (lateral direita)" width={CW} height={760}>
          <CartSheetOverDesktop state="filled" />
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="04 · Mobile (~390px)" subtitle="Mesmo layout único: catálogo tela cheia + FAB · Dialog centralizado · Sheet de baixo">
        <DCArtboard id="mob-catalog" label="Catálogo · busca + grade + FAB" width={CPHONE} height={760}>
          <NewSaleMobile scenario="base" fab={3} />
        </DCArtboard>
        <DCArtboard id="mob-empty" label="Carrinho vazio · FAB oculto" width={CPHONE} height={760}>
          <NewSaleMobile scenario="base" fab={0} />
        </DCArtboard>
        <DCArtboard id="mob-dialog" label="Dialog adicionar (sobre o catálogo)" width={CPHONE} height={760}>
          <AddDialogOverMobile variant="discount" />
        </DCArtboard>
        <DCArtboard id="mob-sheet" label="Sheet do carrinho (de baixo)" width={CPHONE} height={760}>
          <CartSheetOverMobile state="filled" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.PdvCanvas = PdvCanvas;
