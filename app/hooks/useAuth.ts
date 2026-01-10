'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuthContext } from '../providers';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

// Função simples de hash para senha (em produção usar bcrypt no backend)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function useAuth() {
  const router = useRouter();
  const { token, userId, isAuthenticated, isLoading: contextLoading, setAuth, clearAuth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mutations do Convex
  const registerMutation = useMutation(api.auth.register);
  const loginMutation = useMutation(api.auth.login);
  const logoutMutation = useMutation(api.auth.logout);
  const forgotPasswordMutation = useMutation(api.auth.forgotPassword);
  const resetPasswordMutation = useMutation(api.auth.resetPassword);

  // Registro
  const register = useCallback(
    async (email: string, password: string, fullName?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const passwordHash = await hashPassword(password);
        const newUserId = await registerMutation({
          email,
          passwordHash,
          fullName,
        });

        // Fazer login automaticamente após registro
        const { token: newToken } = await loginMutation({
          email,
          passwordHash,
        });

        setAuth(newToken, newUserId);

        // Enviar email de boas-vindas (nao bloqueia o fluxo)
        fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            template: 'welcome',
            data: { name: fullName }
          })
        }).catch(err => console.error('Erro ao enviar email de boas-vindas:', err));

        router.push('/register/success');
        return { success: true, userId: newUserId };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao criar conta';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [registerMutation, loginMutation, setAuth, router]
  );

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const passwordHash = await hashPassword(password);
        const { token: newToken, userId: newUserId } = await loginMutation({
          email,
          passwordHash,
        });

        setAuth(newToken, newUserId);
        router.push('/dashboard');
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Credenciais inválidas';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [loginMutation, setAuth, router]
  );

  // Logout
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      if (token) {
        await logoutMutation({ token });
      }
    } catch (err) {
      // Ignorar erros de logout
      console.error('Erro ao fazer logout:', err);
    } finally {
      clearAuth();
      setIsLoading(false);
      router.push('/login');
    }
  }, [token, logoutMutation, clearAuth, router]);

  // Recuperação de senha
  const forgotPassword = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await forgotPasswordMutation({ email });

        // Em producao, envia email de recuperacao
        // O resetToken so e retornado em dev, em prod seria gerado no backend
        if (result.resetToken) {
          const resetUrl = `${window.location.origin}/reset-password?token=${result.resetToken}`;
          fetch('/api/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: email,
              template: 'passwordReset',
              data: { resetUrl }
            })
          }).catch(err => console.error('Erro ao enviar email de recuperacao:', err));
        }

        return { success: true, message: result.message };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao enviar email';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [forgotPasswordMutation]
  );

  // Reset de senha
  const resetPassword = useCallback(
    async (resetToken: string, newPassword: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const newPasswordHash = await hashPassword(newPassword);
        await resetPasswordMutation({
          resetToken,
          newPasswordHash,
        });
        router.push('/login');
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Token inválido ou expirado';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [resetPasswordMutation, router]
  );

  return {
    // Estado
    token,
    userId,
    isAuthenticated,
    isLoading: isLoading || contextLoading,
    error,

    // Ações
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,

    // Utilitários
    clearError: () => setError(null),
  };
}
