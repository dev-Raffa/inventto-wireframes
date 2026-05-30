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

function PdStepper({ step }) {
  return (
    <div className="pd-stepper">
      {STEPS.map((name, i) => {
        const n = i + 1;
        const state = n === step ? "is-active" : n < step ? "is-done" : "";
        return (
          <React.Fragment key={name}>
            <div className={["pd-step", state].join(" ")}>
              <span className="pd-step-dot">{n < step ? PROD_I.check : n}</span>
              <span className="pd-step-name">{name}</span>
            </div>
            {i < STEPS.length - 1 && <span className={["pd-step-line", n < step ? "is-done" : ""].join(" ")} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const PdProgress = ({ step }) => (
  <div className="pd-progress"><div className="pd-progress-fill" style={{ width: `${(step / 4) * 100}%` }} /></div>
);

/* ════ PASSO 1 — Informações básicas ═══════════════════ */
function WizStep1({ mode = "create", skuState = "ok", comboOpen }) {
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
        <div className={["pd-combo", comboOpen ? "is-focus" : ""].join(" ")}>
          <span className="pd-combo-tag">Vestidos<span className="pd-tag-x">{PROD_I.x}</span></span>
          <span className="pd-combo-tag">Verão<span className="pd-tag-x">{PROD_I.x}</span></span>
          <span className="pd-combo-input">{comboOpen ? "Festa" : "Adicionar categoria…"}</span>
        </div>
        {comboOpen && (
          <div className="pd-combo-pop">
            <div className="pd-combo-opt"><span className="pd-mi-ico">{PROD_I.package}</span>Festas &amp; Eventos</div>
            <div className="pd-combo-opt is-create"><span className="pd-mi-ico">{PROD_I.plus}</span>Criar categoria “Festa”</div>
          </div>
        )}
      </WField>

      <WField label="Estoque mínimo">
        <WInput value="10" placeholder="Opcional" mono />
        <WHelper>Abaixo deste saldo, o produto entra em estado Crítico.</WHelper>
      </WField>
    </div>
  );
}

/* ════ PASSO 2 — Imagens ═══════════════════════════════ */
function WizStep2({ uploading }) {
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
          <div key={i} className={["pd-imgcell", im.cover ? "is-cover" : "", im.up ? "is-uploading" : ""].join(" ")}>
            {im.up && <span className="pd-img-spin"><span className="wf-spin" style={{ borderColor: "rgba(44,42,40,.25)", borderTopColor: "var(--wf-ink)" }} /></span>}
            <span className="pd-img-x">{PROD_I.x}</span>
            <span className="pd-img-grip">{PROD_I.gripV}</span>
            {im.cover && <span className="pd-img-coverbadge">DESTAQUE</span>}
          </div>
        ))}
      </div>
      <WHelper style={{ marginTop: 10 }}>A primeira imagem é usada como destaque na lista e na vitrine. Arraste para reordenar.</WHelper>
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

function WizStep3({ variations = true }) {
  const labels = ["Branco · P", "Branco · M", "Preto · P", "Areia · M"];
  return (
    <div className="pd-steppanel">
      <h2 className="pd-step-h">Atributos e variações</h2>
      <p className="pd-step-d">Ative se este produto tem grade — por cor, tamanho ou outro atributo.</p>

      <div className="pd-switchrow">
        <span className="pd-switch-meta">
          <span className="pd-switch-title">Este produto tem variações</span>
          <span className="pd-switch-desc">Gera uma grade de variantes a partir dos atributos definidos.</span>
        </span>
        <WSwitch on={variations} />
      </div>

      {!variations ? (
        <div className="pd-inlinemsg">Produto sem variações. Avance para o resumo.</div>
      ) : (
        <>
          <AttrBlock name="Cor" type="Cor" values={["Branco", "Preto", "Areia"]} swatches={["#f1ede5", "#2c2a28", "#cbb894"]} />
          <AttrBlock name="Tamanho" type="Seleção" values={["P", "M", "G"]} />
          <button className="pd-addattr">{PROD_I.plus}Adicionar atributo</button>

          <div className="pd-vargen">
            <div className="pd-vargen-head">
              <span className="pd-vargen-title">Grade de variantes</span>
              <span className="pd-vargen-count">9 variantes geradas</span>
            </div>
            {labels.map((lb) => (
              <div className="pd-vargen-row" key={lb}>
                <span className="pd-vargen-label"><span className="pd-vargen-name">{lb}</span></span>
                <span className="pd-vargen-sku"><WInput value={"VL-" + lb.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 4).toUpperCase()} mono placeholder="SKU da variante" /></span>
                <span className="pd-vargen-img">{PROD_I.imagePlus}</span>
                <span className="pd-attr-x" style={{ width: 34, height: 34 }}>{PROD_I.x}</span>
              </div>
            ))}
            <div className="pd-vargen-row" style={{ justifyContent: "center", color: "var(--wf-muted)", fontSize: 11.5 }}>+ 5 variantes</div>
          </div>
        </>
      )}
    </div>
  );
}

/* ════ PASSO 4 — Resumo e confirmação ══════════════════ */
function WizStep4({ mode = "create" }) {
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
            <div className="pd-sumitem"><div className="pd-sumitem-k">Estoque mínimo</div><div className="pd-sumitem-v">10</div></div>
          </div>
        </div>
        <div className="pd-sumcard">
          <div className="pd-sumcard-h">Imagens<span className="pd-sumcard-edit">Editar</span></div>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2, 3].map((i) => <span key={i} className={["pd-imgcell", i === 0 ? "is-cover" : ""].join(" ")} style={{ width: 54, height: 54, aspectRatio: "auto" }}>{i === 0 && <span className="pd-img-coverbadge" style={{ fontSize: 7, padding: "1px 4px" }}>DESTAQUE</span>}</span>)}
          </div>
        </div>
        <div className="pd-sumcard">
          <div className="pd-sumcard-h">Variações<span className="pd-sumcard-edit">Editar</span></div>
          <div className="pd-sumgrid">
            <div className="pd-sumitem"><div className="pd-sumitem-k">Cor</div><div className="pd-sumitem-v">Branco, Preto, Areia</div></div>
            <div className="pd-sumitem"><div className="pd-sumitem-k">Tamanho</div><div className="pd-sumitem-v">P, M, G</div></div>
            <div className="pd-sumitem is-full"><div className="pd-sumitem-k">Total de variantes</div><div className="pd-sumitem-v">9 variantes</div></div>
          </div>
        </div>
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
function PdWizard({ mode = "create", step = 1, variations = true, skuState = "ok", uploading, saving, compact }) {
  const isEdit = mode === "edit";
  const last = step === 4;
  const ctaLabel = last ? (isEdit ? "Salvar alterações" : "Salvar produto") : "Continuar";
  const ctaBusy = saving ? (isEdit ? "Salvando…" : "Salvando…") : null;

  return (
    <div className="pd-wcol">
      <div className="pd-whead">
        <h1 className="wf-h1" style={{ fontSize: 26 }}>{isEdit ? "Editar produto" : "Novo produto"}</h1>
        {isEdit
          ? <p className="pd-whead-sub">Vestido Linho Areia · VL-AREIA-01</p>
          : <p className="pd-step-ind">Passo {step} de 4</p>}
      </div>

      {compact ? <PdProgress step={step} /> : <PdStepper step={step} />}

      {step === 1 && <WizStep1 mode={mode} skuState={skuState} />}
      {step === 2 && <WizStep2 uploading={uploading} />}
      {step === 3 && <WizStep3 variations={variations} />}
      {step === 4 && <WizStep4 mode={mode} />}

      <div className="pd-actionbar">
        {isEdit && (
          <span className="pd-ab-danger"><WBtn variant="outline"><span style={{ display: "inline-flex", color: "var(--wf-err)" }}>{PROD_I.eyeOff}</span><span style={{ color: "var(--wf-err)" }}>Inativar produto</span></WBtn></span>
        )}
        {!isEdit && <span className="pd-ab-back"><WBtn variant="outline" disabled={step === 1}>Voltar</WBtn></span>}
        <span className="pd-ab-spacer" />
        {isEdit && step > 1 && <span className="pd-ab-back"><WBtn variant="outline">Voltar</WBtn></span>}
        <WBtn loading={saving} disabled={uploading && step === 2}>{ctaBusy || ctaLabel}</WBtn>
      </div>
    </div>
  );
}

/* shell completa (desktop) */
function PdWizardShell({ mode = "create", step = 1, variations = true, skuState = "ok", uploading, saving }) {
  const crumb = mode === "edit" ? ["Início", "Produtos", "Editar"] : ["Início", "Produtos", "Novo"];
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="produtos" />
      <div className="sh-inset">
        <TopHeader crumb={crumb} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 20, paddingRight: 20 }}>
          <PdWizard mode={mode} step={step} variations={variations} skuState={skuState} uploading={uploading} saving={saving} />
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
    <div className="wf sh-app">
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

Object.assign(window, {
  PRODF: {
    PdTextarea, PdStepper, PdProgress, WizStep1, WizStep2, WizStep3, WizStep4,
    PdWizard, PdWizardShell, PdInativarDialog,
    CATEGORIES, PdCategorias, IMPORT_PRODS, PdImportar, PdSubScreenShell,
  },
});
