import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ArrowLeft, Play } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { markEpisodeCompleted } from "../../utils/progress";

import FloatingHearts from "./FloatingHearts";

// ─────────────────────────────────────────
//  Paper texture overlay
// ─────────────────────────────────────────
const PAPER_TEXTURE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDYiLz48L3N2Zz4=";

// Reusable Photo Illustration component
function PhotoIllustration({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/30 shadow-md bg-transparent flex items-center justify-center"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain drop-shadow-md"
        draggable={false}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────
//  Book Cover Page
// ─────────────────────────────────────────
const BookCover = forwardRef<HTMLDivElement, Record<string, unknown>>(function BookCover(_, ref) {
  return (
    <div ref={ref} className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-r-2xl bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url('${PAPER_TEXTURE}')`, backgroundRepeat: "repeat" }}
      />
      {/* Decorative border */}
      <div className="absolute inset-3 rounded-xl border-2 border-rose-300/50" />
      <div className="absolute inset-4 rounded-xl border border-rose-200/30" />

      {/* Floating hearts background */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-300/40"
          style={{ left: `${8 + i * 8}%`, top: `${10 + (i % 4) * 20}%`, fontSize: `${14 + (i % 3) * 8}px` }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.4, delay: i * 0.2, repeat: Infinity }}
        >
          ♥
        </motion.span>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <motion.p
          className="font-storybook text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          A Story Written By Destiny
        </motion.p>

        <motion.h1
          className="font-storybook text-5xl font-extrabold leading-tight text-romance-ink"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          OUR
          <br />
          STORY
        </motion.h1>

        <motion.div
          className="my-1 w-full overflow-hidden rounded-2xl flex items-center justify-center bg-transparent"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img
            src="/images/story/cover.jpeg"
            alt="Our Story"
            className="h-64 w-full object-contain drop-shadow-md"
            draggable={false}
          />
        </motion.div>

        <motion.p
          className="font-storybook text-sm font-bold italic text-romance-ink/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          A Journey Written By Destiny ❤️
        </motion.p>

        <motion.div
          className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1 }}
        />

        <motion.p
          className="font-storybook text-xs font-extrabold uppercase tracking-[0.3em] text-rose-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          For Snehal
        </motion.p>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────
//  Generic Story Page
// ─────────────────────────────────────────
interface PageProps {
  pageNumber?: number;
  date?: string;
  title: string;
  lines: readonly string[];
  illustration?: React.ReactNode;
  gradient?: string;
  isRight?: boolean;
}

const StoryPage = forwardRef<HTMLDivElement, PageProps>(function StoryPage(
  { pageNumber, date, title, lines, illustration, gradient = "from-romance-pink via-romance-lavender to-romance-peach", isRight = false },
  ref
) {
  return (
    <div
      ref={ref}
      className={`relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br ${gradient} ${
        isRight ? "rounded-r-2xl" : "rounded-l-2xl"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url('${PAPER_TEXTURE}')`, backgroundRepeat: "repeat" }}
      />
      {/* spine shadow */}
      {isRight && <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent" />}
      {!isRight && <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent" />}

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          {pageNumber && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500 font-storybook text-base font-extrabold text-white shadow-md">
              {pageNumber}
            </span>
          )}
          <div>
            {date && (
              <p className="font-storybook text-[10px] font-bold uppercase tracking-wider text-romance-ink/60">
                {date}
              </p>
            )}
            <h2 className="font-storybook text-lg font-extrabold leading-tight text-romance-ink md:text-xl">
              {title}
            </h2>
          </div>
        </div>

        {/* Illustration */}
        {illustration && (
          <div className="mt-2 flex w-full flex-1 min-h-[140px] items-center justify-center overflow-hidden rounded-2xl shadow-md">
            {illustration}
          </div>
        )}

        {/* Text */}
        <div className="mt-2 space-y-1 font-storybook text-xs font-bold leading-relaxed text-romance-ink md:text-[13px]">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* Page number */}
        {pageNumber && (
          <p className="mt-auto pt-3 text-center font-storybook text-[10px] font-bold uppercase tracking-widest text-romance-ink/40">
            {pageNumber}
          </p>
        )}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────
//  Letter Page
// ─────────────────────────────────────────
const LetterPage = forwardRef<HTMLDivElement, Record<string, unknown>>(function LetterPage(_, ref) {
  const [shown, setShown] = useState(0);
  const letterLines = [
    "Dear Snehal,",
    "Who knew that the quiet girl from Aakash would become one of the most important people in my life?",
    "It started with one random Instagram message: “By any chance, do I know you?”",
    "From simple talks about college and life to a friendship I truly cherish.",
    "Through my toughest moments, you listened.",
    "You supported me when I felt alone.",
    "You became one of the people I trust the most.",
    "Thank you for every conversation, every laugh, and for being there.",
    "Some people enter our lives for a short chapter. You became part of the story itself.",
    "The memories from Aakash, Reola Cafe, and NST Pune will always remain special.",
    "Thank you for being you.",
    "Your Best Friend,",
    "Nikhil ❤️"
  ];

  useEffect(() => {
    if (shown >= letterLines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 600);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-r-2xl"
      style={{ background: "linear-gradient(135deg, #fffdf5 0%, #fff5eb 60%, #ffeee0 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url('${PAPER_TEXTURE}')`, backgroundRepeat: "repeat" }}
      />
      {/* Ruled lines */}
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-b border-rose-100/60"
          style={{ top: `${40 + i * 19}px` }}
        />
      ))}
      {/* Left margin */}
      <div className="absolute bottom-0 left-12 top-0 w-px border-l-2 border-rose-300/30" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 pl-14">
        <div className="space-y-2">
          <p className="font-storybook text-[10px] font-bold uppercase tracking-[0.35em] text-rose-400">
            A Letter to Snehal
          </p>
          <div className="space-y-1.5 font-story text-[11px] italic leading-relaxed text-amber-900">
            {letterLines.slice(0, shown).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={
                  i === 0 
                    ? "font-bold not-italic text-sm text-rose-700" 
                    : i === letterLines.length - 1 || i === letterLines.length - 2 
                    ? "text-right font-bold not-italic text-xs text-rose-700" 
                    : ""
                }
              >
                {line}
              </motion.p>
            ))}
            {shown < letterLines.length && (
              <motion.span
                className="inline-block h-3 w-px bg-rose-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </div>
        <p className="mt-auto text-center font-storybook text-[10px] font-bold uppercase tracking-widest text-romance-ink/30">
          ❤
        </p>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────
//  Ending / Continue Page
// ─────────────────────────────────────────
const EndingPage = forwardRef<HTMLDivElement, { onContinue: () => void }>(function EndingPage({ onContinue }, ref) {
  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-l-2xl bg-gradient-to-br from-white via-rose-50 to-pink-100 border-l border-white/50"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url('${PAPER_TEXTURE}')`, backgroundRepeat: "repeat" }}
      />
      {/* Spine shadow for left page */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
      
      <FloatingHearts dense />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-4 text-center">
        {/* Image — constrained height */}
        <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-white/50 p-4 shadow-md">
          <span className="text-5xl animate-bounce">🤝❤️</span>
        </div>

        {/* Heading — compact */}
        <motion.p
          className="font-storybook text-2xl font-extrabold leading-tight text-rose-600"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Grateful for our friendship ♥
        </motion.p>

        {/* Card */}
        <div className="w-full rounded-2xl border-2 border-white bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm">
          <p className="font-storybook text-base font-extrabold text-romance-ink">To Be Continued...</p>
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-500">Next Episode</p>
          <h3 className="mt-0.5 font-storybook text-lg font-extrabold text-romance-ink">Favorite Memories</h3>
          <button
            onClick={onContinue}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-romance-peach to-rose-400 px-5 py-2 font-storybook text-sm font-extrabold text-romance-ink shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <Play size={15} fill="currentColor" />
            Continue Watching
          </button>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────
//  Main Storybook Component
// ─────────────────────────────────────────
export default function Storybook() {
  const navigate = useNavigate();
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number; getPageCount: () => number } }>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 800;

  // Auto-open book after mount
  useEffect(() => {
    const t = setTimeout(() => setIsBookOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleFlipNext = useCallback(() => {
    bookRef.current?.pageFlip().flipNext();
  }, []);

  const handleFlipPrev = useCallback(() => {
    bookRef.current?.pageFlip().flipPrev();
  }, []);

  const handlePage = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const handleInit = useCallback((e: { object: { getPageCount: () => number } }) => {
    setTotalPages(e.object.getPageCount());
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.warn("Audio autoplay blocked", e));
    }
  }, []);

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
    setIsFadingOut(true);
    markEpisodeCompleted(1);
    setTimeout(() => {
      navigate("/", { state: { highlightEpisode: 2 } });
    }, 1000);
  };

  // ── Book dimensions ──
  const bookHeight = isDesktop ? 560 : Math.min(window.innerHeight * 0.62, 520);
  const pageWidth = isDesktop ? 380 : Math.min(windowWidth * 0.88, 340);

  const CHAPTERS = [
    {
      id: 1, date: "2024 – Aakash Institute", title: "The First Glimpse",
      gradient: "from-romance-peach via-romance-pink to-romance-lavender",
      illustration: <PhotoIllustration src="/images/story/friend1.jpeg" alt="The First Glimpse" />,
      lines: [
        "A girl walked into the Aakash classroom.",
        "",
        "She was from a different college.",
        "I was from a different college.",
        "",
        "We never really spoke.",
        "At most, we only knew each other’s names.",
        "",
        "Back then, neither of us knew that one day we’d become such good friends."
      ],
    },
    {
      id: 2, date: "", title: "Different Paths",
      gradient: "from-romance-lavender via-romance-purple to-romance-pink",
      illustration: <PhotoIllustration src="/images/story/friend2.jpeg" alt="Different Paths" />,
      lines: [
        "Aakash classes continued.",
        "",
        "Different classrooms.",
        "Different colleges.",
        "Different lives.",
        "",
        "We remained strangers who simply knew each other’s names.",
        "Nothing more.",
        "",
        "But life had other plans."
      ],
    },
    {
      id: 3, date: "2 March 2025", title: "One Random Message",
      gradient: "from-romance-purple via-romance-dusk to-romance-lavender",
      illustration: <PhotoIllustration src="/images/story/friend3.jpeg" alt="One Random Message" />,
      lines: [
        "One random thought.",
        "",
        "One random Instagram message sent by me, Nikhil.",
        "",
        "“By any chance, do I know you?”",
        "",
        "Honestly, I couldn’t even remember properly where I had seen her.",
        "",
        "But that one message started everything."
      ],
    },
    {
      id: 4, date: "", title: "The First Conversations",
      gradient: "from-romance-pink via-romance-lavender to-romance-cream",
      illustration: <PhotoIllustration src="/images/story/friend4.jpeg" alt="The First Conversations" />,
      lines: [
        "Our conversations started with simple topics.",
        "",
        "College. KCET. JEE. Future plans.",
        "",
        "Nothing extraordinary.",
        "Just two people talking.",
        "",
        "Yet somehow those conversations became part of my daily routine."
      ],
    },
    {
      id: 5, date: "", title: "The Friend Who Stayed",
      gradient: "from-romance-cream via-romance-peach to-romance-pink",
      illustration: <PhotoIllustration src="/images/story/friend5.jpeg" alt="The Friend Who Stayed" />,
      lines: [
        "There were days when I felt alone.",
        "People I thought would stay had slowly drifted away.",
        "",
        "But Snehal listened.",
        "She understood.",
        "She supported me without judging me.",
        "",
        "Sometimes all a person needs is someone who genuinely stays.",
        "And she did."
      ],
    },
    {
      id: 6, date: "", title: "More Than Just A Normal Friend",
      gradient: "from-romance-peach via-romance-rose to-romance-lavender",
      illustration: <PhotoIllustration src="/images/story/friend6.jpeg" alt="More Than Just A Normal Friend" />,
      lines: [
        "As days turned into weeks, our friendship grew stronger.",
        "What started as simple conversations slowly became something much more meaningful.",
        "The talks became longer, the laughs louder, and the trust deeper.",
        "Snehal wasn't just another friend anymore, she became my best friend.",
        "Someone who understood me without explanation, stayed through every high and low, and made life a lot brighter."
      ],
    },
    {
      id: 7, date: "", title: "NST Pune",
      gradient: "from-romance-lavender via-romance-pink to-romance-peach",
      illustration: <PhotoIllustration src="/images/story/friend7.jpeg" alt="NST Pune" />,
      lines: [
        "One of the happiest moments of my life arrived.",
        "",
        "I, Nikhil, cleared my exams and received admission to NST Pune.",
        "In just a few days, I would be leaving.",
        "",
        "But there was one thing missing.",
        "Despite talking for months, Snehal and I had never met in person.",
        "",
        "So we decided to change that."
      ],
    },
    {
      id: 8, date: "28 July 2025", title: "The First Meeting",
      gradient: "from-romance-pink via-romance-lavender to-romance-purple",
      illustration: <PhotoIllustration src="/images/story/friend8.jpeg" alt="The First Meeting" />,
      lines: [
        "Before leaving for Pune, we finally met.",
        "Snehal came along with Aishwarya.",
        "The three of us met at Reola Cafe.",
        "",
        "We talked. We laughed. We shared stories.",
        "There was no awkwardness.",
        "It felt like meeting someone I had known for years.",
        "",
        "One of the happiest days I’ll always remember."
      ],
    },
    {
      id: 9, date: "", title: "The Friendship Season",
      gradient: "from-romance-dusk via-romance-purple to-romance-lavender",
      illustration: <PhotoIllustration src="/images/story/friend9.jpeg" alt="The Friendship Season" />,
      lines: [
        "From strangers.",
        "To an Instagram message.",
        "To countless conversations.",
        "To becoming people who genuinely care about each other.",
        "",
        "Some friendships take years to build.",
        "Ours started with one simple message.",
        "And I’m grateful it did."
      ],
    },
    {
      id: 10, date: "", title: "To Be Continued…",
      gradient: "from-romance-peach via-romance-pink to-romance-lavender",
      illustration: <PhotoIllustration src="/images/story/friend10.jpeg" alt="To Be Continued" />,
      lines: [
        "This story isn’t ending.",
        "It’s only getting started.",
        "",
        "More memories.",
        "More laughter.",
        "More milestones.",
        "",
        "The next chapter is still being written.",
        "And I can’t wait to see where life takes us."
      ],
    },
  ];

  const isAtEnd = isDesktop ? currentPage >= totalPages - 2 : currentPage >= totalPages - 1;
  const isAtStart = currentPage === 0;

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-romance-lavender via-romance-pink to-romance-peach">
      <audio ref={audioRef} src="/ep1.mp3" loop autoPlay />
      {/* Ambient floating hearts */}
      <FloatingHearts />

      {/* Bokeh blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px]"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              background: ["rgba(248,180,220,0.3)", "rgba(196,181,253,0.25)", "rgba(253,186,116,0.2)"][i],
              left: `${[10, 60, 35][i]}%`,
              top: `${[20, 60, 40][i]}%`,
            }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-rose-200/50 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-storybook text-sm font-bold text-romance-ink hover:text-rose-500 transition-colors"
          >
            <ArrowLeft size={18} />
            Snehalflix
          </Link>
          <div className="text-center">
            <p className="font-storybook text-[10px] font-extrabold uppercase tracking-widest text-rose-500">
              Episode 1
            </p>
            <p className="font-storybook text-base font-extrabold text-romance-ink">How We Met</p>
          </div>
          <button
            onClick={toggleMusic}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-rose-400 shadow-sm transition-all hover:bg-rose-50 hover:text-rose-600"
            title={isPlaying ? "Mute Music" : "Play Ambient Music"}
          >
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <p className="font-storybook text-xs font-extrabold uppercase tracking-[0.4em] text-rose-400">
          Our Storybook
        </p>
        <h1 className="mt-1 font-storybook text-3xl font-extrabold text-romance-ink md:text-4xl">
          How We Met ❤️
        </h1>
        <p className="mt-1 font-storybook text-sm font-bold text-romance-ink/60">
          {isDesktop ? "Click pages or use arrows · Swipe on mobile" : "Swipe or tap arrows to turn pages"}
        </p>
      </motion.div>

      {/* Book Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={isBookOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-6 flex items-center justify-center px-2"
      >


        <HTMLFlipBook
          ref={bookRef}
          width={pageWidth}
          height={bookHeight}
          size="fixed"
          minWidth={200}
          maxWidth={500}
          minHeight={400}
          maxHeight={700}
          showCover
          mobileScrollSupport
          onFlip={handlePage}
          onInit={handleInit}
          className="storybook-flip"
          style={{
            fontFamily: "inherit",
          }}
          startPage={0}
          drawShadow={false}
          flippingTime={700}
          usePortrait={!isDesktop}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0}
          showPageCorners={false}
          disableFlipByClick={false}
          clickEventForward={false}
          useMouseEvents
          swipeDistance={30}
          pageBackground="transparent"
          renderOnlyPageLengthChange={false}
        >
          {/* COVER */}
          <BookCover key="cover" />

          {/* STORY PAGES */}
          {CHAPTERS.map((ch) => (
            <StoryPage
              key={`ch-${ch.id}`}
              pageNumber={ch.id}
              date={ch.date}
              title={ch.title}
              lines={ch.lines as unknown as string[]}
              illustration={ch.illustration}
              gradient={ch.gradient}
              isRight={ch.id % 2 === 0}
            />
          ))}

          {/* LETTER PAGE */}
          <LetterPage key="letter" />

          {/* ENDING PAGE */}
          <EndingPage key="ending" onContinue={handleContinue} />
        </HTMLFlipBook>
      </motion.div>

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-8"
      >
        <button
          onClick={handleFlipPrev}
          disabled={isAtStart}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-rose-400 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-rose-600 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Page indicator */}
        <div className="flex flex-col items-center gap-1">
          <p className="font-storybook text-xs font-bold text-romance-ink/60">
            {currentPage === 0 ? "Cover" : currentPage >= (totalPages - 1) ? "The End" : `Page ${currentPage} of ${Math.max(0, totalPages - 2)}`}
          </p>
          {/* dot indicators */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 12) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === Math.min(currentPage, 11) ? "w-4 bg-rose-400" : "w-1.5 bg-rose-200"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleFlipNext}
          disabled={isAtEnd}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-rose-400 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-rose-600 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>

      <p className="mb-8 mt-4 font-storybook text-xs font-bold text-romance-ink/40">
        ✨ Turn the pages to relive every chapter
      </p>

      {/* Fade out overlay */}
      <AnimatePresence>
        {isFadingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0b0b0b] pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
