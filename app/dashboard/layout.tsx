'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Plane,
  Bell,
  History,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
  Home,
} from 'lucide-react';
import { AuthGuard } from '../components/AuthGuard';
import { useAuth, useUser } from '../hooks';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Alertas', href: '/alerts', icon: Bell },
  { name: 'Favoritos', href: '/favorites', icon: Heart },
  { name: 'Historico', href: '/history', icon: History },
  { name: 'Preferencias', href: '/preferences', icon: Settings },
  { name: 'Estatisticas', href: '/statistics', icon: BarChart3 },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { logout } = useAuth();
  const { user, isLoading } = useUser();

  // Dados do usuario
  const displayName = user?.fullName || user?.email?.split('@')[0] || 'Usuario';
  const displayEmail = user?.email || '';
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-sky-600 rounded-xl">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">Voyager</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-sky-600' : ''}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-200">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-medium">
                  {isLoading ? '...' : initial}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {isLoading ? 'Carregando...' : displayName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{displayEmail}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                  <Link
                    href="/preferences"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Meu Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 lg:hidden" />

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <Link href="/alerts" className="relative p-2 text-slate-400 hover:text-slate-600">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent>{children}</DashboardContent>
    </AuthGuard>
  );
}
