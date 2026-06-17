import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import FadeIn from "./motion/FadeIn";
import SectionHeading from "./motion/SectionHeading";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import { getLastUnlockedEpisode } from "../utils/progress";

export default function FeaturedShow() {
  const [targetEpisode, setTargetEpisode] = useState(1);

  useEffect(() => {
    setTargetEpisode(getLastUnlockedEpisode());
  }, []);
  return (
    <section className="relative py-16 md:py-24">
      <SectionHeading title="Continue Watching" />
      <FadeIn className="px-4 md:px-12 lg:px-16">
        <motion.article
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="group relative overflow-hidden rounded-xl border border-white/5 bg-sam-surface shadow-2xl transition-shadow duration-500 hover:border-sam-red/30 hover:shadow-red-glow"
        >
          <div className="grid md:grid-cols-5">
            <div className="relative aspect-[2/3] overflow-hidden md:col-span-2 md:aspect-auto md:min-h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-sam-surface to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(229,9,20,0.25),transparent_60%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-sam-red">
                  Featured
                </span>
                <h3 className="mt-4 font-display text-4xl leading-tight tracking-wide text-white md:text-5xl">
                  The Story
                  <br />
                  of Snehal
                </h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            </div>

            <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-12 lg:p-16">
              <div className="flex flex-wrap gap-3 text-sm text-sam-muted">
                <span className="text-sam-red font-medium">Season 1</span>
                <span>·</span>
                <span>Friendship Special</span>
                <span>·</span>
                <span>2026</span>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-sam-muted md:text-lg">
                A journey through memories, laughter, admiration, and appreciation dedicated to a best friend.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" to={`/episode/${targetEpisode}`}>
                  <Play size={18} fill="currentColor" />
                  Play
                </Button>
                <Button variant="secondary" size="lg" onClick={() => {
                  document.getElementById("episodes")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  <Info size={18} />
                  Details
                </Button>
              </div>
            </div>
          </div>
        </motion.article>
      </FadeIn>
    </section>
  );
}
