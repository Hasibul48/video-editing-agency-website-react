import React, { useState, useCallback, useEffect } from "react";
import { Star, MessageSquareCode, ShieldCheck, Quote, Play, X } from "lucide-react";
import type { Review } from "../types";
import { reviewsItems } from "../lib/wp-data";
import { motion, AnimatePresence } from "motion/react";
import { PremiumCard, Reveal, Stagger, fadeUp, premiumTransition, softScale } from "./MotionPrimitives";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

interface VideoItem {
  client: string;
  role: string;
  duration: string;
  videoFile?: string;
  youtubeId: string;
}

const defaultVideos: VideoItem[] = [
  { client: "Synthetix Labs", role: "Founder video testimonial",   duration: "00:48", youtubeId: "dQw4w9WgXcQ" },
  { client: "Aura Paris",     role: "Campaign result testimonial", duration: "01:12", youtubeId: "RgKAFK5djSk" },
  { client: "Synergy Group",  role: "Growth partner testimonial",  duration: "00:56", youtubeId: "JGwWNGJdvx8" },
  { client: "Vertex Systems", role: "Launch authority testimonial", duration: "01:05", youtubeId: "hT_nvWreIhg" },
  { client: "Nexus Agency",   role: "Creative director testimonial",duration: "00:52", youtubeId: "OPf0YbXqDm0" },
];

export default function Reviews() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const rawVideos = wd?.reviews?.videoTestimonials ?? [];
  const videos: VideoItem[] = rawVideos.length > 0
    ? rawVideos.map((v, i) => ({
        client: v.client,
        role: v.role,
        duration: v.duration,
        videoFile: v.videoFile ?? '',
        youtubeId: v.youtubeId || (defaultVideos[i] || defaultVideos[0]).youtubeId,
      }))
    : defaultVideos;

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const openPlayer = useCallback((video: VideoItem) => setActiveVideo(video), []);
  const closePlayer = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePlayer();
    };
    if (activeVideo) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeVideo, closePlayer]);

  const handleSlideChange = useCallback((swiper: any) => {
    const realIndex = swiper.realIndex;
    const slideEls = swiper.el.querySelectorAll(".swiper-slide");
    slideEls.forEach((el: HTMLElement, i: number) => {
      const isCenter = i === realIndex;
      const playBtn = el.querySelector("[data-play-btn]") as HTMLElement;
      if (playBtn) playBtn.style.display = isCenter ? "flex" : "none";
    });
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-brand-dark/20 overflow-hidden"
    >
      {/* Visual lighting */}
      <div className="absolute top-[30%] left-[-15%] w-80 h-80 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-glow/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/5 border border-white/10 text-xs font-bold text-brand-glow uppercase tracking-widest mb-4">
            <MessageSquareCode className="w-3.5 h-3.5 text-brand-purple" />
            <span>PROVEN TRACTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-4">
            What Our Clients Say.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            We partner with high-growth enterprise SaaS players, high-fashion campaigns, and elite tech partners to dominate attention spaces completely. Review actual quotes detailing performance results.
          </p>
        </Reveal>

        {/* === 3D Coverflow Video Slider === */}
        <Reveal className="mb-16 pb-12 border-b border-white/5">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              CLIENT VIDEO TESTIMONIALS
            </p>
            <span className="text-[10px] text-zinc-600 font-mono tracking-wider">
              DRAG TO EXPLORE
            </span>
          </div>

          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            initialSlide={0}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 220,
              modifier: 1.2,
              slideShadows: false,
            }}
            mousewheel={{
              thresholdDelta: 30,
              thresholdTime: 0.5,
            }}
            modules={[EffectCoverflow, Mousewheel]}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            onInit={handleSlideChange}
            className="!pb-6"
            breakpoints={{
              320: { coverflowEffect: { depth: 120, modifier: 0.8 } },
              768: { coverflowEffect: { depth: 220, modifier: 1.2 } },
            }}
          >
            {videos.map((video, idx) => (
              <SwiperSlide key={idx} className="!w-[260px] sm:!w-[320px] md:!w-[400px]">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 select-none">
                  {video.videoFile ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-purple/20 to-zinc-950">
                      <Play className="w-12 h-12 text-white/30" />
                    </div>
                  ) : (
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.client}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading="lazy"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Play button — only visible on the active/center slide */}
                  <button
                    data-play-btn
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPlayer(video);
                    }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-brand-purple hover:border-brand-purple transition-all duration-300 shadow-lg shadow-black/30">
                      <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                    </span>
                  </button>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                    <p className="text-white font-display font-semibold text-sm leading-tight">
                      {video.client}
                    </p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      {video.role}
                    </p>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur border border-white/10 px-2 py-0.5 text-[10px] font-mono text-zinc-300 font-bold pointer-events-none">
                    {video.duration}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        {/* Floating Testimonial Cards structure */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsItems().map((review: Review) => (
            <PremiumCard
              key={review.id}
              variants={softScale}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={premiumTransition}
              className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-brand-purple/80 hover:shadow-2xl hover:shadow-brand-purple/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Background large decorative quote sign */}
              <div className="absolute right-6 top-6 text-white/[0.02] group-hover:text-brand-purple/[0.04] transition-colors">
                <Quote className="w-24 h-24 stroke-[1.5px]" />
              </div>

              <div>
                {/* Visual stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-glow fill-brand-glow stroke-[1.5px]" />
                  ))}
                </div>

                {/* Client Quote */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic mb-8 relative z-10 font-light">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Credits panel */}
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div>
                  <h4 className="text-white font-display font-semibold text-sm tracking-wide">
                    {review.author}
                  </h4>
                  <p className="text-zinc-500 text-xs mt-0.5 font-normal">
                    {review.role}
                  </p>
                </div>

                {/* Brand moniker tag */}
                <span className="py-1 px-2.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-brand-purple font-bold">
                  {review.companyName}
                </span>
              </div>

            </PremiumCard>
          ))}
        </Stagger>

        {/* High-end trust metric card */}
        <Reveal className="mt-12 glass-panel p-6 rounded-2xl border border-brand-purple/20 max-w-3xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck className="w-20 h-20 text-brand-glow" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed relative z-10">
            "We command a strict, non-disclosure-driven service delivery layer to guard the visual advantages of our primary enterprise partners." <span className="text-brand-glow font-bold">— Brandjo Executive Counsel</span>
          </p>
        </Reveal>

      </div>

      {/* === Video Player Modal === */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closePlayer}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-brand-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closePlayer}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 text-zinc-400 hover:text-white hover:bg-brand-purple/30 hover:border-brand-purple/40 transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-0 left-0 right-0 z-10 flex items-center px-4 py-2.5 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                  CLIENT TESTIMONIAL
                </span>
                <span className="ml-auto text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                  {activeVideo.client}
                </span>
              </div>

              <div className="aspect-video w-full bg-black relative">
                {activeVideo.videoFile ? (
                  <video
                    className="absolute inset-0 w-full h-full object-contain"
                    src={activeVideo.videoFile}
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                  />
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeVideo.client}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-3 text-[11px] text-zinc-600 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-glow" />
                  STREAM ACTIVE
                </span>
                <span className="text-zinc-600">ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
