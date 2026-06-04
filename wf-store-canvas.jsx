/* Inventto — Wireframe · Storefront / Vitrine pública (Superfície 3 · 2.7)
   Montagem do canvas. Reusa window.STORE / STORE_D / STORE_C + design canvas.
   Telas: 2.7.1 Vitrine · 2.7.2/2.7.3 Detalhe & variação · 2.7.4 Carrinho ·
   2.7.5 Checkout · 2.7.6 Confirmação. */

const { SfBrowser, SfPhone, Vitrine, STORE_I } = window.STORE;
const { ProductDetail, CartSheet } = window.STORE_D;
const { Checkout, OrderConfirmed, SfSummary } = window.STORE_C;

const PHONE = 390;

/* caption neutra (mesmo padrão dos demais módulos) */
function SFrame({ tone = "empty", name, refLabel, children, pad = 26, center = true }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-fieldbg)" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, minHeight: 0, padding: pad, background: "var(--wf-fieldbg)", display: "flex", flexDirection: "column", alignItems: center ? "center" : "stretch", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

function StoreLegend() {
  const sw = (cls, label) => <div className="wf-legrow"><span className={["wf-swatch", cls].join(" ")} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 3 — Storefront / Vitrine pública (2.7)</h3>
      <p className="wf-legsub">Telas <b>públicas</b> em <span style={{ fontFamily: "var(--wf-mono)" }}>inventto.app/{"{slug}"}</span> — <b>sem login e sem App Shell</b>. O cliente final navega produtos, monta carrinho e faz pedido (ou vai pro WhatsApp). O <b>tema visual é herdado do catálogo</b> (RN075): aqui usamos <b>tokens neutros stand-in</b> (off-white + primária escura) p/ representar a cor de marca — que é conteúdo do usuário, não do DS interno.</p>
      {sw("sf-leg-theme", "Primária do catálogo (stand-in) — CTAs, logo, seleção")}
      {sw("sf-leg-open", "Verde dessat. — “Aberto agora” / “Disponível” / sucesso")}
      {sw("sf-leg-last", "Âmbar — “Últimas peças!” (RN067/disponibilidade)")}
      {sw("sf-leg-out", "Neutro — “Esgotado” / fechado")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF029–RF032 · RN067, RN074–RN085, RN088. Microcopy §6.</div>
    </div>
  );
}

function StoreCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Vitrine pública /{slug} — header (capa+logo+nome+redes+status) · busca+chips · grade · carrinho flutuante (canto inf. direito). lg+: sidebar de filtros + grade. RF029–RF031">
        <DCArtboard id="legend" label="Legenda" width={600} height={420}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><StoreLegend /></div>
        </DCArtboard>
        <DCArtboard id="vitrine-desk" label="2.7.1 Vitrine · Desktop (lg+) · sidebar filtros + grade + carrinho ativo" width={1180} height={990}>
          <SfBrowser url="atelie-joana"><Vitrine scenario="open" aside cart cols={3} /></SfBrowser>
        </DCArtboard>
        <DCArtboard id="vitrine-mob" label="2.7.1 Vitrine · Mobile · loja aberta" width={PHONE} height={2945}>
          <SfPhone><Vitrine scenario="open" /></SfPhone>
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={460} height={800}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Superfície pública (RN074).</b> Sem autenticação e sem App Shell. Renderizada por slug. Navegador/telefone aqui são moldura — não fazem parte da tela.</WNote>
            <WNote><b>Tema do catálogo (RN075).</b> Cor, logo, capa, layout (grade/lista) e estilo de card vêm do catálogo público. Os tokens <span style={{ fontFamily: "var(--wf-mono)" }}>--sf-*</span> são stand-in neutro.</WNote>
            <WNote><b>Status de funcionamento (RN077).</b> “Aberto agora” (verde) dentro do horário; “Fechado · Abre {"{dia}"} às {"{hora}"}” (cinza) fora. Controla o estado do CTA de pedido.</WNote>
            <WNote><b>Busca + chips (condicional).</b> Aparecem quando o catálogo tem &gt; 12 itens.</WNote>
            <WNote><b>Carrinho flutuante (FAB).</b> Fixo no canto inferior direito; surge ao adicionar o 1º item — ícone + contador + total. É a entrada para o checkout (RN078).</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── VITRINE · ESTADOS ───── */}
      <DCSection id="vitrine-estados" title="01 · Vitrine · estados & layout" subtitle="Loja fechada (aceita / não aceita pedidos) · catálogo indisponível · carregando · layout em lista — RN074–RN078">
        <DCArtboard id="v-closed-accept" label="Loja fechada · aceita pedidos · banner + carrinho flutuante" width={PHONE} height={3105}>
          <SFrame tone="empty" name="Banner informativo + “Fazer pedido” ativo" refLabel="RN077" pad={0} center={false}>
            <SfPhone><Vitrine scenario="closed-accept" cart /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="v-closed-no" label="Loja fechada · NÃO aceita pedidos" width={PHONE} height={3090}>
          <SFrame tone="err" name="“Voltamos… Fale no WhatsApp.” · CTA pedido off" refLabel="RN077" pad={0} center={false}>
            <SfPhone><Vitrine scenario="closed-noaccept" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="v-unavailable" label="Catálogo indisponível / org desativada" width={PHONE} height={620}>
          <SFrame tone="err" name="“Esta loja não está disponível no momento.”" refLabel="RN076" pad={0} center={false}>
            <SfPhone><Vitrine scenario="unavailable" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="v-loading" label="Carregando · skeleton de cards" width={PHONE} height={2935}>
          <SFrame tone="load" name="Skeleton da grade enquanto carrega" refLabel="§6" pad={0} center={false}>
            <SfPhone><Vitrine scenario="loading" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="v-list" label="Layout em lista (config. do catálogo) · RF029" width={PHONE} height={1070}>
          <SFrame tone="empty" name="Card lista: thumb + nome + preço + badge" refLabel="RF029" pad={0} center={false}>
            <SfPhone><Vitrine scenario="open" layout="list" cart /></SfPhone>
          </SFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── DETALHE DO PRODUTO ───── */}
      <DCSection id="detalhe" title="02 · Detalhe do produto · /produto/:id" subtitle="Galeria + variantes (chips/swatches) + quantidade + CTA. 2.7.3: rota da variação pré-seleciona. Esgotado → “Falar no WhatsApp” — RF029, RN067, RN075">
        <DCArtboard id="det-desk" label="2.7.2 Detalhe · Desktop · galeria + info · CTA fixo no rodapé" width={1080} height={880}>
          <SfBrowser url="atelie-joana/produto/p1"><ProductDetail desk /></SfBrowser>
        </DCArtboard>
        <DCArtboard id="det-mob" label="2.7.2 Detalhe · Mobile · disponível (Tam. M)" width={PHONE} height={1015}>
          <SfPhone><ProductDetail state="available" /></SfPhone>
        </DCArtboard>
        <DCArtboard id="det-last" label="Últimas peças! + variante esgotada (PP riscada)" width={PHONE} height={1075}>
          <SFrame tone="empty" name="Badge “Últimas peças!” · swatch/chip esgotado com risco" refLabel="RN067" pad={0} center={false}>
            <SfPhone><ProductDetail state="last" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="det-variation" label="2.7.3 Detalhe da variação · /variacao/:id (P + Verde-musgo pré-sel.)" width={PHONE} height={1075}>
          <SFrame tone="empty" name="Variante pré-selecionada ao carregar · galeria da variante" refLabel="RF029 · RN075" pad={0} center={false}>
            <SfPhone><ProductDetail variant="variation" state="available" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="det-sold" label="Item totalmente esgotado → CTA WhatsApp" width={PHONE} height={1055}>
          <SFrame tone="err" name="Tudo esgotado · quantidade off · “Falar no WhatsApp”" refLabel="RF029" pad={0} center={false}>
            <SfPhone><ProductDetail state="sold-out" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="det-hidden" label="Preço oculto · “Consultar” (RN067)" width={PHONE} height={1050}>
          <SFrame tone="empty" name="Exibição de preço desligada no catálogo → “Consultar”" refLabel="RN067" pad={0} center={false}>
            <SfPhone><ProductDetail state="available" hidePrice /></SfPhone>
          </SFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CARRINHO ───── */}
      <DCSection id="carrinho" title="03 · Carrinho · sheet/drawer sobre a vitrine" subtitle="Drawer à direita (desktop) / de baixo (mobile) · itens com −/+ e Trash · vazio · item esgotado (RN085) — RF029, RN085">
        <DCArtboard id="cart-desk" label="Carrinho · drawer direito sobre a vitrine (desktop)" width={1080} height={720}>
          <SfBrowser url="atelie-joana"><CartSheet side="right" state="filled" /></SfBrowser>
        </DCArtboard>
        <DCArtboard id="cart-mob" label="Carrinho · sheet de baixo (mobile)" width={PHONE} height={760}>
          <SfPhone><CartSheet side="bottom" state="filled" /></SfPhone>
        </DCArtboard>
        <DCArtboard id="cart-empty" label="Carrinho vazio" width={420} height={520}>
          <SFrame tone="empty" name="“Seu carrinho está vazio.” + “Ver produtos”" refLabel="2.7.4" pad={22}>
            <CartSheet standalone state="empty" />
          </SFrame>
        </DCArtboard>
        <DCArtboard id="cart-out" label="Item esgotado no carrinho (RN085)" width={420} height={720}>
          <SFrame tone="err" name="Badge “Esgotado” + nota · “Ir para o pedido” off" refLabel="RN085" pad={22}>
            <CartSheet standalone state="out" />
          </SFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CHECKOUT + CONFIRMAÇÃO ───── */}
      <DCSection id="checkout" title="04 · Checkout & confirmação · /pedido" subtitle="Formulário único: dados + endereço (CEP ViaCEP) + pagamento (intenção). lg+: form esq + resumo fixo dir. Sucesso → confirmação — RF032, RN079–RN085, RN088">
        <DCArtboard id="ck-desk" label="2.7.5 Checkout · Desktop · form + resumo fixo (w-80)" width={1080} height={910}>
          <SfBrowser url="atelie-joana/pedido"><Checkout desk /></SfBrowser>
        </DCArtboard>
        <DCArtboard id="ck-mob" label="2.7.5 Checkout · Mobile · resumo colapsável" width={PHONE} height={1010}>
          <SfPhone><Checkout /></SfPhone>
        </DCArtboard>
        <DCArtboard id="ck-cep" label="CEP consultando · ViaCEP (onBlur)" width={PHONE} height={1045}>
          <SFrame tone="load" name="Spinner no CEP · campos de endereço preenchendo" refLabel="RN083" pad={0} center={false}>
            <SfPhone><Checkout state="cep-loading" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="ck-submit" label="Enviando pedido · form bloqueado" width={PHONE} height={1070}>
          <SFrame tone="load" name="“Enviando…” · cria pedido pendente + reserva estoque" refLabel="RF032 · RN084" pad={0} center={false}>
            <SfPhone><Checkout state="submitting" /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="ck-confirm" label="2.7.6 Confirmação de pedido" width={PHONE} height={760}>
          <SFrame tone="ok" name="“Pedido enviado! A loja confirma pelo WhatsApp.”" refLabel="RF032 · RN088" pad={0} center={false}>
            <SfPhone><OrderConfirmed /></SfPhone>
          </SFrame>
        </DCArtboard>
        <DCArtboard id="ck-confirm-desk" label="Confirmação · Desktop" width={760} height={620}>
          <SfBrowser url="atelie-joana/pedido/confirmado"><OrderConfirmed /></SfBrowser>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.StoreCanvas = StoreCanvas;
