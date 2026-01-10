'use client';

import Link from 'next/link';
import { useAuthContext } from '../providers';
import { ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../hooks';

export function HeroAuthButtons() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-12 w-48 rounded-lg bg-primary/20 animate-pulse"></div>
        <div className="h-12 w-36 rounded-lg bg-muted animate-pulse"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <LayoutDashboard className="h-4 w-4" />
          Ir para Dashboard
        </Link>
        <button
          onClick={() => logout()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link
        href="/register"
        className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Comecar Agora - E Gratis
      </Link>
      <Link
        href="/login"
        className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Ja tenho conta
      </Link>
    </div>
  );
}

export function CTAAuthButton() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="h-12 w-48 rounded-lg bg-background/20 animate-pulse mx-auto"></div>
    );
  }

  if (isAuthenticated) {
    return (
      <Link
        href="/dashboard/preferences"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Configurar Alertas
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href="/register"
      className="inline-flex h-12 items-center justify-center rounded-lg bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Criar Minha Conta Gratis
    </Link>
  );
}
