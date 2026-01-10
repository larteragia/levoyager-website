import Link from 'next/link';
import Image from 'next/image';
import { Plane, Bell, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { HeroAuthButtons, CTAAuthButton } from './components/AuthButtons';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="container px-4 py-4">
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-28">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="LeVoyager"
              width={280}
              height={70}
              priority
            />
          </div>

          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            <span>Alertas em Tempo Real</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Encontre as <span className="gradient-text">Melhores Promoções</span> de Passagens Aéreas
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Receba alertas instantâneos das melhores ofertas de voos diretamente no seu Telegram ou Email.
            Configure suas preferências e economize muito dinheiro.
          </p>

          <HeroAuthButtons />

          <div className="flex items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>+10.000 usuários</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>+100.000 alertas</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Economia média de 40%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Bell className="h-6 w-6" />}
            title="Alertas em Tempo Real"
            description="Receba notificações instantâneas assim que novas promoções forem encontradas."
          />
          <FeatureCard
            icon={<Plane className="h-6 w-6" />}
            title="Filtros Personalizados"
            description="Configure origens, destinos, companhias e faixas de preço."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Histórico Completo"
            description="Acesse todas as promoções recebidas e compare preços."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Multi-canal"
            description="Receba alertas via Telegram, Email e WhatsApp."
          />
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Tendências de Preços"
            description="Visualize gráficos de preços e identifique as melhores épocas."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Comunidade Ativa"
            description="Junte-se a milhares de viajantes economizando com o LeVoyager."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece a economizar em 3 passos simples
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            step={1}
            title="Cadastre-se Gratuitamente"
            description="Crie sua conta em menos de 1 minuto. Sem cartão de crédito necessário."
          />
          <StepCard
            step={2}
            title="Configure suas Preferências"
            description="Defina suas rotas favoritas, faixas de preço e canais de notificação."
          />
          <StepCard
            step={3}
            title="Receba Alertas Instantâneos"
            description="Aguarde as notificações e aproveite as melhores promoções."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20">
        <div className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Pronto para Começar a Economizar?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Cadastre-se agora e receba sua primeira promoção em até 24 horas.
          </p>
          <CTAAuthButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="container px-4 py-12 border-t">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LeVoyager. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacidade" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-foreground transition-colors">
              Termos
            </Link>
            <Link href="/suporte" className="hover:text-foreground transition-colors">
              Suporte
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {step}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
