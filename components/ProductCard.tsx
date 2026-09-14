"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useWishlist } from "@/lib/wishlist-context";
import { iconMap } from "@/lib/icons";

export default function ProductCard({
  product,
  size = "default",
}: {
  product: Product;
  size?: "default" | "large";
}) {
  const Icon = iconMap[product.icon];
  const imageHeight = size === "large" ? "h-64 md:h-80" : "h-48";
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(product.id);
  const [nameExpanded, setNameExpanded] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-card border border-line/80 bg-white/60 shadow-card"
    >
      <div
        className={`relative flex ${imageHeight} items-center justify-center overflow-hidden ${
          product.imageUrl ? "bg-white" : product.tone
        }`}
      >
        {product.trending && (
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs text-bone">
            Trending
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-soft shadow-card transition-colors hover:text-gold-deep"
        >
          <Heart
            size={17}
            strokeWidth={1.75}
            className={saved ? "fill-gold-deep text-gold-deep" : ""}
          />
        </button>
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Icon
            size={size === "large" ? 72 : 52}
            strokeWidth={1.25}
            className="text-ink/70 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] text-ink-soft">{product.category}</p>
            <h3
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNameExpanded((v) => !v);
              }}
              className={`mt-0.5 cursor-pointer font-display text-lg leading-snug text-ink ${
                nameExpanded ? "" : "line-clamp-2"
              }`}
            >
              {product.name}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-1 pt-0.5 text-sm text-ink-soft">
            <Star size={14} className="fill-gold text-gold" strokeWidth={0} />
            {product.rating}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg text-ink">{product.price}</span>
          <Link
            href={`/product/${product.id}`}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
          >
            View Product
          </Link>
        </div>
      </div>
    </motion.article>
  );
}