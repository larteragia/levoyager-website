'use client';

import { useState } from 'react';
import {
  MapPin,
  Plane,
  DollarSign,
  Bell,
  Mail,
  MessageCircle,
  Send,
  Plus,
  X,
  Save,
  Loader2,
} from 'lucide-react';

const airportOptions = [
  { code: 'GRU', name: 'Guarulhos - São Paulo' },
  { code: 'GYN', name: 'Santa Genoveva - Goiânia' },
  { code: 'CGH', name: 'Congonhas - São Paulo' },
  { code: 'BSB', name: 'Brasília' },
  { code: 'GIG', name: 'Galeão - Rio de Janeiro' },
  { code: 'SDU', name: 'Santos Dumont - Rio de Janeiro' },
  { code: 'CNF', name: 'Confins - Belo Horizonte' },
  { code: 'SSA', name: 'Salvador' },
  { code: 'REC', name: 'Recife' },
  { code: 'FOR', name: 'Fortaleza' },
  { code: 'POA', name: 'Porto Alegre' },
  { code: 'CWB', name: 'Curitiba' },
];

const airlineOptions = [
  'LATAM',
  'GOL',
  'Azul',
  'TAP Portugal',
  'American Airlines',
  'United Airlines',
  'Delta',
  'Air France',
  'British Airways',
  'Iberia',
  'Emirates',
  'Qatar Airways',
];

export default function PreferencesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [preferences, setPreferences] = useState({
    origins: ['GRU', 'GYN'],
    destinations: ['MIA', 'ORL', 'NYC', 'LIS', 'PAR'],
    maxPrice: 5000,
    airlines: ['LATAM', 'GOL', 'Azul'],
    channels: ['email', 'telegram'],
    frequency: 'instant',
    telegramChatId: '',
  });

  const [newOrigin, setNewOrigin] = useState('');
  const [newDestination, setNewDestination] = useState('');

  const addOrigin = () => {
    if (newOrigin && !preferences.origins.includes(newOrigin)) {
      setPreferences({
        ...preferences,
        origins: [...preferences.origins, newOrigin],
      });
      setNewOrigin('');
    }
  };

  const removeOrigin = (code: string) => {
    setPreferences({
      ...preferences,
      origins: preferences.origins.filter((o) => o !== code),
    });
  };

  const addDestination = () => {
    if (newDestination && !preferences.destinations.includes(newDestination)) {
      setPreferences({
        ...preferences,
        destinations: [...preferences.destinations, newDestination.toUpperCase()],
      });
      setNewDestination('');
    }
  };

  const removeDestination = (code: string) => {
    setPreferences({
      ...preferences,
      destinations: preferences.destinations.filter((d) => d !== code),
    });
  };

  const toggleAirline = (airline: string) => {
    if (preferences.airlines.includes(airline)) {
      setPreferences({
        ...preferences,
        airlines: preferences.airlines.filter((a) => a !== airline),
      });
    } else {
      setPreferences({
        ...preferences,
        airlines: [...preferences.airlines, airline],
      });
    }
  };

  const toggleChannel = (channel: string) => {
    if (preferences.channels.includes(channel)) {
      if (preferences.channels.length > 1) {
        setPreferences({
          ...preferences,
          channels: preferences.channels.filter((c) => c !== channel),
        });
      }
    } else {
      setPreferences({
        ...preferences,
        channels: [...preferences.channels, channel],
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaved(false);

    try {
      // TODO: Salvar no Convex
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Preferências</h1>
          <p className="text-slate-600">
            Configure seus alertas personalizados
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Salvando...
            </>
          ) : saved ? (
            <>
              <Save className="h-5 w-5" />
              Salvo!
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Salvar Preferências
            </>
          )}
        </button>
      </div>

      {/* Origins */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-sky-100 rounded-lg">
            <MapPin className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Origens</h2>
            <p className="text-sm text-slate-500">Aeroportos de partida</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {preferences.origins.map((code) => {
            const airport = airportOptions.find((a) => a.code === code);
            return (
              <span
                key={code}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100 text-sky-700 rounded-lg text-sm font-medium"
              >
                {code} {airport && `- ${airport.name}`}
                <button
                  onClick={() => removeOrigin(code)}
                  className="hover:text-sky-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            );
          })}
        </div>

        <div className="flex gap-2">
          <select
            value={newOrigin}
            onChange={(e) => setNewOrigin(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Selecione um aeroporto</option>
            {airportOptions
              .filter((a) => !preferences.origins.includes(a.code))
              .map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.code} - {airport.name}
                </option>
              ))}
          </select>
          <button
            onClick={addOrigin}
            disabled={!newOrigin}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Plane className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Destinos</h2>
            <p className="text-sm text-slate-500">Códigos IATA (ex: MIA, LIS, NYC)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {preferences.destinations.map((code) => (
            <span
              key={code}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
            >
              {code}
              <button
                onClick={() => removeDestination(code)}
                className="hover:text-purple-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          {preferences.destinations.length === 0 && (
            <span className="text-sm text-slate-400">
              Todos os destinos (deixe vazio para receber tudo)
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value.toUpperCase())}
            placeholder="Digite o código IATA (ex: MIA)"
            maxLength={3}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addDestination}
            disabled={!newDestination || newDestination.length < 3}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Max Price */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Preço Máximo</h2>
            <p className="text-sm text-slate-500">Valor máximo por pessoa (ida e volta)</p>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="range"
            min="500"
            max="15000"
            step="500"
            value={preferences.maxPrice}
            onChange={(e) =>
              setPreferences({ ...preferences, maxPrice: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-sm text-slate-500">
            <span>R$ 500</span>
            <span className="text-lg font-bold text-green-600">
              R$ {preferences.maxPrice.toLocaleString('pt-BR')}
            </span>
            <span>R$ 15.000</span>
          </div>
        </div>
      </section>

      {/* Airlines */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Plane className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Companhias Aéreas</h2>
            <p className="text-sm text-slate-500">Selecione suas preferidas (ou todas)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {airlineOptions.map((airline) => (
            <button
              key={airline}
              onClick={() => toggleAirline(airline)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                preferences.airlines.includes(airline)
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {airline}
            </button>
          ))}
        </div>
      </section>

      {/* Notification Channels */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-100 rounded-lg">
            <Bell className="h-5 w-5 text-rose-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Canais de Notificação</h2>
            <p className="text-sm text-slate-500">Como deseja receber alertas</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <button
            onClick={() => toggleChannel('email')}
            className={`p-4 rounded-xl border-2 transition-all ${
              preferences.channels.includes('email')
                ? 'border-sky-500 bg-sky-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Mail className={`h-6 w-6 mx-auto mb-2 ${
              preferences.channels.includes('email') ? 'text-sky-600' : 'text-slate-400'
            }`} />
            <p className="font-medium text-slate-900">Email</p>
          </button>

          <button
            onClick={() => toggleChannel('telegram')}
            className={`p-4 rounded-xl border-2 transition-all ${
              preferences.channels.includes('telegram')
                ? 'border-sky-500 bg-sky-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Send className={`h-6 w-6 mx-auto mb-2 ${
              preferences.channels.includes('telegram') ? 'text-sky-600' : 'text-slate-400'
            }`} />
            <p className="font-medium text-slate-900">Telegram</p>
          </button>

          <button
            onClick={() => toggleChannel('whatsapp')}
            className={`p-4 rounded-xl border-2 transition-all ${
              preferences.channels.includes('whatsapp')
                ? 'border-sky-500 bg-sky-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <MessageCircle className={`h-6 w-6 mx-auto mb-2 ${
              preferences.channels.includes('whatsapp') ? 'text-sky-600' : 'text-slate-400'
            }`} />
            <p className="font-medium text-slate-900">WhatsApp</p>
          </button>
        </div>

        {preferences.channels.includes('telegram') && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Chat ID do Telegram
            </label>
            <input
              type="text"
              value={preferences.telegramChatId}
              onChange={(e) =>
                setPreferences({ ...preferences, telegramChatId: e.target.value })
              }
              placeholder="Ex: 123456789"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <p className="mt-2 text-xs text-slate-500">
              Inicie uma conversa com @LeVoyagerBot e use /start para obter seu Chat ID
            </p>
          </div>
        )}
      </section>

      {/* Notification Frequency */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Bell className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Frequência</h2>
            <p className="text-sm text-slate-500">Quando deseja receber alertas</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { value: 'instant', label: 'Instantâneo', desc: 'Assim que encontrar' },
            { value: 'daily', label: 'Diário', desc: 'Resumo às 9h' },
            { value: 'weekly', label: 'Semanal', desc: 'Resumo às segundas' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPreferences({ ...preferences, frequency: option.value })
              }
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                preferences.frequency === option.value
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className="font-medium text-slate-900">{option.label}</p>
              <p className="text-sm text-slate-500">{option.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
