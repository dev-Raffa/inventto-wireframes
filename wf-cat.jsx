/* Inventto — Wireframe · Módulo Catálogos (Superfície 2 · 2.5)
   Tela 2.5.1 Lista de catálogos (/catalogos): desktop (tabela) e mobile (cards).
   O catálogo é CANAL-AGNÓSTICO — não tem tipo nem estado de publicação. São os
   canais (PDV e storefronts) que escolhem qual catálogo usar. A lista mostra
   contadores de Produtos e de Canais vinculados, DropdownMenu de ações
   (Editar · Curadoria · Remover) e o Modal 2.5.4 (variantes A e B · RN061).
   Reusa o kit (window.WF_*), a casca (window.SH) e classes pd-/mv-. Exporta
   em window.CAT. */

const { Sidebar, TopHeader, SH_I } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.7 stroke) ───────────── */
const cic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const CAT_I = {
  plus: cic(<path d="M12 5v14M5 12h14"/>),
  search: cic(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  cart: cic(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  globe: cic(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  more: cic(<><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></>),
  pencil: cic(<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></>),
  package: cic(<><path d="m7.5 4.3 9 5.2"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>),
  list: cic(<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>),
  trash: cic(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/></>),
  chevL: cic(<path d="m15 6-6 6 6 6"/>),
  chevR: cic(<path d="m9 6 6 6-6 6"/>),
  layers: cic(<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  link: cic(<><path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 17.5l-1 1a4 4 0 0 1-6-6l1-1"/></>),
  alertc: cic(<><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></>),
  arrow: cic(<path d="M5 12h14M13 6l6 6-6 6"/>),
};

/* ── dados de exemplo (org ativa: Ateliê Joana) ────────
   Catálogo = nome + curadoria de itens. `channels` lista os canais (PDV e
   storefronts) que usam o catálogo — read-only aqui; quem vincula é o canal. */
const CATALOGS = [
  { id: "c1", name: "Coleção Verão 2026", items: 32, channels: [
    { type: "storefront", name: "Vitrine Ateliê Joana" },
    { type: "pdv", name: "PDV · Loja Centro" },
  ] },
  { id: "c2", name: "Loja do balcão", items: 48, channels: [
    { type: "pdv", name: "PDV · Loja Centro" },
  ] },
  { id: "c3", name: "Outlet & Promoções", items: 15, channels: [] },
  { id: "c4", name: "Atacado para parceiros", items: 26, channels: [
    { type: "storefront", name: "Vitrine Atacado" },
  ] },
];

/* ════ PRIMITIVOS ══════════════════════════════════════ */
function CatNameCell({ c }) {
  return (
    <span className="ct-name">
      <span className="ct-name-meta">
        <span className="ct-name-title">{c.name}</span>
      </span>
    </span>
  );
}

/* Produtos: Badge com ícone Package + total, link p/ /catalogos/:id/produtos */
const CatItems = ({ n }) => (
  <a className="ct-items-badge" href="#" onClick={(e) => e.preventDefault()}>
    <span className="ct-items-ico">{CAT_I.package}</span><b>{n}</b><span>produtos</span>
  </a>
);

/* contador de canais vinculados (read-only) */
function CatChannels({ channels }) {
  if (!channels || channels.length === 0) return <span className="ct-chan-empty">Nenhum</span>;
  return <span className="ct-chan-count"><b>{channels.length}</b><span>{channels.length === 1 ? "canal" : "canais"}</span></span>;
}

/* ── ações inline (Manager/Owner): Editar (Sheet) · Remover (Dialog) ── */
function CatRowActions() {
  return (
    <span className="ct-rowactions">
      <span className="ct-iconact" aria-label="Editar catálogo">{CAT_I.pencil}</span>
      <span className="ct-iconact is-danger" aria-label="Remover catálogo">{CAT_I.trash}</span>
    </span>
  );
}

/* ── linha da tabela ──────────────────────────────────── */
function CatRow({ c, role }) {
  return (
    <tr>
      <td><CatNameCell c={c} /></td>
      <td><CatItems n={c.items} /></td>
      <td><CatChannels channels={c.channels} /></td>
      {role !== "sales" && (
        <td className="is-right"><CatRowActions /></td>
      )}
    </tr>
  );
}

/* ── tabela ───────────────────────────────────────────── */
function CatTable({ role }) {
  return (
    <div className="pd-tablewrap">
      <table className="pd-table">
        <thead>
          <tr>
            <th scope="col">Catálogo</th>
            <th scope="col">Produtos</th>
            <th scope="col">Canais vinculados</th>
            {role !== "sales" && <th scope="col" className="is-right">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {CATALOGS.map((c) => <CatRow key={c.id} c={c} role={role} />)}
        </tbody>
      </table>
    </div>
  );
}

function CatHead({ role }) {
  return (
    <div className="ct-head">
      <div className="ct-head-texts">
        <h1 className="wf-h1" style={{ fontSize: 27 }}>Catálogos</h1>
        <p className="ct-head-sub">Defina o que você vende e por quanto. Cada canal — PDV ou vitrine — escolhe qual catálogo usar.</p>
      </div>
      <div className="ct-head-ctarow">
        <span className="ct-head-search"><WInput placeholder="Buscar catálogo por nome" trail={CAT_I.search} /></span>
        {role !== "sales" && (
          <span className="ct-head-cta"><WBtn><span className="ct-ico">{CAT_I.plus}</span>Criar catálogo</WBtn></span>
        )}
      </div>
    </div>
  );
}

/* ════ Conteúdo da tela /catalogos (desktop) ════════════
   scenario: base · empty(firstrun) */
function CatList({ scenario = "base", role = "owner" }) {
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
        <CatTable role={role} />
      </div>
      <div className="pd-tablefoot">
        <span className="pd-count"><b>{CATALOGS.length}</b> catálogos</span>
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
function CatListShell({ scenario = "base", role = "owner", collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "ct-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="catalogos" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Catálogos"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <CatList scenario={scenario} role={role} />
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
            <div style={{ flex: 1 }}><div className="wf-sk" style={{ width: 180, height: 12 }} /></div>
            <span className="wf-sk" style={{ width: 70, height: 12, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 70, height: 12, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 34, height: 34, borderRadius: 8, flex: "0 0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════ Dialog 2.5.5 — Remover catálogo (RN061) ══════════
   variant "A": sem canais vinculados → remoção permitida, confirmada por
   digitação do nome (Remover habilita só no match exato).
   variant "B": com canais vinculados → remoção bloqueada (lista + links).
   state (A): "idle" (campo vazio · botão off) · "confirmed" (nome digitado ·
   botão on) · "saving" (Removendo…) */
function RemoveDialog({ variant = "A", catalog, state = "idle" }) {
  const c = catalog || (variant === "B" ? CATALOGS[0] : CATALOGS[2]);
  const saving = state === "saving";
  const confirmed = state === "confirmed" || saving;

  if (variant === "B") {
    const n = c.channels.length;
    return (
      <div className="pd-dialog wf">
        <div className="pd-dialog-icon" style={{ color: "var(--pd-warning)", background: "var(--pd-warning-bg2)", borderColor: "rgba(154,123,63,.4)" }}>{CAT_I.alertc}</div>
        <h2 className="pd-dialog-title">Não é possível remover {c.name}</h2>
        <p className="pd-dialog-lead">Este catálogo está sendo usado por {n} canal{n > 1 ? "is" : ""}. Desvincule-os antes de remover.</p>
        <div className="ct-rm-channels">
          {c.channels.map((ch, i) => (
            <a key={i} className="ct-rm-chan" href="#" onClick={(e) => e.preventDefault()}>
              <span className="ct-rm-chan-ico">{ch.type === "pdv" ? CAT_I.cart : CAT_I.globe}</span>
              <span className="ct-rm-chan-name">{ch.name}</span>
              <span className="ct-rm-chan-arrow">{CAT_I.arrow}</span>
            </a>
          ))}
        </div>
        <div className="pd-dialog-foot">
          <div style={{ flex: 1 }}><WBtn full>Entendi</WBtn></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-dialog wf">
      <div className="pd-dialog-icon" style={{ color: "var(--wf-err)", background: "var(--wf-err-bg)", borderColor: "rgba(176,82,74,.4)" }}>{CAT_I.trash}</div>
      <h2 className="pd-dialog-title">Remover {c.name}?</h2>
      <p className="pd-dialog-lead">Esta ação não pode ser desfeita. Pedidos que referenciam este catálogo preservam o histórico.</p>
      <div className="ct-rm-confirm">
        <WInput value={confirmed ? c.name : ""} placeholder="Digite o nome do catálogo para confirmar" />
      </div>
      <div className="pd-dialog-foot">
        <div><WBtn variant="outline">Cancelar</WBtn></div>
        <div><WBtn variant="destructive" disabled={!confirmed} loading={saving}>{saving ? "Removendo…" : "Remover"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ Dialog 2.5.2 — Criar catálogo (sobre /catalogos) ══
   Campo único (Nome, obrigatório). Manager e Owner. Ao criar →
   fecha → redireciona para /catalogos/:id/produtos (sem toast).
   state: "idle" | "filled" | "error" | "saving" (Criando… + botão desabilitado) */
function CreateCatalogDialog({ state = "idle" }) {
  const saving = state === "saving";
  const err = state === "error";
  const value = (state === "filled" || saving) ? "Coleção Verão 2026" : "";
  return (
    <div className="pd-dialog ct-cdialog wf">
      <h2 className="pd-dialog-title">Novo catálogo</h2>
      <div className="ct-cdialog-body">
        <WField label="Nome do catálogo">
          <WInput value={value} placeholder="ex.: Coleção Verão 2026" error={err} />
          {err
            ? <WError>Informe um nome para o catálogo.</WError>
            : <WHelper>Um nome interno para você organizar. Os canais escolhem qual catálogo usar.</WHelper>}
        </WField>
      </div>
      <div className="pd-dialog-foot">
        <div><WBtn variant="outline">Cancelar</WBtn></div>
        <div><WBtn loading={saving}>{saving ? "Criando…" : "Criar catálogo"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function CatMobileCard({ c, role }) {
  const n = c.channels.length;
  return (
    <div className="ct-mcard">
      <div className="ct-mcard-top">
        <span className="ct-mcard-meta">
          <span className="ct-mcard-name">{c.name}</span>
        </span>
        {role !== "sales" && (
          <span className="ct-mcard-actions">
            <span className="ct-iconact" aria-label="Editar catálogo">{CAT_I.pencil}</span>
            <span className="ct-iconact is-danger" aria-label="Remover catálogo">{CAT_I.trash}</span>
          </span>
        )}
      </div>
      <div className="ct-mcard-stats">
        <a className="ct-items-badge" href="#" onClick={(e) => e.preventDefault()}>
          <span className="ct-items-ico">{CAT_I.package}</span><b>{c.items}</b><span>produtos</span>
        </a>
        <span className="ct-mcard-chan">{n === 0 ? "Nenhum canal" : `${n} ${n === 1 ? "canal vinculado" : "canais vinculados"}`}</span>
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div className="ct-head-texts">
            <h1 className="wf-h1" style={{ fontSize: 22 }}>Catálogos</h1>
            <p className="ct-head-sub">Defina o que você vende e por quanto. Cada canal escolhe qual catálogo usar.</p>
          </div>
          {role !== "sales" && <span className="ct-iconcta" aria-label="Criar catálogo">{CAT_I.plus}</span>}
        </div>
        <div className="ct-mob-search"><WInput placeholder="Buscar catálogo por nome" trail={CAT_I.search} /></div>
        <div className="ct-mcards">
          {CATALOGS.map((c) => <CatMobileCard key={c.id} c={c} role={role} />)}
        </div>
      </div>
    </div>
  );
}

/* mobile · dialog Criar catálogo (centrado sobre a lista) */
function CreateCatalogMobile({ state }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><CatListMobile /></div>
      <div className="ct-scrim"><CreateCatalogDialog state={state} /></div>
    </div>
  );
}

/* mobile · dialog Remover (centrado sobre a lista) */
function RemoveCatalogMobile({ variant = "A", state }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><CatListMobile /></div>
      <div className="ct-scrim"><RemoveDialog variant={variant} state={state} /></div>
    </div>
  );
}

Object.assign(window, {
  CAT: {
    CAT_I, CATALOGS,
    CatNameCell, CatItems, CatChannels, CatRowActions,
    CatRow, CatTable, CatHead, CatList, CatListShell, CatListLoading,
    RemoveDialog, CreateCatalogDialog, CatMobileCard, CatListMobile,
    CreateCatalogMobile, RemoveCatalogMobile,
  },
});
