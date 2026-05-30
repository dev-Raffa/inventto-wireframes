/* Inventto — Wireframe · montagem do canvas (Superfície 1 · telas públicas) */

const W_DESK = 1080, W_PHONE = 390, W_STATE = 440;

// placeholder do "slot de formulário" do Auth Shell
function ShellSlot({ label }) {
  return (
    <div style={{ border: "1.5px dashed var(--wf-line)", borderRadius: "var(--wf-radius)", padding: 22, background: "var(--wf-fieldbg)" }}>
      <div className="wf-eyebrow" style={{ marginBottom: 12 }}>Área de formulário</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="wf-sk" style={{ width: "55%", height: 18 }} />
        <div className="wf-sk" style={{ width: "85%", height: 10 }} />
        <div className="wf-sk" style={{ height: 38, marginTop: 8 }} />
        <div className="wf-sk" style={{ height: 38 }} />
        <div className="wf-sk" style={{ height: 42, marginTop: 8, background: "var(--wf-ink)", opacity: .85 }} />
      </div>
      <p className="wf-helper" style={{ marginTop: 14 }}>{label}</p>
    </div>
  );
}

function Legend() {
  const sw = (bg, label) => (
    <div className="wf-legrow"><span className="wf-swatch" style={{ background: bg }} />{label}</div>
  );
  return (
    <div className="wf-legend wf">
      <h3>Wireframe · Superfície 1 — Telas públicas (Acesso)</h3>
      <p className="wf-legsub">Lo-fi estruturado, cinza-escala. Auth Shell split-screen no desktop; painel de marca oculto no mobile. Cada fluxo mostra todos os passos e os estados da Matriz. Desktop (1080) + mobile (390) lado a lado por tela.</p>
      {sw("var(--wf-brand)", "Painel de marca — stand-in de --primary (verde-pinho) no design final")}
      {sw("var(--wf-ink)", "Preenchimento sólido = CTA primária")}
      {sw("var(--wf-err)", "Tijolo = erro / estado destrutivo (cor funcional)")}
      {sw("var(--wf-note)", "Ardósia = anotação de produto (RF/RN, decisões)")}
      {sw("var(--wf-ok)", "Verde dessaturado = sucesso")}
      <div className="wf-legrow" style={{ marginTop: 14, color: "var(--wf-muted)", fontSize: 11.5, fontFamily: "var(--wf-mono)" }}>
        Tags RFxxx/RNxxx referenciam a Especificação de Produto v1.0.
      </div>
    </div>
  );
}

function Canvas() {
  return (
    <DesignCanvas>

      {/* ───── FUNDAÇÕES ───── */}
      <DCSection id="fund" title="00 · Fundações" subtitle="Auth Shell compartilhado + padrão de verificação por código (OTP)">
        <DCArtboard id="legend" label="Legenda" width={580} height={360}>
          <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--wf-fieldbg)", padding: 20 }}><Legend /></div>
        </DCArtboard>
        <DCArtboard id="shell-desk" label="Auth Shell · Desktop (lg+)" width={W_DESK} height={620}>
          <WSplit height={620}><ShellSlot label="Varia por tela — Cadastro, Login, Recuperar/Redefinir, Primeiro acesso (1.1.x)." /></WSplit>
        </DCArtboard>
        <DCArtboard id="shell-mob" label="Auth Shell · Mobile (<lg)" width={W_PHONE} height={620}>
          <WPhone><div>
            <div style={{ marginBottom: 14 }}><WNote><b>Painel de marca oculto</b> no mobile (hidden lg:flex). Prioridade total ao formulário.</WNote></div>
            <ShellSlot label="Cartão w-full, sem o painel esquerdo." />
          </div></WPhone>
        </DCArtboard>
        <DCArtboard id="otp-empty" label="OTP · vazio (foco)" width={360} height={440}>
          <WStateCard tone="empty" name="Vazio inicial" refLabel="1.0.1"><OTPStep state="empty" title="Verifique seu e-mail" sub="Enviamos um código de 6 dígitos para o seu e-mail." cta="Ativar minha conta" /></WStateCard>
        </DCArtboard>
        <DCArtboard id="otp-typing" label="OTP · digitando" width={360} height={440}>
          <WStateCard tone="empty" name="Digitando" refLabel="1.0.1"><OTPStep state="typing" title="Verifique seu e-mail" sub="Enviamos um código de 6 dígitos para o seu e-mail." cta="Ativar minha conta" /></WStateCard>
        </DCArtboard>
        <DCArtboard id="otp-error" label="OTP · código inválido" width={360} height={460}>
          <WStateCard tone="err" name="Erro — código inválido/expirado" refLabel="auth.otp.invalid"><OTPStep state="error" title="Verifique seu e-mail" sub="Enviamos um código de 6 dígitos para o seu e-mail." cta="Ativar minha conta" /></WStateCard>
        </DCArtboard>
        <DCArtboard id="otp-sending" label="OTP · enviando" width={360} height={440}>
          <WStateCard tone="load" name="Enviando / verificando" refLabel="1.0.1"><OTPStep state="sending" title="Verifique seu e-mail" sub="Enviamos um código de 6 dígitos para o seu e-mail." cta="Ativar minha conta" /></WStateCard>
        </DCArtboard>
        <DCArtboard id="otp-cooldown" label="OTP · reenvio em cooldown" width={360} height={440}>
          <WStateCard tone="load" name="Reenvio em cooldown (45s)" refLabel="auth.otp.resent"><OTPStep state="cooldown" title="Verifique seu e-mail" sub="Enviamos um código de 6 dígitos para o seu e-mail." cta="Ativar minha conta" /></WStateCard>
        </DCArtboard>
      </DCSection>

      {/* ───── CADASTRO ───── */}
      <DCSection id="cadastro" title="01 · Cadastro de conta" subtitle="/cadastro · público · fluxo em 3 passos — RF001, RN006/007/009">
        <DCArtboard id="cad-p1-d" label="Passo 1 · Desktop" width={W_DESK} height={680}><WSplit height={680}>{S1.CadP1()}</WSplit></DCArtboard>
        <DCArtboard id="cad-p1-m" label="Passo 1 · Mobile" width={W_PHONE} height={680}><WPhone>{S1.CadP1()}</WPhone></DCArtboard>
        <DCArtboard id="cad-p1-v" label="Passo 1 · validação inline" width={W_STATE} height={560}><WStateCard tone="err" name="Documento inválido" refLabel="RN018">{S1.CadP1({ state: "valid" })}</WStateCard></DCArtboard>
        <DCArtboard id="cad-p2-d" label="Passo 2 · Desktop" width={W_DESK} height={780}><WSplit height={780}>{S1.CadP2()}</WSplit></DCArtboard>
        <DCArtboard id="cad-p2-m" label="Passo 2 · Mobile" width={W_PHONE} height={820}><WPhone>{S1.CadP2()}</WPhone></DCArtboard>
        <DCArtboard id="cad-p2-v" label="Passo 2 · validação inline" width={W_STATE} height={760}><WStateCard tone="err" name="Senhas divergentes + Termos" refLabel="RN001 · RN006">{S1.CadP2({ state: "valid" })}</WStateCard></DCArtboard>
        <DCArtboard id="cad-p2-s" label="Passo 2 · enviando" width={W_STATE} height={780}><WStateCard tone="load" name="Enviando código (cria conta pendente)" refLabel="RN003 · RN007">{S1.CadP2({ state: "sending" })}</WStateCard></DCArtboard>
        <DCArtboard id="cad-p3-d" label="Passo 3 · OTP · Desktop" width={W_DESK} height={620}><WSplit height={620}>{S1.CadP3({ state: "typing" })}</WSplit></DCArtboard>
        <DCArtboard id="cad-p3-m" label="Passo 3 · OTP · Mobile" width={W_PHONE} height={620}><WPhone>{S1.CadP3({ state: "typing" })}</WPhone></DCArtboard>
        <DCArtboard id="cad-ok" label="Sucesso → Dashboard" width={W_STATE} height={300}>
          <WStateCard tone="ok" name="E-mail verificado" refLabel="navega para /">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", padding: "10px 0" }}>
              <WToast ok>E-mail verificado. Bem-vindo ao Inventto!</WToast>
              <p className="wf-sub">Conta ativada · redirecionando para <span className="wf-link">/</span> (Dashboard).</p>
            </div>
          </WStateCard>
        </DCArtboard>
      </DCSection>

      {/* ───── LOGIN ───── */}
      <DCSection id="login" title="02 · Login" subtitle="/login · público · passo 2 condicional de verificação — RF002, RN002/003/004/005">
        <DCArtboard id="log-p1-d" label="Passo 1 · Desktop" width={W_DESK} height={600}><WSplit height={600}>{S1.LoginP1()}</WSplit></DCArtboard>
        <DCArtboard id="log-p1-m" label="Passo 1 · Mobile" width={W_PHONE} height={600}><WPhone>{S1.LoginP1()}</WPhone></DCArtboard>
        <DCArtboard id="log-neutral" label="Erro neutro" width={W_STATE} height={500}><WStateCard tone="err" name="Credencial inválida (neutra)" refLabel="RN002">{S1.LoginP1({ state: "neutral" })}</WStateCard></DCArtboard>
        <DCArtboard id="log-throttle" label="Anti-força-bruta" width={W_STATE} height={560}><WStateCard tone="err" name="Conta temporariamente bloqueada" refLabel="RN005">{S1.LoginP1({ state: "throttled" })}</WStateCard></DCArtboard>
        <DCArtboard id="log-sending" label="Enviando" width={W_STATE} height={480}><WStateCard tone="load" name="Entrando…" refLabel="RF002">{S1.LoginP1({ state: "sending" })}</WStateCard></DCArtboard>
        <DCArtboard id="log-p2-d" label="Passo 2 · condicional · Desktop" width={W_DESK} height={680}><WSplit height={680}>{S1.LoginP2({ state: "typing" })}</WSplit></DCArtboard>
        <DCArtboard id="log-p2-m" label="Passo 2 · condicional · Mobile" width={W_PHONE} height={700}><WPhone>{S1.LoginP2({ state: "typing" })}</WPhone></DCArtboard>
      </DCSection>

      {/* ───── RECUPERAR SENHA ───── */}
      <DCSection id="recover" title="03 · Recuperar senha" subtitle="/recuperar-senha · público · resposta sempre neutra — RF004, RN002">
        <DCArtboard id="rec-d" label="Default · Desktop" width={W_DESK} height={540}><WSplit height={540}>{S2.Recover()}</WSplit></DCArtboard>
        <DCArtboard id="rec-m" label="Default · Mobile" width={W_PHONE} height={540}><WPhone>{S2.Recover()}</WPhone></DCArtboard>
        <DCArtboard id="rec-sending" label="Enviando" width={W_STATE} height={360}><WStateCard tone="load" name="Enviando…" refLabel="RF004">{S2.Recover({ state: "sending" })}</WStateCard></DCArtboard>
        <DCArtboard id="rec-sent" label="Confirmação neutra" width={W_STATE} height={460}><WStateCard tone="ok" name="Resposta unificada (não revela cadastro)" refLabel="RN002">{S2.Recover({ state: "sent" })}</WStateCard></DCArtboard>
      </DCSection>

      {/* ───── REDEFINIR SENHA ───── */}
      <DCSection id="reset" title="04 · Redefinir senha" subtitle="/redefinir-senha · acesso por token único — RF004, RN001/012/013">
        <DCArtboard id="res-d" label="Default · Desktop" width={W_DESK} height={620}><WSplit height={620}>{S2.Reset()}</WSplit></DCArtboard>
        <DCArtboard id="res-m" label="Default · Mobile" width={W_PHONE} height={640}><WPhone>{S2.Reset()}</WPhone></DCArtboard>
        <DCArtboard id="res-v" label="Validação inline" width={W_STATE} height={520}><WStateCard tone="err" name="Senhas divergentes" refLabel="RN001">{S2.Reset({ state: "valid" })}</WStateCard></DCArtboard>
        <DCArtboard id="res-token" label="Token inválido/expirado" width={W_STATE} height={460}><WStateCard tone="err" name="Link expirado ou já usado" refLabel="RN012 · RN013">{S2.Reset({ state: "token" })}</WStateCard></DCArtboard>
        <DCArtboard id="res-ok" label="Sucesso (toast → login)" width={W_STATE} height={420}><WStateCard tone="ok" name="Senha redefinida" refLabel="auth.reset.success">{S2.Reset({ state: "success" })}</WStateCard></DCArtboard>
      </DCSection>

      {/* ───── PRIMEIRO ACESSO ───── */}
      <DCSection id="first" title="05 · Primeiro acesso" subtitle="/primeiro-acesso · membro convidado · 2 passos, bloqueante — RF005, RN015">
        <DCArtboard id="fa-p1-d" label="Passo 1 · senha · Desktop" width={W_DESK} height={700}><WSplit height={700}>{S2.FirstP1()}</WSplit></DCArtboard>
        <DCArtboard id="fa-p1-m" label="Passo 1 · senha · Mobile" width={W_PHONE} height={720}><WPhone>{S2.FirstP1()}</WPhone></DCArtboard>
        <DCArtboard id="fa-p1-v" label="Passo 1 · validação" width={W_STATE} height={640}><WStateCard tone="err" name="Senhas divergentes" refLabel="RN001">{S2.FirstP1({ state: "valid" })}</WStateCard></DCArtboard>
        <DCArtboard id="fa-p2-d" label="Passo 2 · OTP · Desktop" width={W_DESK} height={620}><WSplit height={620}>{S2.FirstP2({ state: "typing" })}</WSplit></DCArtboard>
        <DCArtboard id="fa-p2-m" label="Passo 2 · OTP · Mobile" width={W_PHONE} height={620}><WPhone>{S2.FirstP2({ state: "typing" })}</WPhone></DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

window.Canvas = Canvas;
