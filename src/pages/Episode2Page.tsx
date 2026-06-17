import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import SamflixIntro from "../components/intro/SamflixIntro";
import OurStoryTitle from "../components/episode2/OurStoryTitle";
import Storybook from "../components/episode2/Storybook";
import { playIntroSound } from "../utils/audio";

type Phase = "intro" | "title" | "book";

export default function Episode2Page() {
  const [phase, setPhase] = useState<Phase>("intro");

  const handleIntroComplete = useCallback(() => {
    playIntroSound();
    setPhase("title");
  }, []);

  const handleTitleComplete = useCallback(() => setPhase("book"), []);

  useEffect(() => {
    if (phase !== "book") return;
    // Set pastel body class for storybook
    document.body.style.background = "linear-gradient(135deg, #f5d4e8 0%, #e4d4f4 50%, #ffdcc8 100%)";
    return () => {
      document.body.style.background = "";
    };
  }, [phase]);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <SamflixIntro key="intro" onComplete={handleIntroComplete} />
        )}
        {phase === "title" && (
          <OurStoryTitle key="title" onComplete={handleTitleComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "book" && (
          <motion.div
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Storybook />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
