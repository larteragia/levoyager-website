'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Check } from 'lucide-react';
import { useAuth } from '../../hooks';

export default function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return { score: 0, label: '' };
    if (password.length < 6) return { score: 1, label: 'Fraca' };
    if (password.length < 8) return { score: 2, label: 'Razoavel' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
      return { score: 4, label: 'Forte' };
    }
    return { score: 3, label: 'Boa' };
  };

  const strength = passwordStrength();
  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (formData.password !== formData.confirmPassword) {
      setLocalError('As senhas nao coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!formData.acceptTerms) {
      setLocalError('Voce deve aceitar os termos de uso.');
      return;
    }

    const result = await register(formData.email, formData.password, formData.name);

    if (!result.success && result.error) {
      setLocalError(result.error);
    }
  };

  const displayError = localError || error;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Crie sua conta gratis
        </h1>
        <p className="text-muted-foreground">
          Comece a receber alertas de promocoes agora mesmo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {displayError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {displayError}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Nome completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimo 6 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {formData.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i <= strength.score ? strengthColors[strength.score] : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Forca da senha: <span className="font-medium">{strength.label}</span>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
            Confirmar senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite a senha novamente"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              required
              disabled={isLoading}
            />
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
            disabled={isLoading}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            Eu aceito os{' '}
            <Link href="/termos" className="text-primary hover:text-primary/80 font-medium">
              Termos de Uso
            </Link>{' '}
            e a{' '}
            <Link href="/privacidade" className="text-primary hover:text-primary/80 font-medium">
              Politica de Privacidade
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Criando conta...
            </>
          ) : (
            <>
              Criar conta gratis
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">O que voce ganha:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Alertas ilimitados de promocoes
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Filtros personalizados por destino
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Notificacoes por Telegram, Email e WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Historico completo de promocoes
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Ja tem uma conta?{' '}
        <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
          Fazer login
        </Link>
      </p>
    </div>
  );
}
