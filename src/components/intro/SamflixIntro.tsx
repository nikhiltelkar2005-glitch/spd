import { motion } from "framer-motion";
import { useEffect } from "react";
import { playTudum } from "../../utils/playTudum";

interface SamflixIntroProps {
  onComplete: () => void;
}

const DURATION_MS = 4000;

export default function SamflixIntro({ onComplete }: SamflixIntroProps) {
  useEffect(() => {
    playTudum().catch(() => {});
    const timer = window.setTimeout(onComplete, DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.2)_0%,transparent_55%)]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.6], scale: [0.5, 1.2, 1] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{
          scale: [0.3, 1.08, 1],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 1.8,
          times: [0, 0.6, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative text-center"
      >
        <motion.div
          className="absolute -inset-16 rounded-full bg-sam-red/30 blur-3xl"
          animate={{
            opacity: [0.2, 0.8, 0.4],
            scale: [0.8, 1.3, 1],
          }}
          transition={{ duration: 2, repeat: 1, repeatType: "reverse" }}
        />
        <motion.h1
          className="relative font-display text-6xl tracking-[0.25em] text-sam-red drop-shadow-[0_0_30px_rgba(229,9,20,0.8)] sm:text-8xl md:text-9xl"
          animate={{
            textShadow: [
              "0 0 20px rgba(229,9,20,0.5)",
              "0 0 60px rgba(229,9,20,1)",
              "0 0 30px rgba(229,9,20,0.6)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          SNEHALFLIX
        </motion.h1>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 1, delay: 3 }}
      />
    </motion.div>
  );
}
