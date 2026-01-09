import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obter preferências do usuário
export const getByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const preferences = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    return preferences;
  },
});

// Atualizar preferências
export const update = mutation({
  args: {
    userId: v.id("users"),
    preferredOrigins: v.optional(v.array(v.string())),
    preferredDestinations: v.optional(v.array(v.string())),
    maxPrice: v.optional(v.number()),
    preferredAirlines: v.optional(v.array(v.string())),
    notificationChannels: v.optional(v.array(v.string())),
    notificationFrequency: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;

    const existing = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!existing) {
      throw new Error("Preferências não encontradas");
    }

    await ctx.db.patch(existing._id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Adicionar origem preferida
export const addOrigin = mutation({
  args: {
    userId: v.id("users"),
    origin: v.string(),
  },
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      throw new Error("Preferências não encontradas");
    }

    if (!prefs.preferredOrigins.includes(args.origin)) {
      await ctx.db.patch(prefs._id, {
        preferredOrigins: [...prefs.preferredOrigins, args.origin],
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Remover origem preferida
export const removeOrigin = mutation({
  args: {
    userId: v.id("users"),
    origin: v.string(),
  },
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      throw new Error("Preferências não encontradas");
    }

    await ctx.db.patch(prefs._id, {
      preferredOrigins: prefs.preferredOrigins.filter((o) => o !== args.origin),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Adicionar destino preferido
export const addDestination = mutation({
  args: {
    userId: v.id("users"),
    destination: v.string(),
  },
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      throw new Error("Preferências não encontradas");
    }

    if (!prefs.preferredDestinations.includes(args.destination)) {
      await ctx.db.patch(prefs._id, {
        preferredDestinations: [...prefs.preferredDestinations, args.destination],
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Remover destino preferido
export const removeDestination = mutation({
  args: {
    userId: v.id("users"),
    destination: v.string(),
  },
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      throw new Error("Preferências não encontradas");
    }

    await ctx.db.patch(prefs._id, {
      preferredDestinations: prefs.preferredDestinations.filter(
        (d) => d !== args.destination
      ),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Adicionar airline preferida
export const addAirline = mutation({
  args: {
    userId: v.id("users"),
    airline: v.string(),
  },
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      throw new Error("Preferências não encontradas");
    }

    if (!prefs.preferredAirlines.includes(args.airline)) {
      await ctx.db.patch(prefs._id, {
        preferredAirlines: [...prefs.preferredAirlines, args.airline],
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Remover airline preferida
export const removeAirline = mutation({
  args: {
    userId: v.id("users"),
    airline: v.string(),
  },
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      throw new Error("Preferências não encontradas");
    }

    await ctx.db.patch(prefs._id, {
      preferredAirlines: prefs.preferredAirlines.filter(
        (a) => a !== args.airline
      ),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
