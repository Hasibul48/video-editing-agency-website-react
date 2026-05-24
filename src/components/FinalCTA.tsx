import React from "react";
import { Sparkles, ArrowRight, Video, Target } from "lucide-react";
import { motion } from "motion/react";
import { Stagger, fadeUp } from "./MotionPrimitives";

export default function FinalCTA() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const fc = wd?.finalCta;
  const bs = wd?.buttonSettings;
  const headline           = fc?.headline           ?? 'Your Brand Deserves';
  const headlineHighlight  = fc?.headlineHighlight  ?? 'More Attention.';
  const subheadline        = fc?.subheadline        ?? 'Let\'s build content people actually remember. Stop burning resources on low-retention updates. Harness high-fidelity cinematic video engines and custom conversion matrices instead.';
  const buttonText         = fc?.buttonText         ?? 'Book Your Strategy Call';
  const limitText          = fc?.limitText          ?? 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER';
  const buttonUrl          = bs?.finalCtaButtonUrl   || '#contact';
  return (
    <section 
      id="contact" 
      className="relative py-28 bg-[#09090B] overflow-hidden border-t border-white/5"
    >
      {/* Background Graphic elements mimicking luxury light sweeps and cinematic haze */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={`${wd?.themeUri ?? ''}/assets/images/brandjo_hero_bg_1779378368447.png`}
          alt="Cinematic background flare" 
          className="w-full h-full object-cover opacity-15"
          referrerPolicy="no-referrer"
          animate={{ scale: [1, 1.04, 1], x: [0, 12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark" />
        {/* Neon orbs */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-purple/20 blur-[130px] pointer-events-none" />
      </div>

      <Stagger className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Pulse beacon icon spacer */}
        <motion.div variants={fadeUp} className="inline-flex p-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-glow mb-8 animate-pulse">
          <Target className="w-8 h-8" />
        </motion.div>

        {/* Closing Titles */}
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.1] mb-6">
          {headline} <br className="xs:hidden" />
          <span className="text-gradient">{headlineHighlight}</span>
        </motion.h2>
        
        <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          {subheadline}
        </motion.p>

        {/* CTA book action trigger */}
        <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-3">
          <a
            href={buttonUrl}
            className="w-full sm:w-auto px-10 py-5 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold text-base rounded-xl transition-all shadow-xl shadow-brand-purple/30 hover:shadow-brand-purple/60 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-2 block font-mono">
            {limitText}
          </span>
        </motion.div>

      </Stagger>
    </section>
  );
}
