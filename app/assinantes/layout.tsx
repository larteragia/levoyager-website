'use client';

import { AuthGuard } from '../components/AuthGuard';

export default function AssinantesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true}>
      {children}
    </AuthGuard>
  );
}
