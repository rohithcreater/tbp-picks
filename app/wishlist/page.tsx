"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { allProducts, type Product } from "@/data/products";
import { getSupabaseProducts } from "@/lib/supabaseProducts";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [supabaseProducts, setSupabaseProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSupabaseProducts().then(setSupabaseProducts);
  }, []);

  const combinedProducts = [...allProducts, ...supabaseProducts];
  const savedProducts = combinedProducts.filter((p) => wishlist.includes(p.id));

  return (
    <main className="bg-bone">
      <Navbar />

      <section className="mx-auto max-w-content px-6 py-14 md:px-10">
        <div className="max-w-lg">
          <h1 className="font-display text-3xl text-ink md:text-4xl">Your Wishlist</h1>
          <p className="mt-3 text-ink-soft">
            Products you&apos;ve saved with the heart icon, kept on this device.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-card border border-line/80 bg-white/50 px-6 py-16 text-center">
            <Heart size={28} strokeWidth={1.25} className="text-ink-soft" />
            <p className="text-ink-soft">Nothing saved yet.</p>
            <Link
              href="/shop"
              className="rounded-full bg-ink px-6 py-3 text-[15px] text-bone transition-colors hover:bg-gold-deep"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}