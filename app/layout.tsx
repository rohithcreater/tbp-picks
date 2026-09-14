import type { Metadata } from "next";
import { WishlistProvider } from "@/lib/wishlist-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tbp-picks.vercel.app"),
  title: "TBP Picks — Trendy & Best Picks",
  description:
    "Discover products worth buying. TBP Picks surfaces trending and carefully selected products worth your attention.",
  openGraph: {
    siteName: "TBP Picks",
    title: "TBP Picks — Trendy & Best Picks",
    description:
      "Discover products worth buying. TBP Picks surfaces trending and carefully selected products worth your attention.",
    url: "https://tbp-picks.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TBP Picks — Trendy & Best Picks",
    description:
      "Discover products worth buying. TBP Picks surfaces trending and carefully selected products worth your attention.",
  },
  verification: {
    google: "BSbUno_s9_w9TYSF_HZ8BgmQNj3iWQXVm2vJl_Tj-1A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <WishlistProvider>{children}</WishlistProvider>
      </body>
    </html>
  );
}