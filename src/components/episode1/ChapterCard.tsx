import type { ReactNode } from "react";
import StoryReveal from "./StoryReveal";

interface ChapterCardProps {
  chapter: string;
  title: string;
  children: ReactNode;
  illustration?: ReactNode;
  delay?: number;
}

export default function ChapterCard({
  chapter,
  title,
  children,
  illustration,
  delay = 0,
}: ChapterCardProps) {
  return (
    <StoryReveal delay={delay} className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-center text-sm font-bold uppercase tracking-[0.35em] text-orange-600">
        {chapter}
      </p>
      <h2 className="mt-3 text-center font-story text-4xl font-bold text-amber-950 drop-shadow-sm md:text-5xl">
        {title}
      </h2>
      {illustration && <div className="mt-10">{illustration}</div>}
      <div className="mt-10 rounded-3xl border border-pastel-pink/50 bg-pastel-yellow/40 p-8 shadow-lg shadow-pastel-orange/20 backdrop-blur-sm md:p-12 font-medium text-amber-950">
        {children}
      </div>
    </StoryReveal>
  );
}
