import type { Metadata } from "next";
import { WishlistProvider } from "@/lib/wishlist-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "TBP Picks — Trendy & Best Picks",
  description:
    "Discover products worth buying. TBP Picks surfaces trending and carefully selected products worth your attention.",
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
