import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { markEpisodeCompleted } from "../../utils/progress";

// ─── Shared wrappers ───────────────────────────────────────────────────────────

function FloatingHearts({ count = 10 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-300/50 select-none"
          style={{
            left: `${(i * 83) % 92}%`,
            top: `${(i * 67) % 88}%`,
            fontSize: `${10 + (i % 4) * 6}px`,
          }}
          animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + (i % 4), delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

function FloatingStars({ count = 12 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-200"
          style={{
            width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            left: `${(i * 73) % 96}%`, top: `${(i * 61) % 92}%`,
            boxShadow: `0 0 ${4 + i * 2}px rgba(251,191,36,0.8)`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.25, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function FloatingNotes() {
  const notes = ["♩", "♪", "♫", "♬", "🎵"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute select-none text-purple-300/70"
          style={{ left: `${10 + (i * 79) % 80}%`, top: `${5 + (i * 59) % 80}%`, fontSize: `${14 + (i % 3) * 5}px` }}
          animate={{ y: [0, -35, 0], x: [0, (i % 2 ? 10 : -10), 0], opacity: [0.2, 0.8, 0.2], rotate: [0, (i % 2 ? 15 : -15), 0] }}
          transition={{ duration: 3.5 + i * 0.5, delay: i * 0.45, repeat: Infinity }}
        >
          {notes[i % notes.length]}
        </motion.span>
      ))}
    </div>
  );
}

function RoomWrap({ gradient, children, extraBg }: { gradient: string; children: React.ReactNode; extraBg?: React.ReactNode }) {
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} px-5 py-4`}>
      {extraBg}
      <FloatingHearts count={8} />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3">
        {children}
      </div>
    </div>
  );
}

function RoomBadge({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <motion.span className="text-4xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
        {icon}
      </motion.span>
      <span className="rounded-full bg-white/70 px-4 py-1 font-storybook text-xs font-extrabold uppercase tracking-[0.25em] text-rose-500 shadow-sm backdrop-blur-sm">
        {title}
      </span>
      {sub && <span className="font-storybook text-sm font-bold text-rose-400/80">{sub}</span>}
    </motion.div>
  );
}

function NarCard({ lines, delay = 0.3 }: { lines: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-sm rounded-3xl border border-white/70 bg-white/65 p-5 shadow-xl backdrop-blur-md"
    >
      {lines.map((line, i) =>
        line === "" ? (
          <div key={i} className="h-2" />
        ) : (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + i * 0.09 }}
            className="font-storybook text-sm leading-relaxed text-rose-900"
          >
            {line}
          </motion.p>
        )
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//   ROOMS
// ═══════════════════════════════════════════════════════════════════════════════

// 0 ─ Intro ────────────────────────────────────────────────────────────────────
function R0() {
  return (
    <RoomWrap gradient="from-[#1c0524] via-[#3b1048] to-[#0c1a3a]" extraBg={<FloatingStars count={30} />}>
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`, left: `${(i * 73) % 96}%`, top: `${(i * 61) % 90}%` }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.12, repeat: Infinity }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <motion.div
          className="text-5xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ❤️
        </motion.div>

        <div>
          <h1 className="font-storybook text-4xl font-extrabold text-white md:text-5xl">THINGS I ADMIRE</h1>
          <p className="mt-1 font-storybook text-lg font-bold text-pink-200">❤️</p>
        </div>

        <p className="font-storybook text-sm font-bold italic text-pink-200">
          "The little things that made you special to me."
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-xs rounded-2xl border border-pink-400/30 bg-pink-900/30 px-5 py-4 backdrop-blur-sm"
        >
          <p className="font-story text-sm italic leading-relaxed text-pink-100">
            "We started as strangers.<br />
            Became friends.<br />
            Shared every laugh,<br />
            every worry,<br />
            and every piece of tea. ☕😂<br />
            <br />
            And somewhere along the way,<br />
            you became family. ❤️"
          </p>
        </motion.div>

        <div className="flex gap-4 text-2xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      </motion.div>
    </RoomWrap>
  );
}

// 1 ─ Safe Place ───────────────────────────────────────────────────────────────
function R1() {
  return (
    <RoomWrap gradient="from-[#fff7ed] via-[#fce7f3] to-[#fef3c7]">
      {/* Cozy window rain */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-sky-200/60 rounded-full"
            style={{ left: `${(i * 79) % 95}%`, top: "-5%", height: `${15 + (i % 3) * 8}px` }}
            animate={{ y: ["0%", "110%"], opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.2 + (i % 4) * 0.3, delay: i * 0.25, repeat: Infinity }}
          />
        ))}
      </div>

      <RoomBadge icon="🏠" title="Room 1" sub="Safe Place" />

      {/* Cozy scene */}
      <div className="relative flex items-end justify-center gap-2">
        {/* Fireplace */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-3xl">🔥</div>
          <div className="h-8 w-14 rounded-b-lg bg-amber-800/40" />
        </motion.div>
      </div>

      <NarCard lines={[
        "Starting, I didn't know.",
        "",
        "But after some time, I realized...",
        "you had become my safe place.",
        "",
        "Everything felt right with you.",
        "The world seemed more peaceful with you.",
      ]} />
    </RoomWrap>
  );
}

// 2 ─ Loyalty ─────────────────────────────────────────────────────────────────
function R2() {
  return (
    <RoomWrap gradient="from-[#1c1a4a] via-[#2d1060] to-[#0c1a3a]" extraBg={<FloatingStars count={25} />}>
      <RoomBadge icon="💫" title="Room 2" sub="Loyalty" />

      {/* Stars forming heart */}
      <motion.div
        className="relative flex h-24 w-52 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { x: "30%", y: "20%" }, { x: "50%", y: "10%" }, { x: "70%", y: "20%" },
          { x: "80%", y: "40%" }, { x: "65%", y: "65%" }, { x: "50%", y: "80%" },
          { x: "35%", y: "65%" }, { x: "20%", y: "40%" },
        ].map((pos, i) => (
          <motion.span
            key={i}
            className="absolute text-amber-200 text-xs"
            style={{ left: pos.x, top: pos.y }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          >
            ✦
          </motion.span>
        ))}
        <motion.span
          className="text-4xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💜
        </motion.span>
      </motion.div>

      <NarCard lines={[
        "The first thing I admired...",
        "",
        "was your loyalty.",
        "",
        "Not promises.",
        "Not just words.",
        "",
        "But the way you stayed.",
        "",
        "And that made my heart trust you.",
      ]} />
    </RoomWrap>
  );
}

// 3 ─ Endless Conversations ──────────────────────────────────────────────────────────
function R3() {
  return (
    <RoomWrap gradient="from-[#fce7f3] via-[#ede9fe] to-[#e0f2fe]" extraBg={<FloatingStars count={15} />}>
      <RoomBadge icon="💬" title="Room 3" sub="Endless Conversations" />

      {/* Texting scene */}
      <div className="flex items-end gap-6">
        <div className="flex flex-col items-center gap-1">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            📱
          </motion.span>
        </div>

        <div className="flex flex-col items-center">
          {["💬", "✨", "😂"].map((note, i) => (
            <motion.span
              key={i}
              className="text-2xl drop-shadow-sm"
              animate={{ x: [0, 15, 30], y: [0, -10, -20], opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
            >
              {note}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1">
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            📱
          </motion.span>
        </div>
      </div>

      <NarCard lines={[
        "Our endless texts...",
        "",
        "The random memes, the late-night chats,",
        "and sharing every little detail.",
        "",
        "That's when I realized how special",
        "our bond was.",
      ]} />
    </RoomWrap>
  );
}

// 4 ─ Support System ───────────────────────────────────────────────────────────
function R4() {
  return (
    <RoomWrap gradient="from-[#fef9c3] via-[#fff7ed] to-[#fce7f3]">
      <RoomBadge icon="🌅" title="Room 4" sub="My Support System" />

      {/* Mountain sunrise scene */}
      <div className="relative flex w-full max-w-xs justify-center">
        {/* Sun */}
        <motion.div
          className="absolute top-2 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-amber-300"
          animate={{ boxShadow: ["0 0 20px rgba(251,191,36,0.4)", "0 0 50px rgba(251,191,36,0.9)", "0 0 20px rgba(251,191,36,0.4)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Mountains */}
        <svg viewBox="0 0 200 80" className="h-20 w-full">
          <polygon points="0,80 60,20 120,80" fill="#86efac" opacity="0.6" />
          <polygon points="80,80 140,15 200,80" fill="#4ade80" opacity="0.7" />
        </svg>

        {/* Characters on hill */}
        <div className="absolute bottom-0 right-8 flex items-end gap-1">
        </div>
      </div>

      <NarCard lines={[
        "Thank you for boosting me",
        "when I was low.",
        "",
        "Thank you for reminding me",
        "that I am stronger than I think.",
        "",
        "Thank you for always being there.",
      ]} />
    </RoomWrap>
  );
}

// 5 ─ Human Diary ─────────────────────────────────────────────────────────────
function R5() {
  return (
    <RoomWrap gradient="from-[#fef3c7] via-[#fce7f3] to-[#ede9fe]">
      <RoomBadge icon="📖" title="Room 5" sub="My Personal Human Diary" />

      {/* Floating books */}
      <div className="relative flex h-24 w-full max-w-xs items-end justify-center gap-3">
        {["📒", "📓", "📔", "📕", "📗"].map((b, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            animate={{ y: [0, -(10 + i * 5), 0], rotate: [0, (i % 2 ? 8 : -8), 0] }}
            transition={{ duration: 2 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
          >
            {b}
          </motion.span>
        ))}
      </div>

      <div className="flex items-end gap-4">
        <div className="flex flex-col items-center">
          <span className="text-xs font-storybook font-bold text-rose-400">talking 💬</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-storybook font-bold text-indigo-400">listening 👂</span>
        </div>
      </div>

      <NarCard lines={[
        "You listened to everything.",
        "My happiness. My fears.",
        "My overthinking. My dreams.",
        "My silly stories.",
        "",
        "You became my personal human diary.",
      ]} />
    </RoomWrap>
  );
}

// 6 ─ Comfort Zone ─────────────────────────────────────────────────────────────
function R6() {
  return (
    <RoomWrap gradient="from-[#dbeafe] via-[#ede9fe] to-[#fce7f3]">
      <RoomBadge icon="☁️" title="Room 6" sub="The Comfort Zone" />

      {/* Cloud kingdom */}
      <div className="relative flex w-full max-w-sm flex-col items-center">
        {/* Big cloud */}
        <motion.div
          className="relative flex h-24 w-64 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 10px 40px rgba(196,181,253,0.5)" }}
        >
          <div className="flex items-end gap-2">
          </div>
        </motion.div>

        {/* Smaller clouds */}
        {[{ left: "5%", top: "30%" }, { right: "5%", top: "20%" }].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-10 w-20 rounded-full bg-white/60"
            style={pos as React.CSSProperties}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
      </div>

      <NarCard lines={[
        "You are my comfort zone, kandha.",
        "",
        "With you,",
        "even silence felt beautiful.",
      ]} />
    </RoomWrap>
  );
}

// 7 ─ Every Little Memory ──────────────────────────────────────────────────────
function R7() {
  const memories = ["every joke 😄", "every fight 💢", "every hu 🙈", "every sorry 🥺", "every cry 💧", "every laugh 😂", "late-night call 🌙", "video call 📱", "surprise meet 🌸"];
  return (
    <RoomWrap gradient="from-[#1c1a4a] via-[#2d1060] to-[#1a0a20]" extraBg={<FloatingStars count={20} />}>
      <RoomBadge icon="🏮" title="Room 7" sub="Every Little Memory" />

      {/* Floating lanterns */}
      <div className="relative flex w-full max-w-sm flex-wrap justify-center gap-2">
        {memories.map((mem, i) => (
          <motion.div
            key={mem}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring" }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + (i % 3), delay: i * 0.3, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl">🏮</span>
              <div className="rounded-lg bg-amber-900/50 px-2 py-0.5 mt-0.5">
                <span className="font-storybook text-[9px] font-bold text-amber-100">{mem}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <NarCard lines={[
        "They all became beautiful stories.",
      ]} />
    </RoomWrap>
  );
}

// 8 ─ The Tea Room ───────────────────────────────────────────────────
function RTeaRoom() {
  return (
    <RoomWrap gradient="from-[#fdf2f8] via-[#f3e8ff] to-[#fff1f2]" extraBg={<FloatingHearts count={15} />}>
      <RoomBadge icon="☕" title="Room 8" sub="The Tea Room" />

      {/* Tea cups & Chat bubbles */}
      <div className="relative flex h-24 w-full max-w-xs items-end justify-center gap-4">
        {["☕", "🍵", "💬", "✨"].map((icon, i) => (
          <motion.span
            key={i}
            className="text-4xl drop-shadow-md"
            animate={{ y: [0, -15, 0], rotate: [0, (i % 2 ? 10 : -10), 0] }}
            transition={{ duration: 2.5 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
          >
            {icon}
          </motion.span>
        ))}
      </div>

      <NarCard lines={[
        "We shared every update.",
        "Every random thought.",
        "Every piece of tea. ☕😂",
        "",
        "Nothing stayed hidden for long.",
        "And that’s what made our friendship special.",
      ]} />
    </RoomWrap>
  );
}

// 9 ─ Growing Together ──────────────────────────────────────────────────
function R8() {
  return (
    <RoomWrap gradient="from-[#fef9c3] via-[#fde68a]/30 to-[#fce7f3]">
      <RoomBadge icon="🌅" title="Room 9" sub="Growing Together" />

      {/* Glowing golden path with silhouettes */}
      <div className="relative flex w-full max-w-xs flex-col items-center">
        {/* Sun glow */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-20 w-40 rounded-full bg-amber-200/40 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Path */}
        <svg viewBox="0 0 200 60" className="w-full">
          <path d="M 100 60 C 80 40 60 30 20 10" stroke="url(#pathGrad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M 100 60 C 120 40 140 30 180 10" stroke="url(#pathGrad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <defs>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
        </svg>

        {/* Walking silhouettes */}
        <div className="flex items-end gap-3">
        </div>
      </div>

      <NarCard lines={[
        "You became someone I never wanted to lose.",
        "",
        "The friend I wanted beside me",
        "through every chapter of life.",
        "",
        "No matter where we go,",
        "I hope our story keeps growing. ❤️",
      ]} />

      {/* Soft floating petals */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-pink-300/60 select-none text-xl"
          style={{ left: `${10 + (i * 79) % 80}%`, top: `${5 + (i * 59) % 40}%` }}
          animate={{ y: [0, 40, 80], x: [0, (i % 2 ? 15 : -15), 0], opacity: [0.6, 0.3, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4 + i, delay: i * 0.8, repeat: Infinity }}
        >
          🌸
        </motion.span>
      ))}
    </RoomWrap>
  );
}

// 9 ─ Final Room — Gratitude ───────────────────────────────────────────────────
function RFinal({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6500),
      setTimeout(() => setStep(4), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <RoomWrap gradient="from-[#1c0524] via-[#2d1060] to-[#0c1a3a]" extraBg={<FloatingStars count={30} />}>
      {/* Fireflies */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-amber-200"
          style={{ left: `${(i * 67) % 90}%`, top: `${(i * 53) % 80}%`, boxShadow: "0 0 8px rgba(251,191,36,0.9)" }}
          animate={{ opacity: [0, 1, 0], x: [0, (i % 2 ? 10 : -10), 0], y: [0, -15, 0] }}
          transition={{ duration: 2.5 + (i % 3), delay: i * 0.4, repeat: Infinity }}
        />
      ))}

      <div className="flex flex-col items-center gap-3 text-center">
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xs rounded-2xl border border-pink-400/30 bg-pink-900/30 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-story text-sm italic leading-relaxed text-pink-100">
                "Thank you for being my best friend.<br />
                Thank you for all the laughs.<br />
                Thank you for always listening.<br />
                Thank you for every memory.<br />
                Thank you for everything."
              </p>
              <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm">
                <p className="font-storybook text-xs font-bold uppercase tracking-widest text-pink-300">Next Episode</p>
                <p className="font-storybook text-xl font-extrabold text-white">SNEHAL BEING SNEHAL 🧪</p>
              </div>
              <button
                onClick={onContinue}
                className="mt-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 px-7 py-3 font-storybook font-extrabold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                ▶ Continue Watching
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RoomWrap>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//   MAIN Episode 4 Component
// ═══════════════════════════════════════════════════════════════════════════════

const ROOMS = [
  { label: "Intro", component: <R0 /> },
  { label: "Safe Place", component: <R1 /> },
  { label: "Loyalty", component: <R2 /> },
  { label: "Endless Conversations", component: <R3 /> },
  { label: "Support System", component: <R4 /> },
  { label: "Human Diary", component: <R5 /> },
  { label: "Comfort Zone", component: <R6 /> },
  { label: "Every Little Memory", component: <R7 /> },
  { label: "The Tea Room", component: <RTeaRoom /> },
  { label: "Growing Together", component: <R8 /> },
];
const TOTAL = ROOMS.length + 1; // +1 for final

export default function ThingsIAdmire() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFinal = current === TOTAL - 1;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsMusicOn(true)).catch(e => console.warn("Audio autoplay blocked", e));
    }
  }, []);

  useEffect(() => {
    setShowNext(false);
    const t = setTimeout(() => setShowNext(true), 3000);
    return () => clearTimeout(t);
  }, [current]);

  const goNext = useCallback(() => {
    if (current >= TOTAL - 1) return;
    setCurrent((c) => c + 1);
  }, [current]);

  const goPrev = useCallback(() => {
    if (current <= 0) return;
    setCurrent((c) => c - 1);
  }, [current]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.pause();
        setIsMusicOn(false);
      } else {
        audioRef.current.play();
        setIsMusicOn(true);
      }
    }
  };

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMusicOn(false);
    }
    setIsFading(true);
    markEpisodeCompleted(3);
    setTimeout(() => navigate("/", { state: { highlightEpisode: 4 } }), 1000);
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#1c0524]">
      <audio ref={audioRef} src="/ep4.mp3" loop />
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-pink-500/20 bg-black/40 px-4 py-2.5 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-1.5 font-storybook text-sm font-bold text-pink-200 transition-colors hover:text-white">
          <ArrowLeft size={15} />
          Snehalflix
        </Link>
        <div className="text-center">
          <p className="font-storybook text-[9px] font-extrabold uppercase tracking-widest text-pink-400">Episode 3</p>
          <p className="font-storybook text-sm font-extrabold text-white">Things I Admire ❤️</p>
        </div>
        <button
          onClick={toggleMusic}
          className="rounded-full bg-rose-900/50 px-3 py-1.5 font-storybook text-xs font-bold text-pink-200 transition-all hover:bg-rose-700 hover:text-white"
        >
          {isMusicOn ? "🔊" : "🔇"}
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex shrink-0 items-center justify-center gap-1.5 bg-black/20 py-2 backdrop-blur-sm">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-pink-400" : i < current ? "w-2 bg-rose-400/60" : "w-2 bg-rose-800/40"
            }`}
          />
        ))}
      </div>

      {/* Room display */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {isFinal ? <RFinal onContinue={handleContinue} /> : ROOMS[current].component}
          </motion.div>
        </AnimatePresence>

        {/* Timed Next Room button */}
        <AnimatePresence>
          {showNext && !isFinal && (
            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={goNext}
              className="absolute right-3 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center gap-2 rounded-2xl bg-white/90 px-4 py-5 font-storybook text-xs font-extrabold text-rose-600 shadow-2xl backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} className="text-rose-400" />
              <span className="[writing-mode:vertical-lr] tracking-widest uppercase text-rose-400 text-[10px]">
                Next Room
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="flex shrink-0 items-center justify-between border-t border-pink-500/20 bg-black/40 px-5 py-2.5 backdrop-blur-md">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="rounded-full bg-rose-900/50 px-4 py-1.5 font-storybook text-xs font-bold text-pink-200 transition-all hover:bg-rose-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Prev
        </button>
        <p className="font-storybook text-xs font-bold text-pink-300">
          {isFinal ? "The Gratitude Room" : ROOMS[current].label}
          <span className="ml-2 text-pink-500/60 text-[10px]">{current + 1}/{TOTAL}</span>
        </p>
        <button
          onClick={goNext}
          disabled={isFinal}
          className="rounded-full bg-rose-900/50 px-4 py-1.5 font-storybook text-xs font-bold text-pink-200 transition-all hover:bg-rose-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>

      {/* Fade overlay */}
      <AnimatePresence>
        {isFading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] bg-[#0b0b0b]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
