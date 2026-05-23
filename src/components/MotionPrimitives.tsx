import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: premiumEase }
  }
};

export const softScale: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: premiumEase }
  }
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08
    }
  }
};

interface MotionBlockProps {
  children: ReactNode;
  className?: string;
  amount?: number;
}

export function Reveal({ children, className = "", amount = 0.24 }: MotionBlockProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", amount = 0.18 }: MotionBlockProps) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export const PremiumCard = motion.div;
export const premiumTransition = { duration: 0.85, ease: premiumEase };
