import { motion } from "framer-motion";

export default function PastelBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-green" />
      <div className="absolute inset-0 bg-gradient-to-t from-pastel-orange/70 via-transparent to-pastel-yellow/50" />
      <motion.div
        className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-pastel-yellow/80 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-pastel-pink/70 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-pastel-orange/70 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-pastel-green/70 blur-3xl"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {Array.from({ length: 20 }).map((_, i) => {
        const colors = ["bg-pastel-yellow/80", "bg-pastel-pink/80", "bg-pastel-orange/80", "bg-pastel-green/80"];
        return (
          <motion.span
            key={i}
            className={`absolute rounded-full ${colors[i % 4]}`}
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: 5 + (i % 3) * 2,
              height: 5 + (i % 3) * 2,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.7, 0.35] }}
            transition={{
              duration: 6 + (i % 5),
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
}
