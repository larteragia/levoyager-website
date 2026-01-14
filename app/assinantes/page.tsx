'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  Plane,
  ExternalLink,
  LogOut,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { useAuth, useUser } from '../hooks';
import { ThemeToggle } from '../components/ThemeToggle';

// Tipos
interface FlightOffer {
  id: number;
  origin: string;
  destination: string;
  destinationCity?: string;
  airline: string;
  priceTotal: number;
  discountPercentage: number;
  discountClassification: string;
  sourceUrl: string;
  createdAt: string;
}

interface FlightsData {
  offers: FlightOffer[];
  total: number;
  type: 'domestic' | 'international';
  lastUpdated: string;
  error?: string;
}

// Cores dos badges de desconto
const badgeColors: Record<string, string> = {
  OTIMO: 'bg-green-500',
  BOM: 'bg-blue-500',
  NORMAL: 'bg-slate-500',
  CARO: 'bg-red-500',
};

// Componente de linha de voo
function FlightRow({ offer }: { offer: FlightOffer }) {
  const badgeColor = badgeColors[offer.discountClassification] || 'bg-slate-500';

  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 min-w-[100px]">
          <span className="font-mono font-semibold text-slate-100">
            {offer.origin}
          </span>
          <span className="text-slate-500">→</span>
          <span className="font-mono font-semibold text-slate-100">
            {offer.destination}
          </span>
        </div>
        <span className="text-slate-400 text-sm min-w-[120px]">
          {offer.destinationCity || offer.destination}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-green-400 font-bold text-lg min-w-[100px] text-right">
          R$ {offer.priceTotal.toLocaleString('pt-BR')}
        </span>

        {offer.discountPercentage > 0 && (
          <span
            className={`${badgeColor} text-white text-xs font-medium px-2 py-1 rounded min-w-[60px] text-center`}
          >
            -{offer.discountPercentage}%
          </span>
        )}

        <span className="text-slate-400 text-sm min-w-[80px]">
          {offer.airline}
        </span>

        <a
          href={offer.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 text-sm transition-colors"
        >
          Ver oferta
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// Componente de menu dropdown
function FlightMenu({
  title,
  subtitle,
  offers,
  count,
  defaultOpen = false,
  isLoading = false,
  error,
}: {
  title: string;
  subtitle: string;
  offers: FlightOffer[];
  count: number;
  defaultOpen?: boolean;
  isLoading?: boolean;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Plane className="h-5 w-5 text-sky-400" />
          <div className="text-left">
            <h3 className="font-semibold text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-slate-700 text-slate-300 text-sm px-3 py-1 rounded-full">
            {isLoading ? '...' : count}
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-700/50">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <RefreshCw className="h-6 w-6 text-sky-400 animate-spin" />
              <span className="ml-3 text-slate-400">Carregando voos...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-8 text-amber-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          ) : offers.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-slate-500">
              Nenhuma oferta disponivel no momento
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {offers.map((offer) => (
                <FlightRow key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AssinantesPage() {
  const { logout } = useAuth();
  const { user, isLoading: userLoading } = useUser();

  const [domesticFlights, setDomesticFlights] = useState<FlightsData | null>(null);
  const [internationalFlights, setInternationalFlights] = useState<FlightsData | null>(null);
  const [isLoadingDomestic, setIsLoadingDomestic] = useState(true);
  const [isLoadingInternational, setIsLoadingInternational] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Buscar voos
  useEffect(() => {
    async function fetchFlights() {
      // Voos domesticos (GYN -> SP)
      setIsLoadingDomestic(true);
      try {
        const resDomestic = await fetch('/api/voyager/flights?type=domestic&origin=GYN');
        const dataDomestic = await resDomestic.json();
        setDomesticFlights(dataDomestic);
        if (dataDomestic.lastUpdated) {
          setLastUpdated(dataDomestic.lastUpdated);
        }
      } catch (error) {
        console.error('Erro ao buscar voos domesticos:', error);
        setDomesticFlights({ offers: [], total: 0, type: 'domestic', lastUpdated: '', error: 'Erro ao carregar' });
      }
      setIsLoadingDomestic(false);

      // Voos internacionais (GRU -> Mundo)
      setIsLoadingInternational(true);
      try {
        const resInternational = await fetch('/api/voyager/flights?type=international&origin=GRU');
        const dataInternational = await resInternational.json();
        setInternationalFlights(dataInternational);
        if (dataInternational.lastUpdated) {
          setLastUpdated(dataInternational.lastUpdated);
        }
      } catch (error) {
        console.error('Erro ao buscar voos internacionais:', error);
        setInternationalFlights({ offers: [], total: 0, type: 'international', lastUpdated: '', error: 'Erro ao carregar' });
      }
      setIsLoadingInternational(false);
    }

    fetchFlights();
  }, []);

  const displayName = user?.fullName || user?.email?.split('@')[0] || 'Assinante';

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LeVoyager"
              width={160}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-sm">
              Bem-vindo, <span className="font-medium text-slate-100">{userLoading ? '...' : displayName}</span>
            </span>
            <ThemeToggle />
            <button
              onClick={logout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Titulo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100">
              Area do Assinante
            </h1>
            <p className="text-slate-400 mt-1">
              Voos em tempo real com os melhores precos
            </p>
          </div>

          {/* Menu Nacional */}
          <FlightMenu
            title="Voos Nacionais"
            subtitle="Goiania → Sao Paulo"
            offers={domesticFlights?.offers || []}
            count={domesticFlights?.total || 0}
            defaultOpen={true}
            isLoading={isLoadingDomestic}
            error={domesticFlights?.error}
          />

          {/* Menu Internacional */}
          <FlightMenu
            title="Voos Internacionais"
            subtitle="Guarulhos → Mundo"
            offers={internationalFlights?.offers || []}
            count={internationalFlights?.total || 0}
            defaultOpen={false}
            isLoading={isLoadingInternational}
            error={internationalFlights?.error}
          />

          {/* Aviso */}
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mt-8">
            <p className="text-amber-200 text-sm">
              <strong>Aviso:</strong> Precos aproximados obtidos via Google Flights.
              Podem variar ate 15%. Verifique o valor final antes de comprar.
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700/50 pt-6 mt-8">
            <p className="text-slate-500 text-sm text-center">
              LeVoyager - Atualizado: {lastUpdated
                ? new Date(lastUpdated).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Aguardando dados...'
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
