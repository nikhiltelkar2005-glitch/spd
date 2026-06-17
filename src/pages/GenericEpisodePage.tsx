import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Heart,
  Mail,
  Sparkles,
  Cpu,
  Shield,
  Activity,
  UserCheck
} from "lucide-react";
import { EPISODES, MEMORIES } from "../data/content";
import { markEpisodeCompleted } from "../utils/progress";

export default function GenericEpisodePage() {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const epNumber = parseInt(number || "3", 10);
  const episode = EPISODES.find((ep) => ep.number === epNumber);

  const [isFadingOut, setIsFadingOut] = useState(false);

  // Typewriter effect state for Episode 6
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    // Reset states when episode changes
    setLetterIndex(0);
  }, [epNumber]);

  if (!episode) {
    return (
      <div className="min-h-screen bg-sam-bg flex flex-col items-center justify-center p-8 text-center text-white">
        <h1 className="text-4xl font-display mb-4">Episode Not Found</h1>
        <Link to="/" className="text-sam-red hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  const handleContinueWatching = () => {
    setIsFadingOut(true);
    markEpisodeCompleted(epNumber);
    setTimeout(() => {
      navigate("/", { state: { highlightEpisode: epNumber + 1 } });
    }, 1000);
  };

  const handleGoHome = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  // Render Page Content based on Episode Number
  const renderEpisodeContent = () => {
    switch (epNumber) {
      case 3: // Engineer Mode
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8 text-zinc-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/80 border border-sam-red/20 rounded-xl p-6 md:p-8 font-mono shadow-[0_0_30px_rgba(229,9,20,0.15)]"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-sam-red font-semibold tracking-widest uppercase">
                  system_mode: engineer_status_active
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-sam-red font-bold">snehal@system:~#</span>{" "}
                  <span className="text-white">run optimization-profile --detailed</span>
                </div>
                <div className="text-xs text-zinc-400 pl-4 space-y-1 bg-zinc-950/50 p-4 rounded-lg border border-zinc-900">
                  <p>[OK] Initializing core components...</p>
                  <p>[OK] Loading problem-solving algorithms (Efficiency: 99.8%)</p>
                  <p>[OK] Calibration of analytical intelligence complete.</p>
                  <p>[OK] Precision & execution metrics standard: EXCELLENT.</p>
                  <p>[INFO] Snehal's mind is optimized for building, building, and designing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5 flex flex-col items-center text-center">
                    <Cpu className="text-sam-red mb-3" size={32} />
                    <h4 className="text-white font-semibold mb-2">Chemical Engineer</h4>
                    <p className="text-xs text-zinc-400">Mastery over reactors, fluid mechanics, and process integration.</p>
                  </div>
                  <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5 flex flex-col items-center text-center">
                    <Shield className="text-sam-red mb-3" size={32} />
                    <h4 className="text-white font-semibold mb-2">Precision Builder</h4>
                    <p className="text-xs text-zinc-400">Drafting systems and structures that translate concepts into realities.</p>
                  </div>
                  <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5 flex flex-col items-center text-center">
                    <Activity className="text-sam-red mb-3" size={32} />
                    <h4 className="text-white font-semibold mb-2">Persistence Matrix</h4>
                    <p className="text-xs text-zinc-400">Debugging life challenges with critical analysis and unwavering grit.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 4: // Things I Admire
        const qualities = [
          { name: "Kindness", desc: "A heart that listens, notices the little things, and treats everyone with warmth." },
          { name: "Focus & Ambition", desc: "The quiet determination to achieve goals and continuously build the future." },
          { name: "Sense of Humor", desc: "Always knowing how to spark laughter and bring lightness to any conversation." },
          { name: "Authenticity", desc: "Genuine in every word and action. Unapologetically herself." },
          { name: "Supportiveness", desc: "A steady presence who acts as an anchor whenever challenges arise." },
          { name: "Unmatched Intellect", desc: "The capability to look at complex engineering issues and solve them systematically." }
        ];

        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualities.map((q, idx) => (
                <motion.div
                  key={q.name}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-sam-surface border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-sam-red/30 hover:shadow-[0_0_20px_rgba(229,9,20,0.15)] transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sam-red/10 to-transparent rounded-bl-full opacity-40" />
                  <div>
                    <Heart className="text-sam-red fill-sam-red/10 mb-4 group-hover:scale-110 transition-transform duration-300" size={24} />
                    <h3 className="text-white font-display text-2xl tracking-wide uppercase">{q.name}</h3>
                    <p className="text-xs text-sam-muted mt-3 leading-relaxed">{q.desc}</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-sam-red">qualities_check ✓</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 5: // Memory Archive
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {MEMORIES.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, rotate: idx % 2 === 0 ? -2 : 2, y: 20 }}
                  animate={{ opacity: 1, rotate: idx % 2 === 0 ? -1 : 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  className="bg-white p-4 pb-8 shadow-2xl rounded border border-zinc-200 cursor-pointer text-zinc-900 flex flex-col justify-between aspect-[3/4]"
                >
                  <div className={`w-full aspect-square bg-gradient-to-br ${m.hue} to-zinc-900 rounded overflow-hidden relative flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <Sparkles className="text-white/40 animate-pulse-slow" size={40} />
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded">
                      {m.date}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-story text-xl font-bold border-b border-zinc-100 pb-1 leading-tight text-zinc-800">
                      {m.title}
                    </h4>
                    <p className="font-story text-sm text-zinc-600 mt-2 italic leading-snug">
                      "{m.preview}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 6: // Letter To Snehal
        const letterLines = [
          "Dear Snehal,",
          "As we reach the final episode, I wanted to write down some words sealed directly from the heart.",
          "You are someone who continuously inspires me with your persistence, your brilliant mind, and the absolute kindness you show when it matters the most.",
          "Thank you for being the amazing friend, the playful partner, and the irreplaceable person that you are.",
          "I wish you nothing but blueprints that build success, paths that bring endless laughter, and a life surrounded by kittens, puppies, and dreams fulfilled.",
          "You deserve the world.",
          "Always,",
          "Nick♥"
        ];

        // Typewriter effect lines reveal
        useEffect(() => {
          if (letterIndex < letterLines.length) {
            const timer = setTimeout(() => {
              setLetterIndex((prev) => prev + 1);
            }, 3000);
            return () => clearTimeout(timer);
          }
        }, [letterIndex]);

        return (
          <div className="w-full max-w-2xl mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FFFDF9] text-amber-950 p-8 md:p-12 shadow-2xl rounded-3xl border border-amber-100 font-story relative"
              style={{
                backgroundImage: "radial-gradient(circle at 100% 0%, #fffcfa 0%, #fffdf9 100%)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
              }}
            >
              <div className="absolute top-6 right-8">
                <Mail className="text-amber-900/10" size={64} />
              </div>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed italic">
                {letterLines.slice(0, letterIndex + 1).map((line, idx) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                    className={
                      idx === 0 
                        ? "text-2xl font-bold not-italic font-sans text-amber-900" 
                        : idx === letterLines.length - 2 || idx === letterLines.length - 1
                        ? "text-right font-sans not-italic font-bold text-amber-900 mt-6"
                        : "text-amber-950/90"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {letterIndex < letterLines.length - 1 && (
                <div className="flex items-center gap-1.5 mt-8 justify-center text-xs text-amber-900/40 uppercase tracking-widest font-sans font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-900/40 animate-ping" />
                  Reading Letter...
                </div>
              )}
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen pb-24 relative overflow-x-hidden text-white bg-sam-bg`}>
      {/* Background glow templates */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 transition-colors duration-1000 ${
          epNumber === 3 ? "bg-red-600" : epNumber === 4 ? "bg-rose-500" : epNumber === 5 ? "bg-violet-600" : epNumber === 6 ? "bg-emerald-600" : "bg-amber-600"
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-5 transition-colors duration-1000 ${
          epNumber === 3 ? "bg-zinc-800" : epNumber === 4 ? "bg-purple-600" : epNumber === 5 ? "bg-blue-600" : epNumber === 6 ? "bg-teal-600" : "bg-amber-800"
        }`} />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-sam-bg/90 px-4 py-4 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-sam-muted hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={18} />
            Snehalflix
          </Link>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sam-red">
              Episode {episode.number}
            </p>
            <p className="font-display text-xl text-white tracking-wide uppercase">{episode.title}</p>
          </div>
          <span className="text-xs text-sam-muted">{episode.runtime}</span>
        </div>
      </header>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl px-4 pt-12 pb-8 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sam-red">
            Episode {episode.number}
          </p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-wide uppercase">
            {episode.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-sam-muted max-w-xl mx-auto font-light">
            {episode.description}
          </p>
        </motion.div>

        {renderEpisodeContent()}

        {/* Continue Watching Section */}
        <div className="w-full max-w-2xl mx-auto px-4 mt-20 text-center">
          {epNumber < 7 ? (
            <motion.div
              className="rounded-3xl border border-white/5 bg-sam-surface p-10 shadow-2xl backdrop-blur-md"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-sam-muted">
                To Be Continued...
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-sam-red mt-6">
                Next Episode
              </p>
              <h3 className="mt-2 font-display text-4xl tracking-wide text-white uppercase">
                {EPISODES.find(ep => ep.number === epNumber + 1)?.title}
              </h3>
              <button
                onClick={handleContinueWatching}
                className="mt-8 bg-sam-red hover:bg-[#f40612] text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm flex items-center gap-2 mx-auto shadow-red-glow transition-all duration-300 hover:scale-105"
              >
                <Play size={20} fill="currentColor" />
                Continue Watching
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="rounded-3xl border-2 border-sam-red bg-sam-surface/80 p-10 md:p-14 shadow-red-glow backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.0 }}
            >
              <Sparkles className="text-sam-red mx-auto mb-4 animate-pulse-slow" size={48} />
              <h2 className="font-display text-5xl md:text-7xl tracking-widest text-white uppercase">
                🎉 The Season Finale
              </h2>
              <p className="mt-4 font-story text-2xl italic text-rose-300">
                Thank You For Watching
              </p>
              <p className="mt-6 text-sm text-sam-muted max-w-md mx-auto leading-relaxed">
                You have completed the entire friendship appreciation season of Snehalflix. Hope it brought a smile to your face, Snehal!
              </p>
              <button
                onClick={handleGoHome}
                className="mt-10 bg-white hover:bg-zinc-200 text-black px-10 py-4 rounded-full font-semibold uppercase tracking-wider text-sm flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <UserCheck size={18} />
                Return to Library
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Slow fade-out overlay */}
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
    </div>
  );
}
