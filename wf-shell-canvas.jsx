/* Inventto — Wireframe · App Shell · montagem do canvas (Superfície 2 · casca interna) */

const {
  Sidebar, OrgTrigger, NavItem, TopHeader, AppShell, MobileShell,
  OrgPopover, CreateOrgDialog, UserNavTrigger, UserNavMenu, AvatarDialog, PasswordDialog,
  NotifPanel, Conta, GlobalState, WSwitch, SH_I,
} = window.SH;

const SW_DESK = 1200, SW_PHONE = 390;

/* moldura neutra p/ exibir um sub-componente (popover, menu) com caption */
function Frame({ tone = "empty", name, refLabel, children, pad = 28, center = true }) {
  return (
    <div className="wf" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--wf-field)" }}>
      <WStateCap tone={tone} name={name} refLabel={refLabel} />
      <div style={{ flex: 1, padding: pad, background: "var(--wf-fieldbg)", display: "flex", alignItems: center ? "center" : "flex-start", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

function ShellLegend() {
  const sw = (bg, label) => <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg }} />{label}</div>;
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 2 — App Shell (casca interna)</h3>
      <p className="wf-legsub">A estrutura persistente que envolve todos os módulos internos: SidebarProvider + Sidebar (w-64) + SidebarInset (cartão flutuante) com Top Header. Lo-fi cinza-escala; a navegação se adapta ao papel (RF015). Desktop (1200) e mobile (390) lado a lado.</p>
      {sw("var(--wf-appbg)", "Fundo da app — bg-zinc-50 (SidebarProvider · L.1)")}
      {sw("var(--wf-sidebar)", "Sidebar — stand-in de --sidebar (verde muito claro · L.2)")}
      {sw("var(--wf-field)", "SidebarInset — cartão branco flutuante (m-2, rounded-xl, shadow-sm · L.3)")}
      {sw("var(--wf-ink)", "Preenchimento sólido = CTA primária / item ativo")}
      {sw("var(--wf-err)", "Tijolo = erro / destrutivo / badge do sino")}
      {sw("var(--wf-note)", "Ardósia = anotação de produto (RF/RN)")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>Refs: RF015 (guards por papel) · RF008 (Org Switcher) · RF035 (notificações).</div>
    </div>
  );
}

function ShellCanvas() {
  return (
    <DesignCanvas>

      {/* ───── ANATOMIA ───── */}
      <DCSection id="anatomia" title="00 · Anatomia & legenda" subtitle="L.1 SidebarProvider · L.2 Sidebar · L.3 SidebarInset — RF015, RF008, RF035">
        <DCArtboard id="legend" label="Legenda" width={600} height={400}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><ShellLegend /></div>
        </DCArtboard>
        <DCArtboard id="shell-owner" label="App Shell · Desktop · Owner (menu completo)" width={SW_DESK} height={720}>
          <AppShell role="owner" active="equipe" crumb={["Início", "Equipe"]} />
        </DCArtboard>
        <DCArtboard id="anatomia-nota" label="Notas de estrutura" width={420} height={720}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <WNote><b>L.1 · SidebarProvider.</b> Fundo global <b>bg-zinc-50</b> cria contraste com o cartão branco do inset. Guarda o estado expandido/colapsado.</WNote>
            <WNote><b>L.2 · Sidebar (w-64).</b> Logo + Org Switcher no topo. Itens em grupos (OPERAÇÃO · INVENTÁRIO · ADMINISTRAÇÃO). Item ativo: fundo branco + font-medium + <b>aria-current</b>.</WNote>
            <WNote><b>L.3 · SidebarInset.</b> Cartão flutuante (<b>m-2 · rounded-xl · border · shadow-sm</b>). Header h-16: trigger + separator + breadcrumb à esquerda; tema + sino + UserNav à direita. <b>main</b> com p-6/p-8.</WNote>
            <WNote><b>Mobile.</b> Margens e arredondamento somem (100% da tela). A sidebar vira <b>Sheet</b> (drawer) via hambúrguer.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── NAVEGAÇÃO POR PAPEL ───── */}
      <DCSection id="papel" title="01 · Navegação por papel" subtitle="O shell monta o menu do papel — o inacessível não aparece (RF015 · adapta, não desabilita)">
        <DCArtboard id="nav-sales" label="Sidebar · Sales (operação)" width={256} height={560}>
          <Sidebar role="sales" active="dash" />
        </DCArtboard>
        <DCArtboard id="nav-manager" label="Sidebar · Manager (+ Vitrines)" width={256} height={560}>
          <Sidebar role="manager" active="produtos" />
        </DCArtboard>
        <DCArtboard id="nav-owner" label="Sidebar · Owner (menu completo)" width={256} height={560}>
          <Sidebar role="owner" active="org" />
        </DCArtboard>
        <DCArtboard id="nav-nota" label="Recorte por papel" width={420} height={560}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <WNote><b>Sales.</b> Operação + leitura de inventário. <b>Sem</b> Vitrines, Equipe, Organização.</WNote>
            <WNote><b>Manager.</b> Acrescenta <b>Vitrines</b>. Ainda sem Equipe e Organização (administração é só do Owner).</WNote>
            <WNote><b>Owner.</b> Menu completo, incluindo <b>Equipe</b> e <b>Organização</b>.</WNote>
            <WNote><b>Rota fora do papel</b> não existe acesso negado: o item some do DOM e a rota responde como inexistente (redirect silencioso → <b>/</b>).</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="02 · App Shell · Mobile" subtitle="TopBar (h-14) + conteúdo; sidebar como drawer (Sheet) via hambúrguer">
        <DCArtboard id="mob-closed" label="Mobile · navegação fechada" width={SW_PHONE} height={720}>
          <MobileShell />
        </DCArtboard>
        <DCArtboard id="mob-drawer" label="Mobile · drawer aberto (Sheet)" width={SW_PHONE} height={720}>
          <MobileShell drawer />
        </DCArtboard>
      </DCSection>

      {/* ───── ORG SWITCHER ───── */}
      <DCSection id="org" title="03 · Seletor / troca de organização" subtitle="Topo da sidebar · troca sem recarregar · lembra a última ativa — RF008, RN010, RN011">
        <DCArtboard id="org-pop" label="Popover aberto · Owner" width={420} height={500}>
          <Frame tone="empty" name="Lista + busca + Criar organização (Owner)" refLabel="RF008 · RF006">
            <div style={{ width: 264 }}>
              <OrgTrigger role="owner" />
              <div style={{ marginTop: 6 }}><OrgPopover owner /></div>
            </div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="org-static" label="Org única · Manager/Sales" width={420} height={360}>
          <Frame tone="empty" name="Trigger estático — sem chevron, sem popover" refLabel="RN011" center>
            <div style={{ width: 264 }}>
              <OrgTrigger role="manager" static />
              <div style={{ marginTop: 14 }}><WNote><b>Uma única org.</b> Sem seletor. Para o Owner, o atalho “Criar organização” ainda aparece no menu.</WNote></div>
            </div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="org-switching" label="Trocando de contexto" width={420} height={420}>
          <Frame tone="load" name="Carregando dados da nova org (skeleton)" refLabel="RN010" center>
            <div style={{ width: 264 }}>
              <OrgTrigger role="owner" name="Loja Shopping Norte" />
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="sh-sk-row"><span className="sh-sk-dot" /><span className="wf-sk" style={{ flex: 1, height: 11 }} /></div>
                <div className="sh-sk-row"><span className="sh-sk-dot" /><span className="wf-sk" style={{ flex: 1, height: 11 }} /></div>
                <div className="sh-sk-row"><span className="sh-sk-dot" /><span className="wf-sk" style={{ flex: 1, height: 11 }} /></div>
              </div>
            </div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="org-fail" label="Falha ao trocar" width={420} height={360}>
          <Frame tone="err" name="Toast de erro — contexto preservado" refLabel="RN010" center>
            <WToast>Não foi possível trocar de organização. Tente de novo.</WToast>
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── DIALOG CRIAR ORG ───── */}
      <DCSection id="createorg" title="04 · Dialog: criar organização" subtitle="Owner cria nova unidade sem sair do contexto · replicação opcional — RF006, RF009, RN020">
        <DCArtboard id="create-base" label="Base" width={520} height={520}>
          <Frame tone="empty" name="Nova organização" refLabel="RF006" center><CreateOrgDialog /></Frame>
        </DCArtboard>
        <DCArtboard id="create-replicate" label="Com “Copiar configurações” ligado" width={520} height={760}>
          <Frame tone="empty" name="Replicação de config (Owner ≥ 1 outra org)" refLabel="RF009 · RN029" center><CreateOrgDialog replicate /></Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── USERNAV + NOTIFICAÇÕES ───── */}
      <DCSection id="usernotif" title="05 · UserNav & Notificações" subtitle="Lado direito do header — perfil, logout e central de alertas in-app — RF035, RF002">
        <DCArtboard id="usernav" label="UserNav · trigger + dropdown" width={420} height={440}>
          <Frame tone="empty" name="Trigger composto → menu" refLabel="RF002 · RF004">
            <div style={{ width: 168, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
              <div style={{ width: "100%", background: "var(--wf-field)", border: "1.5px solid var(--wf-line)", borderRadius: 9, padding: 2, display: "flex" }}><UserNavTrigger full /></div>
              <UserNavMenu width={168} />
            </div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="dlg-avatar-1" label="Dialog avatar · Estado 1 · Seleção (max-w-sm)" width={460} height={520}>
          <Frame tone="empty" name="Preview circular + Carregar foto" refLabel="RN026" center><AvatarDialog state="select" /></Frame>
        </DCArtboard>
        <DCArtboard id="dlg-avatar-2" label="Dialog avatar · Estado 2 · Recorte (max-w-lg)" width={600} height={560}>
          <Frame tone="empty" name="Crop circular + zoom — Dialog expande" refLabel="RN026" center><AvatarDialog state="crop" /></Frame>
        </DCArtboard>
        <DCArtboard id="dlg-avatar-saving" label="Dialog avatar · Salvando" width={600} height={560}>
          <Frame tone="load" name="Salvando… (crop bloqueado, upload Cloudinary)" refLabel="RN026 · §5" center><AvatarDialog state="saving" /></Frame>
        </DCArtboard>
        <DCArtboard id="dlg-senha" label="Dialog: alterar senha" width={480} height={520}>
          <Frame tone="empty" name="Senha atual + nova + confirmação" refLabel="RF004 · RN001" center><PasswordDialog /></Frame>
        </DCArtboard>
        <DCArtboard id="notif" label="Notificações · com alertas" width={420} height={420}>
          <Frame tone="empty" name="Novo pedido + estoque baixo" refLabel="RF035 · RN089" center><NotifPanel /></Frame>
        </DCArtboard>
        <DCArtboard id="notif-empty" label="Notificações · vazio" width={420} height={300}>
          <Frame tone="empty" name="Sem novidades" refLabel="RF035" center><NotifPanel empty /></Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── CONTA E PERFIL ───── */}
      <DCSection id="conta" title="06 · Conta e perfil" subtitle="/conta · dados pessoais + logout · idêntica para todos os papéis — RF002">
        <DCArtboard id="conta-desk" label="Desktop (coluna centralizada)" width={SW_DESK} height={720}>
          <div className="wf sh-app">
            <Sidebar role="owner" active="" orgStatic={false} />
            <div className="sh-inset">
              <TopHeader crumb={["Início", "Minha conta"]} notif={false} />
              <div className="sh-main" style={{ overflow: "auto" }}>
                <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}><Conta /></div>
              </div>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="conta-mob" label="Mobile" width={SW_PHONE} height={760}>
          <div className="wf sh-mobile">
            <div className="sh-topbar">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="sh-iconbtn">{SH_I.menu}</div><WLogo /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span></div>
            </div>
            <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)" }}><Conta /></div>
          </div>
        </DCArtboard>
        <DCArtboard id="conta-saving" label="Salvando alterações" width={440} height={620}>
          <Frame tone="load" name="Salvando… (CTA em progresso)" refLabel="RF002" center={false}>
            <div style={{ width: "100%", maxWidth: 380 }}><Conta saving /></div>
          </Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── ESTADOS GLOBAIS ───── */}
      <DCSection id="estados" title="07 · Estados globais do shell" subtitle="Sessão, permissão, 404 e falha de carga — RN004, RF015, Matriz §global">
        <DCArtboard id="st-session" label="Sessão expirada → login" width={440} height={420}>
          <Frame tone="err" name="Redireciona ao login preservando o destino" refLabel="RN004" center>
            <GlobalState icon="lock" title="Sua sessão expirou" text="Por segurança, entre novamente. Levaremos você de volta para onde estava." cta="Ir para o login" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-404" label="Não encontrado (404)" width={440} height={420}>
          <Frame tone="empty" name="Recurso inexistente ou removido" refLabel="Matriz §global" center>
            <GlobalState icon="alert" title="Página não encontrada" text="O recurso que você procura não existe ou foi removido." cta="Voltar ao Dashboard" />
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-perm" label="Sem permissão (redirect)" width={440} height={420}>
          <Frame tone="load" name="Redirect silencioso → / (sem tela de acesso negado)" refLabel="RF015 · RN002" center>
            <div style={{ textAlign: "center" }}>
              <div className="wf-otp-icon" style={{ margin: "0 auto 16px" }}>{SH_I.logout}</div>
              <p className="wf-sub" style={{ maxWidth: 280 }}>Rota fora do papel não mostra “acesso negado”. O usuário é levado em silêncio ao seu ponto de partida (<span className="wf-link">/</span>).</p>
            </div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="st-load" label="Falha ao carregar o shell" width={SW_DESK} height={640}>
          <div className="wf sh-app">
            <div className="sh-sidebar">
              <div className="sh-sidebar-logo"><WLogo /></div>
              <div className="sh-org"><span className="sh-sk-dot" style={{ width: 30, height: 30, borderRadius: 7 }} /><span className="wf-sk" style={{ flex: 1, height: 12 }} /></div>
              <div className="sh-nav" style={{ gap: 8 }}>
                {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="sh-sk-row"><span className="sh-sk-dot" /><span className="wf-sk" style={{ flex: 1, height: 11 }} /></div>)}
              </div>
            </div>
            <div className="sh-inset">
              <TopHeader crumb={["Início"]} notif={false} />
              <div className="sh-main">
                <GlobalState icon="alert" title="Não foi possível carregar" text="Houve uma falha de rede ao montar o painel. O que já estava em tela foi preservado." cta="Tentar de novo" />
              </div>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.ShellCanvas = ShellCanvas;
