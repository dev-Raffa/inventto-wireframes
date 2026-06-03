/* Inventto — Wireframe · Módulo PDV · composições de overlay + versões mobile.
   Revisão jun/2026: a Consulta de vendas saiu deste módulo (passou para
   /movimentacoes · tipo Saída · motivo Venda). Este arquivo agora monta:
   • o catálogo /pdv em mobile (busca + grade + FAB),
   • o Dialog "Adicionar produto" sobre o catálogo (desktop e mobile),
   • o Sheet "Carrinho da venda" sobre o catálogo (desktop · direita e
     mobile · de baixo).
   Reusa window.PDV e a casca. Exporta em window.PDVV. */

const { SH_I } = window.SH;
const { PDV_I, PvCatalogScreen, PvFab, AddProductDialog, CartSheet, NewSaleShell } = window.PDV;

/* topbar mobile reaproveitada */
function MTopbar() {
  return (
    <div className="sh-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="sh-iconbtn">{SH_I.menu}</div><WLogo />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className="sh-iconbtn">{SH_I.bell}</div><span className="sh-avatar">JR</span>
      </div>
    </div>
  );
}

/* ════ /pdv mobile — catálogo tela cheia + FAB ═════════ */
function NewSaleMobile({ scenario = "base", fab = 3 }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <MTopbar />
      <PvCatalogScreen scenario={scenario} />
      <PvFab count={fab} />
    </div>
  );
}

/* ════ Dialog "Adicionar produto" sobre o catálogo ═════ */
function AddDialogOverDesktop({ variant = "base" }) {
  return (
    <div className="pv-overlay-stage">
      <div className="pv-overlay-dim"><NewSaleShell scenario="base" fab={0} /></div>
      <div className="mv-dialog-scrim" />
      <div className="mv-dialog-center"><AddProductDialog variant={variant} /></div>
    </div>
  );
}

function AddDialogOverMobile({ variant = "base" }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pv-overlay-dim" style={{ position: "absolute", inset: 0 }}><NewSaleMobile fab={0} /></div>
      <div className="mv-dialog-scrim" />
      <div className="mv-dialog-center" style={{ padding: 18 }}><AddProductDialog variant={variant} /></div>
    </div>
  );
}

/* ════ Sheet "Carrinho" sobre o catálogo ═══════════════ */
function CartSheetOverDesktop({ state = "filled" }) {
  return (
    <div className="pv-overlay-stage">
      <div className="pv-overlay-dim"><NewSaleShell scenario="base" fab={3} /></div>
      <div className="mv-sheet-scrim" />
      <CartSheet state={state} side="right" />
    </div>
  );
}

function CartSheetOverMobile({ state = "filled" }) {
  return (
    <div className="wf sh-mobile" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pv-overlay-dim" style={{ position: "absolute", inset: 0 }}><NewSaleMobile fab={3} /></div>
      <div className="mv-sheet-scrim" />
      <CartSheet state={state} side="bottom" />
    </div>
  );
}

Object.assign(window, {
  PDVV: {
    MTopbar, NewSaleMobile,
    AddDialogOverDesktop, AddDialogOverMobile,
    CartSheetOverDesktop, CartSheetOverMobile,
  },
});
