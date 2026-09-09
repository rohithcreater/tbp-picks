import { bestPicks } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestPicksSection() {
  return (
    <section id="best-picks" className="bg-sand/50 py-20">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Best Picks</h2>
          <p className="mt-3 text-ink-soft">
            Carefully selected products worth discovering.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
