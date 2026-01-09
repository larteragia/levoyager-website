import { NextRequest, NextResponse } from 'next/server';

// Chave de API para autenticar requisicoes do Voyager
const VOYAGER_API_KEY = process.env.VOYAGER_API_KEY;

interface PromotionPayload {
  origin: string;
  destination: string;
  airline: string;
  departureDate?: string;
  returnDate?: string;
  priceTotal: number;
  pricePerPerson?: number;
  originalPrice?: number;
  discountPercentage: number;
  currency?: string;
  isRoundTrip?: boolean;
  source: string;
  sourceUrl: string;
  title: string;
  description?: string;
  imageUrl?: string;
  expiresAt?: number;
}

// POST /api/voyager/sync - Receber promocoes do sistema Voyager Python
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticacao
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== VOYAGER_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const promotions: PromotionPayload[] = Array.isArray(body) ? body : [body];

    if (promotions.length === 0) {
      return NextResponse.json(
        { error: 'No promotions provided' },
        { status: 400 }
      );
    }

    // Validar cada promocao
    const validPromotions: PromotionPayload[] = [];
    const errors: string[] = [];

    for (let i = 0; i < promotions.length; i++) {
      const promo = promotions[i];

      if (!promo.origin || !promo.destination || !promo.airline) {
        errors.push(`Promotion ${i}: Missing required fields (origin, destination, airline)`);
        continue;
      }

      if (typeof promo.priceTotal !== 'number' || promo.priceTotal <= 0) {
        errors.push(`Promotion ${i}: Invalid priceTotal`);
        continue;
      }

      if (typeof promo.discountPercentage !== 'number') {
        errors.push(`Promotion ${i}: Invalid discountPercentage`);
        continue;
      }

      if (!promo.source || !promo.sourceUrl || !promo.title) {
        errors.push(`Promotion ${i}: Missing source, sourceUrl or title`);
        continue;
      }

      validPromotions.push({
        ...promo,
        currency: promo.currency || 'BRL',
        isRoundTrip: promo.isRoundTrip ?? true,
      });
    }

    // Aqui em producao, enviariamos para o Convex via HTTP action
    // Por enquanto, apenas logamos e retornamos sucesso
    console.log(`[Voyager Sync] Received ${validPromotions.length} valid promotions`);

    // Em producao, chamariamos o Convex:
    // const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    // await fetch(`${convexUrl}/api/mutation`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     path: 'promotions:createMany',
    //     args: { promotions: validPromotions }
    //   })
    // });

    return NextResponse.json({
      success: true,
      received: promotions.length,
      processed: validPromotions.length,
      errors: errors.length > 0 ? errors : undefined,
      message: `Synced ${validPromotions.length} promotions successfully`,
    });
  } catch (error) {
    console.error('[Voyager Sync] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/voyager/sync - Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'voyager-sync',
    timestamp: new Date().toISOString(),
  });
}
