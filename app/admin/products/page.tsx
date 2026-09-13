"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  store: string;
  is_trending: boolean;
  is_best_pick: boolean;
};

export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("4.5");
  const [store, setStore] = useState("Myntra");
  const [audience, setAudience] = useState("Unisex");
  const [imageUrls, setImageUrls] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [isBestPick, setIsBestPick] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  async function loadProducts() {
    setLoadingList(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, category, price, store, is_trending, is_best_pick")
      .order("created_at", { ascending: false });
    setProducts(data ?? []);
    setLoadingList(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const urlList = imageUrls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const { error } = await supabase.from("products").insert({
      business_id: user.id,
      name,
      category,
      price: price ? Number(price) : null,
      rating: rating ? Number(rating) : 4.5,
      store,
      audience,
      image_url: urlList[0] ?? "",
      image_urls: urlList,
      affiliate_url: affiliateUrl,
      description,
      is_trending: isTrending,
      is_best_pick: isBestPick,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Product added successfully!");

    setName("");
    setCategory("");
    setPrice("");
    setRating("4.5");
    setImageUrls("");
    setAffiliateUrl("");
    setDescription("");
    setIsTrending(false);
    setIsBestPick(false);
    setAudience("Unisex");

    loadProducts();
  }

  async function toggleFlag(id: string, field: "is_trending" | "is_best_pick", value: boolean) {
    await supabase.from("products").update({ [field]: value }).eq("id", id);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  async function deleteProduct(id: string) {
    if (!confirm("Remove this product permanently?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold">
          Add Product
        </h1>

        <p className="mb-6 text-gray-500">
          Add Amazon, Myntra or other affiliate products.
        </p>

        <form onSubmit={addProduct} className="space-y-4">

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="w-full rounded-lg border p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Accessories">Accessories</option>
          </select>

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Rating (e.g. 4.5)"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <select
            className="w-full rounded-lg border p-3"
            value={store}
            onChange={(e) => setStore(e.target.value)}
          >
            <option value="Myntra">Myntra</option>
            <option value="Amazon">Amazon</option>
            <option value="Flipkart">Flipkart</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="w-full rounded-lg border p-3"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="Unisex">Unisex</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <textarea
            className="w-full rounded-lg border p-3"
            placeholder="Product image URLs — one per line"
            rows={4}
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Affiliate URL"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
            required
          />

          <textarea
            className="w-full rounded-lg border p-3"
            placeholder="Product description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
              />
              Show in Trending Now
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isBestPick}
                onChange={(e) => setIsBestPick(e.target.checked)}
              />
              Show in Best Picks
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black p-3 font-semibold text-white hover:bg-gray-800"
          >
            Add Product
          </button>

        </form>

        {message && (
          <p className="mt-4 rounded-lg bg-gray-100 p-3">
            {message}
          </p>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Your Products</h2>

        {loadingList ? (
          <p className="text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products yet.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    {p.category} · {p.store}
                    {p.price ? ` · ₹${p.price}` : ""}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.is_trending}
                      onChange={(e) => toggleFlag(p.id, "is_trending", e.target.checked)}
                    />
                    Trending
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.is_best_pick}
                      onChange={(e) => toggleFlag(p.id, "is_best_pick", e.target.checked)}
                    />
                    Best Pick
                  </label>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}