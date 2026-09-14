"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  return (
    <div>
      <div className="flex h-80 items-center justify-center overflow-hidden rounded-card border border-line/80 bg-white md:h-[420px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={alt} className="h-full w-full object-contain p-6" />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === active}
              className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white transition-colors ${
                i === active ? "border-ink" : "border-line/80 hover:border-ink/40"
              }`}
            >
              {failed[i] ? (
                <span className="text-[10px] text-ink-soft">No image</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-contain p-1"
                  onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}