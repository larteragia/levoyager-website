'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ReactNode, useState, useEffect, createContext, useContext } from 'react';

// Criar cliente Convex
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://placeholder.convex.cloud';

// Funcoes auxiliares para cookies
function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// Contexto de autenticação
interface AuthContextType {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string | null, userId: string | null) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

// Provider de autenticação
function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar token do localStorage ao iniciar
    const storedToken = localStorage.getItem('voyager_token');
    const storedUserId = localStorage.getItem('voyager_user_id');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const setAuth = (newToken: string | null, newUserId: string | null) => {
    setToken(newToken);
    setUserId(newUserId);

    if (newToken && newUserId) {
      localStorage.setItem('voyager_token', newToken);
      localStorage.setItem('voyager_user_id', newUserId);
      // Sincronizar com cookie para middleware
      setCookie('voyager_token', newToken, 7);
    }
  };

  const clearAuth = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('voyager_token');
    localStorage.removeItem('voyager_user_id');
    // Remover cookie
    deleteCookie('voyager_token');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAuthenticated: !!token,
        isLoading,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Provider principal que combina Convex + Auth
export function Providers({ children }: { children: ReactNode }) {
  const [convex] = useState(() => new ConvexReactClient(convexUrl));

  return (
    <ConvexProvider client={convex}>
      <AuthProvider>{children}</AuthProvider>
    </ConvexProvider>
  );
}
