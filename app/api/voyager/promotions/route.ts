import { NextRequest, NextResponse } from 'next/server';

// GET /api/voyager/promotions - Buscar promocoes do Voyager Python
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const airline = searchParams.get('airline');
    const minDiscount = searchParams.get('minDiscount');
    const maxPrice = searchParams.get('maxPrice');
    const limit = searchParams.get('limit') || '20';

    // URL da API Voyager Python
    const voyagerApiUrl = process.env.VOYAGER_API_URL || 'http://localhost:5000';

    // Construir query params
    const params = new URLSearchParams();
    if (origin) params.set('origin', origin);
    if (destination) params.set('destination', destination);
    if (airline) params.set('airline', airline);
    if (minDiscount) params.set('min_discount', minDiscount);
    if (maxPrice) params.set('max_price', maxPrice);
    params.set('limit', limit);

    // Em producao, chamariamos a API Python:
    // const response = await fetch(`${voyagerApiUrl}/api/promotions?${params}`);
    // const data = await response.json();

    // Por enquanto, retornamos dados de exemplo
    const mockPromotions = [
      {
        id: '1',
        origin: 'GRU',
        destination: 'MIA',
        airline: 'LATAM',
        priceTotal: 2450,
        originalPrice: 4500,
        discountPercentage: 45,
        currency: 'BRL',
        isRoundTrip: true,
        source: 'Melhores Destinos',
        sourceUrl: 'https://melhoresdestinos.com.br/promocao-miami',
        title: 'Voos para Miami com 45% de desconto',
        createdAt: Date.now(),
        isActive: true,
      },
      {
        id: '2',
        origin: 'GRU',
        destination: 'LIS',
        airline: 'TAP',
        priceTotal: 2890,
        originalPrice: 5200,
        discountPercentage: 44,
        currency: 'BRL',
        isRoundTrip: true,
        source: 'Passagens Imperdíveis',
        sourceUrl: 'https://passagensimperdiveis.com.br/lisboa',
        title: 'Lisboa ida e volta por R$ 2.890',
        createdAt: Date.now(),
        isActive: true,
      },
      {
        id: '3',
        origin: 'GYN',
        destination: 'GRU',
        airline: 'GOL',
        priceTotal: 320,
        originalPrice: 580,
        discountPercentage: 45,
        currency: 'BRL',
        isRoundTrip: false,
        source: 'GOL',
        sourceUrl: 'https://voegol.com.br',
        title: 'Goiânia para São Paulo por R$ 320',
        createdAt: Date.now(),
        isActive: true,
      },
    ];

    // Filtrar mock data
    let filteredPromotions = mockPromotions;

    if (origin) {
      filteredPromotions = filteredPromotions.filter((p) => p.origin === origin);
    }
    if (destination) {
      filteredPromotions = filteredPromotions.filter((p) => p.destination === destination);
    }
    if (airline) {
      filteredPromotions = filteredPromotions.filter((p) =>
        p.airline.toLowerCase().includes(airline.toLowerCase())
      );
    }
    if (minDiscount) {
      filteredPromotions = filteredPromotions.filter(
        (p) => p.discountPercentage >= parseInt(minDiscount)
      );
    }
    if (maxPrice) {
      filteredPromotions = filteredPromotions.filter(
        (p) => p.priceTotal <= parseInt(maxPrice)
      );
    }

    return NextResponse.json({
      promotions: filteredPromotions.slice(0, parseInt(limit)),
      total: filteredPromotions.length,
      source: 'mock', // Em producao seria 'voyager'
    });
  } catch (error) {
    console.error('[Voyager Promotions] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}
