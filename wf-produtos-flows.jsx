/* Inventto — Wireframe · Módulo Produtos · fluxos (Superfície 2 · 2.3)
   2.3.2 Cadastro (wizard 4 passos) · 2.3.3 Edição · 2.3.4 Modal inativar ·
   2.3.5 Categorias · 2.3.6 Importar produtos. Reusa kit + casca + window.PROD.
   Exporta em window.PRODF. */

const { Sidebar, TopHeader, WSwitch } = window.SH;
const { PROD_I, PdSelect } = window.PROD;

/* textarea lo-fi (não há no kit) */
function PdTextarea({ value, placeholder }) {
  return (
    <div className="wf-input" style={{ height: "auto", minHeight: 76, alignItems: "flex-start", padding: "11px 13px" }}>
      <span className="wf-grow" style={{ whiteSpace: "normal", color: value ? "var(--wf-ink)" : "var(--wf-faint)", lineHeight: 1.5 }}>{value || placeholder}</span>
    </div>
  );
}

/* ════ STEPPER / PROGRESS ══════════════════════════════ */
const STEPS = ["Informações", "Imagens", "Variações", "Resumo"];
/* sem variações o passo "Variações" não é exibido → 3 passos */
const stepsFor = (variations) => (variations ? STEPS : STEPS.filter((s) => s !== "Variações"));

function PdStepper({ step, steps = STEPS }) {
  return (
    <div className="pd-stepper">
      {steps.map((name, i) => {
        const n = i + 1;
        const state = n === step ? "is-active" : n < step ? "is-done" : "";
        return (
          <React.Fragment key={name}>
            <div className={["pd-step", state].join(" ")}>
              <span className="pd-step-dot">{n < step ? PROD_I.check : n}</span>
              <span className="pd-step-name">{name}</span>
            </div>
            {i < steps.length - 1 && <span className={["pd-step-line", n < step ? "is-done" : ""].join(" ")} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const PdProgress = ({ step, total = 4 }) => (
  <div className="pd-progress"><div className="pd-progress-fill" style={{ width: `${(step / total) * 100}%` }} /></div>
);

/* ════ PASSO 1 — Informações básicas ═══════════════════ */
/* categorias da org (selecionadas = já vinculadas ao produto) */
const COMBO_CATS = [
{ name: "Vestidos", sel: true },
{ name: "Verão", sel: true },
{ name: "Festas & Eventos", sel: false },
{ name: "Básicos", sel: false },
{ name: "Inverno", sel: false }];

function WizStep1({ mode = "create", skuState = "ok", comboOpen, variations = false }) {
  const isEdit = mode === "edit";
  const skuTrail =
    skuState === "checking" ? <span className="wf-spin" style={{ borderColor: "rgba(44,42,40,.25)", borderTopColor: "var(--wf-ink)" }} /> :
    skuState === "ok" ? <span className="st-healthy" style={{ display: "flex" }}>{PROD_I.circleCheck}</span> :
    null;
  return (
    <div className="pd-steppanel">
      <h2 className="pd-step-h">Informações básicas</h2>
      <p className="pd-step-d">Dados essenciais do produto. O custo entra depois, pela primeira movimentação.</p>

      <WField label="Nome"><WInput value="Vestido Linho Areia" placeholder="Ex: Vestido Linho Areia" /></WField>

      <WField label="SKU">
        {isEdit ? (
          <>
            <div className="pd-readonly">VL-AREIA-01<span className="pd-ro-lock">{PROD_I.eyeOff}</span></div>
            <WHelper>SKU não pode ser alterado pois há movimentações registradas para este item.</WHelper>
          </>
        ) : (
          <>
            <WInput value="VL-AREIA-01" placeholder="Código único do produto" mono
              focus={skuState === "dup"} error={skuState === "dup"} trail={skuTrail} />
            {skuState === "dup" && <WError>Já existe um produto com este SKU.</WError>}
            {skuState !== "dup" && <WHelper>Identificador único por organização. Validado em tempo real.</WHelper>}
          </>
        )}
      </WField>

      <WField label="Descrição"><PdTextarea value="Vestido midi em linho leve, modelagem soltinha, ideal para o verão. Fechamento por botões frontais." placeholder="Opcional" /></WField>

      <WField label="Categorias">
        <div className="pd-combo-wrap">
          <div className={["pd-combo", comboOpen ? "is-focus" : ""].join(" ")}>
            <div className="pd-combo-tags">
              <span className="pd-combo-tag">Vestidos<span className="pd-tag-x">{PROD_I.x}</span></span>
              <span className="pd-combo-tag">Verão<span className="pd-tag-x">{PROD_I.x}</span></span>
            </div>
            <span className="pd-combo-trig">{PROD_I.chevsUpDown}</span>
          </div>
          {comboOpen &&
          <div className="pd-combo-pop">
            <div className="pd-combo-search">
              <span className="pd-combo-search-ico">{PROD_I.search}</span>
              <span className={["pd-combo-search-txt", comboOpen === "create" ? "is-typed" : ""].join(" ")}>
                {comboOpen === "create" ? "Livros" : "Pesquisar categoria…"}
              </span>
            </div>
            <div className="pd-combo-list">
              {comboOpen === "create" ?
              <div className="pd-combo-opt is-create">
                  <span className="pd-combo-check">{PROD_I.plus}</span>Criar nova: <b>“Livros”</b>
                </div> :
              COMBO_CATS.map((c) =>
              <div className={["pd-combo-opt", c.sel ? "is-sel" : ""].join(" ")} key={c.name}>
                    <span className="pd-combo-check">{c.sel ? PROD_I.check : null}</span>{c.name}
                  </div>
              )}
            </div>
          </div>
          }
        </div>
      </WField>

      <div className="pd-switchrow">
        <span className="pd-switch-meta">
          <span className="pd-switch-title">Este produto tem variações</span>
          <span className="pd-switch-desc">Gera uma grade de variantes (cor, tamanho…) — cada uma com SKU e estoque mínimo próprios.</span>
        </span>
        <WSwitch on={variations} />
      </div>

      <WField label="Estoque mínimo">
        <span className={["pd-field", variations ? "is-disabled" : ""].join(" ")}>
          <WInput value={variations ? "" : "10"} placeholder={variations ? "Definido por variante" : "Opcional"} mono />
        </span>
        <WHelper>{variations
          ? "Com variações ativas, o estoque mínimo é definido por variante na etapa “Variações”."
          : "Abaixo deste saldo, o produto entra em estado Crítico."}</WHelper>
      </WField>
    </div>
  );
}

/* ════ PASSO 2 — Imagens ═══════════════════════════════
   sem variações → galeria usa o Card de imagem (define capa + remover)
   com variações → cards simples (sem ações); a capa é por variante (Passo 3) */
function WizStep2({ uploading, variations = false }) {
  const imgs = [
    { cover: true },
    { up: uploading },
    { up: uploading },
    {},
  ];
  return (
    <div className="pd-steppanel">
      <h2 className="pd-step-h">Imagens</h2>
      <p className="pd-step-d">Arraste arquivos ou selecione do dispositivo. O envio acontece em background.</p>
      <div className="pd-drop">
        <div className="pd-drop-ico">{PROD_I.imagePlus}</div>
        <div className="pd-drop-title">Arraste imagens aqui ou clique para selecionar</div>
        <div className="pd-drop-sub">PNG, JPG ou WEBP · upload múltiplo</div>
      </div>
      <div className="pd-imggrid">
        {imgs.map((im, i) => (
          variations ? (
            <div key={i} className={["pd-imgcell", im.up ? "is-uploading" : ""].join(" ")}>
              {im.up && <span className="pd-img-spin"><span className="wf-spin" style={{ borderColor: "rgba(44,42,40,.25)", borderTopColor: "var(--wf-ink)" }} /></span>}
            </div>
          ) : (
            <PdImageCard key={i} principal={im.cover} />
          )
        ))}
      </div>
      <WHelper style={{ marginTop: 10 }}>{variations
        ? "Galeria do produto. A capa de cada variante é definida na etapa “Variações”."
        : "Passe o mouse em uma imagem para definir a capa (estrela) ou removê-la. Arraste para reordenar."}</WHelper>
      {uploading && <p className="wf-helper" style={{ color: "var(--wf-muted)" }}>“Continuar” fica desabilitado até todos os uploads concluírem.</p>}
    </div>
  );
}

/* ════ PASSO 3 — Atributos e variações ═════════════════ */
function AttrBlock({ name, type, values, swatches }) {
  return (
    <div className="pd-attr">
      <div className="pd-attr-head">
        <span className="pd-attr-name"><WField label="Nome do atributo"><WInput value={name} /></WField></span>
        <span className="pd-attr-type"><WField label="Tipo"><PdSelect value={type} /></WField></span>
        <span className="pd-attr-x">{PROD_I.x}</span>
      </div>
      <div className="pd-attr-values">
        {values.map((v, i) => (
          <span key={v} className="pd-valuetag">
            {swatches && <span className="pd-swatch" style={{ background: swatches[i] }} />}
            {v}<span className="pd-tag-x">{PROD_I.x}</span>
          </span>
        ))}
        <span className="pd-valueinput">Digite e tecle Enter…</span>
      </div>
    </div>
  );
}

/* ════ Componente — Card de imagem (capa de produto / variante)
   principal: imagem destaque (estrela dourada no topo-direito, fixa)
   state: undefined → hover real via CSS · "hover" → força o overlay (p/ documentação)
   • destaque em repouso: imagem + estrela
   • destaque em hover: overlay escuro + X central (desassociar) + estrela
   • normal em repouso: só a imagem
   • normal em hover: overlay escuro + Estrela (tornar destaque) e X (desassociar) no topo */
function PdImageCard({ principal = false, state, className }) {
  const cls = ["pd-imgcard", principal ? "is-principal" : "", state === "hover" ? "is-hover" : "", className || ""].join(" ").trim();
  return (
    <span className={cls}>
      {principal && <span className="pd-imgcard-star" aria-label="Imagem principal (capa)">{PROD_I.starFill}</span>}
      <span className="pd-imgcard-overlay">
        {principal
          ? <span className="pd-imgcard-x" aria-label="Desassociar imagem">{PROD_I.x}</span>
          : <span className="pd-imgcard-ctrls">
              <span className="pd-imgcard-ctrl" aria-label="Tornar imagem principal">{PROD_I.star}</span>
              <span className="pd-imgcard-ctrl" aria-label="Desassociar imagem">{PROD_I.x}</span>
            </span>}
      </span>
    </span>
  );
}

/* célula de imagens da variante (Passo 3) — cards associados + gatilho "Associar imagens" */
function VarImgCell({ imgs = [], trigger = true }) {
  return (
    <span className="pd-vargen-imgs">
      <span className="pd-vargen-cap pd-vimgs-cap">Imagens</span>
      {imgs.map((im, i) => <PdImageCard key={i} principal={im.principal} />)}
      {trigger && <span className="pd-vargen-img" aria-label="Associar imagens">{PROD_I.imagePlus}</span>}
    </span>
  );
}
/* estados de exemplo por variante: 1 principal + neutras · só-principal · vazia · completa (sem gatilho) */
const VAR_IMGS = {
  "Branco · P": { imgs: [{ principal: true }, {}], trigger: true },
  "Branco · M": { imgs: [{ principal: true }], trigger: true },
  "Preto · P":  { imgs: [], trigger: true },
  "Areia · M":  { imgs: [{ principal: true }, {}, {}], trigger: false },
};

function WizStep3() {
  const labels = ["Branco · P", "Branco · M", "Preto · P", "Areia · M"];
  return (
    <div className="pd-steppanel">
      <h2 className="pd-step-h">Atributos e variações</h2>
      <p className="pd-step-d">Defina os atributos — cor, tamanho ou outro. A grade é gerada automaticamente, e cada variante recebe SKU e estoque mínimo próprios.</p>

      <AttrBlock name="Cor" type="Cor" values={["Branco", "Preto", "Areia"]} swatches={["#f1ede5", "#2c2a28", "#cbb894"]} />
      <AttrBlock name="Tamanho" type="Seleção" values={["P", "M", "G"]} />
      <button className="pd-addattr">{PROD_I.plus}Adicionar atributo</button>

      <div className="pd-vargen">
        <div className="pd-vargen-head">
          <span className="pd-vargen-title">Grade de variantes</span>
          <span className="pd-vargen-count">9 variantes geradas</span>
        </div>
        <div className="pd-vargen-cols">
          <span className="pd-vargen-label">Variante</span>
          <span className="pd-vargen-sku">SKU</span>
          <span className="pd-vargen-min">Estoque mín.</span>
          <span className="pd-vargen-imgcol">Imagem</span>
        </div>
        {labels.map((lb) => (
          <div className="pd-vargen-row" key={lb}>
            <span className="pd-vargen-label"><span className="pd-vargen-name">{lb}</span></span>
            <span className="pd-vargen-fields">
              <span className="pd-vargen-sku">
                <span className="pd-vargen-cap">SKU</span>
                <WInput value={"VL-" + lb.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 4).toUpperCase()} mono placeholder="SKU da variante" />
              </span>
              <span className="pd-vargen-min">
                <span className="pd-vargen-cap">Estoque mín.</span>
                <WInput value="3" mono placeholder="Mín." />
              </span>
              <VarImgCell {...(VAR_IMGS[lb] || { imgs: [], trigger: true })} />
            </span>
          </div>
        ))}
        <div className="pd-vargen-more">+ 5 variantes</div>
      </div>
    </div>
  );
}

/* ════ PASSO 4 — Resumo e confirmação ══════════════════ */
function WizStep4({ mode = "create", variations = true }) {
  return (
    <div className="pd-steppanel">
      <h2 className="pd-step-h">Resumo e confirmação</h2>
      <p className="pd-step-d">Revise tudo antes de salvar. Você pode voltar para ajustar qualquer passo.</p>

      <div className="pd-summary">
        <div className="pd-sumcard">
          <div className="pd-sumcard-h">Informações básicas<span className="pd-sumcard-edit">Editar</span></div>
          <div className="pd-sumgrid">
            <div className="pd-sumitem"><div className="pd-sumitem-k">Nome</div><div className="pd-sumitem-v">Vestido Linho Areia</div></div>
            <div className="pd-sumitem"><div className="pd-sumitem-k">SKU</div><div className="pd-sumitem-v" style={{ fontFamily: "var(--wf-mono)" }}>VL-AREIA-01</div></div>
            <div className="pd-sumitem"><div className="pd-sumitem-k">Categorias</div><div className="pd-sumitem-v">Vestidos, Verão</div></div>
            <div className="pd-sumitem"><div className="pd-sumitem-k">Estoque mínimo</div><div className="pd-sumitem-v">{variations ? "Por variante" : "10"}</div></div>
          </div>
        </div>
        <div className="pd-sumcard">
          <div className="pd-sumcard-h">Imagens<span className="pd-sumcard-edit">Editar</span></div>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2, 3].map((i) => <span key={i} className={["pd-imgcell", i === 0 ? "is-cover" : ""].join(" ")} style={{ width: 54, height: 54, aspectRatio: "auto" }}>{i === 0 && <span className="pd-img-coverbadge" style={{ fontSize: 7, padding: "1px 4px" }}>DESTAQUE</span>}</span>)}
          </div>
        </div>
        {variations &&
        <div className="pd-sumcard">
          <div className="pd-sumcard-h">Variações<span className="pd-sumcard-edit">Editar</span></div>
          <div className="pd-sumgrid">
            <div className="pd-sumitem"><div className="pd-sumitem-k">Cor</div><div className="pd-sumitem-v">Branco, Preto, Areia</div></div>
            <div className="pd-sumitem"><div className="pd-sumitem-k">Tamanho</div><div className="pd-sumitem-v">P, M, G</div></div>
            <div className="pd-sumitem is-full"><div className="pd-sumitem-k">Total de variantes</div><div className="pd-sumitem-v">9 variantes</div></div>
          </div>
        </div>
        }
        <div className="pd-warnbox">
          <span className="pd-warn-ico">{PROD_I.triangleAlert}</span>
          <span className="pd-warn-text">O produto nasce com estoque zero. Para adicionar estoque, registre uma entrada em Movimentações.</span>
        </div>
      </div>
    </div>
  );
}

/* ════ Conteúdo do wizard /produtos/novo · /produtos/:id ═
   mode: create|edit · step 1-4 · variations · skuState · uploading · saving */
function PdWizard({ mode = "create", step = 1, variations = true, skuState = "ok", uploading, saving, compact, comboOpen }) {
  const isEdit = mode === "edit";
  const steps = stepsFor(variations);
  const total = steps.length;
  const current = steps[step - 1];
  const last = step === total;
  const ctaLabel = last ? (isEdit ? "Salvar alterações" : "Salvar produto") : "Continuar";
  const ctaBusy = saving ? (isEdit ? "Salvando…" : "Salvando…") : null;

  return (
    <div className="pd-wcol">
      <div className="pd-whead">
        <div className="pd-whead-main">
          <h1 className="wf-h1" style={{ fontSize: 26 }}>{isEdit ? "Editar produto" : "Novo produto"}</h1>
          {isEdit
          ? <p className="pd-whead-sub">Vestido Linho Areia · VL-AREIA-01</p>
          : <p className="pd-step-ind">Passo {step} de {total}</p>}
        </div>
        {isEdit &&
        <span className="pd-whead-danger"><WBtn variant="outline"><span style={{ display: "inline-flex", color: "var(--wf-err)" }}>{PROD_I.eyeOff}</span><span style={{ color: "var(--wf-err)" }}>Inativar produto</span></WBtn></span>
        }
      </div>

      {compact ? <PdProgress step={step} total={total} /> : <PdStepper step={step} steps={steps} />}

      {current === "Informações" && <WizStep1 mode={mode} skuState={skuState} comboOpen={comboOpen} variations={variations} />}
      {current === "Imagens" && <WizStep2 uploading={uploading} variations={variations} />}
      {current === "Variações" && <WizStep3 />}
      {current === "Resumo" && <WizStep4 mode={mode} variations={variations} />}

      <div className="pd-actionbar">
        {!isEdit && <span className="pd-ab-back"><WBtn variant="outline" disabled={step === 1}>Voltar</WBtn></span>}
        <span className="pd-ab-spacer" />
        {isEdit && step > 1 && <span className="pd-ab-back"><WBtn variant="outline">Voltar</WBtn></span>}
        <WBtn loading={saving} disabled={uploading && current === "Imagens"}>{ctaBusy || ctaLabel}</WBtn>
      </div>
    </div>
  );
}

/* shell completa (desktop) */
function PdWizardShell({ mode = "create", step = 1, variations = true, skuState = "ok", uploading, saving, comboOpen }) {
  const crumb = mode === "edit" ? ["Início", "Produtos", "Editar"] : ["Início", "Produtos", "Novo"];
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="produtos" />
      <div className="sh-inset">
        <TopHeader crumb={crumb} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <PdWizard mode={mode} step={step} variations={variations} skuState={skuState} uploading={uploading} saving={saving} comboOpen={comboOpen} />
        </div>
      </div>
    </div>
  );
}

/* ════ MODAL 2.3.4 — Inativar produto ══════════════════ */
function PdInativarDialog({ name = "Vestido Linho Areia", executing }) {
  return (
    <div className="pd-dialog wf">
      <div className="pd-dialog-icon">{PROD_I.eyeOff}</div>
      <h2 className="pd-dialog-title">Inativar {name}?</h2>
      <p className="pd-dialog-lead">Ele sai das listagens e dos catálogos, mas o histórico é mantido.</p>
      <div className="pd-dialog-foot">
        <div><WBtn variant="outline">Cancelar</WBtn></div>
        <div><WBtn variant="destructive" loading={executing}>{executing ? "Inativando…" : "Inativar"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ 2.3.5 — Modal: Associar imagens à variação ══════
   scenario: base | selected | replicate-open | replicate-chosen
   (sem imagens disponíveis o modal nem chega a abrir — o gatilho não é exibido) */
function PdAssociarImagensDialog({ scenario = "base" }) {
  const replicate = scenario === "replicate-open" || scenario === "replicate-chosen";
  const ruleChosen = scenario === "replicate-chosen";
  const selectedIdx = scenario === "base" ? [] : [1, 4, 7];
  const selectedCount = selectedIdx.length;
  const confirmEnabled = selectedCount > 0 && (!replicate || ruleChosen);
  const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="pd-imgdialog wf">
      <div className="pd-imgd-head">
        <h2 className="pd-imgd-title">Associar imagens à variação</h2>
        <p className="pd-imgd-desc">Selecione uma ou mais imagens da galeria de <b>Vestido Linho Areia</b>.</p>
        <div className="pd-imgd-badges">
          <span className="pd-voption-badge">Branco</span>
          <span className="pd-voption-badge">Tamanho (Letras) P</span>
        </div>
      </div>

      <div className="pd-imgd-grid">
        {pool.map((i) => {
          const sel = selectedIdx.includes(i);
          return (
            <span key={i} className={["pd-imgd-cell", sel ? "is-selected" : ""].join(" ")}>
              {sel && <span className="pd-imgd-check">{PROD_I.check}</span>}
            </span>
          );
        })}
      </div>

      <div className="pd-imgd-replicate">
        <span className="pd-imgd-checkrow">
          <span className={["pd-imgd-cb", replicate ? "is-checked" : ""].join(" ")}>{replicate && PROD_I.check}</span>
          <span className="pd-imgd-cblabel">Replicar esta seleção ({selectedCount} {selectedCount === 1 ? "imagem" : "imagens"}) para:</span>
        </span>
        {replicate &&
        <div className="pd-imgd-radios">
          <span className="pd-imgd-radio">
            <span className={["pd-imgd-rb", ruleChosen ? "is-on" : ""].join(" ")} />
            <span className="pd-imgd-rlabel">Todas as variações: <span className="pd-voption-badge">Branco</span></span>
          </span>
          <span className="pd-imgd-radio">
            <span className="pd-imgd-rb" />
            <span className="pd-imgd-rlabel">Todas as variações: <span className="pd-voption-badge">Tamanho (Letras) P</span></span>
          </span>
        </div>}
      </div>

      <div className="pd-imgd-foot">
        <span><WBtn variant="outline">Cancelar</WBtn></span>
        <span><WBtn disabled={!confirmEnabled}>Confirmar seleção</WBtn></span>
      </div>
    </div>
  );
}

/* ════ 2.3.5 — Categorias ══════════════════════════════
   scenario: base | empty | editing | saving */
const CATEGORIES = [
  { name: "Vestidos", count: 12 },
  { name: "Camisas", count: 8 },
  { name: "Calças", count: 6 },
  { name: "Acessórios", count: 15 },
  { name: "Jaquetas", count: 3 },
];

function PdCategorias({ scenario = "base" }) {
  const editing = scenario === "editing" || scenario === "saving";
  return (
    <div className="pd-cat-col">
      <div className="pd-headrow">
        <div>
          <h1 className="wf-h1" style={{ fontSize: 26 }}>Categorias</h1>
          <p className="pd-head-sub">Organize seus produtos. Renomeie quando quiser — sem exclusão na v1.</p>
        </div>
        <span className="pd-head-cta"><WBtn><span className="pd-ico">{PROD_I.plus}</span>Nova categoria</WBtn></span>
      </div>

      {scenario === "empty" ? (
        <div className="pd-catlist">
          <div className="pd-empty">
            <div className="pd-empty-ico">{PROD_I.package}</div>
            <p className="pd-empty-title">Crie a primeira categoria para organizar seus produtos.</p>
            <p className="pd-empty-text">Categorias aparecem nos filtros da lista e no cadastro de produtos.</p>
            <WBtn><span style={{ display: "inline-flex", marginRight: 2 }}>{PROD_I.plus}</span>Nova categoria</WBtn>
          </div>
        </div>
      ) : (
        <div className="pd-catlist">
          {CATEGORIES.map((c, i) => {
            const isThis = editing && c.name === "Calças";
            if (isThis) {
              return (
                <div className="pd-catrow is-editing" key={c.name}>
                  <span className="pd-cat-editrow">
                    <span style={{ flex: 1 }}><WInput value="Calças & Shorts" focus mono={false} /></span>
                    <span className="pd-cat-confirm">{scenario === "saving" ? <span className="wf-spin" /> : PROD_I.check}</span>
                    <span className="pd-cat-cancel">{PROD_I.x}</span>
                  </span>
                </div>
              );
            }
            return (
              <div className="pd-catrow" key={c.name}>
                <span className="pd-cat-meta">
                  <div className="pd-cat-name">{c.name}</div>
                  <div className="pd-cat-count">{c.count} produtos</div>
                </span>
                <span className="pd-cat-edit">{PROD_I.pencil}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ════ 2.3.6 — Importar produtos ═══════════════════════
   scenario: base | importing | empty-orgs | empty-prods */
const IMPORT_PRODS = [
  { name: "Tênis Casual Couro", sku: "TC-COURO", imported: false },
  { name: "Meia Esportiva Kit", sku: "ME-KIT-3", imported: false },
  { name: "Boné Aba Curva", sku: "BC-ABA", imported: true },
  { name: "Mochila Urbana 20L", sku: "MU-20L", imported: false },
  { name: "Cinto Couro Fivela", sku: "CC-FIV", imported: true },
];

function PdImportar({ scenario = "base" }) {
  const importing = scenario === "importing";
  const selected = ["TC-COURO", "MU-20L"];

  const head = (
    <div className="pd-whead">
      <h1 className="wf-h1" style={{ fontSize: 26 }}>Importar produtos</h1>
      <p className="pd-imp-lead">Copie produtos de outra unidade do seu negócio.</p>
    </div>
  );

  if (scenario === "empty-orgs") {
    return (
      <div className="pd-imp-col">{head}
        <div className="pd-imp-list">
          <div className="pd-imp-state">
            <div className="pd-imp-state-ico">{PROD_I.boxes}</div>
            <p className="pd-imp-state-title">Você precisa de mais de uma organização para importar produtos.</p>
            <p className="pd-imp-state-text">A importação copia configurações de produtos entre unidades do mesmo negócio.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-imp-col">{head}
      <WField label="Organização de origem"><PdSelect value="Loja Shopping Norte" /></WField>

      {scenario === "empty-prods" ? (
        <div className="pd-imp-list">
          <div className="pd-imp-state">
            <div className="pd-imp-state-ico">{PROD_I.package}</div>
            <p className="pd-imp-state-title">Nenhum produto disponível para importar nesta organização.</p>
            <p className="pd-imp-state-text">Selecione outra unidade de origem ou cadastre produtos lá primeiro.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="pd-imp-list">
            {IMPORT_PRODS.map((p) => {
              const checked = selected.includes(p.sku);
              const disabled = p.imported;
              return (
                <div key={p.sku} className={["pd-imp-row", disabled ? "is-imported" : ""].join(" ")}>
                  <span className={["pd-cb", disabled ? "is-disabled" : checked ? "is-checked" : ""].join(" ")}>
                    {checked && !disabled && PROD_I.check}{disabled && PROD_I.check}
                  </span>
                  <span className="pd-thumb" />
                  <span className="pd-imp-meta">
                    <div className="pd-imp-name">{p.name}</div>
                    <div className="pd-imp-sku">{p.sku}</div>
                  </span>
                  {disabled && <span className="pd-imp-badge">Já importado</span>}
                </div>
              );
            })}
          </div>
          <div className="pd-imp-foot">
            <span className="pd-imp-sel"><b>2</b> produto(s) selecionado(s)</span>
            <WBtn loading={importing}><span style={{ display: importing ? "none" : "inline-flex", marginRight: 4 }}>{PROD_I.download}</span>{importing ? "Importando…" : "Importar selecionados"}</WBtn>
          </div>
          {!importing && <WHelper>Os produtos importados nascem com estoque zero. Estoque, preço e histórico nunca são copiados.</WHelper>}
        </>
      )}
    </div>
  );
}

/* shell genérica (desktop) para categorias / importar */
function PdSubScreenShell({ screen = "categorias", scenario }) {
  const crumb = screen === "categorias" ? ["Início", "Produtos", "Categorias"] : ["Início", "Produtos", "Importar"];
  return (
    <div className="wf sh-app" style={{ width: "1200px" }}>
      <Sidebar role="owner" active="produtos" />
      <div className="sh-inset">
        <TopHeader crumb={crumb} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          {screen === "categorias" ? <PdCategorias scenario={scenario} /> : <PdImportar scenario={scenario} />}
        </div>
      </div>
    </div>
  );
}

/* shell mobile para importar produtos */
function PdImportMobile({ scenario = "base" }) {
  return (
    <div className="wf sh-mobile">
      <div className="sh-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sh-iconbtn">{window.SH.SH_I.menu}</div><WLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="sh-iconbtn">{window.SH.SH_I.bell}</div><span className="sh-avatar">JR</span>
        </div>
      </div>
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 16 }}>
        <PdImportar scenario={scenario} />
      </div>
    </div>
  );
}

Object.assign(window, {
  PRODF: {
    PdTextarea, PdStepper, PdProgress, WizStep1, WizStep2, WizStep3, WizStep4, PdImageCard, VarImgCell,
    PdWizard, PdWizardShell, PdInativarDialog, PdAssociarImagensDialog,
    CATEGORIES, PdCategorias, IMPORT_PRODS, PdImportar, PdImportMobile, PdSubScreenShell,
  },
});
