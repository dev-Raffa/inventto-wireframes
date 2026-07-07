/* Inventto — Protótipo · Abordagem C · SIDE SHEET MULTI-STEP (lateral direita).
   Mantém o Side Sheet atual e o transforma em 2 etapas dentro do MESMO componente.
   Etapa 1 seleção · Etapa 2 configuração com indicador de status por produto;
   "Adicionar ao catálogo" fica desabilitado até tudo estar válido. */

const { PRODUCTS: C_PRODUCTS, makeDraft: C_makeDraft, isVariantProduct: C_isVar, draftStatus: C_status, isDraftValid: C_valid } = window.AP;
const { SelectRow: C_Row, ProductConfigBody: C_Body, ApButton: C_Btn, StatusPill: C_Pill, APX: C_ICO } = window.APP;

function ApproachC({ available, onConfirm, onClose }) {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState([]);

  const filtered = available.filter((p) => (p.name + p.sku).toLowerCase().includes(q.toLowerCase()));
  const toggle = (id) => {
    setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
    setDrafts((d) => d[id] ? d : { ...d, [id]: C_makeDraft(C_PRODUCTS.find((p) => p.id === id)) });
  };
  const goConfig = () => {
    setDrafts((prev) => { const n = { ...prev }; sel.forEach((id) => { if (!n[id]) n[id] = C_makeDraft(C_PRODUCTS.find((p) => p.id === id)); }); return n; });
    setExpanded(sel.slice()); setStep(2);
  };
  const patch = (id, part) => setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...part } }));
  const toggleExp = (id) => setExpanded((e) => e.includes(id) ? e.filter((x) => x !== id) : [...e, id]);

  const selProducts = sel.map((id) => C_PRODUCTS.find((p) => p.id === id));
  const doneCount = selProducts.filter((p) => drafts[p.id] && C_valid(p, drafts[p.id])).length;
  const allValid = selProducts.length > 0 && doneCount === selProducts.length;
  const confirm = () => { setLoading(true); setTimeout(() => onConfirm(sel.map((id) => drafts[id])), 650); };

  return (
    <div className="ap-scrim" onClick={onClose}>
      <div className="mv-sheet ap-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="mv-sheet-head ap-sheet-head">
          <h2 className="mv-sheet-title">Adicionar produtos</h2>
          <button type="button" className="mv-sheet-x ap-x" onClick={onClose}>{C_ICO.x}</button>
          <div className="ap-sheet-steps">
            <span className={["ap-sheet-step", step >= 1 ? "is-on" : ""].join(" ")}><span className="ap-sheet-num">{step > 1 ? C_ICO.check : "1"}</span>Selecionar</span>
            <span className="ap-sheet-seg" data-on={step > 1} />
            <span className={["ap-sheet-step", step === 2 ? "is-on" : ""].join(" ")}><span className="ap-sheet-num">2</span>Configurar</span>
          </div>
        </div>

        {step === 1 ? (
          <div className="mv-sheet-body ap-sheet-body">
            <div className="ap-search"><span className="ap-search-ico">{C_ICO.search}</span><input className="ap-search-in" placeholder="Buscar produto ou SKU…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <div className="ap-sellist">
              {filtered.length === 0
                ? <div className="ap-empty">{C_ICO.search}<p>Nenhum produto encontrado.</p></div>
                : filtered.map((p) => <C_Row key={p.id} p={p} checked={sel.includes(p.id)} onToggle={() => toggle(p.id)} />)}
            </div>
          </div>
        ) : (
          <div className="mv-sheet-body ap-sheet-body">
            <div className="ap-progress-row">
              <span className="ap-progress-txt"><b>{doneCount}</b> de <b>{selProducts.length}</b> configurados</span>
              <span className="ap-progress-track"><span className="ap-progress-fill" style={{ width: `${(doneCount / selProducts.length) * 100}%` }} /></span>
            </div>
            <div className="ap-cfg-rows">
              {selProducts.map((p) => {
                const d = drafts[p.id];
                if (!d) return null;
                const st = C_status(p, d);
                const isOpen = expanded.includes(p.id);
                return (
                  <div key={p.id} className={["ap-cfg-row", `st-${st.status}`, isOpen ? "is-open" : ""].join(" ")}>
                    <button type="button" className="ap-cfg-rowhead" onClick={() => toggleExp(p.id)}>
                      <span className="ap-statusdot" data-st={st.status} />
                      <span className="pd-thumb is-sm" />
                      <span className="ap-cc-meta"><span className="ap-cc-name">{p.name}</span><span className="ap-cc-sku">{st.reason}</span></span>
                      <C_Pill status={st.status} compact />
                      <span className="ap-acc-chev">{C_ICO.chev}</span>
                    </button>
                    {isOpen && <div className="ap-cfg-rowbody"><C_Body p={p} d={d} onChange={(part) => patch(p.id, part)} /></div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mv-sheet-foot ap-sheet-foot">
          {step === 1 ? (
            <>
              <span className="ap-foot-count"><b>{sel.length}</b> selecionado(s)</span>
              <C_Btn disabled={sel.length === 0} onClick={goConfig}>Continuar {C_ICO.arrow}</C_Btn>
            </>
          ) : (
            <>
              <button type="button" className="wf-btn wf-btn--ghost ap-back" style={{ width: "auto", cursor: "pointer" }} onClick={() => setStep(1)}>Voltar</button>
              <C_Btn disabled={!allValid} loading={loading} onClick={confirm}>{loading ? "Adicionando…" : "Adicionar ao catálogo"}</C_Btn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

window.ApproachC = ApproachC;
