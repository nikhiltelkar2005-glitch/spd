import { useEffect, useState } from "react";

export function useTypingEffect(
  text: string,
  speed = 45,
  active = true
): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    setDisplayed("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, active]);

  return displayed;
}
