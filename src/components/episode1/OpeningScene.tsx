import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import StoryReveal from "./StoryReveal";

const LINES = [
  "Every friendship has a beginning.",
  "Ours started with a simple message,",
  "grew through countless conversations,",
  "and became one of the most meaningful chapters of my life.",
];

const CLOUD_COLORS = [
  "bg-pastel-pink/70",
  "bg-pastel-yellow/70",
  "bg-pastel-green/60",
];

export default function OpeningScene() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const text = LINES[lineIndex] ?? "";
  const displayed = useTypingEffect(text, 42, lineIndex < LINES.length);

  useEffect(() => {
    if (displayed.length < text.length) {
      setTypingDone(false);
      return;
    }
    setTypingDone(true);
    const pause = lineIndex === 0 ? 2200 : lineIndex === 1 ? 1800 : 0;
    if (lineIndex < LINES.length - 1) {
      const t = window.setTimeout(() => {
        setLineIndex((i) => i + 1);
        setTypingDone(false);
      }, pause);
      return () => window.clearTimeout(t);
    }
  }, [displayed, text, lineIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-yellow via-pastel-pink/90 to-pastel-green" />
      <div className="absolute inset-0 bg-gradient-to-r from-pastel-orange/40 via-transparent to-pastel-green/40" />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 20%, rgba(255,244,184,0.9) 0%, transparent 55%)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute h-20 w-40 rounded-full blur-md md:h-28 md:w-56 ${CLOUD_COLORS[i]}`}
          style={{ top: `${12 + i * 14}%`, left: `${8 + i * 22}%` }}
          animate={{ x: [0, 35, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl text-center font-story text-2xl italic text-pastel-heading md:text-4xl"
          >
            {displayed}
            {!typingDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </motion.p>
        </AnimatePresence>

        {lineIndex === LINES.length - 1 && typingDone && (
          <StoryReveal className="mt-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-8 rounded-full bg-pastel-orange/50 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <svg
                viewBox="0 0 120 140"
                className="relative mx-auto h-40 w-32 text-pastel-pink md:h-52 md:w-40"
                aria-hidden
              >
                <ellipse cx="60" cy="95" rx="45" ry="35" fill="currentColor" opacity="0.35" />
                <circle cx="60" cy="50" r="28" fill="currentColor" opacity="0.55" />
                <motion.circle
                  cx="60"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.5"
                  animate={{ r: [32, 38, 32], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          </StoryReveal>
        )}
      </div>
    </section>
  );
}
