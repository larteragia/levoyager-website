// User Types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  preferences: UserPreferences;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  preferredOrigins: string[];
  maxPrice: number;
  preferredAirlines: string[];
  notificationChannels: NotificationChannel[];
  notificationFrequency: NotificationFrequency;
}

export type NotificationChannel = 'telegram' | 'email' | 'whatsapp';

export type NotificationFrequency = 'instant' | 'daily' | 'weekly';

// Alert Types
export interface Alert {
  id: string;
  userId: string;
  promotionId: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Promotion Types
export interface Promotion {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  departureDate: Date;
  returnDate?: Date;
  priceTotal: number;
  pricePerPerson?: number;
  currency: string;
  discountPercentage: number;
  source: string;
  sourceUrl: string;
  title: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Favorite Types
export interface Favorite {
  id: string;
  userId: string;
  promotionId: string;
  createdAt: Date;
}

// Statistics Types
export interface Statistics {
  totalAlerts: number;
  totalPromotions: number;
  totalFavorites: number;
  averageDiscount: number;
  totalSavings: number;
  alertsByMonth: AlertsByMonth[];
  topDestinations: TopDestination[];
  topAirlines: TopAirline[];
}

export interface AlertsByMonth {
  month: string;
  count: number;
}

export interface TopDestination {
  destination: string;
  count: number;
  averageDiscount: number;
}

export interface TopAirline {
  airline: string;
  count: number;
  averagePrice: number;
}

// Public Data Types
export interface PublicPrice {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  lastUpdated: Date;
  createdAt: Date;
}

export interface Airline {
  id: string;
  code: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: TipCategory;
  createdAt: Date;
  updatedAt: Date;
}

export type TipCategory = 'economy' | 'baggage' | 'documents' | 'safety' | 'travel-tips' | 'best-times';

// API Response Types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter Types
export interface AlertFilters {
  dateRange?: DateRange;
  origins?: string[];
  destinations?: string[];
  airlines?: string[];
  priceRange?: PriceRange;
  discountRange?: DiscountRange;
  isRead?: boolean;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface DiscountRange {
  min?: number;
  max?: number;
}

// Form Types
export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  phone?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface PreferencesForm {
  preferredOrigins: string[];
  maxPrice: number;
  preferredAirlines: string[];
  notificationChannels: NotificationChannel[];
  notificationFrequency: NotificationFrequency;
}

// Export Types
export type ExportFormat = 'csv' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  dateRange?: DateRange;
  includeRead?: boolean;
  includeFavorites?: boolean;
}
