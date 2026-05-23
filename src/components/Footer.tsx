import React from "react";
import { Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, ArrowUp } from "lucide-react";
import { Reveal } from "./MotionPrimitives";

const socialIconMap: Record<string, React.ElementType> = { linkedin: Linkedin, twitter: Twitter, instagram: Instagram, youtube: Youtube };

export default function Footer() {
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const sl = wd?.socialLinks;
  const nl = wd?.navLinks;

  const socialLinks = sl ? Object.entries(sl).map(([platform, url]) => ({
    name: platform.charAt(0).toUpperCase() + platform.slice(1),
    href: url,
    icon: socialIconMap[platform] || Linkedin,
  })) : [
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter / X", href: "https://twitter.com", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "YouTube Showreels", href: "https://youtube.com", icon: Youtube },
  ];

  const quickLinks = nl ?? [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const email    = wd?.email    ?? 'directors@brandjo.media';
  const location = wd?.studioLocation ?? 'Creative Studio Paris / London Soho Hub - Operating Worldwide';
  const copyright = wd?.copyright ?? '\u00A9 ' + new Date().getFullYear() + ' Brandjo Media. All rights reserved.';

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070709] border-t border-white/5 pt-20 pb-8 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-purple/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 border border-white/10 shadow-2xl shadow-black/20">
          <div className="md:col-span-5 space-y-5">
            <a href="#home" className="flex items-center gap-2 group">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-glow opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-purple" />
              </span>
              <span className="text-2xl font-display font-bold tracking-tight text-white group-hover:text-brand-glow transition-colors">
                Brandjo<span className="text-brand-purple font-light"> Media</span>
              </span>
            </a>
            <p className="text-sm sm:text-base text-zinc-300 max-w-md leading-relaxed">
              We design attention engines and high-volume cinematic content systems. Engineered exclusively for luxury brands, premium SaaS, and enterprise authorities.
            </p>
          </div>

          <div className="md:col-span-3 space-y-5">
            <h4 className="text-sm uppercase tracking-widest text-white font-black font-mono">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white hover:translate-x-0.5 inline-block transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-5">
            <h4 className="text-sm uppercase tracking-widest text-white font-black font-mono">
              Contact
            </h4>

            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors cursor-pointer group"
              >
                <span className="p-2 rounded-lg bg-white/5 border border-white/10 text-brand-purple group-hover:text-brand-glow group-hover:border-brand-purple/40 transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <span>{email}</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="p-2 rounded-lg bg-white/5 border border-white/10 text-brand-purple shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>{location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => {
                const IconComp = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-purple/40 hover:bg-brand-purple/10 text-zinc-300 hover:text-white hover:-translate-y-0.5 transition-all cursor-pointer"
                    title={social.name}
                  >
                    <IconComp className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 select-none">
            <span className="font-mono text-xs text-zinc-500">
              {copyright}
            </span>
            <span className="hidden sm:block h-4 w-px bg-white/10" />
            <a
              href="https://flowup-bd.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex transition-opacity hover:opacity-100 opacity-90"
              aria-label="Open Flow Up website"
            >
              <img
                src="/src/assets/images/flow-up-logo.png"
                alt="Flow Up"
                className="h-7 w-auto object-contain"
              />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#home" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#home" className="hover:text-white transition-colors">
              Terms
            </a>
            <button
              type="button"
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white font-semibold transition-colors cursor-pointer group uppercase tracking-wider text-xs"
            >
              Back To Top
              <ArrowUp className="w-3.5 h-3.5 text-brand-purple group-hover:translate-y-[-2px] transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
