import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EPISODE2_FINAL_LINES, STORYBOOK_CHAPTERS } from "../../data/episode2";
import { markEpisodeCompleted } from "../../utils/progress";
import {
  BlossomScene,
  BubbleShopScene,
  CalendarScene,
  ChatScene,
  FirstGlimpseScene,
  GaneshScene,
  InstagramScene,
  RainScene,
  SnapchatScene,
  SunsetScene,
} from "./ChapterIllustrations";
import { ChibiCouple } from "./ChibiCharacters";
import FloatingHearts from "./FloatingHearts";
import StorybookPanel from "./StorybookPanel";

const ILLUSTRATIONS = [
  FirstGlimpseScene,
  BubbleShopScene,
  InstagramScene,
  SnapchatScene,
  ChatScene,
  CalendarScene,
  GaneshScene,
  BlossomScene,
  RainScene,
];

function FinalScene() {
  const [lineIndex, setLineIndex] = useState(0);
  const [showBangara, setShowBangara] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lineIndex < EPISODE2_FINAL_LINES.length) {
      const t = window.setTimeout(() => setLineIndex((i) => i + 1), 2400);
      return () => window.clearTimeout(t);
    }
  }, [lineIndex]);

  useEffect(() => {
    if (lineIndex < EPISODE2_FINAL_LINES.length || showBangara) return;
    const t = window.setTimeout(() => setShowBangara(true), 1500);
    return () => window.clearTimeout(t);
  }, [lineIndex, showBangara]);

  useEffect(() => {
    if (!showBangara || showContinue) return;
    const t = window.setTimeout(() => setShowContinue(true), 2500);
    return () => window.clearTimeout(t);
  }, [showBangara, showContinue]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-romance-lavender via-romance-pink to-romance-peach" />
      <FloatingHearts dense />
      <div className="relative z-10 mx-auto max-w-lg px-4 text-center">
        <SunsetScene />
        <div className="mt-12 min-h-[200px] space-y-5">
          {EPISODE2_FINAL_LINES.slice(0, lineIndex).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-storybook text-xl font-bold leading-relaxed text-romance-ink md:text-2xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
        {showBangara && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 font-storybook text-4xl font-extrabold text-rose-600 md:text-5xl"
          >
            I&apos;ll miss you more, Bangara ♥
          </motion.p>
        )}
        {showContinue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-[2rem] border-4 border-white bg-white p-10 shadow-xl"
          >
            <p className="font-storybook text-2xl font-extrabold text-romance-ink">To Be Continued...</p>
            <p className="mt-4 text-sm font-extrabold uppercase tracking-widest text-rose-500">
              Next Episode
            </p>
            <h3 className="mt-2 font-storybook text-3xl font-extrabold text-romance-ink">
              Engineer Mode
            </h3>
            <button
              onClick={() => {
                setIsFadingOut(true);
                markEpisodeCompleted(2);
                setTimeout(() => {
                  navigate("/", { state: { highlightEpisode: 3 } });
                }, 1000);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-romance-peach to-rose-400 px-8 py-4 font-storybook font-extrabold text-romance-ink shadow-lg transition-transform hover:scale-105"
            >
              <Play size={20} fill="currentColor" />
              Continue Watching
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isFadingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0b0b0b] pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Episode2Story() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FFF9F2] pb-24">
      <FloatingHearts />

      <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-storybook text-sm font-bold text-romance-ink hover:text-rose-500"
          >
            <ArrowLeft size={18} />
            Snehalflix
          </Link>
          <div className="text-center">
            <p className="font-storybook text-xs font-extrabold uppercase tracking-widest text-rose-500">
              Episode 2
            </p>
            <p className="font-storybook text-lg font-extrabold text-romance-ink">How We Met</p>
          </div>
          <span className="font-storybook text-xs font-bold text-romance-ink/50">12 min</span>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto max-w-lg px-4 pt-10 text-center"
      >
        <ChibiCouple size="lg" mood="blush" />
        <h1 className="mt-6 font-storybook text-5xl font-extrabold tracking-tight text-romance-ink md:text-6xl">
          Our Story
        </h1>
        <p className="mt-2 font-storybook text-lg font-bold text-romance-ink/75">
          A Journey Written By Destiny
        </p>
        <p className="mt-4 font-storybook text-sm font-bold text-romance-ink/50">
          Scroll to unfold each chapter ♥
        </p>
      </motion.div>

      <div className="relative mx-auto mt-8 max-w-lg">
        <div className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-300 via-purple-300 to-orange-200" />

        <div className="relative space-y-12 py-8">
          {STORYBOOK_CHAPTERS.map((ch) => {
            const Illustration = ILLUSTRATIONS[ch.id - 1];
            return (
              <StorybookPanel
                key={ch.id}
                chapter={ch.id}
                date={ch.date}
                title={ch.title}
                gradient={ch.gradient}
                illustration={Illustration ? <Illustration /> : null}
              >
                {ch.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </StorybookPanel>
            );
          })}
        </div>
      </div>

      <FinalScene />
    </div>
  );
}
