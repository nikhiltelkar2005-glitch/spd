import { motion } from "framer-motion";

const SYMBOLS = ["H₂O", "CO₂", "⚗", "🧪", "⚛", "🔬", "NH₃", "O₂", "Fe", "Au", "Na", "Sm", "∞", "✦", "◈"];
const COLORS = [
  "text-rose-300/50", "text-purple-300/50", "text-sky-300/50",
  "text-amber-300/50", "text-emerald-300/50", "text-pink-300/50"
];

interface Props {
  count?: number;
  includeAtoms?: boolean;
}

export default function FloatingMolecules({ count = 18, includeAtoms = true }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Floating symbols */}
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={`sym-${i}`}
          className={`absolute select-none font-mono text-lg font-bold ${COLORS[i % COLORS.length]}`}
          style={{
            left: `${5 + (i * 97) % 90}%`,
            top: `${5 + (i * 61) % 85}%`,
            fontSize: `${10 + (i % 4) * 4}px`,
          }}
          animate={{
            y: [0, -24 - (i % 3) * 8, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 12, 0],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, (i % 2 === 0 ? 15 : -15), 0],
          }}
          transition={{
            duration: 4 + (i % 5) * 1.2,
            delay: (i * 0.35) % 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {SYMBOLS[i % SYMBOLS.length]}
        </motion.span>
      ))}

      {/* Floating bubbles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
          style={{
            width: `${20 + (i % 4) * 14}px`,
            height: `${20 + (i % 4) * 14}px`,
            left: `${8 + (i * 83) % 84}%`,
            top: `${10 + (i * 67) % 80}%`,
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 5 + i * 0.8,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing atom dots */}
      {includeAtoms && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`atom-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${6 + (i % 3) * 4}px`,
            height: `${6 + (i % 3) * 4}px`,
            background: ["#f9a8d4", "#c4b5fd", "#93c5fd", "#fde68a", "#6ee7b7"][i % 5],
            left: `${15 + (i * 73) % 70}%`,
            top: `${15 + (i * 53) % 70}%`,
            boxShadow: `0 0 ${10 + i * 2}px ${["#f9a8d4", "#c4b5fd", "#93c5fd", "#fde68a", "#6ee7b7"][i % 5]}`,
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2 + i * 0.4,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
