'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const verifyEmailMutation = useMutation(api.auth.verifyEmail);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token de verificação não encontrado.');
      return;
    }

    const verifyEmail = async () => {
      try {
        await verifyEmailMutation({ token });
        setStatus('success');
        setMessage('Seu email foi verificado com sucesso!');
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Erro ao verificar email.');
      }
    };

    verifyEmail();
  }, [token, verifyEmailMutation]);

  return (
    <div className="space-y-6 text-center">
      {status === 'loading' && (
        <>
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Verificando seu email...
            </h1>
            <p className="text-muted-foreground">
              Aguarde enquanto confirmamos seu email.
            </p>
          </div>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              <div className="relative bg-green-500/10 rounded-full p-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Email verificado!
            </h1>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Ir para o Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="flex justify-center">
            <div className="bg-destructive/10 rounded-full p-4">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Erro na verificacao
            </h1>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Ir para o Dashboard
            </Link>
            <p className="text-sm text-muted-foreground">
              Voce pode solicitar um novo email de verificacao nas configuracoes.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="bg-primary/10 rounded-full p-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Carregando...
        </h1>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
