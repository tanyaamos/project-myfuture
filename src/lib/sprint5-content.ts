import type { CampusId } from "@/types/experience";
import type { PathMoment } from "@/lib/personalization";
import { getPlaceLink } from "@/lib/asu-links";

export interface CampusImmersion {
  campusLabel: string;
  vibe: string;
  headline: string;
  subline: string;
  detail: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ArizonaBeat {
  stat: string;
  label: string;
  sublabel?: string;
}

export const DEFAULT_CAMPUS_IMMERSION: CampusImmersion = {
  campusLabel: "ASU",
  vibe: "Possibility",
  headline: "Four campuses.",
  subline: "One university.",
  detail: "Find the fit that feels like you — Tempe's energy, Downtown's pulse, Polytechnic's makerspaces, West Valley's community.",
  imageSrc:
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=80",
  imageAlt: "Arizona State University campus overview",
};

export const CAMPUS_IMMERSION: Record<CampusId, CampusImmersion> = {
  tempe: {
    campusLabel: "Tempe",
    vibe: "Energy",
    headline: "The heartbeat",
    subline: "of ASU.",
    detail:
      "Big 12 sports, multidisciplinary research, innovative VR labs — ASU's historic campus with an electric, friendly atmosphere.",
    imageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Students walking across the Tempe campus at sunset",
  },
  downtown: {
    campusLabel: "Downtown Phoenix",
    vibe: "City",
    headline: "Career connections",
    subline: "everywhere.",
    detail:
      "Health care, journalism, government, public service — a big-city feel in a professional environment steps from industry.",
    imageSrc:
      "https://images.unsplash.com/photo-1477959856237-4a6700d41685?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Downtown Phoenix campus and city skyline",
  },
  polytechnic: {
    campusLabel: "Polytechnic",
    vibe: "Makers",
    headline: "Hands-on",
    subline: "from day one.",
    detail:
      "A desert arboretum, industry partnerships, and innovative makerspaces — serene, easygoing, and built for builders.",
    imageSrc:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Polytechnic campus makerspace and desert landscape",
  },
  "west-valley": {
    campusLabel: "West Valley",
    vibe: "Community",
    headline: "Tight-knit.",
    subline: "Focused.",
    detail:
      "Beautiful courtyards and fountains, a peaceful welcoming vibe, and a community focused on training the next-generation workforce.",
    imageSrc:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "West Valley campus courtyards",
  },
  online: {
    campusLabel: "ASU Online",
    vibe: "Anywhere",
    headline: "Campus is",
    subline: "where you are.",
    detail:
      "More top-20 online programs than any other university — same faculty, same curriculum, research and internships included.",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Student learning from anywhere in the world",
  },
  undecided: {
    campusLabel: "Your campus",
    vibe: "Open",
    headline: "You'll know",
    subline: "when it clicks.",
    detail:
      "Take a virtual tour of each campus. Where you learn can be as important as what you learn.",
    imageSrc:
      "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Student exploring campus options",
  },
};

export const ARIZONA_BEATS: ArizonaBeat[] = [
  {
    stat: "300",
    label: "sunny days a year",
    sublabel: "Phoenix — draw inspiration from the landscape",
  },
  {
    stat: "90 min",
    label: "to Sedona's red rocks",
    sublabel: "day trips with friends between classes",
  },
  {
    stat: "3.5 hrs",
    label: "to the Grand Canyon",
    sublabel: "field research with professors",
  },
  {
    stat: "24",
    label: "national parks & monuments",
    sublabel: "in Arizona — your backyard laboratory",
  },
  {
    stat: "75°",
    label: "average temperature",
    sublabel: "Arizona is more than a backdrop — it's part of the experience",
  },
];

export const GLOBAL_PLACES: PathMoment[] = [
  {
    title: "Antarctica",
    description:
      "Study wildlife patterns and climate change on a 10-day expedition — polar plunge, glacier hikes, and penguins. Every winter.",
    imageSrc:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Antarctica study abroad expedition",
    href: getPlaceLink("Antarctica"),
  },
  {
    title: "Los Angeles",
    description:
      "ASU California Center — steps from the Fashion District and the film industry. Student housing at Broadway Palace.",
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "ASU California Center in downtown Los Angeles",
    href: getPlaceLink("Los Angeles"),
  },
  {
    title: "London",
    description:
      "ASU London opens fall 2026 in Islington — computer science, engineering, or business. Earn a U.K. degree in three years.",
    imageSrc:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "London cityscape and student life",
    href: getPlaceLink("London"),
  },
  {
    title: "Bermuda",
    description:
      "ASU BIOS — the Bermuda Institute of Ocean Sciences. Scientific analysis of the ocean with hands-on student learning.",
    imageSrc:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Ocean sciences research in Bermuda",
    href: getPlaceLink("Bermuda"),
  },
  {
    title: "Washington, D.C.",
    description:
      "Interact with thought leaders and policymakers. Earn your degree through ASU Local at the Washington Center.",
    imageSrc:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "ASU presence in Washington D.C.",
    href: getPlaceLink("Washington, D.C."),
  },
];

export function getCampusImmersion(campusId: CampusId | null): CampusImmersion {
  if (!campusId) return DEFAULT_CAMPUS_IMMERSION;
  return CAMPUS_IMMERSION[campusId];
}

export function getArizonaBeats(): ArizonaBeat[] {
  return ARIZONA_BEATS;
}

export function getGlobalPlaces(): PathMoment[] {
  return GLOBAL_PLACES;
}
