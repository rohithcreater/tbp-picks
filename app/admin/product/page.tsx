"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("Myntra");
  const [imageUrl, setImageUrl] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const { error } = await supabase.from("products").insert({
      business_id: user.id,
      name,
      category,
      price: price ? Number(price) : null,
      store,
      image_url: imageUrl,
      affiliate_url: affiliateUrl,
      description,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Product added successfully!");

    setName("");
    setCategory("");
    setPrice("");
    setImageUrl("");
    setAffiliateUrl("");
    setDescription("");
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

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Product image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
    </main>
  );
}