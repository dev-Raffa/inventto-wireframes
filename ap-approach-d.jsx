/* Inventto — Protótipo · Abordagem D · MASTER–DETAIL (ambiente de configuração).
   Painel esquerdo: produtos selecionados com status + combobox p/ adicionar.
   Painel direito: configuração do produto ativo (preço, promoção, variantes,
   quais variantes entram). Escala para catálogos grandes. */

const { PRODUCTS: D_PRODUCTS, makeDraft: D_makeDraft, isVariantProduct: D_isVar, draftStatus: D_status, isDraftValid: D_valid } = window.AP;
const { ProductConfigBody: D_Body, ApButton: D_Btn, StatusPill: D_Pill, StatusDot: D_Dot, APX: D_ICO } = window.APP;

function ApproachD({ available, onConfirm, onClose }) {
  const [sel, setSel] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  const pool = available.filter((p) => !sel.includes(p.id) && (p.name + p.sku).toLowerCase().includes(q.toLowerCase()));
  const add = (id) => {
    setSel((s) => [...s, id]);
    setDrafts((prev) => ({ ...prev, [id]: D_makeDraft(D_PRODUCTS.find((p) => p.id === id)) }));
    setActive(id); setQ(""); setOpen(false);
  };
  const remove = (id) => {
    setSel((s) => s.filter((x) => x !== id));
    setActive((a) => a === id ? null : a);
  };
  const patch = (id, part) => setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...part } }));

  const selProducts = sel.map((id) => D_PRODUCTS.find((p) => p.id === id));
  const doneCount = selProducts.filter((p) => drafts[p.id] && D_valid(p, drafts[p.id])).length;
  const allValid = selProducts.length > 0 && doneCount === selProducts.length;
  const activeP = active ? D_PRODUCTS.find((p) => p.id === active) : null;
  const confirm = () => { setLoading(true); setTimeout(() => onConfirm(sel.map((id) => drafts[id])), 650); };

  return (
    <div className="ap-scrim ap-center" onClick={onClose}>
      <div className="ap-master" onClick={(e) => e.stopPropagation()}>
        <div className="ap-master-head">
          <h2 className="mv-sheet-title">Adicionar produtos ao catálogo</h2>
          <span className="ap-master-progress">{doneCount}/{selProducts.length || 0} configurados</span>
          <button type="button" className="mv-sheet-x ap-x" onClick={onClose}>{D_ICO.x}</button>
        </div>

        <div className="ap-master-cols">
          {/* MASTER */}
          <div className="ap-master-left">
            <div className="ap-combo" ref={boxRef}>
              <div className={["ap-combo-in", open ? "is-open" : ""].join(" ")} onClick={() => setOpen(true)}>
                <span className="ap-search-ico">{D_ICO.plus}</span>
                <input className="ap-search-in" placeholder="Adicionar produto…" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} />
              </div>
              {open && (
                <div className="ap-combo-pop">
                  {pool.length === 0 ? <div className="ap-combo-empty">Nenhum produto disponível.</div> : pool.map((p) => (
                    <button type="button" key={p.id} className="ap-combo-opt" onClick={() => add(p.id)}>
                      <span className="pd-thumb is-sm" />
                      <span className="ap-selmeta"><span className="ap-selname">{p.name}</span><span className="ap-selsku">{p.sku}</span></span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="ap-master-listwrap">
              {sel.length === 0 ? (
                <div className="ap-master-emptyleft">Nenhum produto ainda.<br />Use “Adicionar produto”.</div>
              ) : (
                <div className="ap-master-list">
                  {selProducts.map((p) => {
                    const d = drafts[p.id];
                    if (!d) return null;
                    const st = D_status(p, d);
                    return (
                      <button type="button" key={p.id} className={["ap-master-item", active === p.id ? "is-active" : ""].join(" ")} onClick={() => setActive(p.id)}>
                        <D_Dot status={st.status} />
                        <span className="ap-cc-meta"><span className="ap-cc-name">{p.name}</span><span className="ap-cc-sku">{st.reason}</span></span>
                        <span className="ap-master-rm" onClick={(e) => { e.stopPropagation(); remove(p.id); }}>{D_ICO.trash}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* DETAIL */}
          <div className="ap-master-right">
            {!activeP ? (
              <div className="ap-master-emptyright">
                <span className="ap-master-empty-ico">{window.APP.AP_I.layers}</span>
                <p>Selecione um produto à esquerda para configurar.</p>
                <span>{sel.length === 0 ? "Comece adicionando produtos ao catálogo." : "Cada produto precisa de preço de venda para entrar."}</span>
              </div>
            ) : (
              <div className="ap-master-detail">
                <div className="ap-detail-head">
                  <span className="pd-thumb" />
                  <span className="ap-cc-meta"><span className="ap-detail-name">{activeP.name}</span><span className="ap-cc-sku">{activeP.sku}{D_isVar(activeP) ? ` · ${activeP.variants.length} variantes` : ""}</span></span>
                  <D_Pill status={D_status(activeP, drafts[active]).status} />
                </div>
                <div className="ap-detail-body">
                  <D_Body p={activeP} d={drafts[active]} onChange={(part) => patch(active, part)} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ap-master-foot">
          <span className="ap-foot-count">{selProducts.length === 0 ? "Nenhum produto" : allValid ? <span className="ap-foot-ok">{D_ICO.check}Todos configurados</span> : <span className="ap-foot-warn">{D_ICO.warn}{selProducts.length - doneCount} pendente(s)</span>}</span>
          <D_Btn disabled={!allValid} loading={loading} onClick={confirm}>{loading ? "Adicionando…" : `Adicionar ${selProducts.length || ""} ao catálogo`}</D_Btn>
        </div>
      </div>
    </div>
  );
}

window.ApproachD = ApproachD;
