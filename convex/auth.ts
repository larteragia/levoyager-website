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

// Solicitar recuperação de senha
export const forgotPassword = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    // Sempre retorna sucesso para não revelar se email existe
    if (!user) {
      return { success: true, message: "Se o email existir, você receberá um link de recuperação." };
    }

    // Gerar token de reset
    const resetToken = crypto.randomUUID();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hora

    // Criar sessão de reset (reutilizando a tabela sessions com token especial)
    await ctx.db.insert("sessions", {
      userId: user._id,
      token: `reset_${resetToken}`,
      expiresAt,
      createdAt: Date.now(),
    });

    // Em produção, aqui enviaria o email com o link de reset
    // Por enquanto, apenas retorna sucesso
    return {
      success: true,
      message: "Se o email existir, você receberá um link de recuperação.",
      // Em dev, retorna o token para facilitar testes
      resetToken: process.env.NODE_ENV === "development" ? resetToken : undefined,
    };
  },
});

// Resetar senha com token
export const resetPassword = mutation({
  args: {
    resetToken: v.string(),
    newPasswordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", `reset_${args.resetToken}`))
      .first();

    if (!session) {
      throw new Error("Token inválido ou expirado");
    }

    if (session.expiresAt < Date.now()) {
      // Deletar sessão expirada
      await ctx.db.delete(session._id);
      throw new Error("Token inválido ou expirado");
    }

    // Atualizar senha do usuário
    await ctx.db.patch(session.userId, {
      passwordHash: args.newPasswordHash,
      updatedAt: Date.now(),
    });

    // Deletar token de reset usado
    await ctx.db.delete(session._id);

    // Invalidar todas as outras sessões do usuário (segurança)
    const userSessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", session.userId))
      .collect();

    for (const s of userSessions) {
      await ctx.db.delete(s._id);
    }

    return { success: true };
  },
});

// Verificar se token de sessão é válido
export const validateSession = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.token) {
      return { valid: false };
    }

    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) {
      return { valid: false };
    }

    if (session.expiresAt < Date.now()) {
      return { valid: false };
    }

    return { valid: true, userId: session.userId };
  },
});

// Obter usuário com preferências
export const getUserWithPreferences = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    const user = await ctx.db.get(session.userId);
    if (!user) {
      return null;
    }

    const preferences = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    return {
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        telegramChatId: user.telegramChatId,
        isEmailVerified: user.isEmailVerified,
      },
      preferences: preferences || null,
    };
  },
});
