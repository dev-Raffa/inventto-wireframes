/* Inventto — Wireframe · Catálogos · Configurar (2.5.2), Curadoria (2.5.3) e
   Sheet Adicionar produtos. Tabs variam por tipo (PDV × público). Preview ao vivo
   da vitrine (readonly) na aba Vitrine. Reusa kit (window.WF_*), casca (window.SH),
   classes pd-/mv-/ct-. Exporta em window.CATC. */

const { Sidebar, TopHeader, SH_I, WSwitch } = window.SH;
const { CAT_I, CatTypeBadge, CatStateBadge } = window.CAT;

const cic2 = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const CC_I = {
  general: cic2(<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></>),
  store: cic2(<><path d="M3 9 4.5 4h15L21 9M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M3 9h18"/></>),
  list: cic2(<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>),
  grid: cic2(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>),
  rows: cic2(<><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="13" width="18" height="5" rx="1"/></>),
  insta: cic2(<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1"/></>),
  face: cic2(<path d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13V9a1 1 0 0 1 1-1Z"/>),
  globe: cic2(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  check: cic2(<path d="M20 6 9 17l-5-5"/>),
  x: cic2(<path d="M6 6 18 18M18 6 6 18"/>),
  star: cic2(<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.8 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z"/>),
  trash: cic2(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>),
  search: cic2(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  whats: cic2(<><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21Z"/></>),
  plus: cic2(<path d="M12 5v14M5 12h14"/>),
  warn: cic2(<><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></>),
  undo: cic2(<><path d="M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8"/></>),
  chev: cic2(<path d="m6 9 6 6 6-6"/>),
};

/* identidade visual de exemplo (conteúdo do usuário) */
const BRAND = { primary: "#2f5d4a", bg: "#f4f1ea", secondary: "#c98a3a", text: "#26221d" };

/* ── Tabs ─────────────────────────────────────────────── */
function CatTabs({ tabs, active }) {
  return (
    <div className="ct-tabs">
      {tabs.map((t) => (
        <span key={t.id} className={["ct-tab", t.id === active ? "is-active" : ""].join(" ")}>
          {CC_I[t.icon]}{t.label}
        </span>
      ))}
    </div>
  );
}

/* ── cabeçalho da tela configurar ─────────────────────── */
function ConfigHead({ name, type }) {
  return (
    <div className="ct-cfg-head">
      <div className="ct-cfg-title">
        <h1 className="wf-h1">{name}</h1>
        <CatTypeBadge type={type} />
      </div>
    </div>
  );
}

/* ── ColorPicker [a construir] ────────────────────────── */
function CatColorPicker({ label, color, hex }) {
  return (
    <div className="ct-color">
      <span className="ct-color-sw" style={{ background: color }} />
      <span className="ct-color-meta">
        <span className="ct-color-label">{label}</span>
        <span className="ct-color-hex">{hex}</span>
      </span>
    </div>
  );
}

/* ── input com prefixo de slug + validação assíncrona ─── */
function SlugField({ value, slugState }) {
  const cls = ["ct-slugfield", slugState === "ok" ? "is-ok" : "", (slugState === "taken" || slugState === "format") ? "is-err" : ""].join(" ");
  return (
    <div className={cls}>
      <span className="ct-slug-prefix">inventto.app/</span>
      <span className={["ct-slug-val", value ? "" : "is-placeholder"].join(" ")}>{value || "sua-loja"}</span>
      <span className="ct-slug-trail">
        {slugState === "ok" && <span className="ct-slug-ck">{CC_I.check}</span>}
        {(slugState === "taken" || slugState === "format") && <span className="ct-slug-x">{CC_I.x}</span>}
        {slugState === "validating" && <span className="wf-spin" style={{ borderColor: "rgba(44,42,40,.2)", borderTopColor: "var(--wf-muted)" }} />}
      </span>
    </div>
  );
}

/* ── Tab Geral ────────────────────────────────────────── */
function TabGeneral({ type, slugState = "ok" }) {
  if (type === "pdv") {
    return (
      <div className="ct-cfg-form">
        <div className="ct-cfg-section">
          <div className="ct-cfg-sec-h">Dados do catálogo</div>
          <WField label="Nome do catálogo"><WInput value="Loja do balcão" /></WField>
          <WHelper>Catálogos de PDV definem o que aparece na venda de balcão. Não têm endereço público.</WHelper>
        </div>
        <div className="ct-cfg-section">
          <div className="ct-cfg-sec-h">Curadoria</div>
          <div className="ct-switchrow">
            <span className="ct-switch-meta">
              <span className="ct-switch-title">48 produtos neste catálogo</span>
              <span className="ct-switch-desc">Gerencie os itens e preços de venda do balcão.</span>
            </span>
            <WBtn variant="outline">Abrir curadoria</WBtn>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="ct-cfg-form">
      <div className="ct-cfg-section">
        <div className="ct-cfg-sec-h">Endereço e contato</div>
        <WField label="Nome da vitrine"><WInput value="Vitrine Verão 2026" /></WField>
        <WField label="Endereço da vitrine (slug)">
          <SlugField value="atelie-joana" slugState={slugState} />
          {slugState === "ok" && <span className="ct-helper-ok">{CC_I.check}Endereço disponível.</span>}
          {slugState === "taken" && <WError>Este endereço já está em uso. Tente outro.</WError>}
          {slugState === "format" && <WError>Use só letras minúsculas, números e hífen, de 3 a 50 caracteres.</WError>}
          {slugState === "validating" && <WHelper>Verificando disponibilidade…</WHelper>}
        </WField>
        <WField label="WhatsApp">
          <WInput value="(11) 98888-7766" trail={CC_I.whats} mono />
          <WHelper>Usado para receber pedidos e contatos da vitrine.</WHelper>
        </WField>
      </div>
      <div className="ct-cfg-section">
        <div className="ct-cfg-sec-h">Redes sociais (opcional)</div>
        <div className="ct-social-row">
          <WField label="Instagram"><WInput value="@atelie.joana" trail={CC_I.insta} /></WField>
          <WField label="Facebook"><WInput placeholder="/atelie.joana" trail={CC_I.face} /></WField>
        </div>
        <WField label="Site"><WInput placeholder="https://" trail={CC_I.globe} mono /></WField>
      </div>
    </div>
  );
}

/* ── Preview ao vivo da vitrine (readonly) ────────────── */
function VitrinePreview({ layout = "grid", showPrices = true, showSoldout = true }) {
  const prods = [
    { name: "Vestido Linho Areia", price: "R$ 189", was: null, sold: false },
    { name: "Camisa Social", price: "R$ 129", was: "R$ 159", sold: false },
    { name: "Bolsa Tote Lona", price: "R$ 95", was: null, sold: true },
    { name: "Lenço de Seda", price: "R$ 64", was: null, sold: false },
  ];
  const list = (showSoldout ? prods : prods.filter((p) => !p.sold)).slice(0, layout === "list" ? 3 : 4);
  return (
    <div className="ct-preview-wrap">
      <div className="ct-preview-tag"><span className="ct-live-dot" />Preview ao vivo · atualiza ao editar</div>
      <div className="ct-preview" style={{
        "--ct-prev-primary": BRAND.primary, "--ct-prev-bg": "#fbfaf8",
        "--ct-prev-hero": BRAND.bg, "--ct-prev-text": BRAND.text,
      }}>
        <div className="ct-prev-bar">
          <span className="ct-prev-dot" /><span className="ct-prev-dot" /><span className="ct-prev-dot" />
          <span className="ct-prev-url">inventto.app/atelie-joana</span>
        </div>
        <div className="ct-prev-hero">
          <span className="ct-prev-logo">A</span>
          <span className="ct-prev-store">Ateliê Joana</span>
          <span className="ct-prev-tagline">Peças de linho e alfaiataria sob medida</span>
        </div>
        <div className="ct-prev-body">
          <div className={["ct-prev-grid", layout === "list" ? "is-list" : ""].join(" ")}>
            {list.map((p, i) => (
              <div className="ct-prev-card" key={i}>
                <div className="ct-prev-card-img">{p.sold && <span className="ct-prev-soldout">Esgotado</span>}</div>
                <div className="ct-prev-card-b">
                  <div className="ct-prev-card-name">{p.name}</div>
                  {showPrices
                    ? <div className="ct-prev-card-price">{p.price}{p.was && <s>{p.was}</s>}</div>
                    : <div className="ct-prev-card-price is-hidden">Consultar</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="ct-prev-cta">{CC_I.whats}Comprar pelo WhatsApp</div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab Vitrine (RF026) ──────────────────────────────── */
function TabVitrine({ layout = "grid", showPrices = true, showSoldout = true }) {
  return (
    <div className="ct-cfg-grid has-preview">
      <div className="ct-cfg-form" style={{ maxWidth: "none" }}>
        <div className="ct-cfg-section">
          <div className="ct-cfg-sec-h">Identidade visual</div>
          <div className="ct-colors">
            <CatColorPicker label="Cor primária" color={BRAND.primary} hex="#2F5D4A" />
            <CatColorPicker label="Fundo" color={BRAND.bg} hex="#F4F1EA" />
            <CatColorPicker label="Secundária" color={BRAND.secondary} hex="#C98A3A" />
            <CatColorPicker label="Texto" color={BRAND.text} hex="#26221D" />
          </div>
          <div style={{ marginTop: 14 }}>
            <span className="wf-label">Logo e capa</span>
            <div className="ct-uploads" style={{ marginTop: 6 }}>
              <div className="ct-upload is-logo"><span className="ct-upload-ico">{SH_I.image}</span><span className="ct-upload-label">logo</span></div>
              <div className="ct-upload is-cover"><span className="ct-upload-ico">{SH_I.image}</span><span className="ct-upload-label">imagem de capa · 1200×400</span></div>
            </div>
          </div>
        </div>

        <div className="ct-cfg-section">
          <div className="ct-cfg-sec-h">Layout</div>
          <WField label="Disposição dos produtos">
            <div className="ct-seg">
              <span className={["ct-seg-opt", layout === "grid" ? "is-active" : ""].join(" ")}>{CC_I.grid}Grade</span>
              <span className={["ct-seg-opt", layout === "list" ? "is-active" : ""].join(" ")}>{CC_I.rows}Lista</span>
            </div>
          </WField>
          <WField label="Estilo do card"><WSelect value="Minimalista" /></WField>
        </div>

        <div className="ct-cfg-section">
          <div className="ct-cfg-sec-h">Comportamento</div>
          <div className="ct-switchrow">
            <span className="ct-switch-meta">
              <span className="ct-switch-title">Mostrar preços</span>
              <span className="ct-switch-desc">Quando desativado, o cliente vê “Consultar” e é direcionado ao WhatsApp.</span>
            </span>
            <WSwitch on={showPrices} />
          </div>
          <div className="ct-switchrow">
            <span className="ct-switch-meta">
              <span className="ct-switch-title">Mostrar produtos esgotados</span>
              <span className="ct-switch-desc">Produtos zerados aparecem como “Esgotado” na vitrine.</span>
            </span>
            <WSwitch on={showSoldout} />
          </div>
          <WField label="Mensagem de WhatsApp pré-preenchida (opcional)">
            <div className="mv-textarea">Olá! Tenho interesse em um produto da sua vitrine.</div>
          </WField>
        </div>
      </div>
      <VitrinePreview layout={layout} showPrices={showPrices} showSoldout={showSoldout} />
    </div>
  );
}

/* barra de salvar / descartar (alterações pendentes) */
function SaveBar({ saving }) {
  return (
    <div className="ct-savebar">
      <span className="ct-savebar-text"><span className="ct-savedot" />Você tem alterações não salvas.</span>
      <span className="ct-savebar-actions">
        <WBtn variant="ghost">Descartar</WBtn>
        <WBtn loading={saving}>{saving ? "Salvando…" : "Salvar alterações"}</WBtn>
      </span>
    </div>
  );
}

/* ════ Tela Configurar — conteúdo (desktop) ════════════
   type: "online" | "pdv" · tab: "geral" | "vitrine" | "curadoria"
   slugState (online/geral): ok | taken | format | validating
   dirty: mostra a SaveBar · saving */
function ConfigContent({ type = "online", tab = "geral", slugState = "ok", dirty, saving, layout, showPrices = true, showSoldout = true }) {
  const tabs = type === "pdv"
    ? [{ id: "geral", label: "Geral", icon: "general" }, { id: "curadoria", label: "Curadoria", icon: "list" }]
    : [{ id: "geral", label: "Geral", icon: "general" }, { id: "vitrine", label: "Vitrine", icon: "store" }, { id: "curadoria", label: "Curadoria", icon: "list" }];
  return (
    <div className="ct-cfg-col">
      <ConfigHead name={type === "pdv" ? "Loja do balcão" : "Vitrine Verão 2026"} type={type} />
      <CatTabs tabs={tabs} active={tab} />
      <div className="ct-cfg-grid" style={tab === "vitrine" ? { display: "block" } : null}>
        {tab === "geral" && <TabGeneral type={type} slugState={slugState} />}
        {tab === "vitrine" && <TabVitrine layout={layout} showPrices={showPrices} showSoldout={showSoldout} />}
        {tab === "curadoria" && <CuradoriaTabShortcut type={type} />}
      </div>
      {(dirty || saving) && <SaveBar saving={saving} />}
    </div>
  );
}

function CuradoriaTabShortcut({ type }) {
  return (
    <div className="ct-cfg-form">
      <div className="ct-switchrow" style={{ marginTop: 0 }}>
        <span className="ct-switch-meta">
          <span className="ct-switch-title">Curadoria de itens</span>
          <span className="ct-switch-desc">Escolha produtos, defina preços, destaque e promoções. Abre a tela dedicada de curadoria.</span>
        </span>
        <WBtn variant="outline">{CC_I.list}Abrir curadoria</WBtn>
      </div>
    </div>
  );
}

function ConfigShell({ type = "online", tab = "geral", slugState = "ok", dirty, saving, layout, showPrices, showSoldout }) {
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="catalogos" />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Catálogos", type === "pdv" ? "Loja do balcão" : "Vitrine Verão 2026"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <ConfigContent type={type} tab={tab} slugState={slugState} dirty={dirty} saving={saving} layout={layout} showPrices={showPrices} showSoldout={showSoldout} />
        </div>
      </div>
    </div>
  );
}

/* ════ 2.5.3 CURADORIA DE ITENS ════════════════════════ */
const CUR_ITEMS = [
  { id: "i1", name: "Vestido Linho Areia", sku: "VL-AREIA-01", price: "189,00", orig: "", star: true },
  { id: "i2", name: "Camisa Social — Branco / M", sku: "CS-ALG-BR-M", price: "129,00", orig: "159,00", star: false },
  { id: "i3", name: "Calça Alfaiataria", sku: "CA-ALF-02", price: "215,00", orig: "", star: false },
  { id: "i4", name: "Bolsa Tote Lona", sku: "BT-LONA", price: "95,00", orig: "", star: true },
];

function CuradoriaItem({ it, isNew, autosave }) {
  const noPrice = isNew && !it.price;
  return (
    <div className={["ct-cur-item", isNew ? "is-new" : ""].join(" ")}>
      <div className="ct-cur-prod">
        <span className="pd-thumb" />
        <span className="ct-cur-prod-meta">
          <span className="ct-cur-prod-name">{it.name}</span>
          <span className="ct-cur-prod-sku">{it.sku}</span>
        </span>
      </div>
      <div className="ct-cur-prices">
        <div className={["ct-cur-price", noPrice ? "is-warn" : ""].join(" ")}>
          <span className="ct-price-lab">Preço de venda</span>
          <div className="mv-prefix-input"><span className="mv-prefix">R$</span><span className={["mv-prefix-val", it.price ? "" : "is-placeholder"].join(" ")}>{it.price || "0,00"}</span></div>
          {noPrice && <span className="ct-cur-price-err">{CC_I.warn}Defina um preço para incluir este item.</span>}
          {autosave === it.id && <span className="ct-autosave"><span className="wf-spin" />salvando…</span>}
        </div>
        <div className="ct-cur-price">
          <span className="ct-price-lab">Preço original</span>
          <div className="mv-prefix-input"><span className="mv-prefix">R$</span><span className={["mv-prefix-val", it.orig ? "" : "is-placeholder"].join(" ")}>{it.orig || "0,00"}</span></div>
        </div>
      </div>
      <div className="ct-cur-actions">
        <span className={["ct-star", it.star ? "is-on" : ""].join(" ")} aria-label="Destaque">{CC_I.star}</span>
        <span className="ct-trash" aria-label="Remover">{CC_I.trash}</span>
      </div>
    </div>
  );
}

function CuradoriaHead() {
  return (
    <div className="ct-headrow">
      <div>
        <h1 className="wf-h1" style={{ fontSize: 26 }}>Curadoria</h1>
        <p className="ct-head-sub">Vitrine Verão 2026 · escolha os produtos e defina preços. Mudanças de preço salvam automaticamente.</p>
      </div>
      <span className="ct-head-cta"><WBtn><span className="ct-ico">{CC_I.plus}</span>Adicionar produtos</WBtn></span>
    </div>
  );
}

/* scenario: base · new(item recém-adicionado sem preço · warning) · empty · saving */
function Curadoria({ scenario = "base", role = "owner" }) {
  if (scenario === "empty") {
    return (
      <div className="ct-cur-col">
        <CuradoriaHead />
        <div className="pd-tablewrap" style={{ marginTop: 20 }}>
          <div className="pd-empty">
            <div className="pd-empty-ico">{CC_I.list}</div>
            <p className="pd-empty-title">Nenhum produto neste catálogo.</p>
            <p className="pd-empty-text">Adicione produtos a este catálogo.</p>
            <WBtn><span style={{ display: "inline-flex", marginRight: 2 }}>{CC_I.plus}</span>Adicionar produtos</WBtn>
          </div>
        </div>
      </div>
    );
  }
  const isNew = scenario === "new";
  const items = isNew
    ? [...CUR_ITEMS, { id: "i5", name: "Lenço de Seda Estampado", sku: "LS-EST-03", price: "", orig: "", star: false }]
    : CUR_ITEMS;
  return (
    <div className="ct-cur-col">
      <CuradoriaHead />
      <div className="ct-cur-filters">
        <span className="ct-cur-search"><WInput placeholder="Buscar produto ou SKU neste catálogo" trail={CC_I.search} /></span>
        <span className="mv-filter" style={{ minWidth: 0 }}>
          <span className="pd-select" style={{ minWidth: 150 }}><span className="pd-grow">Todas as categorias</span><span className="pd-chev">{CC_I.chev}</span></span>
        </span>
        <span className="mv-filter" style={{ minWidth: 0 }}>
          <span className="pd-select" style={{ minWidth: 130 }}><span className="pd-grow">Destaque: todos</span><span className="pd-chev">{CC_I.chev}</span></span>
        </span>
      </div>
      {isNew && (
        <div className="pd-warnbox" style={{ marginTop: 16 }}>
          <span className="pd-warn-ico">{CC_I.warn}</span>
          <span className="pd-warn-text"><b>1 item recém-adicionado precisa de preço.</b> Itens sem preço de venda não entram no catálogo até serem preenchidos (RN065).</span>
        </div>
      )}
      <div className="ct-cur-list">
        {items.map((it) => <CuradoriaItem key={it.id} it={it} isNew={isNew && it.id === "i5"} autosave={scenario === "saving" && it.id === "i2" ? "i2" : null} />)}
      </div>
      <div className="pd-tablefoot">
        <span className="pd-count"><b>{items.length}</b> produtos no catálogo · 2 em destaque</span>
      </div>
    </div>
  );
}

function CuradoriaShell({ scenario = "base" }) {
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="catalogos" />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Catálogos", "Vitrine Verão 2026", "Curadoria"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <Curadoria scenario={scenario} />
        </div>
      </div>
    </div>
  );
}

/* ════ Sheet: Adicionar produtos (max-w-lg) ════════════ */
const AVAIL = [
  { id: "p1", name: "Vestido Linho Areia", sku: "VL-AREIA-01", added: true },
  { id: "p2", name: "Camisa Social Algodão", sku: "CS-ALG", added: true },
  { id: "p3", name: "Calça Alfaiataria", sku: "CA-ALF-02", added: false, checked: true },
  { id: "p4", name: "Lenço de Seda Estampado", sku: "LS-EST-03", added: false, checked: true },
  { id: "p5", name: "Bolsa Tote Lona", sku: "BT-LONA", added: false, checked: false },
  { id: "p6", name: "Cinto de Couro", sku: "CT-COURO-01", added: false, checked: false },
];

function AddProductsSheet({ standalone }) {
  const sel = AVAIL.filter((p) => p.checked).length;
  return (
    <div className={["mv-sheet wf", standalone ? "is-standalone" : ""].join(" ")} style={standalone ? { maxWidth: 520 } : { width: 520 }}>
      <div className="mv-sheet-head">
        <h2 className="mv-sheet-title">Adicionar produtos</h2>
        <p className="mv-sheet-desc">Escolha os produtos que entram em <b>Vitrine Verão 2026</b>.</p>
        <span className="mv-sheet-x">{CC_I.x}</span>
      </div>
      <div className="mv-sheet-body">
        <WInput placeholder="Buscar produto ou SKU…" trail={CC_I.search} />
        <div style={{ marginTop: 14 }}>
          {AVAIL.map((p) => (
            <div key={p.id} className={["ct-add-prodrow", p.added ? "is-added" : ""].join(" ")}>
              <span className={["pd-cb", p.checked ? "is-checked" : "", p.added ? "is-disabled" : ""].join(" ")}>{(p.checked || p.added) && CC_I.check}</span>
              <span className="pd-thumb is-sm" />
              <span className="ct-add-meta">
                <span className="ct-add-name">{p.name}</span>
                <span className="ct-add-sku">{p.sku}</span>
              </span>
              {p.added && <span className="ct-add-added">Já adicionado</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="mv-sheet-foot">
        <span className="ct-add-foot-count" style={{ flex: 1, display: "flex", alignItems: "center" }}><b>{sel}</b>&nbsp;selecionados</span>
        <div className="mv-foot-submit" style={{ flex: "0 0 auto", width: 200 }}><WBtn disabled={sel === 0}>Adicionar ao catálogo</WBtn></div>
      </div>
    </div>
  );
}

Object.assign(window, {
  CATC: {
    CC_I, BRAND, CatTabs, CatColorPicker, SlugField, VitrinePreview,
    ConfigContent, ConfigShell, Curadoria, CuradoriaShell, CuradoriaItem,
    AddProductsSheet,
  },
});
