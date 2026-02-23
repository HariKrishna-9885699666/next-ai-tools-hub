export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  websiteUrl: string;
  category: Category;
  pricing: PricingModel;
  tags: string[];
  screenshotUrl?: string;
  logoUrl?: string;
  githubRepo?: string;
  githubStars?: number;
  lastUpdated?: string;
  launchDate?: string;
  popularityScore?: number;
  externalRankingWeight?: number;
  aiSummary?: string;
  features?: string[];
}

export type Category =
  | "ai-tools"
  | "developer-tools"
  | "marketing-tools"
  | "design-tools"
  | "productivity"
  | "writing"
  | "automation"
  | "no-code"
  | "analytics"
  | "open-source";

export type PricingModel = "free" | "freemium" | "paid" | "open-source";

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export type SortOption = "trending" | "newest" | "popular" | "name";

export interface SearchFilters {
  query?: string;
  category?: Category;
  pricing?: PricingModel;
  tags?: string[];
  sort?: SortOption;
  page?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
