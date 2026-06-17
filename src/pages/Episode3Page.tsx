import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import SamflixIntro from "../components/intro/SamflixIntro";
import ThingsIAdmire from "../components/episode4/ThingsIAdmire";
import { playIntroSound } from "../utils/audio";

type Phase = "intro" | "main";

export default function Episode3Page() {
  const [phase, setPhase] = useState<Phase>("intro");

  const handleIntroComplete = useCallback(() => {
    playIntroSound();
    setPhase("main");
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <SamflixIntro key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-screen"
          >
            <ThingsIAdmire />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
