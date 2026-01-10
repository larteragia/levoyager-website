'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Settings, Bell, ArrowRight, Mail } from 'lucide-react';
import { useAuthContext } from '../../../providers';
import { useRouter } from 'next/navigation';

export default function RegisterSuccessPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Se nao estiver autenticado apos carregamento, redirecionar para registro
    if (!isLoading && !isAuthenticated) {
      router.push('/register');
      return;
    }

    // Mostrar conteudo com pequeno delay para animacao
    if (isAuthenticated) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !showContent) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-center">
      {/* Icone de sucesso animado */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <div className="relative bg-green-500/10 rounded-full p-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>
      </div>

      {/* Mensagem de sucesso */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Conta criada com sucesso!
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao LeVoyager! Sua conta foi criada e voce ja esta logado.
        </p>
      </div>

      {/* Proximo passo */}
      <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Proximo passo: Configure suas preferencias
        </h2>
        <p className="text-sm text-muted-foreground">
          Para receber alertas personalizados, configure suas rotas favoritas,
          faixa de preco e canais de notificacao.
        </p>
        <Link
          href="/dashboard/preferences"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Configurar Preferencias
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Opcoes adicionais */}
      <div className="grid gap-3">
        <Link
          href="/dashboard"
          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Ir para o Dashboard</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>

        <Link
          href="/"
          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Voltar para a Home</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Nota sobre email */}
      <p className="text-xs text-muted-foreground">
        Enviamos um email de boas-vindas para voce. Verifique sua caixa de entrada.
      </p>
    </div>
  );
}
