/* Inventto — Wireframe · Módulo Equipe & Permissões (Superfície 2 · 2.2)
   Tela 2.2.1 Lista de membros (/equipe) + Sheet 2.2.2 Adicionar/replicar membro.
   Reusa o kit (window.WF_*) e a casca (window.SH). Exporta em window.EQ. */

const { Sidebar, TopHeader, SH_I, WSwitch } = window.SH;

/* ícones locais (lucide-like, 1.6 stroke) */
const eic = (p) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const EQ_I = {
  userPlus: eic(<><circle cx="9" cy="8" r="3.4" /><path d="M3 20a6 6 0 0 1 12 0M17 8h5M19.5 5.5v5" /></>),
  search: eic(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></>),
  shieldCheck: eic(<><path d="M12 3 5 6v5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>),
  shieldHalf: eic(<><path d="M12 3 5 6v5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" /><path d="M12 3v18" /></>),
  user: eic(<><circle cx="12" cy="8" r="3.6" /><path d="M5 20a7 7 0 0 1 14 0" /></>),
  chevDown: <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 5.5 7 9l3.5-3.5" /></svg>,
  chevL: eic(<path d="m15 6-6 6 6 6" />),
  chevR: eic(<path d="m9 6 6 6-6 6" />),
  x: eic(<path d="M6 6 18 18M18 6 6 18" />),
  eye: eic(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>),
  lock: eic(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>),
  userCheck: eic(<><circle cx="9" cy="8" r="3.4" /><path d="M3 20a6 6 0 0 1 12 0M16 11l2 2 4-4" /></>),
  users: eic(<><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6M21 20a6 6 0 0 0-3.5-5.4" /></>),
  info: eic(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>)
};

const ROLE_ICON = { Dono: EQ_I.shieldCheck, Gerente: EQ_I.shieldHalf, Vendedor: EQ_I.user };

/* equipe de exemplo (organização ativa: Ateliê Joana) */
const TEAM = [
{ id: "joana", name: "Joana Ribeiro", mail: "joana@email.com", initials: "JR", role: "Dono", status: "Ativo", you: true },
{ id: "marcos", name: "Marcos Lima", mail: "marcos.lima@email.com", initials: "ML", role: "Gerente", status: "Ativo" },
{ id: "bia", name: "Beatriz Souza", mail: "bia.souza@email.com", initials: "BS", role: "Vendedor", status: "Ativo" },
{ id: "carla", name: "Carla Mendes", mail: "carla.m@email.com", initials: "CM", role: "Vendedor", status: "Convidado" },
{ id: "pedro", name: "Pedro Alves", mail: "pedro.alves@email.com", initials: "PA", role: "Gerente", status: "Inativo" }];


/* ════ BADGE de papel / estado ═════════════════════════ */
function EqBadge({ kind, value }) {
  // kind: "role" | "status"
  const cls =
  value === "Dono" ? "is-owner" :
  value === "Gerente" ? "is-gerente" :
  value === "Vendedor" ? "is-vendedor" :
  value === "Ativo" ? "is-active" :
  value === "Convidado" ? "is-invited" :
  value === "Inativo" ? "is-inactive" : "";
  const ico = kind === "role" ? ROLE_ICON[value] : null;
  return (
    <span className={["eq-badge", cls].join(" ")}>
      {ico && <span className="eq-badge-ico">{ico}</span>}
      {value}
    </span>);

}

/* select compacto inline (célula / filtro) */
function EqSelect({ value, placeholder, pending, disabled, w }) {
  const cls = ["eq-select", value ? "" : "is-placeholder", pending ? "is-pending" : "", disabled ? "is-disabled" : ""].join(" ");
  return (
    <span className={cls} style={w ? { width: w, minWidth: w } : null}>
      <span className="eq-grow">{value || placeholder}</span>
      <span className="eq-chev">{EQ_I.chevDown}</span>
    </span>);

}

/* ════ CÉLULA EDITÁVEL (badge salvo + select pendente + botão) ══
   state: "idle" | "pending" | "saving"  ·  static: rótulo no lugar dos controles */
function EqEditCell({ kind, saved, pending, state = "idle", staticNote }) {
  if (staticNote) {
    return (
      <span className="eq-cell">
        <span className={["eq-badge-slot", kind === "status" ? "is-status" : ""].join(" ")} style={{ width: "83px" }}><EqBadge kind={kind} value={saved} /></span>
        <span className="eq-cell-static">{staticNote}</span>
      </span>);

  }
  const sel = pending || saved;
  const changed = state === "pending" || state === "saving";
  const btnLabel = kind === "role" ? "Alterar Função" : "Alterar Status";
  const btnCls = state === "saving" ? "is-saving" : changed ? "is-active" : "is-idle";
  return (
    <span className="eq-cell">
      <span className={["eq-badge-slot", kind === "status" ? "is-status" : ""].join(" ")}><EqBadge kind={kind} value={saved} /></span>
      <span className="eq-cell-control">
        <EqSelect value={sel} pending={changed} disabled={state === "saving"} w={kind === "role" ? 90 : 70} />
        <span className={["eq-cellbtn", btnCls].join(" ")}>
          {state === "saving" ? <><span className="wf-spin" />Salvando…</> : btnLabel}
        </span>
      </span>
    </span>);

}

/* ════ LINHA da tabela ═════════════════════════════════ */
function EqRow({ m, roleState, statusState, rolePending, statusPending }) {
  const dim = m.status === "Inativo";
  return (
    <tr className={[m.you ? "is-you" : "", dim ? "is-dim" : ""].join(" ")}>
      <td>
        <span className="eq-member">
          <span className={["eq-avatar", m.status === "Inativo" || m.status === "Convidado" ? "is-muted" : ""].join(" ")}>{m.initials}</span>
          <span className="eq-member-meta">
            <span className="eq-member-name">{m.name}{m.you && <span className="eq-you">  (Você)</span>}</span>
            <span className="eq-member-mail">{m.mail}</span>
          </span>
        </span>
      </td>
      <td>
        {m.you ?
        <span className="eq-cell"><span className="eq-badge-slot"><EqBadge kind="role" value="Dono" /></span></span> :
        <EqEditCell kind="role" saved={m.role} pending={rolePending} state={roleState || "idle"} />}
      </td>
      <td>
        {m.you ?
        <span className="eq-cell"><span className="eq-badge-slot is-status"><EqBadge kind="status" value="Ativo" /></span></span> :
        m.status === "Convidado" ?
        <EqEditCell kind="status" saved="Convidado" staticNote="aguardando 1º acesso" /> :
        <EqEditCell kind="status" saved={m.status} pending={statusPending} state={statusState || "idle"} />}
      </td>
    </tr>);

}

/* ════ BARRA DE FILTROS ════════════════════════════════ */
function EqFilters({ term }) {
  return (
    <div className="eq-filters">
      <span className="eq-search"><WInput placeholder="Buscar membros por nome ou e-mail" value={term} trail={EQ_I.search} /></span>
      <span className="eq-filter"><EqSelect value="Todas as funções" /></span>
      <span className="eq-filter"><EqSelect value="Todos os status" /></span>
      <span className="eq-head-cta eq-filters-cta"><WBtn><span className="eq-ico">{EQ_I.userPlus}</span>Adicionar Membro</WBtn></span>
    </div>);

}

/* ════ TABELA ══════════════════════════════════════════ */
function EqTable({ rows, empty, term }) {
  return (
    <div className="eq-tablewrap">
      <table className="eq-table">
        <thead>
          <tr>
            <th scope="col" style={{ width: "42%" }}>Membro</th>
            <th scope="col">Função</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {!empty && <tbody>{rows}</tbody>}
      </table>
      {empty &&
      <div className="eq-empty">
          <div className="eq-empty-ico">{EQ_I.search}</div>
          <p className="eq-empty-title">Nenhum membro encontrado</p>
          <p className="eq-empty-text">Nenhum membro encontrado para “{term}”.</p>
        </div>
      }
    </div>);

}

/* ════ Conteúdo da tela /equipe ════════════════════════ */
function EqList({ scenario = "base", term }) {
  // scenario: base · empty · pending · saving
  let rows = TEAM.map((m) => <EqRow key={m.id} m={m} />);
  if (scenario === "pending") {
    rows = TEAM.map((m) => {
      if (m.id === "bia") return <EqRow key={m.id} m={m} roleState="pending" rolePending="Gerente" />;
      return <EqRow key={m.id} m={m} />;
    });
  }
  if (scenario === "saving") {
    rows = TEAM.map((m) => {
      if (m.id === "marcos") return <EqRow key={m.id} m={m} statusState="saving" statusPending="Inativo" />;
      return <EqRow key={m.id} m={m} />;
    });
  }
  const isEmpty = scenario === "empty";
  return (
    <div className="eq-col">
      <div className="eq-headrow">
        <div>
          <h1 className="wf-h1" style={{ fontSize: 27 }}>Gerenciar equipe</h1>
          <p className="eq-head-sub">Gerencie de forma centralizada os membros da sua equipe.</p>
        </div>
      </div>
      <EqFilters term={isEmpty ? "joaquim" : term} />
      <EqTable rows={rows} empty={isEmpty} term="joaquim" />
      {!isEmpty &&
      <div className="eq-tablefoot">
          <span className="eq-count"><b>{TEAM.length}</b> membros</span>
          <span className="eq-pager">
            <span className="eq-pagebtn is-disabled">{EQ_I.chevL}</span>
            <span className="eq-count" style={{ margin: "0 4px" }}>1 de 1</span>
            <span className="eq-pagebtn is-disabled">{EQ_I.chevR}</span>
          </span>
        </div>
      }
    </div>);

}

/* ════ Shell completa (desktop) ════════════════════════ */
function EqListShell({ scenario, collapsed }) {
  return (
    <div className={["wf sh-app", collapsed ? "eq-shell-collapsed" : ""].join(" ")} style={{ width: "1200px" }}>
      <Sidebar role="owner" active="equipe" collapsed={collapsed} />
      <div className="sh-inset">
        <TopHeader crumb={["Início", "Equipe"]} notif={false} />
        <div className="sh-main" style={{ overflow: "auto" }}>
          <EqList scenario={scenario} />
        </div>
      </div>
    </div>);

}

/* ════ Skeleton (carregando) ═══════════════════════════ */
function EqListLoading() {
  return (
    <div className="eq-col">
      <div className="wf-sk" style={{ width: 230, height: 26 }} />
      <div className="wf-sk" style={{ width: 320, height: 11, marginTop: 11 }} />
      <div style={{ display: "flex", gap: 10, margin: "24px 0 16px" }}>
        <div className="wf-sk" style={{ flex: 1, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 168, height: 40, borderRadius: 9 }} />
        <div className="wf-sk" style={{ width: 168, height: 40, borderRadius: 9 }} />
      </div>
      <div className="eq-tablewrap">
        {[0, 1, 2, 3].map((i) =>
        <div key={i} className="eq-sk-row">
            <span className="wf-sk" style={{ width: 38, height: 38, borderRadius: "50%", flex: "0 0 auto" }} />
            <div style={{ flex: 1 }}>
              <div className="wf-sk" style={{ width: 150, height: 11 }} />
              <div className="wf-sk" style={{ width: 200, height: 9, marginTop: 7 }} />
            </div>
            <span className="wf-sk" style={{ width: 130, height: 28, borderRadius: 999, flex: "0 0 auto" }} />
            <span className="wf-sk" style={{ width: 130, height: 28, borderRadius: 999, flex: "0 0 auto" }} />
          </div>
        )}
      </div>
    </div>);

}

/* ════ Shell mobile ════════════════════════════════════ */
function EqMemberCardMobile({ m }) {
  const dim = m.status === "Inativo";
  return (
    <div className={["eq-mcard", dim ? "is-dim" : ""].join(" ")}>
      <span className="eq-member">
        <span className={["eq-avatar", m.status === "Inativo" || m.status === "Convidado" ? "is-muted" : ""].join(" ")}>{m.initials}</span>
        <span className="eq-member-meta">
          <span className="eq-member-name">{m.name}{m.you && <span className="eq-you">  (Você)</span>}</span>
          <span className="eq-member-mail">{m.mail}</span>
        </span>
      </span>
      <div className="eq-mcard-controls">
        <label className="eq-mcontrol">
          <span className="eq-mcontrol-lbl">Função</span>
          <span className="eq-mcontrol-row">
            <EqBadge kind="role" value={m.role} />
            {m.role !== "Dono" && <EqSelect value={m.role} />}
          </span>
          {m.role !== "Dono" && <span className="eq-cellbtn is-idle eq-mcontrol-btn">Alterar Função</span>}
        </label>
        <label className="eq-mcontrol">
          <span className="eq-mcontrol-lbl">Status</span>
          <span className="eq-mcontrol-row">
            <EqBadge kind="status" value={m.status} />
            {m.role !== "Dono" && <EqSelect value={m.status} />}
          </span>
          {m.role !== "Dono" && <span className="eq-cellbtn is-idle eq-mcontrol-btn">Alterar Status</span>}
        </label>
      </div>
    </div>);

}

function EqListMobile() {
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 className="wf-h1" style={{ fontSize: 22 }}>Gerenciar equipe</h1>
            <p className="eq-head-sub" style={{ fontSize: 12.5 }}>Gerencie os membros da sua equipe.</p>
          </div>
          <div className="wf-btn wf-btn--primary" style={{ padding: 0, width: 36, height: 36, flex: "none" }}><span className="eq-ico" style={{ display: "inline-flex" }}>{EQ_I.userPlus}</span></div>
        </div>
        <span className="eq-search" style={{ display: "block", marginTop: 14 }}><WInput placeholder="Buscar por nome ou e-mail" trail={EQ_I.search} /></span>
        <div className="eq-mcards">
          {TEAM.map((m) => <EqMemberCardMobile key={m.id} m={m} />)}
        </div>
        <p className="wf-helper" style={{ textAlign: "center", marginTop: 14 }}>Toque num membro para alterar função ou status.</p>
      </div>
    </div>);

}

/* ════ SHEET 2.2.2 — Adicionar / replicar membro ══════
   flow: "new" | "replicate"  ·  state: "initial" | "suggest" | "sending" | "tenant" */
function EqSheet({ flow = "new", state = "initial", standalone, sending }) {
  const isRep = flow === "replicate";
  const showSuggest = state === "suggest";
  const tenantErr = state === "tenant";
  const eye = EQ_I.eye;

  const head = isRep ?
  { title: "Adicionar membro", desc: "Este usuário já pertence a outra unidade do seu negócio." } :
  { title: "Adicionar membro", desc: "Preencha os dados do novo integrante da equipe." };

  const nameTrail = isRep ? <span className="eq-clear">{EQ_I.x}</span> : null;
  const mailTrail = isRep ? <span className="eq-readonly-trail"><span className="eq-lock">{EQ_I.lock}</span></span> : null;

  return (
    <div className={["eq-sheet wf", standalone ? "is-standalone" : ""].join(" ")}>
      <div className="eq-sheet-head">
        <h2 className="eq-sheet-title">{head.title}</h2>
        <p className="eq-sheet-desc">{head.desc}</p>
        <span className="eq-sheet-x">{EQ_I.x}</span>
      </div>

      <div className="eq-sheet-body">
        {isRep &&
        <div className="eq-replicate-note">
            <span className="eq-rn-ico">{EQ_I.userCheck}</span>
            <span className="eq-rn-text">Membro existente de outra unidade. Ele entra <b>ativo</b>, sem precisar de primeiro acesso.</span>
          </div>
        }

        <WField label="Nome completo">
          <WInput
            value={isRep ? "Marcos Lima" : state === "suggest" ? "Marc" : tenantErr ? "Rafael Dias" : ""}
            placeholder="Ex: Ana Carvalho"
            focus={state === "suggest"}
            trail={nameTrail} />
          
        </WField>

        {showSuggest &&
        <div className="eq-suggest">
            <div className="eq-suggest-label">Já está no seu negócio</div>
            <div className="eq-suggest-item is-active">
              <span className="eq-avatar">ML</span>
              <span className="eq-suggest-meta">
                <span className="eq-suggest-name">Marcos Lima</span>
                <span className="eq-suggest-mail">marcos.lima@email.com</span>
              </span>
              <span className="eq-suggest-tag"><WTag>Loja Shopping Norte</WTag></span>
            </div>
          </div>
        }

        <WField label="E-mail">
          <WInput
            value={isRep ? "marcos.lima@email.com" : tenantErr ? "rafael@outronegocio.com" : ""}
            placeholder="email@exemplo.com"
            mono
            error={tenantErr}
            trail={mailTrail} />
          
          {tenantErr && <WError>Este e-mail pertence a outro negócio.</WError>}
        </WField>

        <WField label="Função">
          <div className={["eq-fullselect", "is-placeholder"].join(" ")}>
            <span className="eq-grow" style={{ color: isRep ? "var(--wf-ink)" : "var(--wf-faint)" }}>{isRep ? "Vendedor" : "Selecione a função"}</span>
            <span className="eq-chev">{EQ_I.chevDown}</span>
          </div>
          <WHelper>Gerente ou Vendedor. O papel Dono não é atribuível.</WHelper>
        </WField>

        {!isRep &&
        <WField label="Senha provisória">
            <WInput value={tenantErr ? "" : "••••••••••"} placeholder="Defina uma senha provisória" trail={eye} />
            <WHelper>O membro troca a senha no primeiro acesso.</WHelper>
          </WField>
        }
        {isRep &&
        <WField label="Senha provisória">
            <div className="eq-fullselect is-disabled" style={{ opacity: .5 }}>
              <span className="eq-grow" style={{ color: "var(--wf-faint)" }}>Não necessária</span>
              <span className="eq-chev">{EQ_I.lock}</span>
            </div>
            <WHelper>Senha não necessária — este usuário já tem acesso ativo.</WHelper>
          </WField>
        }
      </div>

      <div className="eq-sheet-foot">
        <div style={{ flex: "0 0 auto", width: 110 }}><WBtn variant="ghost">Cancelar</WBtn></div>
        <div style={{ flex: 1 }}>
          <WBtn loading={sending}>
            {sending ? "Enviando…" : isRep ? "Replicar membro" : "Enviar convite"}
          </WBtn>
        </div>
      </div>
    </div>);

}

/* sheet montado sobre a tela (scrim) — para a anatomia */
function EqSheetOverShell({ flow, state, sending }) {
  return (
    <div className="eq-sheet-stage">
      <div style={{ position: "absolute", inset: 0, filter: "saturate(.9)" }}>
        <EqListShell scenario="base" />
      </div>
      <div className="eq-sheet-scrim" />
      <EqSheet flow={flow} state={state} sending={sending} />
    </div>);

}

Object.assign(window, {
  EQ: {
    EQ_I, TEAM, EqBadge, EqSelect, EqEditCell, EqRow, EqFilters, EqTable,
    EqList, EqListShell, EqListLoading, EqListMobile, EqMemberCardMobile,
    EqSheet, EqSheetOverShell
  }
});