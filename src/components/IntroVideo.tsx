import React, { useState, useMemo, useEffect } from "react";
import {
  Play, ShieldCheck, Zap, Layers, Eye, Film, X,
  Maximize2, Volume2, Clock, BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, fadeUp, premiumTransition } from "./MotionPrimitives";

const premiumEase = [0.22, 1, 0.36, 1];

const floatKeyframes = {
  y: [0, -12, 0],
  rotate: [0, 3, 0],
};
const floatTransition = (i: number) => ({
  duration: 5 + i * 1.2,
  repeat: Infinity,
  ease: "easeInOut",
  delay: i * 0.6,
});

const neonPulse = {
  boxShadow: [
    "0 0 20px -5px rgba(139,92,246,0.3)",
    "0 0 40px -2px rgba(139,92,246,0.6)",
    "0 0 20px -5px rgba(139,92,246,0.3)",
  ],
};

export default function IntroVideo() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const iv = wd?.introVideo;
  const youtubeId      = iv?.youtubeId      ?? 'fwOnVwdbTFo';
  const videoFile      = iv?.videoFile      ?? '';
  const sectionHeader  = iv?.sectionHeader  ?? 'EXECUTIVE BRIEF';
  const sectionTitle   = iv?.sectionTitle   ?? 'See How We Build Attention.';
  const description    = iv?.description    ?? 'We bypass traditional advertising hurdles. By introducing a rigid pipeline of custom content strategy, high-fidelity video editing, brand positioning elements, and automatic organic distribution systems, we scale user authority organically.';
  const bs = typeof window !== 'undefined' ? window.wpData?.buttonSettings : undefined;
  const playButtonText = bs?.introVideoPlayText || 'Launch Cinematic Reel';
  const duration       = iv?.duration       ?? '1 min 24 sec';
  const floatingNodes  = iv?.floatingNodes  ?? [];

  const [isPlayingReel, setIsPlayingReel] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPlayingReel(false);
    };
    if (isPlayingReel) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isPlayingReel]);

  const floatingConfig = useMemo(() => {
    const cfgs = [
      { label: 'Strategy',     icon: Zap,        color: 'text-brand-glow',    glow: 'shadow-brand-glow/20' },
      { label: 'Positioning',  icon: ShieldCheck, color: 'text-brand-purple',  glow: 'shadow-brand-purple/20' },
      { label: 'Social Growth',icon: Eye,         color: 'text-emerald-400',   glow: 'shadow-emerald-400/20' },
      { label: 'Aesthetics',   icon: Layers,      color: 'text-purple-400',    glow: 'shadow-purple-400/20' },
    ];
    const positions = [
      '-left-18 top-10', '-right-20 top-20', '-left-22 bottom-14', '-right-18 bottom-6',
    ];
    return floatingNodes.slice(0, 4).map((node, i) => {
      const cfg = cfgs[i] || cfgs[0];
      const IconComp = cfg.icon;
      const colonIdx = node.indexOf(' - ');
      return {
        label: colonIdx > 0 ? node.slice(0, colonIdx) : cfg.label,
        desc: colonIdx > 0 ? node.slice(colonIdx + 3) : node,
        IconComp,
        color: cfg.color,
        glow: cfg.glow,
        position: positions[i] || positions[0],
        index: i,
      };
    });
  }, [floatingNodes]);

  return (
    <section
      id="video-reel"
      className="relative py-28 md:py-36 bg-brand-dark overflow-hidden"
    >
      {/* === Premium ambient lighting layers === */}
      <div className="absolute top-[25%] left-[5%] w-[600px] h-[600px] rounded-full bg-brand-purple/8 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-glow/6 blur-[200px] pointer-events-none" />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

      {/* Subtle horizontal beam */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/10 to-transparent pointer-events-none" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ffffff01_2px,#ffffff01_4px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* === Section Header — Premium elevated === */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-brand-glow tracking-[0.2em] font-semibold uppercase mb-5">
            <Film className="w-3.5 h-3.5" />
            <span>{sectionHeader}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-5">
            <span className="text-white">{sectionTitle.replace('.', '')}</span>
            <span className="text-gradient">.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            {description}
          </p>
          {/* Animated accent bar */}
          <motion.div
            className="mx-auto mt-6 h-[2px] w-16 bg-gradient-to-r from-brand-purple/0 via-brand-glow to-brand-purple/0 rounded-full"
            animate={{ width: ['4rem', '8rem', '4rem'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Reveal>

        {/* === Video Showcase + Floating Nodes === */}
        <Reveal className="relative max-w-5xl mx-auto">

          {/* Floating feature cards with levitation */}
          {floatingConfig.map((item) => {
            const IconComp = item.IconComp;
            return (
              <motion.div
                key={item.index}
                className={`hidden lg:flex absolute ${item.position} glass-panel p-4 rounded-xl border border-white/10 shadow-xl max-w-[190px] z-20 cursor-default`}
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 5 + item.index * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.index * 0.7,
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(139,92,246,0.4)' }}
              >
                <div className={`flex items-center gap-2 ${item.color} font-display font-bold text-xs uppercase tracking-wider mb-1.5`}>
                  <span className="p-1 rounded-md bg-white/5">
                    <IconComp className="w-3.5 h-3.5" />
                  </span>
                  {item.label}
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}

          {/* === Core Video Player Mockup === */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-purple/25 group"
            animate={neonPulse}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Neon border glow ring */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-brand-purple/30 via-transparent to-brand-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Player surface */}
            <div className="relative aspect-video w-full bg-zinc-950 flex items-center justify-center overflow-hidden">

              {/* Blurred preview background */}
              <img
                src={`${typeof window !== 'undefined' && window.wpData?.themeUri ? window.wpData.themeUri : ''}/assets/images/brandjo_hero_bg_1779378368447.png`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/30" />

              {/* Cinematic letterbox bars */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

              {/* Scan line animation */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-glow/40 to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* === Audio visualizer bars === */}
              <div className="absolute bottom-16 right-6 flex items-end gap-[3px] opacity-40">
                {[4, 7, 5, 9, 6, 8, 3, 10, 5].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-brand-glow"
                    animate={{ height: [`${h}px`, `${h + 8}px`, `${h}px`] }}
                    transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                  />
                ))}
              </div>

              {/* === Center Play Button === */}
              <div className="relative z-10 text-center">
                <button
                  type="button"
                  onClick={() => setIsPlayingReel(true)}
                  className="relative group/btn inline-flex items-center justify-center w-24 h-24 rounded-full cursor-pointer"
                >
                  {/* Outer rotating ring */}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-brand-purple/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Middle pulsing ring */}
                  <span className="absolute inset-2 rounded-full bg-brand-purple/20 animate-ping opacity-75" style={{ animationDuration: '2.5s' }} />
                  {/* Inner glow ring */}
                  <span className="absolute -inset-3 rounded-full border border-brand-glow/20 animate-pulse" style={{ animationDuration: '3s' }} />

                  {/* Button core */}
                  <span className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-brand-purple to-violet-600 shadow-xl shadow-brand-purple/30 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:shadow-brand-purple/50 transition-all duration-500">
                    <Play className="w-9 h-9 fill-white translate-x-0.5 text-white drop-shadow-lg" />
                  </span>
                </button>

                <div className="mt-6 space-y-1">
                  <span className="text-sm uppercase tracking-[0.25em] text-zinc-400 font-bold block">
                    {playButtonText}
                  </span>

                </div>
              </div>

              {/* === Telemetry HUD Overlays === */}
              {/* Top left — recording dot */}
              <div className="absolute top-5 left-5 font-mono text-[10px] text-zinc-500 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="tracking-wider">REC // REEL_STREAMS</span>
              </div>

              {/* Top right — telemetry data */}
              <div className="absolute top-5 right-5 flex items-center gap-3 font-mono text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" /> 4K@60
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3" /> -2.4dB
                </span>
              </div>

              {/* Bottom left — status */}
              <div className="absolute bottom-5 left-5 font-mono text-[10px] text-zinc-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
                <span>SYS: NOMINAL • BITRATE 52.4 Mbps</span>
              </div>

              {/* Bottom right — badge */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <span className="text-[10px] font-semibold py-1 px-2.5 rounded bg-black/50 backdrop-blur text-brand-glow border border-white/5 font-mono tracking-wider">
                  DOLBY ATMOS
                </span>
                <span className="text-[10px] font-semibold py-1 px-2.5 rounded bg-black/50 backdrop-blur text-white/70 border border-white/5 font-mono">
                  HDR10+
                </span>
              </div>

              {/* === Bottom timeline scrubber === */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-purple via-brand-glow to-brand-purple"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 8, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>

          {/* === Bottom metadata bar === */}
          <div className="mt-5 flex items-center justify-between text-[11px] text-zinc-600 px-1 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-purple" />
              CINEMATIC REEL • SHOWREEL v2.4
            </span>
            <span className="flex items-center gap-1 text-zinc-500">
              <Maximize2 className="w-3 h-3" />
              <span>CLICK TO EXPAND</span>
            </span>
          </div>

        </Reveal>
      </div>

      {/* === Premium Fullscreen Modal === */}
      <AnimatePresence>
        {isPlayingReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="relative w-full max-w-5xl rounded-2xl border border-brand-purple/30 shadow-2xl shadow-brand-purple/10 bg-brand-card/95 p-2"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsPlayingReel(false)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 backdrop-blur border border-white/10 text-zinc-400 hover:text-white hover:bg-brand-purple/30 hover:border-brand-purple/40 transition-all cursor-pointer"
                aria-label="Close showreel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  NOW PLAYING
                </span>
                <span className="text-[10px] font-mono text-zinc-500">{duration}</span>
              </div>

              {/* Video container */}
              <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative">
                {videoFile ? (
                  <video
                    className="absolute inset-0 w-full h-full object-contain"
                    src={videoFile}
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                  />
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Brandjo Media Cinematic Showreel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Bottom info bar */}
              <div className="flex items-center justify-between px-4 py-3 text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  STREAM ACTIVE • 4K HDR
                </span>
                <span className="text-zinc-600">PRESS ESC TO CLOSE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
