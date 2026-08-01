import type { Interest } from "@/types/experience";

export const INTERESTS: Interest[] = [
  { id: "build", emoji: "🚀", label: "Build things", theme: "tech" },
  { id: "help", emoji: "❤️", label: "Help people", theme: "human" },
  { id: "create", emoji: "🎨", label: "Create", theme: "creative" },
  { id: "change-world", emoji: "🌎", label: "Change the world", theme: "impact" },
  { id: "business", emoji: "💼", label: "Start a business", theme: "venture" },
  { id: "discover", emoji: "🔬", label: "Discover", theme: "science" },
  { id: "games", emoji: "🎮", label: "Design games", theme: "play" },
  { id: "planet", emoji: "🌱", label: "Protect the planet", theme: "environment" },
  { id: "exploring", emoji: "🤔", label: "Still exploring", theme: "open" },
];

export function getInterestById(id: string): Interest | undefined {
  return INTERESTS.find((interest) => interest.id === id);
}

/** Scene personalization hints — consumed by future sprints */
export function getPersonalizationHints(interestId: string | null) {
  if (!interestId) return null;
  const interest = getInterestById(interestId);
  if (!interest) return null;

  return {
    interestId: interest.id,
    theme: interest.theme,
    accentColor: themeAccent[interest.theme],
    headlineTone: themeHeadline[interest.theme],
  };
}

const themeAccent: Record<Interest["theme"], string> = {
  tech: "#FFC627",
  human: "#FFC627",
  creative: "#E8618C",
  impact: "#FFC627",
  venture: "#FFC627",
  science: "#4A90A4",
  play: "#E8618C",
  environment: "#6B8E4E",
  open: "#FFC627",
};

const themeHeadline: Record<Interest["theme"], string> = {
  tech: "innovation",
  human: "connection",
  creative: "expression",
  impact: "purpose",
  venture: "ambition",
  science: "curiosity",
  play: "imagination",
  environment: "stewardship",
  open: "possibility",
};
