import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import SamflixIntro from "../components/intro/SamflixIntro";
import EngineerTitle from "../components/episode3/EngineerTitle";
import Lab from "../components/episode3/Lab";
import { playIntroSound } from "../utils/audio";

type Phase = "intro" | "title" | "lab";

export default function Episode4Page() {
  const [phase, setPhase] = useState<Phase>("intro");

  const handleIntroComplete = useCallback(() => {
    playIntroSound();
    setPhase("title");
  }, []);

  const handleTitleComplete = useCallback(() => setPhase("lab"), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <SamflixIntro key="intro" onComplete={handleIntroComplete} />
        )}
        {phase === "title" && (
          <EngineerTitle key="title" onComplete={handleTitleComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "lab" && (
          <motion.div
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-screen"
          >
            <Lab />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
