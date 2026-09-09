import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop All Picks — TBP Picks",
};

export default function ShopPage() {
  return (
    <main className="bg-bone">
      <Navbar />
      <Suspense fallback={null}>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}
