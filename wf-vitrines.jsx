/* Inventto — Wireframe · Módulo Vitrines / Storefronts (Superfície 2 · 2.7)
   Tela 2.7.1 Lista de storefronts (/storefronts): desktop (tabela) e mobile
   (cards). O storefront é o CANAL de venda online — aponta para um catálogo e
   carrega slug, tema, WhatsApp e comportamento. Aqui se cria, publica,
   despublica, copia link e remove (RF028 · RN075). DropdownMenu de ações
   condicionado ao estado (No ar / Inativa), Dialog de pré-requisitos de
   publicação (RN075) e Modal de remoção. Owner e Manager (Sales sem acesso).
   Reusa o kit (window.WF_*), a casca (window.SH) e classes pd-/mv-. Exporta
   em window.VT. */

const { Sidebar, TopHeader, SH_I } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const vic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const VT_I = {
  plus: vic(<path d="M12 5v14M5 12h14"/>),
  search: vic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  globe: vic(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  more: vic(<><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></>),
  settings: vic(<><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.7 2.7 1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2 2 2 0 1 1-2.7-2.7 1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1 2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9 2 2 0 1 1 2.7-2.7 1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5 2 2 0 1 1 4 0 1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3 2 2 0 1 1 2.7 2.7 1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1 2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.5 1Z"/></>),
  radio: vic(<><circle cx="12" cy="12" r="2"/><path d="M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2"/></>),
  radiooff: vic(<><path d="M16.2 7.8a6 6 0 0 1 .8 8M19.1 4.9a10 10 0 0 1 1.5 12M2 2l20 20M4.9 4.9a10 10 0 0 0-.5 13.4M7.9 7.9a6 6 0 0 0-.3 7.7"/></>),
  copy: vic(<><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>),
  trash: vic(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/></>),
  chevL: vic(<path d="m15 6-6 6 6 6"/>),
  chevR: vic(<path d="m9 6 6 6-6 6"/>),
  store: vic(<><path d="M3 9 4.5 4h15L21 9M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M3 9h18"/></>),
  layers: vic(<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  check: vic(<path d="M20 6 9 17l-5-5"/>),
  link: vic(<><path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 17.5l-1 1a4 4 0 0 1-6-6l1-1"/></>),
  alertc: vic(<><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></>),
  arrow: vic(<path d="M5 12h14M13 6l6 6-6 6"/>),
  whats: vic(<><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/></>),
  clock: vic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
};

/* ── dados de exemplo (org ativa: Ateliê Joana) ────────
   storefront = canal online: aponta para 1 catálogo + slug/tema/contato. */
const STOREFRONTS = [
  { id: "s1", name: "Vitrine Ateliê Joana", slug: "atelie-joana", state: "live", catalog: "Coleção Verão 2026" },
  { id: "s2", name: "Atacado para parceiros", slug: "atacado-joana", state: "live", catalog: "Atacado para parceiros" },
  { id: "s3", name: "Outlet de Inverno", slug: "outlet-inverno", state: "inactive", catalog: "Outlet & Promoções" },
  { id: "s4", name: "Loja de Natal", slug: null, state: "inactive", catalog: null },
];

/* ════ PRIMITIVOS ══════════════════════════════════════ */
function VtNameCell({ s }) {
  return (
    <span className="vt-name">
      <span className="vt-name-ico">{VT_I.store}</span>
      <span className="vt-name-meta">
        <span className="vt-name-title">{s.name}</span>
        <span className={["vt-name-slug", s.slug ? "" : "is-empty"].join(" ")}>{s.slug ? `inventto.app/${s.slug}` : "sem endereço"}</span>
      </span>
    </span>
  );
}

const VtBadge = ({ state }) => (
  state === "live"
    ? <span className="vt-badge is-live"><span className="vt-live-dot" />No ar</span>
    : <span className="vt-badge is-inactive">Inativa</span>
);

function VtCatCell({ catalog }) {
  if (!catalog) return <span className="vt-cat-empty">Nenhum</span>;
  return <span className="vt-cat-cell"><span className="vt-cat-ico">{VT_I.layers}</span>{catalog}</span>;
}

/* DropdownMenu de ações — itens condicionados ao estado (RF028) */
function VtRowMenu({ state = "live" }) {
  return (
    <div className="pd-menu wf">
      <div className="pd-menu-item"><span className="pd-mi-ico">{VT_I.settings}</span>Configurar</div>
      {state === "live" ? (
        <>
          <div className="pd-menu-item"><span className="pd-mi-ico">{VT_I.radiooff}</span>Despublicar</div>
          <div className="pd-menu-item"><span className="pd-mi-ico">{VT_I.copy}</span>Copiar link</div>
        </>
      ) : (
        <div className="pd-menu-item"><span className="pd-mi-ico">{VT_I.radio}</span>Publicar</div>
      )}
      <div className="pd-menu-sep" />
      <div className="pd-menu-item is-danger"><span className="pd-mi-ico">{VT_I.trash}</span>Remover vitrine</div>
    </div>
  );
}

/* ── linha da tabela ──────────────────────────────────── */
function VtRow({ s, openMenu }) {
  return (
    <tr>
      <td><VtNameCell s={s} /></td>
      <td><VtCatCell catalog={s.catalog} /></td>
      <td><VtBadge state={s.state} /></td>
      <td className="is-right">
        <span className="vt-act-anchor">
          <span className="vt-actbtn" aria-label="Ações da vitrine">{VT_I.more}</span>
          {openMenu === s.id && <VtRowMenu state={s.state} />}
        </span>
      </td>
    </tr>
  );
}

function VtTable({ openMenu }) {
  return (
    <div className="pd-tablewrap">
      <table className="pd-table">
        <thead>
          <tr>
            <th scope="col">Vitrine</th>
            <th scope="col">Catálogo</th>
            <th scope="col">Estado</th>
            <th scope="col" className="is-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {STOREFRONTS.map((s) => <VtRow key={s.id} s={s} openMenu={openMenu} />)}
        </tbody>
      </table>
    </div>
  );
}

function VtHead() {
  return (
    <div className="vt-head">
      <div className="vt-head-texts">
        <h1 className="wf-h1" style={{ fontSize: 27 }}>Vitrines</h1>
        <p className="vt-head-sub">Suas lojas online. Cada vitrine aponta para um catálogo e vende pelo link.</p>
      </div>
      <div className="vt-head-ctarow">
        <span className="vt-head-search"><WInput placeholder="Buscar vitrine por nome" trail={VT_I.search} /></span>
        <span className="vt-head-cta"><WBtn><span className="vt-ico">{VT_I.plus}</span>Criar vitrine</WBtn></span>
      </div>
    </div>
  );
}

/* ════ Conteúdo da tela /storefronts (desktop) ══════════
   scenario: base · empty(firstrun) · openMenu(id) p/ DropdownMenu aberto */
function VtList({ scenario = "base", openMenu }) {
  if (scenario === "empty") {
    return (
      <div className="vt-col">
        <VtHead />
        <div className="pd-tablewrap" style={{ marginTop: 22 }}>
          <div className="pd-empty">
            <div className="pd-empty-ico">{VT_I.store}</div>
            <p className="pd-empty-title">Nenhuma vitrine ainda.</p>
            <p className="pd-empty-text">Crie uma vitrine para vender online pelo link.</p>
            <WBtn><span style={{ display: "inline-flex", marginRight: 2 }}>{VT_I.plus}</span>Criar vitrine</WBtn>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="vt-col">
      <VtHead />
      <div style={{ marginTop: 22 }}>
        <VtTable openMenu={openMenu} />
      </div>
      <div className="pd-tablefoot">
        <span className="pd-count"><b>{STOREFRONTS.length}</b> vitrines</span>
        <span className="pd-pager">
          <span className="pd-pagebtn is-disabled">{VT_I.chevL}</span>
          <span className="pd-count" style={{ margin: "0 4px" }}>1 de 1</span>
          <span className="pd-pagebtn is-disabled">{VT_I.chevR}</span>
        </span>
      </div>
    </div>
  );
}

/* ── shell completa (desktop) ─────────────────────────── */
function VtListShell({ scenario = "base", collapsed, openMenu }) {
  return (
    <div className={["wf sh-app", collapsed ? "vt-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role="owner" active="vitrines" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Vitrines"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <VtList scenario={scenario} openMenu={openMenu} />
        </div>
      </div>
    </div>
  );
}

/* ── skeleton (carregando) ────────────────────────────── */
function VtListLoading() {
  return (
    <div className="vt-col">
      <div className="wf-sk" style={{ width: 140, height: 26 }} />
      <div className="wf-sk" style={{ width: 360, height: 11, marginTop: 11 }} />
      <div className="pd-tablewrap" style={{ marginTop: 24 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px", borderBottom: i < 3 ? "1px solid var(--wf-line-soft)" : "0" }}>
            <span className="wf-sk" style={{ width: 38, height: 38, borderRadius: 9, flex: "0 0 auto" }} />
            <div style={{ flex: 1 }}><div className="wf-sk" style={{ width: 170, height: 12 }} /><div className="wf-sk" style={{ width: 110, height: 9, marginTop: 7 }} /></div>
            <span className="wf-sk" style={{ width: 110, height: 12, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 58, height: 22, borderRadius: 999, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 34, height: 34, borderRadius: 8, flex: "0 0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════ Dialog de pré-requisitos de publicação (RN075) ═══
   Falta catálogo / WhatsApp / timezone+horários → lista o que falta com
   atalhos. props: done = array de chaves já cumpridas. */
const PREREQS = [
  { key: "catalog", title: "Vincule um catálogo", sub: "Os produtos e preços vêm do catálogo." },
  { key: "whats", title: "Informe o WhatsApp", sub: "Canal que recebe os pedidos da vitrine." },
  { key: "hours", title: "Defina fuso e horários", sub: "Controla o status de aberto/fechado." },
];
function PublishDialog({ done = ["catalog"] }) {
  return (
    <div className="vt-prereq wf">
      <div className="vt-prereq-icon">{VT_I.alertc}</div>
      <h2 className="vt-prereq-title">Quase lá para publicar</h2>
      <p className="vt-prereq-lead">Para publicar <b>Loja de Natal</b>, ainda falta:</p>
      <div className="vt-prereq-list">
        {PREREQS.map((p) => {
          const ok = done.includes(p.key);
          return (
            <a key={p.key} className={["vt-prereq-row", ok ? "is-done" : ""].join(" ")} href="#" onClick={(e) => e.preventDefault()}>
              <span className={["vt-prereq-mk", ok ? "is-done" : ""].join(" ")}>{ok ? VT_I.check : (p.key === "whats" ? VT_I.whats : p.key === "hours" ? VT_I.clock : VT_I.layers)}</span>
              <span className="vt-prereq-rowmeta">
                <span className="vt-prereq-rowtitle">{p.title}</span>
                <span className="vt-prereq-rowsub">{p.sub}</span>
              </span>
              {!ok && <span className="vt-prereq-arrow">{VT_I.arrow}</span>}
            </a>
          );
        })}
      </div>
      <div className="vt-prereq-foot">
        <div><WBtn variant="outline">Agora não</WBtn></div>
        <div><WBtn>Completar configuração</WBtn></div>
      </div>
    </div>
  );
}

/* ════ Modal — Remover vitrine ═════════════════════════
   state: "idle" (campo vazio · botão off) · "confirmed" · "saving" */
function RemoveStorefrontDialog({ storefront, state = "idle" }) {
  const s = storefront || STOREFRONTS[2];
  const saving = state === "saving";
  const confirmed = state === "confirmed" || saving;
  return (
    <div className="pd-dialog wf" style={{ textAlign: "left", maxWidth: 400 }}>
      <div className="pd-dialog-icon" style={{ color: "var(--wf-err)", background: "var(--wf-err-bg)", borderColor: "rgba(176,82,74,.4)", margin: "0 0 14px" }}>{VT_I.trash}</div>
      <h2 className="pd-dialog-title" style={{ textAlign: "left" }}>Remover {s.name}?</h2>
      <p className="pd-dialog-lead" style={{ textAlign: "left", marginBottom: 16 }}>A vitrine sai do ar e o link <b>inventto.app/{s.slug}</b> deixa de funcionar. O catálogo e os produtos não são afetados.</p>
      <div style={{ marginBottom: 20 }}>
        <WInput value={confirmed ? s.name : ""} placeholder="Digite o nome da vitrine para confirmar" />
      </div>
      <div className="pd-dialog-foot">
        <div><WBtn variant="outline">Cancelar</WBtn></div>
        <div><WBtn variant="destructive" disabled={!confirmed} loading={saving}>{saving ? "Removendo…" : "Remover vitrine"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function VtMobileCard({ s, menu }) {
  return (
    <div className="vt-mcard">
      <div className="vt-mcard-top">
        <span className="vt-mcard-meta">
          <span className="vt-mcard-name">{s.name}</span>
          <span className="vt-mcard-slug">{s.slug ? `inventto.app/${s.slug}` : "sem endereço"}</span>
        </span>
        <span className="vt-actbtn" aria-label="Ações da vitrine">{VT_I.more}</span>
      </div>
      <div className="vt-mcard-foot">
        <VtBadge state={s.state} />
        <span className="vt-mcard-cat">{s.catalog ? <>{VT_I.layers}{s.catalog}</> : "Sem catálogo"}</span>
      </div>
    </div>
  );
}

function VtListMobile({ scenario = "base" }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div className="vt-head-texts">
            <h1 className="wf-h1" style={{ fontSize: 22 }}>Vitrines</h1>
            <p className="vt-head-sub">Suas lojas online. Cada vitrine vende pelo link.</p>
          </div>
          <span className="vt-iconcta" aria-label="Criar vitrine">{VT_I.plus}</span>
        </div>
        <div className="vt-mob-search"><WInput placeholder="Buscar vitrine por nome" trail={VT_I.search} /></div>
        <div className="vt-mcards">
          {STOREFRONTS.map((s) => <VtMobileCard key={s.id} s={s} />)}
        </div>
      </div>
    </div>
  );
}

/* mobile · bottom sheet de ações sobre a lista */
function VtActionsMobile({ state = "live" }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><VtListMobile /></div>
      <div className="mv-sheet-scrim" />
      <div className="vt-msheet">
        <div className="vt-msheet-grab" />
        <div className="vt-msheet-title">{state === "live" ? "Vitrine Ateliê Joana · No ar" : "Outlet de Inverno · Inativa"}</div>
        <VtRowMenu state={state} />
      </div>
    </div>
  );
}

/* mobile · dialog Publicar (pré-requisitos) sobre a lista */
function PublishMobile({ done }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><VtListMobile /></div>
      <div className="vt-scrim"><PublishDialog done={done} /></div>
    </div>
  );
}

/* mobile · dialog Remover sobre a lista */
function RemoveStorefrontMobile({ state }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><VtListMobile /></div>
      <div className="vt-scrim"><RemoveStorefrontDialog state={state} /></div>
    </div>
  );
}

Object.assign(window, {
  VT: {
    VT_I, STOREFRONTS,
    VtNameCell, VtBadge, VtCatCell, VtRowMenu, VtRow, VtTable, VtHead,
    VtList, VtListShell, VtListLoading,
    PREREQS, PublishDialog, RemoveStorefrontDialog,
    VtMobileCard, VtListMobile, VtActionsMobile, PublishMobile, RemoveStorefrontMobile,
  },
});
