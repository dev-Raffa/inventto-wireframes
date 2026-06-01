/* Inventto — Wireframe · App Shell · montagem do canvas (Superfície 2 · casca interna) */

const {
  Sidebar, OrgTrigger, NavItem, TopHeader, AppShell, MobileShell,
  OrgPopover, CreateOrgDialog, UserNavTrigger, UserNavMenu, AvatarDialog, PasswordDialog,
  NotifPanel, Conta, GlobalState, WSwitch, SH_I, SHToast, ToastStack, TOAST_TYPES,
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

      {/* ───── SIDEBAR RECOLHIDA ───── */}
      <DCSection id="recolhida" title="02 · Sidebar recolhida (collapsible=icon)" subtitle="Rail de ícones w-[--sidebar-width-icon] (3rem) · acionada pelo SidebarTrigger no TopBar · estado persistido em cookie sidebar_state">
        <DCArtboard id="rec-expanded" label="Expandida (w-64) · referência" width={SW_DESK} height={680}>
          <AppShell role="owner" active="produtos" crumb={["Início", "Produtos"]} />
        </DCArtboard>
        <DCArtboard id="rec-collapsed" label="Recolhida (w-[--sidebar-width-icon]) · Owner" width={SW_DESK} height={680}>
          <AppShell role="owner" active="produtos" crumb={["Início", "Produtos"]} collapsed />
        </DCArtboard>
        <DCArtboard id="rec-rail" label="Rail · só ícones + tooltip no hover" width={260} height={560}>
          <div className="wf" style={{ height: "100%", display: "flex", background: "var(--wf-appbg)" }}>
            <Sidebar role="owner" active="produtos" collapsed tipFor="produtos" />
          </div>
        </DCArtboard>
        <DCArtboard id="rec-trigger" label="SidebarTrigger · posição inalterada" width={420} height={560}>
          <Frame tone="empty" name="O mesmo botão no TopBar alterna ambos os estados" refLabel="SidebarTrigger · SidebarInset" center>
            <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="sh-iconbtn" style={{ background: "var(--wf-fieldbg)", boxShadow: "0 0 0 2px var(--wf-ink)" }}>{SH_I.menu}</div>
                <span className="sh-vsep" />
                <div className="sh-crumb"><span className="sh-crumb-i is-current">Produtos</span></div>
              </div>
              <WNote><b>Acionamento.</b> O <b>SidebarTrigger</b> vive no header do <b>SidebarInset</b> (TopBar) e mantém a <b>mesma posição</b> nos dois estados — expandido e recolhido. Um clique alterna entre <b>w-64</b> e <b>w-[--sidebar-width-icon]</b>.</WNote>
              <WNote><b>Persistência.</b> A preferência é gravada no cookie <b>sidebar_state</b> e <b>restaurada no próximo acesso</b> — o painel volta no mesmo estado em que foi deixado.</WNote>
            </div>
          </Frame>
        </DCArtboard>
        <DCArtboard id="rec-nota" label="O que muda ao recolher" width={420} height={680}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 13, justifyContent: "center" }}>
            <WNote><b>Largura.</b> O rail assume <b>w-[--sidebar-width-icon]</b> (3rem · 48px), definido pelo token <b>SIDEBAR_WIDTH_ICON</b>.</WNote>
            <WNote><b>Header.</b> Exibe apenas o <b>logotipo da marca</b>; a wordmark “Inventto” é ocultada com <b>group-data-[collapsible=icon]:hidden</b>.</WNote>
            <WNote><b>Org Switcher.</b> Só o <b>avatar/inicial</b> da org ativa — sem nome, papel ou <b>ChevronsUpDown</b>.</WNote>
            <WNote><b>Navegação.</b> Apenas <b>ícones centrados</b>; labels e rótulos de grupo somem. O <b>tooltip</b> revela o label no hover.</WNote>
            <WNote><b>Item ativo.</b> Mantém o destaque (<b>--sidebar-accent</b>) sob o ícone — visível mesmo recolhido.</WNote>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ───── MOBILE ───── */}
      <DCSection id="mobile" title="03 · App Shell · Mobile" subtitle="TopBar (h-14) + conteúdo; sidebar como drawer (Sheet) via hambúrguer">
        <DCArtboard id="mob-closed" label="Mobile · navegação fechada" width={SW_PHONE} height={720}>
          <MobileShell />
        </DCArtboard>
        <DCArtboard id="mob-drawer" label="Mobile · drawer aberto (Sheet)" width={SW_PHONE} height={720}>
          <MobileShell drawer />
        </DCArtboard>
      </DCSection>

      {/* ───── ORG SWITCHER ───── */}
      <DCSection id="org" title="04 · Seletor / troca de organização" subtitle="Topo da sidebar · troca sem recarregar · lembra a última ativa — RF008, RN010, RN011">
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
      <DCSection id="createorg" title="05 · Dialog: criar organização" subtitle="Owner cria nova unidade sem sair do contexto · replicação opcional — RF006, RF009, RN020">
        <DCArtboard id="create-base" label="Base" width={520} height={520}>
          <Frame tone="empty" name="Nova organização" refLabel="RF006" center><CreateOrgDialog /></Frame>
        </DCArtboard>
        <DCArtboard id="create-replicate" label="Com “Copiar configurações” ligado" width={520} height={760}>
          <Frame tone="empty" name="Replicação de config (Owner ≥ 1 outra org)" refLabel="RF009 · RN029" center><CreateOrgDialog replicate /></Frame>
        </DCArtboard>
      </DCSection>

      {/* ───── USERNAV + NOTIFICAÇÕES ───── */}
      <DCSection id="usernotif" title="06 · UserNav & Notificações" subtitle="Lado direito do header — perfil, logout e central de alertas in-app — RF035, RF002">
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

      {/* ───── TOASTS ───── */}
      <DCSection id="toasts" title="08 · Toasts (feedback efêmero)" subtitle="Disparados pelo MutationCache e por eventos do sistema · canto inferior direito · mesma anatomia, variam cor/ícone/tempo de vida">

        <DCArtboard id="toast-anatomia" label="Anatomia base" width={560} height={420}>
          <Frame tone="empty" name="Ícone · mensagem (text-sm) · ação ghost opcional · fechar (X)" refLabel="shadow-md ↓" center>
            <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 20 }}>
              <SHToast type="info" action="Ver produtos">Estoque baixo em 3 produtos.</SHToast>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <WNote><b>Ícone (esq.).</b> Diferencia o tipo de imediato — um por categoria.</WNote>
                <WNote><b>Mensagem.</b> Texto curto em <b>text-sm</b>; sem título separado.</WNote>
                <WNote><b>Ação (opcional).</b> <b>Button ghost</b> à direita, só quando há próximo passo relevante.</WNote>
                <WNote><b>Fechar.</b> <b>Button icon-only</b> com X — sempre presente e acessível via teclado.</WNote>
                <WNote><b>Elevação.</b> <b>shadow-md</b> direcionada para baixo, reforçando a camada flutuante.</WNote>
              </div>
            </div>
          </Frame>
        </DCArtboard>

        <DCArtboard id="toast-tipos" label="Os 4 tipos" width={480} height={420}>
          <Frame tone="empty" name="Sucesso · Informativo · Alerta · Erro" refLabel="cor + ícone + TTL" center>
            <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 12 }}>
              <SHToast type="success">Produto salvo com sucesso.</SHToast>
              <SHToast type="info" action="Entrar">Sua sessão expirou.</SHToast>
              <SHToast type="warning" action="Tentar de novo">Não foi possível trocar de organização.</SHToast>
              <SHToast type="error" action="Tentar de novo">Falha ao salvar o produto.</SHToast>
            </div>
          </Frame>
        </DCArtboard>

        <DCArtboard id="toast-tabela" label="Tabela de tipos" width={560} height={420}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <table className="sh-toasttable">
              <thead>
                <tr><th>Tipo</th><th>Ícone</th><th>Token de cor</th><th>Auto-dismiss</th></tr>
              </thead>
              <tbody>
                {["success", "info", "warning", "error"].map((k) => {
                  const t = TOAST_TYPES[k];
                  return (
                    <tr key={k}>
                      <td><span className="sh-tt-name">{t.label}</span></td>
                      <td><span className="sh-tt-ico" style={{ color: t.color, background: t.bg }}>{SH_I[t.icon]}</span></td>
                      <td><span className="sh-tt-token">{t.token}</span></td>
                      <td><span className="sh-tt-ttl">{t.ttl}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="wf-helper" style={{ marginTop: 14 }}>A largura da barra inferior de cada toast acompanha o tempo de vida — quanto maior o TTL, mais cheia ela inicia.</p>
          </div>
        </DCArtboard>

        <DCArtboard id="toast-stack" label="Empilhamento · canto inferior direito" width={SW_DESK} height={620}>
          <div className="wf sh-app" style={{ position: "relative" }}>
            <Sidebar role="owner" active="produtos" collapsed />
            <div className="sh-inset">
              <TopHeader crumb={["Início", "Produtos"]} />
              <div className="sh-main"><ModuleSlotMini /></div>
            </div>
            <ToastStack>
              <SHToast type="success">Produto salvo com sucesso.</SHToast>
              <SHToast type="warning" action="Tentar de novo">Não foi possível trocar de organização.</SHToast>
              <SHToast type="error" action="Tentar de novo">Falha ao baixar o estoque do pedido.</SHToast>
            </ToastStack>
          </div>
        </DCArtboard>

        <DCArtboard id="toast-origem" label="Origem por tipo & restrições" width={460} height={620}>
          <div className="wf" style={{ height: "100%", background: "var(--wf-fieldbg)", padding: 24, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            <div className="sh-section-h" style={{ marginTop: 0 }}>Origem por tipo</div>
            <WNote><b>Sucesso.</b> MutationCache via <b>meta.successMessage</b>.</WNote>
            <WNote><b>Erro.</b> MutationCache via <b>meta.errorMessage</b> ou mensagem padrão.</WNote>
            <WNote><b>Informativo.</b> Eventos de sistema sem ação direta do usuário (ex.: sessão expirada · RN004).</WNote>
            <WNote><b>Alerta.</b> Avisos contextuais que não bloqueiam o fluxo (ex.: falha ao trocar de organização).</WNote>
            <div className="sh-section-h">Restrições de implementação</div>
            <WNote><b>Nunca</b> usar <b>toast()</b> direto na feature.</WNote>
            <WNote><b>Nunca</b> usar <b>alert()</b> ou <b>console.error()</b> como feedback de UI.</WNote>
            <WNote><b>onError</b> local só quando houver ação local específica — sem duplicar o toast do MutationCache.</WNote>
          </div>
        </DCArtboard>

      </DCSection>

    </DesignCanvas>
  );
}

/* placeholder enxuto do módulo (reuso no demo de empilhamento) */
function ModuleSlotMini() {
  return (
    <div className="sh-slot">
      <div className="wf-sk" style={{ width: 180, height: 20 }} />
      <div className="wf-sk" style={{ width: 300, height: 11, marginTop: 10 }} />
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <div className="wf-sk" style={{ flex: 1, height: 58 }} />
        <div className="wf-sk" style={{ flex: 1, height: 58 }} />
        <div className="wf-sk" style={{ flex: 1, height: 58 }} />
      </div>
      <div className="wf-sk" style={{ width: "100%", height: 11, marginTop: 20 }} />
      <div className="wf-sk" style={{ width: "88%", height: 11, marginTop: 9 }} />
    </div>
  );
}

window.ShellCanvas = ShellCanvas;
