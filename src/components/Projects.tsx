import { useState, useCallback, useEffect } from "react";
import { Play, X, FolderGit2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, stagger, fadeUp } from "./MotionPrimitives";

interface ProjectItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
}

const projects: ProjectItem[] = [
  {
    id: "p1",
    videoId: "dQw4w9WgXcQ",
    title: "Never Gonna Give You Up",
    description: "High-energy music video production — color grading, rhythm cutting, and dynamic motion graphics.",
  },
  {
    id: "p2",
    videoId: "RgKAFK5djSk",
    title: "See You Again",
    description: "Cinematic storytelling through seamless transitions, emotional pacing, and atmospheric sound design.",
  },
  {
    id: "p3",
    videoId: "JGwWNGJdvx8",
    title: "Shape of You",
    description: "Abstract visual narrative with stylised overlays, split-screen composition, and branded title sequences.",
  },
  {
    id: "p4",
    videoId: "hT_nvWreIhg",
    title: "Counting Stars",
    description: "Live concert footage edited into a high-impact promotional cut with multi-camera sync.",
  },
  {
    id: "p5",
    videoId: "OPf0YbXqDm0",
    title: "Uptown Funk",
    description: "Retro-inspired commercial edit with frame-perfect beatsync and vibrant colour LUTs.",
  },
  {
    id: "p6",
    videoId: "CevxZvSJLk8",
    title: "Roar",
    description: "Brand empowerment reel combining slow-motion hero shots with typographic kinetic text.",
  },
  {
    id: "p7",
    videoId: "HP-MbfHFUqs",
    title: "Shake It Off",
    description: "Fast-paced social cut designed for vertical platforms — quick jumps, overlay stickers, and bold captions.",
  },
];

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.id === activeId) ?? null;

  const open = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (activeId) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeId, close]);

  return (
    <section
      id="projects"
      className="relative py-24 bg-brand-dark overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-[15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-glow/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-purple tracking-widest font-semibold uppercase mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Projects.
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-lg mx-auto">
            A selection of recent edits we crafted for artists, brands, and creators.
          </p>
        </Reveal>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {projects.map((project) => (
            <motion.button
              key={project.id}
              variants={fadeUp}
              type="button"
              onClick={() => open(project.id)}
              className="group relative rounded-xl overflow-hidden bg-brand-card border border-white/5 hover:border-brand-purple/30 cursor-pointer text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-zinc-950">
                <img
                  src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/10 to-transparent" />

                {/* Play icon — visible on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-300">
                    <Play className="w-5 h-5 text-white group-hover:text-white fill-white group-hover:fill-white translate-x-0.5 transition-colors duration-300" />
                  </span>
                </div>

                {/* Hover text label bottom-left */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur text-[10px] uppercase tracking-widest text-brand-glow font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Watch the Project
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="text-sm font-display font-semibold text-white tracking-tight mb-1 group-hover:text-brand-glow transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-brand-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={close}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 text-zinc-400 hover:text-white hover:bg-brand-purple/30 hover:border-brand-purple/40 transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center px-4 py-2.5 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                  NOW PLAYING
                </span>
                <span className="ml-auto text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                  {activeProject.title}
                </span>
              </div>

              {/* Video */}
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeProject.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Bottom info */}
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
