import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onBookCallClick?: () => void;
}

export default function Navbar({ onBookCallClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (typeof window !== 'undefined' && window.wpData?.navLinks) || [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-3 bg-zinc-950/80 backdrop-blur-md border-b border-white/5" 
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <a href="#home" className="flex items-center gap-2 group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-glow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-purple"></span>
              </span>
              <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-brand-glow transition-colors">
                Brandjo<span className="text-brand-purple font-light"> Media</span>
              </span>
            </a>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 hover:text-white hover:shadow-[0_2px_0_0_#8B5CF6] transition-all pb-1 tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className="hidden md:flex items-center gap-4">
              <button
                type="button"
                onClick={() => onBookCallClick?.()}
                className="w-full sm:w-auto px-5 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/60 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-0 z-40 sm:hidden"
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              <nav className="flex flex-col items-center gap-6 text-lg">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium">
                    {link.name}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => {
                  onBookCallClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full max-w-[200px] py-2.5 px-4 rounded-lg bg-brand-purple hover:bg-brand-purple/90 text-white font-medium text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/60 hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
