/* Inventto — Wireframe · App Shell (Superfície 2). Primitivos da casca + telas.
   Reusa o kit base (window.WF_*). Exporta primitivos e telas em window.SH. */

/* ── ícones lo-fi (lucide-like, 1.5 stroke) ───────────── */
const ic = (p) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const SH_I = {
  dashboard: ic(<><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>),
  orders: ic(<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3M9 11h6M9 15h4"/></>),
  cart: ic(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  package: ic(<><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/></>),
  swap: ic(<><path d="M8 4 4 8l4 4M4 8h12M16 20l4-4-4-4M20 16H8"/></>),
  layers: ic(<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  store: ic(<><path d="M3 9 4.5 4h15L21 9M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M3 9h18"/></>),
  users: ic(<><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6M21 20a6 6 0 0 0-3.5-5.4"/></>),
  settings: ic(<><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.3-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>),
  chevrons: ic(<><path d="m7 15 5 5 5-5M7 9l5-5 5 5"/></>),
  check: ic(<path d="M20 6 9 17l-5-5"/>),
  plus: ic(<path d="M12 5v14M5 12h14"/>),
  bell: ic(<><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>),
  sun: ic(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>),
  menu: ic(<path d="M4 6h16M4 12h16M4 18h16"/>),
  x: ic(<path d="M6 6 18 18M18 6 6 18"/>),
  search: ic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  user: ic(<><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/></>),
  logout: ic(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>),
  image: ic(<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="m21 15-5-5L5 21"/></>),
  lock: ic(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>),
  upload: ic(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5"/></>),
  zoomin: ic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3M11 8v6M8 11h6"/></>),
  zoomout: ic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3M8 11h6"/></>),
  trunc: ic(<path d="M5 12h14"/>),
};

/* navegação por papel (L.2) */
const NAV = [
  { group: "OPERAÇÃO", items: [
    { id: "dash", label: "Dashboard", icon: "dashboard", roles: ["sales", "manager", "owner"] },
    { id: "pedidos", label: "Pedidos", icon: "orders", roles: ["sales", "manager", "owner"] },
    { id: "pdv", label: "Venda no balcão", icon: "cart", roles: ["sales", "manager", "owner"] },
  ] },
  { group: "INVENTÁRIO", items: [
    { id: "produtos", label: "Produtos", icon: "package", roles: ["sales", "manager", "owner"] },
    { id: "mov", label: "Movimentações", icon: "swap", roles: ["sales", "manager", "owner"] },
    { id: "catalogos", label: "Catálogos", icon: "layers", roles: ["sales", "manager", "owner"] },
    { id: "vitrines", label: "Vitrines", icon: "store", roles: ["manager", "owner"] },
  ] },
  { group: "ADMINISTRAÇÃO", items: [
    { id: "equipe", label: "Equipe", icon: "users", roles: ["owner"] },
    { id: "org", label: "Organização", icon: "settings", roles: ["owner"] },
  ] },
];

const ROLE_LABEL = { owner: "Dono", manager: "Gerente", sales: "Vendedor" };

/* ── org switcher trigger ─────────────────────────────── */
function OrgTrigger({ name = "Ateliê Joana", role = "owner", static: isStatic }) {
  return (
    <div className={["sh-org", isStatic ? "is-static" : ""].join(" ")}>
      <span className="sh-org-avatar">A</span>
      <span className="sh-org-meta">
        <span className="sh-org-name">{name}</span>
        <span className="sh-org-role">{ROLE_LABEL[role]}</span>
      </span>
      {!isStatic && <span className="sh-org-chev">{SH_I.chevrons}</span>}
    </div>
  );
}

/* ── sidebar ──────────────────────────────────────────── */
function NavItem({ item, active }) {
  return (
    <div className={["sh-navitem", active ? "is-active" : ""].join(" ")}>
      <span className="sh-ico">{SH_I[item.icon]}</span>
      <span>{item.label}</span>
    </div>
  );
}

function Sidebar({ role = "owner", active = "equipe", orgStatic }) {
  return (
    <div className="sh-sidebar">
      <div className="sh-sidebar-logo"><WLogo /></div>
      <OrgTrigger role={role} static={orgStatic} />
      <div className="sh-nav">
        {NAV.map((g) => {
          const items = g.items.filter((it) => it.roles.includes(role));
          if (!items.length) return null;
          return (
            <div key={g.group}>
              <div className="sh-group-label">{g.group}</div>
              <div className="sh-navgroup">
                {items.map((it) => <NavItem key={it.id} item={it} active={it.id === active} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── breadcrumb ───────────────────────────────────────── */
function Crumb({ path = ["Início", "Equipe"] }) {
  return (
    <div className="sh-crumb">
      {path.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && <span className="sh-crumb-sep">›</span>}
          <span className={["sh-crumb-i", i === path.length - 1 ? "is-current" : ""].join(" ")}>{p}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── top header (desktop) ─────────────────────────────── */
function TopHeader({ crumb, notif = true }) {
  return (
    <div className="sh-header">
      <div className="sh-header-l">
        <div className="sh-iconbtn">{SH_I.menu}</div>
        <span className="sh-vsep" />
        <Crumb path={crumb} />
      </div>
      <div className="sh-header-r">
        <div className="sh-iconbtn">{SH_I.sun}</div>
        <div className="sh-iconbtn">{SH_I.bell}{notif && <span className="sh-bell-badge" />}</div>
        <UserNavTrigger />
      </div>
    </div>
  );
}

/* placeholder de módulo (onde a Superfície 2 renderiza) */
function ModuleSlot({ title = "Gerenciar equipe", sub = "main · p-6/p-8 — cada módulo da Superfície 2 renderiza aqui" }) {
  return (
    <div className="sh-slot">
      <div className="sh-slot-tag" style={{ marginBottom: 14 }}><WTag>main · área de renderização</WTag></div>
      <div className="wf-sk" style={{ width: 200, height: 22 }} />
      <div className="wf-sk" style={{ width: 320, height: 11, marginTop: 10 }} />
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <div className="wf-sk" style={{ flex: 1, height: 64 }} />
        <div className="wf-sk" style={{ flex: 1, height: 64 }} />
        <div className="wf-sk" style={{ flex: 1, height: 64 }} />
      </div>
      <div className="wf-sk" style={{ width: "100%", height: 11, marginTop: 22 }} />
      <div className="wf-sk" style={{ width: "92%", height: 11, marginTop: 9 }} />
      <div className="wf-sk" style={{ width: "78%", height: 11, marginTop: 9 }} />
      <p className="wf-helper" style={{ marginTop: "auto" }}>{sub}</p>
    </div>
  );
}

/* ── App Shell completa (desktop) ─────────────────────── */
function AppShell({ role = "owner", active = "equipe", crumb = ["Início", "Equipe"], orgStatic }) {
  return (
    <div className="wf sh-app">
      <Sidebar role={role} active={active} orgStatic={orgStatic} />
      <div className="sh-inset">
        <TopHeader crumb={crumb} />
        <div className="sh-main"><ModuleSlot /></div>
      </div>
    </div>
  );
}

/* ── App Shell mobile ─────────────────────────────────── */
function MobileShell({ drawer }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{SH_I.menu}</div>
          <WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}<span className="sh-bell-badge" /></div>
          <span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main">
        <div className="sh-slot">
          <div style={{ marginBottom: 12 }}><WTag>main</WTag></div>
          <div className="wf-sk" style={{ width: 150, height: 20 }} />
          <div className="wf-sk" style={{ width: "85%", height: 11, marginTop: 10 }} />
          <div className="wf-sk" style={{ width: "100%", height: 56, marginTop: 16 }} />
          <div className="wf-sk" style={{ width: "100%", height: 11, marginTop: 16 }} />
          <div className="wf-sk" style={{ width: "70%", height: 11, marginTop: 9 }} />
        </div>
      </div>
      {drawer && (
        <>
          <div className="sh-scrim" />
          <div className="sh-drawer">
            <div className="sh-sidebar-logo"><WLogo /></div>
            <OrgTrigger role="owner" />
            <div className="sh-nav">
              {NAV.map((g) => (
                <div key={g.group}>
                  <div className="sh-group-label">{g.group}</div>
                  <div className="sh-navgroup">
                    {g.items.map((it) => <NavItem key={it.id} item={it} active={it.id === "dash"} />)}
                  </div>
                </div>
              ))}
            </div>
            <div className="sh-drawer-x">{SH_I.x}</div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Org Switcher · popover aberto ────────────────────── */
function OrgPopover({ owner = true }) {
  const orgs = [
    { name: "Ateliê Joana", role: "Dono", active: true },
    { name: "Loja Shopping Norte", role: "Dono" },
    { name: "Quiosque Praia", role: "Gerente" },
  ];
  return (
    <div className="sh-pop wf">
      <div className="sh-pop-search"><WInput placeholder="Buscar organização…" trail={SH_I.search} /></div>
      <div className="sh-pop-label">Minhas organizações</div>
      {orgs.map((o) => (
        <div key={o.name} className={["sh-pop-item", o.active ? "is-active" : ""].join(" ")}>
          <span className="sh-org-avatar" style={{ width: 26, height: 26, fontSize: 11 }}>{o.name[0]}</span>
          <span style={{ minWidth: 0 }}>
            <span className="sh-pop-name" style={{ display: "block" }}>{o.name}</span>
            <span className="sh-pop-sub">{o.role}</span>
          </span>
          {o.active && <span className="sh-pop-ck">{SH_I.check}</span>}
        </div>
      ))}
      {owner && <>
        <div className="sh-pop-sep" />
        <div className="sh-pop-item">
          <span className="sh-ico sh-pop-create">{SH_I.plus}</span>
          <span className="sh-pop-name sh-pop-create">Criar organização</span>
          <span className="wf-tag" style={{ marginLeft: "auto" }}>Owner</span>
        </div>
      </>}
    </div>
  );
}

/* ── Dialog: criar organização (1.3) ──────────────────── */
function CreateOrgDialog({ replicate }) {
  return (
    <div className="wf-card" style={{ maxWidth: 460 }}>
      <h2 className="wf-h2">Nova organização</h2>
      <p className="wf-sub">Crie outra unidade sem sair do contexto atual.</p>
      <WField label="Nome fantasia"><WInput placeholder="Ex: Loja Shopping Norte" value={replicate ? "Loja Shopping Norte" : ""} /></WField>
      <WField label="Documento (CPF ou CNPJ)"><WInput placeholder="00.000.000/0000-00" value={replicate ? "12.345.678/0001-90" : ""} mono /></WField>
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--wf-line-soft)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="wf-label" style={{ margin: 0 }}>Copiar configurações de outra unidade</span>
          <WSwitch on={replicate} />
        </div>
        {replicate && <div style={{ marginTop: 12 }}>
          <WField label="Organização de origem"><WSelect value="Ateliê Joana" /></WField>
          <div style={{ marginTop: 12 }}>
            <WCheckbox checked>Categorias e atributos</WCheckbox>
            <WCheckbox checked>Configurações operacionais</WCheckbox>
            <WCheckbox checked>Configurações visuais de catálogo</WCheckbox>
          </div>
          <WHelper>Estoque, produtos, equipe e pedidos nunca são copiados.</WHelper>
        </div>}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
        <div style={{ flex: 1 }}><WBtn variant="outline">Cancelar</WBtn></div>
        <div style={{ flex: 1 }}><WBtn>Criar organização</WBtn></div>
      </div>
    </div>
  );
}

/* ── UserNav · trigger horizontal composto ────────────── */
function UserNavTrigger({ name = "Joana Ribeiro", org = "Ateliê Joana", initials = "JR", full }) {
  return (
    <div className="sh-usernav" style={full ? { width: "100%" } : null}>
      <span className="sh-avatar">{initials}</span>
      <span className="sh-usernav-meta">
        <span className="sh-usernav-name">{name}</span>
        <span className="sh-usernav-org">{org}</span>
      </span>
    </div>
  );
}

/* ── UserNav dropdown ─────────────────────────────────── */
function UserNavMenu({ width = 156 }) {
  return (
    <div className="sh-pop wf" style={{ width }}>
      <div className="sh-un-head" style={{ display: "block" }}>
        <span className="sh-un-name" style={{ display: "block" }}>Joana Ribeiro</span>
        <span className="sh-un-mail">joana@email.com</span>
      </div>
      <div style={{ padding: "4px 0" }}>
        <div className="sh-un-item"><span className="sh-ico">{SH_I.image}</span>Alterar avatar</div>
        <div className="sh-un-item"><span className="sh-ico">{SH_I.lock}</span>Alterar senha</div>
        <div className="sh-pop-sep" />
        <div className="sh-un-item is-danger"><span className="sh-ico">{SH_I.logout}</span>Sair do sistema</div>
      </div>
    </div>
  );
}

/* ── Dialog: alterar avatar ───────────────────────────── */
function AvatarDialog({ state = "select" }) {
  const head = (
    <>
      <h2 className="wf-h2">Alterar Foto de Perfil</h2>
      <p className="wf-sub">Faça o upload de uma nova imagem para seu perfil.</p>
    </>
  );

  // Estado 1 — Seleção (max-w-sm)
  if (state === "select") {
    return (
      <div className="wf-card" style={{ maxWidth: 360 }}>
        {head}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, margin: "24px 0 14px" }}>
          <span className="sh-avatar-xl">JR</span>
          <div style={{ width: 200 }}><WBtn variant="outline"><span style={{ display: "inline-flex" }}>{SH_I.upload}</span>Carregar foto</WBtn></div>
          <p className="wf-helper" style={{ margin: 0, textAlign: "center" }}>Suporta JPG, PNG e WEBP até 5MB.</p>
        </div>
        <hr className="wf-divider" />
        <WBtn variant="outline">Cancelar</WBtn>
      </div>
    );
  }

  // Estado 2 — Recorte (max-w-lg) · também usado em "saving"
  const saving = state === "saving";
  return (
    <div className="wf-card" style={{ maxWidth: 500 }}>
      {head}
      <div className="sh-crop" style={{ marginTop: 18, opacity: saving ? 0.6 : 1 }}>
        <div className="sh-crop-img" />
        <div className="sh-crop-label">imagem selecionada</div>
        <div className="sh-crop-mask" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
        <span style={{ color: "var(--wf-muted)", display: "flex", flex: "0 0 auto" }}>{SH_I.zoomout}</span>
        <span className="sh-slider"><span className="sh-slider-fill" /><span className="sh-slider-thumb" /></span>
        <span style={{ color: "var(--wf-muted)", display: "flex", flex: "0 0 auto" }}>{SH_I.zoomin}</span>
      </div>
      <p className="wf-helper" style={{ marginTop: 8, textAlign: "center" }}>Arraste e zoom para ajustar a miniatura do perfil.</p>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <div style={{ flex: 1 }}><WBtn variant="outline">Trocar Imagem</WBtn></div>
        <div style={{ flex: 1 }}><WBtn loading={saving}>{saving ? "Salvando…" : "Salvar Avatar"}</WBtn></div>
      </div>
    </div>
  );
}

/* ── Dialog: alterar senha ────────────────────────────── */
function PasswordDialog() {
  const eye = WF_I.eye;
  return (
    <div className="wf-card" style={{ maxWidth: 420 }}>
      <h2 className="wf-h2">Alterar senha</h2>
      <p className="wf-sub">Crie uma senha forte para manter sua conta protegida.</p>
      <WField label="Senha atual"><WInput placeholder="••••••••" trail={eye} /></WField>
      <WField label="Nova senha">
        <WInput placeholder="••••••••" trail={eye} />
        <WHelper>Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.</WHelper>
      </WField>
      <WField label="Confirmar nova senha"><WInput placeholder="Digite a senha novamente" trail={eye} /></WField>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <div style={{ flex: 1 }}><WBtn variant="outline">Cancelar</WBtn></div>
        <div style={{ flex: 1 }}><WBtn>Salvar senha</WBtn></div>
      </div>
    </div>
  );
}

/* ── painel de notificações ───────────────────────────── */
function NotifPanel({ empty }) {
  return (
    <div className="sh-pop sh-notif wf">
      <div className="sh-notif-head"><span className="sh-notif-title">Notificações</span>{!empty && <span className="wf-tag">2 novas</span>}</div>
      {empty ? (
        <div className="sh-notif-empty">Sem novidades.</div>
      ) : (
        <>
          <div className="sh-notif-row">
            <span className="sh-notif-dot">{SH_I.orders}</span>
            <span className="sh-notif-body">
              <span className="sh-notif-text">Novo pedido recebido.</span>
              <span className="sh-notif-time">há 2 min</span>
              <span className="sh-notif-link">Ver pedido</span>
            </span>
          </div>
          <div className="sh-notif-row">
            <span className="sh-notif-dot" style={{ color: "var(--wf-err)" }}>{WF_I.alert}</span>
            <span className="sh-notif-body">
              <span className="sh-notif-text">Estoque baixo em 3 produtos.</span>
              <span className="sh-notif-time">há 18 min</span>
              <span className="sh-notif-link">Ver produtos</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Conta e perfil /conta (1.4) ──────────────────────── */
function Conta({ saving }) {
  return (
    <div className="sh-conta">
      <h1 className="wf-h1" style={{ fontSize: 26 }}>Minha conta</h1>
      <div className="sh-profilecard" style={{ marginTop: 18 }}>
        <span className="sh-profile-av">JR</span>
        <span>
          <span className="sh-profile-name" style={{ display: "block" }}>Joana Ribeiro</span>
          <span className="sh-profile-mail">joana@email.com</span>
          <span className="sh-role-badge">{SH_I.user}Dono</span>
        </span>
      </div>
      <div className="sh-section-h">Dados pessoais</div>
      <WField label="Nome"><WInput value="Joana Ribeiro" /></WField>
      <WField label="E-mail"><WInput value="joana@email.com" /></WField>
      <div style={{ marginTop: 18 }}><WBtn loading={saving}>{saving ? "Salvando…" : "Salvar alterações"}</WBtn></div>
      <hr className="wf-divider" />
      <div className="sh-section-h" style={{ marginTop: 0 }}>Acesso</div>
      <div style={{ marginTop: 10 }}><WBtn variant="outline">Sair</WBtn></div>
    </div>
  );
}

/* ── estado global: erro de tela (404 / sessão / falha) ── */
function GlobalState({ icon = "alert", title, text, cta }) {
  return (
    <div style={{ height: "100%", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 340, width: "100%" }}>
        <WFeedback icon={icon} title={title} text={text} />
        {cta && <div style={{ marginTop: 16 }}><WBtn variant="outline">{cta}</WBtn></div>}
      </div>
    </div>
  );
}

/* switch lo-fi (não existe no kit base) */
function WSwitch({ on }) {
  return (
    <span style={{ width: 38, height: 22, borderRadius: 999, background: on ? "var(--wf-ink)" : "var(--wf-line)", position: "relative", flex: "0 0 auto", display: "inline-block" }}>
      <span style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
    </span>
  );
}

window.SH = {
  SH_I, NAV, Sidebar, OrgTrigger, NavItem, Crumb, TopHeader, ModuleSlot,
  AppShell, MobileShell, OrgPopover, CreateOrgDialog,
  UserNavTrigger, UserNavMenu, AvatarDialog, PasswordDialog, NotifPanel,
  Conta, GlobalState, WSwitch,
};
