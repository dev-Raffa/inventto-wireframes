/* Inventto — Wireframe · Catálogos · 2.5.2 Criar / editar catálogo e
   2.5.3 Curadoria de itens (+ Sheet Adicionar produtos).
   O catálogo é CANAL-AGNÓSTICO: a tela de criação/edição tem campo único (Nome)
   + seção read-only de canais vinculados. Sem tipo, slug, identidade visual,
   layout ou publicação — tudo isso pertence ao storefront. Curadoria gerencia
   produtos + preço (venda/original) com auto-save; destaque NÃO se define aqui
   (pertence ao storefront — RF028). Reusa kit (window.WF_*), casca (window.SH),
   classes pd-/mv-/ct-. Exporta em window.CATC. */

const { Sidebar, TopHeader, SH_I } = window.SH;
const { CAT_I, CatListMobile } = window.CAT;

const cic2 = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const CC_I = {
  cart: cic2(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.2 12.5a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L19 7H5"/></>),
  globe: cic2(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>),
  arrow: cic2(<path d="M5 12h14M13 6l6 6-6 6"/>),
  trash: cic2(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>),
  search: cic2(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>),
  plus: cic2(<path d="M12 5v14M5 12h14"/>),
  warn: cic2(<><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></>),
  undo: cic2(<><path d="M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8"/></>),
  chev: cic2(<path d="m6 9 6 6 6-6"/>),
  check: cic2(<path d="M20 6 9 17l-5-5"/>),
  x: cic2(<path d="M6 6 18 18M18 6 6 18"/>),
};

/* ════ 2.5.2 CRIAR / EDITAR CATÁLOGO ═══════════════════ */

/* canais vinculados (read-only, só na edição) */
const LINKED_CHANNELS = [
  { type: "storefront", name: "Vitrine Ateliê Joana", meta: "inventto.app/atelie-joana" },
  { type: "pdv", name: "PDV · Loja Centro", meta: "Ponto de venda" },
];

function LinkedChannels({ channels = LINKED_CHANNELS }) {
  return (
    <div className="ct-cfg-section">
      <div className="ct-cfg-sec-h">Canais vinculados</div>
      {channels.length === 0 ? (
        <p className="ct-linked-empty">Nenhum canal vinculado a este catálogo.</p>
      ) : (
        <>
          <p className="ct-linked-lead">Canais que usam este catálogo. A vinculação é feita na configuração de cada canal.</p>
          <div className="ct-linked-list">
            {channels.map((ch, i) => (
              <a key={i} className="ct-linked-row" href="#" onClick={(e) => e.preventDefault()}>
                <span className="ct-linked-ico">{ch.type === "pdv" ? CC_I.cart : CC_I.globe}</span>
                <span className="ct-linked-meta">
                  <span className="ct-linked-name">{ch.name}</span>
                  <span className="ct-linked-sub">{ch.meta}</span>
                </span>
                <span className="ct-linked-arrow">{CC_I.arrow}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ════ 2.5.3 SHEET — Editar catálogo (sobre /catalogos · max-w-md) ══
   Edita o nome + mostra canais vinculados (read-only). Manager e Owner.
   Salvar → fecha + toast "Alterações salvas." (§5).
   props: nameVal · nameErr · channels · saving · loading · standalone */
function EditCatalogSheet({ standalone, nameVal = "Coleção Verão 2026", nameErr, channels, saving, loading }) {
  const body = loading ? (
    <div className="mv-sheet-body">
      <div className="wf-sk" style={{ width: 130, height: 11 }} />
      <div className="wf-sk" style={{ width: "100%", height: 42, borderRadius: 10, marginTop: 8 }} />
      <div className="wf-sk" style={{ width: 150, height: 11, marginTop: 32 }} />
      <div className="wf-sk" style={{ width: "100%", height: 62, borderRadius: 12, marginTop: 14 }} />
      <div className="wf-sk" style={{ width: "100%", height: 62, borderRadius: 12, marginTop: 10 }} />
    </div>
  ) : (
    <div className="mv-sheet-body">
      <WField label="Nome do catálogo">
        <WInput value={nameVal} placeholder="ex.: Coleção Verão 2026" error={!!nameErr} />
        {nameErr && <WError>Informe um nome para o catálogo.</WError>}
      </WField>
      <div style={{ marginTop: 26 }}>
        <LinkedChannels channels={channels} />
      </div>
    </div>
  );
  return (
    <div className={["mv-sheet wf ct-edit-sheet", standalone ? "is-standalone" : ""].join(" ")} style={standalone ? { maxWidth: 460 } : { width: 460 }}>
      <div className="mv-sheet-head">
        <h2 className="mv-sheet-title">Editar catálogo</h2>
        <span className="mv-sheet-x">{CC_I.x}</span>
      </div>
      {body}
      <div className="mv-sheet-foot">
        <div className="mv-foot-cancel"><WBtn variant="ghost">Cancelar</WBtn></div>
        <div className="mv-foot-submit"><WBtn loading={saving} disabled={loading}>{saving ? "Salvando…" : "Salvar"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ 2.5.3 CURADORIA DE ITENS ════════════════════════
   produto + preço de venda (obrigatório, RN063) + preço original (opcional) +
   remover (toast reversível). SEM destaque — pertence ao storefront (RF028). */
const CUR_ITEMS = [
  { id: "i1", name: "Vestido Linho Areia", sku: "VL-AREIA-01", price: "189,00", orig: "", attrs: ["Tam. 38", "Areia"] },
  { id: "i2", name: "Camisa Social Algodão", sku: "CS-ALG-BR-M", price: "129,00", orig: "159,00", attrs: ["Branco", "M"] },
  { id: "i3", name: "Calça Alfaiataria", sku: "CA-ALF-02", price: "215,00", orig: "", attrs: ["Tam. 40", "Preto"] },
  { id: "i4", name: "Bolsa Tote Lona", sku: "BT-LONA", price: "95,00", orig: "", attrs: ["Tam. único", "Cru"] },
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
          {it.attrs && it.attrs.length > 0 && (
            <span className="ct-cur-prod-attrs">
              {it.attrs.map((a, i) => <span key={i} className="ct-attr-chip">{a}</span>)}
            </span>
          )}
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
        <span className="ct-trash" aria-label="Remover">{CC_I.trash}</span>
      </div>
    </div>
  );
}

function CuradoriaHead({ role }) {
  return (
    <div className="ct-headrow">
      <div>
        <h1 className="wf-h1" style={{ fontSize: 26 }}>Produtos — Coleção Verão 2026</h1>
        <p className="ct-head-sub">Escolha os produtos e defina preços. Mudanças de preço salvam automaticamente.</p>
      </div>
    </div>
  );
}

/* scenario: base · new(item recém-adicionado sem preço · warning) · empty ·
   saving(auto-save de preço) · removed(toast reversível) */
function Curadoria({ scenario = "base", role = "owner" }) {
  if (scenario === "empty") {
    return (
      <div className="ct-cur-col">
        <CuradoriaHead role={role} />
        <div className="pd-tablewrap" style={{ marginTop: 20 }}>
          <div className="pd-empty">
            <div className="pd-empty-ico">{CC_I.search}</div>
            <p className="pd-empty-title">Nenhum produto neste catálogo.</p>
            <p className="pd-empty-text">Adicione produtos a este catálogo.</p>
            {role !== "sales" && <WBtn><span style={{ display: "inline-flex", marginRight: 2 }}>{CC_I.plus}</span>Adicionar produtos</WBtn>}
          </div>
        </div>
      </div>
    );
  }
  const isNew = scenario === "new";
  const items = isNew
    ? [...CUR_ITEMS, { id: "i5", name: "Lenço de Seda Estampado", sku: "LS-EST-03", price: "", orig: "", attrs: ["Tam. único", "Estampa floral"] }]
    : CUR_ITEMS;
  return (
    <div className="ct-cur-col">
      <CuradoriaHead role={role} />
      <div className="ct-cur-filters">
        <span className="ct-cur-search"><WInput placeholder="Buscar produto ou SKU neste catálogo" trail={CC_I.search} /></span>
        <span className="mv-filter" style={{ minWidth: 0 }}>
          <span className="pd-select" style={{ minWidth: 170 }}><span className="pd-grow">Todas as categorias</span><span className="pd-chev">{CC_I.chev}</span></span>
        </span>
        {role !== "sales" && <span className="ct-cur-addcta"><WBtn><span className="ct-ico">{CC_I.plus}</span>Adicionar produtos</WBtn></span>}
      </div>
      {isNew && (
        <div className="pd-warnbox" style={{ marginTop: 16 }}>
          <span className="pd-warn-ico">{CC_I.warn}</span>
          <span className="pd-warn-text"><b>1 item recém-adicionado precisa de preço.</b> Itens sem preço de venda não entram no catálogo até serem preenchidos (RN063).</span>
        </div>
      )}
      <div className="ct-cur-list">
        {items.map((it) => <CuradoriaItem key={it.id} it={it} isNew={isNew && it.id === "i5"} autosave={scenario === "saving" && it.id === "i2" ? "i2" : null} />)}
      </div>
      <div className="pd-tablefoot">
        <span className="pd-count"><b>{items.length}</b> produtos no catálogo</span>
      </div>
    </div>
  );
}

function CuradoriaShell({ scenario = "base", role = "owner" }) {
  return (
    <div className="wf sh-app" style={{ width: "1200px" }}>
      <Sidebar role={role} active="catalogos" />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Catálogos", "Coleção Verão 2026", "Produtos"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <Curadoria scenario={scenario} role={role} />
        </div>
      </div>
    </div>
  );
}

/* toast reversível de remoção (§3) */
function UndoToast({ product = "Bolsa Tote Lona" }) {
  return (
    <div className="ct-undo-toast">
      <span className="ct-undo-text">{product} removido.</span>
      <span className="ct-undo-btn">{CC_I.undo}Desfazer</span>
    </div>
  );
}

/* ════ Sheet: Adicionar produtos (max-w-lg) ════════════ */
const AVAIL = [
  { id: "p1", name: "Vestido Linho Areia", sku: "VL-AREIA-01", added: true, attrs: ["Tam. 38", "Areia"] },
  { id: "p2", name: "Camisa Social Algodão", sku: "CS-ALG", added: true, attrs: ["Branco", "M"] },
  { id: "p3", name: "Calça Alfaiataria", sku: "CA-ALF-02", added: false, checked: true, attrs: ["Tam. 40", "Preto"] },
  { id: "p4", name: "Lenço de Seda Estampado", sku: "LS-EST-03", added: false, checked: true, attrs: ["Tam. único", "Estampa floral"] },
  { id: "p5", name: "Bolsa Tote Lona", sku: "BT-LONA", added: false, checked: false, attrs: ["Tam. único", "Cru"] },
  { id: "p6", name: "Cinto de Couro", sku: "CT-COURO-01", added: false, checked: false },
];

function AddProductsSheet({ standalone }) {
  const sel = AVAIL.filter((p) => p.checked).length;
  return (
    <div className={["mv-sheet wf", standalone ? "is-standalone" : ""].join(" ")} style={standalone ? { maxWidth: 520 } : { width: 520 }}>
      <div className="mv-sheet-head">
        <h2 className="mv-sheet-title">Adicionar produtos</h2>
        <p className="mv-sheet-desc">Escolha os produtos que entram em <b>Coleção Verão 2026</b>.</p>
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
                {p.attrs && p.attrs.length > 0 && (
                  <span className="ct-cur-prod-attrs">
                    {p.attrs.map((a, i) => <span key={i} className="ct-attr-chip">{a}</span>)}
                  </span>
                )}
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

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function MobileTopbar() {
  return (
    <div className="sh-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
      </div>
    </div>
  );
}

/* card de produto (mobile): imagem + nome/sku/atributos + preços empilhados */
function CuradoriaMobileCard({ it, role }) {
  return (
    <div className="ct-mprod-card">
      <div className="ct-mprod-top">
        <span className="pd-thumb" />
        <span className="ct-cur-prod-meta">
          <span className="ct-cur-prod-name">{it.name}</span>
          <span className="ct-cur-prod-sku">{it.sku}</span>
          {it.attrs && it.attrs.length > 0 && (
            <span className="ct-cur-prod-attrs">
              {it.attrs.map((a, i) => <span key={i} className="ct-attr-chip">{a}</span>)}
            </span>
          )}
        </span>
        {role !== "sales" && <span className="ct-iconact is-danger" aria-label="Remover">{CC_I.trash}</span>}
      </div>
      <div className="ct-mprod-prices">
        <div className="ct-cur-price">
          <span className="ct-price-lab">Preço de venda</span>
          <div className="mv-prefix-input"><span className="mv-prefix">R$</span><span className={["mv-prefix-val", it.price ? "" : "is-placeholder"].join(" ")}>{it.price || "0,00"}</span></div>
        </div>
        <div className="ct-cur-price">
          <span className="ct-price-lab">Preço original</span>
          <div className="mv-prefix-input"><span className="mv-prefix">R$</span><span className={["mv-prefix-val", it.orig ? "" : "is-placeholder"].join(" ")}>{it.orig || "0,00"}</span></div>
        </div>
      </div>
    </div>
  );
}

/* 2.5.4 Produtos do catálogo — mobile */
function ProdutosMobile({ role = "owner" }) {
  return (
    <div className="wf sh-mobile">
      <MobileTopbar />
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div className="ct-head-texts">
            <h1 className="wf-h1" style={{ fontSize: 21 }}>Produtos</h1>
            <p className="ct-head-sub">Coleção Verão 2026</p>
          </div>
          {role !== "sales" && <span className="ct-iconcta" aria-label="Adicionar produtos">{CC_I.plus}</span>}
        </div>
        <div className="ct-mob-search"><WInput placeholder="Buscar produto ou SKU" trail={CC_I.search} /></div>
        <div className="ct-mprod-list">
          {CUR_ITEMS.map((it) => <CuradoriaMobileCard key={it.id} it={it} role={role} />)}
        </div>
      </div>
    </div>
  );
}

/* 2.5.3 Editar catálogo — mobile (bottom sheet sobre a lista) */
function EditCatalogMobile({ channels, saving }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><CatListMobile /></div>
      <div className="mv-sheet-scrim" />
      <div className="ct-msheet">
        <EditCatalogSheet standalone channels={channels} saving={saving} />
      </div>
    </div>
  );
}

/* Sheet Adicionar produtos — mobile (bottom sheet sobre os Produtos) */
function AddProductsMobile({ role = "owner" }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><ProdutosMobile role={role} /></div>
      <div className="mv-sheet-scrim" />
      <div className="ct-msheet">
        <AddProductsSheet standalone />
      </div>
    </div>
  );
}

Object.assign(window, {
  CATC: {
    CC_I, LINKED_CHANNELS, LinkedChannels,
    EditCatalogSheet, EditCatalogMobile,
    Curadoria, CuradoriaShell, CuradoriaItem, UndoToast,
    ProdutosMobile, CuradoriaMobileCard, AddProductsMobile,
    AddProductsSheet,
  },
});
