'use client';

import { useState } from 'react';
import { Heart, Plane, Calendar, ExternalLink, Trash2, Search } from 'lucide-react';

// Dados de exemplo
const favoritesData = [
  {
    id: 1,
    origin: 'GRU',
    destination: 'LIS',
    airline: 'TAP Portugal',
    price: 3200,
    discount: 38,
    departureDate: '2025-04-10',
    returnDate: '2025-04-20',
    source: 'Passagens Promo',
    sourceUrl: 'https://example.com',
    addedAt: '2025-01-07T15:45:00',
  },
  {
    id: 2,
    origin: 'GRU',
    destination: 'CDG',
    airline: 'Air France',
    price: 4100,
    discount: 35,
    departureDate: '2025-05-15',
    returnDate: '2025-05-25',
    source: 'Kayak',
    sourceUrl: 'https://example.com',
    addedAt: '2025-01-05T10:30:00',
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favoritesData);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = favorites.filter((fav) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      fav.origin.toLowerCase().includes(query) ||
      fav.destination.toLowerCase().includes(query) ||
      fav.airline.toLowerCase().includes(query)
    );
  });

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Favoritos</h1>
        <p className="text-slate-600">
          Promoções que você salvou para ver depois
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar nos favoritos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Favorites grid */}
      {filteredFavorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchQuery ? 'Nenhum favorito encontrado' : 'Nenhum favorito ainda'}
          </h3>
          <p className="text-slate-500">
            {searchQuery
              ? 'Tente uma busca diferente'
              : 'Clique no coração nas promoções para salvar aqui'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFavorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <Plane className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {fav.origin} → {fav.destination}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{fav.airline}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    -{fav.discount}%
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(fav.departureDate).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                    })}{' '}
                    -{' '}
                    {new Date(fav.returnDate).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      R$ {fav.price.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-slate-500">por pessoa</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={fav.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors"
                  >
                    Ver Oferta
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                  Adicionado em{' '}
                  {new Date(fav.addedAt).toLocaleDateString('pt-BR')} via {fav.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
