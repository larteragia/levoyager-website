import { NextRequest, NextResponse } from 'next/server';

// Tipos para as ofertas
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

interface FlightResponse {
  offers: FlightOffer[];
  total: number;
  type: 'domestic' | 'international';
  lastUpdated: string;
}

// GET /api/voyager/flights - Buscar voos reais do Docker API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'domestic';
    const origin = searchParams.get('origin');
    const limit = searchParams.get('limit') || '50';

    // URL da API LeVoyager Docker (Flask na porta 5000)
    const voyagerApiUrl = process.env.VOYAGER_API_URL || 'http://localhost:5000';

    // Construir query params para API do Docker
    const params = new URLSearchParams();
    params.set('type', type);
    if (origin) params.set('origin', origin);
    params.set('limit', limit);

    // Chamar API real do Docker
    const response = await fetch(
      `${voyagerApiUrl}/api/offers/by-route?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache por 5 minutos
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error(`[Voyager Flights] API error: ${response.status}`);

      // Se API do Docker falhar, retornar resposta vazia (NAO mock data)
      return NextResponse.json({
        offers: [],
        total: 0,
        type: type as 'domestic' | 'international',
        lastUpdated: new Date().toISOString(),
        error: 'API do Docker indisponivel',
      });
    }

    const data = await response.json();

    // Mapear resposta do Flask para o formato esperado
    const offers: FlightOffer[] = (data.offers || []).map((offer: any) => ({
      id: offer.id,
      origin: offer.origin,
      destination: offer.destination,
      destinationCity: offer.destination_city || offer.destinationCity,
      airline: offer.airline || 'Varias companhias',
      priceTotal: offer.price_total || offer.priceTotal,
      discountPercentage: offer.discount_percentage || offer.discountPercentage || 0,
      discountClassification: offer.discount_classification || offer.discountClassification || 'NORMAL',
      sourceUrl: offer.source_url || offer.sourceUrl || '',
      createdAt: offer.created_at || offer.createdAt || new Date().toISOString(),
    }));

    // Ordenar por desconto (maior primeiro), depois por preco
    offers.sort((a, b) => {
      if (b.discountPercentage !== a.discountPercentage) {
        return b.discountPercentage - a.discountPercentage;
      }
      return a.priceTotal - b.priceTotal;
    });

    const result: FlightResponse = {
      offers,
      total: offers.length,
      type: type as 'domestic' | 'international',
      lastUpdated: data.lastUpdated || new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Voyager Flights] Error:', error);
    return NextResponse.json(
      {
        offers: [],
        total: 0,
        type: 'domestic',
        lastUpdated: new Date().toISOString(),
        error: 'Erro ao buscar voos',
      },
      { status: 500 }
    );
  }
}
