import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Listar alertas do usuário
export const listByUser = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
    unreadOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    let alertsQuery;
    if (args.unreadOnly) {
      alertsQuery = ctx.db
        .query("userAlerts")
        .withIndex("by_user_unread", (q) =>
          q.eq("userId", args.userId).eq("isRead", false)
        );
    } else {
      alertsQuery = ctx.db
        .query("userAlerts")
        .withIndex("by_user", (q) => q.eq("userId", args.userId));
    }

    const alerts = await alertsQuery.order("desc").take(limit);

    // Buscar detalhes das promoções
    const alertsWithPromotions = await Promise.all(
      alerts.map(async (alert) => {
        const promotion = await ctx.db.get(alert.promotionId);
        return {
          ...alert,
          promotion,
        };
      })
    );

    return alertsWithPromotions;
  },
});

// Contar alertas não lidos
export const countUnread = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const unreadAlerts = await ctx.db
      .query("userAlerts")
      .withIndex("by_user_unread", (q) =>
        q.eq("userId", args.userId).eq("isRead", false)
      )
      .collect();

    return unreadAlerts.length;
  },
});

// Marcar alerta como lido
export const markAsRead = mutation({
  args: {
    alertId: v.id("userAlerts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.alertId, {
      isRead: true,
      readAt: Date.now(),
    });

    return { success: true };
  },
});

// Marcar todos como lidos
export const markAllAsRead = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const unreadAlerts = await ctx.db
      .query("userAlerts")
      .withIndex("by_user_unread", (q) =>
        q.eq("userId", args.userId).eq("isRead", false)
      )
      .collect();

    const now = Date.now();
    await Promise.all(
      unreadAlerts.map((alert) =>
        ctx.db.patch(alert._id, {
          isRead: true,
          readAt: now,
        })
      )
    );

    return { count: unreadAlerts.length };
  },
});

// Criar alerta (usado pelo sistema de notificações)
export const create = mutation({
  args: {
    userId: v.id("users"),
    promotionId: v.id("promotions"),
    channel: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const alertId = await ctx.db.insert("userAlerts", {
      userId: args.userId,
      promotionId: args.promotionId,
      channel: args.channel,
      isRead: false,
      sentAt: now,
      createdAt: now,
    });

    return alertId;
  },
});

// Estatísticas de alertas do usuário
export const getStats = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const allAlerts = await ctx.db
      .query("userAlerts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const totalAlerts = allAlerts.length;
    const unreadAlerts = allAlerts.filter((a) => !a.isRead).length;
    const readAlerts = totalAlerts - unreadAlerts;

    // Alertas por canal
    const channelCounts: Record<string, number> = {};
    allAlerts.forEach((a) => {
      channelCounts[a.channel] = (channelCounts[a.channel] || 0) + 1;
    });

    // Alertas por dia (últimos 30 dias)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentAlerts = allAlerts.filter((a) => a.createdAt >= thirtyDaysAgo);

    const dailyCounts: Record<string, number> = {};
    recentAlerts.forEach((a) => {
      const date = new Date(a.createdAt).toISOString().split("T")[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const dailyAlerts = Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalAlerts,
      unreadAlerts,
      readAlerts,
      channelCounts,
      dailyAlerts,
    };
  },
});
