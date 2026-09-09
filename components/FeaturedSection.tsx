import { featuredProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedSection() {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-bone md:text-4xl">
            Find Your Next Favourite
          </h2>
          <p className="mt-3 text-bone/60">
            A closer look at three picks people keep coming back for.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <div key={product.id} className={i === 1 ? "md:mt-8" : ""}>
              <ProductCard product={product} size="large" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
