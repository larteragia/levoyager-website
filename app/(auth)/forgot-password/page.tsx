'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, Loader2, Check } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Integrar com Convex para enviar email de recuperação
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (err) {
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Email enviado!
          </h1>
          <p className="text-slate-600">
            Enviamos um link de recuperação para <strong>{email}</strong>
          </p>
        </div>

        <div className="bg-slate-100 rounded-lg p-4 text-left">
          <h3 className="font-medium text-slate-900 mb-2">Próximos passos:</h3>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
            <li>Verifique sua caixa de entrada</li>
            <li>Clique no link de recuperação</li>
            <li>Crie uma nova senha segura</li>
          </ol>
        </div>

        <p className="text-sm text-slate-500">
          Não recebeu o email? Verifique sua pasta de spam ou{' '}
          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            tente novamente
          </button>
        </p>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o login
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Esqueceu sua senha?
        </h1>
        <p className="text-slate-600">
          Não se preocupe! Digite seu email e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar link de recuperação
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="bg-sky-50 rounded-lg p-4 border border-sky-100">
        <p className="text-sm text-sky-800">
          <strong>Dica:</strong> Use o mesmo email que você usou para se cadastrar no Voyager.
        </p>
      </div>

      <p className="text-center text-sm text-slate-600">
        Lembrou sua senha?{' '}
        <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium">
          Fazer login
        </Link>
      </p>
    </div>
  );
}
