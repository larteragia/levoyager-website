import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Listar promoções ativas
export const listActive = query({
  args: {
    limit: v.optional(v.number()),
    origin: v.optional(v.string()),
    destination: v.optional(v.string()),
    maxPrice: v.optional(v.number()),
    minDiscount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let promotionsQuery = ctx.db
      .query("promotions")
      .withIndex("by_active", (q) => q.eq("isActive", true));

    let promotions = await promotionsQuery.collect();

    // Filtrar por origem
    if (args.origin) {
      promotions = promotions.filter((p) => p.origin === args.origin);
    }

    // Filtrar por destino
    if (args.destination) {
      promotions = promotions.filter((p) => p.destination === args.destination);
    }

    // Filtrar por preço máximo
    if (args.maxPrice !== undefined) {
      const maxPrice = args.maxPrice;
      promotions = promotions.filter((p) => p.priceTotal <= maxPrice);
    }

    // Filtrar por desconto mínimo
    if (args.minDiscount !== undefined) {
      const minDiscount = args.minDiscount;
      promotions = promotions.filter(
        (p) => p.discountPercentage >= minDiscount
      );
    }

    // Ordenar por desconto (maior primeiro)
    promotions.sort((a, b) => b.discountPercentage - a.discountPercentage);

    // Limitar resultados
    if (args.limit) {
      promotions = promotions.slice(0, args.limit);
    }

    return promotions;
  },
});

// Obter promoção por ID
export const getById = query({
  args: {
    id: v.id("promotions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Listar promoções recentes
export const listRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    const promotions = await ctx.db
      .query("promotions")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("desc")
      .take(limit);

    return promotions;
  },
});

// Estatísticas de promoções
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const activePromotions = await ctx.db
      .query("promotions")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    const totalPromotions = activePromotions.length;

    if (totalPromotions === 0) {
      return {
        totalPromotions: 0,
        avgDiscount: 0,
        avgPrice: 0,
        topOrigins: [],
        topDestinations: [],
        topAirlines: [],
      };
    }

    const avgDiscount =
      activePromotions.reduce((sum, p) => sum + p.discountPercentage, 0) /
      totalPromotions;

    const avgPrice =
      activePromotions.reduce((sum, p) => sum + p.priceTotal, 0) /
      totalPromotions;

    // Contar origens
    const originCounts: Record<string, number> = {};
    activePromotions.forEach((p) => {
      originCounts[p.origin] = (originCounts[p.origin] || 0) + 1;
    });
    const topOrigins = Object.entries(originCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code, count]) => ({ code, count }));

    // Contar destinos
    const destCounts: Record<string, number> = {};
    activePromotions.forEach((p) => {
      destCounts[p.destination] = (destCounts[p.destination] || 0) + 1;
    });
    const topDestinations = Object.entries(destCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code, count]) => ({ code, count }));

    // Contar airlines
    const airlineCounts: Record<string, number> = {};
    activePromotions.forEach((p) => {
      airlineCounts[p.airline] = (airlineCounts[p.airline] || 0) + 1;
    });
    const topAirlines = Object.entries(airlineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return {
      totalPromotions,
      avgDiscount: Math.round(avgDiscount * 10) / 10,
      avgPrice: Math.round(avgPrice),
      topOrigins,
      topDestinations,
      topAirlines,
    };
  },
});

// Criar promoção (para integração com o scraper)
export const create = mutation({
  args: {
    origin: v.string(),
    destination: v.string(),
    airline: v.string(),
    departureDate: v.optional(v.string()),
    returnDate: v.optional(v.string()),
    priceTotal: v.number(),
    pricePerPerson: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    discountPercentage: v.number(),
    currency: v.string(),
    isRoundTrip: v.boolean(),
    source: v.string(),
    sourceUrl: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const promotionId = await ctx.db.insert("promotions", {
      ...args,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return promotionId;
  },
});

// Desativar promoção
export const deactivate = mutation({
  args: {
    id: v.id("promotions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Criar multiplas promocoes (batch - para integracao com LeVoyager)
export const createMany = mutation({
  args: {
    promotions: v.array(
      v.object({
        origin: v.string(),
        destination: v.string(),
        airline: v.string(),
        departureDate: v.optional(v.string()),
        returnDate: v.optional(v.string()),
        priceTotal: v.number(),
        pricePerPerson: v.optional(v.number()),
        originalPrice: v.optional(v.number()),
        discountPercentage: v.number(),
        currency: v.string(),
        isRoundTrip: v.boolean(),
        source: v.string(),
        sourceUrl: v.string(),
        title: v.string(),
        description: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        expiresAt: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const createdIds: string[] = [];

    for (const promo of args.promotions) {
      // Verificar se promocao similar ja existe (deduplicacao)
      const existing = await ctx.db
        .query("promotions")
        .withIndex("by_active", (q) => q.eq("isActive", true))
        .filter((q) =>
          q.and(
            q.eq(q.field("origin"), promo.origin),
            q.eq(q.field("destination"), promo.destination),
            q.eq(q.field("sourceUrl"), promo.sourceUrl)
          )
        )
        .first();

      if (existing) {
        // Atualizar preco se mudou
        if (existing.priceTotal !== promo.priceTotal) {
          await ctx.db.patch(existing._id, {
            priceTotal: promo.priceTotal,
            discountPercentage: promo.discountPercentage,
            updatedAt: now,
          });
        }
        continue;
      }

      // Criar nova promocao
      const id = await ctx.db.insert("promotions", {
        ...promo,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });

      createdIds.push(id);
    }

    return {
      created: createdIds.length,
      updated: args.promotions.length - createdIds.length,
      ids: createdIds,
    };
  },
});

// Buscar promocoes para notificacao (descontos altos)
export const getHighDiscountPromotions = query({
  args: {
    minDiscount: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const minDiscount = args.minDiscount ?? 40;
    const limit = args.limit ?? 10;

    const promotions = await ctx.db
      .query("promotions")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    return promotions
      .filter((p) => p.discountPercentage >= minDiscount)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, limit);
  },
});
