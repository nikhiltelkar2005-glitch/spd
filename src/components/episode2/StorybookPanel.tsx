import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StorybookPanelProps {
  chapter: number;
  date: string;
  title: string;
  children: ReactNode;
  illustration: ReactNode;
  gradient: string;
}

export default function StorybookPanel({
  chapter,
  date,
  title,
  children,
  illustration,
  gradient,
}: StorybookPanelProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-lg px-4"
    >
      <div
        className={`overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-br ${gradient} p-1 shadow-xl`}
      >
        <div className="rounded-[1.75rem] bg-white p-5 md:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500 font-storybook text-lg font-extrabold text-white shadow-md">
              {chapter}
            </span>
            <div>
              <p className="font-storybook text-xs font-bold uppercase tracking-wider text-romance-ink/60">
                {date}
              </p>
              <h3 className="font-storybook text-xl font-extrabold text-romance-ink md:text-2xl">
                {title}
              </h3>
            </div>
          </div>

          <div className="relative mb-5 min-h-[200px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF4E8] to-[#FFE8F0] p-3 md:p-4">
            {illustration}
          </div>

          <div className="space-y-3 font-storybook text-base font-bold leading-relaxed text-romance-ink md:text-[17px]">
            {children}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
