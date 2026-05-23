import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from "lucide-react";
import type { FAQItem } from "../types";
import { faqItems } from "../lib/wp-data";
import { motion, AnimatePresence } from "motion/react";
import { PremiumCard, Reveal, Stagger, premiumTransition, softScale } from "./MotionPrimitives";

export default function FAQ() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const f = wd?.faq;
  const sectionHeader  = f?.sectionHeader  ?? 'KNOWLEDGE GRID';
  const sectionTitle   = f?.sectionTitle   ?? 'Frequently Answered Questions.';
  const supportCallout = f?.supportCallout ?? 'Have other proprietary questions?';
  const supportSubtext = f?.supportSubtext ?? 'Our executive partners are active in managing corporate inquiry streams.';
  const supportCta     = f?.supportCta     ?? 'Ask Executive Team';

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="faq" 
      className="relative py-24 bg-brand-dark/20 overflow-hidden"
    >
      {/* Decorative radial gradients */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] rounded-full bg-brand-glow/5 blur-[125px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/5 border border-white/10 text-xs font-bold text-brand-glow uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-brand-purple" />
            <span>{sectionHeader}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-4">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Have questions regarding working models, timelines, distribution scales or retainer scopes? Review our compiled logistical brief below.
          </p>
        </Reveal>

        {/* FAQs Collapsible layout list */}
        <Stagger className="space-y-4">
          {faqItems().map((faq: FAQItem) => {
            const isOpen = openId === faq.id;
            return (
              <PremiumCard
                key={faq.id}
                variants={softScale}
                whileHover={{ x: 4 }}
                transition={premiumTransition}
                className="rounded-2xl border border-white/5 bg-brand-card/50 overflow-hidden transition-all duration-300"
              >
                
                {/* Active hover toggle bar */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white tracking-wide pr-4">
                    {faq.question}
                  </span>
                  
                  {/* Rotating trigger chevron */}
                  <div className={`p-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-glow border-brand-purple/35 bg-brand-purple/10" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated collapse item */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 bg-black/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </PremiumCard>
            );
          })}
        </Stagger>

        {/* Support Callout Footer */}
        <Reveal className="mt-12 text-center p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-left max-sm:text-center max-sm:flex-col">
            <div className="p-2.5 rounded bg-brand-purple/10 border border-brand-purple/20 text-brand-glow shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">{supportCallout}</h4>
              <p className="text-zinc-500 text-xs">{supportSubtext}</p>
            </div>
          </div>
          <a
            href="#contact"
            className="py-2 px-4 rounded bg-white/5 border border-white/10 hover:border-brand-purple text-xs font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {supportCta}
          </a>
        </Reveal>

      </div>
    </section>
  );
}
