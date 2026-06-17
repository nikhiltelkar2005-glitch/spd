import { motion } from "framer-motion";
import { MEMORIES } from "../data/content";
import FadeIn from "./motion/FadeIn";
import SectionHeading from "./motion/SectionHeading";

export default function MemoryPreview() {
  return (
    <section id="memories" className="py-16 md:py-24">
      <SectionHeading title="Moments Worth Remembering" />
      <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-16">
        {MEMORIES.map((memory, index) => (
          <FadeIn key={memory.title} delay={index * 0.08}>
            <motion.article
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-white/5 bg-sam-surface"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${memory.hue} to-sam-bg blur-sm transition-all duration-700 group-hover:blur-none group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

              <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-500 group-hover:bg-black/30 group-hover:backdrop-blur-none" />

              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-sam-red">
                  {memory.date}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{memory.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sam-muted opacity-80 transition-opacity group-hover:opacity-100">
                  {memory.preview}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-sam-red/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur-sm">
                  View Memory
                </span>
              </div>
            </motion.article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
