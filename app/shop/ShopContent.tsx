"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getSupabaseProducts } from "@/lib/supabaseProducts";
import {
  allProducts,
  categories,
  AUDIENCES,
  PRICE_MIN,
  PRICE_MAX,
  type Audience,
  type Product,
} from "@/data/products";

export default function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const initialQuery = searchParams.get("q") ?? "";

  const [category, setCategory] = useState(initialCategory);
  const [audience, setAudience] = useState<Audience | "All">("All");
  const [query, setQuery] = useState(initialQuery);
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">(
    "featured"
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [supabaseProducts, setSupabaseProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSupabaseProducts().then(setSupabaseProducts);
  }, []);

  const combinedProducts = useMemo(
    () => [...allProducts, ...supabaseProducts],
    [supabaseProducts]
  );

  const filtered = useMemo(() => {
    let results = combinedProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesAudience = audience === "All" || product.audience === audience;
      const matchesPrice =
        product.priceValue >= minPrice && product.priceValue <= maxPrice;
      const matchesQuery =
        query.trim().length === 0 ||
        product.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        product.category.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesAudience && matchesPrice && matchesQuery;
    });

    if (sort === "price-asc") results = [...results].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") results = [...results].sort((a, b) => b.priceValue - a.priceValue);
    if (sort === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

    return results;
  }, [combinedProducts, category, audience, minPrice, maxPrice, query, sort]);

  function handleMinChange(value: number) {
    setMinPrice(Math.min(value, maxPrice));
  }

  function handleMaxChange(value: number) {
    setMaxPrice(Math.max(value, minPrice));
  }

  function resetFilters() {
    setCategory("All");
    setAudience("All");
    setQuery("");
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setSort("featured");
  }

  const activeFilterCount =
    (category !== "All" ? 1 : 0) +
    (audience !== "All" ? 1 : 0) +
    (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX ? 1 : 0);

  return (
    <section className="mx-auto max-w-content px-6 py-14 md:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-lg">
          <h1 className="font-display text-3xl text-ink md:text-4xl">Shop All Picks</h1>
  <p className="mt-3 text-ink-soft">
  Filter by category, audience, or price to find what you&apos;re after.
</p>
        </div>

        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink md:hidden"
        >
          {filtersOpen ? <X size={16} strokeWidth={1.75} /> : <SlidersHorizontal size={16} strokeWidth={1.75} />}
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] text-bone">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-8 md:flex`}>
          <div>
            <label className="text-sm text-ink" htmlFor="shop-search">
              Search
            </label>
            <input
              id="shop-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="mt-2 w-full rounded-lg border border-line bg-white/70 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-gold"
            />
          </div>

          <div>
            <p className="text-sm text-ink">Category</p>
            <div className="mt-3 flex flex-col gap-1">
              <button
                onClick={() => setCategory("All")}
                className={`rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
                  category === "All" ? "bg-ink text-bone" : "text-ink-soft hover:bg-sand"
                }`}
              >
                All categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.name)}
                  className={`rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
                    category === c.name ? "bg-ink text-bone" : "text-ink-soft hover:bg-sand"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-ink">Audience</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setAudience("All")}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  audience === "All"
                    ? "border-ink bg-ink text-bone"
                    : "border-line text-ink-soft hover:border-ink/40"
                }`}
              >
                All
              </button>
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                    audience === a
                      ? "border-ink bg-ink text-bone"
                      : "border-line text-ink-soft hover:border-ink/40"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-ink">Price range</p>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[13px] text-ink-soft">
                <span>₹{minPrice.toLocaleString("en-IN")}</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={100}
                value={minPrice}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="accent-[#A8763E]"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={100}
                value={maxPrice}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="accent-[#A8763E]"
                aria-label="Maximum price"
              />
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="self-start text-sm text-ink-soft underline underline-offset-2 transition-colors hover:text-ink"
          >
            Reset filters
          </button>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">
              {filtered.length} product{filtered.length === 1 ? "" : "s"}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-line bg-white/70 px-3 py-2 text-sm text-ink outline-none focus:border-gold"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-card border border-line/80 bg-white/50 px-6 py-14 text-center text-ink-soft">
              No products match those filters. Try widening your price range.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}