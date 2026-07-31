import type { CampusId, InterestId } from "@/types/experience";

const DEGREES_BASE = "https://degrees.asu.edu";
const UTM_SOURCE = "myfuture";
const UTM_MEDIUM = "web";

/** Append UTM params for ASU analytics */
export function withUtm(url: string, campaign: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}utm_source=${UTM_SOURCE}&utm_medium=${UTM_MEDIUM}&utm_campaign=${campaign}`;
}

/** Build a degrees.asu.edu URL */
export function degreeUrl(path: string, campaign: string): string {
  return withUtm(`${DEGREES_BASE}${path}`, campaign);
}

export const ASU_LINKS = {
  apply: withUtm("https://admission.asu.edu/apply", "sendoff-apply"),
  visit: withUtm("https://visit.asu.edu/", "visit"),
  campuses: withUtm("https://campus.asu.edu/", "campuses"),
  admissionContact: withUtm("https://admission.asu.edu/contact", "admission-contact"),
  degrees: degreeUrl("/bachelors", "degrees-explore"),
  degreesGraduate: degreeUrl("/masters-phd", "degrees-graduate"),
  studyAbroad: withUtm("https://mystudyabroad.asu.edu/", "study-abroad"),
  futureSunDevils: "https://www.instagram.com/FutureSunDevils/",
} as const;

/** Browse degrees by interest area on degrees.asu.edu */
export const INTEREST_DEGREE_AREAS: Record<InterestId, { label: string; path: string }> = {
  build: { label: "Engineering and Technology", path: "/bachelors/major-list/interest-area/08" },
  help: { label: "Health and Wellness", path: "/bachelors/major-list/interest-area/03" },
  create: { label: "Arts", path: "/bachelors/major-list/interest-area/02" },
  "change-world": {
    label: "Law, Justice and Public Service",
    path: "/bachelors/major-list/interest-area/12",
  },
  business: { label: "Business", path: "/bachelors/major-list/interest-area/04" },
  discover: { label: "Science", path: "/bachelors/major-list/interest-area/18" },
  games: { label: "Communication and Media", path: "/bachelors/major-list/interest-area/05" },
  planet: { label: "Sustainability", path: "/bachelors/major-list/interest-area/15" },
  exploring: { label: "Exploratory", path: "/bachelors/major-list/interest-area/14" },
};

export const CAMPUS_LINKS: Record<CampusId, { label: string; href: string; visitHref: string }> = {
  tempe: {
    label: "Tempe",
    href: withUtm("https://campus.asu.edu/tempe", "campus-tempe"),
    visitHref: withUtm("https://visit.asu.edu/tempe", "visit-tempe"),
  },
  downtown: {
    label: "Downtown Phoenix",
    href: withUtm("https://campus.asu.edu/downtown-phoenix", "campus-downtown"),
    visitHref: withUtm("https://visit.asu.edu/downtown-phoenix", "visit-downtown"),
  },
  polytechnic: {
    label: "Polytechnic",
    href: withUtm("https://campus.asu.edu/polytechnic", "campus-polytechnic"),
    visitHref: withUtm("https://visit.asu.edu/polytechnic", "visit-polytechnic"),
  },
  "west-valley": {
    label: "West Valley",
    href: withUtm("https://campus.asu.edu/west", "campus-west"),
    visitHref: withUtm("https://visit.asu.edu/west-valley", "visit-west"),
  },
  online: {
    label: "ASU Online",
    href: withUtm("https://asuonline.asu.edu/", "campus-online"),
    visitHref: withUtm("https://asuonline.asu.edu/online-learning-experience", "visit-online"),
  },
  undecided: {
    label: "All campuses",
    href: ASU_LINKS.campuses,
    visitHref: ASU_LINKS.visit,
  },
};

/** Degrees offered at each campus on degrees.asu.edu */
export const CAMPUS_DEGREE_LINKS: Record<CampusId, string> = {
  tempe: degreeUrl("/bachelors/major-list/location/tempe", "campus-degrees-tempe"),
  downtown: degreeUrl("/bachelors/major-list/location/downtown-phoenix", "campus-degrees-downtown"),
  polytechnic: degreeUrl("/bachelors/major-list/location/polytechnic", "campus-degrees-polytechnic"),
  "west-valley": degreeUrl("/bachelors/major-list/location/west", "campus-degrees-west"),
  online: degreeUrl("/bachelors/major-list/location/online", "campus-degrees-online"),
  undecided: ASU_LINKS.degrees,
};

export interface CampusExploreLink {
  label: string;
  href: string;
}

/** Explore-before-you-choose links shown on campus selection cards */
export function getCampusExploreLinks(campusId: CampusId): CampusExploreLink[] {
  const campus = CAMPUS_LINKS[campusId];

  if (campusId === "undecided") {
    return [
      { label: "Compare campuses", href: ASU_LINKS.campuses },
      { label: "Browse all degrees", href: ASU_LINKS.degrees },
    ];
  }

  if (campusId === "online") {
    return [
      { label: "Explore ASU Online", href: campus.href },
      { label: "Online degrees", href: CAMPUS_DEGREE_LINKS.online },
    ];
  }

  return [
    { label: "Explore campus", href: campus.href },
    { label: "Degrees here", href: CAMPUS_DEGREE_LINKS[campusId] },
    { label: "Plan a visit", href: campus.visitHref },
  ];
}

export function getCampusDegreesLink(campusId: CampusId | null): string {
  if (!campusId) return ASU_LINKS.degrees;
  return CAMPUS_DEGREE_LINKS[campusId] ?? ASU_LINKS.degrees;
}

/** Primary college/school per interest — links to matching degrees browse on degrees.asu.edu */
export const COLLEGE_BY_INTEREST: Record<
  InterestId,
  { name: string; shortName: string; href: string }
> = {
  build: {
    name: "Engineering and Technology degrees",
    shortName: "Engineering degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.build.path, "college-engineering"),
  },
  help: {
    name: "Health and Wellness degrees",
    shortName: "Health degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.help.path, "college-health"),
  },
  create: {
    name: "Arts degrees",
    shortName: "Arts degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.create.path, "college-arts"),
  },
  "change-world": {
    name: "Law, Justice and Public Service degrees",
    shortName: "Public service degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS["change-world"].path, "college-public-service"),
  },
  business: {
    name: "Business degrees",
    shortName: "Business degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.business.path, "college-business"),
  },
  discover: {
    name: "Science degrees",
    shortName: "Science degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.discover.path, "college-science"),
  },
  games: {
    name: "Communication and Media degrees",
    shortName: "Media degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.games.path, "college-media"),
  },
  planet: {
    name: "Sustainability degrees",
    shortName: "Sustainability degrees",
    href: degreeUrl(INTEREST_DEGREE_AREAS.planet.path, "college-sustainability"),
  },
  exploring: {
    name: "Undergraduate degrees",
    shortName: "Browse degrees",
    href: ASU_LINKS.degrees,
  },
};

/** Map experience program names to specific degree pages on degrees.asu.edu */
const PROGRAM_DEGREE_LINKS: { keywords: string[]; path: string }[] = [
  { keywords: ["Dreamscape"], path: "/bachelors/major/ASU00/LABSCMBS/biological-sciences-biomedical-sciences" },
  { keywords: ["Barrett"], path: "/bachelors/major-list/accelerated-programs" },
  { keywords: ["Luminosity"], path: "/bachelors/major/ASU00/CSCSEBS/computer-science" },
  { keywords: ["Fulton", "Engineering"], path: "/bachelors/major/ASU00/ESCSESBS/computer-science-software-engineering" },
  { keywords: ["Health Solutions"], path: "/bachelors/major/ASU00/NUHSCBAS/applied-science-health-sciences" },
  { keywords: ["Next Generation Service"], path: "/bachelors/major/ASU00/LACELBA/civic-and-economic-thought-and-leadership" },
  { keywords: ["Global Futures Impact"], path: "/bachelors/major/ASU00/SUSUSTBS/sustainability" },
  { keywords: ["MIX Center"], path: "/bachelors/major/ASU00/HIFMPBFA/film-and-media-production" },
  { keywords: ["Herberger"], path: "/bachelors/major/ASU00/FAARTEBFA/art-art-education" },
  { keywords: ["California Center"], path: "/bachelors/major/ASU00/HIFMPBFA/film-and-media-production" },
  { keywords: ["Dialogues for Democracy"], path: "/bachelors/major/ASU00/PPCASPBA/community-advocacy-and-social-policy" },
  { keywords: ["Watts"], path: "/bachelors/major/ASU00/BABUSPBA/business-public-service-and-public-policy" },
  { keywords: ["Antarctica", "Study Abroad"], path: "/bachelors/major/ASU00/SUSUSTBS/sustainability" },
  { keywords: ["Venture Devils"], path: "/bachelors/major/ASU00/BABUENTBS/business-entrepreneurship" },
  { keywords: ["W. P. Carey"], path: "/bachelors/major/ASU00/BABUSBA/business" },
  { keywords: ["Thunderbird"], path: "/bachelors/major/ASU00/TBINTRABS/international-trade" },
  { keywords: ["Biodesign"], path: "/bachelors/major/ASU00/LABSCMBS/biological-sciences-biomedical-sciences" },
  { keywords: ["NASA", "Space Futures"], path: "/bachelors/major/ASU00/LASESGSBS/earth-and-space-exploration-geological-and-planetary-sciences" },
  { keywords: ["BIOS", "Bermuda"], path: "/bachelors/major/ASU00/LAEESBS/earth-and-environmental-sciences" },
  { keywords: ["Narrative", "Emerging Media"], path: "/bachelors/major/ASU00/LAENGNSBA/english-narrative-studies" },
  { keywords: ["Esports", "Inferno"], path: "/bachelors/major/ASU00/HIGSPBS/game-studio-production" },
  { keywords: ["Sustainability"], path: "/bachelors/major/ASU00/SUSUSTBS/sustainability" },
  { keywords: ["Rob Walton", "Global Futures"], path: "/bachelors/major/ASU00/SUSUSTBS/sustainability" },
  { keywords: ["Indigenous Innovation"], path: "/bachelors/major/ASU00/ASAMSTBA/american-indian-studies" },
  { keywords: ["University College"], path: "/bachelors/major-list/interest-area/14" },
  { keywords: ["eAdvisor"], path: "/bachelors/major-list/interest-area/14" },
  { keywords: ["Sun Devil Welcome"], path: "/bachelors" },
  { keywords: ["4 Campuses"], path: "/bachelors" },
];

export const PLACE_LINKS: Record<string, string> = {
  Antarctica: degreeUrl(
    "/bachelors/major/ASU00/LAEESBS/earth-and-environmental-sciences",
    "place-antarctica-degree",
  ),
  "Los Angeles": degreeUrl(
    "/bachelors/major/ASU00/HIFMPBFA/film-and-media-production",
    "place-la-degree",
  ),
  London: degreeUrl("/bachelors/major/ASU00/LAINRBA/international-relations", "place-london-degree"),
  Bermuda: degreeUrl(
    "/bachelors/major/ASU00/LAEESBS/earth-and-environmental-sciences",
    "place-bermuda-degree",
  ),
  "Washington, D.C.": degreeUrl(
    "/bachelors/major/ASU00/PPPAFBS/public-service-and-public-policy",
    "place-dc-degree",
  ),
};

export function getCampusLink(campusId: CampusId | null): string {
  const key = campusId && campusId in CAMPUS_LINKS ? campusId : "undecided";
  return CAMPUS_LINKS[key as CampusId].href;
}

export function getCampusVisitLink(campusId: CampusId | null): string {
  const key = campusId && campusId in CAMPUS_LINKS ? campusId : "undecided";
  return CAMPUS_LINKS[key as CampusId].visitHref;
}

export function getCollegeForInterest(interestId: InterestId | null) {
  if (!interestId) return COLLEGE_BY_INTEREST.exploring;
  return COLLEGE_BY_INTEREST[interestId] ?? COLLEGE_BY_INTEREST.exploring;
}

export function getDegreesBrowseForInterest(interestId: InterestId | null): string {
  if (!interestId) return ASU_LINKS.degrees;
  const area = INTEREST_DEGREE_AREAS[interestId];
  return degreeUrl(area.path, `degrees-${interestId}`);
}

export function getProgramLink(program: string): string {
  const normalized = program.toLowerCase();
  for (const entry of PROGRAM_DEGREE_LINKS) {
    if (entry.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return degreeUrl(entry.path, "program");
    }
  }
  return ASU_LINKS.degrees;
}

export function getPlaceLink(title: string): string {
  return PLACE_LINKS[title] ?? ASU_LINKS.degrees;
}

export interface ConnectionPath {
  id: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  external?: boolean;
}

export function getConnectionPaths(
  campusId: CampusId | null,
  interestId: InterestId | null,
): ConnectionPath[] {
  const campus = campusId ? CAMPUS_LINKS[campusId] : CAMPUS_LINKS.undecided;
  const college = getCollegeForInterest(interestId);
  const degreesBrowse = getDegreesBrowseForInterest(interestId);

  return [
    {
      id: "visit",
      label: "Experience ASU",
      headline:
        campusId && campusId !== "undecided" && campusId !== "online"
          ? `Visit ${campus.label}.`
          : "Walk the campus.",
      description:
        "In-person tours led by current students — see the labs, the energy, the places you'd call yours.",
      href: getCampusVisitLink(campusId),
      external: true,
    },
    {
      id: "campus",
      label: campus.label,
      headline: "Explore this campus.",
      description:
        campusId === "online"
          ? "Same faculty, same degree — learn how ASU Online works from anywhere."
          : "Virtual tours, maps, housing, and what makes this campus unique.",
      href: campus.href,
      external: true,
    },
    {
      id: "college",
      label: college.shortName,
      headline: "Degrees for your path.",
      description: `Browse undergraduate degrees in ${college.name.replace(" degrees", "")} on degrees.asu.edu.`,
      href: college.href,
      external: true,
    },
    {
      id: "degrees",
      label: "degrees.asu.edu",
      headline: "400+ paths to choose from.",
      description:
        "Search majors, minors, and certificates — filter by interest, campus, and career goal.",
      href: degreesBrowse,
      external: true,
    },
    {
      id: "contact",
      label: "Your admission team",
      headline: "Real people. Real answers.",
      description:
        "Questions about programs, aid, or what comes next? Your admission team member is ready.",
      href: ASU_LINKS.admissionContact,
      external: true,
    },
    {
      id: "social",
      label: "@FutureSunDevils",
      headline: "Meet your people.",
      description:
        "See what life at ASU actually looks like — from students who were exactly where you are now.",
      href: ASU_LINKS.futureSunDevils,
      external: true,
    },
  ];
}
