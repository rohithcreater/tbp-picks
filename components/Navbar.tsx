"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { supabase } from "@/lib/supabaseClient";

const links = [
  { label: "Discover", href: "/#discover" },
  { label: "Categories", href: "/#categories" },
  { label: "Best Picks", href: "/#best-picks" },
  { label: "Shop All", href: "/shop" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { wishlist } = useWishlist();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim().length === 0) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bone/85 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-tight text-ink">
            TBP Picks
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5"
            >
              <Search size={16} strokeWidth={1.75} className="text-ink-soft" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search products"
                className="w-32 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft sm:w-48"
              />
            </form>
          ) : (
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand hover:text-ink"
            >
              <Search size={19} strokeWidth={1.75} />
            </button>
          )}

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand hover:text-ink"
          >
            <Heart size={19} strokeWidth={1.75} />
            {wishlist.length > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-deep text-[10px] text-bone">
                {wishlist.length}
              </span>
            )}
          </Link>

          {userEmail ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="max-w-[140px] truncate text-sm text-ink-soft" title={userEmail}>
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-ink/20 px-5 py-2 text-sm text-ink transition-colors hover:border-ink"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden items-center rounded-full border border-ink/20 px-5 py-2 text-sm text-ink transition-colors hover:border-ink md:flex"
            >
              Log in
            </Link>
          )}

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand hover:text-ink md:hidden"
          >
            {open ? (
              <X size={20} strokeWidth={1.75} />
            ) : (
              <Menu size={20} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line/70 bg-bone px-6 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] text-ink-soft transition-colors hover:bg-sand hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] text-ink-soft transition-colors hover:bg-sand hover:text-ink"
            >
              Wishlist
            </Link>
            {userEmail ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="rounded-lg px-2 py-3 text-left text-[15px] text-ink-soft transition-colors hover:bg-sand hover:text-ink"
              >
                Log out ({userEmail})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] text-ink-soft transition-colors hover:bg-sand hover:text-ink"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}