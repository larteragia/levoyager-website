'use client';

import { useState } from 'react';
import { Search, ExternalLink, Plane } from 'lucide-react';

// Dados estaticos das companhias (em producao viria do Convex)
const airlines = [
  {
    code: 'LA',
    name: 'LATAM Airlines',
    logoUrl: null,
    websiteUrl: 'https://www.latam.com',
    description: 'A maior companhia aerea da America Latina, oferecendo voos domesticos e internacionais.',
    routes: ['GRU-MIA', 'GRU-JFK', 'GRU-CDG', 'GRU-LIS', 'GYN-GRU'],
  },
  {
    code: 'G3',
    name: 'GOL Linhas Aereas',
    logoUrl: null,
    websiteUrl: 'https://www.voegol.com.br',
    description: 'Companhia brasileira low-cost com ampla cobertura nacional.',
    routes: ['GRU-MIA', 'GRU-MCO', 'GYN-GRU', 'GYN-CGH'],
  },
  {
    code: 'AD',
    name: 'Azul Linhas Aereas',
    logoUrl: null,
    websiteUrl: 'https://www.voeazul.com.br',
    description: 'Terceira maior companhia aerea do Brasil, conhecida pelo conforto.',
    routes: ['VCP-FLL', 'VCP-MCO', 'VCP-JFK', 'GYN-VCP'],
  },
  {
    code: 'TP',
    name: 'TAP Air Portugal',
    logoUrl: null,
    websiteUrl: 'https://www.flytap.com',
    description: 'Companhia portuguesa com hub em Lisboa, excelente para Europa.',
    routes: ['GRU-LIS', 'GRU-OPO', 'GRU-CDG'],
  },
  {
    code: 'AV',
    name: 'Avianca',
    logoUrl: null,
    websiteUrl: 'https://www.avianca.com',
    description: 'Companhia colombiana com boas conexoes para Americas e Europa.',
    routes: ['GRU-BOG', 'GRU-MIA', 'GRU-MAD'],
  },
  {
    code: 'AA',
    name: 'American Airlines',
    logoUrl: null,
    websiteUrl: 'https://www.aa.com',
    description: 'Uma das maiores companhias americanas, hub em Miami e Dallas.',
    routes: ['GRU-MIA', 'GRU-DFW', 'GRU-JFK'],
  },
  {
    code: 'UA',
    name: 'United Airlines',
    logoUrl: null,
    websiteUrl: 'https://www.united.com',
    description: 'Companhia americana com ampla rede para Estados Unidos.',
    routes: ['GRU-IAH', 'GRU-EWR', 'GRU-ORD'],
  },
  {
    code: 'DL',
    name: 'Delta Air Lines',
    logoUrl: null,
    websiteUrl: 'https://www.delta.com',
    description: 'Companhia americana premium com hub em Atlanta.',
    routes: ['GRU-ATL', 'GRU-JFK'],
  },
  {
    code: 'AF',
    name: 'Air France',
    logoUrl: null,
    websiteUrl: 'https://www.airfrance.com.br',
    description: 'Companhia francesa com voos diretos para Paris.',
    routes: ['GRU-CDG'],
  },
  {
    code: 'IB',
    name: 'Iberia',
    logoUrl: null,
    websiteUrl: 'https://www.iberia.com',
    description: 'Companhia espanhola com hub em Madrid, otima para Europa.',
    routes: ['GRU-MAD'],
  },
];

export default function AirlinesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAirlines = airlines.filter(
    (airline) =>
      airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airline.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Companhias Aereas
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Conheca as principais companhias aereas monitoradas pelo Voyager e suas rotas mais populares.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou codigo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Airlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAirlines.map((airline) => (
          <div
            key={airline.code}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-600">{airline.code}</span>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{airline.name}</h2>
                  <span className="text-sm text-slate-500">Codigo: {airline.code}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">{airline.description}</p>

            {/* Routes */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Rotas Populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {airline.routes.slice(0, 4).map((route) => (
                  <span
                    key={route}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-medium"
                  >
                    <Plane className="h-3 w-3" />
                    {route}
                  </span>
                ))}
                {airline.routes.length > 4 && (
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                    +{airline.routes.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Website Link */}
            <a
              href={airline.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              Visitar site oficial
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredAirlines.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Nenhuma companhia encontrada
          </h3>
          <p className="text-slate-600">
            Tente buscar por outro nome ou codigo.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center bg-sky-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Receba alertas de todas as companhias
        </h2>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">
          Cadastre-se gratuitamente e receba notificacoes quando encontrarmos promocoes nas suas companhias favoritas.
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
        >
          Criar conta gratis
        </a>
      </div>
    </div>
  );
}
