import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Usuários
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    telegramChatId: v.optional(v.string()),
    isActive: v.boolean(),
    isEmailVerified: v.boolean(),
    emailVerificationToken: v.optional(v.string()),
    emailVerificationExpires: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_telegram", ["telegramChatId"])
    .index("by_verification_token", ["emailVerificationToken"]),

  // Preferências do usuário
  userPreferences: defineTable({
    userId: v.id("users"),
    preferredOrigins: v.array(v.string()),
    preferredDestinations: v.array(v.string()),
    maxPrice: v.number(),
    preferredAirlines: v.array(v.string()),
    notificationChannels: v.array(v.string()),
    notificationFrequency: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Promoções de voos
  promotions: defineTable({
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
    isActive: v.boolean(),
    expiresAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_origin", ["origin"])
    .index("by_destination", ["destination"])
    .index("by_airline", ["airline"])
    .index("by_discount", ["discountPercentage"])
    .index("by_price", ["priceTotal"])
    .index("by_created", ["createdAt"])
    .index("by_active", ["isActive"]),

  // Alertas enviados aos usuários
  userAlerts: defineTable({
    userId: v.id("users"),
    promotionId: v.id("promotions"),
    channel: v.string(),
    isRead: v.boolean(),
    readAt: v.optional(v.number()),
    sentAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_promotion", ["promotionId"])
    .index("by_user_unread", ["userId", "isRead"]),

  // Favoritos do usuário
  userFavorites: defineTable({
    userId: v.id("users"),
    promotionId: v.id("promotions"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_promotion", ["promotionId"])
    .index("by_user_promotion", ["userId", "promotionId"]),

  // Histórico de preços
  priceHistory: defineTable({
    origin: v.string(),
    destination: v.string(),
    airline: v.string(),
    price: v.number(),
    source: v.string(),
    recordedAt: v.number(),
  })
    .index("by_route", ["origin", "destination"])
    .index("by_airline", ["airline"])
    .index("by_recorded", ["recordedAt"]),

  // Sessões de autenticação
  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_token", ["token"]),

  // Companhias aéreas
  airlines: defineTable({
    code: v.string(),
    name: v.string(),
    logoUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  }).index("by_code", ["code"]),

  // Dicas de viagem
  tips: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_published", ["isPublished"]),
});
