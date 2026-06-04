/* Inventto — Wireframe · Módulo Vitrines / Storefronts · montagem do canvas
   (Superfície 2 · 2.7). Lista /storefronts (tabela + DropdownMenu condicionado ao
   estado), Dialog de pré-requisitos de publicação (RN075), Modal de remoção, e
   Configurar storefront (/storefronts/novo · /:id) com Tabs Geral · Aparência ·
   Comportamento, validação de slug, preview ao vivo e barra de ações. */

const {
  VT_I, STOREFRONTS, VtList, VtListShell, VtListLoading,
  PublishDialog, RemoveStorefrontDialog,
  VtListMobile, VtActionsMobile, PublishMobile, RemoveStorefrontMobile,
} = window.VT;
const {
  VtConfig, VtConfigShell, VtConfigMobile,
} = window.VTC;

const CW = 1200, CPHONE = 390;

/* moldura neutra com caption (igual aos demais módulos) */
function VtFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {children}
      </div>
      {toast && <div className="vt-toast-anchor">{toast}</div>}
    </div>
  );
}

function VtLegend() {
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Vitrines / Storefronts (2.7)</h3>
      <p className="wf-legsub">Onde se configura e gerencia o <b>canal de venda online</b>. O storefront aponta para um <b>catálogo</b> (de onde vêm produtos e preços) e carrega o que é só dele: <b>slug</b>, <b>identidade visual</b>, <b>WhatsApp</b> e <b>comportamento</b> da vitrine. Duas telas: a <b>lista /storefronts</b> (criar · publicar · despublicar · copiar link · remover, com <b>DropdownMenu</b> condicionado ao estado) e a <b>configuração</b> em <b>Tabs Geral · Aparência · Comportamento</b>. Publicar verifica pré-requisitos (RN075). Owner e Manager — Vendedor sem acesso. Lo-fi cinza-escala.</p>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-ink)", borderColor: "var(--wf-ink)" }} />Preenchimento sólido = CTA primária</div>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--wf-ok-bg)", borderColor: "var(--wf-ok)" }} />Verde dessat. = estado “No ar”</div>
      <div className="wf-legrow"><span className="wf-swatch" style={{ background: "var(--pd-warning-bg2)", borderColor: "var(--pd-warning)" }} />Âmbar = pré-requisito pendente / destaque</div>
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF028 · RN059–RN060 · RN072 · RN075–RN077. Microcopy §2, §4, §5, §8.</div>
    </div>
  );
}

function VtCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Lista /storefronts dentro do App Shell · o storefront é o canal online que aponta para um catálogo — RF028">
        <DCArtboard id="legend" label="Legenda" width={600} height={500}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><VtLegend /></div>
        </DCArtboard>
        <DCArtboard id="list-desk" label="Lista · Desktop · Owner/Manager" width={CW} height={620}>
          <VtListShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="list-desk-collapsed" label="Mesma tela · sidebar recolhida (modelo do App Shell)" width={CW} height={620}>
          <VtListShell scenario="base" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={470} height={620}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>O canal, não o produto.</b> Slug, tema visual, WhatsApp e comportamento da vitrine vivem aqui — não no catálogo. O catálogo é só a fonte de produtos e preços.</WNote>
            <WNote><b>Estado de publicação.</b> Cada vitrine é “No ar” ou “Inativa”. A coluna Estado usa Badge semântico (verde dessat. = no ar).</WNote>
            <WNote><b>Ações condicionadas (RF028).</b> O DropdownMenu muda com o estado: No ar → Despublicar + Copiar link; Inativa → Publicar. Configurar e Remover sempre presentes.</WNote>
            <WNote><b>Publicar valida (RN075).</b> Falta catálogo, WhatsApp ou fuso/horários → Dialog orientativo com atalhos, em vez de publicar.</WNote>
            <WNote><b>Recorte por papel.</b> Owner e Manager (leitura + ações). Vendedor sem acesso ao módulo.</WNote>
          </div>
        </DCArtboard>
        <DCArtboard id="badge-ref" label="Referência · Badge de estado" width={420} height={300}>
          <div className="wf" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 16, padding: 26, background: "var(--wf-fieldbg)", justifyContent: "center" }}>
            <span className="wf-eyebrow">Coluna “Estado”</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}><window.VT.VtBadge state="live" /><span style={{ fontSize: 11.5, color: "var(--wf-muted)", fontFamily: "var(--wf-mono)" }}>· publicada · link ativo</span></div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}><window.VT.VtBadge state="inactive" /><span style={{ fontSize: 11.5, color: "var(--wf-muted)", fontFamily: "var(--wf-mono)" }}>· despublicada / rascunho</span></div>
            </div>
            <WNote><b>§8.</b> Rótulos: “No ar” · “Inativa”. Verde dessaturado reservado só para o estado publicado.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── LISTA: ESTADOS & AÇÕES ───── */}
      <DCSection id="lista" title="01 · Lista de vitrines · estados e ações" subtitle="Carregando · vazio · DropdownMenu (No ar × Inativa) · copiar link · despublicar — RF028, §4/§8">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={CW} height={480}>
          <VtFrame tone="load" name="Abre em skeleton de tabela" refLabel="Matriz" center={false}>
            <VtListLoading />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Primeira vez · sem vitrines" width={CW} height={470}>
          <VtFrame tone="empty" name="“Crie uma vitrine para vender online pelo link.” + CTA" refLabel="§4" center={false}>
            <VtList scenario="empty" />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="menu-live" label="DropdownMenu · vitrine No ar" width={CW} height={680}>
          <VtFrame tone="empty" name="Configurar · Despublicar · Copiar link · Remover" refLabel="RF028" center={false} pad={0}>
            <VtListShell scenario="base" openMenu="s1" />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="menu-inactive" label="DropdownMenu · vitrine Inativa" width={CW} height={680}>
          <VtFrame tone="empty" name="Configurar · Publicar · Remover" refLabel="RF028" center={false} pad={0}>
            <VtListShell scenario="base" openMenu="s3" />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="toast-copy" label="Copiar link → toast" width={CW} height={660}>
          <VtFrame tone="ok" name="“Link copiado.”" refLabel="§5" center={false} pad={0} toast={<WToast ok>Link copiado.</WToast>}>
            <VtListShell scenario="base" />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="toast-unpub" label="Despublicar → toast" width={CW} height={660}>
          <VtFrame tone="ok" name="“Vitrine despublicada.”" refLabel="§5" center={false} pad={0} toast={<WToast ok>Vitrine despublicada.</WToast>}>
            <VtListShell scenario="base" />
          </VtFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── PUBLICAR & REMOVER ───── */}
      <DCSection id="dialogs" title="02 · Publicar (pré-requisitos · RN075) & remover" subtitle="Publicar verifica catálogo + WhatsApp + fuso/horários; se falta algo, abre Dialog orientativo com atalhos. Remover confirma por digitação do nome.">
        <DCArtboard id="pub-over" label="Dialog pré-requisitos · sobre a lista (RN075)" width={CW} height={640}>
          <div className="vt-overlay-stage wf">
            <div style={{ position: "absolute", inset: 0 }}><VtListShell scenario="base" /></div>
            <div className="vt-scrim"><PublishDialog done={["catalog"]} /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="pub-solo" label="Pré-requisitos · falta WhatsApp + horários" width={520} height={520}>
          <VtFrame tone="empty" name="“Para publicar, ainda falta: {itens}.” + atalhos" refLabel="§2 · RN075">
            <PublishDialog done={["catalog"]} />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="pub-onlyhours" label="Pré-requisitos · só falta fuso/horários" width={520} height={520}>
          <VtFrame tone="empty" name="Itens cumpridos aparecem com check (esmaecidos)" refLabel="RN075">
            <PublishDialog done={["catalog", "whats"]} />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="rm-idle" label="Remover · idle (botão desabilitado)" width={500} height={420}>
          <VtFrame tone="err" name="“Digite o nome da vitrine para confirmar”" refLabel="Remover">
            <RemoveStorefrontDialog state="idle" />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="rm-confirmed" label="Remover · nome digitado (habilitado)" width={500} height={420}>
          <VtFrame tone="err" name="Match exato → botão destrutivo habilitado" refLabel="Remover">
            <RemoveStorefrontDialog state="confirmed" />
          </VtFrame>
        </DCArtboard>
        <DCArtboard id="rm-saving" label="Remover · removendo → toast" width={500} height={420}>
          <VtFrame tone="load" name="“Removendo…” → toast “Vitrine removida.”" refLabel="Matriz" toast={<WToast ok>Vitrine removida.</WToast>}>
            <RemoveStorefrontDialog state="saving" />
          </VtFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CONFIGURAR · TAB GERAL ───── */}
      <DCSection id="geral" title="03 · Configurar · Tab Geral · /storefronts/:id" subtitle="Nome · catálogo vinculado · slug com validação assíncrona (RN072) · WhatsApp · redes sociais — RF028, §2">
        <DCArtboard id="geral-edit" label="Editar · Tab Geral (base)" width={CW} height={980}>
          <VtConfigShell tab="geral" />
        </DCArtboard>
        <DCArtboard id="geral-novo" label="Criar · “Nova vitrine” (campos vazios)" width={CW} height={980}>
          <VtConfigShell create tab="geral" slugState="idle" slugValue="" />
        </DCArtboard>
        <DCArtboard id="slug-states" label="Slug · estados de validação (RN072)" width={560} height={560}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 28, display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            <div>
              <span className="wf-label">Validando (spinner)</span>
              <div style={{ marginTop: 6 }}><window.VTC.VtSlug value="atelie-joana" state="checking" /></div>
            </div>
            <div>
              <span className="wf-label">Disponível (CheckCircle verde)</span>
              <div style={{ marginTop: 6 }}><window.VTC.VtSlug value="atelie-joana" state="ok" /></div>
            </div>
            <div>
              <span className="wf-label">Já em uso (erro)</span>
              <div style={{ marginTop: 6 }}><window.VTC.VtSlug value="loja-centro" state="taken" /></div>
              <WError>Este endereço já está em uso. Tente outro.</WError>
            </div>
            <div>
              <span className="wf-label">Inválido (erro)</span>
              <div style={{ marginTop: 6 }}><window.VTC.VtSlug value="Loja Centro!" state="invalid" /></div>
              <WError>Use só letras minúsculas, números e hífen, de 3 a 50 caracteres.</WError>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="geral-saving" label="Com alterações · salvando → toast" width={CW} height={1020}>
          <VtFrame tone="load" name="“Salvando…” → toast “Alterações salvas.”" refLabel="§5" center={false} pad={0} toast={<WToast ok>Alterações salvas.</WToast>}>
            <VtConfigShell tab="geral" saving slugState="ok" />
          </VtFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── CONFIGURAR · TAB APARÊNCIA ───── */}
      <DCSection id="aparencia" title="04 · Configurar · Tab Aparência · preview ao vivo" subtitle="4× ColorPicker [a construir] + logo + capa + layout (Grade/Lista) + estilo de card · preview lateral somente leitura — RF028">
        <DCArtboard id="apar-grid" label="Aparência · layout Grade + preview" width={CW} height={970}>
          <VtConfigShell tab="aparencia" pending layout="grid" />
        </DCArtboard>
        <DCArtboard id="apar-list" label="Aparência · layout Lista (preview atualiza)" width={CW} height={970}>
          <VtConfigShell tab="aparencia" pending layout="list" />
        </DCArtboard>
        <DCArtboard id="apar-preview" label="Preview ao vivo · Grade × Lista × sem preço" width={760} height={620}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "start" }}>
            <window.VTC.VtPreview layout="grid" showPrices />
            <window.VTC.VtPreview layout="list" showPrices />
            <window.VTC.VtPreview layout="grid" showPrices={false} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── CONFIGURAR · TAB COMPORTAMENTO ───── */}
      <DCSection id="comportamento" title="05 · Configurar · Tab Comportamento" subtitle="Switch Mostrar preços (RN076) · Switch Mostrar esgotados · mensagem WhatsApp · destaques com Star/StarOff">
        <DCArtboard id="comp-base" label="Comportamento · preços visíveis (base)" width={CW} height={1010}>
          <VtConfigShell tab="comportamento" pending showPrices />
        </DCArtboard>
        <DCArtboard id="comp-noprice" label="Mostrar preços OFF → preview vira “Consultar” (RN076)" width={CW} height={1040}>
          <VtFrame tone="empty" name="Cliente vê “Consultar” e vai ao WhatsApp" refLabel="RN076" center={false} pad={0}>
            <VtConfigShell tab="comportamento" pending showPrices={false} />
          </VtFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE (~390px) ───── */}
      <DCSection id="mobile" title="06 · Mobile (~390px)" subtitle="Lista (cards) · ações (bottom sheet) · publicar/remover (dialog) · configurar (tabs roláveis) — RF028">
        <DCArtboard id="mob-list" label="Lista · cards (Owner/Manager)" width={CPHONE} height={720}>
          <VtListMobile />
        </DCArtboard>
        <DCArtboard id="mob-actions-live" label="Ações · bottom sheet (No ar)" width={CPHONE} height={720}>
          <VtActionsMobile state="live" />
        </DCArtboard>
        <DCArtboard id="mob-actions-inactive" label="Ações · bottom sheet (Inativa)" width={CPHONE} height={720}>
          <VtActionsMobile state="inactive" />
        </DCArtboard>
        <DCArtboard id="mob-publish" label="Publicar · pré-requisitos (RN075)" width={CPHONE} height={720}>
          <PublishMobile done={["catalog"]} />
        </DCArtboard>
        <DCArtboard id="mob-remove" label="Remover · confirmação" width={CPHONE} height={720}>
          <RemoveStorefrontMobile state="confirmed" />
        </DCArtboard>
        <DCArtboard id="mob-geral" label="Configurar · Tab Geral" width={CPHONE} height={980}>
          <VtConfigMobile tab="geral" pending slugState="ok" />
        </DCArtboard>
        <DCArtboard id="mob-aparencia" label="Configurar · Tab Aparência + preview" width={CPHONE} height={1680}>
          <VtConfigMobile tab="aparencia" pending layout="grid" showPrices />
        </DCArtboard>
        <DCArtboard id="mob-comportamento" label="Configurar · Tab Comportamento" width={CPHONE} height={1040}>
          <VtConfigMobile tab="comportamento" pending showPrices />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.VtCanvas = VtCanvas;
