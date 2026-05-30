/* Inventto — Wireframe · Módulo Equipe & Permissões · montagem do canvas (Superfície 2 · 2.2) */

const {
  EqList, EqListShell, EqListLoading, EqListMobile,
  EqSheet, EqSheetOverShell, EqBadge, EQ_I,
} = window.EQ;

const EW = 1340, EPHONE = 390;

/* moldura neutra com caption (igual ao org/shell canvas) */
function EFrame({ tone = "empty", name, refLabel, children, pad = 28, center = true, toast }) {
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

function EqLegend() {
  const sw = (bg, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Equipe &amp; Permissões</h3>
      <p className="wf-legsub">A área onde o <b>Owner</b> gerencia quem acessa a organização ativa: a tela <b>/equipe</b> (tabela com edição inline de função e status) dentro do App Shell, mais o <b>Sheet</b> de adicionar/replicar membro. Lo-fi cinza-escala; cor funcional só para estados de membro. Desktop (1340) e mobile (390).</p>
      {sw("var(--wf-ink)", "Preenchimento sólido = CTA / botão “Alterar” ativo / badge Dono")}
      {sw("var(--wf-ok)", "Verde dessaturado = membro Ativo")}
      {sw("var(--wf-note)", "Ardósia = Convidado / contexto de replicação")}
      {sw("var(--wf-faint)", "Cinza = Inativo (linha esmaecida)")}
      <div className="eq-states-leg">
        <span className="eq-leg-i"><EqBadge kind="role" value="Dono" /></span>
        <span className="eq-leg-i"><EqBadge kind="role" value="Gerente" /></span>
        <span className="eq-leg-i"><EqBadge kind="role" value="Vendedor" /></span>
      </div>
      <div className="eq-states-leg" style={{ marginTop: 6 }}>
        <span className="eq-leg-i"><EqBadge kind="status" value="Ativo" /></span>
        <span className="eq-leg-i"><EqBadge kind="status" value="Convidado" /></span>
        <span className="eq-leg-i"><EqBadge kind="status" value="Inativo" /></span>
      </div>
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF012 (convidar) · RF013 (replicar) · RF014 (gerir membro) · RF015 · RN036, RN037, RN039.</div>
    </div>
  );
}

function EqCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Exclusivo do Owner · /equipe dentro do App Shell — RF014, RF015, RN020">
        <DCArtboard id="legend" label="Legenda" width={600} height={470}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><EqLegend /></div>
        </DCArtboard>
        <DCArtboard id="list-desk" label="Lista de membros · Desktop · estado base" width={EW} height={760}>
          <EqListShell scenario="base" />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={420} height={760}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 13, justifyContent: "center" }}>
            <WNote><b>Coluna larga.</b> A tabela vive no <b>main</b> do inset, sem coluna estreita — função e status precisam de espaço para os controles inline.</WNote>
            <WNote><b>Edição inline (RF014).</b> Cada linha edita papel e estado direto na tabela: <b>badge</b> (valor salvo) + <b>select</b> (seleção pendente) + <b>botão “Alterar”</b>.</WNote>
            <WNote><b>Confirmação por botão.</b> O botão só ativa quando o select diverge do salvo. Ao salvar, o badge atualiza e dispara o toast “Alterações salvas.”</WNote>
            <WNote><b>Invariante do Owner (RN039).</b> A linha do próprio Owner mostra só os badges <b>Dono</b> e <b>Ativo</b> — sem select nem botão. Dono nunca é atribuível.</WNote>
            <WNote><b>Estados do membro (RN036).</b> Ativo · Convidado (aguardando 1º acesso) · Inativo. Convidado é estado de sistema, não selecionável.</WNote>
            <WNote><b>Recorte por papel.</b> Tela e Sheet são exclusivos do <b>Owner</b>. Manager/Sales nem veem “Equipe” no menu.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── A TABELA POR DENTRO ───── */}
      <DCSection id="tabela" title="01 · A tabela de membros" subtitle="Edição inline de função e estado · invariante do Owner — RF014, RN036, RN039">
        <DCArtboard id="tb-base" label="Tela completa · cinco membros (Ativo · Convidado · Inativo)" width={1080} height={640}>
          <EFrame tone="empty" name="Cabeçalho + filtros + tabela + paginação" refLabel="RF014" center={false}>
            <EqList scenario="base" />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="tb-anatomy" label="Anatomia de uma célula editável" width={620} height={420}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 26, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            <div>
              <div className="wf-eyebrow" style={{ marginBottom: 8 }}>SEM ALTERAÇÃO</div>
              <window.EQ.EqEditCell kind="role" saved="Gerente" state="idle" />
              <WNote style={{ marginTop: 8 }}>Badge = valor salvo · Select = mesmo valor · Botão fantasma (desabilitado).</WNote>
            </div>
            <div>
              <div className="wf-eyebrow" style={{ marginBottom: 8 }}>SELEÇÃO PENDENTE</div>
              <window.EQ.EqEditCell kind="role" saved="Vendedor" pending="Gerente" state="pending" />
              <WNote style={{ marginTop: 8 }}>Select diverge do badge → botão ativa (fundo sólido).</WNote>
            </div>
            <div>
              <div className="wf-eyebrow" style={{ marginBottom: 8 }}>SALVANDO</div>
              <window.EQ.EqEditCell kind="status" saved="Ativo" pending="Inativo" state="saving" />
              <WNote style={{ marginTop: 8 }}>Select bloqueado + spinner no botão até persistir.</WNote>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="tb-rules" label="Regras por linha" width={420} height={420}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 13, justifyContent: "center" }}>
            <WNote><b>Owner (Você).</b> Linha destacada; só badges Dono + Ativo. Sem controles (RN039).</WNote>
            <WNote><b>Convidado.</b> Status mostra badge + “aguardando 1º acesso”; não é selecionável. Função permanece editável.</WNote>
            <WNote><b>Inativo.</b> Linha esmaecida; pode voltar a Ativo pelo select de status.</WNote>
            <WNote><b>Opções.</b> Função: Gerente · Vendedor. Status: Ativo · Inativo.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS DA TELA ───── */}
      <DCSection id="estados" title="02 · Estados da tela" subtitle="Carregando · alteração pendente · salvando · busca sem resultado — Matriz §2.2">
        <DCArtboard id="st-loading" label="Carregando (skeleton)" width={1000} height={500}>
          <EFrame tone="load" name="Sempre há o Owner — abre em skeleton" refLabel="Matriz" center={false}>
            <EqListLoading />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="st-pending" label="Alteração pendente (Beatriz → Gerente)" width={1080} height={640}>
          <EFrame tone="empty" name="Badge salvo · select pendente · botão ativo" refLabel="RF014" center={false}>
            <EqList scenario="pending" />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="st-saving" label="Salvando (Marcos → Inativo)" width={1080} height={640}>
          <EFrame tone="load" name="Select bloqueado + spinner no botão" refLabel="RN038" center={false}
            toast={<WToast ok>Alterações salvas.</WToast>}>
            <EqList scenario="saving" />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="st-empty" label="Busca sem resultado" width={1080} height={520}>
          <EFrame tone="empty" name="Mensagem inline (a tabela nunca fica vazia de fato)" refLabel="Matriz" center={false}>
            <EqList scenario="empty" />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="st-error" label="Erro ao salvar (toast + reverte)" width={1080} height={640}>
          <EFrame tone="err" name="Toast de erro · select reverte ao valor salvo" refLabel="§8"
            center={false} toast={<WToast>Não foi possível salvar. Tente de novo.</WToast>}>
            <EqList scenario="base" />
          </EFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── SHEET: ADICIONAR MEMBRO ───── */}
      <DCSection id="sheet" title="03 · Sheet: adicionar / replicar membro" subtitle="Painel lateral (max-w-md) sobre /equipe — RF012, RF013, RN034, RN039">
        <DCArtboard id="sh-over" label="Sheet aberto sobre a tela (anatomia)" width={EW} height={760}>
          <EqSheetOverShell flow="new" state="initial" />
        </DCArtboard>
        <DCArtboard id="sh-initial" label="Novo membro · inicial" width={460} height={620}>
          <EFrame tone="empty" name="Campos editáveis · CTA “Enviar convite”" refLabel="RF012" center>
            <EqSheet flow="new" state="initial" standalone />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="sh-suggest" label="Autosugestão · usuário do tenant encontrado" width={460} height={680}>
          <EFrame tone="load" name="Popover com membro de outra unidade" refLabel="RF013 · RN034" center={false}>
            <EqSheet flow="new" state="suggest" standalone />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="sh-replicate" label="Replicação selecionada" width={460} height={640}>
          <EFrame tone="empty" name="Nome/e-mail travados · senha dispensada · CTA “Replicar membro”" refLabel="RF013 · RN037" center>
            <EqSheet flow="replicate" state="replicate" standalone />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="sh-sending" label="Enviando convite" width={460} height={620}>
          <EFrame tone="load" name="CTA em progresso" refLabel="Matriz" center>
            <EqSheet flow="new" state="initial" standalone sending />
          </EFrame>
        </DCArtboard>
        <DCArtboard id="sh-tenant" label="E-mail de outro negócio (erro)" width={460} height={620}>
          <EFrame tone="err" name="Erro inline no e-mail" refLabel="RN035 · §8" center>
            <EqSheet flow="new" state="tenant" standalone />
          </EFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="04 · Mobile (~390px)" subtitle="Tabela vira lista de cartões · badges empilhadas · edição ao tocar">
        <DCArtboard id="mob-list" label="Mobile · lista de membros" width={EPHONE} height={760}>
          <EqListMobile />
        </DCArtboard>
        <DCArtboard id="mob-sheet" label="Mobile · sheet adicionar membro" width={EPHONE} height={760}>
          <div style={{ height: "100%", background: "var(--wf-fieldbg)", display: "flex", flexDirection: "column" }}>
            <EqSheet flow="new" state="initial" standalone />
          </div>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.EqCanvas = EqCanvas;
