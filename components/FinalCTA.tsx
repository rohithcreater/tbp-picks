import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-content px-6 pb-24 md:px-10">
      <div className="flex flex-col items-center gap-6 rounded-card border border-line/80 bg-sand/60 px-8 py-16 text-center">
        <h2 className="balance max-w-xl font-display text-3xl text-ink md:text-4xl">
          Ready to discover something great?
        </h2>
        <Link
          href="/shop"
          className="rounded-full bg-ink px-8 py-3.5 text-[15px] text-bone transition-colors hover:bg-gold-deep"
        >
          Explore TBP Picks
        </Link>
      </div>
    </section>
  );
}
