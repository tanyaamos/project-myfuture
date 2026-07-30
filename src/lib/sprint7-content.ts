import type { CampusId } from "@/types/experience";

export interface ConnectionPath {
  id: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface VisitContent {
  preline: string;
  headline: string;
  emphasis: string;
  subline: string;
  cta: string;
  href: string;
}

export function getVisitContent(campusId: CampusId | null, campusLabel?: string): VisitContent {
  const campus = campusLabel ?? "ASU";

  if (campusId && campusId !== "undecided" && campusId !== "online") {
    return {
      preline: "If you're starting to picture yourself here —",
      headline: `See ${campus}`,
      emphasis: "for yourself.",
      subline:
        "Join an Experience ASU tour. A current Sun Devil shows you around, shares their story, and answers your questions.",
      cta: "Schedule a visit",
      href: "https://asu.edu/visit",
    };
  }

  if (campusId === "online") {
    return {
      preline: "Ready to learn more —",
      headline: "Explore",
      emphasis: "ASU Online.",
      subline:
        "Same faculty. Same degree. Connect with an enrollment coach and see if online is right for you.",
      cta: "Explore ASU Online",
      href: "https://asu.edu/asuonline",
    };
  }

  return {
    preline: "If you're starting to picture yourself here —",
    headline: "Find the campus",
    emphasis: "that fits you.",
    subline:
      "Take a virtual tour of Tempe, Downtown Phoenix, Polytechnic, or West Valley — then visit in person.",
    cta: "Explore campuses",
    href: "https://links.asu.edu/campuses",
  };
}

export const CONNECTION_PATHS: ConnectionPath[] = [
  {
    id: "visit",
    label: "Experience ASU",
    headline: "Walk the campus.",
    description:
      "In-person tours led by current students — see the labs, the energy, the places you'd call yours.",
    href: "https://asu.edu/visit",
    external: true,
  },
  {
    id: "virtual",
    label: "Virtual tour",
    headline: "Explore from anywhere.",
    description:
      "Four campuses, four personalities. Get a feel for each before you ever pack a bag.",
    href: "https://links.asu.edu/campuses",
    external: true,
  },
  {
    id: "contact",
    label: "Your admission team",
    headline: "Real people. Real answers.",
    description:
      "Questions about programs, aid, or what comes next? Your admission team member is ready.",
    href: "https://admission.asu.edu/contact",
    external: true,
  },
  {
    id: "social",
    label: "@FutureSunDevils",
    headline: "Meet your people.",
    description:
      "See what life at ASU actually looks like — from students who were exactly where you are now.",
    href: "https://www.instagram.com/FutureSunDevils/",
    external: true,
  },
];

export const SENDOFF = {
  headline: "Thank you,",
  emphasis: "Sun Devils.",
  subline:
    "Every student photo in our viewbook features real ASU students in real experiences. Your story is next.",
  tag: "#FutureSunDevil",
};
