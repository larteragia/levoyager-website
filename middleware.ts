import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que requerem autenticacao
const protectedRoutes = [
  '/dashboard',
];

// Rotas de autenticacao (redirect se ja logado)
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se ha token no cookie
  const token = request.cookies.get('voyager_token')?.value;

  // Para rotas protegidas sem token, redireciona para login
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Para rotas de auth com token, redireciona para dashboard
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rotas protegidas (dashboard e subrotas)
    '/dashboard/:path*',
    // Rotas de auth
    '/login',
    '/register',
    '/forgot-password',
  ],
};
