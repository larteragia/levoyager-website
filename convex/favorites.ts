import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Listar favoritos do usuário
export const listByUser = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const favorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);

    // Buscar detalhes das promoções
    const favoritesWithPromotions = await Promise.all(
      favorites.map(async (fav) => {
        const promotion = await ctx.db.get(fav.promotionId);
        return {
          ...fav,
          promotion,
        };
      })
    );

    return favoritesWithPromotions;
  },
});

// Verificar se promoção é favorita
export const isFavorite = query({
  args: {
    userId: v.id("users"),
    promotionId: v.id("promotions"),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_promotion", (q) =>
        q.eq("userId", args.userId).eq("promotionId", args.promotionId)
      )
      .first();

    return favorite !== null;
  },
});

// Adicionar favorito
export const add = mutation({
  args: {
    userId: v.id("users"),
    promotionId: v.id("promotions"),
  },
  handler: async (ctx, args) => {
    // Verificar se já existe
    const existing = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_promotion", (q) =>
        q.eq("userId", args.userId).eq("promotionId", args.promotionId)
      )
      .first();

    if (existing) {
      return { success: true, alreadyExists: true };
    }

    await ctx.db.insert("userFavorites", {
      userId: args.userId,
      promotionId: args.promotionId,
      createdAt: Date.now(),
    });

    return { success: true, alreadyExists: false };
  },
});

// Remover favorito
export const remove = mutation({
  args: {
    userId: v.id("users"),
    promotionId: v.id("promotions"),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_promotion", (q) =>
        q.eq("userId", args.userId).eq("promotionId", args.promotionId)
      )
      .first();

    if (favorite) {
      await ctx.db.delete(favorite._id);
    }

    return { success: true };
  },
});

// Toggle favorito
export const toggle = mutation({
  args: {
    userId: v.id("users"),
    promotionId: v.id("promotions"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_promotion", (q) =>
        q.eq("userId", args.userId).eq("promotionId", args.promotionId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { isFavorite: false };
    } else {
      await ctx.db.insert("userFavorites", {
        userId: args.userId,
        promotionId: args.promotionId,
        createdAt: Date.now(),
      });
      return { isFavorite: true };
    }
  },
});

// Contar favoritos do usuário
export const count = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const favorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return favorites.length;
  },
});
