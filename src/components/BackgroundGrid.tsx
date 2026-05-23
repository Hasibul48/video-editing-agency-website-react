import React from "react";
import { motion } from "motion/react";

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Absolute Dark base background */}
      <div className="absolute inset-0 bg-[#070709]" />

      {/* Futuristic Neo-Cyber Grid Overlay */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        animate={{ backgroundPosition: ["0rem 0rem", "4rem 4rem"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Cyber Dot matrix overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#ffffff01_1.5px,transparent_1.5px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_75%,transparent_100%)]" 
      />

      {/* Glowing Drift Orbs */}
      <motion.div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-brand-purple/10 blur-[130px]" animate={{ y: [0, -35, 0], opacity: [0.45, 0.75, 0.45] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[40%] right-[10%] w-[550px] h-[550px] rounded-full bg-brand-glow/8 blur-[150px]" animate={{ x: [0, 28, 0], y: [0, 22, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#ec4899]/5 blur-[120px]" animate={{ x: [0, -22, 0], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      
      {/* Light streak glowing elements */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
      <div className="absolute bottom-1/3 left-1/3 right-1/10 h-[1.5px] bg-gradient-to-r from-transparent via-brand-glow/20 to-transparent" />
    </div>
  );
}
