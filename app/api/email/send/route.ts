import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy initialization do Resend para evitar erro em build
let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const EMAIL_FROM = process.env.EMAIL_FROM || 'LeVoyager <noreply@levoyager.com.br>';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://levoyager.com.br';

// Templates de email
const templates = {
  welcome: (data: { name?: string }) => ({
    subject: 'Bem-vindo ao LeVoyager!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo ao LeVoyager</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">LeVoyager</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Alertas de Promocoes de Passagens Aereas</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px;">
                Ola${data.name ? `, ${data.name}` : ''}! 👋
              </h2>

              <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                Sua conta foi criada com sucesso! Agora voce faz parte de uma comunidade de mais de
                <strong>10.000 viajantes</strong> que economizam em media <strong>40%</strong> nas passagens aereas.
              </p>

              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px; color: #1e293b; font-size: 16px;">Proximos passos:</h3>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #475569;">
                  <li style="margin-bottom: 10px;">Configure suas rotas favoritas</li>
                  <li style="margin-bottom: 10px;">Defina sua faixa de preco ideal</li>
                  <li style="margin-bottom: 10px;">Escolha como quer receber alertas</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${SITE_URL}/dashboard/preferences"
                   style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Configurar Preferencias
                </a>
              </div>

              <p style="margin: 20px 0 0; color: #64748b; font-size: 14px; text-align: center;">
                Voce comecara a receber alertas assim que configurar suas preferencias!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; text-align: center;">
                Este email foi enviado por LeVoyager.<br>
                <a href="${SITE_URL}" style="color: #3b82f6; text-decoration: none;">levoyager.com.br</a>
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 11px; text-align: center;">
                Voce recebeu este email porque se cadastrou no LeVoyager.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  verifyEmail: (data: { name?: string; verificationUrl: string }) => ({
    subject: 'Verifique seu email - LeVoyager',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">LeVoyager</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px;">
                Verifique seu email
              </h2>
              <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                Ola${data.name ? ` ${data.name}` : ''}! Clique no botao abaixo para verificar seu email e ativar sua conta.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.verificationUrl}"
                   style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
                  Verificar Email
                </a>
              </div>
              <p style="margin: 20px 0 0; color: #64748b; font-size: 14px;">
                Se voce nao criou esta conta, ignore este email.
              </p>
              <p style="margin: 10px 0 0; color: #94a3b8; font-size: 12px;">
                Link expira em 24 horas.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                <a href="${SITE_URL}" style="color: #3b82f6;">levoyager.com.br</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),

  passwordReset: (data: { name?: string; resetUrl: string }) => ({
    subject: 'Recuperacao de senha - LeVoyager',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">LeVoyager</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px;">
                Recuperacao de senha
              </h2>
              <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                Ola${data.name ? ` ${data.name}` : ''}! Recebemos uma solicitacao para redefinir sua senha. Clique no botao abaixo para criar uma nova senha.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.resetUrl}"
                   style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
                  Redefinir Senha
                </a>
              </div>
              <p style="margin: 20px 0 0; color: #64748b; font-size: 14px;">
                Se voce nao solicitou a recuperacao de senha, ignore este email.
              </p>
              <p style="margin: 10px 0 0; color: #94a3b8; font-size: 12px;">
                Link expira em 1 hora.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                <a href="${SITE_URL}" style="color: #3b82f6;">levoyager.com.br</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  }),
};

type TemplateType = keyof typeof templates;

interface SendEmailRequest {
  to: string;
  template: TemplateType;
  data?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const resendClient = getResend();

    // Verificar se Resend esta configurado
    if (!resendClient) {
      console.warn('[Email] RESEND_API_KEY not configured, skipping email');
      return NextResponse.json({
        success: true,
        message: 'Email skipped (not configured)',
        skipped: true
      });
    }

    const body: SendEmailRequest = await request.json();
    const { to, template, data = {} } = body;

    if (!to || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: to, template' },
        { status: 400 }
      );
    }

    if (!templates[template]) {
      return NextResponse.json(
        { error: `Unknown template: ${template}` },
        { status: 400 }
      );
    }

    const emailContent = templates[template](data as never);

    const result = await resendClient.emails.send({
      from: EMAIL_FROM,
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log(`[Email] Sent ${template} to ${to}`, result);

    return NextResponse.json({
      success: true,
      messageId: result.data?.id,
    });
  } catch (error) {
    console.error('[Email] Error sending email:', error);

    // Nao falhar a requisicao se o email falhar
    // Apenas logar o erro e retornar sucesso parcial
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    });
  }
}
