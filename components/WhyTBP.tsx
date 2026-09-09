import { Compass, TrendingUp, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Carefully Selected",
    description:
      "Every product on TBP Picks is reviewed for quality and value before it earns a place on the site.",
  },
  {
    icon: TrendingUp,
    title: "Trending Products",
    description:
      "We track what's gaining attention so you spend less time searching and more time deciding.",
  },
  {
    icon: MousePointerClick,
    title: "Easy Shopping",
    description:
      "Browse, compare, and head straight to the retailer when you're ready — no extra steps in between.",
  },
];

export default function WhyTBP() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 md:px-10">
      <div className="max-w-lg">
        <h2 className="font-display text-3xl text-ink md:text-4xl">Why TBP Picks</h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-card border border-line/80 bg-white/50 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15">
                <Icon size={20} strokeWidth={1.5} className="text-gold-deep" />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
