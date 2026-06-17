import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import { ChibiCouple } from "./ChibiCharacters";
import FloatingHearts from "./FloatingHearts";

interface OurStoryTitleProps {
  onComplete: () => void;
}

export default function OurStoryTitle({ onComplete }: OurStoryTitleProps) {
  useEffect(() => {
    const t = window.setTimeout(onComplete, 3200);
    return () => window.clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingHearts dense />
      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ChibiCouple size="lg" mood="blush" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 font-storybook text-6xl font-extrabold text-romance-ink md:text-8xl"
        >
          Our Story
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-4 font-storybook text-xl font-bold text-romance-ink/75 md:text-2xl"
        >
          A Journey Written By Destiny
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
          className="mt-6 flex justify-center gap-2"
        >
          <Heart className="fill-rose-400 text-rose-400" size={24} />
          <Heart className="fill-pink-300 text-pink-300" size={18} />
          <Heart className="fill-purple-300 text-purple-300" size={24} />
        </motion.div>
      </div>
    </motion.div>
  );
}
