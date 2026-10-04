export interface CategoryConfig {
  name: string;
  slug: string;
  href: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { name: "Home", slug: "", href: "/" },
  { name: "Tech", slug: "tech", href: "/tech" },
  { name: "Markets", slug: "markets", href: "/markets" },
  { name: "Finance", slug: "finance", href: "/finance" },
  { name: "Economy", slug: "economy", href: "/economy" },
  { name: "Business", slug: "business", href: "/business" },
  { name: "Politics", slug: "politics", href: "/politics" },
  { name: "World", slug: "world", href: "/world" },
  { name: "Real Estate", slug: "real-estate", href: "/real-estate" },
  { name: "Energy", slug: "energy", href: "/energy" },
  { name: "Science", slug: "science", href: "/science" },
  { name: "Lifestyle", slug: "lifestyle", href: "/lifestyle" },
  { name: "Opinion", slug: "opinion", href: "/opinion" },
  { name: "Sports", slug: "sports", href: "/sports" },
];

export const CONTENT_CATEGORIES = CATEGORIES.filter((c) => c.slug !== "");
export const KNOWN_CATEGORY_SLUGS = new Set(CONTENT_CATEGORIES.map((c) => c.slug));

export const MARKET_INDICES = [
  { name: "S&P 500", value: "5,983.25", change: "+0.42%", positive: true },
  { name: "NASDAQ", value: "18,972.40", change: "+0.88%", positive: true },
  { name: "DOW", value: "43,870.10", change: "-0.15%", positive: false },
  { name: "BTC", value: "$96,450", change: "+2.30%", positive: true },
  { name: "OIL", value: "$72.15", change: "-1.05%", positive: false },
];

export const TRENDING_TOPICS = [
  "AI Boom",
  "Tech Stocks",
  "Federal Reserve",
  "Silicon Valley",
  "Electric Vehicles",
  "Real Estate Trends",
  "Energy Transition",
  "Global Trade",
];

export const SITE_CONFIG = {
  name: "Vice City News",
  shortName: "VCN",
  edition: "Online",
  description: "Vice City News delivers breaking business news, financial analysis, executive strategy, and technology intelligence.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  twitterHandle: "@VCNews",
  publisher: "Vice City News Media Inc.",
  editor: "Vice City News Editorial Board",
};
