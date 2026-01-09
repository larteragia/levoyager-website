'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  TrendingUp,
  Plane,
  ArrowUpRight,
  Heart,
  Clock,
  MapPin,
  Calendar,
} from 'lucide-react';

// Dados de exemplo
const recentAlerts = [
  {
    id: 1,
    origin: 'GRU',
    destination: 'MIA',
    airline: 'LATAM',
    price: 2450,
    discount: 45,
    date: '2025-03-15',
    isRoundTrip: true,
  },
  {
    id: 2,
    origin: 'GRU',
    destination: 'LIS',
    airline: 'TAP',
    price: 3200,
    discount: 38,
    date: '2025-04-10',
    isRoundTrip: true,
  },
  {
    id: 3,
    origin: 'GYN',
    destination: 'GRU',
    airline: 'GOL',
    price: 320,
    discount: 52,
    date: '2025-02-20',
    isRoundTrip: true,
  },
];

const stats = [
  { name: 'Alertas Recebidos', value: 47, icon: Bell, change: '+12%', color: 'sky' },
  { name: 'Economia Estimada', value: 'R$ 8.450', icon: TrendingUp, change: '+23%', color: 'green' },
  { name: 'Rotas Monitoradas', value: 5, icon: MapPin, change: '0', color: 'purple' },
  { name: 'Favoritos', value: 12, icon: Heart, change: '+3', color: 'rose' },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting}, Viajante!
        </h1>
        <p className="text-slate-600">
          Confira suas últimas promoções e estatísticas.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-slate-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Recent alerts */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Últimas Promoções
          </h2>
          <Link
            href="/dashboard/alerts"
            className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
          >
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-100 rounded-xl">
                    <Plane className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">
                        {alert.origin}
                      </span>
                      <span className="text-slate-400">→</span>
                      <span className="font-semibold text-slate-900">
                        {alert.destination}
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        -{alert.discount}%
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>{alert.airline}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(alert.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>{alert.isRoundTrip ? 'Ida e volta' : 'Só ida'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">
                    R$ {alert.price.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-slate-500">por pessoa</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/preferences"
          className="group p-5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl text-white hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-5 w-5" />
            <span className="font-semibold">Configurar Rotas</span>
          </div>
          <p className="text-sky-100 text-sm">
            Adicione origens e destinos para receber alertas personalizados.
          </p>
        </Link>

        <Link
          href="/dashboard/alerts"
          className="group p-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-5 w-5" />
            <span className="font-semibold">Gerenciar Alertas</span>
          </div>
          <p className="text-purple-100 text-sm">
            Configure como e quando deseja receber notificações.
          </p>
        </Link>

        <Link
          href="/dashboard/statistics"
          className="group p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Ver Estatísticas</span>
          </div>
          <p className="text-emerald-100 text-sm">
            Acompanhe tendências de preços e sua economia acumulada.
          </p>
        </Link>
      </div>
    </div>
  );
}
