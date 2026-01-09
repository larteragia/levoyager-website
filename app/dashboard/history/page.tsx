'use client';

import { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Plane,
  Calendar,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Dados de exemplo - histórico de promoções
const historyData = [
  {
    id: 1,
    origin: 'GRU',
    destination: 'MIA',
    airline: 'LATAM',
    price: 2450,
    discount: 45,
    date: '2025-01-08',
    source: 'Melhores Destinos',
    sourceUrl: 'https://example.com',
    status: 'active',
  },
  {
    id: 2,
    origin: 'GRU',
    destination: 'LIS',
    airline: 'TAP',
    price: 3200,
    discount: 38,
    date: '2025-01-07',
    source: 'Passagens Promo',
    sourceUrl: 'https://example.com',
    status: 'expired',
  },
  {
    id: 3,
    origin: 'GYN',
    destination: 'GRU',
    airline: 'GOL',
    price: 320,
    discount: 52,
    date: '2025-01-06',
    source: 'Decolar',
    sourceUrl: 'https://example.com',
    status: 'active',
  },
  {
    id: 4,
    origin: 'GRU',
    destination: 'CDG',
    airline: 'Air France',
    price: 4100,
    discount: 35,
    date: '2025-01-05',
    source: 'Kayak',
    sourceUrl: 'https://example.com',
    status: 'expired',
  },
  {
    id: 5,
    origin: 'GRU',
    destination: 'FCO',
    airline: 'Alitalia',
    price: 3800,
    discount: 42,
    date: '2025-01-04',
    source: 'Skyscanner',
    sourceUrl: 'https://example.com',
    status: 'expired',
  },
];

export default function HistoryPage() {
  const [history] = useState(historyData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredHistory = history.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.origin.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query) ||
        item.airline.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = ['Data', 'Origem', 'Destino', 'Companhia', 'Preço', 'Desconto', 'Status'];
    const rows = filteredHistory.map((item) => [
      item.date,
      item.origin,
      item.destination,
      item.airline,
      `R$ ${item.price}`,
      `${item.discount}%`,
      item.status === 'active' ? 'Ativa' : 'Expirada',
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voyager-historico-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Histórico</h1>
          <p className="text-slate-600">
            Todas as promoções que você recebeu
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar no histórico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'expired'] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {status === 'all' && 'Todas'}
              {status === 'active' && 'Ativas'}
              {status === 'expired' && 'Expiradas'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Rota
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Companhia
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Desconto
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Nenhum registro encontrado</p>
                  </td>
                </tr>
              ) : (
                paginatedHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-100 rounded-lg">
                          <Plane className="h-4 w-4 text-sky-600" />
                        </div>
                        <span className="font-medium text-slate-900">
                          {item.origin} → {item.destination}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.airline}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      R$ {item.price.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        -{item.discount}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.status === 'active' ? 'Ativa' : 'Expirada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-sm font-medium ${
                          item.status === 'active'
                            ? 'text-sky-600 hover:text-sky-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {item.status === 'active' ? 'Ver' : 'Expirado'}
                        {item.status === 'active' && <ExternalLink className="h-3 w-3" />}
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredHistory.length)} de{' '}
              {filteredHistory.length} resultados
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    page === currentPage
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
