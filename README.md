# TBP Picks

Product-discovery site. Built incrementally — this drop adds separate pages
for shop/filtering, product detail, and auth on top of the Step 1 homepage.

## Setup

Generated in an environment without internet access, so dependencies were
never installed or run here. Do this in VS Code, where you have network access:

1. Unzip this into your project folder (or copy the files in directly).
2. Install dependencies:
   ```
   npm install
   ```
3. (Optional, for login/signup) Copy `.env.local.example` to `.env.local` and
   fill in your Supabase project's URL and anon key from
   Supabase → Project Settings → API. Until you do this, the login/signup
   forms will render but show a "Supabase isn't connected yet" message
   instead of actually signing anyone in.
4. Run the dev server:
   ```
   npm run dev
   ```
5. Open http://localhost:3000

## Pages

- `/` — homepage (hero, trending, best picks, categories, featured, why-TBP, final CTA)
- `/shop` — full product grid with category filter, price-range filter, sort, and search
- `/product/[id]` — individual product detail page (image, description, price, Buy Now)
- `/login`, `/signup` — auth forms wired to `supabase.auth.signInWithPassword` /
  `supabase.auth.signUp`. No dashboard or protected routes yet — this step is
  just the forms and the client connection.

## What's new in this step

- **Search** in the navbar now actually does something: it expands into an
  input and submitting it takes you to `/shop?q=...`, pre-filtered.
- **Shop page** (`/shop`) holds the full catalog and all filtering, instead of
  crowding the homepage — category list, a min/max price-range slider, sort,
  and the same search field, all client-side over the data in
  `data/products.ts`.
- **Product pages** (`/product/[id]`) are now separate routes generated from
  the catalog, instead of a modal or inline expansion. "View Product" on any
  card links here.
- **Login / Signup** are separate, self-contained pages (`/login`, `/signup`) —
  each has its own form and its own call into `lib/supabaseClient.ts`
  (`supabase.auth.signInWithPassword` / `supabase.auth.signUp`), so you can
  edit one without touching the other. Nothing else in the app requires a
  signed-in user yet — no protected pages or user data.
- **Wishlist**: a heart icon on every product card saves it to a wishlist
  stored in the browser's `localStorage` (via `lib/wishlist-context.tsx`).
  `/wishlist` lists what's saved, and the navbar heart icon shows a live
  count. This is device-local only — connecting it to a signed-in user's
  account is a later step once Supabase auth is live.
- **Shop filters**: `/shop` now also filters by audience (Men / Women / Kids /
  Unisex) alongside category and price range, and on small screens the
  filters collapse behind a "Filters" button instead of always taking up
  space.

## Not included yet

Dashboard, protected routes, cashback/rewards, payments, affiliate/retailer
APIs — these come in later steps as originally scoped.

## Notes

- `data/products.ts` is the single source of truth: homepage sections
  (`trendingProducts`, `bestPicks`, `featuredProducts`) and the `/shop` grid
  (`allProducts`) all read from the same list, so adding a real product means
  editing it in one place.
- Product tiles are still icon placeholders (lucide-react) in tinted boxes,
  not photos — swap these in `data/products.ts` when you have real images.
