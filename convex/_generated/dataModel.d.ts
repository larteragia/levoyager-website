/* eslint-disable */
/**
 * Generated data model types - will be replaced by `npx convex dev`
 */

import type { GenericDataModel, GenericDocument, GenericId } from "convex/server";

export type Id<TableName extends string> = GenericId<TableName>;

export interface DataModel extends GenericDataModel {
  users: {
    _id: Id<"users">;
    email: string;
    passwordHash: string;
    fullName?: string;
    phone?: string;
    telegramChatId?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    createdAt: number;
    updatedAt: number;
  };
  userPreferences: {
    _id: Id<"userPreferences">;
    userId: Id<"users">;
    preferredOrigins: string[];
    preferredDestinations: string[];
    maxPrice: number;
    preferredAirlines: string[];
    notificationChannels: string[];
    notificationFrequency: string;
    createdAt: number;
    updatedAt: number;
  };
  sessions: {
    _id: Id<"sessions">;
    userId: Id<"users">;
    token: string;
    expiresAt: number;
    createdAt: number;
    userAgent?: string;
    ipAddress?: string;
  };
  promotions: {
    _id: Id<"promotions">;
    origin: string;
    destination: string;
    airline: string;
    departureDate?: string;
    returnDate?: string;
    priceTotal: number;
    pricePerPerson?: number;
    originalPrice?: number;
    discountPercentage: number;
    currency: string;
    isRoundTrip: boolean;
    source: string;
    sourceUrl: string;
    title: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
    expiresAt?: number;
    createdAt: number;
    updatedAt: number;
  };
  userAlerts: {
    _id: Id<"userAlerts">;
    userId: Id<"users">;
    promotionId: Id<"promotions">;
    channel: string;
    isRead: boolean;
    readAt?: number;
    sentAt: number;
    createdAt: number;
  };
  userFavorites: {
    _id: Id<"userFavorites">;
    userId: Id<"users">;
    promotionId: Id<"promotions">;
    createdAt: number;
  };
  priceHistory: {
    _id: Id<"priceHistory">;
    origin: string;
    destination: string;
    airline: string;
    price: number;
    source: string;
    recordedAt: number;
  };
  airlines: {
    _id: Id<"airlines">;
    code: string;
    name: string;
    logoUrl?: string;
    websiteUrl?: string;
    description?: string;
  };
  tips: {
    _id: Id<"tips">;
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
    createdAt: number;
    updatedAt: number;
  };
}

export type Doc<TableName extends keyof DataModel> = GenericDocument<DataModel, TableName>;
