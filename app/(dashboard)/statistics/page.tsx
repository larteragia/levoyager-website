'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plane,
  DollarSign,
  Bell,
  Calendar,
  MapPin,
} from 'lucide-react';

// Dados de exemplo
const statsData = {
  totalAlerts: 147,
  totalSavings: 12450,
  avgDiscount: 42,
  mostPopularDestination: 'Miami (MIA)',
  alertsThisMonth: 23,
  alertsLastMonth: 18,
};

const monthlyData = [
  { month: 'Jul', alerts: 12, savings: 1200 },
  { month: 'Ago', alerts: 18, savings: 2100 },
  { month: 'Set', alerts: 15, savings: 1800 },
  { month: 'Out', alerts: 22, savings: 2800 },
  { month: 'Nov', alerts: 28, savings: 3200 },
  { month: 'Dez', alerts: 35, savings: 4100 },
  { month: 'Jan', alerts: 23, savings: 2450 },
];

const topDestinations = [
  { code: 'MIA', name: 'Miami', count: 24, avgPrice: 2450 },
  { code: 'LIS', name: 'Lisboa', count: 18, avgPrice: 3200 },
  { code: 'ORL', name: 'Orlando', count: 15, avgPrice: 2680 },
  { code: 'NYC', name: 'Nova York', count: 12, avgPrice: 3100 },
  { code: 'PAR', name: 'Paris', count: 10, avgPrice: 3800 },
];

const topAirlines = [
  { name: 'LATAM', count: 42, avgDiscount: 38 },
  { name: 'GOL', count: 35, avgDiscount: 45 },
  { name: 'Azul', count: 28, avgDiscount: 42 },
  { name: 'TAP', count: 22, avgDiscount: 35 },
  { name: 'American', count: 15, avgDiscount: 32 },
];

export default function StatisticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const maxAlerts = Math.max(...monthlyData.map((d) => d.alerts));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Estatísticas</h1>
          <p className="text-slate-600">
            Acompanhe suas economias e tendências
          </p>
        </div>

        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {p === '7d' && '7 dias'}
              {p === '30d' && '30 dias'}
              {p === '90d' && '90 dias'}
              {p === '1y' && '1 ano'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-sky-100 rounded-lg">
              <Bell className="h-5 w-5 text-sky-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              +28%
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{statsData.totalAlerts}</p>
          <p className="text-sm text-slate-500">Alertas Recebidos</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              +45%
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            R$ {statsData.totalSavings.toLocaleString('pt-BR')}
          </p>
          <p className="text-sm text-slate-500">Economia Total</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{statsData.avgDiscount}%</p>
          <p className="text-sm text-slate-500">Desconto Médio</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MapPin className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{statsData.mostPopularDestination}</p>
          <p className="text-sm text-slate-500">Destino Mais Buscado</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alerts over time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Alertas por Mês</h3>

          <div className="flex items-end gap-2 h-48">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-sky-500 rounded-t-lg transition-all hover:bg-sky-600"
                  style={{ height: `${(data.alerts / maxAlerts) * 100}%` }}
                />
                <span className="text-xs text-slate-500">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings over time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Economia por Mês</h3>

          <div className="flex items-end gap-2 h-48">
            {monthlyData.map((data) => {
              const maxSavings = Math.max(...monthlyData.map((d) => d.savings));
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-green-500 rounded-t-lg transition-all hover:bg-green-600"
                    style={{ height: `${(data.savings / maxSavings) * 100}%` }}
                  />
                  <span className="text-xs text-slate-500">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top destinations and airlines */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top destinations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Destinos</h3>

          <div className="space-y-4">
            {topDestinations.map((dest, index) => (
              <div key={dest.code} className="flex items-center gap-4">
                <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded-full text-sm font-medium text-slate-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900">
                      {dest.name} ({dest.code})
                    </span>
                    <span className="text-sm text-slate-500">{dest.count} alertas</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full"
                      style={{
                        width: `${(dest.count / topDestinations[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top airlines */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Companhias</h3>

          <div className="space-y-4">
            {topAirlines.map((airline, index) => (
              <div key={airline.name} className="flex items-center gap-4">
                <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded-full text-sm font-medium text-slate-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900">{airline.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{airline.count} alertas</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        -{airline.avgDiscount}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${(airline.count / topAirlines[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Insights</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sky-100 text-sm mb-1">Melhor dia para comprar</p>
            <p className="text-xl font-bold">Terça-feira</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sky-100 text-sm mb-1">Antecedência ideal</p>
            <p className="text-xl font-bold">45-60 dias</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sky-100 text-sm mb-1">Horário com mais promoções</p>
            <p className="text-xl font-bold">10h - 14h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
