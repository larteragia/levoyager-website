import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Voyager Assinaturas - Encontre as Melhores Promoções de Passagens Aéreas',
  description: 'Receba alertas em tempo real das melhores promoções de passagens aéreas. Cadastre-se gratuitamente e configure suas preferências personalizadas.',
  keywords: 'passagens aéreas, promoções, voos baratos, descontos, viagens, turismo, viajar, avião, passagens promocionais, ofertas especiais',
  authors: [{ name: 'Voyager' }],
  creator: 'Voyager',
  publisher: 'Voyager',
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
    title: 'Voyager Assinaturas',
    description: 'Encontre as melhores promoções de passagens aéreas',
    siteName: 'Voyager',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Voyager Assinaturas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voyager Assinaturas',
    description: 'Encontre as melhores promoções de passagens aéreas',
    images: ['/og-image.jpg'],
    creator: '@voyagerbr',
    site: '@voyagerbr',
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
