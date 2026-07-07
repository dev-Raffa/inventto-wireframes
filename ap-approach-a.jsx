/* Inventto — Protótipo · Abordagem A · WIZARD (2 etapas, modal centrado).
   Etapa 1 seleção → Etapa 2 configuração → Adicionar. Linear e sequencial:
   sem status por linha, foco em quem está aprendendo. */

const { PRODUCTS: A_PRODUCTS, makeDraft: A_makeDraft, isVariantProduct: A_isVar, draftStatus: A_status, isDraftValid: A_valid } = window.AP;
const { SelectRow: A_Row, ProductConfigBody: A_Body, ApButton: A_Btn, StatusPill: A_Pill, APX: A_ICO } = window.APP;

function ApproachA({ available, onConfirm, onClose }) {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = available.filter((p) => (p.name + p.sku).toLowerCase().includes(q.toLowerCase()));
  const toggle = (id) => {
    setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
    setDrafts((d) => d[id] ? d : { ...d, [id]: A_makeDraft(A_PRODUCTS.find((p) => p.id === id)) });
  };

  const goConfig = () => {
    setDrafts((prev) => {
      const next = { ...prev };
      sel.forEach((id) => { if (!next[id]) next[id] = A_makeDraft(A_PRODUCTS.find((p) => p.id === id)); });
      return next;
    });
    setStep(2);
  };
  const patch = (id, part) => setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...part } }));

  const selProducts = sel.map((id) => A_PRODUCTS.find((p) => p.id === id));
  const allValid = selProducts.every((p) => drafts[p.id] && A_valid(p, drafts[p.id]));
  const pendingCount = selProducts.filter((p) => !drafts[p.id] || !A_valid(p, drafts[p.id])).length;

  const confirm = () => {
    setLoading(true);
    setTimeout(() => onConfirm(sel.map((id) => drafts[id])), 650);
  };

  return (
    <div className="ap-scrim ap-center" onClick={onClose}>
      <div className="ap-wizard" onClick={(e) => e.stopPropagation()}>
        <div className="ap-wiz-head">
          <div className="ap-wiz-steps">
            <span className={["ap-wiz-step", step === 1 ? "is-on" : "is-done"].join(" ")}><span className="ap-wiz-num">{step > 1 ? A_ICO.check : "1"}</span>Selecionar</span>
            <span className="ap-wiz-line" />
            <span className={["ap-wiz-step", step === 2 ? "is-on" : ""].join(" ")}><span className="ap-wiz-num">2</span>Configurar preços</span>
          </div>
          <button type="button" className="mv-sheet-x ap-x" onClick={onClose}>{A_ICO.x}</button>
        </div>

        {step === 1 ? (
          <div className="ap-wiz-body">
            <div className="ap-search"><span className="ap-search-ico">{A_ICO.search}</span><input className="ap-search-in" placeholder="Buscar produto ou SKU…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <div className="ap-sellist">
              {filtered.length === 0
                ? <div className="ap-empty">{A_ICO.search}<p>Nenhum produto encontrado.</p><span>Ajuste a busca ou cadastre o produto em Produtos.</span></div>
                : filtered.map((p) => <A_Row key={p.id} p={p} checked={sel.includes(p.id)} onToggle={() => toggle(p.id)} />)}
            </div>
          </div>
        ) : (
          <div className="ap-wiz-body">
            <p className="ap-wiz-lead">Defina o preço de venda de cada produto. O preço vem do cadastro — ajuste se este catálogo tiver preço diferente. O <b>preço original</b> é opcional, só para promoção.</p>
            <div className="ap-configstack">
              {selProducts.map((p) => {
                const d = drafts[p.id];
                if (!d) return null;
                const st = A_status(p, d);
                return (
                  <div key={p.id} className="ap-configcard">
                    <div className="ap-configcard-head">
                      <span className="pd-thumb is-sm" />
                      <span className="ap-cc-meta"><span className="ap-cc-name">{p.name}</span><span className="ap-cc-sku">{p.sku}{A_isVar(p) ? ` · ${p.variants.length} variantes` : ""}</span></span>
                      <A_Pill status={st.status} />
                    </div>
                    <div className="ap-configcard-body">
                      <A_Body p={p} d={d} onChange={(part) => patch(p.id, part)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="ap-wiz-foot">
          {step === 1 ? (
            <>
              <span className="ap-foot-count"><b>{sel.length}</b> selecionado(s)</span>
              <ApButton disabled={sel.length === 0} onClick={goConfig}>Continuar {A_ICO.arrow}</ApButton>
            </>
          ) : (
            <>
              <button type="button" className="wf-btn wf-btn--ghost ap-back" style={{ width: "auto", cursor: "pointer" }} onClick={() => setStep(1)}>Voltar</button>
              <span className="ap-foot-count">{pendingCount > 0 ? <span className="ap-foot-warn">{A_ICO.warn}{pendingCount} sem preço</span> : <span className="ap-foot-ok">{A_ICO.check}Tudo pronto</span>}</span>
              <ApButton disabled={!allValid} loading={loading} onClick={confirm}>{loading ? "Adicionando…" : `Adicionar ${sel.length} ao catálogo`}</ApButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

window.ApproachA = ApproachA;
