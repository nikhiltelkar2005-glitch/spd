export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Episodes", href: "#episodes" },
  { label: "Memories", href: "#memories" },
  { label: "About", href: "#about" },
] as const;

export const EPISODES = [
  {
    number: 1,
    title: "How We Met",
    description: "Our story — a journey written by destiny, from the first glimpse to forever.",
    runtime: "8 min",
    path: "/episode/1",
  },
  {
    number: 2,
    title: "Favorite Memories",
    description: "A collection of beautiful moments, inside jokes, and unforgettable adventures.",
    runtime: "12 min",
    path: "/episode/2",
  },
  {
    number: 3,
    title: "Things I Admire",
    description: "The qualities and strength that make Snehal truly one of a kind.",
    runtime: "10 min",
    path: "/episode/3",
  },
  {
    number: 4,
    title: "Snehal Being Snehal",
    description: "Pure, authentic, and unmatched energy — the highlights of your wonderful self.",
    runtime: "15 min",
    path: "/episode/4",
  },
  {
    number: 5,
    title: "Letter To My Best Friend",
    description: "Words written from the heart, sealed with endless gratitude and love.",
    runtime: "14 min",
    path: "/episode/5",
  },
  {
    number: 6,
    title: "The Future Season",
    description: "Looking ahead to many more chapters of laughter, growth, and friendship.",
    runtime: "20 min",
    path: "/episode/6",
  },
] as const;

export const TOP_PICKS = [
  {
    id: "trust",
    title: "THE FRIEND I TRUST",
    subtitle: "Loyalty & Faith",
    icon: "heart" as const,
    gradient: "from-amber-900/80 via-sam-surface to-sam-bg",
  },
  {
    id: "kind",
    title: "ONE OF A KIND",
    subtitle: "Unmatched Soul",
    icon: "flask" as const,
    gradient: "from-indigo-900/80 via-sam-surface to-sam-bg",
  },
  {
    id: "creator",
    title: "CORE MEMORY CREATOR",
    subtitle: "Endless Joy",
    icon: "heart" as const,
    gradient: "from-red-950/80 via-sam-surface to-sam-bg",
  },
] as const;

export const MEMORIES = [
  {
    title: "First Conversation",
    date: "Chapter One",
    preview: "The moment everything changed, quietly and completely.",
    hue: "from-violet-900/60",
  },
  {
    title: "Late Night Talks",
    date: "Archive 02",
    preview: "Hours that felt like minutes. Stories that never ended.",
    hue: "from-blue-900/60",
  },
  {
    title: "Engineering Dreams",
    date: "Archive 03",
    preview: "Ambition measured in blueprints and breakthroughs.",
    hue: "from-teal-900/60",
  },
  {
    title: "Shared Laughter",
    date: "Archive 04",
    preview: "The kind of joy that stays with you long after.",
    hue: "from-amber-900/60",
  },
  {
    title: "Quiet Admiration",
    date: "Archive 05",
    preview: "Some feelings are too deep for words — until now.",
    hue: "from-rose-900/60",
  },
  {
    title: "Birthday Eve",
    date: "Tonight",
    preview: "The calm before the most beautiful celebration.",
    hue: "from-red-900/60",
  },
] as const;

/** Birthday target — June 4, 2026 at midnight local */
export const BIRTHDAY_TARGET = new Date(2026, 5, 4, 0, 0, 0, 0);
