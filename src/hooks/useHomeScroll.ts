import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHomeScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scroll = () => {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      const t = window.setTimeout(scroll, 80);
      return () => window.clearTimeout(t);
    } else if ((location.state as { scrollTo?: string } | null)?.scrollTo) {
      const scroll = () => {
        const id = (location.state as { scrollTo: string }).scrollTo;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      const t = window.setTimeout(scroll, 80);
      return () => window.clearTimeout(t);
    }

    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.pathname, location.hash, location.state]);
}
