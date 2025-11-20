export type CategorySummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
};

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  heroImage?: string;
  highlights: string[];
  price?: number;
  categorySlug: string;
  badge?: string;
};

export type SolutionStory = {
  id: string;
  title: string;
  description: string;
  industries: string[];
  ctaLabel: string;
};

export type ServiceOffering = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

