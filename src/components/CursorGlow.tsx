import React, { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch screens to conserve performance
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!active) setActive(true);
    };

    const handleMouseLeave = () => {
      setActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="hidden md:block pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
      }}
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-transform duration-[120ms] ease-out bg-brand-purple/5"
        style={{
          transform: `translate3d(${position.x - 250}px, ${position.y - 250}px, 0)`,
        }}
      />
      <div
        className="absolute w-[180px] h-[180px] rounded-full blur-[65px] pointer-events-none transition-transform duration-[60ms] ease-out bg-brand-glow/8"
        style={{
          transform: `translate3d(${position.x - 90}px, ${position.y - 90}px, 0)`,
        }}
      />
    </div>
  );
}
