/**
 * Central media registry — swap placeholders for ASU production assets.
 * Drop files into public/images/ matching these paths; components use resolveMedia().
 */
export interface MediaAsset {
  /** Path under /public, e.g. /images/scenes/opening.jpg */
  local: string;
  /** Local fallback until production asset exists */
  fallback: string;
  alt: string;
}

const LOCAL = {
  opening: "/images/scenes/opening.jpg",
  campusHero: "/images/scenes/my-campus-hero.jpg",
  belonging: "/images/scenes/belonging.jpg",
  visit: "/images/scenes/campus-visit.jpg",
  graduating: "/images/scenes/graduating-student.jpg",
  sendoff: "/images/scenes/sun-devil-welcome.jpg",
  tempeCampus: "/images/campus-immersion/tempe.jpg",
  tempeStudent: "/images/campus-immersion/tempe-student.jpg",
  downtownCampus: "/images/campuses/downtown.jpg",
  westValleyCampus: "/images/campus-immersion/west-valley.jpg",
} as const;

export const MEDIA = {
  scenes: {
    opening: {
      local: LOCAL.opening,
      fallback: LOCAL.opening,
      alt: "Cinematic horizon at golden hour",
    },
    graduatingStudent: {
      local: "/images/scenes/graduating-student.jpg",
      fallback: LOCAL.graduating,
      alt: "Graduating student celebrating at ASU",
    },
    campusLife: {
      local: LOCAL.campusHero,
      fallback: LOCAL.tempeCampus,
      alt: "Students walking across a vibrant university campus",
    },
    belonging: {
      local: LOCAL.belonging,
      fallback: LOCAL.tempeCampus,
      alt: "Student on campus at golden hour",
    },
    visit: {
      local: LOCAL.visit,
      fallback: LOCAL.belonging,
      alt: "Student on campus during a tour at golden hour",
    },
    sunDevilWelcome: {
      local: LOCAL.sendoff,
      fallback: LOCAL.sendoff,
      alt: "Sun Devil Welcome at Mountain America Stadium",
    },
  },
  campuses: {
    tempe: {
      local: "/images/campuses/tempe.jpg",
      fallback: LOCAL.tempeCampus,
      alt: "Tempe campus",
    },
    downtown: {
      local: LOCAL.downtownCampus,
      fallback: LOCAL.downtownCampus,
      alt: "Downtown Phoenix campus",
    },
    polytechnic: {
      local: "/images/campuses/polytechnic.jpg",
      fallback: LOCAL.tempeCampus,
      alt: "Polytechnic campus",
    },
    "west-valley": {
      local: "/images/campuses/west-valley.jpg",
      fallback: LOCAL.westValleyCampus,
      alt: "West Valley campus",
    },
    online: {
      local: "/images/campuses/online.jpg",
      fallback: LOCAL.belonging,
      alt: "ASU Online student",
    },
    undecided: {
      local: "/images/campuses/all-campuses.jpg",
      fallback: LOCAL.tempeCampus,
      alt: "ASU campuses overview",
    },
  },
  /** Student-focused backgrounds for Scene 13 campus immersion */
  campusImmersion: {
    tempe: {
      local: LOCAL.tempeCampus,
      fallback: LOCAL.tempeCampus,
      alt: "Students walking across the Tempe campus at sunset",
    },
    downtown: {
      local: "/images/campus-immersion/downtown.jpg",
      fallback: LOCAL.downtownCampus,
      alt: "Students collaborating on the Downtown Phoenix campus",
    },
    polytechnic: {
      local: "/images/campus-immersion/polytechnic.jpg",
      fallback: LOCAL.tempeCampus,
      alt: "Students working in a Polytechnic campus makerspace",
    },
    "west-valley": {
      local: LOCAL.westValleyCampus,
      fallback: LOCAL.westValleyCampus,
      alt: "Students exploring the West Valley campus",
    },
    online: {
      local: "/images/campus-immersion/online.jpg",
      fallback: LOCAL.belonging,
      alt: "ASU Online students learning together",
    },
    undecided: {
      local: "/images/campus-immersion/undecided.jpg",
      fallback: LOCAL.tempeCampus,
      alt: "Student exploring campus options",
    },
  },
  /** Student portrait overlays for Scene 13 — swaps with campus selection */
  campusImmersionStudents: {
    tempe: {
      local: LOCAL.tempeStudent,
      fallback: LOCAL.tempeStudent,
      alt: "Sun Devil students walking together on the Tempe campus",
    },
    downtown: {
      local: "/images/campus-immersion/downtown-student.jpg",
      fallback: LOCAL.tempeStudent,
      alt: "Student with backpack on the Downtown Phoenix campus",
    },
    polytechnic: {
      local: "/images/campus-immersion/polytechnic-student.jpg",
      fallback: LOCAL.tempeStudent,
      alt: "Polytechnic student working in a makerspace",
    },
    "west-valley": {
      local: "/images/campus-immersion/west-valley-student.jpg",
      fallback: LOCAL.tempeStudent,
      alt: "West Valley students collaborating on campus",
    },
    online: {
      local: "/images/campus-immersion/online-student.jpg",
      fallback: LOCAL.tempeStudent,
      alt: "ASU Online student learning remotely",
    },
    undecided: {
      local: "/images/campus-immersion/undecided-student.jpg",
      fallback: LOCAL.tempeStudent,
      alt: "Student deciding which ASU campus feels right",
    },
  },
} as const satisfies Record<string, Record<string, MediaAsset>>;

export type MediaSceneKey = keyof typeof MEDIA.scenes;
export type MediaCampusKey = keyof typeof MEDIA.campuses;
export type MediaCampusImmersionKey = keyof typeof MEDIA.campusImmersion;
export type MediaCampusImmersionStudentKey = keyof typeof MEDIA.campusImmersionStudents;

/** Prefer local asset path; Image/VideoBackground onError should swap to fallback */
export function resolveMedia(asset: MediaAsset): string {
  return asset.local;
}

export function getMediaFallback(asset: MediaAsset): string {
  return asset.fallback;
}

export function getCampusMedia(campusId: string | null): MediaAsset {
  const key = campusId && campusId in MEDIA.campuses ? campusId : "undecided";
  return MEDIA.campuses[key as MediaCampusKey];
}

export function getCampusImmersionMedia(campusId: string | null): MediaAsset {
  const key =
    campusId && campusId in MEDIA.campusImmersion ? campusId : "undecided";
  return MEDIA.campusImmersion[key as MediaCampusImmersionKey];
}

export function getCampusImmersionStudentMedia(campusId: string | null): MediaAsset {
  const key =
    campusId && campusId in MEDIA.campusImmersionStudents
      ? campusId
      : "undecided";
  return MEDIA.campusImmersionStudents[key as MediaCampusImmersionStudentKey];
}
