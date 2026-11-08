export type CurrencyCode = 'USD' | 'IDR';
export type Language = 'EN' | 'ID';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number;
  label: string;
}

export interface ArtistProfile {
  name: string;
  handle: string;
  logoImage: string;
  title: string;
  tagline: string;
  location: string;
  experience: string;
  turnaroundAverage: string;
  avatarImage: string;
  software: string[];
  hardware: string[];
  socials: {
    twitter: string;
    instagram: string;
    email: string;
  };
}

export interface CategoryOption {
  id: string;
  name: string;
  priceUSD: number;
  priceIDR?: number;
  turnaroundDays: string;
  description: string;
  deliverables: string[];
  recommendedFor: string;
  emoji: string;
  sampleImage: string;
}

export interface MainTier {
  id: string;
  name: string;
  emoji: string;
  category: string;
  badge?: string;
  tagline: string;
  basePriceUSD: number;
  basePriceIDR?: number;
  turnaroundDays: string;
  description: string;
  deliverables: string[];
  revisions: string;
  recommendedFor: string;
  sampleImage: string;
}

export type PortfolioMainCategory = 'manga-coloring' | 'illustration';
export type MangaSubCategory = 'full-panel' | 'character-focused-panel' | 'double-spread';
export type IllustrationSubCategory = 'headshot' | 'half-body' | 'full-body';
export type PortfolioSubCategory = MangaSubCategory | IllustrationSubCategory | 'all';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioMainCategory;
  subCategory: PortfolioSubCategory;
  subCategoryLabel: string;
  image: string;
  secondaryImage?: string;
  clientType: string;
  software: string;
  resolution: string;
  colorPalette: string[];
  year: string;
  description?: string;
  aspectRatio: '16:9' | '3:4';
}

export interface WorkflowStep {
  step: string;
  emoji: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface CommissionTerms {
  dos: string[];
  donts: string[];
  paymentRules: string[];
  revisionRules: string[];
  copyrightRules: string[];
}

export interface OrderInquiry {
  orderId: string;
  tier: MainTier;
  categoryOption: CategoryOption;
  pageCount: number;
  totalUSD: number;
  totalAmount?: number;
  currency: CurrencyCode;
  clientName: string;
  clientHandle: string;
  clientEmail: string;
  projectTitle: string;
  lineartStatus: 'client-provided' | 'artist-draws';
  referenceUrls: string;
  colorMood: string;
  notes: string;
  estimatedDays: string;
  createdAt: string;
}
