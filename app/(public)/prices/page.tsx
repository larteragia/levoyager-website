'use client';

import { useState } from 'react';
import { Search, TrendingDown, TrendingUp, Minus, Plane, Calendar } from 'lucide-react';

// Dados estaticos de precos (em producao viria do Convex)
const priceData = [
  {
    origin: 'GRU',
    destination: 'MIA',
    originName: 'Sao Paulo (Guarulhos)',
    destinationName: 'Miami',
    airlines: [
      { code: 'LA', name: 'LATAM', price: 2890, trend: 'down' as const },
      { code: 'AA', name: 'American', price: 3150, trend: 'up' as const },
      { code: 'G3', name: 'GOL', price: 2750, trend: 'down' as const },
    ],
    avgPrice: 2930,
    minPrice: 2750,
    lastUpdated: '2026-01-09',
  },
  {
    origin: 'GRU',
    destination: 'LIS',
    originName: 'Sao Paulo (Guarulhos)',
    destinationName: 'Lisboa',
    airlines: [
      { code: 'TP', name: 'TAP', price: 3450, trend: 'stable' as const },
      { code: 'LA', name: 'LATAM', price: 3890, trend: 'down' as const },
    ],
    avgPrice: 3670,
    minPrice: 3450,
    lastUpdated: '2026-01-09',
  },
  {
    origin: 'GRU',
    destination: 'CDG',
    originName: 'Sao Paulo (Guarulhos)',
    destinationName: 'Paris',
    airlines: [
      { code: 'AF', name: 'Air France', price: 4200, trend: 'up' as const },
      { code: 'LA', name: 'LATAM', price: 4050, trend: 'stable' as const },
    ],
    avgPrice: 4125,
    minPrice: 4050,
    lastUpdated: '2026-01-09',
  },
  {
    origin: 'GRU',
    destination: 'JFK',
    originName: 'Sao Paulo (Guarulhos)',
    destinationName: 'Nova York',
    airlines: [
      { code: 'LA', name: 'LATAM', price: 3200, trend: 'down' as const },
      { code: 'AA', name: 'American', price: 3400, trend: 'stable' as const },
      { code: 'DL', name: 'Delta', price: 3550, trend: 'up' as const },
    ],
    avgPrice: 3383,
    minPrice: 3200,
    lastUpdated: '2026-01-09',
  },
  {
    origin: 'GYN',
    destination: 'GRU',
    originName: 'Goiania',
    destinationName: 'Sao Paulo (Guarulhos)',
    airlines: [
      { code: 'LA', name: 'LATAM', price: 420, trend: 'down' as const },
      { code: 'G3', name: 'GOL', price: 380, trend: 'stable' as const },
      { code: 'AD', name: 'Azul', price: 450, trend: 'up' as const },
    ],
    avgPrice: 417,
    minPrice: 380,
    lastUpdated: '2026-01-09',
  },
  {
    origin: 'GYN',
    destination: 'CGH',
    originName: 'Goiania',
    destinationName: 'Sao Paulo (Congonhas)',
    airlines: [
      { code: 'LA', name: 'LATAM', price: 450, trend: 'stable' as const },
      { code: 'G3', name: 'GOL', price: 390, trend: 'down' as const },
    ],
    avgPrice: 420,
    minPrice: 390,
    lastUpdated: '2026-01-09',
  },
];

const origins = ['Todos', 'GRU', 'GYN'];
const destinations = ['Todos', 'MIA', 'LIS', 'CDG', 'JFK', 'GRU', 'CGH'];

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="h-4 w-4 text-red-500" />;
  if (trend === 'down') return <TrendingDown className="h-4 w-4 text-green-500" />;
  return <Minus className="h-4 w-4 text-slate-400" />;
}

export default function PricesPage() {
  const [selectedOrigin, setSelectedOrigin] = useState('Todos');
  const [selectedDestination, setSelectedDestination] = useState('Todos');

  const filteredPrices = priceData.filter((route) => {
    if (selectedOrigin !== 'Todos' && route.origin !== selectedOrigin) return false;
    if (selectedDestination !== 'Todos' && route.destination !== selectedDestination) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Precos por Rota
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Compare precos das principais rotas monitoradas pelo LeVoyager e veja as tendencias.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Origem
            </label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {origins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin === 'Todos' ? 'Todas as origens' : origin}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Destino
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest === 'Todos' ? 'Todos os destinos' : dest}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Cards */}
      <div className="space-y-6">
        {filteredPrices.map((route) => (
          <div
            key={`${route.origin}-${route.destination}`}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            {/* Route Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-slate-900">{route.origin}</span>
                      <p className="text-xs text-slate-500">{route.originName}</p>
                    </div>
                    <Plane className="h-5 w-5 text-sky-600" />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-slate-900">{route.destination}</span>
                      <p className="text-xs text-slate-500">{route.destinationName}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Menor preco</p>
                    <p className="text-xl font-bold text-green-600">
                      R$ {route.minPrice.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Media</p>
                    <p className="text-lg font-semibold text-slate-700">
                      R$ {route.avgPrice.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Airlines Table */}
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <th className="pb-3">Companhia</th>
                    <th className="pb-3 text-right">Preco</th>
                    <th className="pb-3 text-right">Tendencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {route.airlines.map((airline) => (
                    <tr key={airline.code}>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-slate-600">{airline.code}</span>
                          </div>
                          <span className="font-medium text-slate-900">{airline.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <span className="font-semibold text-slate-900">
                          R$ {airline.price.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TrendIcon trend={airline.trend} />
                          <span className={`text-sm ${
                            airline.trend === 'down' ? 'text-green-600' :
                            airline.trend === 'up' ? 'text-red-600' :
                            'text-slate-500'
                          }`}>
                            {airline.trend === 'down' ? 'Em queda' :
                             airline.trend === 'up' ? 'Subindo' :
                             'Estavel'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Atualizado em {new Date(route.lastUpdated).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredPrices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Nenhuma rota encontrada
          </h3>
          <p className="text-slate-600">
            Tente ajustar os filtros de origem ou destino.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center bg-sky-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Seja avisado quando os precos caírem
        </h2>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">
          Cadastre-se e configure suas rotas favoritas. Enviaremos alertas quando encontrarmos promocoes.
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
