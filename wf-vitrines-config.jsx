/* Inventto — Wireframe · Vitrines · 2.7.2 Configurar storefront
   (/storefronts/novo · /storefronts/:id). Tabs: Geral · Aparência · Comportamento.
   Geral: nome, catálogo vinculado, slug (validação assíncrona · RN072), WhatsApp,
   redes sociais. Aparência: 4 ColorPicker + logo + capa + layout (SegmentedControl
   Grade/Lista) + estilo de card + preview ao vivo (desktop). Comportamento: Switch
   "Mostrar preços" (RN076), Switch "Mostrar esgotados", mensagem WhatsApp e lista de
   destaques com Star/StarOff. Barra de ações (salvar/descartar) só com alterações
   pendentes. Reusa kit (window.WF_*), casca (window.SH) e classes mv-/org-/ct-.
   Exporta em window.VTC. */

const { Sidebar, TopHeader, SH_I, WSwitch } = window.SH;
const { VT_I, VtBadge, VtListMobile } = window.VT;

const vic2 = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const VTC_I = {
  general: vic2(<><path d="M4 6h16M4 12h16M4 18h10"/></>),
  brush: vic2(<><path d="M9.5 13.5 16 7a2.1 2.1 0 0 1 3 3l-6.5 6.5"/><path d="M9.5 13.5a3 3 0 0 0-4 3c0 1-1 2-2.5 2 1.5 1.5 4 2 6 0a3 3 0 0 0 .5-5Z"/></>),
  sliders: vic2(<><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.4"/><circle cx="15" cy="16" r="2.4"/></>),
  check: vic2(<path d="M20 6 9 17l-5-5"/>),
  circlecheck: vic2(<><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4L15.5 9.5"/></>),
  circlex: vic2(<><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/></>),
  whats: vic2(<><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/></>),
  insta: vic2(<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></>),
  facebook: vic2(<path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>),
  globe: vic2(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  layers: vic2(<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  grid: vic2(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>),
  list: vic2(<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>),
  star: vic2(<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9Z"/>),
  staroff: vic2(<><path d="M8.3 6.3 12 3l2.6 5.3 5.9.9-4.3 4.1M18 18 6 6M16.2 13.5l1 5.6L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.5-.8"/></>),
  upload: vic2(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5"/></>),
  image: vic2(<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="m21 15-5-5L5 21"/></>),
  chev: vic2(<path d="m6 9 6 6 6-6"/>),
  x: vic2(<path d="M6 6 18 18M18 6 6 18"/>),
  spin: vic2(<path d="M12 3a9 9 0 1 0 9 9"/>),
};

/* ════ TABS ════════════════════════════════════════════ */
function VtCfgTabs({ active = "geral" }) {
  const tabs = [["geral", "Geral", VTC_I.general], ["aparencia", "Aparência", VTC_I.brush], ["comportamento", "Comportamento", VTC_I.sliders]];
  return (
    <div className="org-tabs">
      {tabs.map(([id, label, icon]) => (
        <div key={id} className={["org-tab", id === active ? "is-active" : ""].join(" ")}>
          <span className="org-tab-ico">{icon}</span>{label}
        </div>
      ))}
    </div>
  );
}

/* ── slug: prefixo inventto.app/ + validação assíncrona (RN072) ──
   state: "idle" | "checking" | "ok" | "taken" | "invalid" */
function VtSlug({ value = "atelie-joana", state = "ok" }) {
  const cls = ["vt-slug", state === "ok" ? "is-ok" : "", (state === "taken" || state === "invalid") ? "is-error" : ""].join(" ");
  return (
    <div className={cls}>
      <span className="vt-slug-prefix">inventto.app/</span>
      <span className={["vt-slug-val", value ? "" : "is-placeholder"].join(" ")}>{value || "sua-loja"}</span>
      {state === "checking" && <span className="vt-slug-end"><span className="wf-spin" /></span>}
      {state === "ok" && <span className="vt-slug-end is-ok">{VTC_I.circlecheck}</span>}
      {(state === "taken" || state === "invalid") && <span className="vt-slug-end is-error">{VTC_I.circlex}</span>}
    </div>
  );
}

/* ════ TAB GERAL ═══════════════════════════════════════ */
function TabGeral({ create, slugState = "ok", slugValue }) {
  return (
    <div className="vt-cfg-form">
      <div className="vt-section">
        <div className="vt-sec-h">Identificação</div>
        <WField label="Nome da vitrine">
          <WInput value={create ? "" : "Vitrine Ateliê Joana"} placeholder="ex.: Vitrine Ateliê Joana" />
          <WHelper>Identifica a vitrine no app interno. Não aparece para o cliente.</WHelper>
        </WField>
        <WField label="Catálogo">
          <div className="pd-select"><span className="pd-grow">{create ? <span style={{ color: "var(--wf-faint)" }}>Selecione um catálogo…</span> : "Coleção Verão 2026"}</span><span className="pd-chev">{VTC_I.chev}</span></div>
          <WHelper>Os produtos e preços vêm do catálogo selecionado.</WHelper>
        </WField>
      </div>

      <div className="vt-section">
        <div className="vt-sec-h">Endereço público</div>
        <WField label="Slug">
          <VtSlug value={slugValue !== undefined ? slugValue : (create ? "" : "atelie-joana")} state={slugState} />
          {slugState === "taken"
            ? <WError>Este endereço já está em uso. Tente outro.</WError>
            : slugState === "invalid"
            ? <WError>Use só letras minúsculas, números e hífen, de 3 a 50 caracteres.</WError>
            : <WHelper>Endereço público da sua vitrine.</WHelper>}
        </WField>
      </div>

      <div className="vt-section">
        <div className="vt-sec-h">Contato</div>
        <WField label="WhatsApp">
          <div className="vt-iconfield">
            <span className="vt-field-lead">{VTC_I.whats}</span>
            <WInput value={create ? "" : "(11) 98888-7777"} placeholder="(11) 90000-0000" mono />
          </div>
          <WHelper>Usado para receber pedidos e contatos da vitrine.</WHelper>
        </WField>
        <div className="vt-grid2">
          <WField label="Instagram (opcional)">
            <div className="vt-iconfield"><span className="vt-field-lead">{VTC_I.insta}</span><WInput value={create ? "" : "@atelie.joana"} placeholder="@usuario" /></div>
          </WField>
          <WField label="Facebook (opcional)">
            <div className="vt-iconfield"><span className="vt-field-lead">{VTC_I.facebook}</span><WInput value="" placeholder="/pagina" /></div>
          </WField>
        </div>
        <WField label="Site (opcional)">
          <div className="vt-iconfield"><span className="vt-field-lead">{VTC_I.globe}</span><WInput value="" placeholder="https://" /></div>
        </WField>
      </div>
    </div>
  );
}

/* ════ TAB APARÊNCIA ═══════════════════════════════════ */
const COLORS = [
  ["Primária", "#3A3631"], ["Fundo", "#F7F5F2"], ["Secundária", "#8B857D"], ["Texto", "#2C2A28"],
];
function ColorCtrl({ lab, hex }) {
  return (
    <div className="vt-color">
      <span className="vt-color-swatch" style={{ background: hex }} />
      <span className="vt-color-meta">
        <span className="vt-color-lab">{lab}</span>
        <span className="vt-color-hex">{hex}</span>
      </span>
    </div>
  );
}

function TabAparencia({ layout = "grid" }) {
  return (
    <div className="vt-cfg-form">
      <div className="vt-section">
        <div className="vt-sec-h" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>Identidade visual <span className="vt-buildtag">ColorPicker · a construir</span></div>
        <div className="vt-color-grid">
          {COLORS.map(([lab, hex]) => <ColorCtrl key={lab} lab={lab} hex={hex} />)}
        </div>
        <div style={{ marginTop: 18 }}>
          <span className="wf-label">Logo</span>
          <div className="org-logo-row" style={{ marginTop: 8 }}>
            <span className="org-logo-preview is-filled" />
            <div className="org-logo-actions">
              <span className="org-logo-btn">{VTC_I.upload}Trocar logo</span>
              <p className="wf-helper" style={{ margin: 0 }}>PNG, JPG ou WEBP até 5MB.</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <span className="wf-label">Imagem de capa</span>
          <div className="vt-cover is-filled">
            <span className="vt-cover-ico">{VTC_I.image}</span>
            <span className="vt-cover-hint">capa · 1200×400</span>
          </div>
        </div>
      </div>

      <div className="vt-section">
        <div className="vt-sec-h">Layout da vitrine</div>
        <span className="wf-label">Disposição dos produtos</span>
        <div className="mv-seg" style={{ marginTop: 8 }}>
          <span className={["mv-seg-opt", layout === "grid" ? "is-active" : ""].join(" ")} style={layout === "grid" ? { background: "var(--wf-field)", color: "var(--wf-ink)", borderColor: "var(--wf-line)" } : null}>{VTC_I.grid}Grade</span>
          <span className={["mv-seg-opt", layout === "list" ? "is-active" : ""].join(" ")} style={layout === "list" ? { background: "var(--wf-field)", color: "var(--wf-ink)", borderColor: "var(--wf-line)" } : null}>{VTC_I.list}Lista</span>
        </div>
        <div className="vt-cardstyle">
          <WField label="Estilo de card">
            <div className="pd-select"><span className="pd-grow">Minimalista · imagem grande</span><span className="pd-chev">{VTC_I.chev}</span></div>
          </WField>
        </div>
      </div>
    </div>
  );
}

/* ════ TAB COMPORTAMENTO ═══════════════════════════════ */
const DEST_ITEMS = [
  { id: "d1", name: "Vestido Linho Areia", sku: "VL-AREIA-01", on: true },
  { id: "d2", name: "Camisa Social Algodão", sku: "CS-ALG-BR-M", on: true },
  { id: "d3", name: "Calça Alfaiataria", sku: "CA-ALF-02", on: false },
  { id: "d4", name: "Bolsa Tote Lona", sku: "BT-LONA", on: false },
];
function TabComportamento({ showPrices = true }) {
  return (
    <div className="vt-cfg-form">
      <div className="vt-section">
        <div className="vt-sec-h">Exibição</div>
        <div className="org-toggle-row" style={{ marginTop: 4 }}>
          <span className="org-toggle-meta">
            <span className="org-toggle-title">Mostrar preços</span>
            <p className="org-toggle-desc">Quando desativado, o cliente vê “Consultar” e é direcionado ao WhatsApp.</p>
          </span>
          <WSwitch on={showPrices} />
        </div>
        <div className="org-toggle-row">
          <span className="org-toggle-meta">
            <span className="org-toggle-title">Mostrar produtos esgotados</span>
            <p className="org-toggle-desc">Produtos zerados aparecem como “Esgotado” na vitrine.</p>
          </span>
          <WSwitch on />
        </div>
      </div>

      <div className="vt-section">
        <div className="vt-sec-h">Mensagem de WhatsApp</div>
        <WField label="Mensagem pré-preenchida (opcional)">
          <div className="mv-textarea">Olá! Vi sua vitrine e gostaria de fazer um pedido.</div>
          <WHelper>Texto que abre na conversa quando o cliente inicia um pedido.</WHelper>
        </WField>
      </div>

      <div className="vt-section">
        <div className="vt-sec-h">Destaques</div>
        <WHelper style={{ marginTop: 0 }}>Destaques aparecem no topo da vitrine.</WHelper>
        <div className="vt-destaques">
          {DEST_ITEMS.map((it) => (
            <div key={it.id} className={["vt-dest-row", it.on ? "is-on" : ""].join(" ")}>
              <span className="pd-thumb is-sm" />
              <span className="vt-dest-meta">
                <span className="vt-dest-name">{it.name}</span>
                <span className="vt-dest-sku">{it.sku}</span>
              </span>
              <span className={["vt-star", it.on ? "is-on" : ""].join(" ")} aria-label={it.on ? "Remover destaque" : "Destacar"}>{it.on ? VTC_I.star : VTC_I.staroff}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════ Preview ao vivo (somente leitura) ═══════════════ */
function VtPreview({ layout = "grid", showPrices = true }) {
  return (
    <div className="vt-preview-wrap">
      <p className="vt-preview-lab"><span className="vt-live-dot" />Preview ao vivo</p>
      <div className="vt-preview">
        <div className="vt-preview-bar">
          <span className="vt-pv-dot" /><span className="vt-pv-dot" /><span className="vt-pv-dot" />
          <span className="vt-pv-url">inventto.app/atelie-joana</span>
        </div>
        <div className="vt-preview-cover"><span className="vt-preview-logo" /></div>
        <div className="vt-preview-store">
          <div className="vt-preview-storename">Ateliê Joana</div>
          <div className="vt-preview-storesub">Aberto agora · responde no WhatsApp</div>
        </div>
        <div className={["vt-preview-grid", layout === "list" ? "is-list" : ""].join(" ")}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="vt-preview-card">
              <div className="vt-preview-thumb" />
              <div className="vt-preview-cardbody">
                <div className="vt-preview-cardname" />
                {showPrices ? <div className="vt-preview-cardprice" /> : <div className="vt-preview-consult">Consultar →</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════ Ações no topo (descartar + salvar) ══════════════ */
function VtCfgActions({ saving }) {
  return (
    <span className="org-head-actions">
      <WBtn variant="ghost">Descartar</WBtn>
      <WBtn loading={saving}>{saving ? "Salvando…" : "Salvar alterações"}</WBtn>
    </span>
  );
}

/* ════ Conteúdo da tela /storefronts/:id ═══════════════
   props: create · tab · pending · saving · slugState · slugValue · layout · showPrices */
function VtConfig({ create, tab = "geral", pending, saving, slugState, slugValue, layout = "grid", showPrices = true }) {
  const showActions = (pending || saving);
  const showPreview = tab === "aparencia";
  return (
    <div className="vt-cfg-col">
      <div className="vt-cfg-headrow">
        <div>
          {create ? (
            <h1 className="wf-h1" style={{ fontSize: 27 }}>Nova vitrine</h1>
          ) : (
            <div className="vt-cfg-titlewrap">
              <h1 className="wf-h1" style={{ fontSize: 27 }}>Vitrine Ateliê Joana</h1>
              <VtBadge state="live" />
            </div>
          )}
          <p className="vt-cfg-sub">{create ? "Configure a vitrine e publique quando estiver pronta." : "inventto.app/atelie-joana"}</p>
        </div>
      </div>
      <div className="vt-tabsbar">
        <VtCfgTabs active={tab} />
        {showActions && <VtCfgActions saving={saving} />}
      </div>

      <div className={["vt-cfg-split", showPreview ? "has-preview" : ""].join(" ")}>
        {tab === "geral" && <TabGeral create={create} slugState={slugState || "ok"} slugValue={slugValue} />}
        {tab === "aparencia" && <TabAparencia layout={layout} />}
        {tab === "comportamento" && <TabComportamento showPrices={showPrices} />}
        {showPreview && <VtPreview layout={layout} showPrices={showPrices} />}
      </div>
    </div>
  );
}

/* ── shell completa (desktop) ─────────────────────────── */
function VtConfigShell({ create, tab = "geral", pending, saving, slugState, slugValue, layout, showPrices, collapsed }) {
  const crumb = create ? ["Início", "Vitrines", "Nova vitrine"] : ["Início", "Vitrines", "Vitrine Ateliê Joana"];
  return (
    <div className={["wf sh-app", collapsed ? "vt-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role="owner" active="vitrines" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={crumb} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <VtConfig create={create} tab={tab} pending={pending} saving={saving} slugState={slugState} slugValue={slugValue} layout={layout} showPrices={showPrices} />
        </div>
      </div>
    </div>
  );
}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function VtConfigMobile({ create, tab = "geral", pending, slugState, layout, showPrices }) {
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
        <div className="vt-cfg-headrow">
          <div>
            {create
              ? <h1 className="wf-h1" style={{ fontSize: 21 }}>Nova vitrine</h1>
              : <div className="vt-cfg-titlewrap"><h1 className="wf-h1" style={{ fontSize: 20 }}>Vitrine Ateliê Joana</h1><VtBadge state="live" /></div>}
          </div>
        </div>
        <div style={{ marginTop: 14, overflowX: "auto" }}><VtCfgTabs active={tab} /></div>
        <div style={{ marginTop: 6 }}>
          {tab === "geral" && <TabGeral create={create} slugState={slugState || "ok"} />}
          {tab === "aparencia" && <><TabAparencia layout={layout} /><div style={{ marginTop: 22 }}><VtPreview layout={layout} showPrices={showPrices} /></div></>}
          {tab === "comportamento" && <TabComportamento showPrices={showPrices} />}
        </div>
      </div>
      {(pending) && (
        <div style={{ position: "sticky", bottom: 0, padding: "10px 16px", borderTop: "1px solid var(--wf-line-soft)", background: "var(--wf-field)", display: "flex", gap: 10 }}>
          <div style={{ flex: "0 0 110px" }}><WBtn variant="outline">Descartar</WBtn></div>
          <div style={{ flex: 1 }}><WBtn>Salvar</WBtn></div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  VTC: {
    VTC_I, VtCfgTabs, VtSlug, TabGeral, ColorCtrl, TabAparencia, TabComportamento,
    VtPreview, VtCfgActions, VtConfig, VtConfigShell, VtConfigMobile, COLORS, DEST_ITEMS,
  },
});
