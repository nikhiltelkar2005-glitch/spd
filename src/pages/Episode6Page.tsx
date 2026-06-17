import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import SamflixIntro from "../components/intro/SamflixIntro";
import HappyBirthday from "../components/episode7/HappyBirthday";

export default function Episode6Page() {
  const [phase, setPhase] = useState<"samflix" | "finale">("samflix");

  const handleSamflixComplete = useCallback(() => {
    setPhase("finale");
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "samflix" && (
          <motion.div
            key="samflix"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <SamflixIntro onComplete={handleSamflixComplete} />
          </motion.div>
        )}

        {phase === "finale" && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <HappyBirthday />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
