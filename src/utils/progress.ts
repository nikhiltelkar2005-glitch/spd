const COMPLETED_KEY = "samflix_completed_episodes";

export function getCompletedEpisodes(): number[] {
  try {
    const stored = localStorage.getItem(COMPLETED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error reading progress", e);
    return [];
  }
}

export function isEpisodeCompleted(num: number): boolean {
  return getCompletedEpisodes().includes(num);
}

export function markEpisodeCompleted(num: number): void {
  try {
    const completed = getCompletedEpisodes();
    if (!completed.includes(num)) {
      completed.push(num);
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
    }
  } catch (e) {
    console.error("Error saving progress", e);
  }
}

export function getUnlockedEpisodes(): number[] {
  const completed = getCompletedEpisodes();
  // Episode 1 is always unlocked
  const unlocked = [1];
  // Completing episode i unlocks episode i + 1, up to Episode 7
  for (let i = 1; i <= 7; i++) {
    if (completed.includes(i)) {
      unlocked.push(i + 1);
    }
  }
  return Array.from(new Set(unlocked));
}

export function isEpisodeUnlocked(num: number): boolean {
  return getUnlockedEpisodes().includes(num);
}

export function getLastUnlockedEpisode(): number {
  const unlocked = getUnlockedEpisodes();
  const completed = getCompletedEpisodes();
  
  // Find the first unlocked episode that is NOT completed
  const nextUnwatched = unlocked.find((num) => !completed.includes(num));
  if (nextUnwatched !== undefined) {
    return nextUnwatched;
  }
  
  // If all unlocked episodes are completed, return the highest unlocked one (or 7 as finale)
  return Math.min(Math.max(...unlocked), 7);
}

export function resetProgress(): void {
  try {
    localStorage.removeItem(COMPLETED_KEY);
  } catch (e) {
    console.error("Error resetting progress", e);
  }
}
