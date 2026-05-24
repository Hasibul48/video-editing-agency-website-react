import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Star, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { PremiumCard, Stagger, fadeUp, premiumTransition, softScale } from "./MotionPrimitives";

interface CountUpValueProps {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function CountUpValue({ end, decimals = 0, suffix = "", duration = 1800 }: CountUpValueProps) {
  const [value, setValue] = useState(0);
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

      setValue(end * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration, end, shouldAnimate]);

  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={elementRef}>
      {displayValue}
      {suffix}
    </span>
  );
}

function parseStatValue(value: string): { end: number; suffix: string; decimals: number } {
  const m = value.match(/^([\d.]+)(.*)$/);
  if (!m) return { end: 0, suffix: '', decimals: 0 };
  const num = m[1]; const sfx = m[2];
  return { end: parseFloat(num), suffix: sfx, decimals: num.includes('.') ? num.split('.')[1].length : 0 };
}

const statIcons = [TrendingUp, Sparkles, Star];

export default function Hero() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const themeUri = wd?.themeUri ?? '';
  const heroBgPath = themeUri ? `${themeUri}/assets/images/brandjo_hero_bg_1779378368447.png` : "/src/assets/images/brandjo_hero_bg_1779378368447.png";
  const hero = wd?.hero;

  const headline           = hero?.headline           ?? 'Content That Makes Brands';
  const headlineHighlight  = hero?.headlineHighlight  ?? 'Impossible to Ignore.';
  const subheadline        = hero?.subheadline        ?? 'We help premium brands grow scaling attention through cinematic content, high-value strategic storytelling, and performance-driven growth marketing systems.';
  const ctaPrimary  = hero?.ctaPrimary  ?? 'Start Your Brand';
  const ctaSecondary= hero?.ctaSecondary ?? 'View Projects';
  const scrollText  = hero?.scrollText  ?? 'DISCOVER THE MOVEMENT';
  const bs = typeof window !== 'undefined' ? window.wpData?.buttonSettings : undefined;
  const ctaPrimaryUrl = bs?.heroCtaPrimaryUrl || '#';
  const ctaSecondaryUrl = bs?.heroCtaSecondaryUrl || '#projects';
  const scrollUrl = bs?.heroScrollUrl || '#video-reel';
  const stats       = hero?.stats ?? [
    { value: '120M+', label: 'Views Generated', description: 'Through strategic, high-retention cinematic concepts.' },
    { value: '50+',   label: 'Brands Scaled',   description: 'Enterprise SaaS, luxury fashion, and elite personal networks.' },
    { value: '4.9',   label: 'Client Satisfaction', description: 'Uncompromising service standards and real revenue ROI.' },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Cinematic Abstract Hero Image Background layer with glowing glassmorphism masks */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={heroBgPath} 
          alt="Brandjo Media Futuristic 3D Grid Abstract Background" 
          className="w-full h-full object-cover opacity-35 md:opacity-40 animate-fade-in"
          referrerPolicy="no-referrer"
          animate={{ scale: [1, 1.035, 1], x: [0, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Deep vignette gradients masking the image smoothly into dark edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark" />
        
        {/* Floating Neon lines & orbs (Animated purely via CSS) */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-brand-purple/20 blur-[120px]"
          animate={{ y: [0, -24, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-brand-glow/15 blur-[160px]"
          animate={{ y: [0, 28, 0], x: [0, 18, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <Stagger className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6" amount={0.1}>
        
        {/* Micro brand tag badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-brand-glow uppercase mb-6 sm:mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-spin" style={{ animationDuration: '6s' }} />
          <span>Cinematic Attention Architects</span>
        </motion.div>

        {/* Large Bold Headline */}
        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05] mb-6">
          {headline} <br className="hidden md:inline" />
          <span className="text-gradient">{headlineHighlight}</span>
        </motion.h1>

        {/* Professional Subheadline */}
        <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          {subheadline}
        </motion.p>

        {/* CTA Actions */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={ctaPrimaryUrl}
            className="w-full sm:w-auto px-8 py-4 bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold text-base rounded-xl transition-all shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/60 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            {ctaPrimary}
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <a
            href={ctaSecondaryUrl}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-semibold text-base rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {ctaSecondary}
          </a>
        </motion.div>

        {/* Interactive Stats Grid (Glassmorphism layout) */}
        <motion.div variants={softScale} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, idx) => {
            const IconComp = statIcons[idx] || Star;
            const { end, suffix, decimals } = parseStatValue(stat.value);
            const isLast = idx === stats.length - 1;

            return (
              <PremiumCard key={idx} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} transition={premiumTransition} className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-brand-purple/30 transition-colors">
                <div className="absolute top-0 right-0 p-3 opacity-15">
                  <IconComp className="w-12 h-12 text-brand-glow" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-1 flex items-center gap-1 justify-center">
                  <CountUpValue end={end} suffix={suffix} decimals={decimals} />
                  {isLast && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                </div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium font-sans">
                  {stat.label}
                </div>
                <div className="mt-2 text-zinc-500 text-xs text-left max-sm:text-center">
                  {stat.description}
                </div>
              </PremiumCard>
            );
          })}
        </motion.div>

        {/* Scroll down mouse indicator */}
        <motion.div variants={fadeUp} className="mt-16 flex justify-center">
          <a 
            href={scrollUrl} 
            className="flex flex-col items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <span>{scrollText}</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-brand-purple" />
          </a>
        </motion.div>

      </Stagger>
    </section>
  );
}
