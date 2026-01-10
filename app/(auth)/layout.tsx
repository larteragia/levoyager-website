import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-12 text-white">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="LeVoyager"
              width={200}
              height={50}
              className="brightness-0 invert"
            />
          </Link>
        </div>

        <div className="space-y-6">
          <blockquote className="text-xl font-medium leading-relaxed">
            "Economizei mais de R$ 3.000 na minha viagem para Europa.
            Os alertas chegam exatamente quando as promoções aparecem!"
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
              MR
            </div>
            <div>
              <p className="font-semibold">Marina Rodrigues</p>
              <p className="text-white/70 text-sm">Viajante desde 2024</p>
            </div>
          </div>
        </div>

        <div className="flex gap-8 text-sm text-white/70">
          <div>
            <p className="text-3xl font-bold text-white">10k+</p>
            <p>Usuários ativos</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">50k+</p>
            <p>Alertas enviados</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">40%</p>
            <p>Economia média</p>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="LeVoyager"
                width={180}
                height={45}
              />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
