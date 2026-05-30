/* Inventto — Wireframe · Sheet 2.4.2 Registrar movimentação (sobre /movimentacoes ou /produtos)
   Sheet lateral direita (max-w-md). Toggle Entrada/Saída recarrega motivos e exibe/oculta
   custo. Reusa o kit (window.WF_*) e classes mv-/pd-. Exporta em window.MOVS. */

const { MOV_I, MvHistoryShell } = window.MOV;

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
function MvPrefixInput({ value, placeholder }) {
  return (
    <div className="mv-prefix-input">
      <span className="mv-prefix">R$</span>
      <span className={["mv-prefix-val", value ? "" : "is-placeholder"].join(" ")}>{value || placeholder}</span>
    </div>
  );
}

/* MOTIVOS por tipo */
const REASONS = {
  in:  ["Compra", "Devolução de cliente", "Ajuste de inventário (+)", "Outro"],
  out: ["Perda / Avaria", "Devolução a fornecedor", "Uso interno", "Ajuste de inventário (−)", "Outro"],
};

/* ════ SHEET ════════════════════════════════════════════
   type:  "in" | "out"
   state: "initial" | "prefilled" | "valid" | "invalid" | "other" | "saving"
   - initial:   campos vazios, produto via Command (busca aberta opcional)
   - prefilled: produto readonly (aberto via atalho)
   - valid:     saída com quantidade válida (helper verde)
   - invalid:   saída com estoque insuficiente (erro inline + submit off)
   - other:     motivo "Outro" → textarea obrigatória
   - saving:    "Registrando…" */
function MvSheet({ type = "in", state = "initial", standalone, searchOpen }) {
  const isOut = type === "out";
  const isPre = state === "prefilled";
  const isValid = state === "valid";
  const isInvalid = state === "invalid";
  const isOther = state === "other";
  const saving = state === "saving";

  // produto de exemplo: variável (Camisa) p/ mostrar select de variante
  const prodName = "Camisa Social Algodão";
  const prodSku = "CS-ALG";
  const variantLabel = "Branco / M · CS-ALG-BR-M";
  const saldo = 12;
  const qtyVal = isInvalid ? "20" : (isValid || isOther || saving ? "3" : (type === "in" && (isPre) ? "10" : ""));
  const reason = isOther ? "Outro" : (saving ? (isOut ? "Perda / Avaria" : "Compra") : (isPre ? (isOut ? "Perda / Avaria" : "Compra") : ""));
  const reasonList = REASONS[type];

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

        {/* Produto */}
        <WField label="Produto">
          {isPre ? (
            <div className="mv-prodchip">
              <span className="pd-thumb is-sm" />
              <span className="mv-prodchip-meta">
                <span className="mv-prodchip-name">{prodName}</span>
                <span className="mv-prodchip-sku">{prodSku}</span>
              </span>
              <span className="mv-lock">{MOV_I.lock}</span>
            </div>
          ) : (
            <>
              <MvFullSelect value={(state === "initial" && searchOpen) ? "" : prodName} placeholder="Buscar produto…" />
              {searchOpen && (
                <div className="mv-command">
                  <div className="mv-command-search"><WInput placeholder="Buscar produto ou SKU…" value="Cam" trail={MOV_I.search} /></div>
                  <div className="mv-command-label">Produtos</div>
                  <div className="mv-command-item is-active">
                    <span className="pd-thumb is-sm" />
                    <span className="mv-prodchip-meta"><span className="mv-prodchip-name">Camisa Social Algodão</span><span className="mv-prodchip-sku">CS-ALG · 5 variações</span></span>
                    <span className="mv-cmd-stock">64 un.</span>
                  </div>
                  <div className="mv-command-item">
                    <span className="pd-thumb is-sm" />
                    <span className="mv-prodchip-meta"><span className="mv-prodchip-name">Calça Alfaiataria</span><span className="mv-prodchip-sku">CA-ALF-02</span></span>
                    <span className="mv-cmd-stock">6 un.</span>
                  </div>
                </div>
              )}
            </>
          )}
          {isPre && <WHelper>Aberto a partir do produto — campo travado.</WHelper>}
        </WField>

        {/* Variante (produto com variações) */}
        {!searchOpen && (
          <WField label="Variante">
            <MvFullSelect value={(isPre || saving || isValid || isInvalid || isOther) ? variantLabel : ""} placeholder="Selecione a variante" />
          </WField>
        )}

        {/* Quantidade */}
        {!searchOpen && (
          <WField label="Quantidade">
            <WInput value={qtyVal} placeholder="0" error={isInvalid} mono />
            {isOut && !isInvalid && (isValid || isOther || saving) && (
              <span className="mv-helper-ok">{MOV_I.check}Disponível: {saldo} un.</span>
            )}
            {isOut && isInvalid && <WError>Estoque insuficiente — há {saldo} disponível.</WError>}
            {isOut && state === "initial" && <WHelper>Disponível: {saldo} un.</WHelper>}
            {!isOut && <WHelper>Quantidade que está entrando no estoque.</WHelper>}
          </WField>
        )}

        {/* Motivo */}
        {!searchOpen && (
          <WField label="Motivo">
            <MvFullSelect value={reason} placeholder="Selecione um motivo" />
            <WHelper>{isOut ? "Perda/Avaria · Devolução a fornecedor · Uso interno · Ajuste (−) · Outro" : "Compra · Devolução de cliente · Ajuste (+) · Outro"}</WHelper>
          </WField>
        )}

        {/* Descrição (condicional — motivo "Outro") */}
        {!searchOpen && isOther && (
          <WField label="Descrição do motivo">
            <div className="mv-textarea">Peças para brinde de campanha de inverno.</div>
            <WHelper>Obrigatório quando o motivo é “Outro”.</WHelper>
          </WField>
        )}

        {/* Custo unitário (condicional — somente Entrada) */}
        {!searchOpen && !isOut && (
          <WField label="Custo unitário">
            <MvPrefixInput value={(isPre || saving) ? "48,00" : ""} placeholder="0,00" />
            <WHelper>Usado para calcular o custo médio do item.</WHelper>
          </WField>
        )}

        {/* Documento de referência (opcional) */}
        {!searchOpen && (
          <WField label="Documento de referência (opcional)">
            <WInput value={(isPre || saving) ? "NF-e 004821" : ""} placeholder="Nº da nota, pedido…" mono />
          </WField>
        )}

        {/* nota de imutabilidade */}
        {!searchOpen && (state === "initial" || isPre) && (
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
          <WBtn loading={saving} disabled={isInvalid}>{saving ? "Registrando…" : "Registrar"}</WBtn>
        </div>
      </div>
    </div>
  );
}

/* sheet montado sobre a tela (scrim) — para a anatomia */
function MvSheetOverShell({ type = "in", state = "initial" }) {
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

Object.assign(window, {
  MOVS: { MvSeg, MvFullSelect, MvPrefixInput, REASONS, MvSheet, MvSheetOverShell },
});
