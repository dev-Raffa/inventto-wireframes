/* Inventto — Wireframe · Módulo Dashboard · montagem do canvas (Superfície 2 · 2.9) */

const {
  DA_I, DashShell, DashView, SalesBlock, AttnBlock, ActivityBlock,
  Onboarding, OnboardingShell, DashErrorShell, DashSkeleton, DashMobile, OnboardingMobile,
} = window.DASH;

const CW = 1200, CPHONE = 390;

/* moldura neutra com caption (igual aos demais módulos) */
function DaFrame({ tone = "empty", name, refLabel, children, pad = 0 }) {
  return (
    <div className="da-frame wf">
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div className="da-frame-body" style={{ padding: pad }}>{children}</div>
    </div>
  );
}

/* caixa neutra p/ blocos isolados (fundo de área) */
function BlockBox({ children, w = 760 }) {
  return (
    <div style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 26, display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: "auto" }}>
      <div className="wf" style={{ width: w, maxWidth: "100%" }}>{children}</div>
    </div>
  );
}

function DaLegend() {
  const sw = (bg, bd, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg, borderColor: bd }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — Dashboard (2.9)</h3>
      <p className="wf-legsub">A <b>tela inicial pós-login</b> (RN092): visão operacional rápida em <b>três blocos verticais</b> — <b>atenção imediata</b> (RF036) · <b>resumo de vendas</b> com gráfico (RF037) · <b>atividade recente e atalhos</b> (RF038). Adaptada por papel (RN091): Vendedor, Gerente e Dono veem recortes distintos. Lo-fi cinza-escala; cor <b>funcional apenas</b>.</p>
      {sw("var(--da-warning-bg)", "var(--da-warning)", "Âmbar — pedidos pendentes / expirando (warning)")}
      {sw("var(--da-critical-bg)", "var(--da-critical)", "Tijolo — estoque crítico ou zerado (critical)")}
      {sw("var(--da-healthy-bg)", "var(--da-healthy)", "Verde dessat. — entrada / confirmado / tendência positiva")}
      {sw("var(--da-zeroed-bg)", "var(--wf-line)", "Neutro — pedido expirado / encerrado (zeroed)")}
      {sw("var(--wf-ink)", "var(--wf-ink)", "Preenchimento sólido = atalho primário (Nova venda) e linha do gráfico")}
      {sw("var(--wf-note-bg)", "var(--wf-note)", "Ardósia = nota de regra (RN)")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF036–RF038 · RN089–RN092. Microcopy §4.</div>
    </div>
  );
}

function DashCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="Dashboard (/) dentro do App Shell · grid 2 colunas no lg+ — Atenção + Atividade à esquerda, Vendas (com gráfico) à direita. Três blocos: RF036 · RF037 · RF038">
        <DCArtboard id="legend" label="Legenda" width={600} height={470}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><DaLegend /></div>
        </DCArtboard>
        <DCArtboard id="dash-desk" label="Dashboard · Desktop · Dono (visão completa)" width={CW} height={760}>
          <DashShell role="owner" period="30dias" />
        </DCArtboard>
        <DCArtboard id="dash-desk-collapsed" label="Mesma tela · sidebar recolhida (collapsible=icon · modelo do App Shell)" width={CW} height={760}>
          <DashShell role="owner" period="30dias" collapsed />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={470} height={760}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <WNote><b>Tela inicial pós-login (RN092).</b> Rota <b>/</b>. Enquanto o Dashboard não existia, a entrada era <b>/produtos</b> (RN091).</WNote>
            <WNote><b>Arranjo vertical em três níveis.</b> Atenção → Vendas → Atividade. No <b>lg+</b>, grid 2 colunas: Atenção e Atividade à esquerda; Vendas com gráfico à direita. No mobile, empilha na ordem.</WNote>
            <WNote><b>Atenção imediata (RF036).</b> Cards acionáveis: ícone + número grande + rótulo + <b>ChevronRight</b>. Cada card leva ao ponto de ação (/pedidos · /produtos filtrado). Valor <b>“0”</b> fica esmaecido, sem urgência.</WNote>
            <WNote><b>Resumo de vendas (RF037).</b> SegmentedControl Hoje · 7 d · 30 d + faturamento + nº de vendas + <b>LineChart</b>. Margem e inventário a custo são <b>exclusivos do Dono</b> (RN091).</WNote>
            <WNote><b>Degrada isolado (RN089).</b> Cada bloco carrega e falha sozinho — um card com erro não derruba a tela.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── RECORTE POR PAPEL ───── */}
      <DCSection id="papel" title="01 · Recorte por papel (RN091)" subtitle="Uma tela, três papéis. Dono e Gerente veem a operação inteira; o Vendedor vê apenas o que pode acionar — sem alertas de estoque, sem faturamento da loja">
        <DCArtboard id="role-owner" label="Dono · faturamento + margem + inventário a custo" width={CW} height={760}>
          <DashShell role="owner" period="30dias" />
        </DCArtboard>
        <DCArtboard id="role-manager" label="Gerente · faturamento + gráfico, sem margem/inventário" width={CW} height={760}>
          <DashShell role="manager" period="7dias" />
        </DCArtboard>
        <DCArtboard id="role-sales" label="Vendedor · só pedidos a expirar + vendas próprias" width={CW} height={680}>
          <DashShell role="sales" />
        </DCArtboard>
      </DCSection>

      {/* ───── BLOCO 1 · ATENÇÃO ───── */}
      <DCSection id="atencao" title="02 · Bloco 1 · Atenção imediata (RF036)" subtitle="Cards acionáveis com badge semântico · estado com valores e estado zerado (sem urgência) · recorte do Vendedor">
        <DCArtboard id="attn-mo" label="Gerente / Dono · pendentes · estoque · expirando" width={820} height={300}>
          <BlockBox w={760}><AttnBlock role="owner" /></BlockBox>
        </DCArtboard>
        <DCArtboard id="attn-sales" label="Vendedor · só pedidos do pool perto de expirar" width={520} height={300}>
          <BlockBox w={420}><AttnBlock role="sales" /></BlockBox>
        </DCArtboard>
        <DCArtboard id="attn-zero" label="Dados zerados · “0” esmaecido, sem urgência" width={820} height={300}>
          <BlockBox w={760}>
            <div className="da-block">
              <div className="da-block-head"><h2>Atenção imediata</h2><span className="da-eyebrow">Matriz · dados zerados</span></div>
              <div className="da-attn-grid">
                {window.DASH.AttnCard({ icon: "orders", num: 0, label: "Pedidos pendentes", acc: "warning" })}
                {window.DASH.AttnCard({ icon: "triangle", num: 0, label: "Estoque crítico ou zerado", acc: "critical" })}
                {window.DASH.AttnCard({ icon: "hourglass", num: 0, label: "Expirando em breve", acc: "warning" })}
              </div>
            </div>
          </BlockBox>
        </DCArtboard>
      </DCSection>

      {/* ───── BLOCO 2 · VENDAS ───── */}
      <DCSection id="vendas" title="03 · Bloco 2 · Resumo de vendas (RF037)" subtitle="SegmentedControl de período + faturamento + LineChart · extras exclusivos do Dono (margem + inventário a custo) · contador simples do Vendedor">
        <DCArtboard id="sales-hoje" label="Gerente · período Hoje" width={460} height={420}>
          <BlockBox w={400}><SalesBlock role="manager" period="hoje" /></BlockBox>
        </DCArtboard>
        <DCArtboard id="sales-7d" label="Gerente · período 7 dias" width={460} height={420}>
          <BlockBox w={400}><SalesBlock role="manager" period="7dias" /></BlockBox>
        </DCArtboard>
        <DCArtboard id="sales-owner" label="Dono · 30 dias + margem + inventário (RN091)" width={460} height={560}>
          <BlockBox w={400}><SalesBlock role="owner" period="30dias" /></BlockBox>
        </DCArtboard>
        <DCArtboard id="sales-simple" label="Vendedor · contador simples, sem gráfico" width={460} height={300}>
          <BlockBox w={400}><SalesBlock role="sales" /></BlockBox>
        </DCArtboard>
      </DCSection>

      {/* ───── BLOCO 3 · ATIVIDADE ───── */}
      <DCSection id="atividade" title="04 · Bloco 3 · Atividade e atalhos (RF038)" subtitle="Mini-listas (movimentações + últimos pedidos) e atalhos em linha (Gerente/Dono) · vendas próprias + atalho PDV (Vendedor)">
        <DCArtboard id="act-mo" label="Gerente / Dono · movimentações + pedidos + 3 atalhos" width={520} height={680}>
          <BlockBox w={420}><ActivityBlock role="owner" /></BlockBox>
        </DCArtboard>
        <DCArtboard id="act-sales" label="Vendedor · últimas vendas próprias + Nova venda" width={520} height={420}>
          <BlockBox w={420}><ActivityBlock role="sales" /></BlockBox>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS (Matriz) ───── */}
      <DCSection id="estados" title="05 · Estados (Matriz)" subtitle="Carregando: skeleton por bloco · erro de bloco isolado degrada sozinho (RN089) — “Não foi possível carregar.” + Tentar de novo">
        <DCArtboard id="st-loading" label="Carregando · skeleton por bloco" width={CW} height={700}>
          <DaFrame tone="load" name="Skeleton por bloco — cada um carrega isolado (RN089)" refLabel="Matriz">
            <DashSkeleton />
          </DaFrame>
        </DCArtboard>
        <DCArtboard id="st-blockerr" label="Erro isolado · resumo de vendas falhou" width={CW} height={700}>
          <DaFrame tone="err" name="Um bloco degrada sem derrubar os demais" refLabel="RN089 · §5">
            <DashErrorShell role="owner" />
          </DaFrame>
        </DCArtboard>
      </DCSection>

      {/* ───── ONBOARDING (1º uso) ───── */}
      <DCSection id="onboarding" title="06 · Primeiro uso · onboarding (RN091 · §4)" subtitle="Org sem produtos, catálogos nem vendas: os blocos operacionais dão lugar a três cards sequenciais com CheckCircle ao concluir cada critério">
        <DCArtboard id="onb-start" label="Tudo zerado · nenhum passo concluído" width={CW} height={620}>
          <OnboardingShell done={0} activeStep={0} />
        </DCArtboard>
        <DCArtboard id="onb-progress" label="Passo 1 concluído · passo 2 ativo" width={CW} height={620}>
          <OnboardingShell done={1} activeStep={1} />
        </DCArtboard>
        <DCArtboard id="onb-almost" label="Passos 1 e 2 concluídos · falta publicar" width={CW} height={620}>
          <OnboardingShell done={2} activeStep={2} />
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="07 · Mobile (~390px)" subtitle="Coluna única — Atenção → Vendas → Atividade · adaptado por papel · onboarding empilhado">
        <DCArtboard id="mob-owner" label="Dono · coluna única" width={CPHONE} height={900}>
          <DashMobile role="owner" period="hoje" />
        </DCArtboard>
        <DCArtboard id="mob-manager" label="Gerente · coluna única" width={CPHONE} height={860}>
          <DashMobile role="manager" period="7dias" />
        </DCArtboard>
        <DCArtboard id="mob-sales" label="Vendedor · só o acionável" width={CPHONE} height={760}>
          <DashMobile role="sales" />
        </DCArtboard>
        <DCArtboard id="mob-onb" label="Primeiro uso · onboarding" width={CPHONE} height={620}>
          <OnboardingMobile />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.DashCanvas = DashCanvas;
