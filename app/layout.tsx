import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeVoyager - Encontre as Melhores Promoções de Passagens Aéreas',
  description: 'Receba alertas em tempo real das melhores promoções de passagens aéreas. Cadastre-se gratuitamente e configure suas preferências personalizadas.',
  keywords: 'passagens aéreas, promoções, voos baratos, descontos, viagens, turismo, viajar, avião, passagens promocionais, ofertas especiais',
  authors: [{ name: 'LeVoyager' }],
  creator: 'LeVoyager',
  publisher: 'LeVoyager',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'LeVoyager',
    description: 'Encontre as melhores promoções de passagens aéreas',
    siteName: 'LeVoyager',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LeVoyager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeVoyager',
    description: 'Encontre as melhores promoções de passagens aéreas',
    images: ['/symbol.png'],
    creator: '@levoyager',
    site: '@levoyager',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/symbol.png',
    shortcut: '/symbol.png',
    apple: '/symbol.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={process.env.NEXT_PUBLIC_APP_THEME_COLOR || '#F1F5F9'} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
        <link rel="icon" href="/symbol.png" sizes="any" />
        <link rel="shortcut icon" href="/symbol.png" />
        <link rel="apple-touch-icon" href="/symbol.png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
