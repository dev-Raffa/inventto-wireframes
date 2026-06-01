/* Inventto — Wireframe · Módulo Produtos (Superfície 2 · 2.3)
   Tela 2.3.1 Lista / busca de produtos (/produtos): desktop (tabela + sub-row +
   tooltip/popover de estoque) e mobile (cards). Reusa o kit (window.WF_*) e a
   casca (window.SH). Exporta em window.PROD. */

const { Sidebar, TopHeader, SH_I } = window.SH;

/* ── ícones lo-fi (lucide-like, 1.6 stroke) ───────────── */
const pic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const PROD_I = {
  plus: pic(<path d="M12 5v14M5 12h14" />),
  search: pic(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></>),
  chevDown: pic(<path d="m6 9 6 6 6-6" />),
  chevsUpDown: pic(<path d="m7 15 5 5 5-5M7 9l5-5 5 5" />),
  chevUp: pic(<path d="m6 15 6-6 6 6" />),
  chevL: pic(<path d="m15 6-6 6 6 6" />),
  chevR: pic(<path d="m9 6 6 6-6 6" />),
  moreVert: pic(<><circle cx="12" cy="5" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="19" r="1.4" /></>),
  circleCheck: pic(<><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5L16 9" /></>),
  triangleAlert: pic(<><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>),
  circleX: pic(<><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" /></>),
  ban: pic(<><circle cx="12" cy="12" r="9" /><path d="m5.6 5.6 12.8 12.8" /></>),
  pencil: pic(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>),
  eye: pic(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>),
  history: pic(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><path d="M12 8v4l3 2" /></>),
  swap: pic(<><path d="M8 4 4 8l4 4M4 8h12M16 20l4-4-4-4M20 16H8" /></>),
  eyeOff: pic(<><path d="M9.9 5.1A9 9 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-2.9 3.8M6.2 6.2A16 16 0 0 0 2 12s3.5 7 10 7a9 9 0 0 0 3.6-.7" /><path d="m3 3 18 18M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>),
  package: pic(<><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" /><path d="m3 7 9 5 9-5M12 12v10" /></>),
  x: pic(<path d="M6 6 18 18M18 6 6 18" />),
  check: pic(<path d="M20 6 9 17l-5-5" />),
  imagePlus: pic(<><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" /><path d="M16 5h6M19 2v6" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>),
  star: pic(<path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55l-5.91 3.11 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z" />),
  starFill: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"><path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55l-5.91 3.11 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z" /></svg>,
  gripV: pic(<><circle cx="9" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="18" r="1" /></>),
  upload: pic(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5" /></>),
  download: pic(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 10l5 5 5-5" /></>),
  info: pic(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>),
  boxes: pic(<><path d="M2.5 8 7 5.5 11.5 8 7 10.5 2.5 8ZM12.5 8 17 5.5 21.5 8 17 10.5 12.5 8Z" /><path d="M7 16 11.5 13.5 16 16" /></>)
};

/* ── status de estoque (DS §1.2 — versões dessaturadas) ── */
const STK = {
  healthy: { label: "Saudável", icon: "circleCheck", cls: "is-healthy", st: "st-healthy" },
  warning: { label: "Atenção", icon: "triangleAlert", cls: "is-warning", st: "st-warning" },
  critical: { label: "Crítico", icon: "circleX", cls: "is-critical", st: "st-critical" },
  zeroed: { label: "Zerado", icon: "ban", cls: "is-zeroed", st: "st-zeroed" },
  inactive: { label: "Inativo", icon: "eyeOff", cls: "is-inactive", st: "" }
};

/* ── dados de exemplo (org ativa: Ateliê Joana) ───────── */
const CAMISA_VARS = [
{ sku: "CS-ALG-BR-P", color: "#f1ede5", cor: "Branco", tam: "P", stock: 30, min: 5, status: "healthy" },
{ sku: "CS-ALG-BR-M", color: "#f1ede5", cor: "Branco", tam: "M", stock: 12, min: 4, status: "healthy" },
{ sku: "CS-ALG-PR-P", color: "#2c2a28", cor: "Preto", tam: "P", stock: 4, min: 6, status: "critical" },
{ sku: "CS-ALG-PR-M", color: "#2c2a28", cor: "Preto", tam: "M", stock: 0, min: 6, status: "zeroed" },
{ sku: "CS-ALG-AR-M", color: "#cbb894", cor: "Areia", tam: "M", stock: 18, min: 5, status: "healthy" }];


const PRODUCTS = [
{ id: "vestido", name: "Vestido Linho Areia", sku: "VL-AREIA-01", cats: ["Vestidos", "Verão"], type: "simple", stock: 45, min: 10, status: "healthy" },
{ id: "camisa", name: "Camisa Social Algodão", sku: "CS-ALG", cats: ["Camisas"], type: "var", min: 6, variants: CAMISA_VARS },
{ id: "bolsa", name: "Bolsa Tote Lona", sku: "BT-LONA", cats: ["Acessórios"], type: "simple", stock: 14, min: 12, status: "warning" },
{ id: "calca", name: "Calça Alfaiataria", sku: "CA-ALF-02", cats: ["Calças", "Alfaiataria"], type: "simple", stock: 6, min: 8, status: "critical" },
{ id: "lenco", name: "Lenço de Seda Estampado", sku: "LS-EST-03", cats: ["Acessórios"], type: "simple", stock: 0, min: 5, status: "zeroed" },
{ id: "jaqueta", name: "Jaqueta Jeans Vintage", sku: "JJ-VTG", cats: ["Jaquetas"], type: "simple", stock: 0, min: 0, status: "inactive" }];


/* resumo da grade: { healthy, warning, critical, zeroed, total } */
function gradeSummary(variants) {
  const s = { healthy: 0, warning: 0, critical: 0, zeroed: 0, total: 0 };
  variants.forEach((v) => {s[v.status] += 1;s.total += v.stock;});
  return s;
}

/* estado mais crítico da grade (zerado → crítico → atenção → saudável) */
function worstVariantStatus(variants) {
  const order = ["zeroed", "critical", "warning", "healthy"];
  return order.find((k) => variants.some((v) => v.status === k)) || "healthy";
}

/* ════ PRIMITIVOS ══════════════════════════════════════ */
const PdStatusBadge = ({ status }) => {
  const s = STK[status];
  return <span className={["pd-statusbadge", s.cls].join(" ")}>{PROD_I[s.icon]}{s.label}</span>;
};

const PdCatBadges = ({ cats }) =>
<span className="pd-cats">{cats.map((c) => <span key={c} className="pd-catbadge">{c}</span>)}</span>;


/* select compacto (filtro) */
function PdSelect({ value, placeholder }) {
  return (
    <span className={["pd-select", value ? "" : "is-placeholder"].join(" ")} style={{ width: "120px" }}>
      <span className="pd-grow">{value || placeholder}</span>
      <span className="pd-chev">{PROD_I.chevDown}</span>
    </span>);

}

/* tooltip de estoque — produto simples */
function PdStockPop({ p }) {
  const s = STK[p.status];
  return (
    <div className="pd-pop">
      <span className={["pd-pop-badge", s.st].join(" ")}>{PROD_I[s.icon]}<span style={{ color: "#fff" }}>{s.label}</span></span>
      <div className="pd-pop-row"><span className="pd-pop-k">Estoque atual</span><span className="pd-pop-v">{p.stock}</span></div>
      <div className="pd-pop-row"><span className="pd-pop-k">Estoque mínimo</span><span className="pd-pop-v">{p.min}</span></div>
    </div>);

}

/* popover de estoque — produto com variações (resumo da grade) */
function PdGradePop({ p }) {
  const sum = gradeSummary(p.variants);
  const order = ["healthy", "warning", "critical", "zeroed"];
  return (
    <div className="pd-pop" style={{ width: 210 }}>
      <p className="pd-pop-title">Resumo da grade</p>
      {order.filter((k) => sum[k] > 0).map((k) => {
        const s = STK[k];
        return (
          <div className="pd-pop-row" key={k}>
            <span className="pd-pop-k"><span className={s.st}>{PROD_I[s.icon]}</span>{s.label}</span>
            <span className="pd-pop-v">{sum[k]}</span>
          </div>);

      })}
      <div className="pd-pop-total">Total físico: {sum.total} un.</div>
    </div>);

}

/* ícone de estoque (simples) — só ícone do estado */
function PdStockIcon({ p, open }) {
  const s = STK[p.status];
  return (
    <span className="pd-pop-anchor">
      <span className="pd-stockicon">
        <span className={s.st}>{PROD_I[s.icon]}</span>
      </span>
      {open && <PdStockPop p={p} />}
    </span>);

}

/* ícone de estoque (grade) — ícone do estado mais crítico da grade */
function PdGradeIcon({ p, open }) {
  const s = STK[worstVariantStatus(p.variants)];
  return (
    <span className="pd-pop-anchor">
      <span className="pd-stockicon">
        <span className={s.st}>{PROD_I[s.icon]}</span>
      </span>
      {open && <PdGradePop p={p} />}
    </span>);

}

/* badge de status do produto (ativo / inativo) */
const PdProductStatusBadge = ({ active }) =>
active ?
<span className="pd-statusbadge is-active">{PROD_I.circleCheck}Ativo</span> :
<span className="pd-statusbadge is-inactive">{PROD_I.eyeOff}Inativo</span>;

/* resumo compacto de grade (ícones por estado) — variações */
function PdGradeIcons({ p, open }) {
  const sum = gradeSummary(p.variants);
  const order = ["critical", "zeroed", "warning", "healthy"];
  return (
    <span className="pd-pop-anchor">
      <span className="pd-gradesum">
        {order.filter((k) => sum[k] > 0).map((k) => {
          const s = STK[k];
          return <span key={k} className={["pd-gs-i", s.st].join(" ")}>{PROD_I[s.icon]}{sum[k]}</span>;
        })}
      </span>
      {open && <PdGradePop p={p} />}
    </span>);

}

/* DropdownMenu de ações (Manager/Owner) */
function PdActionsMenu() {
  const items = [
  ["pencil", "Editar"],
  ["eye", "Ver detalhes"],
  ["history", "Histórico de movimentações"],
  ["swap", "Registrar movimentação"]];

  return (
    <div className="pd-menu wf">
      {items.map(([ic, label]) =>
      <div className="pd-menu-item" key={label}><span className="pd-mi-ico">{PROD_I[ic]}</span>{label}</div>
      )}
      <div className="pd-menu-sep" />
      <div className="pd-menu-item is-danger"><span className="pd-mi-ico">{PROD_I.eyeOff}</span>Inativar</div>
    </div>);

}

const PdActBtn = () => <span className="pd-actbtn">{PROD_I.moreVert}</span>;

/* ── sub-row de variantes (desktop) ───────────────────── */
const GRADE_LEGEND = [["healthy", "Saudável"], ["warning", "Atenção"], ["critical", "Crítico"], ["zeroed", "Zerado"]];

function PdSubRow({ p }) {
  const sum = gradeSummary(p.variants);
  return (
    <tr className="pd-subrow">
      <td colSpan={6}>
        <div className="pd-vcard-wrap">
          <div className="pd-vcard-head">
            <span className="pd-vcard-title">{p.variants.length} variantes · {sum.total} un. em estoque</span>
            <span className="pd-vcard-legend">
              {GRADE_LEGEND.map(([k, lbl]) =>
              <span className="pd-leg" key={k}><span className={["pd-leg-dot", STK[k].st].join(" ")} />{lbl}</span>
              )}
            </span>
          </div>
          <div className="pd-vcard">
            <div className="pd-vrow pd-vrow-head">
              <span className="pd-vc-thumb" />
              <span className="pd-vc-sku">SKU</span>
              <span className="pd-vc-att">Atributos</span>
              <span className="pd-vc-stk">Estoque</span>
            </div>
            {p.variants.map((v) => {
              const s = STK[v.status];
              return (
                <div className={["pd-vrow", v.status === "zeroed" ? "is-zeroed" : ""].join(" ")} key={v.sku}>
                  <span className="pd-vc-thumb"><span className="pd-vthumb" style={{ background: v.color }} /></span>
                  <span className="pd-vc-sku"><span className="pd-vsku">{v.sku}</span></span>
                  <span className="pd-vc-att">
                    <span className="pd-vchip"><span className="pd-swatch" style={{ background: v.color }} aria-label={`Cor: ${v.cor}`} /><span className="pd-vchip-v">{v.cor}</span></span>
                    <span className="pd-vchip"><span className="pd-vchip-k">Tam</span><span className="pd-vchip-v">{v.tam}</span></span>
                  </span>
                  <span className="pd-vc-stk">
                    <span className={["pd-vstk-icon", s.st].join(" ")} title={s.label}>{PROD_I[s.icon]}</span>
                    <span className="pd-vstk-total">{v.stock}</span>
                    <span className="pd-vstk-min">(Mín {v.min})</span>
                  </span>
                </div>);

            })}
          </div>
        </div>
      </td>
    </tr>);

}

/* ── linha da tabela (desktop) ────────────────────────── */
function PdRow({ p, last, expanded, popOpen, role = "owner" }) {
  const isVar = p.type === "var";
  const status = isVar ? "var" : p.status;
  const dim = p.status === "inactive";
  const canAct = role !== "sales";
  return (
    <>
      <tr className={[last && !expanded ? "is-last" : "", dim ? "is-dim" : ""].join(" ")}>
        <td className="pd-chevcell">
          {isVar &&
          <span className={["pd-rowchev", expanded ? "is-open" : ""].join(" ")} aria-expanded={!!expanded} aria-label="Expandir variações">{PROD_I.chevR}</span>
          }
        </td>
        <td>
          <div className="pd-prod">
            <span className="pd-thumb" />
            <span className="pd-prod-meta">
              <span className="pd-prod-name">{p.name}</span>
              <span className="pd-prod-sku">{p.sku}</span>
              {isVar &&
              <span className="pd-prod-var">{p.variants.length} variações</span>
              }
            </span>
          </div>
        </td>
        <td><PdCatBadges cats={p.cats} /></td>
        <td className="pd-stockcell">
          {isVar ? <PdGradeIcon p={p} open={popOpen} /> : <PdStockIcon p={p} open={popOpen} />}
        </td>
        <td>
          <PdProductStatusBadge active={p.status !== "inactive"} />
        </td>
        <td className="pd-actcell">{canAct && <PdActBtn />}</td>
      </tr>
      {isVar && expanded && <PdSubRow p={p} />}
    </>);

}

/* ── barra de filtros (desktop) ───────────────────────── */
function PdFilters({ term, role = "owner" }) {
  return (
    <div className="pd-filters">
      <span className="pd-search"><WInput placeholder="Buscar por nome ou SKU" value={term} trail={PROD_I.search} /></span>
      <span className="pd-filter"><PdSelect value="Todas as categorias" /></span>
      <span className="pd-filter"><PdSelect value="Todos os status" /></span>
      {role !== "sales" &&
      <span className="pd-filter-cta">
        <WBtn variant="outline"><span className="pd-ico">{PROD_I.download}</span>Importar</WBtn>
        <WBtn><span className="pd-ico">{PROD_I.plus}</span>Cadastrar</WBtn>
      </span>
      }
    </div>);

}

/* ── tabela ───────────────────────────────────────────── */
function PdTable({ rows, empty, term, role }) {
  return (
    <div className="pd-tablewrap">
      <table className="pd-table">
        <thead>
          <tr>
            <th scope="col" className="pd-chevcol" aria-hidden="true"></th>
            <th scope="col" style={{ width: "36%" }}>Produto</th>
            <th scope="col">Categorias</th>
            <th scope="col" className="is-center">Estoque</th>
            <th scope="col">Status</th>
            <th scope="col" className="is-right">Ações</th>
          </tr>
        </thead>
        {!empty && <tbody>{rows}</tbody>}
      </table>
      {empty &&
      <div className="pd-empty">
          <div className="pd-empty-ico">{PROD_I.search}</div>
          <p className="pd-empty-title">Nada encontrado para “{term}”</p>
          <p className="pd-empty-text">Tente outro termo ou ajuste os filtros de categoria e status.</p>
        </div>
      }
    </div>);

}

/* ════ Conteúdo da tela /produtos (desktop) ════════════
   scenario: base · empty(filtro) · firstrun(vazio) · expanded · pop · popgrade */
function PdList({ scenario = "base", role = "owner", term }) {
  if (scenario === "firstrun") {
    return (
      <div className="pd-col">
        <PdHead role={role} />
        <PdFilters role={role} />
        <div className="pd-tablewrap">
          <div className="pd-empty">
            <div className="pd-empty-ico">{PROD_I.package}</div>
            <p className="pd-empty-title">Comece cadastrando seu primeiro produto.</p>
            <p className="pd-empty-text">Produtos aparecem aqui com saldo, status e categorias. Cadastre o primeiro para começar.</p>
            {role !== "sales" && <WBtn><span style={{ display: "inline-flex", marginRight: 2 }}>{PROD_I.plus}</span>Cadastrar produto</WBtn>}
          </div>
        </div>
      </div>);

  }

  const isEmpty = scenario === "empty";
  const expandedId = scenario === "expanded" || scenario === "popgrade" ? "camisa" : null;
  const popId = scenario === "pop" ? "calca" : scenario === "popgrade" ? "camisa" : null;

  const rows = PRODUCTS.map((p, i) =>
  <PdRow key={p.id} p={p} role={role} last={i === PRODUCTS.length - 1}
  expanded={p.id === expandedId} popOpen={p.id === popId} />
  );

  return (
    <div className="pd-col">
      <PdHead role={role} />
      <PdFilters term={isEmpty ? "guarda-chuva" : term} role={role} />
      <PdTable rows={rows} empty={isEmpty} term="guarda-chuva" role={role} />
      {!isEmpty &&
      <div className="pd-tablefoot">
          <span className="pd-count"><b>{PRODUCTS.length}</b> produtos</span>
          <span className="pd-pager">
            <span className="pd-pagebtn is-disabled">{PROD_I.chevL}</span>
            <span className="pd-count" style={{ margin: "0 4px" }}>1 de 1</span>
            <span className="pd-pagebtn is-disabled">{PROD_I.chevR}</span>
          </span>
        </div>
      }
    </div>);

}

function PdHead({ role }) {
  return (
    <div className="pd-headrow">
      <div>
        <h1 className="wf-h1" style={{ fontSize: 27 }}>Produtos</h1>
        <p className="pd-head-sub">Localize produtos, consulte o estado do estoque e gerencie o catálogo da organização.</p>
      </div>
    </div>);

}

/* ── shell completa (desktop) ─────────────────────────── */
function PdListShell({ scenario, role = "owner", collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "pd-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role={role} active="produtos" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Produtos"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <PdList scenario={scenario} role={role} />
        </div>
      </div>
    </div>);

}

/* ── skeleton (carregando) ────────────────────────────── */
function PdListLoading() {
  return (
    <div className="pd-col">
      <div className="wf-sk" style={{ width: 160, height: 26 }} />
      <div className="wf-sk" style={{ width: 340, height: 11, marginTop: 11 }} />
      <div style={{ display: "flex", gap: 10, margin: "24px 0 16px" }}>
        <div className="wf-sk" style={{ flex: 1, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 184, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 184, height: 40, borderRadius: 9 }} />
      </div>
      <div className="pd-tablewrap">
        {[0, 1, 2, 3, 4].map((i) =>
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderBottom: i < 4 ? "1px solid var(--wf-line-soft)" : "0" }}>
            <span className="wf-sk" style={{ width: 42, height: 42, borderRadius: 8, flex: "0 0 auto" }} />
            <div style={{ flex: 1 }}>
              <div className="wf-sk" style={{ width: 170, height: 11 }} />
              <div className="wf-sk" style={{ width: 90, height: 9, marginTop: 7 }} />
            </div>
            <span className="wf-sk" style={{ width: 120, height: 22, borderRadius: 999, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 54, height: 22, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 92, height: 24, borderRadius: 999, flex: "0 0 auto" }} />
          </div>
        )}
      </div>
    </div>);

}

/* ════ MOBILE (~390px) ═════════════════════════════════ */
function PdMCardSimple({ p, role }) {
  const s = STK[p.status];
  const dim = p.status === "inactive";
  return (
    <div className={["pd-mcard", dim ? "is-dim" : ""].join(" ")}>
      <div className="pd-mcard-img">
        <span className="pd-img-label">imagem de destaque · 4:3</span>
        {role !== "sales" && <span className="pd-mcard-more">{PROD_I.moreVert}</span>}
      </div>
      <div className="pd-mcard-body">
        <div>
          <div className="pd-mcard-name">{p.name}</div>
          <div className="pd-mcard-sku">{p.sku}</div>
        </div>
        <PdCatBadges cats={p.cats} />
      </div>
      <div className="pd-mcard-foot">
        <span className="pd-mcard-saldo"><span className={s.st}>{PROD_I[s.icon]}</span>{p.status === "inactive" ? "Inativo" : `${p.stock}uni`}</span>
        {p.status !== "inactive" && <span className="pd-mcard-min">mín {p.min}</span>}
      </div>
    </div>);

}

function PdMCardVar({ p, role, expanded }) {
  const sum = gradeSummary(p.variants);
  const order = ["critical", "zeroed", "warning", "healthy"];
  return (
    <div className="pd-mcard">
      <div className="pd-mcard-img">
        <span className="pd-img-label">imagem de destaque · 4:3</span>
        {role !== "sales" && <span className="pd-mcard-more">{PROD_I.moreVert}</span>}
      </div>
      <div className="pd-mcard-body">
        <div>
          <div className="pd-mcard-name">{p.name}</div>
          <div className="pd-mcard-sku">{p.sku}</div>
        </div>
        <PdCatBadges cats={p.cats} />
      </div>
      <div className="pd-mvar-toggle">
        <span className="pd-mvar-sum">
          {order.filter((k) => sum[k] > 0).map((k) => {
            const s = STK[k];
            return <span key={k} className={["pd-gs-i", s.st].join(" ")} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12.5, fontWeight: 600 }}>{PROD_I[s.icon]}{sum[k]}</span>;
          })}
        </span>
        <span className="pd-prod-var" aria-expanded={!!expanded} style={{ marginTop: 0 }}>
          {p.variants.length} variações<span className="pd-varchev" style={expanded ? { transform: "rotate(180deg)" } : null}>{PROD_I.chevDown}</span>
        </span>
      </div>
      {expanded &&
      <div className="pd-mvar-list">
          {p.variants.map((v) => {
          const s = STK[v.status];
          return (
            <div key={v.sku} className={["pd-mvar-row", v.status === "zeroed" ? "is-zeroed" : ""].join(" ")}>
                <span className="pd-vsku">{v.sku}</span>
                <span className={["pd-vstock", s.st].join(" ")}>
                  <span className="pd-vstock-ico">{PROD_I[s.icon]}</span>
                  <span className="pd-vstock-total">{v.stock}</span>
                  <span className="pd-vstock-min">(Mín {v.min})</span>
                </span>
              </div>);

        })}
        </div>
      }
    </div>);

}

function PdListMobile({ role = "owner", expandedVar }) {
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 22 }}>Produtos</h1>
          {role !== "sales" &&
          <span style={{ display: "flex", gap: 8 }}>
            <span className="pd-iconcta is-outline" aria-label="Importar produtos">{PROD_I.download}</span>
            <span className="pd-iconcta" aria-label="Cadastrar produto">{PROD_I.plus}</span>
          </span>
          }
        </div>
        <div className="pd-filters-stack">
          <span className="wf-input" style={{ color: "var(--wf-faint)" }}><span className="wf-grow">Buscar por nome ou SKU</span><span className="wf-trail">{PROD_I.search}</span></span>
          <div className="pd-filters-grid2">
            <PdSelect value="Todas as categorias" />
            <PdSelect value="Todos os status" />
          </div>
        </div>
        <div className="pd-mcards">
          {PRODUCTS.map((p) =>
          p.type === "var" ?
          <PdMCardVar key={p.id} p={p} role={role} expanded={p.id === expandedVar} /> :
          <PdMCardSimple key={p.id} p={p} role={role} />
          )}
        </div>
      </div>
    </div>);

}

Object.assign(window, {
  PROD: {
    PROD_I, STK, PRODUCTS, CAMISA_VARS, gradeSummary,
    PdStatusBadge, PdCatBadges, PdSelect, PdStockPop, PdGradePop, PdStockIcon,
    PdGradeIcons, PdActionsMenu, PdActBtn, PdSubRow, PdRow, PdFilters, PdTable,
    PdList, PdHead, PdListShell, PdListLoading,
    PdMCardSimple, PdMCardVar, PdListMobile
  }
});