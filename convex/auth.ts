import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Registrar novo usuário
export const register = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    fullName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verificar se email já existe
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email já cadastrado");
    }

    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      fullName: args.fullName,
      isActive: true,
      isEmailVerified: false,
      createdAt: now,
      updatedAt: now,
    });

    // Criar preferências padrão
    await ctx.db.insert("userPreferences", {
      userId,
      preferredOrigins: ["GRU", "GYN"],
      preferredDestinations: [],
      maxPrice: 5000,
      preferredAirlines: [],
      notificationChannels: ["email"],
      notificationFrequency: "daily",
      createdAt: now,
      updatedAt: now,
    });

    return userId;
  },
});

// Login
export const login = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    if (user.passwordHash !== args.passwordHash) {
      throw new Error("Credenciais inválidas");
    }

    if (!user.isActive) {
      throw new Error("Conta desativada");
    }

    // Criar sessão
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 dias

    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      expiresAt,
      createdAt: Date.now(),
    });

    return { token, userId: user._id };
  },
});

// Logout
export const logout = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }

    return { success: true };
  },
});

// Obter usuário por token
export const getUserByToken = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) {
      return null;
    }

    if (session.expiresAt < Date.now()) {
      return null;
    }

    const user = await ctx.db.get(session.userId);
    if (!user) {
      return null;
    }

    return {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      telegramChatId: user.telegramChatId,
      isEmailVerified: user.isEmailVerified,
    };
  },
});

// Atualizar perfil
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    telegramChatId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;

    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Alterar senha
export const changePassword = mutation({
  args: {
    userId: v.id("users"),
    currentPasswordHash: v.string(),
    newPasswordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.passwordHash !== args.currentPasswordHash) {
      throw new Error("Senha atual incorreta");
    }

    await ctx.db.patch(args.userId, {
      passwordHash: args.newPasswordHash,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
