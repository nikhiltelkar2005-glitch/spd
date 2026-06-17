import { motion } from "framer-motion";
import { Play, Lock, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { EPISODES } from "../data/content";
import FadeIn from "./motion/FadeIn";
import SectionHeading from "./motion/SectionHeading";
import { getUnlockedEpisodes, getCompletedEpisodes, resetProgress } from "../utils/progress";
import { useEffect, useState } from "react";

interface EpisodesProps {
  highlightEpisode?: number | null;
  onHighlightComplete?: () => void;
}

export default function Episodes({ highlightEpisode, onHighlightComplete }: EpisodesProps) {
  const [unlockedList, setUnlockedList] = useState<number[]>([1]);
  const [completedList, setCompletedList] = useState<number[]>([]);
  const [key, setKey] = useState(0); // Key to force re-render on reset

  useEffect(() => {
    setUnlockedList(getUnlockedEpisodes());
    setCompletedList(getCompletedEpisodes());
  }, [key]);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your season progress? This will lock all episodes except Episode 1.")) {
      resetProgress();
      setKey((prev) => prev + 1);
      window.location.reload();
    }
  };

  // 7 episodes tracking
  const trackerEpisodes = EPISODES.slice(0, 7);
  const completedCount = completedList.filter(n => n <= 7).length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  return (
    <section id="episodes" className="scroll-mt-24 py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between px-4 md:px-12 lg:px-16 mb-8 gap-4">
        <div>
          <SectionHeading
            title="Episodes"
            subtitle="Pick up where you left off — more chapters waiting to be watched."
          />
        </div>

        {/* Season Progress Tracker Dashboard */}
        <div className="bg-sam-surface/60 border border-white/5 rounded-xl p-5 w-full md:w-[450px] backdrop-blur-md shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sam-red animate-pulse" />
              Season Progress: {progressPercent}%
            </h4>
            <button 
              onClick={handleReset}
              className="text-[10px] uppercase tracking-wider text-sam-muted hover:text-sam-red flex items-center gap-1.5 transition-colors duration-300"
              title="Reset Season Progress"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-sam-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="flex justify-between gap-1 text-[10px] font-semibold text-sam-muted overflow-x-auto pb-1 hide-scrollbar">
            {trackerEpisodes.map((ep) => {
              const isComp = completedList.includes(ep.number);
              const isUnl = unlockedList.includes(ep.number);
              return (
                <div key={ep.number} className="flex flex-col items-center flex-1 min-w-[45px]">
                  <span className={`mb-1 transition-colors ${
                    isComp ? "text-sam-red" : isUnl ? "text-white" : "text-white/20"
                  }`}>
                    EP {ep.number}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isComp 
                      ? "bg-sam-red/10 border border-sam-red text-sam-red" 
                      : isUnl 
                        ? "bg-white/10 border border-white/30 text-white" 
                        : "bg-black/40 border border-white/5 text-white/20"
                  }`}>
                    {isComp ? (
                      <span className="text-[10px]">✓</span>
                    ) : isUnl ? (
                      <span className="text-[8px] animate-pulse">▶</span>
                    ) : (
                      <Lock size={8} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FadeIn delay={0.1}>
        <div className="hide-scrollbar flex gap-4 overflow-x-auto px-4 pb-4 md:gap-5 md:px-12 lg:px-16">
          {EPISODES.map((ep, index) => {
            const isUnlocked = unlockedList.includes(ep.number);
            const isCompleted = completedList.includes(ep.number);
            const isHighlighted = highlightEpisode === ep.number;

            const card = (
              <motion.article
                id={`episode-card-${ep.number}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={isUnlocked ? { scale: 1.06, zIndex: 10 } : {}}
                animate={
                  isHighlighted
                    ? {
                        scale: [1, 1.05, 1.02, 1.05, 1],
                        borderColor: [
                          "rgba(255, 255, 255, 0.05)",
                          "rgba(229, 9, 20, 1)",
                          "rgba(229, 9, 20, 0.4)",
                          "rgba(229, 9, 20, 1)",
                          "rgba(255, 255, 255, 0.05)",
                        ],
                        boxShadow: [
                          "0 0 0px rgba(0,0,0,0)",
                          "0 0 25px rgba(229,9,20,0.8)",
                          "0 0 8px rgba(229,9,20,0.3)",
                          "0 0 25px rgba(229,9,20,0.8)",
                          "0 0 0px rgba(0,0,0,0)",
                        ],
                      }
                    : {}
                }
                onAnimationComplete={() => {
                  if (isHighlighted && onHighlightComplete) {
                    onHighlightComplete();
                  }
                }}
                className={`group relative w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0 transition-opacity duration-300 ${
                  !isUnlocked ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <div className={`relative aspect-video overflow-hidden rounded-lg bg-sam-surface border transition-all duration-300 ${
                  isHighlighted 
                    ? "border-sam-red shadow-red-glow" 
                    : "border-white/5 group-hover:border-sam-red/40 group-hover:shadow-red-glow-sm"
                }`}>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-zinc-700/80 via-sam-surface to-black"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(${ep.number * 40}, 20%, 18%) 0%, #141414 50%, #0b0b0b 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl text-white/10 transition-all group-hover:text-white/5">
                      {String(ep.number).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Play hover or Lock overlay */}
                  {isUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm"
                      >
                        <Play size={24} fill="white" className="ml-1 text-white" />
                      </motion.div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
                        <Lock size={20} className="text-white/60" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-12">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-sam-red">
                        Episode {ep.number}
                      </p>
                      {isCompleted && (
                        <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">
                          Watched ✓
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-semibold text-white">{ep.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-sam-muted opacity-0 transition-all duration-300 group-hover:opacity-100">
                      {ep.description}
                    </p>
                    <p className="mt-2 text-xs text-sam-muted/80">{ep.runtime}</p>
                  </div>
                </div>
              </motion.article>
            );

            return isUnlocked && "path" in ep && ep.path ? (
              <Link key={ep.number} to={ep.path} className="block flex-shrink-0">
                {card}
              </Link>
            ) : (
              <div key={ep.number} className="block flex-shrink-0 cursor-not-allowed">
                {card}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
