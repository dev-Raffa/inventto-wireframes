/* Inventto — Wireframe · conteúdos das telas (Parte B)
   Recuperar senha, Redefinir senha, Primeiro acesso. Exporta em window.S2. */

const eyeB = WF_I.eye;

/* ───────────── RECUPERAR SENHA /recuperar-senha ───────────── */

// state: undefined(default) | sending | sent(confirmação neutra)
function Recover({ state } = {}) {
  if (state === "sent") {
    return (
      <div>
        <WCardTop step="" refs={["RF004", "RN002"]} />
        <WFeedback
          icon="mail"
          title="Verifique seu e-mail"
          text="Se houver uma conta associada a este endereço de e-mail, as instruções de redefinição foram enviadas."
        />
        <div style={{ marginTop: 18 }}><WBtn variant="link">Voltar para o Login</WBtn></div>
        <div style={{ marginTop: 8 }}><WNote><b>Resposta neutra (RN002).</b> Mesma tela para e-mail existente ou não — não revela cadastro.</WNote></div>
      </div>
    );
  }
  const sending = state === "sending";
  return (
    <div>
      <WCardTop step="" refs={["RF004", "RN002"]} />
      <h2 className="wf-h2">Recuperar senha</h2>
      <p className="wf-sub">Digite seu e-mail de cadastro e enviaremos as instruções para você redefinir sua senha de acesso.</p>
      <WField label="E-mail cadastrado">
        <WInput placeholder="voce@email.com" value={sending ? "joana@email.com" : ""} />
      </WField>
      <div style={{ marginTop: 22 }}><WBtn loading={sending}>{sending ? "Enviando…" : "Enviar instruções de redefinição"}</WBtn></div>
      <div style={{ marginTop: 10 }}><WBtn variant="link">Voltar para o Login</WBtn></div>
    </div>
  );
}

/* ───────────── REDEFINIR SENHA /redefinir-senha (token) ───────────── */

// state: undefined(default) | valid(senhas divergentes) | sending | token(link inválido) | success(toast)
function Reset({ state } = {}) {
  if (state === "token") {
    return (
      <div>
        <WCardTop step="Acesso por token" refs={["RF004", "RN012", "RN013"]} />
        <WFeedback
          icon="alert"
          title="Link expirado ou inválido"
          text="Este link de redefinição não é mais válido. Solicite uma nova redefinição para continuar."
        />
        <div style={{ marginTop: 18 }}><WBtn variant="outline">Recuperar senha de novo</WBtn></div>
        <div style={{ marginTop: 8 }}><WNote><b>Token validado no load.</b> Se inválido, a tela inteira vira este estado — o formulário nem aparece.</WNote></div>
      </div>
    );
  }
  if (state === "success") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: 18, textAlign: "center" }}>
        <WToast ok>Senha redefinida. Faça login com suas novas credenciais.</WToast>
        <p className="wf-sub">Redirecionando para <span className="wf-link">/login</span>…</p>
      </div>
    );
  }
  const valErr = state === "valid";
  const sending = state === "sending";
  const filled = !!state;
  return (
    <div>
      <WCardTop step="Acesso por token" refs={["RF004", "RN001"]} />
      <h2 className="wf-h2">Defina sua nova senha</h2>
      <p className="wf-sub">Crie uma senha forte para proteger sua conta.</p>
      <WField label="Nova senha">
        <WInput placeholder="••••••••" value={filled ? "••••••••••" : ""} trail={eyeB} />
        <WHelper>Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.</WHelper>
      </WField>
      <WField label="Confirmar nova senha">
        <WInput placeholder="Digite a senha novamente" value={valErr ? "••••••" : (filled ? "••••••••••" : "")} trail={eyeB} error={valErr} />
        {valErr && <WError>As senhas não coincidem.</WError>}
      </WField>
      <div style={{ marginTop: 22 }}><WBtn loading={sending}>{sending ? "Salvando…" : "Redefinir senha"}</WBtn></div>
      <div style={{ marginTop: 10 }}><WBtn variant="link">Voltar para o Login</WBtn></div>
    </div>
  );
}

/* ───────────── PRIMEIRO ACESSO /primeiro-acesso (2 passos) ───────────── */

// Passo 1 — definir senha. state: undefined | valid(divergente)
function FirstP1({ state } = {}) {
  const valErr = state === "valid";
  const filled = !!state;
  return (
    <div>
      <WCardTop step="Passo 1 de 2" refs={["RF005", "RN015", "RN001"]} />
      <h2 className="wf-h2">Defina sua senha</h2>
      <p className="wf-sub">Sua organização te convidou para o Inventto. Crie sua senha para ativar o acesso.</p>
      <div style={{ marginTop: 14 }}><WNote><b>Tela bloqueante (RN015).</b> Membro convidado não acessa nenhuma rota interna até concluir os 2 passos.</WNote></div>
      <WField label="Nova senha">
        <WInput placeholder="••••••••" value={filled ? "••••••••••" : ""} trail={eyeB} />
        <WHelper>Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.</WHelper>
      </WField>
      <WField label="Confirmar senha">
        <WInput placeholder="Digite a senha novamente" value={valErr ? "••••••" : (filled ? "••••••••••" : "")} trail={eyeB} error={valErr} />
        {valErr && <WError>As senhas não coincidem.</WError>}
      </WField>
      <div style={{ marginTop: 22 }}><WBtn>Continuar</WBtn></div>
    </div>
  );
}

// Passo 2 — verificação OTP
function FirstP2({ state = "typing" } = {}) {
  return (
    <div>
      <WCardTop step="Passo 2 de 2" refs={["RF003", "RN003"]} />
      <OTPStep
        state={state}
        title="Confirme seu e-mail"
        sub="Enviamos um código de 6 dígitos para v•••@email.com. Digite-o abaixo para ativar seu acesso."
        cta="Ativar meu acesso"
        showBack
        backLabel="Voltar para a senha"
      />
    </div>
  );
}

window.S2 = { Recover, Reset, FirstP1, FirstP2 };
