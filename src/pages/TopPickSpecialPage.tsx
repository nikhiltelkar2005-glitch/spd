import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const paragraphs = [
  "Some people enter our lives and leave a mark.",
  "Some become memories.",
  "Some become stories we tell.",
  "And then there are a few people who quietly become a part of who we are.",
  "You are that person for me, Snehal.",
  "You were never just someone I knew.",
  "You became my comfort.",
  "My safe place.",
  "My favorite person to text.",
  "The friend who actually gets it.",
  "And the one who makes ordinary days feel better just by being there.",
  "Before you, I never realized how much a true friendship could change things.",
  "A simple text from you could make me smile.",
  "A voice note from you could turn a rough day around.",
  "And somehow, knowing you were there always brought a sense of peace.",
  "I love our conversations.",
  "I love our laughter.",
  "I love our silly arguments.",
  "I love the way you call me out and then act completely innocent about it.",
  "I love the way you genuinely care.",
  "The way you remember things.",
  "The way you show up without being asked.",
  "The way you make people feel important.",
  "You became a part of my routine.",
  "A part of my happiness.",
  "A part of my story.",
  "And before I realized it, you became one of my favorite people.",
  "You are my best friend.",
  "The kind of friend I never thought I'd find.",
  "The kind that makes you feel like you've known them forever.",
  "The kind that feels like home.",
  "Maybe life doesn't always go the way we plan.",
  "Maybe paths cross and drift in unexpected ways.",
  "But no matter where life takes us, one thing will never change.",
  "You will always be someone so special to me.",
  "Not because of any one thing.",
  "But because of everything you are.",
  "Because of the memories we created.",
  "Because of the warmth you brought into my life.",
  "And because our friendship became one of the most beautiful chapters of my story.",
  "Some people are unforgettable.",
  "Some people are irreplaceable.",
  "And for me, you are both.",
  "You will always be,",
  "**my best friend.** ❤️"
];

function FloatingPetals({ count = 40 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * 100;
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 20;
        const size = 15 + Math.random() * 20;
        
        return (
          <motion.div
            key={i}
            className="absolute opacity-60"
            style={{
              left: `${startX}%`,
              top: "-50px",
              width: `${size}px`,
              height: `${size}px`,
              filter: "drop-shadow(0px 4px 6px rgba(225, 29, 72, 0.4)) blur(1px)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [`${startX}%`, `${startX + (Math.random() * 20 - 10)}%`],
              rotate: [0, Math.random() * 360],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 200 200" fill="currentColor" className="text-[#FDA4AF] w-full h-full">
              <path d="M100 20C100 20 140 40 160 80C180 120 140 160 100 180C60 160 20 120 40 80C60 40 100 20 100 20Z" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

function PulsingGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
      <motion.div
        className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#E11D48] filter blur-[150px] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export default function TopPickSpecialPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeCue, setActiveCue] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setActiveCue(Math.floor(latest * paragraphs.length));
      if (latest > 0.985) setIsEnding(true);
      else setIsEnding(false);
    });
  }, [scrollYProgress]);

  // Background Transitions based on paragraph index
  // Twilight -> Crimson (Index 27 "You are my first love") -> Rose Gold Dawn (Index 41 "irreplaceable")
  const bgOpacityTwilight = useTransform(scrollYProgress, [0, 26 / 45, 29 / 45], [1, 1, 0]);
  const bgOpacityCrimson = useTransform(scrollYProgress, [25 / 45, 28 / 45, 40 / 45, 43 / 45], [0, 1, 1, 0]);
  const bgOpacityDawn = useTransform(scrollYProgress, [39 / 45, 42 / 45], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[2000vh] w-full bg-[#0B0F19] text-[#1F2937] selection:bg-[#FDA4AF] selection:text-white font-inter">
      
      {/* ── FIXED BACKGROUND ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Twilight Purple */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#2E1065] via-[#4C1D95] to-[#701A75]" style={{ opacity: bgOpacityTwilight }} />
        
        {/* Deep Crimson / Burgundy */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#4C0519] via-[#881337] to-[#BE123C]" style={{ opacity: bgOpacityCrimson }} />
        
        {/* Rose Gold Dawn */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#9F1239] via-[#E11D48] to-[#FDA4AF]" style={{ opacity: bgOpacityDawn }} />

        {/* Base Atmosphere Elements */}
        <PulsingGlow />
        <FloatingPetals count={30} />

        {/* Heartbeat Flash at "You are my first love" (Index 27) */}
        <AnimatePresence>
          {activeCue >= 27 && activeCue < 30 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.1, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#FDA4AF] mix-blend-screen"
            />
          )}
        </AnimatePresence>

        {/* CUE: Bright Glow at "irreplaceable" (Index 41) */}
        <AnimatePresence>
          {activeCue >= 41 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#FFE4E6] to-transparent mix-blend-overlay"
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── SCROLLING CONTENT ── */}
      <div className="relative z-30 w-full max-w-3xl mx-auto pt-[40vh] pb-[100vh] px-4 flex flex-col items-center gap-[40vh]">
        
        {/* Title Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="rounded-3xl border border-[#FDA4AF]/40 bg-[#FFF1F2]/80 p-10 shadow-[0_0_40px_rgba(225,29,72,0.3)] backdrop-blur-[24px] text-center w-full"
        >
          <p className="text-[#E11D48] font-bold tracking-[0.3em] uppercase text-sm mb-4">One of a Kind</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#4C0519] font-bold">MY BEST FRIEND</h1>
          <p className="mt-8 text-[#4C0519]/60 italic font-story text-lg animate-pulse">Scroll gently...</p>
        </motion.div>

        {/* Paragraphs */}
        {paragraphs.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6, margin: "-10% 0px -20% 0px" }}
            transition={{ duration: 1.2 }}
            className="rounded-2xl border border-[#FDA4AF]/30 bg-[#FFF1F2]/70 p-8 shadow-xl backdrop-blur-[24px] w-full text-center max-w-xl mx-auto"
          >
            {text.includes("**") ? (
              <p className="font-story text-xl md:text-2xl font-bold text-[#4C0519] leading-loose whitespace-pre-line">
                {text.replace(/\*\*/g, '')}
              </p>
            ) : (
              <p className="font-story text-xl md:text-2xl font-medium text-[#4C0519] leading-loose whitespace-pre-line">
                {text}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── ENDING ANIMATION ── */}
      <AnimatePresence>
        {isEnding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#4C0519]/80 backdrop-blur-md text-white overflow-hidden"
          >
            {/* Soft Particles Burst */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * window.innerWidth,
                  y: (Math.random() - 0.5) * window.innerHeight 
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeOut", delay: Math.random() * 2 }}
                className="absolute w-2 h-2 rounded-full bg-[#FDA4AF] shadow-[0_0_10px_#FDA4AF]"
              />
            ))}

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="relative z-10 max-w-2xl px-6 text-center space-y-12"
            >
              <div className="font-story italic text-2xl md:text-4xl leading-relaxed text-[#FFE4E6] drop-shadow-md">
                <p>"Some people are unforgettable.</p>
                <p>Some people are irreplaceable.</p>
                <p className="font-bold mt-4 text-[#FDA4AF]">And for me, you are both."</p>
              </div>

              <div className="pt-12">
                <p className="text-[#FDA4AF] font-bold tracking-[0.3em] uppercase text-sm mb-4">One of a Kind</p>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(253,164,175,0.8)]">
                  MY BEST FRIEND
                </h1>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                onClick={() => navigate("/#about")}
                className="mt-16 px-8 py-3 rounded-full bg-[#FFE4E6] text-[#4C0519] font-bold tracking-widest uppercase text-sm hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(253,164,175,0.8)] transition-all"
              >
                Return Home
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
