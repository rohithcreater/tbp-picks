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
  tone: string;
  description: string;
  audience: Audience;
  retailer: Retailer;
  productUrl: string;
};

// Single source of truth for every product in the catalog.
// Trending / Best Picks / Featured on the homepage, and the
// full filterable grid on /shop, all read from this list.
export const allProducts: Product[] = [
  {
    id: "earbuds-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=wireless+earbuds+noise+cancellation",
    name: "Aera Wireless Earbuds",
    category: "Electronics",
    price: "₹6,499",
    priceValue: 6499,
    rating: 4.7,
    trending: true,
    icon: "Headphones",
    tone: "bg-[#EDE6D8]",
    description:
      "Compact true-wireless earbuds with active noise cancellation and a 30-hour case battery, tuned for all-day listening.",
    audience: "Unisex",
  },
  {
    id: "watch-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=smartwatch+fitness+tracker",
    name: "Orbit Series Smartwatch",
    category: "Gadgets",
    price: "₹11,999",
    priceValue: 11999,
    rating: 4.6,
    trending: true,
    icon: "Watch",
    tone: "bg-[#E7E2D3]",
    description:
      "A minimal smartwatch with a week-long battery, heart-rate and sleep tracking, and a scratch-resistant sapphire-style face.",
    audience: "Unisex",
  },
  {
    id: "sneaker-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=running+sneakers+men",
    name: "Strand Running Sneaker",
    category: "Fashion",
    price: "₹4,299",
    priceValue: 4299,
    rating: 4.5,
    trending: true,
    icon: "Footprints",
    tone: "bg-[#EFEAE0]",
    description:
      "A lightweight everyday runner with breathable mesh and a cushioned sole built for long days on your feet.",
    audience: "Men",
  },
  {
    id: "lamp-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=ceramic+desk+lamp",
    name: "Hearth Ceramic Desk Lamp",
    category: "Home",
    price: "₹2,199",
    priceValue: 2199,
    rating: 4.8,
    trending: true,
    icon: "Lamp",
    tone: "bg-[#E9E3D6]",
    description:
      "A warm, dimmable desk lamp with a hand-finished ceramic base that fits both a home office and a bedside table.",
    audience: "Unisex",
  },
  {
    id: "glasses-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=polarized+sunglasses",
    name: "Meridian Polarized Sunglasses",
    category: "Accessories",
    price: "₹1,899",
    priceValue: 1899,
    rating: 4.4,
    trending: true,
    icon: "Glasses",
    tone: "bg-[#EDE7DA]",
    description:
      "Polarized lenses with UV400 protection in a lightweight frame that holds its shape through daily wear.",
    audience: "Unisex",
  },
  {
    id: "speaker-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=mini+bluetooth+speaker",
    name: "Basalt Mini Speaker",
    category: "Electronics",
    price: "₹3,299",
    priceValue: 3299,
    rating: 4.6,
    trending: true,
    icon: "Speaker",
    tone: "bg-[#E8E2D4]",
    description:
      "A palm-sized bluetooth speaker with surprising bass depth, splash resistance, and a 12-hour battery.",
    audience: "Unisex",
  },
  {
    id: "camera-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=compact+camera",
    name: "Litho Compact Camera",
    category: "Electronics",
    price: "₹18,499",
    priceValue: 18499,
    rating: 4.7,
    icon: "Camera",
    tone: "bg-[#EAE4D7]",
    description:
      "A pocketable compact camera with a fast prime lens, built for people who want more control than a phone offers.",
    audience: "Unisex",
  },
  {
    id: "wallet-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=leather+wallet+men",
    name: "Fold Leather Wallet",
    category: "Accessories",
    price: "₹1,299",
    priceValue: 1299,
    rating: 4.5,
    icon: "Wallet",
    tone: "bg-[#EEE9DC]",
    description:
      "A slim full-grain leather wallet with room for six cards and cash, designed to soften and age well over time.",
    audience: "Men",
  },
  {
    id: "bag-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=canvas+tote+bag",
    name: "Kestrel Canvas Tote",
    category: "Fashion",
    price: "₹2,499",
    priceValue: 2499,
    rating: 4.6,
    icon: "ShoppingBag",
    tone: "bg-[#E9E4D8]",
    description:
      "A durable waxed-canvas tote with a leather base and interior pocket, sized for a laptop and a day's essentials.",
    audience: "Women",
  },
  {
    id: "skincare-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=skincare+set",
    name: "Almine Skincare Set",
    category: "Beauty",
    price: "₹2,899",
    priceValue: 2899,
    rating: 4.8,
    icon: "Sparkles",
    tone: "bg-[#EDE7DB]",
    description:
      "A three-step routine — cleanser, serum, and moisturiser — formulated for daily use on sensitive skin.",
    audience: "Women",
  },
  {
    id: "kids-sneaker-01",
    retailer: "amazon",
    productUrl: "https://www.amazon.in/s?k=kids+velcro+sneakers",
    name: "Juniper Kids Sneaker",
    category: "Fashion",
    price: "₹1,799",
    priceValue: 1799,
    rating: 4.6,
    icon: "Footprints",
    tone: "bg-[#F0EAD9]",
    description:
      "An easy-velcro kids' sneaker with a durable sole, built for the playground and true to size.",
    audience: "Kids",
  },
];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

// Homepage sections pull curated slices from the same catalog.
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
  { id: "Electronics", name: "Electronics", count: "128 picks", icon: "Headphones" },
  { id: "Fashion", name: "Fashion", count: "94 picks", icon: "Footprints" },
  { id: "Home", name: "Home", count: "76 picks", icon: "Lamp" },
  { id: "Beauty", name: "Beauty", count: "52 picks", icon: "Sparkles" },
  { id: "Gadgets", name: "Gadgets", count: "61 picks", icon: "Watch" },
  { id: "Accessories", name: "Accessories", count: "83 picks", icon: "Glasses" },
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 20000;

export const AUDIENCES: Audience[] = ["Men", "Women", "Kids", "Unisex"];