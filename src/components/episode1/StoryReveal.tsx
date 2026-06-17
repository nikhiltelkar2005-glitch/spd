import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StoryRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function StoryReveal({ children, className = "", delay = 0 }: StoryRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
