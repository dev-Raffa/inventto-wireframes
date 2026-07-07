/* Inventto — Protótipo · shell: tela base (Produtos do catálogo) + seletor das
   4 abordagens + orquestração do fluxo de adição + toast de sucesso. */

const { PRODUCTS: APP_PRODUCTS, SEED_ITEMS: APP_SEED, APPROACHES: APP_APPROACHES, centsToBRL: APP_brl, draftsToItems: APP_toItems } = window.AP;
const { Sidebar: APP_Sidebar, TopHeader: APP_Top } = window.SH;
const { APX: APP_ICO } = window.APP;

const APPROACH_BLURB = {
  A: "Modal centrado em 2 etapas: primeiro seleciona, depois configura. Sequencial e à prova de erro — ideal para quem está aprendendo.",
  B: "Um único dialog: busca no topo e cards em accordion que se adaptam a cada produto. Máxima produtividade, tudo num lugar.",
  C: "O Side Sheet atual vira um fluxo de 2 passos com status por produto. O botão só habilita quando tudo está válido.",
  D: "Ambiente mestre–detalhe: lista à esquerda com status, configuração à direita. Escala para catálogos e variantes grandes.",
};

function ApBaseItem({ it }) {
  return (
    <div className="ct-cur-item ap-baseitem">
      <div className="ct-cur-prod">
        <span className="pd-thumb" />
        <span className="ct-cur-prod-meta">
          <span className="ct-cur-prod-name">{it.name}</span>
          <span className="ct-cur-prod-sku">{it.sku}</span>
          {it.meta && <span className="ct-cur-prod-attrs"><span className="ct-attr-chip">{it.meta}</span></span>}
        </span>
      </div>
      <div className="ap-baseprice">
        {it.origCents ? <span className="ap-base-was">R$ {APP_brl(it.origCents)}</span> : null}
        <span className="ap-base-now">R$ {APP_brl(it.priceCents)}{it.priceHi ? ` – ${APP_brl(it.priceHi)}` : ""}</span>
      </div>
      <span className="pd-statusbadge is-healthy ap-base-badge"><span className="ap-pill-dot" />No catálogo</span>
    </div>
  );
}

function AddCatalogApp() {
  const [approach, setApproach] = useState("A");
  const [flowOpen, setFlowOpen] = useState(false);
  const [items, setItems] = useState(APP_SEED);
  const [toast, setToast] = useState(null);
  const [justAdded, setJustAdded] = useState([]);

  const usedIds = items.map((i) => i.id);
  const available = APP_PRODUCTS.filter((p) => !usedIds.includes(p.id));

  const onConfirm = (drafts) => {
    const newItems = APP_toItems(APP_PRODUCTS, drafts);
    setItems((cur) => [...newItems, ...cur]);
    setJustAdded(newItems.map((i) => i.id));
    setFlowOpen(false);
    setToast(`${newItems.length} produto${newItems.length > 1 ? "s" : ""} adicionado${newItems.length > 1 ? "s" : ""} ao catálogo.`);
    setTimeout(() => setToast(null), 3200);
    setTimeout(() => setJustAdded([]), 2600);
  };

  const Flow = { A: window.ApproachA, B: window.ApproachB, C: window.ApproachC, D: window.ApproachD }[approach];

  return (
    <div className="wf sh-app ap-root" style={{ width: "100%", height: "100%" }}>
      <APP_Sidebar role="owner" active="catalogos" />
      <div className="sh-inset">
        <APP_Top crumb={["Início", "Catálogos", "Coleção Verão 2026", "Produtos"]} notif={false} />
        <div className="sh-main ap-main">
          {/* barra do protótipo — seletor de abordagem */}
          <div className="ap-protobar">
            <div className="ap-protobar-l">
              <span className="wf-eyebrow">Protótipo · fluxo Adicionar produtos</span>
              <div className="ap-seg">
                {APP_APPROACHES.map((a) => (
                  <button type="button" key={a.key} className={["ap-seg-btn", approach === a.key ? "is-on" : ""].join(" ")} onClick={() => setApproach(a.key)}>
                    <span className="ap-seg-key">{a.key}</span>{a.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="ap-protobar-blurb">{APPROACH_BLURB[approach]}</p>
          </div>

          <div className="ct-cur-col ap-col">
            <div className="ct-headrow">
              <div>
                <h1 className="wf-h1" style={{ fontSize: 26 }}>Produtos — Coleção Verão 2026</h1>
                <p className="ct-head-sub">Adicione produtos já com preço. O <b>preço original</b> é opcional e só sinaliza promoção. Produtos com variantes aceitam preço por variante.</p>
              </div>
              <button type="button" className="wf-btn wf-btn--primary ap-add-cta" style={{ width: "auto", cursor: "pointer" }} onClick={() => setFlowOpen(true)}>
                <span className="ct-ico">{APP_ICO.plus}</span>Adicionar produtos
              </button>
            </div>

            <div className="ct-cur-list ap-baselist">
              {items.map((it) => (
                <div key={it.id} className={justAdded.includes(it.id) ? "ap-just-added" : ""}><ApBaseItem it={it} /></div>
              ))}
            </div>
            <div className="pd-tablefoot"><span className="pd-count"><b>{items.length}</b> produtos no catálogo</span></div>
          </div>
        </div>
      </div>

      {flowOpen && Flow && <Flow available={available} onConfirm={onConfirm} onClose={() => setFlowOpen(false)} />}

      {toast && <div className="ct-toast-anchor"><div className="wf-toast is-ok"><span className="wf-tick">{window.WF_I.check}</span><span>{toast}</span></div></div>}
    </div>
  );
}

window.AddCatalogApp = AddCatalogApp;
