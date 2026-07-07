/* Inventto — Protótipo · Abordagem B · DIALOG INTELIGENTE (modal único, adaptativo).
   Combobox de seleção no topo → cards em accordion aparecem conforme você escolhe.
   Produto simples = só preço; com variantes = modo + lista. Sem etapas. */

const { PRODUCTS: B_PRODUCTS, makeDraft: B_makeDraft, isVariantProduct: B_isVar, centsToBRL: B_brl, draftStatus: B_status, isDraftValid: B_valid } = window.AP;
const { ProductConfigBody: B_Body, ApButton: B_Btn, StatusPill: B_Pill, APX: B_ICO } = window.APP;

function ApproachB({ available, onConfirm, onClose }) {
  const [sel, setSel] = useState([]);          // ids na ordem de escolha
  const [drafts, setDrafts] = useState({});
  const [expanded, setExpanded] = useState([]);
  const [open, setOpen] = useState(false);     // dropdown do combobox
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
    setDrafts((prev) => ({ ...prev, [id]: makeDraftFor(id) }));
    setExpanded((e) => [...e, id]);
    setQ(""); setOpen(false);
  };
  const makeDraftFor = (id) => B_makeDraft(B_PRODUCTS.find((p) => p.id === id));
  const remove = (id) => { setSel((s) => s.filter((x) => x !== id)); setExpanded((e) => e.filter((x) => x !== id)); };
  const patch = (id, part) => setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...part } }));
  const toggleExp = (id) => setExpanded((e) => e.includes(id) ? e.filter((x) => x !== id) : [...e, id]);

  const selProducts = sel.map((id) => B_PRODUCTS.find((p) => p.id === id));
  const allValid = selProducts.length > 0 && selProducts.every((p) => drafts[p.id] && B_valid(p, drafts[p.id]));
  const pending = selProducts.filter((p) => !drafts[p.id] || !B_valid(p, drafts[p.id])).length;
  const confirm = () => { setLoading(true); setTimeout(() => onConfirm(sel.map((id) => drafts[id])), 650); };

  return (
    <div className="ap-scrim ap-center" onClick={onClose}>
      <div className="ap-dialog-smart" onClick={(e) => e.stopPropagation()}>
        <div className="ap-dlg-head">
          <div><h2 className="mv-sheet-title">Adicionar produtos</h2><p className="mv-sheet-desc">Escolha os produtos e configure o preço no mesmo lugar. Só entram no catálogo quando tiverem preço de venda.</p></div>
          <button type="button" className="mv-sheet-x ap-x" onClick={onClose}>{B_ICO.x}</button>
        </div>

        <div className="ap-dlg-body">
          {/* combobox */}
          <div className="ap-combo" ref={boxRef}>
            <div className={["ap-combo-in", open ? "is-open" : ""].join(" ")} onClick={() => setOpen(true)}>
              <span className="ap-search-ico">{B_ICO.search}</span>
              <input className="ap-search-in" placeholder={sel.length ? "Adicionar outro produto…" : "Buscar produto ou SKU…"} value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} />
              <span className="ap-combo-chev">{B_ICO.chev}</span>
            </div>
            {open && (
              <div className="ap-combo-pop">
                {pool.length === 0 ? <div className="ap-combo-empty">Nenhum produto disponível.</div> : pool.map((p) => (
                  <button type="button" key={p.id} className="ap-combo-opt" onClick={() => add(p.id)}>
                    <span className="pd-thumb is-sm" />
                    <span className="ap-selmeta"><span className="ap-selname">{p.name}</span><span className="ap-selsku">{p.sku}</span></span>
                    <span className="ap-combo-add">{B_ICO.plus}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* accordions */}
          {sel.length === 0 ? (
            <div className="ap-empty ap-empty-pad">{B_ICO.plus}<p>Nenhum produto selecionado.</p><span>Use a busca acima para adicionar produtos a este catálogo.</span></div>
          ) : (
            <div className="ap-acc-list">
              {selProducts.map((p) => {
                const d = drafts[p.id];
                if (!d) return null;
                const st = B_status(p, d);
                const isOpen = expanded.includes(p.id);
                const simple = !B_isVar(p);
                return (
                  <div key={p.id} className={["ap-acc", isOpen ? "is-open" : "", `st-${st.status}`].join(" ")}>
                    <div className="ap-acc-head" onClick={() => toggleExp(p.id)}>
                      <span className="pd-thumb is-sm" />
                      <span className="ap-cc-meta"><span className="ap-cc-name">{p.name}</span><span className="ap-cc-sku">{p.sku}{B_isVar(p) ? ` · ${p.variants.length} variantes` : ""}</span></span>
                      {/* preço-resumo quando fechado */}
                      {!isOpen && simple && d.price !== null && <span className="ap-acc-price">R$ {B_brl(d.price)}{d.promo && d.orig ? <span className="ap-acc-was">R$ {B_brl(d.orig)}</span> : null}</span>}
                      <B_Pill status={st.status} />
                      <button type="button" className="ap-acc-x" onClick={(e) => { e.stopPropagation(); remove(p.id); }}>{B_ICO.trash}</button>
                      <span className="ap-acc-chev">{B_ICO.chev}</span>
                    </div>
                    {isOpen && <div className="ap-acc-body"><B_Body p={p} d={d} onChange={(part) => patch(p.id, part)} /></div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="ap-dlg-foot">
          <span className="ap-foot-count">{sel.length === 0 ? "Nenhum produto" : pending > 0 ? <span className="ap-foot-warn">{B_ICO.warn}{pending} sem preço</span> : <span className="ap-foot-ok">{B_ICO.check}Tudo pronto</span>}</span>
          <B_Btn disabled={!allValid} loading={loading} onClick={confirm}>{loading ? "Adicionando…" : `Adicionar ${sel.length || ""} ao catálogo`}</B_Btn>
        </div>
      </div>
    </div>
  );
}

window.ApproachB = ApproachB;
