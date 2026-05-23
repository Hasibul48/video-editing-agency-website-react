import React from "react";
import * as Icons from "lucide-react";
import type { Service } from "../types";
import { servicesItems } from "../lib/wp-data";
import { motion } from "motion/react";
import { PremiumCard, Reveal, Stagger, fadeUp, premiumTransition, softScale } from "./MotionPrimitives";

// Dynamic Icon resolver helper
function ServiceIcon({ name, className }: { name: string; className: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Sparkles className={className} />;
  return <IconComponent className={className} />;
}

export default function Services() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const s = wd?.services;
  const sectionHeader = s?.sectionHeader ?? 'SPECIALIZED CAPABILITIES';
  const sectionTitle  = s?.sectionTitle  ?? 'A Complete Brand Growth Architecture.';
  const sectionSubtext= s?.sectionSubtext ?? 'We don\'t sell hours or simple generic edits. We build high-throughput creative systems that integrate premium storytelling directly into qualified lead generation.';

  return (
    <section 
      id="services" 
      className="relative py-24 bg-brand-dark overflow-hidden"
    >
      {/* Decorative vector overlays */}
      <div className="absolute top-[20%] right-[5%] w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-glow/8 blur-[165px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold text-brand-glow uppercase tracking-widest mb-3">
              <span>{sectionHeader}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {sectionTitle}
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
            {sectionSubtext}
          </p>
        </Reveal>

        {/* Services Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesItems().map((service, idx) => (
            <PremiumCard
              key={service.id}
              variants={softScale}
              whileHover={{ y: -10, scale: 1.015 }}
              transition={premiumTransition}
              className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-brand-purple/40 neon-border-hover transition-all duration-300 hover:-translate-y-1 block"
            >
              {/* Decorative subtle numbering */}
              <div className="absolute top-5 right-6 font-mono text-sm text-zinc-700 select-none group-hover:text-brand-purple/30 transition-colors">
                0{idx + 1}
              </div>

              {/* Icon Container with glowing background */}
              <div className="relative mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/30 text-white group-hover:text-brand-glow transition-all">
                <ServiceIcon name={service.iconName} className="w-6 h-6 relative z-10" />
                <div className="absolute inset-0 rounded-xl bg-brand-purple/10 blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-display font-bold text-white tracking-tight mb-2 group-hover:text-brand-glow transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Key Deliverables bullets */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">TACTICAL FOCUS:</div>
                <ul className="grid grid-cols-1 gap-2.5">
                  {service.benefits.map((benefit, bIdx) => (
                    <motion.li key={bIdx} variants={fadeUp} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                      <span className="w-1 h-1 rounded-full bg-brand-purple" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Subtle bottom accent line that glows on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple/0 to-transparent group-hover:via-brand-purple/70 transition-all duration-500" />
            </PremiumCard>
          ))}
        </Stagger>

      </div>
    </section>
  );
}
