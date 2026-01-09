/* eslint-disable */
/**
 * Generated API types - will be replaced by `npx convex dev`
 * This is a temporary stub file for TypeScript compilation
 */

import type { FunctionReference } from "convex/server";

export declare const api: {
  auth: {
    register: FunctionReference<"mutation", "public">;
    login: FunctionReference<"mutation", "public">;
    logout: FunctionReference<"mutation", "public">;
    getUserByToken: FunctionReference<"query", "public">;
    updateProfile: FunctionReference<"mutation", "public">;
    changePassword: FunctionReference<"mutation", "public">;
    forgotPassword: FunctionReference<"mutation", "public">;
    resetPassword: FunctionReference<"mutation", "public">;
    validateSession: FunctionReference<"query", "public">;
    getUserWithPreferences: FunctionReference<"query", "public">;
  };
  alerts: {
    getUserAlerts: FunctionReference<"query", "public">;
    markAsRead: FunctionReference<"mutation", "public">;
    getUnreadCount: FunctionReference<"query", "public">;
  };
  favorites: {
    getUserFavorites: FunctionReference<"query", "public">;
    addFavorite: FunctionReference<"mutation", "public">;
    removeFavorite: FunctionReference<"mutation", "public">;
    isFavorite: FunctionReference<"query", "public">;
  };
  preferences: {
    getUserPreferences: FunctionReference<"query", "public">;
    updatePreferences: FunctionReference<"mutation", "public">;
  };
  promotions: {
    getActivePromotions: FunctionReference<"query", "public">;
    getPromotionById: FunctionReference<"query", "public">;
    searchPromotions: FunctionReference<"query", "public">;
  };
};
