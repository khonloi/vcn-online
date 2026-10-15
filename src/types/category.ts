export interface CategoryConfig {
  name: string;
  slug: string;
  href: string;
}

// Re-export for backward compatibility
export type { MarketIndex } from './market';
