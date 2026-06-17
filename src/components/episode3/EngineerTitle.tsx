import { motion } from "framer-motion";
import { useEffect } from "react";
import { Atom } from "lucide-react";
import FloatingMolecules from "./FloatingMolecules";

interface Props {
  onComplete: () => void;
}

export default function EngineerTitle({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0f2044 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingMolecules count={20} />

      {/* Stars */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`,
            left: `${(i * 73) % 95}%`, top: `${(i * 61) % 90}%`,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.1, repeat: Infinity }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3, stiffness: 150 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/30 ring-4 ring-purple-300/50"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.6)" }}
        >
          <Atom className="h-10 w-10 text-purple-200" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-storybook text-xs font-extrabold uppercase tracking-[0.5em] text-purple-300"
        >
          Episode 4
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="font-storybook text-5xl font-extrabold text-white"
        >
          SNEHAL BEING
          <br />
          SNEHAL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-storybook text-lg font-bold text-purple-200"
        >
          The Chemistry of Snehal
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-4 rounded-full border border-purple-400/50 bg-purple-900/30 px-6 py-2 shadow-lg backdrop-blur-sm"
        >
          <span className="font-storybook text-sm font-extrabold uppercase tracking-widest text-purple-200">
            Welcome to Snehalflix Lab
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
