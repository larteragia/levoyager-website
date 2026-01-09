'use client';

import { useState } from 'react';
import {
  Bell,
  Check,
  Filter,
  Search,
  Plane,
  Calendar,
  ExternalLink,
  Heart,
  CheckCheck,
} from 'lucide-react';

// Dados de exemplo
const alertsData = [
  {
    id: 1,
    origin: 'GRU',
    originCity: 'São Paulo',
    destination: 'MIA',
    destinationCity: 'Miami',
    airline: 'LATAM',
    price: 2450,
    originalPrice: 4450,
    discount: 45,
    departureDate: '2025-03-15',
    returnDate: '2025-03-25',
    isRoundTrip: true,
    source: 'Melhores Destinos',
    sourceUrl: 'https://example.com/promo/1',
    isRead: false,
    isFavorite: false,
    createdAt: '2025-01-08T10:30:00',
  },
  {
    id: 2,
    origin: 'GRU',
    originCity: 'São Paulo',
    destination: 'LIS',
    destinationCity: 'Lisboa',
    airline: 'TAP Portugal',
    price: 3200,
    originalPrice: 5200,
    discount: 38,
    departureDate: '2025-04-10',
    returnDate: '2025-04-20',
    isRoundTrip: true,
    source: 'Passagens Promo',
    sourceUrl: 'https://example.com/promo/2',
    isRead: true,
    isFavorite: true,
    createdAt: '2025-01-07T15:45:00',
  },
  {
    id: 3,
    origin: 'GYN',
    originCity: 'Goiânia',
    destination: 'GRU',
    destinationCity: 'São Paulo',
    airline: 'GOL',
    price: 320,
    originalPrice: 670,
    discount: 52,
    departureDate: '2025-02-20',
    returnDate: '2025-02-22',
    isRoundTrip: true,
    source: 'Decolar',
    sourceUrl: 'https://example.com/promo/3',
    isRead: true,
    isFavorite: false,
    createdAt: '2025-01-06T08:20:00',
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState<'all' | 'unread' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'unread' && alert.isRead) return false;
    if (filter === 'favorites' && !alert.isFavorite) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        alert.origin.toLowerCase().includes(query) ||
        alert.destination.toLowerCase().includes(query) ||
        alert.originCity.toLowerCase().includes(query) ||
        alert.destinationCity.toLowerCase().includes(query) ||
        alert.airline.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, isRead: true })));
  };

  const toggleFavorite = (id: number) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, isFavorite: !a.isFavorite } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alertas</h1>
          <p className="text-slate-600">
            {unreadCount > 0
              ? `Você tem ${unreadCount} alerta${unreadCount > 1 ? 's' : ''} não lido${unreadCount > 1 ? 's' : ''}`
              : 'Todos os alertas foram lidos'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-700 rounded-lg font-medium hover:bg-sky-100 transition-colors"
          >
            <CheckCheck className="h-4 w-4" />
            Marcar todos como lidos
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por destino, cidade ou companhia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'unread', 'favorites'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {f === 'all' && 'Todos'}
              {f === 'unread' && 'Não lidos'}
              {f === 'favorites' && 'Favoritos'}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts list */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum alerta encontrado
            </h3>
            <p className="text-slate-500">
              {searchQuery
                ? 'Tente uma busca diferente'
                : 'Novos alertas aparecerão aqui'}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl border overflow-hidden transition-all hover:shadow-md ${
                !alert.isRead ? 'border-sky-200 bg-sky-50/30' : 'border-slate-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${!alert.isRead ? 'bg-sky-100' : 'bg-slate-100'}`}>
                      <Plane className={`h-6 w-6 ${!alert.isRead ? 'text-sky-600' : 'text-slate-500'}`} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-lg">
                            {alert.origin}
                          </span>
                          <span className="text-slate-400">→</span>
                          <span className="font-bold text-slate-900 text-lg">
                            {alert.destination}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                          -{alert.discount}%
                        </span>
                        {!alert.isRead && (
                          <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">
                            Novo
                          </span>
                        )}
                      </div>

                      <p className="text-slate-500">
                        {alert.originCity} → {alert.destinationCity}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="font-medium text-slate-700">{alert.airline}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(alert.departureDate).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                          })}
                          {alert.isRoundTrip && (
                            <>
                              {' - '}
                              {new Date(alert.returnDate).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                              })}
                            </>
                          )}
                        </span>
                        <span>{alert.isRoundTrip ? 'Ida e volta' : 'Só ida'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-sm text-slate-400 line-through">
                      R$ {alert.originalPrice.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      R$ {alert.price.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-slate-500">por pessoa</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(alert.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        alert.isFavorite
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-slate-100 text-slate-400 hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${alert.isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    {!alert.isRead && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:text-sky-600 transition-colors"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">via {alert.source}</span>
                    <a
                      href={alert.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors"
                    >
                      Ver Oferta
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
