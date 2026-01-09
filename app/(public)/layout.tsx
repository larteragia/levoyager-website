'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthContext } from '../providers';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Companhias', href: '/airlines' },
  { name: 'Precos', href: '/prices' },
  { name: 'Dicas', href: '/tips' },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-sky-600 rounded-xl">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">Voyager</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-sky-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                >
                  Meu Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                  >
                    Cadastrar
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-slate-600"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium ${
                      pathname === item.href
                        ? 'text-sky-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                  {isAuthenticated ? (
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center px-4 py-2 rounded-lg bg-sky-600 text-white font-medium"
                    >
                      Meu Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium"
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center px-4 py-2 rounded-lg bg-sky-600 text-white font-medium"
                      >
                        Cadastrar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-600 rounded-xl">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Voyager</span>
              </div>
              <p className="text-slate-400 text-sm">
                Encontre as melhores promocoes de passagens aereas e economize em suas viagens.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Navegacao</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/airlines" className="hover:text-white">
                    Companhias
                  </Link>
                </li>
                <li>
                  <Link href="/prices" className="hover:text-white">
                    Precos
                  </Link>
                </li>
                <li>
                  <Link href="/tips" className="hover:text-white">
                    Dicas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/termos" className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>contato@levoyager.com.br</li>
                <li>
                  <a
                    href="https://t.me/voyagerbr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Voyager. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
