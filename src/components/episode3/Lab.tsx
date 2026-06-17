import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import FloatingMolecules from "./FloatingMolecules";
import { markEpisodeCompleted } from "../../utils/progress";

// ─── Shared wrappers ───────────────────────────────────────────────────────────

function ChamberWrap({ gradient, children }: { gradient: string; children: React.ReactNode }) {
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} px-5 py-6`}>
      <FloatingMolecules count={10} />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4">
        {children}
      </div>
    </div>
  );
}

function ChapterBadge({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <motion.span
        className="text-4xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.span>
      <span className="rounded-full bg-white/70 px-4 py-1 font-storybook text-xs font-extrabold uppercase tracking-[0.3em] text-purple-600 shadow-sm backdrop-blur-sm">
        {title}
      </span>
      {sub && <span className="font-storybook text-[11px] font-bold text-purple-400/80">{sub}</span>}
    </motion.div>
  );
}

function Card({ children, delay = 0.3 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-sm rounded-3xl border border-white/70 bg-white/65 p-5 shadow-xl backdrop-blur-md"
    >
      {children}
    </motion.div>
  );
}

function Narration({ lines }: { lines: string[] }) {
  return (
    <Card>
      <div className="space-y-1.5">
        {lines.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-2" />
          ) : (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="font-storybook text-sm leading-relaxed text-purple-900"
            >
              {line}
            </motion.p>
          )
        )}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//   CHAMBER COMPONENTS  (no chibi characters — emoji / pure CSS visuals only)
// ═══════════════════════════════════════════════════════════════════════════════

// 0 ─ Intro / Title ────────────────────────────────────────────────────────────
function C0() {
  return (
    <ChamberWrap gradient="from-[#1a0533] via-[#2d1060] to-[#0f2044]">
      {/* Stars */}
      {Array.from({ length: 35 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`,
            left: `${(i * 73) % 96}%`, top: `${(i * 61) % 90}%`,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.1, repeat: Infinity }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        {/* Animated beakers */}
        <div className="flex gap-4 text-5xl">
          {["🧪", "⚗️", "🔬"].map((s, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -14, 0], rotate: [0, (i % 2 ? 8 : -8), 0] }}
              transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        <p className="font-storybook text-xs font-extrabold uppercase tracking-[0.5em] text-purple-300">
          Episode 4
        </p>

        <h1 className="font-storybook text-5xl font-extrabold leading-tight text-white md:text-6xl">
          SNEHAL BEING
          <br />
          SNEHAL
        </h1>

        <p className="font-storybook text-lg font-bold text-purple-200">
          The Chemistry of Snehal
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-xs rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 backdrop-blur-sm"
        >
          <p className="font-story text-sm italic leading-relaxed text-purple-100">
            "Every best friend understands reactions.<br />
            This episode is about the reactions<br />
            that make Snehal who she is."
          </p>
        </motion.div>

        {/* Glowing atom */}
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/30 text-4xl ring-4 ring-purple-300/50"
          animate={{ boxShadow: ["0 0 20px rgba(168,85,247,0.3)", "0 0 50px rgba(168,85,247,0.8)", "0 0 20px rgba(168,85,247,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚛️
        </motion.div>
      </motion.div>
    </ChamberWrap>
  );
}

// 1 ─ Periodic Table of Snehal ─────────────────────────────────────────────────
function C1() {
  const props = ["Kind", "Intelligent", "Mischievous", "Animal Lover", "Protective", "Loyal", "Caring", "Soft-hearted", "Responsible"];
  return (
    <ChamberWrap gradient="from-[#fce7f3] via-[#f3e8ff] to-[#e0f2fe]">
      <ChapterBadge icon="⚛️" title="Chamber 1" sub="Periodic Table of Snehal" />

      <motion.div
        initial={{ scale: 0.7, rotateY: 90, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className="relative w-36 overflow-hidden rounded-2xl border-4 border-purple-400 bg-gradient-to-br from-purple-100 via-pink-50 to-sky-100 p-3 text-center shadow-2xl"
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 30px rgba(168,85,247,0.7)", "0 0 0px rgba(168,85,247,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <p className="relative font-mono text-[10px] font-bold text-purple-400">Core Element</p>
        <p className="relative font-storybook text-5xl font-extrabold text-purple-700">Sn</p>
        <p className="relative font-storybook text-base font-extrabold text-purple-800">Snehal</p>
        <div className="relative mt-1 rounded-lg bg-purple-500/10 px-2 py-0.5">
          <p className="font-storybook text-[9px] font-bold uppercase tracking-wider text-purple-500">Rare Element</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-1.5"
      >
        {props.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.07 }}
            className="rounded-full bg-white/80 px-3 py-1 font-storybook text-xs font-bold text-purple-700 shadow-sm"
          >
            ✓ {p}
          </motion.span>
        ))}
      </motion.div>

      <Narration lines={['"Rare elements are difficult to find.', '', 'Some people are too."']} />
    </ChamberWrap>
  );
}

// 2 ─ Activation Energy ────────────────────────────────────────────────────────
function C2() {
  return (
    <ChamberWrap gradient="from-[#fff7ed] via-[#fce7f3] to-[#ede9fe]">
      <ChapterBadge icon="⚡" title="Chamber 2" sub="Activation Energy" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative h-[80px] w-[280px]"
      >
        <svg viewBox="0 0 280 80" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="eGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="50%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 10 70 C 60 70 70 10 130 15 C 190 20 220 60 270 20"
            fill="none" stroke="url(#eGrad)" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.4 }}
          />
          <motion.circle cx="130" cy="15" r="7" fill="#fde68a"
            animate={{ r: [5, 13, 5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.3, repeat: Infinity }}
          />
          <motion.text x="10" y="70" textAnchor="middle" dominantBaseline="central" fontSize="24"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "10px 70px" }}
          >⚛️</motion.text>
          
          <motion.text x="270" y="20" textAnchor="middle" dominantBaseline="central" fontSize="24"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "270px 20px" }}
          >⚛️</motion.text>
        </svg>
      </motion.div>

      <Narration lines={[
        "Every dream needs effort.",
        "Every achievement needs persistence.",
        "Every reaction needs activation energy.",
        "",
        "And somehow,",
        "you never stopped moving forward.",
      ]} />
    </ChamberWrap>
  );
}

// 3 ─ Catalyst ─────────────────────────────────────────────────────────────────
function C3() {
  return (
    <ChamberWrap gradient="from-[#ecfdf5] via-[#f0fdf4] to-[#fce7f3]">
      <ChapterBadge icon="⚗️" title="Chamber 3" sub="Catalyst" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 rounded-2xl bg-white/60 px-6 py-4 shadow-md backdrop-blur-sm"
      >
        {["⚛️", "→", "⚗️", "→", "✨", "→", "🌟"].map((s, i) => (
          <motion.span
            key={i}
            className={`text-2xl ${s === "→" ? "text-emerald-400 text-base" : ""}`}
            animate={s !== "→" ? { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1.4, delay: i * 0.18, repeat: Infinity }}
          >
            {s}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl bg-emerald-50/80 px-5 py-2 shadow-sm"
      >
        <span className="font-storybook text-xs font-extrabold text-emerald-700">
          ⬆ Snehal acts as the Catalyst ⬆
        </span>
      </motion.div>

      <Narration lines={[
        "A catalyst changes everything",
        "without changing itself.",
        "",
        "You do the same.",
        "",
        "You make people smile.",
        "You solve problems.",
        "You help others move forward.",
        "",
        "Without expecting anything back.",
      ]} />
    </ChamberWrap>
  );
}

// 4 ─ Strong Bond Formation ────────────────────────────────────────────────────
function C4() {
  return (
    <ChamberWrap gradient="from-[#fefce8] via-[#fce7f3] to-[#ede9fe]">
      <ChapterBadge icon="🔗" title="Chamber 4" sub="Strong Bond Formation" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4"
      >
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-amber-100 text-center shadow-lg ring-4 ring-amber-300"
          style={{ boxShadow: "0 0 24px rgba(251,191,36,0.5)" }}
        >
          <span className="text-2xl">👦🏻</span>
          <span className="font-storybook text-xs font-extrabold text-amber-800">Me</span>
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-2 w-20 rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300"
            style={{ boxShadow: "0 0 12px rgba(196,181,253,0.8)" }}
          />
          <motion.span
            className="text-lg text-purple-500"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >↔</motion.span>
        </div>

        <motion.div
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-purple-100 text-center shadow-lg ring-4 ring-purple-300"
          style={{ boxShadow: "0 0 24px rgba(168,85,247,0.5)" }}
        >
          <span className="text-2xl">👧🏻</span>
          <span className="font-storybook text-xs font-extrabold text-purple-800">Snehal</span>
        </motion.div>
      </motion.div>

      <Narration lines={[
        "Some bonds are weak.",
        "Some bonds break.",
        "Some bonds become stronger with time.",
        "",
        "Like your friendship with me.",
        "",
        "Through all the chaos and laughs,",
        "the bond only grew stronger. 🔗",
      ]} />
    </ChamberWrap>
  );
}

// 5 ─ Exothermic Smile ─────────────────────────────────────────────────────────
function C5() {
  return (
    <ChamberWrap gradient="from-[#fef9c3] via-[#fce7f3] to-[#ffe4e6]">
      <ChapterBadge icon="☀️" title="Chamber 5" sub="Exothermic Smile" />

      <motion.div
        className="flex h-32 w-32 items-center justify-center rounded-full bg-amber-100 text-6xl shadow-xl"
        animate={{
          boxShadow: ["0 0 20px rgba(251,191,36,0.3)", "0 0 70px rgba(251,191,36,0.9)", "0 0 20px rgba(251,191,36,0.3)"],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        😊
      </motion.div>

      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="text-xl text-rose-400"
            animate={{ y: [0, -16, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      <Narration lines={[
        "Your smile is an exothermic reaction.",
        "",
        "It spreads warmth.",
        "It changes the atmosphere.",
        "",
        "And somehow,",
        "it always makes my day better.",
      ]} />
    </ChamberWrap>
  );
}

// 6 ─ Controlled Chaos ─────────────────────────────────────────────────────────
function C6() {
  return (
    <ChamberWrap gradient="from-[#fef3c7] via-[#fce7f3] to-[#dbeafe]">
      <ChapterBadge icon="💥" title="Chamber 6" sub="Controlled Chaos" />

      <div className="relative flex h-28 w-full items-end justify-center gap-4">
        {["💥", "⚗️", "🧪", "✨", "💥", "🌪️"].map((s, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            animate={{
              y: [0, -(20 + i * 6), 0],
              rotate: [0, i % 2 === 0 ? 25 : -25, 0],
              scale: [1, 1.35, 1],
            }}
            transition={{ duration: 1.1 + i * 0.18, delay: i * 0.2, repeat: Infinity }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <Narration lines={[
        "Mischievous.",
        "Naughty.",
        "Playful.",
        "Sometimes chaotic.",
        "",
        "Yet somehow,",
        "everything works perfectly. 😄",
      ]} />
    </ChamberWrap>
  );
}

// 7 ─ Animal Attraction Force ──────────────────────────────────────────────────
function C7() {
  return (
    <ChamberWrap gradient="from-[#ecfdf5] via-[#fce7f3] to-[#fff7ed]">
      <ChapterBadge icon="🐾" title="Chamber 7" sub="Animal Attraction Force" />

      <div className="relative flex w-full max-w-xs items-end justify-center">
        {/* Animals rushing in from sides */}
        {["🐶", "🐱", "🐾"].map((a, i) => (
          <motion.span
            key={`l-${i}`}
            className="absolute text-3xl"
            style={{ left: `${i * 10}%`, bottom: 0 }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 80 }}
          >
            {a}
          </motion.span>
        ))}
        {["🐱", "🐶", "🐾"].map((a, i) => (
          <motion.span
            key={`r-${i}`}
            className="absolute text-3xl"
            style={{ right: `${i * 10}%`, bottom: 0 }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.2, type: "spring", stiffness: 80 }}
          >
            {a}
          </motion.span>
        ))}

        {/* Centre — Snehal */}
        <motion.div
          className="z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-emerald-100 text-4xl shadow-lg ring-4 ring-emerald-300"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧑‍💻
        </motion.div>
      </div>

      <Narration lines={[
        "For some reason,",
        "kittens and puppies always found",
        "their way to you.",
      ]} />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="rounded-2xl rounded-bl-sm border border-rose-200 bg-white/80 px-4 py-2 shadow"
      >
        <p className="font-storybook text-sm font-bold text-rose-600">Mom: "NOT AGAIN!" 😤</p>
      </motion.div>
    </ChamberWrap>
  );
}

// 8 ─ Friendship Equilibrium ─────────────────────────────────────────────────────────
function C8() {
  return (
    <ChamberWrap gradient="from-[#fce7f3] via-[#ede9fe] to-[#e0f2fe]">
      <ChapterBadge icon="⚖️" title="Chamber 8" sub="Friendship Equilibrium" />

      <motion.div
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex w-full max-w-sm items-center gap-3"
      >
        <div className="flex-1 rounded-2xl bg-pink-100/90 px-3 py-3 text-center shadow">
          <p className="font-storybook text-xs font-bold text-pink-700 leading-relaxed">
            Strong<br />Responsible<br />Focused<br />Loyal
          </p>
        </div>
        <span className="text-3xl">⚖️</span>
        <div className="flex-1 rounded-2xl bg-purple-100/90 px-3 py-3 text-center shadow">
          <p className="font-storybook text-xs font-bold text-purple-700 leading-relaxed">
            Soft<br />Playful<br />Funny<br />Caring
          </p>
        </div>
      </motion.div>

      <Narration lines={[
        "Strong. Soft.",
        "Responsible. Playful.",
        "Focused. Funny.",
        "Loyal. Caring.",
        "",
        "You somehow balance everything.",
        "",
        "Some friends show it loudly.",
        "Some show it quietly.",
        "But true friends show it by just being there.",
      ]} />

      <div className="flex gap-4 text-2xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          >
            ♥
          </motion.span>
        ))}
      </div>
    </ChamberWrap>
  );
}

// 9 ─ Impossible Equation ──────────────────────────────────────────────────────
function C9() {
  const factors = ["Kindness", "Patience", "Loyalty", "Mischief", "Responsibility", "Caring", "Protectiveness", "A Beautiful Smile"];
  return (
    <ChamberWrap gradient="from-[#fef9c3] via-[#fce7f3] to-[#ede9fe]">
      <ChapterBadge icon="🧮" title="Chamber 9" sub="The Impossible Equation" />

      <div className="flex flex-wrap justify-center gap-1.5">
        {factors.map((f, i) => (
          <motion.span
            key={f}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
            className="rounded-lg bg-white/80 px-2.5 py-1 font-storybook text-xs font-bold text-purple-700 shadow"
          >
            {f}{i < factors.length - 1 ? " ×" : ""}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring", stiffness: 160 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="font-storybook text-2xl font-extrabold text-purple-400">=</span>
        <motion.div
          className="rounded-2xl px-7 py-3"
          animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 50px rgba(168,85,247,0.9)", "0 0 0px rgba(168,85,247,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: "linear-gradient(135deg, #f5d4e8, #d4c5f4, #c5e0f4)" }}
        >
          <span className="font-storybook text-3xl font-extrabold text-purple-800">SNEHAL</span>
        </motion.div>
      </motion.div>
    </ChamberWrap>
  );
}
// 10 ─ Kinetic Dance Energy ──────────────────────────────────────────────────
function C10() {
  return (
    <ChamberWrap gradient="from-[#e0e7ff] via-[#fce7f3] to-[#fef9c3]">
      <ChapterBadge icon="💃" title="Chamber 10" sub="Kinetic Dance Energy" />

      <div className="relative flex h-32 w-full items-end justify-center gap-4">
        {["💃", "✨", "🎵", "🕺"].map((s, i) => (
          <motion.span
            key={i}
            className="text-4xl"
            animate={{
              y: [0, -20, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              rotate: [0, i % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <Narration lines={[
        "A sudden burst of kinetic energy.",
        "",
        "Whether it's a random song,",
        "or just feeling the vibe,",
        "",
        "You always know how to bring",
        "the best moves to the floor. ✨",
      ]} />
    </ChamberWrap>
  );
}

// 11 ─ Wanderlust Bonds ───────────────────────────────────────────────────────
function C11() {
  return (
    <ChamberWrap gradient="from-[#ecfdf5] via-[#dbeafe] to-[#fce7f3]">
      <ChapterBadge icon="✈️" title="Chamber 11" sub="Wanderlust Bonds" />

      <div className="relative flex h-32 w-full max-w-sm items-center justify-center">
        {/* Globe/World */}
        <motion.div
          className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-sky-200 text-6xl shadow-xl ring-4 ring-sky-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          🌍
        </motion.div>
        
        {/* Airplane flying around */}
        <motion.div
          className="absolute h-full w-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -top-4 left-1/2 text-3xl -translate-x-1/2 -rotate-45">✈️</span>
        </motion.div>
        
        {/* Suitcase and camera */}
        <motion.span
          className="absolute -bottom-2 -left-4 text-3xl"
          animate={{ y: [0, -5, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧳
        </motion.span>
        <motion.span
          className="absolute -bottom-2 -right-4 text-3xl"
          animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        >
          📸
        </motion.span>
      </div>

      <Narration lines={[
        "The best memories aren't just made,",
        "they are traveled.",
        "",
        "From spontaneous plans",
        "to unforgettable trips,",
        "",
        "Every journey with you is an adventure",
        "worth remembering. 🗺️",
      ]} />
    </ChamberWrap>
  );
}

// Final ─ Conclusion ───────────────────────────────────────────────────────────
function CFinal({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 3200),
      setTimeout(() => setStep(3), 5200),
      setTimeout(() => setStep(4), 7200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <ChamberWrap gradient="from-[#1a0533] via-[#2e1065] to-[#0c1a3a]">
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
            left: `${(i * 73) % 96}%`, top: `${(i * 61) % 90}%`,
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.12, repeat: Infinity }}
        />
      ))}

      <div className="flex flex-col items-center gap-4 text-center">
        <AnimatePresence>
          {step >= 0 && (
            <motion.p
              key="s0"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-story text-sm italic text-purple-200 leading-relaxed"
            >
              "After studying this element carefully,<br />one conclusion was reached."
            </motion.p>
          )}
          {step >= 1 && (
            <motion.h2
              key="s1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="font-storybook text-4xl font-extrabold text-white"
              style={{ textShadow: "0 0 30px #f9a8d4" }}
            >
              SNEHAL IS RARE. ✨
            </motion.h2>
          )}
          {step >= 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xs rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-storybook text-sm font-bold text-purple-200">
                Engineer Mode Completed ✓
              </p>
              <p className="mt-2 font-story text-xs italic leading-relaxed text-purple-100">
                "Not all engineers build machines.<br />
                Some unknowingly build memories.<br />
                Some become reasons to smile.<br />
                And some become someone's favorite person."
              </p>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xs rounded-2xl border border-pink-400/30 bg-pink-900/30 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-story text-xs italic leading-relaxed text-pink-100">
                "Maybe chemistry explains reactions.<br />
                But it can never explain how lucky I am<br />
                to have a best friend like you.<br /><br />
                Thank you for being loyal.<br />
                Thank you for caring.<br />
                And thank you for always being you."
              </p>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex gap-3 text-3xl">
                {["⭐", "💜", "⭐"].map((s, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
              <button
                onClick={onContinue}
                className="rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 px-7 py-3 font-storybook font-extrabold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                ▶ Continue with Next Episode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChamberWrap>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//   MAIN Lab — single-chamber full-screen view
// ═══════════════════════════════════════════════════════════════════════════════

const CHAMBERS = [
  { id: 0, label: "Intro", component: <C0 /> },
  { id: 1, label: "Periodic Table of Snehal", component: <C1 /> },
  { id: 2, label: "Activation Energy", component: <C2 /> },
  { id: 3, label: "Catalyst", component: <C3 /> },
  { id: 4, label: "Strong Bond Formation", component: <C4 /> },
  { id: 5, label: "Exothermic Smile", component: <C5 /> },
  { id: 6, label: "Controlled Chaos", component: <C6 /> },
  { id: 7, label: "Animal Attraction Force", component: <C7 /> },
  { id: 8, label: "Friendship Equilibrium", component: <C8 /> },
  { id: 9, label: "The Impossible Equation", component: <C9 /> },
  { id: 10, label: "Kinetic Dance Energy", component: <C10 /> },
  { id: 11, label: "Wanderlust Bonds", component: <C11 /> },
];

const TOTAL = CHAMBERS.length + 1; // +1 for final

export default function Lab() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFinal = current === TOTAL - 1;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.warn("Audio autoplay blocked", e));
    }
  }, []);

  // Show the next button after 3s of entering any chamber
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
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setIsFading(true);
    markEpisodeCompleted(4);
    setTimeout(() => navigate("/", { state: { highlightEpisode: 5 } }), 1000);
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#1a0533]">
      <audio ref={audioRef} src="/ep3.mp3" loop />
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-purple-500/20 bg-black/50 px-4 py-2.5 backdrop-blur-md">
        <Link
          to="/"
          className="flex items-center gap-1.5 font-storybook text-sm font-bold text-purple-200 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          Snehalflix
        </Link>
        <div className="text-center">
          <p className="font-storybook text-[9px] font-extrabold uppercase tracking-widest text-purple-400">Episode 4</p>
          <p className="font-storybook text-sm font-extrabold text-white">Snehal Being Snehal</p>
        </div>
        <button
          onClick={toggleMusic}
          className="rounded-full bg-purple-800/50 px-3 py-1.5 font-storybook text-xs font-bold text-purple-200 transition-all hover:bg-purple-700 hover:text-white"
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>
      </div>

      {/* ── Progress dots ── */}
      <div className="flex shrink-0 items-center justify-center gap-1.5 bg-black/20 py-2 backdrop-blur-sm">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-pink-400" : i < current ? "w-2 bg-purple-400/60" : "w-2 bg-purple-700/40"
            }`}
          />
        ))}
      </div>

      {/* ── Single full-screen chamber ── */}
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
            {isFinal
              ? <CFinal onContinue={handleContinue} />
              : CHAMBERS[current].component
            }
          </motion.div>
        </AnimatePresence>

        {/* ── Timed "Next Chamber" button (right side) ── */}
        <AnimatePresence>
          {showNext && !isFinal && (
            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={goNext}
              className="absolute right-3 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center gap-2 rounded-2xl bg-white/90 px-4 py-5 font-storybook text-xs font-extrabold text-purple-700 shadow-2xl backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} className="text-purple-500" />
              <span className="[writing-mode:vertical-lr] tracking-widest uppercase text-purple-500 text-[10px]">
                Next Chamber
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex shrink-0 items-center justify-between border-t border-purple-500/20 bg-black/40 px-5 py-2.5 backdrop-blur-md">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="rounded-full bg-purple-800/50 px-4 py-1.5 font-storybook text-xs font-bold text-purple-200 transition-all hover:bg-purple-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Prev
        </button>

        <p className="font-storybook text-xs font-bold text-purple-300">
          {isFinal ? "Finale" : CHAMBERS[current].label}
          <span className="ml-2 text-purple-500 text-[10px]">
            {current + 1}/{TOTAL}
          </span>
        </p>

        <button
          onClick={goNext}
          disabled={isFinal}
          className="rounded-full bg-purple-800/50 px-4 py-1.5 font-storybook text-xs font-bold text-purple-200 transition-all hover:bg-purple-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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
