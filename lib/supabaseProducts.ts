import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/data/products";
import type { Retailer } from "@/lib/retailers/types";
import type { IconName } from "@/lib/icons";

type SupabaseProductRow = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  store: string;
  image_url: string | null;
  affiliate_url: string;
  description: string | null;
};

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

function normalizeProduct(row: SupabaseProductRow): Product {
  const price = row.price ?? 0;
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: `₹${price.toLocaleString("en-IN")}`,
    priceValue: price,
    rating: 4.5,
    trending: false,
    icon: CATEGORY_ICON[row.category] ?? "ShoppingBag",
    tone: "bg-[#EDE6D8]",
    description: row.description ?? "",
    audience: "Unisex",
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