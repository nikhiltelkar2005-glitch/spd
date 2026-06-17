import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import SamflixIntro from "../components/intro/SamflixIntro";
import Episode1Story from "../components/episode1/Episode1Story";

export default function Episode1Page() {
  const [phase, setPhase] = useState<"intro" | "episode">("intro");
  const handleIntroComplete = useCallback(() => setPhase("episode"), []);

  useEffect(() => {
    if (phase !== "episode") return;
    document.body.classList.add("episode-pastel");
    return () => document.body.classList.remove("episode-pastel");
  }, [phase]);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <SamflixIntro key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "episode" && (
          <motion.div
            key="episode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-green"
          >
            <Episode1Story />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
