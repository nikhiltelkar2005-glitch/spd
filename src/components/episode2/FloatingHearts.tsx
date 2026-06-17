import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function FloatingHearts({ dense = false }: { dense?: boolean }) {
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    fetch("https://assets2.lottiefiles.com/packages/lf20_6xgmwfxt.json")
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => {});
  }, []);

  const count = dense ? 16 : 10;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lottieData && (
        <div className="absolute left-1/2 top-8 -translate-x-1/2 opacity-40">
          <Lottie animationData={lottieData} loop className="h-24 w-24 md:h-32 md:w-32" />
        </div>
      )}
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-romance-rose/60"
          style={{
            left: `${(i * 13) % 95}%`,
            fontSize: 12 + (i % 4) * 6,
          }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{
            y: ["110%", "-10%"],
            opacity: [0, 0.8, 0],
            rotate: [0, 15, -10],
          }}
          transition={{
            duration: 6 + (i % 4),
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
