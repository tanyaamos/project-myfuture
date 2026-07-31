import type { CampusId } from "@/types/experience";
import {
  ASU_LINKS,
  CAMPUS_LINKS,
  getCampusLink,
  getCampusVisitLink,
  getConnectionPaths,
  type ConnectionPath,
} from "@/lib/asu-links";

export type { ConnectionPath };

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
      href: getCampusVisitLink(campusId),
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
      href: CAMPUS_LINKS.online.href,
    };
  }

  return {
    preline: "If you're starting to picture yourself here —",
    headline: "Find the campus",
    emphasis: "that fits you.",
    subline:
      "Take a virtual tour of Tempe, Downtown Phoenix, Polytechnic, or West Valley — then visit in person.",
    cta: "Explore campuses",
    href: getCampusLink(campusId),
  };
}

export { getConnectionPaths, ASU_LINKS };

export const SENDOFF = {
  headline: "Thank you,",
  emphasis: "Sun Devils.",
  subline:
    "Every student photo in our viewbook features real ASU students in real experiences. Your story is next.",
  tag: "#FutureSunDevil",
};
