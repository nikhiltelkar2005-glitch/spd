import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Cat,
  Dog,
  Heart,
  Home,
  Mountain,
  Play,
  School,
  Star,
  Volume2,
  VolumeX
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { CAREER_TIMELINE, FINAL_LINES } from "../../data/episode1";
import ChapterCard from "./ChapterCard";
import OpeningScene from "./OpeningScene";
import PastelBackground from "./PastelBackground";
import StoryReveal from "./StoryReveal";
import { markEpisodeCompleted } from "../../utils/progress";

function BabyFootprints() {
  return (
    <div className="mt-8 flex justify-center gap-6 opacity-80">
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width="24"
          height="28"
          viewBox="0 0 24 28"
          className="text-pink-400 drop-shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 }}
        >
          <ellipse cx="8" cy="6" rx="3" ry="4" fill="currentColor" />
          <ellipse cx="16" cy="6" rx="3" ry="4" fill="currentColor" />
          <ellipse cx="5" cy="14" rx="2.5" ry="3" fill="currentColor" />
          <ellipse cx="12" cy="16" rx="2.5" ry="3" fill="currentColor" />
          <ellipse cx="19" cy="14" rx="2.5" ry="3" fill="currentColor" />
          <ellipse cx="12" cy="24" rx="5" ry="4" fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  );
}

function SchoolIllustration() {
  return (
    <div className="relative mx-auto h-48 max-w-md">
      <motion.div
        className="absolute left-1/2 top-8 -translate-x-1/2 text-6xl"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✈️
      </motion.div>
      <motion.div
        className="absolute right-8 top-4 text-2xl"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⭐
      </motion.div>
      <div className="absolute bottom-0 left-1/2 flex h-32 w-48 -translate-x-1/2 flex-col items-center rounded-t-lg bg-green-200 shadow-lg border-2 border-green-300">
        <School className="mt-4 text-emerald-800" size={44} strokeWidth={2} />
        <p className="mt-2 font-story text-lg font-bold text-emerald-900 text-center px-2">Bapuji CBSE School</p>
      </div>
      <motion.div
        className="absolute bottom-16 left-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <BookOpen className="text-orange-500 drop-shadow-md" size={32} strokeWidth={2} />
      </motion.div>
      <motion.span
        className="absolute right-12 top-20 text-3xl drop-shadow-md"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🔔
      </motion.span>
    </div>
  );
}

function FriendshipAnimation() {
  const stages = ["Childhood", "School", "Today", "Forever"];
  return (
    <div className="py-6">
      <svg viewBox="0 0 320 120" className="mx-auto w-full max-w-sm overflow-visible">
        {stages.map((stage, i) => (
          <g key={i}>
            <motion.line
              x1={40 + i * 80}
              y1="90"
              x2={40 + i * 80}
              y2="55"
              stroke="#8b5cf6"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            />
            <motion.circle
              cx={30 + i * 80}
              cy="45"
              r="10"
              fill="#3b82f6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            />
            <motion.circle
              cx={50 + i * 80}
              cy="45"
              r="10"
              fill="#ec4899"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15 }}
            />
            <motion.line
              x1={30 + i * 80}
              y1="45"
              x2={50 + i * 80}
              y2="45"
              stroke="#111827"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5 + i * 0.15 }}
            />
            <text x={40 + i * 80} y="110" textAnchor="middle" fill="#4b5563" fontSize="12" fontWeight="bold">
              {stage}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PetAnimations() {
  return (
    <div className="relative flex h-40 items-end justify-center gap-12">
      <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <Cat className="text-purple-600 drop-shadow-md" size={56} strokeWidth={2} />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <Dog className="text-orange-500 drop-shadow-md" size={60} strokeWidth={2} />
      </motion.div>
      {["🐾", "🐾", "🐾"].map((p, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl text-gray-700 opacity-80"
          style={{ left: `${35 + i * 15}%`, bottom: `${40 + i * 10}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
        >
          {p}
        </motion.span>
      ))}
    </div>
  );
}

function MountainClimb() {
  const progress = [0.3, 0.5, 0.7, 1];
  return (
    <div className="relative mx-auto h-48 w-full max-w-xs">
      <Mountain className="mx-auto text-purple-600 drop-shadow-md" size={120} strokeWidth={2} />
      <motion.div
        className="absolute left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full bg-orange-500 shadow-xl border-2 border-white"
        animate={{ y: [0, 60, 90, 110] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
      />
      <div className="mt-6 space-y-2">
        {progress.map((p, i) => (
          <div key={i} className="h-3 overflow-hidden rounded-full bg-white/80">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${p * 100}%` }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerTimeline() {
  return (
    <div className="relative space-y-6 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-1 before:bg-gradient-to-b before:from-purple-500 before:to-pink-500">
      {CAREER_TIMELINE.map((job, i) => (
        <StoryReveal key={job.company} delay={i * 0.1}>
          <motion.div
            whileHover={{ x: 8, scale: 1.02 }}
            className="relative rounded-2xl border-2 border-pink-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
          >
            <span className="absolute -left-[38px] top-6 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 ring-4 ring-white shadow-md" />
            <div className="flex items-start gap-3">
              <Briefcase className="mt-1 shrink-0 text-purple-600 drop-shadow-sm" size={26} strokeWidth={2.5} />
              <div>
                <h4 className="font-story text-xl font-bold text-amber-950">{job.company}</h4>
                <p className="text-amber-900 font-medium">{job.role}</p>
                <p className="mt-1 text-sm font-bold text-purple-700">{job.period}</p>
              </div>
            </div>
          </motion.div>
        </StoryReveal>
      ))}
    </div>
  );
}

function FinalChapter() {
  const [lineIndex, setLineIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lineIndex >= FINAL_LINES.length) return;
    const t = window.setTimeout(() => setLineIndex((i) => i + 1), 2200);
    return () => window.clearTimeout(t);
  }, [lineIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-orange/60 via-pastel-pink/50 to-pastel-green/60" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <StoryReveal>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-600">
            Final Chapter
          </p>
          <h2 className="mt-4 font-story text-4xl font-bold text-amber-950 md:text-5xl drop-shadow-sm">
            One Random Message
          </h2>
        </StoryReveal>

        <div className="mt-16 min-h-[280px] space-y-6">
          {FINAL_LINES.slice(0, lineIndex).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-story text-xl italic leading-relaxed text-pastel-heading md:text-2xl"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {lineIndex >= FINAL_LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20"
          >
            <p className="font-story text-3xl text-pastel-heading/80 md:text-4xl">
              The Story Continues…
            </p>

            <motion.div
              className="mt-16 rounded-3xl border border-white/60 bg-white/50 p-10 shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-pastel-lavender">
                Next Episode
              </p>
              <h3 className="mt-2 font-story text-3xl font-semibold text-pastel-heading">
                Things I Admire
              </h3>
              <button
                onClick={() => {
                  setIsFadingOut(true);
                  markEpisodeCompleted(2);
                  setTimeout(() => {
                    navigate("/", { state: { highlightEpisode: 3 } });
                  }, 1000);
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pastel-orange to-pastel-pink px-8 py-4 font-medium text-pastel-heading shadow-lg transition-transform hover:scale-105"
              >
                <Play size={20} fill="currentColor" />
                Continue Watching
              </button>
            </motion.div>
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

export default function Episode1Story() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.warn("Audio autoplay blocked", e));
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-green font-sans text-pastel-text">
      <audio ref={audioRef} src="/khayaal.mp3" loop />
      <PastelBackground />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 z-50 border-b border-pastel-orange/30 bg-pastel-yellow/90 px-4 py-4 backdrop-blur-md md:px-8"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-pastel-text transition-colors hover:text-pastel-heading"
          >
            <ArrowLeft size={18} />
            Snehalflix
          </Link>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-pastel-lavender">
              Episode 2
            </p>
            <p className="font-story text-lg font-semibold text-pastel-heading">Favorite Memories</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleAudio} className="text-pastel-heading hover:opacity-80 transition-opacity">
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <span className="text-xs text-pastel-text">12 min</span>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10">
      <StoryReveal className="mx-auto max-w-3xl px-4 pt-12 pb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-orange-600">
          Episode 2
        </p>
        <h1 className="mt-2 font-story text-5xl font-bold text-amber-950 drop-shadow-sm md:text-7xl">
          Favorite Memories
        </h1>
        <p className="mt-4 font-story text-2xl italic font-semibold text-amber-900/90">
          &ldquo;A Journey From Strangers To Best Friends&rdquo;
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-amber-950/80">
          <span>12 minutes</span>
          <span>·</span>
          <span>Friendship</span>
          <span>·</span>
          <span>Memories</span>
          <span>·</span>
          <span>Gratitude</span>
        </div>
      </StoryReveal>

      <OpeningScene />

      <ChapterCard
        chapter="Chapter 1"
        title="A Wonderful Person"
        illustration={<BabyFootprints />}
      >
        <dl className="space-y-4 font-story text-lg">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-pastel-lavender">
              Focus
            </dt>
            <dd className="text-2xl font-semibold text-pastel-heading">True Connection</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-pastel-lavender">
              Title
            </dt>
            <dd className="text-xl text-pastel-heading">Favorite Memories</dd>
          </div>
        </dl>
        <p className="mt-6 leading-relaxed text-pastel-text">
          Snehal has a beautiful soul. A cheerful, kind person who touches many
          lives with her smile, warmth, and determination.
        </p>
      </ChapterCard>

      <ChapterCard
        chapter="Chapter 2"
        title="School Days"
        illustration={<SchoolIllustration />}
      >
        <p className="text-center font-story text-xl text-pastel-heading">Bapuji CBSE School</p>
        <p className="mt-6 text-center leading-relaxed">
          Nikhil and Snehal actually studied in the same school.<br />
          Snehal was in Section B.<br />
          Nikhil was in Section M.<br />
          Yet somehow, our paths never crossed.
        </p>
        <p className="mt-6 text-center leading-relaxed">
          We walked the same corridors.<br />
          Attended the same school.<br />
          Lived through the same school years.<br />
          But we never really knew each other.
        </p>
        <p className="mt-6 text-center font-story text-xl italic text-pastel-heading">
          Sometimes life quietly writes the beginning of a story long before the characters meet.
        </p>
      </ChapterCard>

      <ChapterCard chapter="Chapter 3" title="A Friend Worth Keeping" illustration={<FriendshipAnimation />}>
        <p className="mt-6 text-center leading-relaxed">
          Not every friendship is measured by years.<br />
          Some are measured by trust.<br />
          By the comfort of knowing someone is there.<br />
          By conversations that make difficult days easier.
        </p>
        <p className="mt-6 text-center leading-relaxed">
          Snehal became one of those people.<br />
          A best friend.
        </p>
        <p className="mt-6 text-center font-story text-xl italic text-pastel-heading">
          Someone who listens.<br />
          Someone who understands.<br />
          Someone who stays.
        </p>
        <p className="mt-6 text-center leading-relaxed">
          And honestly, life became a little better after that.
        </p>
      </ChapterCard>

      <ChapterCard
        chapter="Chapter 4"
        title="The Girl Who Loves Adventures"
        illustration={
          <div className="relative mx-auto flex h-40 max-w-xs items-center justify-center">
            <Mountain className="text-orange-500 drop-shadow-md" size={88} strokeWidth={2} />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ top: `${15 + i * 15}%`, right: `${15 + i * 10}%` }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              >
                <Star className="fill-yellow-400 text-yellow-500 drop-shadow-sm" size={28 + i * 4} />
              </motion.div>
            ))}
          </div>
        }
      >
        <p className="leading-relaxed text-center">
          Snehal has always loved exploring.<br />
          New places. New experiences. New memories.<br />
          She dreams about trips, adventures, and discovering new corners of the world.
        </p>
        <p className="mt-4 leading-relaxed text-center">
          Most of the time they stay as plans and funny discussions.<br />
          But the excitement never disappears.
        </p>
        <p className="mt-4 leading-relaxed text-center font-semibold">
          Because for Snehal, the journey is just as beautiful as the destination.
        </p>
      </ChapterCard>

      <ChapterCard chapter="Chapter 5" title="Dancing Through Life" illustration={<div className="relative mx-auto flex h-40 max-w-xs items-center justify-center"><Heart className="text-pink-500 drop-shadow-md" size={88} strokeWidth={2} /></div>}>
        <p className="leading-relaxed text-center">
          One thing about Snehal —<br />
          she brings energy wherever she goes.
        </p>
        <p className="mt-4 leading-relaxed text-center">
          Whether it’s dancing, laughing, or simply enjoying the moment, she has a way of making ordinary days feel special.
        </p>
        <p className="mt-4 leading-relaxed text-center font-semibold">
          Her happiness is contagious.<br />
          And her smile has a way of making people around her smile too.
        </p>
      </ChapterCard>

      <ChapterCard
        chapter="Chapter 6"
        title="Vyshnavi Chetana Days"
        illustration={
          <motion.div className="flex justify-center gap-6 py-4">
            <BookOpen className="text-purple-600 drop-shadow-md" size={48} strokeWidth={2} />
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="fill-orange-400 text-orange-500 drop-shadow-md" size={44} strokeWidth={2} />
            </motion.div>
          </motion.div>
        }
      >
        <p className="text-center font-story text-xl font-bold text-amber-950">
          Vyshnavi Chetana PU Science College
        </p>
        <p className="mt-6 leading-relaxed text-center">
          These were the years of learning, growth, and new experiences.<br />
          A time filled with dreams, ambitions, challenges, and memories.<br />
          The foundation for the person she would eventually become.
        </p>
        <p className="mt-4 font-story text-xl italic text-pastel-heading text-center">
          Strong.<br />
          Determined.<br />
          Kind-hearted.
        </p>
        <p className="mt-4 leading-relaxed text-center font-semibold">
          And ready for the next chapter.
        </p>
      </ChapterCard>

      <ChapterCard
        chapter="Chapter 7"
        title="Engineering Journey"
        illustration={<MountainClimb />}
      >
        <p className="text-center font-story text-xl font-bold text-amber-950">
          BIET Davanagere
        </p>
        <p className="text-center font-medium text-amber-900">
          Computer Science Engineering
        </p>
        <p className="text-center text-sm font-semibold text-purple-700">
          2025 – 2028
        </p>
        <p className="mt-6 leading-relaxed text-center">
          A new chapter began.<br />
          New classrooms. New challenges. New opportunities.
        </p>
        <p className="mt-4 leading-relaxed text-center">
          Every step brought new lessons and experiences.<br />
          And despite everything, Snehal continued moving forward with determination and courage.
        </p>
        <p className="mt-4 leading-relaxed text-center font-semibold">
          Because that’s who she is.<br />
          Someone who never gives up.
        </p>
      </ChapterCard>

      <StoryReveal className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <p className="text-center text-sm font-bold uppercase tracking-[0.35em] text-orange-600">
          Chapter 8
        </p>
        <h2 className="mt-3 text-center font-story text-4xl font-bold text-amber-950 drop-shadow-sm md:text-5xl">
          Career Timeline
        </h2>
        <div className="mt-12">
          <CareerTimeline />
        </div>
      </StoryReveal>

      <FinalChapter />
      </div>
    </div>
  );
}
