"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Headphones, Watch, Footprints, ShoppingBag } from "lucide-react";

function HoodieIllustration() {
  return (
    <svg viewBox="0 0 520 620" className="h-[310px] w-[260px] md:h-[390px] md:w-[330px]" aria-label="Stylish hoodie illustration" role="img">
      <defs>
        <linearGradient id="hoodieBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#252522" />
          <stop offset="0.55" stopColor="#11110f" />
          <stop offset="1" stopColor="#36332d" />
        </linearGradient>
        <linearGradient id="hoodieHood" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#4b4740" />
          <stop offset="1" stopColor="#191916" />
        </linearGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodOpacity=".22" />
        </filter>
      </defs>
      <g filter="url(#softShadow)">
        <path d="M177 132c-8-48 26-92 83-92s91 44 83 92l-18 34H195z" fill="url(#hoodieHood)" stroke="#5d584f" strokeWidth="3" />
        <path d="M218 105c10-31 24-45 42-45 19 0 33 14 43 45-13 16-27 25-43 25-15 0-29-9-42-25z" fill="#171714" opacity=".92" />
        <path d="M191 139 105 192c-17 11-25 29-22 48l31 193c3 18 18 31 36 31h42l8 82c2 18 17 31 35 31h170c18 0 33-13 35-31l8-82h42c18 0 33-13 36-31l31-193c3-19-5-37-22-48l-86-53-35 68c-11 20-32 32-55 32h-37c-23 0-44-12-55-32z" fill="url(#hoodieBody)" stroke="#514c43" strokeWidth="4" />
        <path d="M205 143c18 37 42 56 75 56s57-19 75-56" fill="none" stroke="#6a645a" strokeWidth="5" opacity=".6" />
        <path d="M174 238c-22 19-37 44-41 72l-17 118" fill="none" stroke="#5d584f" strokeWidth="5" opacity=".45" />
        <path d="M346 238c22 19 37 44 41 72l17 118" fill="none" stroke="#5d584f" strokeWidth="5" opacity=".45" />
        <path d="M216 365h164v91c-20 17-45 25-82 25s-62-8-82-25z" fill="#1a1a17" stroke="#4f4a42" strokeWidth="3" />
        <path d="M260 144v82M291 144v82" stroke="#8a8378" strokeWidth="3" strokeLinecap="round" />
        <circle cx="260" cy="229" r="4" fill="#a8763e" /><circle cx="291" cy="229" r="4" fill="#a8763e" />
        <path d="M153 459h214" stroke="#625d54" strokeWidth="6" opacity=".55" />
      </g>
    </svg>
  );
}

const miniProducts = [
  { label: "Orbit Watch", icon: Watch, className: "right-0 top-7", depth: 22 },
  { label: "Strand Sneaker", icon: Footprints, className: "left-0 bottom-5", depth: 14 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 55, damping: 14 });
  const my = useSpring(rawY, { stiffness: 55, damping: 14 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    rawX.set((e.clientX - bounds.left) / bounds.width - 0.5);
    rawY.set((e.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handleMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <section id="top" className="relative mx-auto max-w-content overflow-hidden px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-56 w-56 rounded-full bg-sand/60 blur-3xl" />

      <div className="relative grid items-center gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-4">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[.16em] text-ink-soft backdrop-blur-sm">
            <ShoppingBag size={14} /> Curated, not crowded
          </div>
          <h1 className="balance max-w-xl font-display text-[3.25rem] leading-[.98] tracking-[-.04em] text-ink md:text-[5.4rem]">
            Better picks.<br /><span className="text-gold-deep">Less scrolling.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-ink-soft md:text-lg">
            TBP Picks brings together products that look good, work well, and are actually worth considering.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-bone shadow-card transition hover:-translate-y-0.5 hover:bg-gold-deep">Explore Picks</Link>
            <a href="#discover" className="rounded-full border border-ink/15 bg-white/50 px-7 py-3.5 text-[15px] font-medium text-ink backdrop-blur-sm transition hover:border-ink/40">See what’s trending</a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-ink-soft">
            <span>✓ Hand-picked</span><span>✓ Simple comparisons</span><span>✓ No clutter</span>
          </div>
        </div>

        <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative min-h-[430px] w-full md:min-h-[560px] [perspective:1200px]">
          <div className="absolute inset-8 rounded-[40px] border border-white/70 bg-gradient-to-br from-[#ebe4d7] via-[#f3efe7] to-[#ddd4c4] shadow-lift md:inset-10" />
          <div className="absolute inset-x-20 bottom-8 h-20 rounded-full bg-ink/10 blur-2xl" />

          <motion.div style={{ x: useTransform(mx, v => v * 10), y: useTransform(my, v => v * 8) }} className="absolute inset-0 flex items-center justify-center">
            <HoodieIllustration />
          </motion.div>

          <motion.div style={{ x: useTransform(mx, v => v * 22), y: useTransform(my, v => v * 22) }} className="absolute left-[8%] top-[22%] hidden rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card backdrop-blur-md sm:block">
            <Headphones size={28} strokeWidth={1.4} className="text-ink/70" />
            <p className="mt-2 text-[11px] text-ink-soft">Aera Earbuds</p>
          </motion.div>

          {miniProducts.map(({ label, icon: Icon, className, depth }) => {
            const x = useTransform(mx, v => v * depth);
            const y = useTransform(my, v => v * depth);
            return <motion.div key={label} style={{ x, y }} className={`absolute ${className} z-10 rounded-2xl border border-white/90 bg-white/85 p-4 shadow-lift backdrop-blur-md`}>
              <Icon size={30} strokeWidth={1.35} className="text-ink/75" />
              <p className="mt-2 text-[11px] text-ink-soft">{label}</p>
            </motion.div>;
          })}
          <div className="absolute bottom-10 right-[9%] rounded-full border border-white/80 bg-ink px-4 py-2 text-[10px] uppercase tracking-[.18em] text-bone shadow-card">TBP EDIT</div>
        </div>
      </div>
    </section>
  );
}
