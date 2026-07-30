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
    campusLife: {
      local: "/images/scenes/campus-life.jpg",
      fallback:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
      alt: "Students walking across a vibrant university campus",
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
} as const satisfies Record<string, Record<string, MediaAsset>>;

export type MediaSceneKey = keyof typeof MEDIA.scenes;
export type MediaCampusKey = keyof typeof MEDIA.campuses;

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
