import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { markEpisodeCompleted } from "../../utils/progress";

const LETTER_LINES = [
  "To my absolute best friend, Snehal ❤️,",
  "",
  "There are some people we meet and forget.",
  "",
  "Some people stay for a season.",
  "",
  "And then there are a few rare souls who quietly become a part of our lives in ways we never expected.",
  "",
  "For me, that person is you.",
  "",
  "It’s funny how life works.",
  "",
  "We spent years being strangers, never knowing that one day a simple conversation would grow into a friendship that I would cherish so deeply.",
  "",
  "What started as a random message became countless conversations, endless laughter, shared memories, and a bond that means more to me than words can ever explain.",
  "",
  "You became my safe place.",
  "",
  "The person I could talk to when my mind was full.",
  "",
  "The person who listened to my excitement, my worries, my dreams, my overthinking, and even my most random thoughts.",
  "",
  "With you, I never felt judged.",
  "",
  "I never felt alone.",
  "",
  "I never felt like I had to hide who I was.",
  "",
  "And that’s a gift not everyone gets in life.",
  "",
  "Thank you for every late-night conversation.",
  "",
  "Thank you for every piece of advice.",
  "",
  "Thank you for every laugh that turned a bad day into a better one.",
  "",
  "Thank you for every memory that still brings a smile to my face.",
  "",
  "And of course, thank you for all the tea. ☕😂",
  "",
  "The random updates.",
  "",
  "The unnecessary drama.",
  "",
  "The tiny details nobody else cared about.",
  "",
  "We somehow turned sharing everything into our own little tradition, and honestly, it’s one of my favorite parts of our friendship.",
  "",
  "Snehal, one of the things I admire most about you is your heart.",
  "",
  "Your kindness.",
  "",
  "Your loyalty.",
  "",
  "The way you care for people.",
  "",
  "The way you make others feel heard, valued, and understood.",
  "",
  "You have a beautiful way of making people feel comfortable just by being yourself.",
  "",
  "And I hope you always remember how special that is.",
  "",
  "No matter where life takes us next—new cities, new adventures, new dreams, and new chapters—I hope one thing never changes:",
  "",
  "Our friendship.",
  "",
  "Because some people become memories.",
  "",
  "Some become lessons.",
  "",
  "But a very few become a chapter so beautiful that you never want it to end.",
  "",
  "You are one of those chapters in my life.",
  "",
  "Thank you for being my best friend.",
  "",
  "Thank you for being my comfort zone.",
  "",
  "Thank you for being one of the best things that ever happened to me.",
  "",
  "And most importantly,",
  "",
  "Thank you for being you.",
  "",
  "With all my appreciation, gratitude, and friendship,",
  "",
  "Your Best Friend,",
  "",
  "Nikhil ❤️"
];

const SCENE_TRIGGERS: Record<string, string> = {
  "For me, that person is you.": "first-love",
  "You became my safe place.": "home",
  "Thank you for every late-night conversation.": "heartbeat",
  "Our friendship.": "galaxy",
  "Thank you for being my best friend.": "starry-night",
  "Nikhil ❤️": "signature"
};

// ─── Visual Elements ─────────────────────────────────────────────────────────

function StarryNight({ dense = false }: { dense?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: dense ? 80 : 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: 2 + (i % 4), delay: Math.random() * 2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function Fireflies() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px rgba(253,224,71,0.8)"
          }}
          animate={{
            x: [0, (i % 2 ? 20 : -20), 0],
            y: [0, -30, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{ duration: 4 + (i % 3), delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CherryBlossoms() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300/60 text-lg"
          style={{ left: `${Math.random() * 100}%`, top: `-5%` }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [0, 0.8, 0]
          }}
          transition={{ duration: 8 + Math.random() * 5, delay: Math.random() * 5, repeat: Infinity }}
        >
          🌸
        </motion.span>
      ))}
    </div>
  );
}

function Constellations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 20 20 L 40 30 L 60 10 L 80 40 L 50 80 Z"
          fill="none" stroke="white" strokeWidth="0.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />
      </svg>
    </div>
  );
}

export default function LetterToBestFriend() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "main" | "ending">("intro");
  const [introStep, setIntroStep] = useState(0);
  const [endStep, setEndStep] = useState(0);
  const [scene, setScene] = useState<string>("gazebo");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.5;
      audio.currentTime = 86;
      audio.play().catch(e => console.warn("Audio autoplay blocked", e));

      const handleTimeUpdate = () => {
        if (audio.currentTime >= 110) {
          audio.currentTime = 86;
        }
      };
      
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, []);

  // Intro Sequence
  useEffect(() => {
    if (phase === "intro") {
      const timers = [
        setTimeout(() => setIntroStep(1), 1500),
        setTimeout(() => setIntroStep(2), 4500),
        setTimeout(() => setIntroStep(3), 8000),
        setTimeout(() => setPhase("main"), 12000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [phase]);

  // Ending Sequence
  useEffect(() => {
    if (phase === "ending") {
      const timers = [
        setTimeout(() => setEndStep(1), 1000),
        setTimeout(() => setEndStep(2), 5000),
        setTimeout(() => setEndStep(3), 9000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [phase]);

  const handleFinish = () => setPhase("ending");

  const handleNextEpisode = () => {
    markEpisodeCompleted(5);
    navigate("/", { state: { highlightEpisode: 6 } });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0c0518] text-white">
      <audio ref={audioRef} src="/ep5.mp3" loop />
      
      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 transition-colors duration-2000 ease-in-out" style={{
        background: scene === "first-love" ? "linear-gradient(to bottom, #2d1030, #180514)" :
                    scene === "children" ? "linear-gradient(to bottom, #1a1a3a, #0a0a1a)" :
                    scene === "heartbeat" ? "linear-gradient(to bottom, #3a0a15, #100205)" :
                    scene === "galaxy" ? "linear-gradient(to bottom, #050510, #000000)" :
                    scene === "home" ? "linear-gradient(to bottom, #1a1525, #2d2010)" :
                    scene === "starry-night" || scene === "signature" ? "linear-gradient(to bottom, #0a1025, #050510)" :
                    "linear-gradient(to bottom, #151025, #1e0520)" // gazebo default
      }}>
        
        {/* Dynamic Background Elements */}
        {scene === "gazebo" && (
          <>
            <StarryNight />
            <Fireflies />
            <CherryBlossoms />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] border-t-8 border-x-4 border-white/10 rounded-t-[100px] flex justify-center items-end pb-8">
               <div className="absolute inset-0 bg-yellow-500/5 rounded-t-[100px] blur-xl" />
            </div>
            <div className="absolute bottom-0 w-full h-[15vh] bg-gradient-to-t from-blue-900/20 to-transparent" />
          </>
        )}

        {scene === "first-love" && (
          <>
            <StarryNight />
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.span key={i} className="absolute text-rose-400/80 text-xl"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0, 0.8, 0], y: -20 }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
              >♥</motion.span>
            ))}
          </>
        )}

        {scene === "children" && (
          <>
            <StarryNight dense />
            <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <span className="text-6xl tracking-widest text-yellow-100 drop-shadow-[0_0_20px_#fde047]">✨⭐✨</span>
            </motion.div>
          </>
        )}

        {scene === "heartbeat" && (
          <>
            <motion.div className="absolute inset-0 bg-red-900/10"
              animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.span key={i} className="absolute text-rose-600/80 text-2xl"
                style={{ left: `${Math.random() * 100}%`, top: `-5%` }}
                animate={{ y: ["0vh", "105vh"], x: [0, Math.random() * 40 - 20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4 + Math.random() * 3, repeat: Infinity }}
              >🌹</motion.span>
            ))}
          </>
        )}

        {scene === "galaxy" && (
          <>
            <StarryNight dense />
            <Constellations />
          </>
        )}

        {scene === "home" && (
          <>
            <StarryNight />
            <Fireflies />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-8xl opacity-80"
              style={{ filter: "drop-shadow(0 0 30px rgba(253,224,71,0.5))" }}>
              🏡
            </div>
          </>
        )}

        {(scene === "starry-night" || scene === "signature") && (
          <>
            <StarryNight dense />
            <CherryBlossoms />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-2">
              {scene === "signature" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-10 left-1/2 -translate-x-1/2 text-rose-400 text-3xl">
                  ❤️
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── INTRO PHASE ── */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 2 } }}>
            <StarryNight />
            <Fireflies />
            
            {introStep >= 1 && introStep < 3 && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-story text-xl italic text-white/80">
                A letter written from the heart.
              </motion.p>
            )}
            {introStep >= 2 && introStep < 3 && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-story text-xl italic text-white/80 mt-4">
                For the best friend who makes life better ❤️
              </motion.p>
            )}
            {introStep >= 3 && (
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-storybook text-4xl md:text-5xl font-extrabold text-pink-200 tracking-wide">
                💌 Letter To My Best Friend
              </motion.h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN PHASE (THE LETTER) ── */}
      <AnimatePresence>
        {phase === "main" && (
          <motion.div className="absolute inset-0 z-40 flex flex-col items-center pt-24 pb-8 px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }} exit={{ opacity: 0, transition: { duration: 2 } }}>
            
            <div className="w-full max-w-2xl h-[75vh] bg-white/10 border border-white/20 rounded-3xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-y-auto p-6 md:p-10 hide-scrollbar relative z-20">
              
              <div className="max-w-xl mx-auto flex flex-col gap-5 py-10">
                {LETTER_LINES.map((line, i) => {
                  if (line === "") return <div key={i} className="h-1" />;

                  const trigger = SCENE_TRIGGERS[line];
                  const isSignature = line === "Nikhil ❤️" || line === "Forever yours,";

                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15%" }}
                      onViewportEnter={() => {
                        if (trigger) setScene(trigger);
                      }}
                      className={`font-story text-lg md:text-xl leading-relaxed text-pink-50 ${
                        isSignature ? "text-right font-bold italic text-pink-300 text-2xl mt-4" : "text-left"
                      }`}
                      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                    >
                      {line}
                    </motion.p>
                  );
                })}

                {/* Finish Button at bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "0%" }}
                  className="mt-16 flex justify-center"
                >
                  <button
                    onClick={handleFinish}
                    className="bg-pink-600/80 hover:bg-pink-500 text-white font-storybook font-bold tracking-widest uppercase px-8 py-3 rounded-full backdrop-blur-md transition-all hover:scale-105 shadow-[0_0_20px_rgba(219,39,119,0.5)]"
                  >
                    Close Letter
                  </button>
                </motion.div>
              </div>
            </div>

            <p className="mt-4 text-white/50 font-storybook text-xs tracking-widest uppercase">Scroll gently</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ENDING PHASE ── */}
      <AnimatePresence>
        {phase === "ending" && (
          <motion.div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm text-center px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <StarryNight dense />

            {endStep >= 1 && endStep < 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <p className="font-story text-xl md:text-2xl italic text-white/90">Some stories are written by destiny.</p>
                <p className="font-story text-xl md:text-2xl italic text-white/90">Some are written by time.</p>
                <p className="font-story text-xl md:text-2xl italic text-pink-300">And some are written by friendship.</p>
              </motion.div>
            )}
            
            {endStep >= 2 && endStep < 3 && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-story text-2xl font-bold text-white mt-12">
                Thank you for being my most beautiful chapter.
              </motion.p>
            )}

            {endStep >= 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6">
                <div className="border border-white/20 bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                  <p className="text-xs font-storybook uppercase tracking-widest text-pink-400 mb-2">Next Episode</p>
                  <p className="text-3xl md:text-4xl font-display uppercase tracking-wider text-white">🔮 The Future Season</p>
                </div>
                
                <button
                  onClick={handleNextEpisode}
                  className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-storybook font-bold tracking-widest uppercase px-10 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(219,39,119,0.5)]"
                >
                  Continue Watching →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
