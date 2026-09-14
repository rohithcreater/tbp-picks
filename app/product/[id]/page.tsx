import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import { allProducts, getProductById } from "@/data/products";
import { getSupabaseProductById } from "@/lib/supabaseProducts";
import { iconMap } from "@/lib/icons";

async function findProduct(id: string) {
  return getProductById(id) ?? (await getSupabaseProductById(id));
}

export function generateStaticParams() {
  return allProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await findProduct(params.id);
  return { title: product ? `${product.name} — TBP Picks` : "Product — TBP Picks" };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await findProduct(params.id);
  if (!product) notFound();

  const Icon = iconMap[product.icon];

  return (
    <main className="bg-bone">
      <Navbar />

      <section className="mx-auto max-w-content px-6 py-14 md:px-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} strokeWidth={1.75} />
          Back to shop
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
          {product.imageUrls && product.imageUrls.length > 0 ? (
            <ProductGallery images={product.imageUrls} alt={product.name} />
          ) : (
            <div
              className={`flex h-80 items-center justify-center overflow-hidden rounded-card border border-line/80 md:h-[420px] ${
                product.imageUrl ? "bg-white" : product.tone
              }`}
            >
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                 className="h-full w-full object-contain p-6"
                />
              ) : (
                <Icon size={96} strokeWidth={1} className="text-ink/70" />
              )}
            </div>
          )}

          <div>
            <p className="text-sm text-ink-soft">{product.category}</p>
            <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
              <Star size={15} className="fill-gold text-gold" strokeWidth={0} />
              {product.rating} rating
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              {product.description}
            </p>

            <p className="mt-8 font-display text-3xl text-ink">{product.price}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              
               <a href={`/api/go?retailer=${product.retailer}&url=${encodeURIComponent(product.productUrl)}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="rounded-full bg-ink px-8 py-3.5 text-[15px] text-bone transition-colors hover:bg-gold-deep"
              >
                Buy Now
              </a>
              <Link
                href="/shop"
                className="rounded-full border border-ink/20 px-8 py-3.5 text-[15px] text-ink transition-colors hover:border-ink"
              >
                Keep Browsing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}