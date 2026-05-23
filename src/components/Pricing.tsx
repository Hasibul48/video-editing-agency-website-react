import React, { useState, useRef } from "react";
import { Check, Sparkles, HelpCircle, Flame, ShieldAlert, Zap } from "lucide-react";
import type { PricingTier } from "../types";
import { pricingTiers } from "../lib/wp-data";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Reveal, fadeUp, premiumTransition } from "./MotionPrimitives";

interface PricingProps {
  onBookCallClick?: () => void;
}

const cardDirections = [
  { x: -80, rotateY: 12 },
  { x: 0, rotateY: 0, scale: 1.06 },
  { x: 80, rotateY: -12 },
];

function useCountUp(end: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  React.useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(end * ease));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  return { value, ref };
}

export default function Pricing({ onBookCallClick }: PricingProps) {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const pr = wd?.pricing;
  const sectionHeader = pr?.sectionHeader ?? 'PRICING SYSTEMS';
  const sectionTitle  = pr?.sectionTitle  ?? 'Pre-Engineered Retainer Slots.';
  const billedMonthly = pr?.billedMonthly ?? 'Billed Monthly';
  const billedAnnually= pr?.billedAnnually ?? 'Billed Annually';
  const footnote      = pr?.footnote      ?? '*Retainer structures require a mutual 3-month trial commitment. Custom enterprise parameters discussed upon request.';

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const getDisplayPrice = (tierId: string, basePriceStr: string) => {
    const rawPrice = parseInt(basePriceStr.replace(",", ""), 10);
    if (billingPeriod === "annually") {
      const discounted = Math.floor((rawPrice * 0.8));
      return discounted.toLocaleString();
    }
    return basePriceStr;
  };

  const tiers = pricingTiers();

  // Parallax orbs
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 bg-brand-dark overflow-hidden"
    >
      {/* Animated decorative orbs (parallax) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[25%] left-[-10%] w-[450px] h-[450px] rounded-full bg-brand-purple/5 blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-glow/8 blur-[160px] pointer-events-none"
      />

      {/* Horizontal beam */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/8 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/5 border border-white/10 text-xs font-bold text-brand-glow uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 text-brand-purple" />
            <span>{sectionHeader}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-4">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            We operate at strict production capacities to protect editorial execution client outcomes. Select one of our standard creative retainer plans to allocate strategy resources now.
          </p>
        </Reveal>

        {/* Premium billing toggle selector */}
        <Reveal className="flex items-center justify-center gap-3 mb-16">
          <span className={`text-xs sm:text-sm font-semibold tracking-wide ${billingPeriod === "monthly" ? "text-white" : "text-zinc-500"}`}>
            {billedMonthly}
          </span>
          <motion.button
            type="button"
            onClick={() => setBillingPeriod(prev => prev === "monthly" ? "annually" : "monthly")}
            whileTap={{ scale: 0.94 }}
            className="w-14 h-8 rounded-full bg-white/5 border border-white/10 p-1 relative transition-colors focus:outline-none cursor-pointer hover:border-brand-purple/40"
            aria-label="Toggle billing billingPeriod"
          >
            <div
              className={`w-5 h-5 rounded-full bg-brand-purple shadow transition-transform ${billingPeriod === "annually" ? "translate-x-6" : ""}`}
            />
          </motion.button>
          <span className={`text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 ${billingPeriod === "annually" ? "text-white" : "text-zinc-500"}`}>
            {billedAnnually}
            {billingPeriod === "annually" && (
              <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-widest">SAVE 20%</span>
            )}
          </span>
        </Reveal>

        {/* Pricing Cards Grid — next-level scroll animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier: PricingTier, idx) => {
            const dir = cardDirections[idx] || cardDirections[0];
            const { value, ref: countRef } = useCountUp(
              parseInt(tier.price.replace(",", ""), 10)
            );

            return (
              <motion.div
                key={tier.id}
                initial={{
                  opacity: 0,
                  x: dir.x,
                  rotateY: dir.rotateY,
                  scale: idx === 1 ? 0.92 : 0.88,
                  filter: "blur(12px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: idx === 1 ? 1.03 : 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  delay: idx * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: tier.popular ? -14 : -10,
                  scale: tier.popular ? 1.055 : 1.025,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`rounded-2xl relative p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-300 will-change-transform ${
                  tier.popular
                    ? "bg-zinc-950/90 border-2 border-brand-purple glow-purple-strong z-10"
                    : "bg-brand-card/70 border border-white/5 hover:border-white/15"
                }`}
              >
                {/* Animated glow overlay on popular card */}
                {tier.popular && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-purple/5 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                )}

                {/* Optional decorative tags on elite highlighted card container */}
                {tier.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 py-1 px-3 rounded-full bg-brand-purple text-[10px] font-bold uppercase tracking-widest text-white shadow-md shadow-brand-purple/40 flex items-center gap-1"
                  >
                    <Flame className="w-3 h-3 text-white fill-white animate-pulse" />
                    Most Requested Retainer
                  </motion.div>
                )}
                {!tier.popular && tier.badge && (
                  <div className="absolute top-4 right-4 py-0.5 px-2 rounded bg-white/5 border border-white/10 text-[8px] font-mono font-black text-zinc-400">
                    {tier.badge}
                  </div>
                )}

                <div>
                  {/* Tier Name */}
                  <h3 className="text-xl font-display font-bold text-white tracking-tight mb-2">
                    {tier.name}
                  </h3>

                  {/* Mini description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Price tag with count-up */}
                  <div className="mb-6 flex items-baseline gap-1 text-white">
                    <span className="text-sm font-medium text-zinc-500 font-mono">$</span>
                    <span className="text-4xl sm:text-5xl font-display font-black tracking-tight leading-none">
                      <span ref={countRef}>
                        {billingPeriod === "annually"
                          ? getDisplayPrice(tier.id, tier.price)
                          : value.toLocaleString()}
                      </span>
                    </span>
                    <span className="text-zinc-500 font-sans text-xs ml-1 font-semibold uppercase tracking-wider">
                      / {billingPeriod === "monthly" ? "mo" : "mo"}
                    </span>
                  </div>

                  {/* Features Bulletpoints checklist */}
                  <div className="pt-6 border-t border-white/5 space-y-3 mb-8">
                    <span className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider font-mono">Retainer Inclusions</span>
                    <ul className="space-y-3.5">
                      {tier.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + fIdx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                        >
                          <Check className="w-4 h-4 text-brand-glow shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => onBookCallClick?.()}
                  className={`w-full py-3 px-4 font-semibold text-sm rounded-xl transition-all cursor-pointer text-center ${
                    tier.popular
                      ? "bg-brand-purple hover:bg-brand-glow hover:shadow-lg hover:shadow-brand-purple/30 text-white"
                      : "bg-white/5 border border-white/10 hover:border-brand-purple hover:bg-white/10 text-white"
                  }`}
                >
                  {tier.ctaText}
                </button>

              </motion.div>
            );
          })}
        </div>

        {/* Footnote text */}
        <Reveal className="text-center text-[10px] text-zinc-500 uppercase tracking-widest mt-12 block font-mono">
          {footnote}
        </Reveal>

      </div>
    </section>
  );
}
