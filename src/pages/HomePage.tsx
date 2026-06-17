import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedShow from "../components/FeaturedShow";
import Episodes from "../components/Episodes";
import TopPicks from "../components/TopPicks";
import FriendshipStats from "../components/FriendshipStats";
import Footer from "../components/Footer";
import { useHomeScroll } from "../hooks/useHomeScroll";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EPISODES } from "../data/content";

export default function HomePage() {
  useHomeScroll();
  const location = useLocation();
  const [highlightEpisode, setHighlightEpisode] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const state = location.state as { highlightEpisode?: number } | null;
    if (state?.highlightEpisode) {
      const epNum = state.highlightEpisode;
      setHighlightEpisode(epNum);
      setShowPopup(true);

      // Scroll to episodes section and center the card
      const scrollTimer = setTimeout(() => {
        const cardEl = document.getElementById(`episode-card-${epNum}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      }, 150);

      // Hide popup after 3 seconds
      const popupTimer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Clear route state so reloading does not re-trigger highlight
      window.history.replaceState({}, document.title);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(popupTimer);
      };
    }
  }, [location]);

  const unlockedEpDetails = EPISODES.find((ep) => ep.number === highlightEpisode);

  return (
    <div className="min-h-screen bg-sam-bg relative">
      <Navbar />
      <main>
        <Hero />
        <FeaturedShow />
        <Episodes 
          highlightEpisode={highlightEpisode} 
          onHighlightComplete={() => setHighlightEpisode(null)} 
        />
        <TopPicks />
        <FriendshipStats />
      </main>
      <Footer />

      {/* Floating Glassmorphism Unlock Notification */}
      <AnimatePresence>
        {showPopup && unlockedEpDetails && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 max-w-sm rounded-xl border border-sam-red/30 bg-black/90 p-6 shadow-[0_0_30px_rgba(229,9,20,0.4)] backdrop-blur-md flex flex-col items-center text-center w-[calc(100%-3rem)] sm:w-auto"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sam-red">
              ✨ Next Episode Unlocked
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-wide text-white uppercase">
              {unlockedEpDetails.title} {unlockedEpDetails.number === 2 ? "❤️" : ""}
            </h3>
            <p className="mt-1 text-xs text-sam-muted font-medium">Ready to Watch</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
