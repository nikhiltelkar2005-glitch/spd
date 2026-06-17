import { motion } from "framer-motion";

// ── Cute SVG Boy Character (dark hair, engineer style) ────────────────────────
export function SvgBoy({
  size = 80,
  mood = "smile",
  className = "",
}: {
  size?: number;
  mood?: "smile" | "blush" | "talk" | "think";
  className?: string;
}) {
  const mouthPath =
    mood === "blush" || mood === "smile"
      ? "M 15 23 Q 20 27 25 23"
      : mood === "talk"
      ? "M 15 22 Q 20 28 25 22"
      : "M 16 24 Q 20 22 24 24";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 60"
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Body */}
      <rect x="10" y="36" width="20" height="18" rx="4" fill="#6366f1" />
      {/* Arms */}
      <rect x="4" y="36" width="7" height="14" rx="3" fill="#6366f1" />
      <rect x="29" y="36" width="7" height="14" rx="3" fill="#6366f1" />
      {/* Hands */}
      <circle cx="7" cy="51" r="3.5" fill="#fde68a" />
      <circle cx="33" cy="51" r="3.5" fill="#fde68a" />
      {/* Neck */}
      <rect x="17" y="30" width="6" height="8" rx="2" fill="#fde68a" />
      {/* Head */}
      <ellipse cx="20" cy="22" rx="12" ry="13" fill="#fde68a" />
      {/* Hair */}
      <ellipse cx="20" cy="11" rx="12" ry="7" fill="#1c1917" />
      <rect x="8" y="11" width="6" height="10" rx="3" fill="#1c1917" />
      <rect x="26" y="11" width="6" height="10" rx="3" fill="#1c1917" />
      <ellipse cx="20" cy="10" rx="11" ry="5" fill="#292524" />
      {/* Eyes */}
      <ellipse cx="15" cy="21" rx="2.5" ry="3" fill="#1c1917" />
      <ellipse cx="25" cy="21" rx="2.5" ry="3" fill="#1c1917" />
      <circle cx="16" cy="20" r="0.8" fill="white" />
      <circle cx="26" cy="20" r="0.8" fill="white" />
      {/* Mouth */}
      <path d={mouthPath} stroke="#c77c6e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      {(mood === "blush" || mood === "smile") && (
        <>
          <ellipse cx="13" cy="25" rx="3" ry="1.8" fill="#f9a8d4" opacity="0.6" />
          <ellipse cx="27" cy="25" rx="3" ry="1.8" fill="#f9a8d4" opacity="0.6" />
        </>
      )}
    </motion.svg>
  );
}

// ── Cute SVG Girl Character (long brown hair, pink dress) ─────────────────────
export function SvgGirl({
  size = 80,
  mood = "smile",
  className = "",
}: {
  size?: number;
  mood?: "smile" | "blush" | "talk" | "think";
  className?: string;
}) {
  const mouthPath =
    mood === "blush" || mood === "smile"
      ? "M 15 23 Q 20 28 25 23"
      : mood === "talk"
      ? "M 15 22 Q 20 29 25 22"
      : "M 16 24 Q 20 22 24 24";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 65"
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
    >
      {/* Skirt */}
      <path d="M 8 48 Q 20 60 32 48 L 30 36 L 10 36 Z" fill="#f9a8d4" />
      {/* Body */}
      <rect x="12" y="30" width="16" height="14" rx="4" fill="#fb7185" />
      {/* Arms */}
      <rect x="5" y="32" width="8" height="13" rx="3.5" fill="#fb7185" />
      <rect x="27" y="32" width="8" height="13" rx="3.5" fill="#fb7185" />
      {/* Hands */}
      <circle cx="9" cy="46" r="3.5" fill="#fde68a" />
      <circle cx="31" cy="46" r="3.5" fill="#fde68a" />
      {/* Neck */}
      <rect x="17" y="26" width="6" height="7" rx="2" fill="#fde68a" />
      {/* Head */}
      <ellipse cx="20" cy="18" rx="12" ry="13" fill="#fde68a" />
      {/* Hair - long */}
      <ellipse cx="20" cy="8" rx="12" ry="7" fill="#92400e" />
      <rect x="7" y="8" width="5" height="20" rx="2.5" fill="#92400e" />
      <rect x="28" y="8" width="5" height="22" rx="2.5" fill="#92400e" />
      <ellipse cx="20" cy="7" rx="11" ry="5" fill="#78350f" />
      {/* Hair bow */}
      <path d="M 27 8 Q 30 5 33 8 Q 30 11 27 8Z" fill="#f9a8d4" />
      <circle cx="30" cy="8" r="1.5" fill="#fb7185" />
      {/* Eyes */}
      <ellipse cx="15" cy="17" rx="2.5" ry="3" fill="#1c1917" />
      <ellipse cx="25" cy="17" rx="2.5" ry="3" fill="#1c1917" />
      <circle cx="16" cy="16" r="0.8" fill="white" />
      <circle cx="26" cy="16" r="0.8" fill="white" />
      {/* Eyelashes */}
      <line x1="13" y1="14" x2="12" y2="12.5" stroke="#1c1917" strokeWidth="0.8" />
      <line x1="15" y1="13.5" x2="15" y2="12" stroke="#1c1917" strokeWidth="0.8" />
      <line x1="17" y1="14" x2="18" y2="12.5" stroke="#1c1917" strokeWidth="0.8" />
      {/* Mouth */}
      <path d={mouthPath} stroke="#c77c6e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      {(mood === "blush" || mood === "smile") && (
        <>
          <ellipse cx="13" cy="21" rx="3" ry="1.8" fill="#f9a8d4" opacity="0.7" />
          <ellipse cx="27" cy="21" rx="3" ry="1.8" fill="#f9a8d4" opacity="0.7" />
        </>
      )}
    </motion.svg>
  );
}

// ── Couple side by side ───────────────────────────────────────────────────────
export function SvgCouple({ size = 80 }: { size?: number }) {
  return (
    <div className="flex items-end gap-1">
      <SvgBoy size={size} mood="blush" />
      <SvgGirl size={size} mood="blush" />
    </div>
  );
}
