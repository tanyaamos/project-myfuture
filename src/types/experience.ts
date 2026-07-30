export type LearningStyleId = "hands-on" | "collaborative" | "independent" | "exploring";

export type CampusId =
  | "tempe"
  | "downtown"
  | "polytechnic"
  | "west-valley"
  | "online"
  | "undecided";

export interface LearningStyle {
  id: LearningStyleId;
  emoji: string;
  label: string;
  tagline: string;
}

export interface CampusOption {
  id: CampusId;
  label: string;
  vibe: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export type InterestId =
  | "build"
  | "help"
  | "create"
  | "change-world"
  | "business"
  | "discover"
  | "games"
  | "planet"
  | "exploring";

export interface Interest {
  id: InterestId;
  emoji: string;
  label: string;
  theme: "tech" | "human" | "creative" | "impact" | "venture" | "science" | "play" | "environment" | "open";
}

export type SceneId =
  | "opening"
  | "campus-life"
  | "interests"
  | "personalized-mirror"
  | "path-reveal"
  | "momentum"
  | "learning-style"
  | "campus-choice"
  | "campus-immersion"
  | "arizona"
  | "unexpected-places"
  | "student-voice"
  | "stat-beats"
  | "real-experiences"
  | "belonging"
  | "future-snapshot"
  | "picture-yourself"
  | "next-step"
  | "sendoff";

export interface ExperienceProgress {
  currentScene: SceneId;
  scrollProgress: number;
}

export interface ExperienceProfile {
  interest: InterestId | null;
  learningStyle: LearningStyleId | null;
  campus: CampusId | null;
}
