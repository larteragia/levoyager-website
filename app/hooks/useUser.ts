'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuthContext } from '../providers';

export interface User {
  _id: string;
  email: string;
  fullName?: string;
  phone?: string;
  telegramChatId?: string;
  isEmailVerified: boolean;
}

export interface UserPreferences {
  preferredOrigins: string[];
  preferredDestinations: string[];
  maxPrice: number;
  preferredAirlines: string[];
  notificationChannels: string[];
  notificationFrequency: string;
}

export function useUser() {
  const { token, isAuthenticated, isLoading: authLoading } = useAuthContext();

  // Query para obter usuário com preferências
  const result = useQuery(
    api.auth.getUserWithPreferences,
    isAuthenticated && token ? { token } : 'skip'
  );

  const isLoading = authLoading || (isAuthenticated && result === undefined);

  return {
    user: result?.user as User | null,
    preferences: result?.preferences as UserPreferences | null,
    isLoading,
    isAuthenticated,
  };
}

// Hook simplificado apenas para verificar se está autenticado
export function useSession() {
  const { token, isAuthenticated, isLoading } = useAuthContext();

  const sessionResult = useQuery(
    api.auth.validateSession,
    token ? { token } : 'skip'
  );

  return {
    isAuthenticated: isAuthenticated && sessionResult?.valid === true,
    isLoading: isLoading || sessionResult === undefined,
    token,
  };
}
