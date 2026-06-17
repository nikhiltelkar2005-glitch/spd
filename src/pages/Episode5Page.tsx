import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import SamflixIntro from "../components/intro/SamflixIntro";
import LetterToBestFriend from "../components/episode6/LetterToBestFriend";

export default function Episode5Page() {
  const [phase, setPhase] = useState<"samflix" | "letter">("samflix");

  const handleSamflixComplete = useCallback(() => {
    setPhase("letter");
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

        {phase === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <LetterToBestFriend />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
