import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Particles Component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD166]/60"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px rgba(255, 209, 102, 0.4)"
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <motion.div
        className="absolute top-[10%] left-[-20%] w-[600px] h-32 bg-[#FFF4D6]/20 blur-[100px] rounded-full"
        animate={{ x: ["0vw", "120vw"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[30%] left-[-40%] w-[800px] h-40 bg-[#F4A261]/20 blur-[120px] rounded-full"
        animate={{ x: ["0vw", "140vw"] }}
        transition={{ duration: 80, delay: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden origin-top opacity-30 mix-blend-screen">
      <motion.div
        className="absolute top-[-20%] left-[20%] w-32 h-[150%] bg-gradient-to-b from-[#FFF4D6] to-transparent blur-3xl rotate-[25deg]"
        animate={{ opacity: [0.3, 0.6, 0.3], rotate: [25, 27, 25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[-20%] left-[60%] w-48 h-[150%] bg-gradient-to-b from-[#FFD166] to-transparent blur-3xl rotate-[-15deg]"
        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [-15, -17, -15] }}
        transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function TopPickProudPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background shifts
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0, 0]);
  const bgOpacity2 = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, 1, 1, 0]);
  const bgOpacity3 = useTransform(scrollYProgress, [0.4, 0.6, 0.8, 1], [0, 0, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleChibi = useTransform(scrollYProgress, [0.8, 1], [1, 1.2]);

  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.98) {
        setIsEnding(true);
      } else {
        setIsEnding(false);
      }
    });
  }, [scrollYProgress]);

  const paragraphs = [
    { id: 1, content: "I have known you for only a short time." },
    { id: 2, content: "But in that time, I have seen enough to know how much you carry every single day." },
    { id: 3, content: "And that is why I am so proud of you, Snehal." },
    { id: 4, content: "Not because life was easy for you." },
    { id: 5, content: "But because it wasn't." },
    { id: 6, content: "And yet, you kept going." },
    { id: 7, content: "I have seen the responsibilities you carry." },
    { id: 8, content: "The pressure you face." },
    { id: 9, content: "The worries you hide behind your smile." },
    { id: 10, content: "The weight that rests on your shoulders every single day." },
    { id: 11, content: "And somehow, despite carrying so much, you continue moving forward." },
    { id: 12, content: "That strength is something I deeply admire." },
    { id: 13, content: "The world may see a strong girl." },
    { id: 14, content: "But as your friend, I see the sacrifices behind that strength." },
    { id: 15, content: "I see the effort." },
    { id: 16, content: "I see the sleepless nights." },
    { id: 17, content: "I see the struggles." },
    { id: 18, content: "And I see a person who never stops trying." },
    { id: 19, content: "A person who puts others before herself." },
    { id: 20, content: "A person whose heart is bigger than most people will ever understand." },
    { id: 21, content: "You are one of the most hardworking, kind-hearted people I know." },
    { id: 22, content: "And I hope you never forget that." },
    { id: 23, content: "No matter where life takes us,\nI hope you know this:" },
    { id: 24, content: "I am proud of you." },
    { id: 25, content: "Not for what you have." },
    { id: 26, content: "Not for what you achieved." },
    { id: 27, content: "But for the person you are." },
    { id: 28, content: "And for the person you continue to become. ❤️" },
  ];

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-[#1a0f08] text-[#2D2D2D] selection:bg-[#FFD166] selection:text-black">
      
      {/* ── FIXED BACKGROUND ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        
        {/* Sky Layers */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#2a1310] via-[#5b2a1a] to-[#d67229]" style={{ opacity: bgOpacity1 }} />
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#1a110a] via-[#4a2511] to-[#e68a35]" style={{ opacity: bgOpacity2 }} />
        <motion.div className="absolute inset-0 bg-gradient-to-b from-[#0a0502] via-[#2a1508] to-[#FFD166]" style={{ opacity: bgOpacity3 }} />

        <Clouds />
        <LightRays />
        <FloatingParticles />

        {/* Character & Visual Storytelling */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-end h-[60vh] w-full max-w-lg"
          style={{ y: y1 }}
        >
          {/* Abstract Symbolic Background Elements behind character */}
          <motion.div className="absolute inset-0 flex items-center justify-center -z-10 opacity-40">
            <motion.div 
              className="w-full h-40 bg-gradient-to-t from-transparent via-[#F4A261] to-transparent blur-[100px]"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            style={{ scale: scaleChibi }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_30px_rgba(255,209,102,0.4)]">
              {/* Sun/Orb */}
              <motion.circle 
                cx="100" cy="80" r="25" 
                fill="url(#sunGradient)" 
                animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Distant Peak */}
              <path d="M50 200 L100 110 L150 200 Z" fill="#F4A261" opacity="0.4" />
              {/* Middle Peak */}
              <path d="M10 200 L70 130 L130 200 Z" fill="#8b4a2a" opacity="0.8" />
              {/* Foreground Peak */}
              <path d="M70 200 L140 100 L210 200 Z" fill="#3d1c0a" />
              
              <defs>
                <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#FFF4D6" />
                  <stop offset="70%" stopColor="#FFD166" />
                  <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

      </div>

      {/* ── SCROLLING CONTENT ── */}
      <div className="relative z-20 w-full max-w-3xl mx-auto pt-[40vh] pb-[100vh] px-4 flex flex-col items-center gap-[40vh]">
        
        {/* Title Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="rounded-3xl border border-[#FFD166]/40 bg-[#FFF4D6]/80 p-10 shadow-[0_0_40px_rgba(255,209,102,0.3)] backdrop-blur-[20px] text-center w-full"
        >
          <p className="text-[#F4A261] font-bold tracking-[0.3em] uppercase text-sm mb-4">Strength & Resilience</p>
          <h1 className="font-display text-4xl md:text-6xl text-[#2D2D2D] font-bold">🏆 The Friend I'm Proud Of</h1>
          <p className="mt-8 text-[#2D2D2D]/60 italic font-story text-lg animate-pulse">Scroll gently...</p>
        </motion.div>

        {/* Paragraphs */}
        {paragraphs.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6, margin: "-10% 0px -20% 0px" }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-[#FFD166]/20 bg-[#FFF4D6]/60 p-6 md:p-8 shadow-xl backdrop-blur-[15px] w-full text-center max-w-xl mx-auto"
          >
            <p className="font-story text-xl md:text-2xl font-medium text-[#2D2D2D] leading-relaxed">
              {p.content}
            </p>
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFD166]/95 backdrop-blur-xl text-[#2D2D2D]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,214,0.8),transparent)]" />
            <FloatingParticles />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="relative z-10 max-w-2xl px-6 text-center space-y-12"
            >
              <div className="font-story italic text-2xl md:text-4xl leading-relaxed text-[#5b2a1a]">
                <p>"Some people inspire others through words.</p>
                <p>Some inspire through their strength.</p>
                <p className="font-bold mt-4">You inspired me through both."</p>
              </div>

              <div className="pt-12">
                <h1 className="font-display text-5xl md:text-7xl font-bold text-[#2D2D2D] drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                  🏆 The Friend I'm Proud Of
                </h1>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                onClick={() => navigate("/#about")}
                className="mt-16 px-8 py-3 rounded-full bg-[#FFF4D6] text-[#2D2D2D] font-bold tracking-widest uppercase text-sm hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,209,102,0.8)] transition-all"
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
