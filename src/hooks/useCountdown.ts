import { useEffect, useState } from "react";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function getTimeLeft(target: Date): CountdownValues {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: false,
  };
}

export function useCountdown(target: Date): CountdownValues {
  const [values, setValues] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const tick = () => setValues(getTimeLeft(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return values;
}
