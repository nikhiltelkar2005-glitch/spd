import { motion } from "framer-motion";
import { ChibiBoy, ChibiCouple, ChibiGirl } from "./ChibiCharacters";

export function FirstGlimpseScene() {
  return (
    <div className="relative flex h-48 items-end justify-between px-1">
      <ChibiBoy size="md" mood="look" facing="right" />
      <motion.div
        animate={{ x: ["100%", "-30%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-2"
      >
        <ChibiGirl size="md" mood="idle" facing="left" />
      </motion.div>
      <motion.span
        className="absolute left-1/2 top-4 -translate-x-1/2 text-2xl"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ♥
      </motion.span>
    </div>
  );
}

export function BubbleShopScene() {
  return (
    <div className="relative py-2 text-center">
      <motion.div
        className="mx-auto inline-block rounded-2xl border-2 border-rose-300 bg-romance-peach px-6 py-2 font-storybook text-2xl font-extrabold text-romance-ink"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        BUBBLE
      </motion.div>
      <div className="mt-3 flex justify-center gap-2">
        {["🎈", "🎈", "🎈"].map((b, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
            className="text-2xl"
          >
            {b}
          </motion.span>
        ))}
      </div>
      <div className="mt-4">
        <ChibiCouple size="md" mood="blush" />
      </div>
      <motion.span
        className="absolute right-2 top-0 text-xl"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✨
      </motion.span>
    </div>
  );
}

export function InstagramScene() {
  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div
        className="w-[200px] rounded-2xl border-2 border-romance-lavender bg-white p-3 shadow-lg"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
      >
        <div className="flex items-center gap-2 border-b border-romance-lavender/40 pb-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-purple-400" />
          <span className="text-xs font-bold text-romance-ink">nikhil_17</span>
        </div>
        <motion.p
          className="mt-3 rounded-lg bg-romance-lavender/50 px-2 py-2 text-xs font-bold text-romance-ink"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Friend request sent
        </motion.p>
        <motion.p
          className="mt-2 rounded-lg bg-romance-pink/60 px-2 py-2 text-xs font-bold text-romance-ink"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          ✓ Accepted
        </motion.p>
      </motion.div>
      <ChibiGirl size="sm" mood="blush" />
    </div>
  );
}

export function SnapchatScene() {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div className="rounded-2xl bg-[#FFFC00] px-5 py-5 shadow-lg">
        <p className="text-sm font-extrabold text-black">Snap request</p>
        <motion.button
          className="mt-3 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white"
          whileTap={{ scale: 0.92 }}
          animate={{ boxShadow: ["0 0 0 transparent", "0 0 16px rgba(244,63,94,0.6)", "0 0 0 transparent"] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          Accept
        </motion.button>
      </motion.div>
      <ChibiBoy size="sm" mood="laugh" />
    </div>
  );
}

export function ChatScene() {
  const messages = ["Hey 👋", "Hi!", "How are you?", "😊"];
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-3">
        {[0, 1].map((phone) => (
          <motion.div
            key={phone}
            className="w-24 rounded-xl border-2 border-romance-lavender bg-white p-2 shadow-md"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.2, delay: phone * 0.15, repeat: Infinity }}
          >
            {messages.slice(phone, phone + 2).map((msg, i) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.6 + phone * 0.2 }}
                className={`mb-1 rounded-lg px-2 py-1 text-[10px] font-bold text-romance-ink ${
                  phone === 0 ? "bg-romance-lavender/50" : "ml-auto bg-romance-pink/60"
                }`}
              >
                {msg}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
      <ChibiCouple size="sm" mood="blush" />
    </div>
  );
}

export function CalendarScene() {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div className="flex gap-2" animate={{ rotateY: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        {["Aug", "Sep"].map((m) => (
          <div key={m} className="rounded-lg border-2 border-rose-300 bg-white px-4 py-3 shadow-md">
            <p className="font-storybook text-lg font-extrabold text-romance-ink">{m}</p>
          </div>
        ))}
      </motion.div>
      <ChibiCouple size="sm" mood="idle" />
    </div>
  );
}

export function GaneshScene() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">
        🪔
      </motion.span>
      <motion.div
        className="rounded-xl border-2 border-rose-300 bg-white px-4 py-2 font-storybook text-sm font-bold italic text-romance-ink shadow"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Will you be mine? ♥
      </motion.div>
      <ChibiCouple size="md" mood="blush" />
    </div>
  );
}

export function BlossomScene() {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        animate={{ scale: [0.9, 1.15, 0.9], rotate: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-5xl"
      >
        🌸
      </motion.span>
      <ChibiCouple size="md" mood="blush" />
    </div>
  );
}

export function RainScene() {
  return (
    <div className="relative rounded-xl bg-romance-dusk/50 px-4 py-6">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute font-bold text-romance-ink/20"
          style={{ left: `${i * 7}%`, top: 0 }}
          animate={{ y: [0, 90], opacity: [0.6, 0] }}
          transition={{ duration: 0.7, delay: i * 0.08, repeat: Infinity }}
        >
          |
        </motion.span>
      ))}
      <motion.span
        className="absolute left-1/2 top-0 -translate-x-1/2 text-3xl"
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ☂️
      </motion.span>
      <div className="pt-8">
        <ChibiCouple size="md" mood="idle" />
      </div>
    </div>
  );
}

export function SunsetScene() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-t from-romance-peach via-romance-rose to-romance-lavender px-4 py-6">
      <ChibiCouple size="lg" mood="blush" />
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-500/80"
          style={{ left: `${10 + i * 11}%`, top: `${5 + (i % 3) * 15}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
