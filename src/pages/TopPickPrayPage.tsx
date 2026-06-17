import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const paragraphs = [
  "There are some people you quietly root for every single day.",
  "Not because they asked you to.",
  "But because they genuinely deserve every good thing life has to offer.",
  "Snehal, you are one of those people for me.",
  "Every day, in some way, I hope the best for you.",
  "I hope you stay healthy.",
  "I hope your heart finds peace.",
  "I hope your hard work is rewarded.",
  "I hope every burden you carry becomes a little lighter.",
  "And I hope life becomes kinder to you.",
  "Because I have seen how much you give to others.",
  "I have seen how much heart you pour into everything you do.",
  "I have seen you show up for people without expecting anything back.",
  "You carry so much, yet you continue to smile.",
  "You continue to be kind.",
  "You continue to show up.",
  "And for that, you deserve every happiness this world can offer.",
  "Sometimes my wishes for you are simple.",
  '"Please let her have a good day."',
  "Sometimes they are a little louder.",
  '"Please give her strength for everything she is facing."',
  "And sometimes they are just silent thoughts.",
  "Just hoping you are okay.",
  "No matter how busy life gets,",
  "a part of me will always want the best for you.",
  "I will always hope that your dreams come true.",
  "I will always hope that your home is filled with peace.",
  "I will always hope that the people around you appreciate you the way you deserve.",
  "Because that is what best friends do.",
  "They want the best for each other, always.",
  "Not just when it is easy.",
  "But through every chapter.",
  "And if there is one wish I will always carry, it is this:",
  "May you always be protected.\nMay you always be happy.\nMay you always find reasons to smile.",
  "And may every road you walk lead you toward the life you deserve.",
  "Because among all the people I have met,",
  "you are one of the very few",
  "I will always, always root for. ❤️",
];

function Stars({ count = 100, color = "#DBEAFE" }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Fireflies() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none overflow-hidden z-20">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFF] blur-[1px]"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 50}%`,
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FloatingLantern({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: "100vh", opacity: 0, x: "50%" }}
          animate={{ y: "-20vh", opacity: [0, 1, 1, 0], x: "45%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 15, ease: "linear" }}
          className="absolute left-[30%] bottom-0 w-8 h-12 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-md shadow-[0_0_30px_rgba(255,165,0,0.8)] z-10"
        />
      )}
    </AnimatePresence>
  );
}

export default function TopPickPrayPage() {
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
      // Mapping the 73 paragraphs to the scroll progress
      setActiveCue(Math.floor(latest * paragraphs.length));
      if (latest > 0.985) setIsEnding(true);
      else setIsEnding(false);
    });
  }, [scrollYProgress]);

  // Background Transitions based on paragraph index
  // Galaxy starts at CUE 4 (Index 41), Sunrise starts at CUE 7 (Index 62)
  const bgOpacityMoonlight = useTransform(scrollYProgress, [0, 41 / 73, 45 / 73], [1, 1, 0]);
  const bgOpacityGalaxy = useTransform(scrollYProgress, [40 / 73, 44 / 73, 62 / 73, 65 / 73], [0, 1, 1, 0]);
  const bgOpacitySunrise = useTransform(scrollYProgress, [61 / 73, 64 / 73], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[2500vh] w-full bg-[#0B0F19] text-[#1F2937] selection:bg-[#A78BFA] selection:text-white font-inter">
      
      {/* ── FIXED BACKGROUND ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Moonlight Sky */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#1E1B4B] to-[#312E81]" style={{ opacity: bgOpacityMoonlight }} />
        
        {/* Galaxy Sky */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#2E1065] to-[#4C1D95]" style={{ opacity: bgOpacityGalaxy }} />
        
        {/* Sunrise Sky */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#4C1D95] via-[#9D174D] to-[#FDBA74]" style={{ opacity: bgOpacitySunrise }} />

        {/* Base Atmosphere Elements */}
        <Stars count={150} color="#DBEAFE" />
        <Fireflies />

        {/* Large Moon */}
        <motion.div 
          className="absolute top-10 right-20 w-48 h-48 rounded-full bg-[#EDE9FE] shadow-[0_0_100px_rgba(219,234,254,0.6)]"
          style={{ opacity: bgOpacityMoonlight }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* CUE 1 (Index 19): "Please keep him safe" - Lantern Rising */}
        <FloatingLantern active={activeCue >= 19 && activeCue < 25} />

        {/* CUE 2 (Index 23): "Just your name in my heart" - Small glowing heart constellation */}
        <AnimatePresence>
          {activeCue >= 23 && activeCue < 30 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[30%] left-[20%] text-[#DBEAFE] opacity-60 w-32 h-32"
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CUE 3 (Index 36): "the one I pray for. ❤️" - Stars gather to form large glowing heart */}
        <AnimatePresence>
          {activeCue >= 36 && activeCue < 42 && (
            <motion.div 
              initial={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
              animate={{ opacity: 0.4, scale: 1, filter: "blur(4px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center text-[#A78BFA]"
            >
              <svg className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CUE 5 (Index 43): "Then I hope you find me..." - Two distant stars move toward each other */}
        <AnimatePresence>
          {activeCue >= 43 && activeCue < 50 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ x: "-40vw", opacity: 0 }} animate={{ x: "-2vw", opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }}
                className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#FFFFFF]"
              />
              <motion.div 
                initial={{ x: "40vw", opacity: 0 }} animate={{ x: "2vw", opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }}
                className="w-4 h-4 bg-[#A78BFA] rounded-full shadow-[0_0_20px_#A78BFA]"
              />
            </div>
          )}
        </AnimatePresence>

        {/* CUE 6 (Index 55): "I would choose you" - Cosmic heart */}
        <AnimatePresence>
          {activeCue >= 55 && activeCue < 60 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -10 }} animate={{ scale: 1, opacity: 0.9, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2, type: "spring" }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FBCFE8] w-64 h-64 drop-shadow-[0_0_40px_rgba(251,207,232,0.8)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CUE 8 (Index 66): "watch you grow higher" - Glowing mountain peak */}
        <AnimatePresence>
          {activeCue >= 66 && (
            <motion.div 
              initial={{ y: "20vh", opacity: 0 }} animate={{ y: "0vh", opacity: 0.8 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
              className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-transparent via-[#EDE9FE]/10 to-[#FFFFFF]/40 mix-blend-screen"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          )}
        </AnimatePresence>

      </div>

      {/* ── SCROLLING CONTENT ── */}
      <div className="relative z-30 w-full max-w-3xl mx-auto pt-[40vh] pb-[100vh] px-4 flex flex-col items-center gap-[45vh]">
        
        {/* Title Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="rounded-3xl border border-[#A78BFA]/40 bg-[#EDE9FE]/80 p-10 shadow-[0_0_40px_rgba(167,139,250,0.4)] backdrop-blur-[24px] text-center w-full"
        >
          <p className="text-[#A78BFA] font-bold tracking-[0.3em] uppercase text-sm mb-4">Always Wishing the Best</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1F2937] font-bold">THE ONE I ROOT FOR</h1>
          <p className="mt-8 text-[#1F2937]/60 italic font-story text-lg animate-pulse">Scroll gently...</p>
        </motion.div>

        {/* Paragraphs */}
        {paragraphs.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6, margin: "-10% 0px -20% 0px" }}
            transition={{ duration: 1.2 }}
            className="rounded-2xl border border-[#A78BFA]/30 bg-[#EDE9FE]/70 p-8 shadow-xl backdrop-blur-[24px] w-full text-center max-w-xl mx-auto"
          >
            {text.includes("**") ? (
              <p className="font-story text-xl md:text-2xl font-bold text-[#1F2937] leading-loose whitespace-pre-line">
                {text.replace(/\*\*/g, '')}
              </p>
            ) : (
              <p className="font-story text-xl md:text-2xl font-medium text-[#1F2937] leading-loose whitespace-pre-line">
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000]/60 backdrop-blur-md text-white"
          >
            {/* Ambient Background for end screen */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="relative z-10 max-w-2xl px-6 text-center space-y-12"
            >
              <div className="font-story italic text-2xl md:text-4xl leading-relaxed text-[#EDE9FE] drop-shadow-md">
                <p>"Some people become memories.</p>
                <p>Some become your biggest cheerleaders.</p>
                <p className="font-bold mt-4 text-[#A78BFA]">You became my favorite person to root for."</p>
              </div>

              <div className="pt-12">
                <p className="text-[#A78BFA] font-bold tracking-[0.3em] uppercase text-sm mb-4">Always Wishing the Best</p>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(167,139,250,0.8)]">
                  THE ONE I ROOT FOR
                </h1>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                onClick={() => navigate("/#about")}
                className="mt-16 px-8 py-3 rounded-full bg-[#EDE9FE] text-[#1F2937] font-bold tracking-widest uppercase text-sm hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(167,139,250,0.8)] transition-all"
              >
                Return Home
              </motion.button>
            </motion.div>
            
            {/* Multiple floating lanterns for the ending */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", opacity: 0, x: `${20 + i * 15}vw` }}
                animate={{ y: "-20vh", opacity: [0, 0.8, 0] }}
                transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: i * 2 }}
                className="absolute w-6 h-10 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-md shadow-[0_0_20px_rgba(255,165,0,0.6)] z-0"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
