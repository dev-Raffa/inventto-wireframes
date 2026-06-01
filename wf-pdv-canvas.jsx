/* Inventto — Wireframe · Módulo Vendas no Balcão / PDV · montagem do canvas (Superfície 2 · 2.6) */

const {
  PDV_I, PvCartPanel, PvDiscountSection, PvCustomerSection,
  NewSale, NoCatalogBlock, NewSaleShell,
} = window.PDV;
const {
  SalesConsult, SalesConsultShell, NewSaleMobile, CartSheet, CartSheetOverMobile,
  SalesConsultMobile,
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
      <p className="wf-legsub">Onde se <b>vende presencialmente</b>: a <b>Nova venda</b> (/pdv) — split-screen com catálogo à esquerda e o painel do carrinho à direita, com desconto opcional (RN073) e cliente opcional (RN072) — e a <b>Consulta de vendas</b> (/pdv/vendas), imutável na v1. Lo-fi cinza-escala; cor <b>funcional apenas</b>: âmbar p/ estoque insuficiente, tijolo p/ desconto e erro, verde p/ sucesso.</p>
      {sw("var(--pd-warning-bg2)", "var(--pd-warning)", "Âmbar — item com estoque insuficiente (RN055/RN070)")}
      {sw("var(--wf-err-bg)", "var(--wf-err)", "Tijolo — valor de desconto e erro")}
      {sw("var(--wf-ok-bg)", "var(--wf-ok)", "Verde dessat. — sucesso (cliente reconhecido / toast)")}
      {sw("var(--wf-ink)", "var(--wf-ink)", "Preenchimento sólido = CTA primária (Confirmar venda)")}
      {sw("var(--wf-note-bg)", "var(--wf-note)", "Ardósia = nota de regra (RN)")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF027–RF028 · RN068–RN073 · RN055. Microcopy §2, §4, §5.</div>
    </div>
  );
}

function PdvCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Nova venda /pdv dentro do App Shell · split-screen: catálogo (flex-1) + painel do carrinho (w-96) — RF027">
        <DCArtboard id="legend" label="Legenda" width={600} height={470}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><PdvLegend /></div>
        </DCArtboard>
        <DCArtboard id="newsale-desk" label="Nova venda · Desktop · carrinho com itens" width={CW} height={720}>
          <NewSaleShell cart="filled" />
        </DCArtboard>
        <DCArtboard id="newsale-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={CW} height={720}>
          <NewSaleShell cart="filled" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={470} height={720}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Split-screen (lg+).</b> Catálogo do PDV à esquerda (busca + filtro + grade); painel <b>“Venda atual”</b> fixo à direita. Clique no produto → entra no carrinho com quantidade 1; se já existe, incrementa.</WNote>
            <WNote><b>Venda = pedido pos (RN068).</b> Confirmar cria um pedido <span style={{ fontFamily: "var(--wf-mono)" }}>pos</span> confirmado, gera saída de estoque (motivo “Venda”) e vincula/cria o cliente.</WNote>
            <WNote><b>Desconto opcional (RN073).</b> Switch liga campo + toggle R$/%. Registra referência, desconto e preço final. Sem limite por papel na v1.</WNote>
            <WNote><b>Cliente opcional (RN072).</b> Telefone busca no CRM; se encontrado, mostra o nome; se não, surge o campo “Nome”.</WNote>
            <WNote><b>Acesso idêntico (RN071).</b> Sales, Manager e Owner usam o PDV da mesma forma.</WNote>
          </div>
        </DCArtboard>
        <DCArtboard id="cart-solo" label="Painel “Venda atual” · referência" width={384} height={720}>
          <div style={{ height: "100%", display: "flex", background: "var(--wf-fieldbg)" }}>
            <PvCartPanel state="filled" />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── NOVA VENDA: ESTADOS ───── */}
      <DCSection id="estados" title="01 · Nova venda · estados do carrinho" subtitle="Bloqueio sem catálogo · carrinho vazio · estoque insuficiente · desconto · cliente · registrando · sucesso — RN068–073, RN055">
        <DCArtboard id="st-block" label="Bloqueio · sem catálogo PDV vinculado" width={CW} height={620}>
          <PFrame tone="empty" name="“Vincule um catálogo ao PDV para começar a vender.” + [Escolher catálogo]" refLabel="RN069 · §2" center={false} pad={0}>
            <NewSaleShell block />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Carrinho vazio" width={384} height={560}>
          <PFrame tone="empty" name="“Adicione produtos para iniciar a venda.” · CTA desabilitada" refLabel="§2">
            <div style={{ height: "100%", display: "flex", border: "1.5px solid var(--wf-line)", borderRadius: 14, overflow: "hidden", background: "var(--wf-field)" }}>
              <PvCartPanel state="empty" />
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-warn" label="Item com estoque insuficiente · CTA off" width={384} height={680}>
          <PFrame tone="err" name="Borda âmbar + “Apenas N disponíveis.” · Confirmar desabilitado" refLabel="RN055/RN070">
            <div style={{ height: "100%", display: "flex", border: "1.5px solid var(--wf-line)", borderRadius: 14, overflow: "hidden", background: "var(--wf-field)" }}>
              <PvCartPanel state="warn" />
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-discount" label="Desconto aplicado (R$ / %)" width={384} height={760}>
          <PFrame tone="empty" name="Switch ligado · referência · desconto · preço final" refLabel="RN073">
            <div style={{ height: "100%", display: "flex", border: "1.5px solid var(--wf-line)", borderRadius: 14, overflow: "hidden", background: "var(--wf-field)" }}>
              <PvCartPanel state="discount" />
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-customer" label="Cliente reconhecido no CRM" width={384} height={760}>
          <PFrame tone="ok" name="Telefone → busca CRM → exibe nome do cliente" refLabel="RN072">
            <div style={{ height: "100%", display: "flex", border: "1.5px solid var(--wf-line)", borderRadius: 14, overflow: "hidden", background: "var(--wf-field)" }}>
              <PvCartPanel state="customer-found" />
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-customer-new" label="Cliente novo · campo “Nome” aparece" width={384} height={780}>
          <PFrame tone="empty" name="Telefone sem match → surge campo Nome" refLabel="RN072">
            <div style={{ height: "100%", display: "flex", border: "1.5px solid var(--wf-line)", borderRadius: 14, overflow: "hidden", background: "var(--wf-field)" }}>
              <PvCartPanel state="customer-new" />
            </div>
          </PFrame>
        </DCArtboard>
        <DCArtboard id="st-saving" label="Registrando venda" width={384} height={680}>
          <PFrame tone="load" name="“Registrando…” → toast “Venda registrada.” + carrinho limpo" refLabel="§5" toast={<WToast ok>Venda registrada.</WToast>}>
            <div style={{ height: "100%", display: "flex", border: "1.5px solid var(--wf-line)", borderRadius: 14, overflow: "hidden", background: "var(--wf-field)" }}>
              <PvCartPanel state="saving" />
            </div>
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CONSULTA DE VENDAS ───── */}
      <DCSection id="consulta" title="02 · Consulta de vendas · /pdv/vendas" subtitle="Tabela imutável (sem ações) · sub-row expansível com itens · vazio · recorte por papel — RF028, RN017">
        <DCArtboard id="cons-base" label="Consulta · Owner/Manager (todas as vendas)" width={CW} height={640}>
          <SalesConsultShell scenario="base" role="owner" />
        </DCArtboard>
        <DCArtboard id="cons-open" label="Sub-row expandida · itens da venda" width={CW} height={680}>
          <PFrame tone="empty" name="ChevronDown abre os itens da venda" refLabel="RF028" center={false} pad={0}>
            <SalesConsultShell scenario="base" role="owner" openFor="v1" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="cons-empty" label="Sem vendas no período" width={1000} height={480}>
          <PFrame tone="empty" name="“Nenhuma venda neste período.”" refLabel="§4" center={false}>
            <SalesConsult scenario="empty" role="owner" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="cons-sales" label="Recorte · Vendedor (só as próprias, sem filtro de vendedor)" width={CW} height={600}>
          <PFrame tone="empty" name="Sem coluna/filtro de vendedor · vê apenas as próprias" refLabel="RN017" center={false} pad={0}>
            <SalesConsultShell scenario="base" role="sales" />
          </PFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="03 · Mobile (~390px)" subtitle="Nova venda: busca + barra fixa de carrinho · Sheet do carrinho · consulta em cards">
        <DCArtboard id="mob-newsale" label="Nova venda · busca + barra fixa" width={CPHONE} height={760}>
          <NewSaleMobile />
        </DCArtboard>
        <DCArtboard id="mob-sheet" label="Sheet do carrinho (sobre a tela)" width={CPHONE} height={760}>
          <CartSheetOverMobile />
        </DCArtboard>
        <DCArtboard id="mob-sheet-solo" label="Sheet do carrinho · standalone" width={420} height={720}>
          <PFrame tone="empty" name="Itens + desconto + cliente + resumo + CTA" refLabel="2.6.1">
            <CartSheet standalone state="discount" />
          </PFrame>
        </DCArtboard>
        <DCArtboard id="mob-consulta" label="Consulta de vendas · cards" width={CPHONE} height={680}>
          <SalesConsultMobile role="owner" />
        </DCArtboard>
        <DCArtboard id="mob-consulta-sales" label="Consulta · Vendedor (sem filtro de vendedor)" width={CPHONE} height={680}>
          <SalesConsultMobile role="sales" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.PdvCanvas = PdvCanvas;
