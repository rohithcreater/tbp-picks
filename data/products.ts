import type { IconName } from "@/lib/icons";
import type { Retailer } from "@/lib/retailers/types";

export type Audience = "Men" | "Women" | "Kids" | "Unisex";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  priceValue: number;
  rating: number;
  trending?: boolean;
  icon: IconName;
  imageUrl?: string;
  imageUrls?: string[];
  tone: string;
  description: string;
  audience: Audience;
  retailer: Retailer;
  productUrl: string;
};

// Static demo catalog removed — all products now come from the admin
// panel (Supabase), merged in on the homepage and /shop by
// lib/supabaseProducts.ts. This array intentionally stays empty.
export const allProducts: Product[] = [];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

// Homepage sections pull curated slices from the same catalog.
// With allProducts empty, these are empty too — TrendingSection and
// BestPicksSection merge in real Supabase products separately.
export const trendingProducts: Product[] = allProducts.filter((p) => p.trending);

export const bestPicks: Product[] = allProducts.filter((p) =>
  ["camera-01", "wallet-01", "bag-01", "skincare-01"].includes(p.id)
);

export const featuredProducts: Product[] = allProducts.filter((p) =>
  ["watch-01", "earbuds-01", "sneaker-01"].includes(p.id)
);

export type Category = {
  id: string;
  name: string;
  count: string;
  icon: IconName;
};

export const categories: Category[] = [
  { id: "Electronics", name: "Electronics", count: "0 picks", icon: "Headphones" },
  { id: "Fashion", name: "Fashion", count: "0 picks", icon: "Footprints" },
  { id: "Home", name: "Home", count: "0 picks", icon: "Lamp" },
  { id: "Beauty", name: "Beauty", count: "0 picks", icon: "Sparkles" },
  { id: "Gadgets", name: "Gadgets", count: "0 picks", icon: "Watch" },
  { id: "Accessories", name: "Accessories", count: "0 picks", icon: "Glasses" },
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 20000;

export const AUDIENCES: Audience[] = ["Men", "Women", "Kids", "Unisex"];