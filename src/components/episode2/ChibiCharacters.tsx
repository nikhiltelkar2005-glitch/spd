import { motion } from "framer-motion";

const BOY_IMG = "/images/chibi-boy.png";
const GIRL_IMG = "/images/chibi-girl.png";
const COUPLE_IMG = "/images/characters-full.png";

type Size = "sm" | "md" | "lg";
type Mood = "idle" | "blush" | "laugh" | "look";

interface CharacterProps {
  className?: string;
  size?: Size;
  mood?: Mood;
  facing?: "left" | "right";
}

const heights: Record<Size, string> = {
  sm: "h-32",
  md: "h-44",
  lg: "h-56",
};

function CharacterImg({
  src,
  alt,
  className = "",
  size = "md",
  mood = "idle",
  facing = "right",
}: CharacterProps & { src: string; alt: string }) {
  const animations = {
    idle: { y: [0, -8, 0], rotate: 0 },
    blush: { y: [0, -6, 0], scale: [1, 1.04, 1] },
    laugh: { y: [0, -4, 0], rotate: [0, -2, 2, 0] },
    look: { y: [0, -7, 0], x: facing === "right" ? [0, 6, 0] : [0, -6, 0] },
  };

  return (
    <motion.div
      className={`relative inline-flex items-end justify-center ${className}`}
      animate={animations[mood]}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ transform: facing === "left" ? "scaleX(-1)" : undefined }}
    >
      <div className="relative">
        {(mood === "blush" || mood === "laugh") && (
          <>
            <motion.span
              className="absolute left-[22%] top-[30%] z-10 h-4 w-6 rounded-full bg-rose-400/60 blur-[3px]"
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.span
              className="absolute right-[22%] top-[30%] z-10 h-4 w-6 rounded-full bg-rose-400/60 blur-[3px]"
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={`${heights[size]} w-auto object-contain drop-shadow-md`}
        />
      </div>
      {mood === "laugh" && (
        <motion.span
          className="absolute -right-1 top-2 z-10 text-xl"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ✨
        </motion.span>
      )}
    </motion.div>
  );
}

export function ChibiBoy(props: CharacterProps) {
  return <CharacterImg src={BOY_IMG} alt="Nikhil" facing="right" {...props} />;
}

export function ChibiGirl(props: CharacterProps) {
  return <CharacterImg src={GIRL_IMG} alt="Snehal" facing="left" {...props} />;
}

const coupleHeights: Record<Size, string> = {
  sm: "h-40",
  md: "h-52",
  lg: "h-64",
};

export function ChibiCouple({
  size = "md",
  mood = "blush",
}: {
  size?: Size;
  mood?: Mood;
}) {
  const y = mood === "laugh" ? [0, -6, 0] : [0, -10, 0];

  return (
    <motion.div
      className="mx-auto flex justify-center px-2 py-1"
      animate={{ y, scale: mood === "blush" ? [1, 1.02, 1] : 1 }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={COUPLE_IMG}
        alt="Nikhil and Snehal"
        draggable={false}
        className={`${coupleHeights[size]} w-auto max-w-full object-contain drop-shadow-md`}
      />
    </motion.div>
  );
}
