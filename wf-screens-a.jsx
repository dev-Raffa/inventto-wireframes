/* Inventto — Wireframe · conteúdos das telas (Parte A)
   Fundações (Auth Shell / OTP), Cadastro, Login.
   Cada função devolve o CONTEÚDO do card; o shell (split/phone/state)
   é aplicado no wf-canvas.jsx. Exporta em window.S1. */

const eye = WF_I.eye;

/* ───────────── CADASTRO /cadastro ───────────── */

// Passo 1 — informações da organização
function CadP1({ state } = {}) {
  const err = state === "valid";
  return (
    <div>
      <WCardTop step="Passo 1 de 3" refs={["RF001", "RN009"]} />
      <h2 className="wf-h2">Crie sua conta</h2>
      <p className="wf-sub">Vamos começar configurando o seu negócio. Leva menos de um minuto.</p>
      <WField label="Nome fantasia da organização">
        <WInput placeholder="Ex: Loja Inventto Matriz" value={state ? "Ateliê Joana" : ""} />
      </WField>
      <WField label="Documento (CPF ou CNPJ)">
        <WInput placeholder="000.000.000-00 ou 00.000.000/0000-00" value={err ? "123.456" : ""} error={err} mono />
        {err && <WError>Documento inválido. Verifique os números.</WError>}
      </WField>
      <WField label="Área de atuação">
        <WSelect placeholder="Selecione o setor da sua loja" value={state ? "Vestuário & Moda" : ""} />
      </WField>
      <div style={{ marginTop: 22 }}><WBtn>Avançar</WBtn></div>
      <p className="wf-helper" style={{ textAlign: "center", marginTop: 14 }}>
        Já tenho conta. <span className="wf-link">Entrar</span>
      </p>
    </div>
  );
}

// Passo 2 — dados de acesso
function CadP2({ state } = {}) {
  const sending = state === "sending";
  const valErr = state === "valid";
  return (
    <div>
      <WCardTop step="Passo 2 de 3" refs={["RF001", "RN001", "RN006", "RN007"]} />
      <h2 className="wf-h2">Seus dados de acesso</h2>
      <p className="wf-sub">Quem cadastra nasce como dono da operação.</p>
      <WField label="Nome completo">
        <WInput placeholder="Ex: Joana Ribeiro" value={state ? "Joana Ribeiro" : ""} />
      </WField>
      <WField label="E-mail institucional / pessoal">
        <WInput placeholder="voce@email.com" value={state ? "joana@email.com" : ""} />
      </WField>
      <WField label="Senha">
        <WInput placeholder="••••••••" value={state ? "••••••••••" : ""} trail={eye} />
        <WHelper>Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.</WHelper>
      </WField>
      <WField label="Confirmar senha">
        <WInput placeholder="Digite a senha novamente" value={valErr ? "••••••" : (state ? "••••••••••" : "")} trail={eye} error={valErr} />
        {valErr && <WError>As senhas não coincidem.</WError>}
      </WField>
      <WCheckbox checked={!valErr && !!state} error={valErr}>
        Li e aceito os <span className="wf-link">Termos de Uso</span> e a <span className="wf-link">Política de Privacidade</span>.
      </WCheckbox>
      {valErr && <WError>É preciso aceitar os Termos para continuar.</WError>}
      <div style={{ marginTop: 22 }}><WBtn loading={sending}>{sending ? "Enviando código…" : "Continuar"}</WBtn></div>
      <p className="wf-helper" style={{ textAlign: "center", marginTop: 8 }}>Em seguida, enviaremos um código de verificação para o seu e-mail.</p>
      <div style={{ marginTop: 2 }}><WBtn variant="ghost">Voltar para a etapa anterior</WBtn></div>
    </div>
  );
}

// Passo 3 — verificação OTP (em contexto)
function CadP3({ state = "typing" } = {}) {
  return (
    <div>
      <WCardTop step="Passo 3 de 3" refs={["RF003", "RN003"]} />
      <OTPStep
        state={state}
        title="Verifique seu e-mail"
        sub="Enviamos um código de 6 dígitos para j•••@email.com. Digite-o abaixo para ativar sua conta."
        cta="Ativar minha conta"
        showBack
      />
    </div>
  );
}

/* ───────────── LOGIN /login ───────────── */

// Passo 1 — credenciais (state: undefined | valid | neutral | sending | throttled)
function LoginP1({ state } = {}) {
  const neutral = state === "neutral";
  const throttled = state === "throttled";
  const sending = state === "sending";
  const filled = !!state && state !== "empty";
  return (
    <div>
      <WCardTop step="" refs={["RF002", "RN002", "RN004"]} />
      <h2 className="wf-h2">Bem-vindo ao Inventto</h2>
      <p className="wf-sub">Acesse sua conta para gerenciar sua loja, estoques e pedidos.</p>
      <WField label="E-mail cadastrado">
        <WInput placeholder="voce@email.com" value={filled ? "joana@email.com" : ""} />
      </WField>
      <div className="wf-field">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span className="wf-label" style={{ margin: 0 }}>Senha de acesso</span>
          <span className="wf-link" style={{ fontSize: 12.5 }}>Esqueceu a senha?</span>
        </div>
        <WInput placeholder="••••••••" value={filled ? "••••••••" : ""} trail={eye} error={neutral} />
        {neutral && <WError>E-mail ou senha incorretos.</WError>}
      </div>
      {throttled && <div style={{ marginTop: 14 }}><WNote><b>Anti-força-bruta (RN005).</b> Muitas tentativas. Aguarde um instante e tente novamente.</WNote></div>}
      <div style={{ marginTop: 22 }}><WBtn loading={sending} disabled={throttled}>{sending ? "Entrando…" : "Entrar no sistema"}</WBtn></div>
      <p className="wf-helper" style={{ textAlign: "center", marginTop: 14 }}>
        Não tem uma conta? <span className="wf-link">Cadastre-se</span>
      </p>
    </div>
  );
}

// Passo 2 — verificação condicional (e-mail pendente)
function LoginP2({ state = "typing" } = {}) {
  return (
    <div>
      <WCardTop step="Passo 2 · condicional" refs={["RF003", "RN003"]} />
      <div style={{ marginBottom: 14 }}>
        <WNote><b>Só aparece</b> quando o login é válido mas o e-mail está pendente (cadastro abandonado). Em vez de bloquear, completa a verificação aqui.</WNote>
      </div>
      <OTPStep
        state={state}
        title="Confirme seu e-mail"
        sub="Você precisa confirmar seu e-mail para acessar. Enviamos um código de 6 dígitos para j•••@email.com."
        cta="Confirmar e entrar"
        showBack
        backLabel="Voltar para o e-mail"
      />
    </div>
  );
}

window.S1 = { CadP1, CadP2, CadP3, LoginP1, LoginP2 };
