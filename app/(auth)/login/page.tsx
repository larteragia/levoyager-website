'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks';

export default function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!formData.email || !formData.password) {
      setLocalError('Preencha todos os campos.');
      return;
    }

    const result = await login(formData.email, formData.password);

    if (!result.success && result.error) {
      setLocalError(result.error);
    }
  };

  const displayError = localError || error;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Bem-vindo de volta
        </h1>
        <p className="text-slate-600">
          Entre na sua conta para acessar seus alertas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {displayError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {displayError}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            disabled={isLoading}
          />
          <label htmlFor="remember" className="text-sm text-slate-600">
            Manter conectado
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-slate-50 text-slate-500">ou continue com</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      <p className="text-center text-sm text-slate-600">
        Nao tem uma conta?{' '}
        <Link href="/register" className="text-sky-600 hover:text-sky-700 font-medium">
          Cadastre-se gratis
        </Link>
      </p>
    </div>
  );
}
