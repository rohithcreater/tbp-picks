import { supabase } from "@/lib/supabaseClient";
import type { Product, Audience } from "@/data/products";
import type { Retailer } from "@/lib/retailers/types";
import type { IconName } from "@/lib/icons";

type SupabaseProductRow = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  store: string;
  image_url: string | null;
  image_urls: string[] | null;
  is_trending: boolean;
  is_best_pick: boolean;
  rating: number | null;
  audience: string | null;
  affiliate_url: string;
  description: string | null;
};

const VALID_AUDIENCES: Audience[] = ["Men", "Women", "Kids", "Unisex"];

const STORE_TO_RETAILER: Record<string, Retailer> = {
  Amazon: "amazon",
  Flipkart: "flipkart",
  Myntra: "myntra",
  Other: "other",
};

const CATEGORY_ICON: Record<string, IconName> = {
  Electronics: "Headphones",
  Fashion: "Footprints",
  Home: "Lamp",
  Beauty: "Sparkles",
  Gadgets: "Watch",
  Accessories: "Glasses",
};

// Admin-added products come from a much simpler Supabase row than the rich
// static Product type (data/products.ts). This fills sensible defaults for
// fields the admin form doesn't collect (icon, tone) so admin products can
// render through the exact same ProductCard component.
function normalizeProduct(row: SupabaseProductRow): Product {
  const price = row.price ?? 0;
  const audience = VALID_AUDIENCES.includes(row.audience as Audience)
    ? (row.audience as Audience)
    : "Unisex";

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: `₹${price.toLocaleString("en-IN")}`,
    priceValue: price,
    rating: row.rating ?? 4.5,
    trending: row.is_trending,
    isBestPick: row.is_best_pick,
    icon: CATEGORY_ICON[row.category] ?? "ShoppingBag",
    imageUrl: row.image_url ?? row.image_urls?.[0] ?? undefined,
    imageUrls:
      row.image_urls && row.image_urls.length > 0
        ? row.image_urls
        : row.image_url
        ? [row.image_url]
        : undefined,
    tone: "bg-[#EDE6D8]",
    description: row.description ?? "",
    audience,
    retailer: STORE_TO_RETAILER[row.store] ?? "other",
    productUrl: row.affiliate_url,
  };
}

export async function getSupabaseProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(normalizeProduct);
}

export async function getSupabaseProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return normalizeProduct(data);
}