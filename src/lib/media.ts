/**
 * Central media registry — swap placeholders for ASU production assets.
 * Drop files into public/images/ matching these paths; components use resolveMedia().
 */
export interface MediaAsset {
  /** Path under /public, e.g. /images/scenes/opening.jpg */
  local: string;
  /** Remote fallback until local asset exists */
  fallback: string;
  alt: string;
}

export const MEDIA = {
  scenes: {
    opening: {
      local: "/images/scenes/opening.jpg",
      fallback:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2400&q=80",
      alt: "Cinematic horizon at golden hour",
    },
    graduatingStudent: {
      local: "/images/scenes/graduating-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80",
      alt: "Graduating student celebrating at ASU",
    },
    campusLife: {
      local: "/images/scenes/campus-life.jpg",
      fallback:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
      alt: "Students walking across a vibrant university campus",
    },
    belonging: {
      local: "/images/scenes/belonging.jpg",
      fallback:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
      alt: "Student on campus at golden hour",
    },
    visit: {
      local: "/images/scenes/campus-visit.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
      alt: "Student on campus during a tour at golden hour",
    },
    sunDevilWelcome: {
      local: "/images/scenes/sun-devil-welcome.jpg",
      fallback:
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=2400&q=80",
      alt: "Sun Devil Welcome at Mountain America Stadium",
    },
  },
  campuses: {
    tempe: {
      local: "/images/campuses/tempe.jpg",
      fallback:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
      alt: "Tempe campus",
    },
    downtown: {
      local: "/images/campuses/downtown.jpg",
      fallback:
        "https://images.unsplash.com/photo-1477959856237-4a6700d41685?auto=format&fit=crop&w=2400&q=80",
      alt: "Downtown Phoenix campus",
    },
    polytechnic: {
      local: "/images/campuses/polytechnic.jpg",
      fallback:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80",
      alt: "Polytechnic campus",
    },
    "west-valley": {
      local: "/images/campuses/west-valley.jpg",
      fallback:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=80",
      alt: "West Valley campus",
    },
    online: {
      local: "/images/campuses/online.jpg",
      fallback:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
      alt: "ASU Online student",
    },
    undecided: {
      local: "/images/campuses/all-campuses.jpg",
      fallback:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=80",
      alt: "ASU campuses overview",
    },
  },
  /** Student-focused backgrounds for Scene 13 campus immersion */
  campusImmersion: {
    tempe: {
      local: "/images/campus-immersion/tempe.jpg",
      fallback:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
      alt: "Students walking across the Tempe campus at sunset",
    },
    downtown: {
      local: "/images/campus-immersion/downtown.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80",
      alt: "Students collaborating on the Downtown Phoenix campus",
    },
    polytechnic: {
      local: "/images/campus-immersion/polytechnic.jpg",
      fallback:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80",
      alt: "Students working in a Polytechnic campus makerspace",
    },
    "west-valley": {
      local: "/images/campus-immersion/west-valley.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
      alt: "Students exploring the West Valley campus",
    },
    online: {
      local: "/images/campus-immersion/online.jpg",
      fallback:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
      alt: "ASU Online students learning together",
    },
    undecided: {
      local: "/images/campus-immersion/undecided.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
      alt: "Student exploring campus options",
    },
  },
  /** Student portrait overlays for Scene 13 — swaps with campus selection */
  campusImmersionStudents: {
    tempe: {
      local: "/images/campus-immersion/tempe-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523245775814-390990f1b471?auto=format&fit=crop&w=1600&q=80",
      alt: "Sun Devil students walking together on the Tempe campus",
    },
    downtown: {
      local: "/images/campus-immersion/downtown-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1571260899304-425eee4c376e?auto=format&fit=crop&w=1600&q=80",
      alt: "Student with backpack on the Downtown Phoenix campus",
    },
    polytechnic: {
      local: "/images/campus-immersion/polytechnic-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
      alt: "Polytechnic student working in a makerspace",
    },
    "west-valley": {
      local: "/images/campus-immersion/west-valley-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      alt: "West Valley students collaborating on campus",
    },
    online: {
      local: "/images/campus-immersion/online-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
      alt: "ASU Online student learning remotely",
    },
    undecided: {
      local: "/images/campus-immersion/undecided-student.jpg",
      fallback:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
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
