// Convex Types for Voyager Website

import { Id } from 'convex/_generated/dataModel';

// User Types
export interface User {
  _id: Id<'users'>;
  email: string;
  password_hash: string;
  full_name?: string;
  phone?: string;
  is_active: boolean;
  created_at: number;
  updated_at: number;
}

export interface UserPreferences {
  _id: Id<'user_preferences'>;
  user_id: Id<'users'>;
  preferred_origins: string[];
  max_price: number;
  preferred_airlines: string[];
  notification_channels: NotificationChannel[];
  notification_frequency: NotificationFrequency;
  created_at: number;
  updated_at: number;
}

export type NotificationChannel = 'telegram' | 'email' | 'whatsapp';
export type NotificationFrequency = 'instant' | 'daily' | 'weekly';

// Alert Types
export interface UserAlert {
  _id: Id<'user_alerts'>;
  user_id: Id<'users'>;
  promotion_id?: Id<'promotions'>;
  is_read: boolean;
  read_at?: number;
  created_at: number;
  updated_at: number;
}

// Promotion Types
export interface Promotion {
  _id: Id<'promotions'>;
  origin: string;
  destination: string;
  airline: string;
  departure_date: number;
  return_date?: number;
  price_total: number;
  price_per_person?: number;
  currency: string;
  discount_percentage: number;
  source: string;
  source_url: string;
  title: string;
  description: string;
  image_url?: string;
  is_active: boolean;
  created_at: number;
  updated_at: number;
}

// Favorite Types
export interface UserFavorite {
  _id: Id<'user_favorites'>;
  user_id: Id<'users'>;
  promotion_id?: Id<'promotions'>;
  created_at: number;
}

// Public Data Types
export interface PublicPrice {
  _id: Id<'public_prices'>;
  origin: string;
  destination: string;
  airline: string;
  average_price: number;
  min_price: number;
  max_price: number;
  last_updated: number;
  created_at: number;
}

export interface PublicAirline {
  _id: Id<'public_airlines'>;
  code: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  created_at: number;
  updated_at: number;
}

export interface PublicTip {
  _id: Id<'public_tips'>;
  title: string;
  content: string;
  category: TipCategory;
  created_at: number;
  updated_at: number;
}

export type TipCategory = 'economy' | 'baggage' | 'documents' | 'safety' | 'travel-tips' | 'best-times';
