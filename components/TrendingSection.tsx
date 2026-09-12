import Link from "next/link";
import { trendingProducts } from "@/data/products";
import { getSupabaseProducts } from "@/lib/supabaseProducts";
import ProductCard from "./ProductCard";

export default async function TrendingSection() {
  const supabaseProducts = await getSupabaseProducts();
  // Newest admin-added products lead, curated static ones fill the rest,
  // capped so the section doesn't grow unbounded as you add more products.
  const displayProducts = [...supabaseProducts, ...trendingProducts].slice(0, 8);

  return (
    <section id="discover" className="mx-auto max-w-content px-6 py-20 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Trending Now</h2>
          <p className="mt-3 text-ink-soft">Products getting attention right now.</p>
        </div>
        <Link
          href="/shop"
          className="text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-gold-deep"
        >
          See All
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}