/* Inventto — Wireframe · Módulo Catálogos (Superfície 2 · 2.5)
   Tela 2.5.1 Lista de catálogos (/catalogos): desktop (tabela) e mobile (cards).
   DropdownMenu de ações por catálogo · Dialog de pré-requisitos de publicação
   (RN066) · Modal 2.5.4 Remover catálogo. Reusa o kit (window.WF_*), a casca
   (window.SH) e classes pd-/mv-. Exporta em window.CAT. */

const { Sidebar, TopHeader, SH_I } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const cic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const CAT_I = {
  plus: cic(<path d="M12 5v14M5 12h14"/>),
  search: cic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  cart: cic(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  globe: cic(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  link: cic(<><path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 17.5l-1 1a4 4 0 0 1-6-6l1-1"/></>),
  more: cic(<><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></>),
  settings: cic(<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></>),
  list: cic(<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>),
  radio: cic(<><circle cx="12" cy="12" r="2.2"/><path d="M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.1 15.9a5 5 0 0 1 0-7.8M15.9 8.1a5 5 0 0 1 0 7.8"/></>),
  radiooff: cic(<><circle cx="12" cy="12" r="2.2"/><path d="M16 8a5 5 0 0 1 0 8M8 16a5 5 0 0 1 0-8M4 4l16 16"/></>),
  copy: cic(<><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></>),
  trash: cic(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/></>),
  chevL: cic(<path d="m15 6-6 6 6 6"/>),
  chevR: cic(<path d="m9 6 6 6-6 6"/>),
  layers: cic(<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  alert: cic(<><path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>),
  check: cic(<path d="M20 6 9 17l-5-5"/>),
  x: cic(<path d="M6 6 18 18M18 6 6 18"/>),
  whats: cic(<><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21Z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5"/></>),
  clock: cic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  arrow: cic(<path d="M5 12h14M13 6l6 6-6 6"/>),
};

/* ── dados de exemplo (org ativa: Ateliê Joana) ────────
   tipo: pdv | online · estado (online): live | off */
const CATALOGS = [
  { id: "c1", name: "Loja do balcão", type: "pdv", items: 48, note: "Vinculado ao PDV" },
  { id: "c2", name: "Vitrine Verão 2026", type: "online", slug: "atelie-joana", state: "live", items: 32 },
  { id: "c3", name: "Outlet & Promoções", type: "online", slug: "outlet-aj", state: "off", items: 15, incomplete: true },
  { id: "c4", name: "Atacado para parceiros", type: "online", slug: "atelie-atacado", state: "off", items: 26 },
];

/* ════ PRIMITIVOS ══════════════════════════════════════ */
function CatTypeBadge({ type }) {
  return type === "pdv"
    ? <span className="ct-typebadge is-pdv">{CAT_I.cart}PDV</span>
    : <span className="ct-typebadge is-online">{CAT_I.globe}Online</span>;
}

function CatStateBadge({ state }) {
  if (!state) return <span className="ct-state-na">—</span>;
  return state === "live"
    ? <span className="ct-statebadge is-live"><span className="ct-dot" />No ar</span>
    : <span className="ct-statebadge is-off"><span className="ct-dot" />Despublicado</span>;
}

function CatNameCell({ c }) {
  return (
    <span className="ct-name">
      <span className={["ct-name-ico", c.type === "pdv" ? "is-pdv" : "is-online"].join(" ")}>
        {c.type === "pdv" ? CAT_I.cart : CAT_I.globe}
      </span>
      <span className="ct-name-meta">
        <span className="ct-name-title">{c.name}</span>
        {c.type === "online"
          ? <span className="ct-name-slug"><span className="ct-slug-pre">inventto.app/</span>{c.slug}</span>
          : <span className="ct-name-slug is-empty">{c.note}</span>}
      </span>
    </span>
  );
}

const CatItems = ({ n }) => <span className="ct-items"><b>{n}</b><span>produtos</span></span>;

/* ── DropdownMenu de ações (Manager/Owner) ────────────── */
function CatActionsMenu({ c }) {
  const isOnline = c.type === "online";
  const isLive = c.state === "live";
  const item = (ico, label, off) => (
    <div className={["pd-menu-item", off ? "is-off" : ""].join(" ")}>
      <span className="pd-mi-ico">{ico}</span>{label}
    </div>
  );
  return (
    <div className="pd-menu wf">
      {item(CAT_I.settings, "Configurar")}
      {item(CAT_I.list, "Curadoria de itens")}
      {isOnline && <>
        <div className="pd-menu-sep" />
        {isLive
          ? item(CAT_I.radiooff, "Despublicar vitrine")
          : item(CAT_I.radio, "Publicar vitrine")}
        {item(CAT_I.copy, "Copiar link da vitrine", !isLive)}
      </>}
      <div className="pd-menu-sep" />
      <div className="pd-menu-item is-danger"><span className="pd-mi-ico">{CAT_I.trash}</span>Remover catálogo</div>
    </div>
  );
}

/* ── linha da tabela ──────────────────────────────────── */
function CatRow({ c, role, menuOpen }) {
  return (
    <tr>
      <td><CatNameCell c={c} /></td>
      <td><CatTypeBadge type={c.type} /></td>
      <td><CatStateBadge state={c.type === "online" ? c.state : null} /></td>
      <td><CatItems n={c.items} /></td>
      {role !== "sales" && (
        <td className="is-right">
          <span className="ct-act-anchor">
            <span className="ct-actbtn">{CAT_I.more}</span>
            {menuOpen && <CatActionsMenu c={c} />}
          </span>
        </td>
      )}
    </tr>
  );
}

/* ── tabela ───────────────────────────────────────────── */
function CatTable({ role, menuFor }) {
  return (
    <div className="pd-tablewrap" style={menuFor ? { overflow: "visible" } : null}>
      <table className="pd-table">
        <thead>
          <tr>
            <th scope="col">Catálogo</th>
            <th scope="col">Tipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Produtos</th>
            {role !== "sales" && <th scope="col" className="is-right">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {CATALOGS.map((c) => <CatRow key={c.id} c={c} role={role} menuOpen={menuFor === c.id} />)}
        </tbody>
      </table>
    </div>
  );
}

function CatHead({ role }) {
  return (
    <div className="ct-headrow">
      <div>
        <h1 className="wf-h1" style={{ fontSize: 27 }}>Catálogos</h1>
        <p className="ct-head-sub">Defina o que você vende e por quanto. Catálogos de balcão (PDV) e vitrines online vivem aqui.</p>
      </div>
      {role !== "sales" && (
        <span className="ct-head-cta"><WBtn><span className="ct-ico">{CAT_I.plus}</span>Criar catálogo</WBtn></span>
      )}
    </div>
  );
}

/* ════ Conteúdo da tela /catalogos (desktop) ════════════
   scenario: base · empty(firstrun) · menu(dropdown aberto) */
function CatList({ scenario = "base", role = "owner", menuFor }) {
  if (scenario === "empty") {
    return (
      <div className="ct-col">
        <CatHead role={role} />
        <div className="pd-tablewrap" style={{ marginTop: 22 }}>
          <div className="pd-empty">
            <div className="pd-empty-ico">{CAT_I.layers}</div>
            <p className="pd-empty-title">Nenhum catálogo ainda.</p>
            <p className="pd-empty-text">Crie um catálogo para definir o que você vende e por quanto.</p>
            {role !== "sales" && <WBtn><span style={{ display: "inline-flex", marginRight: 2 }}>{CAT_I.plus}</span>Criar catálogo</WBtn>}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="ct-col">
      <CatHead role={role} />
      <div style={{ marginTop: 22 }}>
        <CatTable role={role} menuFor={menuFor} />
      </div>
      <div className="pd-tablefoot">
        <span className="pd-count"><b>{CATALOGS.length}</b> catálogos · 2 vitrines online</span>
        <span className="pd-pager">
          <span className="pd-pagebtn is-disabled">{CAT_I.chevL}</span>
          <span className="pd-count" style={{ margin: "0 4px" }}>1 de 1</span>
          <span className="pd-pagebtn is-disabled">{CAT_I.chevR}</span>
        </span>
      </div>
    </div>
  );
}

/* ── shell completa (desktop) ─────────────────────────── */
function CatListShell({ scenario = "base", role = "owner", menuFor, collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "ct-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="catalogos" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Catálogos"]} notif={false} />
        <div className="sh-main" style={{ overflow: menuFor ? "visible" : "auto" }}>
          <CatList scenario={scenario} role={role} menuFor={menuFor} />
        </div>
      </div>
    </div>
  );
}

/* ── skeleton (carregando) ────────────────────────────── */
function CatListLoading() {
  return (
    <div className="ct-col">
      <div className="wf-sk" style={{ width: 160, height: 26 }} />
      <div className="wf-sk" style={{ width: 380, height: 11, marginTop: 11 }} />
      <div className="pd-tablewrap" style={{ marginTop: 24 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px", borderBottom: i < 3 ? "1px solid var(--wf-line-soft)" : "0" }}>
            <span className="wf-sk" style={{ width: 38, height: 38, borderRadius: 9, flex: "0 0 auto" }} />
            <div style={{ flex: 1 }}><div className="wf-sk" style={{ width: 160, height: 12 }} /><div className="wf-sk" style={{ width: 110, height: 9, marginTop: 6 }} /></div>
            <span className="wf-sk" style={{ width: 74, height: 22, borderRadius: 999, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 74, height: 22, borderRadius: 999, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 60, height: 12, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 34, height: 34, borderRadius: 8, flex: "0 0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════ Dialog de pré-requisitos de publicação (RN066) ═══ */
function PrereqDialog() {
  return (
    <div className="ct-prereq wf">
      <div className="ct-prereq-head">
        <span className="ct-prereq-icon">{CAT_I.alert}</span>
        <div>
          <h2 className="ct-prereq-title">Falta pouco para publicar</h2>
          <p className="ct-prereq-lead">Para publicar <b>Outlet &amp; Promoções</b>, complete os itens abaixo. Eles garantem que o cliente consiga comprar e falar com você.</p>
        </div>
      </div>
      <div className="ct-prereq-body">
        <div className="ct-prereq-item">
          <span className="ct-prereq-bullet is-missing">{CAT_I.x}</span>
          <span className="ct-prereq-text">
            <span className="ct-prereq-name">WhatsApp de contato</span>
            <span className="ct-prereq-meta">Onde os pedidos e contatos chegam.</span>
          </span>
          <span className="ct-prereq-link">Adicionar {CAT_I.arrow}</span>
        </div>
        <div className="ct-prereq-item">
          <span className="ct-prereq-bullet is-missing">{CAT_I.x}</span>
          <span className="ct-prereq-text">
            <span className="ct-prereq-name">Fuso horário e horários de atendimento</span>
            <span className="ct-prereq-meta">Definidos em Organização.</span>
          </span>
          <span className="ct-prereq-link">Configurar {CAT_I.arrow}</span>
        </div>
        <div className="ct-prereq-item">
          <span className="ct-prereq-bullet is-ok">{CAT_I.check}</span>
          <span className="ct-prereq-text">
            <span className="ct-prereq-name">Pelo menos 1 produto com preço</span>
            <span className="ct-prereq-meta">15 produtos prontos.</span>
          </span>
        </div>
      </div>
      <div className="ct-prereq-foot">
        <div><WBtn variant="outline">Agora não</WBtn></div>
        <div><WBtn>Completar pendências</WBtn></div>
      </div>
    </div>
  );
}

/* ════ Modal 2.5.4 — Remover catálogo ══════════════════
   variant: "online" (slug em quarentena) | "pdv" */
function RemoveDialog({ variant = "online", state = "idle" }) {
  const isOnline = variant === "online";
  const saving = state === "saving";
  return (
    <div className="pd-dialog wf">
      <div className="pd-dialog-icon" style={{ color: "var(--wf-err)", background: "var(--wf-err-bg)", borderColor: "rgba(176,82,74,.4)" }}>{CAT_I.trash}</div>
      <h2 className="pd-dialog-title">Remover {isOnline ? "Outlet & Promoções" : "Loja do balcão"}?</h2>
      <p className="pd-dialog-lead">
        Esta ação não pode ser desfeita.
        {isOnline && <> O endereço <span style={{ fontFamily: "var(--wf-mono)", color: "var(--wf-body)" }}>inventto.app/outlet-aj</span> ficará reservado por 30 dias.</>}
      </p>
      <div className="pd-dialog-foot">
        <div><WBtn variant="outline">Cancelar</WBtn></div>
        <div><WBtn variant="destructive" loading={saving}>{saving ? "Removendo…" : "Remover"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function CatMobileCard({ c, role }) {
  return (
    <div className="ct-mcard">
      <div className="ct-mcard-top">
        <span className={["ct-name-ico", c.type === "pdv" ? "is-pdv" : "is-online"].join(" ")} style={{ width: 34, height: 34 }}>
          {c.type === "pdv" ? CAT_I.cart : CAT_I.globe}
        </span>
        <span className="ct-mcard-meta">
          <span className="ct-mcard-name">{c.name}</span>
          {c.type === "online"
            ? <span className="ct-mcard-slug">inventto.app/{c.slug}</span>
            : <span className="ct-mcard-slug" style={{ fontFamily: "var(--wf-sans)", fontStyle: "italic", color: "var(--wf-faint)" }}>{c.note}</span>}
        </span>
        {role !== "sales" && <span className="ct-mcard-more">{CAT_I.more}</span>}
      </div>
      <div className="ct-mcard-foot">
        <CatTypeBadge type={c.type} />
        {c.type === "online" && <CatStateBadge state={c.state} />}
        <CatItems n={c.items} />
      </div>
    </div>
  );
}

function CatListMobile({ role = "owner" }) {
  return (
    <div className="wf sh-mobile">
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 22 }}>Catálogos</h1>
          {role !== "sales" && <span className="ct-iconcta" aria-label="Criar catálogo">{CAT_I.plus}</span>}
        </div>
        <div className="ct-mcards">
          {CATALOGS.map((c) => <CatMobileCard key={c.id} c={c} role={role} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  CAT: {
    CAT_I, CATALOGS,
    CatTypeBadge, CatStateBadge, CatNameCell, CatItems, CatActionsMenu,
    CatRow, CatTable, CatHead, CatList, CatListShell, CatListLoading,
    PrereqDialog, RemoveDialog, CatMobileCard, CatListMobile,
  },
});
