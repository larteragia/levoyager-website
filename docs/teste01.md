# Teste 01 - Problemas no Fluxo de Cadastro

**Data:** 2026-01-10
**Status:** Em Analise
**Prioridade:** Alta

---

## Resumo Executivo

O fluxo de cadastro apresenta problemas de UX e funcionalidade que fazem o usuario pensar que o cadastro nao funcionou, mesmo quando funciona corretamente.

---

## Problemas Identificados

### 1. Falta de Feedback Visual apos Cadastro

**Descricao:** Apos o cadastro bem-sucedido, o usuario e redirecionado silenciosamente para a home page sem nenhuma mensagem de confirmacao.

**Evidencia:** Teste com Playwright mostrou:
- Cadastro funciona (token e userId sao salvos no localStorage)
- Redirect para `/` ocorre imediatamente
- Nenhuma mensagem de "Cadastro realizado com sucesso" e exibida

**Impacto:** Usuario pensa que o cadastro falhou

**Arquivo afetado:** `app/hooks/useAuth.ts` (linha 53)
```typescript
// Codigo atual - redirect sem feedback
router.push('/');
return { success: true };
```

---

### 2. Home Page Nao Reflete Estado de Login

**Descricao:** Apos o login/cadastro, a home page continua mostrando botoes "Comecar Agora - E Gratis" e "Ja tenho conta" ao inves de mostrar opcoes para usuario logado.

**Evidencia:** Screenshot mostra home page identica para usuarios logados e nao-logados

**Impacto:** Usuario nao sabe que esta logado

**Arquivo afetado:** `app/page.tsx` (linhas 36-49)

---

### 3. Nenhum Email de Confirmacao e Enviado

**Descricao:** O sistema marca `isEmailVerified: false` mas nao envia nenhum email de verificacao.

**Evidencia:** Codigo em `convex/auth.ts` (linhas 27-31):
```typescript
isEmailVerified: false,  // Marcado como nao verificado
// Mas NENHUM email e enviado
```

**Impacto:**
- Usuarios nunca verificam email
- Campo `isEmailVerified` sempre sera `false`
- Nao ha comunicacao pos-cadastro

**Arquivos afetados:**
- `convex/auth.ts` - falta integracao com servico de email
- Nao existe servico de email configurado

---

### 4. Nenhum Email de Boas-Vindas

**Descricao:** Apos cadastro, usuario nao recebe email de boas-vindas.

**Impacto:** Perda de oportunidade de engajamento inicial

---

### 5. Redirect para Home ao inves de Dashboard

**Descricao:** Apos cadastro, usuario deveria ir para o Dashboard para configurar preferencias, nao para a home page.

**Arquivo afetado:** `app/hooks/useAuth.ts` (linha 53)

---

## Arquitetura Atual do Fluxo

```
[Pagina Registro]
    |
    v
[useAuth.register()]
    |
    v
[Convex: auth.register] --> Cria usuario (isEmailVerified: false)
    |                       Cria preferencias padrao
    v
[Convex: auth.login] --> Cria sessao
    |
    v
[setAuth(token, userId)] --> Salva no localStorage
    |
    v
[router.push('/')] --> Redirect para home (SEM FEEDBACK!)
```

---

## Plano de Correcao

### Fase 1: Feedback Imediato (Prioridade Alta)

#### 1.1 Adicionar Pagina de Sucesso de Cadastro

**Criar:** `app/(auth)/register/success/page.tsx`

```typescript
// Nova pagina de sucesso
export default function RegisterSuccessPage() {
  return (
    <div className="text-center space-y-6">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
      <h1>Conta criada com sucesso!</h1>
      <p>Bem-vindo ao LeVoyager. Configure suas preferencias para comecar.</p>
      <Link href="/dashboard/preferences">
        Configurar Preferencias
      </Link>
    </div>
  );
}
```

#### 1.2 Alterar Redirect pos-Cadastro

**Arquivo:** `app/hooks/useAuth.ts`

```typescript
// DE:
router.push('/');

// PARA:
router.push('/register/success');
```

---

### Fase 2: Estado de Login na Home (Prioridade Alta)

#### 2.1 Atualizar Home Page para Usuarios Logados

**Arquivo:** `app/page.tsx`

```typescript
// Adicionar verificacao de autenticacao
const { isAuthenticated } = useAuthContext();

// Mostrar botoes diferentes baseado no estado
{isAuthenticated ? (
  <>
    <Link href="/dashboard">Ir para Dashboard</Link>
    <Link href="/dashboard/alerts">Ver Alertas</Link>
  </>
) : (
  <>
    <Link href="/register">Comecar Agora - E Gratis</Link>
    <Link href="/login">Ja tenho conta</Link>
  </>
)}
```

---

### Fase 3: Sistema de Email (Prioridade Media)

#### 3.1 Configurar Servico de Email

**Opcoes recomendadas:**
1. **Resend** (recomendado) - Facil integracao, gratis ate 3000 emails/mes
2. **SendGrid** - Robusto, mais complexo
3. **AWS SES** - Barato em escala

#### 3.2 Criar API Route para Envio de Email

**Criar:** `app/api/email/send/route.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, subject, template, data } = await request.json();

  await resend.emails.send({
    from: 'LeVoyager <noreply@levoyager.com.br>',
    to,
    subject,
    html: renderTemplate(template, data),
  });
}
```

#### 3.3 Templates de Email Necessarios

1. **welcome.tsx** - Email de boas-vindas
2. **verify-email.tsx** - Verificacao de email
3. **password-reset.tsx** - Reset de senha
4. **promotion-alert.tsx** - Alerta de promocao

#### 3.4 Integrar com Fluxo de Cadastro

**Arquivo:** `convex/auth.ts` (apos criar usuario)

```typescript
// Apos criar usuario, chamar API de email
await fetch(`${process.env.SITE_URL}/api/email/send`, {
  method: 'POST',
  body: JSON.stringify({
    to: args.email,
    subject: 'Bem-vindo ao LeVoyager!',
    template: 'welcome',
    data: { name: args.fullName }
  })
});
```

---

### Fase 4: Verificacao de Email (Prioridade Media)

#### 4.1 Gerar Token de Verificacao

**Arquivo:** `convex/auth.ts`

```typescript
// No registro, gerar token de verificacao
const verificationToken = crypto.randomUUID();
const verificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h

await ctx.db.patch(userId, {
  emailVerificationToken: verificationToken,
  emailVerificationExpires: verificationExpires,
});
```

#### 4.2 Criar Rota de Verificacao

**Criar:** `app/api/verify-email/[token]/route.ts`

---

## Checklist de Implementacao

- [ ] **Fase 1.1:** Criar pagina de sucesso de cadastro
- [ ] **Fase 1.2:** Alterar redirect para pagina de sucesso
- [ ] **Fase 2.1:** Atualizar home page com estado de login
- [ ] **Fase 3.1:** Configurar Resend (ou outro servico)
- [ ] **Fase 3.2:** Criar API route de envio de email
- [ ] **Fase 3.3:** Criar templates de email
- [ ] **Fase 3.4:** Integrar email no fluxo de cadastro
- [ ] **Fase 4.1:** Implementar verificacao de email
- [ ] **Fase 4.2:** Criar rota de verificacao

---

## Estimativa de Esforco

| Fase | Complexidade | Arquivos Afetados |
|------|--------------|-------------------|
| 1.1  | Baixa        | 1 novo arquivo    |
| 1.2  | Baixa        | 1 arquivo         |
| 2.1  | Media        | 1 arquivo         |
| 3.x  | Alta         | 4+ novos arquivos |
| 4.x  | Media        | 2-3 arquivos      |

---

## Recomendacao

**Comecar pela Fase 1 e 2** - Sao as mais criticas e de implementacao rapida. Resolvem o problema imediato do usuario nao saber que o cadastro funcionou.

**Fase 3 e 4** podem ser implementadas em seguida para completar a experiencia.

---

## Testes de Validacao

Apos implementacao, validar com Playwright:

1. Cadastro mostra mensagem de sucesso
2. Usuario e redirecionado para pagina correta
3. Home page mostra estado logado
4. Email de boas-vindas e recebido
5. Link de verificacao funciona

---

## Anexos

- Screenshot registro: `/tmp/register-01-page.png`
- Screenshot apos submit: `/tmp/register-03-after-submit.png`
- Script de teste: `debug-register.mjs`
