/* Inventto — Wireframe · Módulo Organização · montagem do canvas (Superfície 2 · 2.1) */

const {
  OrgConfigShell, OrgConfigMobile, OrgConfigLoading, OrgConfig,
  DeactivateOrgDialog, DeleteOrgDialog, ORG_I,
} = window.ORG;

const { SHToast } = window.SH;

const OW = 1200, OPHONE = 390;

/* moldura neutra com caption (igual ao shell-canvas) */
function Frame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)", position: "relative" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center", position: "relative" }}>
        {children}
      </div>
      {toast && <div className="org-toast-anchor">{toast}</div>}
    </div>
  );
}

function OrgLegend() {
  const sw = (bg, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Módulo Organização</h3>
      <p className="wf-legsub">A área de administração exclusiva do Owner: a tela <b>/configuracoes</b> (4 abas — Loja · Operacional · Horários · Danger Zone) renderizada dentro do App Shell, mais os dois modais de ciclo de vida (desativar e excluir). Lo-fi cinza-escala; tijolo só para destrutivo. Desktop (1200) e mobile (390).</p>
      {sw("var(--wf-field)", "Cartão / inset — área de conteúdo (coluna max-w-2xl)")}
      {sw("var(--wf-fieldbg)", "Bloco somente leitura — identidade fiscal (RN018)")}
      {sw("var(--wf-ink)", "Preenchimento sólido = CTA primária / item ativo / switch ligado")}
      {sw("var(--wf-err)", "Tijolo = Danger Zone / ação destrutiva")}
      {sw("var(--wf-note)", "Ardósia = anotação de produto (RF/RN)")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF007 (editar config) · RF010 (desativar) · RF011 (excluir) · RN018, RN024, RN025, RN029.</div>
    </div>
  );
}

function OrgCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Exclusivo do Owner · /configuracoes dentro do App Shell — RF007, RN020">
        <DCArtboard id="legend" label="Legenda" width={600} height={420}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><OrgLegend /></div>
        </DCArtboard>
        <DCArtboard id="config-desk" label="Configuração da organização · Desktop · aba Loja (com alterações pendentes)" width={OW} height={860}>
          <OrgConfigShell tab="loja" pending />
        </DCArtboard>
        <DCArtboard id="config-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={OW} height={860}>
          <OrgConfigShell tab="loja" pending collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={420} height={860}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 13, justifyContent: "center" }}>
            <WNote><b>Coluna centralizada.</b> O conteúdo vive numa coluna <b>max-w-2xl</b> dentro do <b>main</b> do inset. Cabeçalho h1 + nome da org ativa.</WNote>
            <WNote><b>Tabs.</b> Loja · Operacional · Horários · <b>Danger Zone</b> (rótulo em tijolo). Navegáveis por teclado; cada aba é um painel.</WNote>
            <WNote><b>Edição confirmada (RN025).</b> Qualquer alteração revela a <b>barra de ações</b> (Descartar + Salvar). Sem alterações, a barra não aparece.</WNote>
            <WNote><b>Identidade fiscal (RN018).</b> Documento e razão social são <b>somente leitura</b>; bloco bg-muted com helper conduzindo a criar nova org.</WNote>
            <WNote><b>Recorte por papel.</b> Tela e modais são exclusivos do <b>Owner</b>. Manager/Sales nem veem o item “Organização” no menu.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── ABAS ───── */}
      <DCSection id="abas" title="01 · As quatro abas" subtitle="Loja (identidade + endereço) · Operacional · Horários · Danger Zone — RF007, RN024, RN028">
        <DCArtboard id="tab-loja" label="Aba Loja · logo, nome, fiscal (read-only), endereço" width={680} height={860}>
          <Frame tone="empty" name="Identidade + endereço estruturado" refLabel="RN018 · RN024" center={false}>
            <OrgConfig tab="loja" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="tab-op" label="Aba Operacional · fuso + pedidos com loja fechada" width={680} height={460}>
          <Frame tone="empty" name="Timezone + switch operacional" refLabel="RF007" center={false}>
            <OrgConfig tab="op" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="tab-horarios" label="Aba Horários · grade Seg–Dom" width={680} height={720}>
          <Frame tone="empty" name="Switch por dia + abertura/fechamento" refLabel="RF007 · vitrine" center={false}>
            <OrgConfig tab="horarios" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="tab-danger" label="Aba Danger Zone · desativar + excluir" width={680} height={585}>
          <Frame tone="err" name="Zona de risco — duas ações de ciclo de vida" refLabel="RF010 · RF011" center={false}>
            <OrgConfig tab="danger" />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS DA TELA ───── */}
      <DCSection id="estados" title="02 · Estados da tela" subtitle="Carregando · salvando · CEP não encontrado · upload de logo em andamento — Matriz §2.1">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={680} height={560}>
          <Frame tone="load" name="Sempre há dados — abre em skeleton" refLabel="Matriz" center={false}>
            <OrgConfigLoading />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-saving" label="Salvando alterações" width={900} height={862}>
          <Frame tone="load" name="Persiste todas as abas · CTA em progresso" refLabel="RN025" center={false}>
            <OrgConfig tab="loja" saving />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-cep" label="CEP não encontrado" width={900} height={885}>
          <Frame tone="err" name="Toast (anatomia do App Shell) no canto inferior direito + endereço manual" refLabel="RN024 · §6" center={false}
            toast={<SHToast type="warning" action="Preencher manual">CEP não encontrado. Preencha o endereço manualmente.</SHToast>}>
            <OrgConfig tab="loja" cepError pending />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-upload" label="Upload de logo em andamento" width={900} height={862}>
          <Frame tone="load" name="“Salvar” desabilitado até concluir o upload" refLabel="RN026" center={false}>
            <OrgConfig tab="loja" uploading pending />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── MODAL DESATIVAR ───── */}
      <DCSection id="desativar" title="03 · Modal: desativar organização" subtitle="Pausa reversível · descreve as consequências · cancela pendentes — RF010, RN027, RN028">
        <DCArtboard id="deact-base" label="Confirmação (max-w-md)" width={520} height={560}>
          <Frame tone="err" name="Consequências + reversível" refLabel="RF010 · RN027" center>
            <DeactivateOrgDialog />
          </Frame>
        </DCArtboard>
        <DCArtboard id="deact-exec" label="Executando" width={520} height={560}>
          <Frame tone="load" name="Desativando… (Dialog permanece aberto)" refLabel="Matriz" center>
            <DeactivateOrgDialog executing />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── MODAL EXCLUIR ───── */}
      <DCSection id="excluir" title="04 · Modal: excluir organização" subtitle="Confirmação destrutiva por digitação do nome fantasia — RF011, RN029, RN030">
        <DCArtboard id="del-empty" label="Campo vazio · botão travado" width={520} height={600}>
          <Frame tone="err" name="Botão desabilitado até o nome bater" refLabel="RN029" center>
            <DeleteOrgDialog match="empty" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="del-partial" label="Digitando · ainda não confere" width={520} height={620}>
          <Frame tone="err" name="Comparação em tempo real" refLabel="RN029" center>
            <DeleteOrgDialog match="partial" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="del-exact" label="Nome exato · botão liberado" width={520} height={600}>
          <Frame tone="err" name="Confere → habilita destrutivo" refLabel="RN029" center>
            <DeleteOrgDialog match="exact" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="del-purge" label="Com “apagar dados” (LGPD)" width={520} height={620}>
          <Frame tone="err" name="Direito ao esquecimento marcado" refLabel="RN030 · LGPD" center>
            <DeleteOrgDialog match="exact" purge />
          </Frame>
        </DCArtboard>
        <DCArtboard id="del-exec" label="Excluindo" width={520} height={600}>
          <Frame tone="load" name="Excluindo… → redirect após sucesso" refLabel="Matriz" center>
            <DeleteOrgDialog match="exact" executing />
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="05 · Mobile (~390px)" subtitle="Mesma tela, coluna única · tabs roláveis · barra de ações no rodapé">
        <DCArtboard id="mob-loja" label="Mobile · aba Loja (alterações pendentes)" width={OPHONE} height={1120}>
          <OrgConfigMobile tab="loja" pending />
        </DCArtboard>
        <DCArtboard id="mob-op" label="Mobile · aba Operacional" width={OPHONE} height={520}>
          <OrgConfigMobile tab="op" />
        </DCArtboard>
        <DCArtboard id="mob-horarios" label="Mobile · aba Horários" width={OPHONE} height={760}>
          <OrgConfigMobile tab="horarios" />
        </DCArtboard>
        <DCArtboard id="mob-danger" label="Mobile · aba Danger Zone" width={OPHONE} height={620}>
          <OrgConfigMobile tab="danger" />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.OrgCanvas = OrgCanvas;
