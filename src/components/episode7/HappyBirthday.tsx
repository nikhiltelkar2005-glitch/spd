import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

// --- Visual Backgrounds ---

function StarrySky({ dense = false }: { dense?: boolean }) {
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
          animate={{ x: [0, (i % 2 ? 20 : -20), 0], y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4 + (i % 3), delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FloatingLanterns() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-6 rounded-sm bg-orange-300"
          style={{
            left: `${Math.random() * 100}%`, bottom: `-10%`,
            boxShadow: "0 0 20px rgba(251,146,60,0.8), inset 0 -5px 10px rgba(234,88,12,0.8)"
          }}
          animate={{ y: ["0vh", "-110vh"], x: [0, Math.random() * 40 - 20, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 10 + Math.random() * 5, delay: i * 1.5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300/60 text-2xl"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -50], x: [0, Math.random() * 30 - 15], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

function ShootingStar() {
  return (
    <motion.div
      className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
      style={{ top: "20%", left: "-20%", rotate: "25deg" }}
      animate={{ x: ["0vw", "120vw"], y: ["0vh", "30vh"], opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatDelay: 12 }}
    />
  );
}

function Clouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <motion.div className="absolute top-[10%] left-[-20%] w-96 h-32 bg-white/20 blur-3xl rounded-full" animate={{ x: ["0vw", "120vw"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute top-[30%] left-[-40%] w-[500px] h-40 bg-white/10 blur-3xl rounded-full" animate={{ x: ["0vw", "140vw"] }} transition={{ duration: 60, delay: 10, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

// --- Main Component ---

export default function HappyBirthday() {
  const navigate = useNavigate();
  const [scene, setScene] = useState(1);
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.warn("Audio autoplay blocked", e));
    }
  }, []);

  // Sequence timings for scenes
  useEffect(() => {
    setStep(0);
    let timers: ReturnType<typeof setTimeout>[] = [];
    const advance = () => setScene((s) => (s < 10 ? s + 1 : s));

    if (scene === 1) {
      timers = [
        setTimeout(() => setStep(1), 2000),
        setTimeout(() => setStep(2), 6000),
        setTimeout(() => setStep(3), 10000),
        setTimeout(() => setStep(4), 16000), // sunrise transition style
        setTimeout(advance, 22000),
      ];
    } else if (scene === 2) {
      timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 3000),
        setTimeout(() => {
          setStep(3);
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#ec4899", "#a855f7", "#3b82f6"] });
        }, 5000),
        setTimeout(advance, 11000),
      ];
    } else if (scene === 3) {
      const wishDelays = [1000, 3000, 5000, 7000, 9000, 11000, 14000];
      wishDelays.forEach((delay, i) => timers.push(setTimeout(() => setStep(i + 1), delay)));
      timers.push(setTimeout(advance, 20000));
    } else if (scene === 4) {
      timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 5000),
        setTimeout(() => setStep(3), 9000),
        setTimeout(advance, 16000),
      ];
    } else if (scene === 5) {
      timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 5000),
        setTimeout(advance, 11000),
      ];
    } else if (scene === 6) {
      timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 5000),
        setTimeout(advance, 11000),
      ];
    } else if (scene === 7) {
      timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 5000),
        setTimeout(advance, 11000),
      ];
    } else if (scene === 8) {
      timers = [
        setTimeout(() => setStep(1), 1000),
        setTimeout(() => setStep(2), 5000),
        setTimeout(advance, 11000),
      ];
    } else if (scene === 9) {
      timers = [
        setTimeout(() => setStep(1), 2000),
        setTimeout(() => setStep(2), 8000),
        setTimeout(() => setStep(3), 14000),
      ];
    }

    return () => timers.forEach(clearTimeout);
  }, [scene]);

  const nextScene = () => {
    if (scene < 9) setScene(scene + 1);
    else navigate("/"); // Return Home
  };

  const currentBg = () => {
    switch (scene) {
      case 1: return step >= 4 ? "linear-gradient(to top, #db2777, #7c3aed, #0f172a)" : "linear-gradient(to bottom, #000000, #0a0a0a)";
      case 2: return "linear-gradient(to bottom, #1e1b4b, #3b0764)";
      case 3: return "linear-gradient(to bottom, #fbcfe8, #e9d5ff, #fed7aa)";
      case 4: return "linear-gradient(to bottom, #0f172a, #000000)";
      case 5: return "linear-gradient(to bottom, #172554, #020617)";
      case 6: return "linear-gradient(to bottom, #082f49, #020617)";
      case 7: return "linear-gradient(to bottom, #fda4af, #d8b4fe, #818cf8)";
      case 8: return "#000000";
      case 9: return "linear-gradient(to bottom, #020617, #000000)";
      default: return "#000000";
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden text-center flex flex-col justify-center items-center cursor-pointer transition-colors duration-2000"
      style={{ background: currentBg() }}
      onClick={nextScene}
    >
      <audio ref={audioRef} src="/ep6.mp3" loop />
      <AnimatePresence mode="wait">
        
        {/* --- SCENE 1: The Future --- */}
        {scene === 1 && (
          <motion.div key="s1" className="absolute inset-0 flex flex-col items-center justify-center z-10" exit={{ opacity: 0, transition: { duration: 1.5 } }}>
            <StarrySky />
            <ShootingStar />
            {step >= 1 && step < 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h2 className="font-display text-4xl text-white uppercase tracking-widest">The Future Season</h2>
                <p className="font-story text-xl italic text-white/80">Looking ahead to new horizons.</p>
                <p className="font-story text-xl italic text-white/80">Because every story is meant to evolve,<br/>and our bond is built<br/>for the long run.</p>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <p className="font-story text-xl italic text-white/90">No matter what changes,</p>
                <p className="font-story text-xl italic text-white/90">I know this friendship<br/>will remain one of the most beautiful constants<br/>of my life.</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* --- SCENE 2: The Horizon --- */}
        {scene === 2 && (
          <motion.div key="s2" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StarrySky dense />
            {step < 3 ? (
              <div className="space-y-4 font-story text-xl italic text-white/90">
                <p>New chapters are waiting to be written.</p>
                {step >= 1 && <p>More laughs, more adventures, more milestones.</p>}
                {step >= 2 && <p>Together, always.</p>}
              </div>
            ) : (
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center space-y-8">
                <h1 className="font-display text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  OUR FUTURE SEASON ❤️
                </h1>
                <div className="text-6xl animate-pulse">🌟</div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* --- SCENE 3: Friendship Wishes --- */}
        {scene === 3 && (
          <motion.div key="s3" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FloatingHearts />
            <Clouds />
            <div className="space-y-6 text-2xl md:text-3xl font-story italic text-amber-950 drop-shadow-sm font-bold">
              {step >= 1 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>I wish you continuous growth ❤️</motion.p>}
              {step >= 2 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>I wish you absolute peace ❤️</motion.p>}
              {step >= 3 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>I wish you vibrant health ❤️</motion.p>}
              {step >= 4 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>I wish you success in everything ❤️</motion.p>}
              {step >= 5 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>I wish all your dreams come true ❤️</motion.p>}
              {step >= 6 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-8 text-pink-700">And above everything,</motion.p>}
              {step >= 7 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-pink-700">I wish that you always stay happy ❤️</motion.p>}
            </div>
          </motion.div>
        )}

        {/* --- SCENE 4: Constant Support --- */}
        {scene === 4 && (
          <motion.div key="s4" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StarrySky dense />
            <div className="space-y-6 max-w-2xl px-4 text-xl md:text-2xl font-story text-white/90 italic leading-relaxed">
              {step >= 1 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>If the road gets rough,<br/>I will always hold space for you.</motion.p>}
              {step >= 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>If you ever feel tired,<br/>I will remind you of your strength.</motion.p>}
              {step >= 3 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>And no matter what the future holds,<br/>you will always find a friend in me.</motion.p>}
            </div>
          </motion.div>
        )}

        {/* --- SCENE 5: Gratitude --- */}
        {scene === 5 && (
          <motion.div key="s5" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FloatingLanterns />
            <Fireflies />
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-lg px-4 text-xl font-story italic text-blue-100">
                <p>Thank you for all the memories.</p>
                <p>Thank you for standing by me.</p>
                <p>And thank you for being you—<br/>the best friend anyone could ever ask for.</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* --- SCENE 6: No Regrets --- */}
        {scene === 6 && (
          <motion.div key="s6" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StarrySky />
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-xl px-4 text-xl md:text-2xl font-story italic text-blue-100 leading-relaxed">
                <p>Looking back at our journey,</p>
                <p>I would choose this friendship a thousand times over.</p>
                {step >= 2 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-300 font-bold mt-8">
                    Because your presence in my life<br/>is something I will cherish<br/>forever.
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* --- SCENE 7: Final Tribute Message --- */}
        {scene === 7 && (
          <motion.div key="s7" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StarrySky dense />
            <div className="space-y-12 max-w-2xl px-4 text-xl md:text-2xl font-story italic text-white/90">
              {step >= 1 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-display uppercase tracking-widest text-pink-300 not-italic">
                  To Snehal ❤️
                </motion.p>
              )}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>Our paths crossed for a reason,</p>
                  <p className="mt-4">and I am forever grateful for the day you walked into my world.</p>
                  <p className="mt-4 font-bold text-pink-200">You are truly one of a kind.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* --- SCENE 8: Credits --- */}
        {scene === 8 && (
          <motion.div key="s8" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StarrySky />
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-white/80 uppercase tracking-[0.35em] text-sm md:text-base">
                <h1 className="font-display text-4xl md:text-6xl text-sam-red mb-2">SNEHALFLIX</h1>
                <p>THE BEST FRIEND SEASON</p>
                
                <div className="mt-12">
                  <p className="text-xs text-white/50 mb-2">Starring</p>
                  <p className="text-xl font-bold text-white">Snehal ❤️</p>
                </div>
                
                <div className="mt-12 normal-case tracking-normal font-story italic text-xl">
                  <p>Created with endless respect,</p>
                  <p>wholesome memories,</p>
                  <p>and beautiful gratitude</p>
                </div>
                
                <div className="mt-8">
                  <p className="text-xs text-white/50 uppercase tracking-[0.35em] mb-2">By</p>
                  <p className="text-2xl font-story text-pink-400 font-bold capitalize tracking-normal">Your Best Friend Nikhil ❤️</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* --- SCENE 9: Last Scene --- */}
        {scene === 9 && (
          <motion.div key="s9" className="absolute inset-0 flex flex-col items-center justify-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StarrySky />
            <ShootingStar />

            {step >= 1 && step < 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 font-story text-2xl italic text-white/90 drop-shadow-md">
                <p>Some friendships come into our lives<br/>and quietly change everything.</p>
                {step >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>Thank you, Snehal.</p>
                    <p className="text-3xl text-pink-300 font-bold mt-4">For being the best friend I could ever wish for ❤️</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
                <p className="font-mono text-xl tracking-[0.5em] text-white/60">END OF SEASON 1</p>
                <p className="text-4xl text-white/40 mt-6">∞</p>
                
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/"); }}
                  className="mt-16 px-6 py-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs tracking-widest uppercase"
                >
                  Return Home
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
      
      {/* Progress indicator */}
      {scene < 9 && (
        <div className="absolute bottom-6 flex gap-2 z-50">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i + 1 === scene ? "bg-white" : i + 1 < scene ? "bg-white/50" : "bg-white/10"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
