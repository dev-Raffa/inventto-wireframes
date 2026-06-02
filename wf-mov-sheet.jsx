/* Inventto — Wireframe · Sheet 2.4.2 Registrar movimentação (sobre /movimentacoes ou /produtos)
   Sheet lateral direita (max-w-lg). Modelo multi-produto: cabeçalho de movimentação
   (Tipo · Motivo · Descrição condicional · Documento · Data/hora) + seção Produtos com
   tabela de itens, alimentada por um Dialog "Adicionar / Editar item" que lista as
   variantes do produto. Reusa o kit (window.WF_*) e classes mv-/pd-. Exporta em window.MOVS. */

const { MOV_I, MvHistoryShell, brl } = window.MOV;

/* SegmentedControl Entrada · Saída */
function MvSeg({ type }) {
  return (
    <div className="mv-seg">
      <div className={["mv-seg-opt", "is-in", type === "in" ? "is-active" : ""].join(" ")}>{MOV_I.arrowUp}Entrada</div>
      <div className={["mv-seg-opt", "is-out", type === "out" ? "is-active" : ""].join(" ")}>{MOV_I.arrowDown}Saída</div>
    </div>
  );
}

/* select de largura total dentro do sheet */
function MvFullSelect({ value, placeholder, readonly, lock }) {
  return (
    <div className={["mv-fullselect", value ? "" : "is-placeholder", readonly ? "is-readonly" : ""].join(" ")}>
      <span className="mv-grow">{value || placeholder}</span>
      <span className="mv-chev">{lock ? <span className="mv-lock">{MOV_I.lock}</span> : MOV_I.chevDown}</span>
    </div>
  );
}

/* input com prefixo R$ */
function MvPrefixInput({ value, placeholder, error }) {
  return (
    <div className={["mv-prefix-input", error ? "is-error" : ""].join(" ")}>
      <span className="mv-prefix">R$</span>
      <span className={["mv-prefix-val", value ? "" : "is-placeholder"].join(" ")}>{value || placeholder}</span>
    </div>
  );
}

/* DateTimePicker — pré-preenchido com o momento atual, editável p/ retroativo */
function MvDateTime({ value = "02/06/2026 · 14:08" }) {
  return (
    <div className="mv-datetime">
      <span className="mv-dt-ico">{MOV_I.calendar}</span>
      <span className="mv-dt-val">{value}</span>
      <span className="mv-chev">{MOV_I.chevDown}</span>
    </div>
  );
}

/* MOTIVOS por tipo */
const REASONS = {
  in:  ["Compra", "Devolução de cliente", "Ajuste de inventário (+)", "Outro"],
  out: ["Perda / Avaria", "Devolução a fornecedor", "Uso interno", "Ajuste de inventário (−)", "Outro"],
};

/* variantes de exemplo (produto com variações) p/ o Dialog */
const SAMPLE_VARIANTS = [
  { attrs: "Branco · Tamanho M", sku: "CS-ALG-BR-M", saldo: 12, swatch: "#f1ede5" },
  { attrs: "Branco · Tamanho G", sku: "CS-ALG-BR-G", saldo: 8,  swatch: "#f1ede5" },
  { attrs: "Areia · Tamanho M",  sku: "CS-ALG-AR-M", saldo: 18, swatch: "#cbb894" },
  { attrs: "Preto · Tamanho P",  sku: "CS-ALG-PR-P", saldo: 4,  swatch: "#2c2a28" },
];

/* itens já adicionados à tabela do sheet (por cenário) */
const ITEMS_IN = [
  { name: "Camisa Social Algodão", sku: "CS-ALG-BR-M", attrs: "Branco · M", qty: 12, unit: 29 },
  { name: "Camisa Social Algodão", sku: "CS-ALG-AR-M", attrs: "Areia · M",  qty: 18, unit: 29 },
];
const ITEMS_OUT = [
  { name: "Camisa Social Algodão", sku: "CS-ALG-BR-M", attrs: "Branco · M", qty: 2, unit: 89.9 },
  { name: "Lenço de Seda Estampado", sku: "LS-EST-03", attrs: "Folhas",     qty: 1, unit: 39.9 },
];
const ITEMS_OUT_INVALID = [
  { name: "Camisa Social Algodão", sku: "CS-ALG-BR-M", attrs: "Branco · M", qty: 20, unit: 89.9, errSaldo: 12 },
  { name: "Lenço de Seda Estampado", sku: "LS-EST-03", attrs: "Folhas",     qty: 1, unit: 39.9 },
];

/* ── ações da linha (aparecem centralizadas sobre a linha no hover) — Pencil · X ─ */
function MvRowActions() {
  return (
    <span className="mv-st-actions">
      <span className="mv-st-act" aria-label="Editar item">{MOV_I.pencil}Editar</span>
      <span className="mv-st-act is-x" aria-label="Remover item">{MOV_I.x}Remover</span>
    </span>
  );
}

/* confirmação inline de remoção (centralizada sobre a linha) */
function MvRowConfirm() {
  return (
    <span className="mv-st-confirm">
      <span className="mv-st-confirm-q">Remover este item?</span>
      <span className="mv-st-confirm-yes">Remover</span>
      <span className="mv-st-confirm-no">Manter</span>
    </span>
  );
}

/* ações fixas no canto superior direito da linha (mobile — sem hover) */
function MvRowCorner() {
  return (
    <span className="mv-st-corner">
      <span className="mv-st-cbtn" aria-label="Editar item">{MOV_I.pencil}</span>
      <span className="mv-st-cbtn is-x" aria-label="Remover item">{MOV_I.x}</span>
    </span>
  );
}

/* itens dentro do sheet — tabela (desktop) ou lista de cards (mobile) */
function MvItemsTable({ type, items, hoverIdx, removingIdx, mobile }) {
  const isOut = type === "out";
  const totalLabel = isOut ? "Valor total" : "Custo total";

  // ── mobile: lista de cards ──
  if (mobile) {
    return (
      <div className="mv-itemcards">
        {items.map((it, i) => {
          const err = !!it.errSaldo;
          const removing = removingIdx === i;
          return (
            <div key={i} className={["mv-itemcard", err ? "is-err" : "", removing ? "is-removing" : ""].join(" ")}>
              {/* topo: dados do produto */}
              <div className="mv-itemcard-top">
                <span className="pd-thumb is-sm" />
                <span className="mv-st-meta">
                  <span className="mv-st-name">{it.name}</span>
                  <span className="mv-st-sku">{it.sku}</span>
                  <span className="mv-st-attrs">{it.attrs}</span>
                  {err && <span className="mv-st-errbadge">{MOV_I.info}Estoque insuficiente — há {it.errSaldo} disponível.</span>}
                </span>
              </div>
              {/* rodapé do card: quantidade + preço */}
              <div className="mv-itemcard-foot">
                <span className="mv-itemcard-cell">
                  <span className="mv-ic-label">Qtd.</span>
                  <span className={["mv-st-qty", isOut ? "is-out" : "is-in", err ? "is-err" : ""].join(" ")}>{it.qty}</span>
                </span>
                <span className="mv-itemcard-cell is-right">
                  <span className="mv-ic-label">{totalLabel}</span>
                  <span className="mv-st-total">{brl(it.unit * it.qty)}</span>
                </span>
              </div>
              {/* ícones de ação — absolute, canto superior direito */}
              {!removing && <MvRowCorner />}
              {/* confirmação de remoção — overlay centralizado */}
              {removing && <span className="mv-st-overlay is-confirm"><MvRowConfirm /></span>}
            </div>
          );
        })}
      </div>
    );
  }

  // ── desktop: tabela ──
  return (
    <table className="mv-sheettable">
      <thead>
        <tr>
          <th scope="col">Produto</th>
          <th scope="col" className="is-right">Qtd.</th>
          <th scope="col" className="is-right">{totalLabel}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it, i) => {
          const err = !!it.errSaldo;
          const removing = removingIdx === i;
          return (
            <tr key={i} className={["mv-st-row", hoverIdx === i ? "is-hover" : "", err ? "is-err" : "", removing ? "is-removing" : ""].join(" ")}>
              <td>
                <span className="mv-st-prod">
                  <span className="pd-thumb is-sm" />
                  <span className="mv-st-meta">
                    <span className="mv-st-name">{it.name}</span>
                    <span className="mv-st-sku">{it.sku}</span>
                    <span className="mv-st-attrs">{it.attrs}</span>
                    {err && <span className="mv-st-errbadge">{MOV_I.info}Estoque insuficiente — há {it.errSaldo} disponível.</span>}
                  </span>
                </span>
                {/* overlay centralizado no hover · confirmação de remoção */}
                <span className={["mv-st-overlay", removing ? "is-confirm" : ""].join(" ")}>
                  {removing ? <MvRowConfirm /> : <MvRowActions />}
                </span>
              </td>
              <td className="is-right">
                <span className={["mv-st-qty", isOut ? "is-out" : "is-in", err ? "is-err" : ""].join(" ")}>{it.qty}</span>
              </td>
              <td className="is-right">
                <span className="mv-st-total">{brl(it.unit * it.qty)}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ════ SHEET ════════════════════════════════════════════
   type:  "in" | "out"
   state: "initial" | "filled" | "invalid" | "other" | "saving"
   - initial:  cabeçalho preenchível, tabela de itens vazia (empty state) → Registrar off
   - filled:   itens na tabela, válido → Registrar on
   - invalid:  saída com linha de estoque insuficiente (badge na linha) → Registrar off
   - other:    motivo "Outro" → Textarea de descrição obrigatória
   - saving:   "Registrando…" */
function MvSheet({ type = "in", state = "initial", standalone, mobile, hoverIdx, removingIdx }) {
  const isOut = type === "out";
  const isInitial = state === "initial";
  const isInvalid = state === "invalid";
  const isOther = state === "other";
  const saving = state === "saving";

  const items = isInitial ? []
    : isInvalid ? ITEMS_OUT_INVALID
    : isOut ? ITEMS_OUT
    : ITEMS_IN;
  const hasItems = items.length > 0;

  const reason = isOther ? "Outro" : (saving || hasItems ? (isOut ? "Perda / Avaria" : "Compra") : "");
  const doc = (saving || hasItems) ? (isOut ? "Ocorrência #14" : "NF-e 004821") : "";

  // Registrar habilitado: ao menos 1 item E sem campo obrigatório pendente E sem linha inválida
  const submitOff = saving || !hasItems || isInvalid;

  return (
    <div className={["mv-sheet wf", standalone ? "is-standalone" : ""].join(" ")}>
      <div className="mv-sheet-head">
        <h2 className="mv-sheet-title">Registrar movimentação</h2>
        <p className="mv-sheet-desc">Registre uma entrada ou saída de estoque.</p>
        <span className="mv-sheet-x">{MOV_I.x}</span>
      </div>

      <div className="mv-sheet-body">
        {/* Tipo */}
        <WField label="Tipo de movimentação"><MvSeg type={type} /></WField>

        {/* Motivo */}
        <WField label="Motivo">
          <MvFullSelect value={reason} placeholder="Selecione um motivo" />
          <WHelper>{isOut ? "Perda/Avaria · Devolução a fornecedor · Uso interno · Ajuste (−) · Outro" : "Compra · Devolução de cliente · Ajuste (+) · Outro"}</WHelper>
        </WField>

        {/* Descrição (condicional — motivo "Outro") */}
        {isOther && (
          <WField label="Descrição do motivo">
            <div className="mv-textarea">Peças para brinde de campanha de inverno.</div>
            <WHelper>Obrigatório quando o motivo é “Outro”.</WHelper>
          </WField>
        )}

        {/* Documento de referência (opcional) */}
        <WField label="Documento de referência (opcional)">
          <WInput value={doc} placeholder="Nº de NF, pedido ou outro identificador." mono />
        </WField>

        {/* Data / hora */}
        <WField label="Data e hora">
          <MvDateTime />
          <WHelper>Pré-preenchida com o momento atual. Edite para registros retroativos.</WHelper>
        </WField>

        {/* ── Seção Produtos ── */}
        <div className="mv-prodsection">
          <div className="mv-prodsection-head">
            <span className="mv-prodsection-label">Produtos</span>
            <div className="mv-addprod"><WBtn variant="outline"><span className="mv-addprod-ico">{MOV_I.plus}</span>Adicionar produto</WBtn></div>
          </div>

          {hasItems ? (
            <div className={mobile ? "" : "mv-sheettable-wrap"}>
              <MvItemsTable type={type} items={items} mobile={mobile} hoverIdx={hoverIdx} removingIdx={removingIdx} />
            </div>
          ) : (
            <div className="mv-sheet-emptyitems">Nenhum produto adicionado ainda.</div>
          )}
        </div>

        {/* nota de imutabilidade */}
        {(isInitial) && (
          <div style={{ marginTop: 18 }}>
            <div className="mv-infonote">
              <span className="mv-in-ico">{MOV_I.info}</span>
              <span className="mv-in-text">Movimentações não podem ser editadas nem estornadas. Para corrigir, registre uma movimentação inversa.</span>
            </div>
          </div>
        )}
      </div>

      <div className="mv-sheet-foot">
        <div className="mv-foot-cancel"><WBtn variant="ghost">Cancelar</WBtn></div>
        <div className="mv-foot-submit">
          <WBtn loading={saving} disabled={submitOff}>{saving ? "Registrando…" : "Registrar"}</WBtn>
        </div>
      </div>
    </div>
  );
}

/* ════ DIALOG — Adicionar / Editar item ════════════════════
   mode:  "add" | "edit"
   type:  "in" | "out"   (muda label do valor unitário)
   variant: "list" (produto com variações) | "single" (sem variações)
   invalidIdx: índice da variante com estoque insuficiente (saída)
   filled: índices das variantes com quantidade preenchida (mostra valores) */
function MvItemDialog({ mode = "add", type = "in", variant = "list", invalidIdx = -1, filled = [], standalone, mobile, prodName = "Camisa Social Algodão", prodSku = "CS-ALG" }) {
  const isOut = type === "out";
  const valueLabel = isOut ? "Preço de venda" : "Custo unitário";
  const rows = variant === "single"
    ? [{ attrs: "Produto sem variações", sku: prodSku, saldo: 6, single: true }]
    : SAMPLE_VARIANTS;

  // valores de exemplo por linha preenchida
  const sample = { 0: { unit: isOut ? "89,90" : "29,00", qty: isOut ? "2" : "12" }, 2: { unit: isOut ? "89,90" : "29,00", qty: "18" } };
  const totalItens = filled.length || (variant === "single" ? 1 : 0);

  return (
    <div className={["mv-dialog wf", standalone ? "is-standalone" : "", mobile ? "is-mobile" : ""].join(" ")}>
      {mobile && <span className="mv-dialog-grab" />}
      {/* cabeçalho: thumb + nome + sku */}
      <div className="mv-dialog-head">
        <span className="pd-thumb" />
        <span className="mv-dialog-headmeta">
          <span className="mv-dialog-title">{mode === "edit" ? "Editar item" : "Adicionar item"}: {prodName}</span>
          <span className="mv-dialog-sku">{prodSku}</span>
        </span>
        <span className="mv-sheet-x">{MOV_I.x}</span>
      </div>

      {/* corpo: lista de variantes */}
      <div className="mv-dialog-body">
        {variant === "list" && <div className="mv-dialog-varlabel">Variantes ({rows.length})</div>}
        <div className="mv-varlist">
          {rows.map((v, i) => {
            const isFilled = filled.includes(i);
            const vals = sample[i] || { unit: "", qty: "" };
            const invalid = i === invalidIdx;
            return (
              <div key={i} className={["mv-varrow", isFilled || invalid ? "is-active" : "", invalid ? "is-err" : ""].join(" ")}>
                <div className="mv-varrow-top">
                  {!v.single && <span className="mv-swatch" style={{ background: v.swatch }} />}
                  <span className="mv-varrow-info">
                    <span className="mv-varrow-attrs">{v.attrs}</span>
                    <span className="mv-varrow-sku">{v.sku}</span>
                  </span>
                  <span className="mv-varrow-stock">Estoque: {v.saldo} un.</span>
                </div>
                <div className="mv-varrow-fields">
                  <span className="mv-vf">
                    <span className="mv-vf-label">{valueLabel}</span>
                    <MvPrefixInput value={isFilled ? vals.unit : ""} placeholder="0,00" />
                  </span>
                  <span className="mv-vf is-qty">
                    <span className="mv-vf-label">Quantidade</span>
                    <WInput value={invalid ? "20" : (isFilled ? vals.qty : "")} placeholder="0" error={invalid} mono />
                  </span>
                </div>
                {invalid && <span className="mv-varrow-err">{MOV_I.info}Estoque insuficiente — há {v.saldo} disponível.</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* rodapé: total de itens + ações */}
      <div className="mv-dialog-foot">
        <span className="mv-dialog-total">Total de itens: <b>{totalItens}</b></span>
        <div className="mv-dialog-acts">
          <div className="mv-dialog-cancel"><WBtn variant="ghost">Cancelar</WBtn></div>
          <div className="mv-dialog-confirm"><WBtn disabled={invalidIdx >= 0}>Confirmar</WBtn></div>
        </div>
      </div>
    </div>
  );
}

/* sheet montado sobre a tela (scrim) — para a anatomia */
function MvSheetOverShell({ type = "in", state = "filled" }) {
  return (
    <div className="mv-sheet-stage">
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}>
        <MvHistoryShell scenario="base" />
      </div>
      <div className="mv-sheet-scrim" />
      <MvSheet type={type} state={state} />
    </div>
  );
}

/* dialog montado sobre o sheet (scrim central) — para a anatomia */
function MvDialogOverSheet({ mode = "add", type = "in", variant = "list", invalidIdx = -1, filled = [] }) {
  return (
    <div className="mv-sheet-stage">
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}>
        <MvHistoryShell scenario="base" />
      </div>
      <MvSheet type={type} state="filled" />
      <div className="mv-dialog-scrim" />
      <div className="mv-dialog-center">
        <MvItemDialog mode={mode} type={type} variant={variant} invalidIdx={invalidIdx} filled={filled} />
      </div>
    </div>
  );
}

/* dialog no mobile — bottom sheet sobre o Sheet em tela cheia */
function MvDialogMobile({ mode = "add", type = "in", variant = "list", invalidIdx = -1, filled = [] }) {
  return (
    <div className="mv-mdialog-stage wf">
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        <MvSheet type={type} state="filled" standalone mobile />
      </div>
      <div className="mv-dialog-scrim" />
      <div className="mv-mdialog-dock">
        <MvItemDialog mode={mode} type={type} variant={variant} invalidIdx={invalidIdx} filled={filled} mobile />
      </div>
    </div>
  );
}

Object.assign(window, {
  MOVS: { MvSeg, MvFullSelect, MvPrefixInput, MvDateTime, REASONS, MvItemsTable, MvSheet, MvItemDialog, MvSheetOverShell, MvDialogOverSheet, MvDialogMobile },
});
