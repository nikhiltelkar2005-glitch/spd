import FadeIn from "./motion/FadeIn";

export default function Footer() {
  return (
    <footer id="hidden" className="border-t border-white/5 bg-sam-surface py-16">
      <FadeIn className="mx-auto max-w-2xl px-4 text-center">
        <p className="font-display text-3xl tracking-[0.2em] text-sam-red">SNEHALFLIX</p>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-sam-muted">
          The Best Friend Season
        </p>
        <p className="mt-8 text-sm leading-relaxed text-sam-muted">
          Created with love, code, and memories.
        </p>
      </FadeIn>
    </footer>
  );
}
