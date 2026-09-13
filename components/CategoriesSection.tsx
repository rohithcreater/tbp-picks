import Link from "next/link";
import { categories } from "@/data/products";
import { getSupabaseProducts } from "@/lib/supabaseProducts";
import { iconMap } from "@/lib/icons";

export default async function CategoriesSection() {
  const supabaseProducts = await getSupabaseProducts();

  return (
    <section id="categories" className="mx-auto max-w-content px-6 py-20 md:px-10">
      <div className="max-w-lg">
        <h2 className="font-display text-3xl text-ink md:text-4xl">Browse Categories</h2>
        <p className="mt-3 text-ink-soft">Find picks organized the way you shop.</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const count = supabaseProducts.filter(
            (p) => p.category === category.name
          ).length;
          return (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col items-center gap-3 rounded-card border border-line/80 bg-white/50 px-4 py-8 text-center transition-colors hover:border-gold/50 hover:bg-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand transition-colors group-hover:bg-gold/15">
                <Icon size={22} strokeWidth={1.5} className="text-ink/75" />
              </div>
              <div>
                <p className="text-[15px] text-ink">{category.name}</p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {count} {count === 1 ? "pick" : "picks"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}