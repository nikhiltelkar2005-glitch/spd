import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import Particles from "./ui/Particles";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import { getLastUnlockedEpisode, getCompletedEpisodes } from "../utils/progress";

export default function Hero() {
  const [targetEpisode, setTargetEpisode] = useState(1);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const nextEp = getLastUnlockedEpisode();
    setTargetEpisode(nextEp);
    
    // Check if Episode 7 is completed (meaning season is complete)
    const completed = getCompletedEpisodes();
    if (completed.includes(7)) {
      setAllCompleted(true);
    }
  }, []);

  const buttonText = allCompleted
    ? "Replay Season"
    : targetEpisode > 1
    ? `Continue Watching From Episode ${targetEpisode}`
    : "Continue Watching";

  const targetPath = allCompleted ? "/episode/1" : `/episode/${targetEpisode}`;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-sam-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(229,9,20,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(229,9,20,0.08)_0%,transparent_45%)]" />
        <motion.div
          className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-sam-red/10 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-white/5 blur-[100px]"
          animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <Particles count={50} />
        <div className="absolute inset-0 bg-gradient-to-t from-sam-bg via-sam-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-sam-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 text-center md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.5em] text-sam-muted md:text-sm"
        >
          The Best Friend Season
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-7xl leading-none tracking-[0.15em] text-white sm:text-8xl md:text-9xl lg:text-[10rem]"
        >
          SNEHALFLIX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-4 text-sm font-medium uppercase tracking-[0.4em] text-sam-red md:text-base"
        >
          The Best Friend Season
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-sam-muted md:text-lg"
        >
          A limited edition story about someone who made life better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-6 text-sm text-sam-muted"
        >
          <span className="text-white/60">Created by</span>{" "}
          <span className="font-medium text-white">Nick</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-sam-muted"
        >
          <span className="rounded border border-white/10 px-3 py-1">Season 1</span>
          <span className="rounded border border-white/10 px-3 py-1">6 Episodes</span>
          <span className="rounded border border-sam-red/40 bg-sam-red/10 px-3 py-1 text-sam-red">
            Friendship Special
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="primary" size="lg" className="min-w-[220px]" to={targetPath}>
            <Play size={20} fill="currentColor" />
            {buttonText}
          </Button>
          <Button variant="secondary" size="lg" className="min-w-[200px]" onClick={() => {
            document.getElementById("episodes")?.scrollIntoView({ behavior: "smooth" });
          }}>
            <Info size={18} />
            More Information
          </Button>
        </motion.div>
      </div>

    </section>
  );
}
