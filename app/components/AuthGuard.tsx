'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '../providers';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      // Redirecionar para login com URL de retorno
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, requireAuth, router, pathname]);

  // Mostrar loading enquanto verifica autenticacao
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se requer auth e nao esta autenticado, nao renderiza nada (redirect em andamento)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
