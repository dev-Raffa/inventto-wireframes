/* Inventto — Wireframe · Módulo Organização (Superfície 2 · 2.1)
   Tela 2.1.1 Configuração da organização (/configuracoes) + modais 2.1.2 / 2.1.3.
   Reusa o kit (window.WF_*) e a casca (window.SH). Exporta em window.ORG. */

const { Sidebar, TopHeader, SH_I, WSwitch } = window.SH;

/* ícones locais (lucide-like, 1.5 stroke) que faltam no kit */
const oic = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const ORG_I = {
  upload: oic(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5"/></>),
  clock: oic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  alert: oic(<><path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>),
  circlex: oic(<><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/></>),
  sliders: oic(<><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.4"/><circle cx="15" cy="16" r="2.4"/></>),
  save: oic(<><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/></>),
  discard: oic(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>),
  lock: oic(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>),
  dot: <svg width="9" height="9" viewBox="0 0 9 9"><circle cx="4.5" cy="4.5" r="2.4" fill="currentColor"/></svg>,
};

const ORG_NAME = "Ateliê Joana";

/* ════ TABS ════════════════════════════════════════════ */
function OrgTabs({ active = "loja" }) {
  const tabs = [
    ["loja", "Loja", SH_I.store],
    ["op", "Operacional", ORG_I.sliders],
    ["horarios", "Horários", ORG_I.clock],
    ["danger", "Danger Zone", ORG_I.alert],
  ];
  return (
    <div className="org-tabs">
      {tabs.map(([id, label, icon]) => (
        <div key={id} className={["org-tab", id === active ? "is-active" : "", id === "danger" ? "is-danger" : ""].join(" ")}>
          <span className="org-tab-ico">{icon}</span>{label}
        </div>
      ))}
    </div>
  );
}

/* ════ ABA: LOJA ═══════════════════════════════════════ */
function TabLoja({ cepError, uploading }) {
  return (
    <div className="org-tabpanel">
      {/* logo */}
      <span className="wf-label">Logo da loja</span>
      <div className="org-logo-row">
        <span className={["org-logo-preview", "is-filled"].join(" ")}>
          {uploading && <span className="wf-spin" style={{ borderColor: "rgba(44,42,40,.25)", borderTopColor: "var(--wf-ink)" }} />}
        </span>
        <div className="org-logo-actions">
          <span className="org-logo-btn">{ORG_I.upload}{uploading ? "Enviando…" : "Trocar logo"}</span>
          <p className="wf-helper" style={{ margin: 0 }}>PNG, JPG ou WEBP até 5MB. Sobe em background.</p>
        </div>
      </div>

      {/* nome fantasia */}
      <WField label="Nome fantasia"><WInput value={ORG_NAME} /></WField>

      {/* identidade fiscal (somente leitura — RN018) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
        <span className="wf-label" style={{ margin: 0 }}>Identidade fiscal</span>
        <span className="org-lock-tag">{ORG_I.lock}somente leitura · RN018</span>
      </div>
      <div className="org-readonly" role="region" aria-label="Identidade fiscal" aria-readonly="true">
        <div className="org-readonly-grid">
          <div className="org-ro-item">
            <div className="org-ro-label">Documento (CNPJ)</div>
            <div className="org-ro-value is-mono">12.345.678/0001-90</div>
          </div>
          <div className="org-ro-item">
            <div className="org-ro-label">Razão social</div>
            <div className="org-ro-value">Joana Ribeiro Confecções ME</div>
          </div>
        </div>
        <WHelper>Para alterar a identidade fiscal, crie uma nova organização.</WHelper>
      </div>

      {/* endereço (RN024) */}
      <div className="wf-field"><span className="wf-label">Endereço</span></div>
      <div className="org-addr-grid">
        <div className="org-span-2">
          <WField label="CEP">
            <WInput value={cepError ? "00000-000" : "01310-100"} mono error={cepError}
              trail={uploading ? null : (cepError ? null : ORG_I.dot)} />
          </WField>
        </div>
        <div className="org-span-4">
          <WField label="Logradouro"><WInput value={cepError ? "" : "Av. Paulista"} placeholder="Preencha o endereço" /></WField>
        </div>
        <div className="org-span-2">
          <WField label="Número"><WInput value="1578" placeholder="—" /></WField>
        </div>
        <div className="org-span-4">
          <WField label="Complemento"><WInput value="Sala 04" placeholder="Opcional" /></WField>
        </div>
        <div className="org-span-3">
          <WField label="Bairro"><WInput value={cepError ? "" : "Bela Vista"} placeholder="—" /></WField>
        </div>
        <div className="org-span-2">
          <WField label="Cidade"><WInput value={cepError ? "" : "São Paulo"} placeholder="—" /></WField>
        </div>
        <div className="org-span-1" style={{ gridColumn: "span 1" }}>
          <WField label="UF"><WInput value={cepError ? "" : "SP"} placeholder="—" /></WField>
        </div>
      </div>
      {cepError && <WError>CEP não encontrado. Preencha o endereço manualmente.</WError>}
    </div>
  );
}

/* ════ ABA: OPERACIONAL ════════════════════════════════ */
function TabOperacional() {
  return (
    <div className="org-tabpanel">
      <WField label="Fuso horário"><WSelect value="America/Sao_Paulo (GMT-3)" /></WField>
      <WHelper>Usado para calcular o status de abertura da vitrine.</WHelper>
      <div style={{ borderTop: "1px solid var(--wf-line-soft)", marginTop: 18 }} />
      <div className="org-toggle-row">
        <span className="org-toggle-meta">
          <span className="org-toggle-title">Aceitar pedidos com a loja fechada</span>
          <p className="org-toggle-desc">Quando ativado, a vitrine aceita pedidos mesmo fora do horário de funcionamento, com aviso ao cliente.</p>
        </span>
        <WSwitch on />
      </div>
    </div>
  );
}

/* ════ ABA: HORÁRIOS ═══════════════════════════════════ */
function TabHorarios() {
  const days = [
    ["Segunda", true, "09:00", "18:00"],
    ["Terça", true, "09:00", "18:00"],
    ["Quarta", true, "09:00", "18:00"],
    ["Quinta", true, "09:00", "18:00"],
    ["Sexta", true, "09:00", "18:00"],
    ["Sábado", true, "09:00", "13:00"],
    ["Domingo", false, "", ""],
  ];
  return (
    <div className="org-tabpanel">
      <WHelper style={{ marginTop: 0 }}>Os horários controlam o status da vitrine para os clientes.</WHelper>
      <div className="org-hours">
        {days.map(([day, on, open, close]) => (
          <div className="org-hour-row" key={day}>
            <span className="org-hour-day"><WSwitch on={on} />{day}</span>
            {on ? (
              <span className="org-hour-times">
                <span style={{ flex: "0 0 96px" }}><WInput value={open} mono /></span>
                <span className="org-hour-dash">até</span>
                <span style={{ flex: "0 0 96px" }}><WInput value={close} mono /></span>
              </span>
            ) : (
              <span className="org-hour-closed">Fechado</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════ ABA: DANGER ZONE ════════════════════════════════ */
function TabDanger() {
  return (
    <div className="org-tabpanel">
      <div className="org-danger" role="region" aria-label="Zona de risco">
        <h2 className="org-danger-h">{ORG_I.alert}Zona de risco</h2>
        <p className="org-danger-sub">Ações sensíveis que afetam a operação inteira desta organização.</p>
        <div className="org-danger-row">
          <span className="org-danger-meta">
            <span className="org-danger-title">Desativar organização</span>
            <p className="org-danger-desc">Pausa as vendas e tira as vitrines do ar temporariamente. Você pode reativar quando quiser.</p>
          </span>
          <span className="org-danger-btn is-outline">Desativar</span>
        </div>
        <div className="org-danger-row">
          <span className="org-danger-meta">
            <span className="org-danger-title">Excluir organização</span>
            <p className="org-danger-desc">Encerra permanentemente esta unidade. Esta ação não pode ser desfeita.</p>
          </span>
          <span className="org-danger-btn is-solid">Excluir</span>
        </div>
      </div>
    </div>
  );
}

/* ════ Ações no topo (descartar + salvar) ═════════════ */
function OrgHeaderActions({ saving, uploading, compact }) {
  if (compact) {
    return (
      <span className="org-head-actions is-compact">
        <span className="org-iconbtn" aria-label="Descartar">{ORG_I.discard}</span>
        <span className={["org-iconbtn", "is-primary", uploading ? "is-disabled" : ""].join(" ")} aria-label="Salvar alterações">
          {saving ? <span className="wf-spin" /> : ORG_I.save}
        </span>
      </span>
    );
  }
  return (
    <span className="org-head-actions">
      <WBtn variant="ghost">Descartar</WBtn>
      <WBtn loading={saving} disabled={uploading}>
        {saving ? "Salvando…" : <><span className="org-save-ico">{ORG_I.save}</span>Salvar alterações</>}
      </WBtn>
    </span>
  );
}

/* ════ Conteúdo da tela /configuracoes ═════════════════ */
function OrgConfig({ tab = "loja", pending, saving, cepError, uploading, compact }) {
  const showActions = (pending || saving) && tab !== "danger";
  const actions = showActions ? <OrgHeaderActions saving={saving} uploading={uploading} compact={compact} /> : null;
  return (
    <div className="org-col">
      <div className="org-headrow">
        <div>
          <h1 className="wf-h1" style={{ fontSize: 27 }}>Configurações</h1>
          <p className="org-head-sub">{ORG_NAME} · organização ativa</p>
        </div>
        {compact && actions}
      </div>
      <div className="org-tabsbar">
        <OrgTabs active={tab} />
        {!compact && actions}
      </div>
      {tab === "loja" && <TabLoja cepError={cepError} uploading={uploading} />}
      {tab === "op" && <TabOperacional />}
      {tab === "horarios" && <TabHorarios />}
      {tab === "danger" && <TabDanger />}
    </div>
  );
}

/* ════ Shell completa com a tela montada (desktop) ═════ */
function OrgConfigShell({ tab = "loja", pending, saving, cepError, uploading }) {
  return (
    <div className="wf sh-app">
      <Sidebar role="owner" active="org" />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Configurações"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto", paddingLeft: 18, paddingRight: 18 }}>
          <OrgConfig tab={tab} pending={pending} saving={saving} cepError={cepError} uploading={uploading} />
        </div>
      </div>
    </div>
  );
}

/* ════ Shell mobile ════════════════════════════════════ */
function OrgConfigMobile({ tab = "loja", pending }) {
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
      <div className="sh-mobile-main" style={{ overflow: "auto", background: "var(--wf-field)", padding: 18 }}>
        <OrgConfig tab={tab} pending={pending} compact />
      </div>
    </div>
  );
}

/* ════ Skeleton (carregando) ═══════════════════════════ */
function OrgConfigLoading() {
  return (
    <div className="org-col">
      <div className="wf-sk" style={{ width: 180, height: 24 }} />
      <div className="wf-sk" style={{ width: 220, height: 11, marginTop: 10 }} />
      <div style={{ display: "flex", gap: 18, margin: "26px 0 18px" }}>
        {[60, 84, 64, 88].map((w, i) => <div key={i} className="wf-sk" style={{ width: w, height: 12 }} />)}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 22 }}>
        <span className="wf-sk" style={{ width: 72, height: 72, borderRadius: "50%" }} />
        <div style={{ flex: 1 }}>
          <div className="wf-sk" style={{ width: 130, height: 11 }} />
          <div className="wf-sk" style={{ width: 200, height: 9, marginTop: 8 }} />
        </div>
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <div className="wf-sk" style={{ width: 90, height: 10 }} />
          <div className="wf-sk" style={{ width: "100%", height: 42, marginTop: 7, borderRadius: 9 }} />
        </div>
      ))}
    </div>
  );
}

/* ════ MODAL 2.1.2 — Desativar organização ═════════════ */
function DeactivateOrgDialog({ executing }) {
  return (
    <div className="org-dialog wf">
      <div className="org-dialog-icon">{ORG_I.alert}</div>
      <h2 className="org-dialog-title">Desativar {ORG_NAME}?</h2>
      <p className="org-dialog-lead">A operação fica pausada — mas nada é perdido.</p>
      <div className="org-conseq">
        <span className="org-conseq-item"><span className="org-conseq-mk">{ORG_I.dot}</span>Os catálogos e vitrines saem do ar.</span>
        <span className="org-conseq-item"><span className="org-conseq-mk">{ORG_I.dot}</span>Gerentes e Vendedores perdem o acesso.</span>
        <span className="org-conseq-item"><span className="org-conseq-mk">{ORG_I.dot}</span>Pedidos pendentes são cancelados e o estoque, liberado.</span>
      </div>
      <p className="org-conseq-note">Você pode reativar quando quiser.</p>
      <div className="org-dialog-foot">
        <div style={{ flex: 1 }}><WBtn variant="outline">Cancelar</WBtn></div>
        <div style={{ flex: 1 }}><WBtn variant="destructive" loading={executing}>{executing ? "Desativando…" : "Desativar"}</WBtn></div>
      </div>
    </div>
  );
}

/* ════ MODAL 2.1.3 — Excluir organização ═══════════════
   match: "empty" (vazio) | "partial" (divergente) | "exact" (confere) */
function DeleteOrgDialog({ match = "empty", purge, executing }) {
  const typed = { empty: "", partial: "Ateliê Joa", exact: ORG_NAME }[match];
  const enabled = match === "exact";
  return (
    <div className="org-dialog wf">
      <div className="org-dialog-icon">{ORG_I.circlex}</div>
      <h2 className="org-dialog-title">Excluir {ORG_NAME}?</h2>
      <p className="org-dialog-lead">Esta ação encerra permanentemente esta unidade. Os catálogos saem do ar e a organização some do seu painel.</p>

      <div style={{ marginTop: 16 }}>
        <WCheckbox checked={purge}>Também excluir permanentemente todos os dados desta organização.</WCheckbox>
        <WHelper>Inclui produtos, histórico e pedidos (direito ao esquecimento — LGPD). Sem essa opção, os dados ficam retidos e inacessíveis.</WHelper>
      </div>

      <p className="org-confirm-helper">Para confirmar, digite <b>{ORG_NAME}</b> abaixo.</p>
      <WInput value={typed} placeholder={ORG_NAME} focus={match !== "empty"} error={match === "partial"} />
      {match === "partial" && <WError>O nome não confere ainda.</WError>}

      <div className="org-dialog-foot">
        <div style={{ flex: 1 }}><WBtn variant="outline">Cancelar</WBtn></div>
        <div style={{ flex: 1 }}><WBtn variant="destructive" disabled={!enabled} loading={executing}>{executing ? "Excluindo…" : "Excluir organização"}</WBtn></div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ORG: {
    ORG_I, ORG_NAME, OrgTabs, TabLoja, TabOperacional, TabHorarios, TabDanger,
    OrgHeaderActions, OrgConfig, OrgConfigShell, OrgConfigMobile, OrgConfigLoading,
    DeactivateOrgDialog, DeleteOrgDialog,
  },
});
