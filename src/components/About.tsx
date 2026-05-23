import React, { useEffect, useRef, useState } from "react";
import { Compass, Sparkles, Zap, ShieldAlert, Award, FileText } from "lucide-react";
import { timelineItems } from "../lib/wp-data";
import { motion } from "motion/react";
import { PremiumCard, Reveal, Stagger, fadeUp, premiumTransition, softScale } from "./MotionPrimitives";

interface CountDownValueProps {
  start: number;
  end: number;
  suffix?: string;
  duration?: number;
}

function CountDownValue({ start, end, suffix = "", duration = 1700 }: CountDownValueProps) {
  const [value, setValue] = useState(start);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldAnimate(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    let animationFrame = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setValue(start - (start - end) * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration, end, shouldAnimate, start]);

  return (
    <span ref={elementRef}>
      {Math.round(value)}
      {suffix}
    </span>
  );
}

function parseAboutValue(value: string): { start: number; end: number; suffix: string } {
  const m = value.match(/^([\d]+)(\+?)(.*)$/);
  if (!m) return { start: 0, end: 0, suffix: '' };
  const num = parseInt(m[1], 10);
  const s = m[2] + m[3];
  return { start: num * 2, end: num, suffix: s };
}

export default function About() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const ab = wd?.about;
  const aboutStats = ab?.stats ?? [
    { value: '250+', label: 'Projects Completed' },
    { value: '40M+', label: 'Monthly Reach Generated' },
    { value: '7-Fig', label: 'Client Revenue Generated' },
  ];
  const manifesto = ab?.manifesto ?? [
    'In an era of generic reels and saturated algorithmic feeds, standard marketing fails immediately. Fading into the digital noise is the absolute highest expense a modern premium enterprise can pay.',
    'Brandjo Media was established to rewrite standard outreach playbook boundaries. We combine the stylistic elegance of luxury fashion houses with the rigid, metrics-first tracking protocols of a modern SaaS engineering firm to position your brand as the only true logical option in your market space.',
  ];
  const qualityBadge = ab?.qualityBadge ?? 'Elite Creative Production Standards - No stock elements, no cookie-cutter templates, no exceptions.';

  return (
    <section 
      id="about" 
      className="relative py-24 bg-brand-dark/20 overflow-hidden"
    >
      {/* Decorative gradients */}
      <div className="absolute top-[40%] right-[-15%] w-96 h-96 rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-80 h-80 rounded-full bg-brand-glow/8 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main split grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Brandjo Manifesto & Stats */}
          <Stagger className="lg:col-span-5 space-y-8">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-brand-purple/15 border border-brand-purple/30 text-xs font-bold text-brand-glow uppercase tracking-widest mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>AGENCY MANIFESTO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Built for Modern Brands.
              </h2>
            </motion.div>

            {manifesto.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">{p}</motion.p>
            ))}

            {/* Glowing Infographic elements / counters */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {aboutStats.map((stat, sIdx) => {
                const { start, end, suffix } = parseAboutValue(stat.value);
                return (
                  <div key={sIdx} className="space-y-1.5">
                    <span className="block text-3xl font-display font-black text-brand-glow tracking-tight leading-none">
                      <CountDownValue start={start} end={end} suffix={suffix} />
                    </span>
                    <span className="block text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Quality trust seal badge */}
            <PremiumCard variants={softScale} whileHover={{ y: -5, scale: 1.01 }} transition={premiumTransition} className="glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-3 relative overflow-hidden">
              <div className="p-2 rounded bg-brand-purple/10 border border-brand-purple/20 text-brand-glow">
                <Award className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-xs">
                <span className="text-white font-semibold block">{qualityBadge.split(' - ')[0] || 'Elite Creative Production Standards'}</span>
                <span className="text-zinc-500 block">{qualityBadge.split(' - ')[1] || qualityBadge}</span>
              </div>
            </PremiumCard>

          </Stagger>

          {/* RIGHT SIDE: Animated workflow timeline process */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <h3 className="text-lg font-display font-semibold text-white uppercase tracking-wider mb-2">
                Our Production Workflow Process
              </h3>
              <p className="text-zinc-500 text-xs font-mono">
                [RIGID STREAMLINED CO-DELIVERY PROTOCOL]
              </p>
            </Reveal>

            <Stagger className="relative pl-6 sm:pl-8 ml-3 space-y-6 pt-2">
              {/* Animated timeline connector line */}
              <motion.div
                className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand-purple via-brand-glow to-brand-purple origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '100%' }}
              />
              <div className="absolute left-0 top-0 w-px bg-white/5" style={{ height: '100%' }} />
              {timelineItems().map((event, idx) => (
                <PremiumCard
                  key={event.id}
                  variants={fadeUp}
                  whileHover={{ x: 8 }}
                  transition={premiumTransition}
                  className="relative group block"
                >
                  {/* Decorative timeline node circle dot */}
                  <div className="absolute -left-12 top-1.5 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-brand-dark border-2 border-zinc-700 flex items-center justify-center group-hover:border-brand-purple transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-brand-purple transition-all duration-300" />
                    </div>
                  </div>

                  {/* Progressive phase indicator absolute bubble tag */}
                  <span className="inline-block text-[9px] font-mono tracking-widest text-[#F4F4F5] uppercase font-bold py-0.5 px-2 rounded bg-white/5 border border-white/10 mb-2">
                    {event.year}
                  </span>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-display font-semibold text-white tracking-wide mb-1 group-hover:text-brand-glow transition-colors">
                    {event.title}
                  </h4>

                  {/* Detail description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                    {event.description}
                  </p>

                </PremiumCard>
              ))}
            </Stagger>

          </div>

        </div>

      </div>
    </section>
  );
}
