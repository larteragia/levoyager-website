'use client';

import { useState } from 'react';
import {
  DollarSign,
  Briefcase,
  FileText,
  Shield,
  Calendar,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Dados estaticos das dicas (em producao viria do Convex)
const categories = [
  { id: 'economia', name: 'Economia', icon: DollarSign, color: 'text-green-600 bg-green-100' },
  { id: 'bagagem', name: 'Bagagem', icon: Briefcase, color: 'text-blue-600 bg-blue-100' },
  { id: 'documentos', name: 'Documentos', icon: FileText, color: 'text-purple-600 bg-purple-100' },
  { id: 'seguranca', name: 'Seguranca', icon: Shield, color: 'text-red-600 bg-red-100' },
  { id: 'melhores-epocas', name: 'Melhores Epocas', icon: Calendar, color: 'text-orange-600 bg-orange-100' },
  { id: 'dicas-gerais', name: 'Dicas Gerais', icon: Lightbulb, color: 'text-yellow-600 bg-yellow-100' },
];

const tips = [
  {
    id: 1,
    category: 'economia',
    title: 'Use o modo anonimo para pesquisar',
    content: 'Sites de passagens podem rastrear suas buscas e aumentar precos. Use o modo anonimo do navegador ou limpe os cookies antes de comprar.',
  },
  {
    id: 2,
    category: 'economia',
    title: 'Compare precos em varios sites',
    content: 'Nunca compre na primeira pesquisa. Compare precos em agregadores como Google Flights, Skyscanner e Kayak, alem dos sites das proprias companhias.',
  },
  {
    id: 3,
    category: 'economia',
    title: 'Seja flexivel nas datas',
    content: 'Viajar em dias de semana (terca, quarta, quinta) costuma ser mais barato. Use a funcao de calendario flexivel dos buscadores.',
  },
  {
    id: 4,
    category: 'economia',
    title: 'Considere aeroportos alternativos',
    content: 'Voar para cidades proximas ao destino final pode ser muito mais barato. Por exemplo, voar para Newark em vez de JFK em Nova York.',
  },
  {
    id: 5,
    category: 'bagagem',
    title: 'Pese sua mala antes de ir',
    content: 'Evite surpresas no aeroporto pesando sua mala em casa. O excesso de bagagem pode custar caro - as vezes mais que a propria passagem.',
  },
  {
    id: 6,
    category: 'bagagem',
    title: 'Conheca as regras de cada companhia',
    content: 'Cada companhia tem regras diferentes para bagagem de mao e despachada. Verifique antes e evite pagar taxas extras.',
  },
  {
    id: 7,
    category: 'bagagem',
    title: 'Leve itens essenciais na mala de mao',
    content: 'Documentos, remedios, uma muda de roupa e carregadores devem ir na mala de mao. Malas despachadas podem atrasar ou se perder.',
  },
  {
    id: 8,
    category: 'documentos',
    title: 'Verifique a validade do passaporte',
    content: 'Muitos paises exigem passaporte com validade minima de 6 meses apos a data de entrada. Renove com antecedencia.',
  },
  {
    id: 9,
    category: 'documentos',
    title: 'Faca copias digitais dos documentos',
    content: 'Guarde copias do passaporte, visto, seguro viagem e reservas no email ou nuvem. Util em caso de perda ou roubo.',
  },
  {
    id: 10,
    category: 'documentos',
    title: 'Verifique se precisa de visto',
    content: 'Brasileiros precisam de visto para varios paises (EUA, Canada, Australia). Pesquise e aplique com antecedencia.',
  },
  {
    id: 11,
    category: 'seguranca',
    title: 'Contrate seguro viagem',
    content: 'Seguro viagem e obrigatorio em alguns destinos (Europa/Schengen) e sempre recomendado. Cobre emergencias medicas, cancelamentos e bagagem.',
  },
  {
    id: 12,
    category: 'seguranca',
    title: 'Informe seu banco sobre a viagem',
    content: 'Avise seu banco sobre a viagem internacional para evitar bloqueio do cartao. Configure alertas de transacoes.',
  },
  {
    id: 13,
    category: 'melhores-epocas',
    title: 'Evite alta temporada',
    content: 'Ferias escolares, feriados prolongados e eventos especiais encarecem as passagens. Viaje na baixa temporada quando possivel.',
  },
  {
    id: 14,
    category: 'melhores-epocas',
    title: 'Antecipe sua compra',
    content: 'Para voos internacionais, o ideal e comprar com 2-3 meses de antecedencia. Para nacionais, 3-6 semanas costuma ser suficiente.',
  },
  {
    id: 15,
    category: 'melhores-epocas',
    title: 'Fique de olho em promocoes',
    content: 'Companhias lancam promocoes em datas especificas como Black Friday, aniversarios e promocoes relampago. O Voyager te avisa!',
  },
  {
    id: 16,
    category: 'dicas-gerais',
    title: 'Chegue cedo ao aeroporto',
    content: 'Para voos internacionais, chegue 3 horas antes. Para nacionais, 2 horas. Imprevistos acontecem.',
  },
  {
    id: 17,
    category: 'dicas-gerais',
    title: 'Faca check-in online',
    content: 'O check-in online abre 24-48 horas antes do voo. Faca assim que possivel para escolher melhores assentos.',
  },
  {
    id: 18,
    category: 'dicas-gerais',
    title: 'Baixe o app da companhia',
    content: 'Apps das companhias oferecem boarding pass digital, atualizacoes de voo em tempo real e facilidade no embarque.',
  },
];

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const filteredTips = selectedCategory
    ? tips.filter((tip) => tip.category === selectedCategory)
    : tips;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Dicas de Viagem
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Aprenda a economizar, viajar com seguranca e aproveitar ao maximo suas viagens.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-sky-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredTips.map((tip) => {
          const category = categories.find((c) => c.id === tip.category);
          const isExpanded = expandedTip === tip.id;

          return (
            <div
              key={tip.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {category && (
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-900">{tip.title}</h3>
                    <span className="text-sm text-slate-500">{category?.name}</span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>
              {isExpanded && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600 leading-relaxed pl-16">{tip.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No results */}
      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Lightbulb className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Nenhuma dica encontrada
          </h3>
          <p className="text-slate-600">
            Selecione outra categoria para ver mais dicas.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center bg-sky-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Economize ainda mais com o Voyager
        </h2>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">
          Alem das dicas, nosso sistema monitora promocoes 24/7 e te avisa quando encontrar as melhores ofertas.
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
