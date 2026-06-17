import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_TARGET } from "../data/content";
import { useCountdown } from "../hooks/useCountdown";
import FadeIn from "./motion/FadeIn";

interface TimeUnitProps {
  label: string;
  value: number;
}

function TimeUnit({ label, value }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-24 w-20 items-center justify-center overflow-hidden rounded-lg border border-sam-red/30 bg-sam-surface shadow-red-glow-sm sm:h-28 sm:w-24 md:h-32 md:w-28">
        <div className="absolute inset-0 bg-gradient-to-b from-sam-red/10 to-transparent" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-4xl text-white sm:text-5xl md:text-6xl"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-sam-muted">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(BIRTHDAY_TARGET);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.12)_0%,transparent_65%)]" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sam-red/5 blur-[100px]" />

      <FadeIn className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-4xl tracking-wide text-white md:text-5xl lg:text-6xl">
          Birthday Countdown
        </h2>

        {isComplete ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 font-display text-5xl text-sam-red md:text-7xl"
          >
            Happy Birthday, Sameer
          </motion.p>
        ) : (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
            <TimeUnit label="Days" value={days} />
            <TimeUnit label="Hours" value={hours} />
            <TimeUnit label="Minutes" value={minutes} />
            <TimeUnit label="Seconds" value={seconds} />
          </div>
        )}

        <p className="mt-12 text-sm text-sam-muted">
          Until the most special day of the season
        </p>
      </FadeIn>
    </section>
  );
}
