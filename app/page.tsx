import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingSection from "@/components/TrendingSection";
import BestPicksSection from "@/components/BestPicksSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedSection from "@/components/FeaturedSection";
import WhyTBP from "@/components/WhyTBP";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

// Trending Now, Best Picks, and category counts read live from Supabase —
// without this, Next.js would cache the homepage at build time and admin
// changes (toggling Trending/Best Pick, adding products) wouldn't show
// until the next deploy.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="bg-bone">
      <Navbar />
      <Hero />
      <TrendingSection />
      <BestPicksSection />
      <CategoriesSection />
      <FeaturedSection />
      <WhyTBP />
      <FinalCTA />
      <Footer />
    </main>
  );
}