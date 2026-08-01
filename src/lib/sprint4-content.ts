import type { CampusId, CampusOption, LearningStyle, LearningStyleId } from "@/types/experience";
import type { Sprint3Content, StatBeat, RealExperience, BelongingMoment } from "@/lib/sprint3-content";
import { getSprint3Content } from "@/lib/sprint3-content";
import type { InterestId } from "@/types/experience";

export const LEARNING_STYLES: LearningStyle[] = [
  {
    id: "hands-on",
    emoji: "🛠️",
    label: "Hands-on",
    tagline: "Build it. Break it. Fix it. Learn.",
  },
  {
    id: "collaborative",
    emoji: "🤝",
    label: "With people",
    tagline: "Small groups, big ideas, real connection.",
  },
  {
    id: "independent",
    emoji: "🎧",
    label: "On my own",
    tagline: "Self-paced, deep focus, your rhythm.",
  },
  {
    id: "exploring",
    emoji: "🧭",
    label: "Still exploring",
    tagline: "Try everything — no wrong answer.",
  },
];

export const CAMPUSES: CampusOption[] = [
  {
    id: "tempe",
    label: "Tempe",
    vibe: "Energy",
    description: "Big 12 sports, VR labs, and the heartbeat of ASU.",
    imageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Students walking on the Tempe campus",
  },
  {
    id: "downtown",
    label: "Downtown Phoenix",
    vibe: "City",
    description: "Journalism, health care, government — career connections everywhere.",
    imageSrc:
      "https://images.unsplash.com/photo-1477959856237-4a6700d41685?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Downtown Phoenix skyline at dusk",
  },
  {
    id: "polytechnic",
    label: "Polytechnic",
    vibe: "Makers",
    description: "Desert arboretum, makerspaces, and hands-on from day one.",
    imageSrc:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Engineering makerspace at Polytechnic campus",
  },
  {
    id: "west-valley",
    label: "West Valley",
    vibe: "Community",
    description: "Tight-knit, peaceful, and focused on what's next.",
    imageSrc:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "West Valley campus courtyards and fountains",
  },
  {
    id: "online",
    label: "ASU Online",
    vibe: "Anywhere",
    description: "Same faculty, same degree — from wherever you are.",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Student learning online from anywhere",
  },
  {
    id: "undecided",
    label: "Not sure yet",
    vibe: "Open",
    description: "Four campuses, one university — you'll find your fit.",
    imageSrc:
      "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Student exploring campus options",
  },
];

export function getLearningStyleById(id: LearningStyleId): LearningStyle | undefined {
  return LEARNING_STYLES.find((s) => s.id === id);
}

export function getCampusById(id: CampusId): CampusOption | undefined {
  return CAMPUSES.find((c) => c.id === id);
}

/** Learning-style overlays — merged onto interest-based Sprint 3 content */
const LEARNING_OVERLAYS: Record<
  LearningStyleId,
  {
    voiceContextSuffix: string;
    statBeatIndex: number;
    statOverride: StatBeat;
    belongingSublineSuffix: string;
  }
> = {
  "hands-on": {
    voiceContextSuffix: " · learns by doing",
    statBeatIndex: 1,
    statOverride: {
      stat: "100+",
      label: "makerspaces & labs",
      sublabel: "prototype, build, and ship before you graduate",
    },
    belongingSublineSuffix: " Where you build is as important as what you build.",
  },
  collaborative: {
    voiceContextSuffix: " · thrives in community",
    statBeatIndex: 1,
    statOverride: {
      stat: "18:1",
      label: "student-to-faculty ratio",
      sublabel: "small groups, active learning, real mentorship",
    },
    belongingSublineSuffix: " Your people are already here.",
  },
  independent: {
    voiceContextSuffix: " · charts their own course",
    statBeatIndex: 2,
    statOverride: {
      stat: "Top 20",
      label: "online programs in the U.S.",
      sublabel: "same faculty, same degree — your schedule",
    },
    belongingSublineSuffix: " Learn your way, at your pace.",
  },
  exploring: {
    voiceContextSuffix: " · still discovering",
    statBeatIndex: 0,
    statOverride: {
      stat: "400+",
      label: "degrees to sample",
      sublabel: "change direction without starting over",
    },
    belongingSublineSuffix: " Not knowing yet is the most honest place to start.",
  },
};

/** Campus overlays — swap imagery and one experience panel */
const CAMPUS_OVERLAYS: Record<
  CampusId,
  {
    studentVoiceImage?: string;
    experienceIndex: number;
    experienceOverride: RealExperience;
    belonging: Partial<BelongingMoment>;
  }
> = {
  tempe: {
    experienceIndex: 2,
    experienceOverride: {
      program: "Sun Devil Welcome · Tempe",
      headline: "70,000 Sun Devils. One stadium.",
      description:
        "Mountain America Stadium, Big 12 athletics, and the Inferno student section — pure passion before classes even start.",
      imageSrc:
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Sun Devil stadium energy",
    },
    belonging: {
      preline: "Picture yourself on campus —",
      headline: "you",
      emphasis: "belong.",
    },
  },
  downtown: {
    experienceIndex: 0,
    experienceOverride: {
      program: "Downtown Phoenix campus",
      headline: "Big-city energy. Career focus.",
      description:
        "Steps from hospitals, newsrooms, and government — journalism, nursing, and public service at your doorstep.",
      imageSrc:
        "https://images.unsplash.com/photo-1477959856237-4a6700d41685?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Downtown Phoenix campus environment",
    },
    belonging: {
      preline: "The city is your campus —",
      headline: "you",
      emphasis: "belong.",
    },
  },
  polytechnic: {
    experienceIndex: 0,
    experienceOverride: {
      program: "Polytechnic campus",
      headline: "Makerspaces in the desert.",
      description:
        "Industry partnerships, specialized tools, and hands-on learning in a serene desert arboretum setting.",
      imageSrc:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Polytechnic campus makerspace",
    },
    belonging: {
      preline: "Build in the desert —",
      headline: "you",
      emphasis: "belong.",
    },
  },
  "west-valley": {
    experienceIndex: 1,
    experienceOverride: {
      program: "West Valley campus",
      headline: "Tight-knit. Focused. Yours.",
      description:
        "Courtyards, fountains, and a peaceful community focused on training the next-generation workforce.",
      imageSrc:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "West Valley campus community",
    },
    belonging: {
      preline: "Find your community —",
      headline: "where you",
      emphasis: "belong.",
    },
  },
  online: {
    studentVoiceImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
    experienceIndex: 0,
    experienceOverride: {
      program: "ASU Online",
      headline: "Anywhere becomes campus.",
      description:
        "More top-20 online programs than any other university — research, internships, and hands-on learning included.",
      imageSrc:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "ASU Online student learning remotely",
    },
    belonging: {
      preline: "Wherever you are —",
      headline: "you",
      emphasis: "belong.",
    },
  },
  undecided: {
    experienceIndex: 2,
    experienceOverride: {
      program: "Four campuses · One ASU",
      headline: "Find the fit that feels like you.",
      description:
        "Tempe's energy, Downtown's city pulse, Polytechnic's makerspaces, West Valley's community — take a virtual tour of each.",
      imageSrc:
        "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Student exploring ASU campus options",
    },
    belonging: {
      preline: "You'll know when it feels right —",
      headline: "you",
      emphasis: "belong.",
    },
  },
};

export function getEnhancedSprint3Content(
  interestId: InterestId | null,
  learningStyleId: LearningStyleId | null,
  campusId: CampusId | null,
): Sprint3Content {
  const base = getSprint3Content(interestId);
  const result: Sprint3Content = structuredClone(base);

  if (learningStyleId) {
    const learning = LEARNING_OVERLAYS[learningStyleId];
    result.studentVoice.context += learning.voiceContextSuffix;
    result.statBeats = [...result.statBeats];
    result.statBeats[learning.statBeatIndex] = learning.statOverride;
    result.belonging = {
      ...result.belonging,
      subline: result.belonging.subline + learning.belongingSublineSuffix,
    };
  }

  if (campusId) {
    const campus = getCampusById(campusId);
    const overlay = CAMPUS_OVERLAYS[campusId];
    if (campus) {
      if (overlay.studentVoiceImage) {
        result.studentVoice.imageSrc = overlay.studentVoiceImage;
        result.studentVoice.imageAlt = campus.imageAlt;
      } else {
        result.studentVoice.imageSrc = campus.imageSrc.replace("1600", "2400");
        result.studentVoice.imageAlt = campus.imageAlt;
      }
      result.belonging = {
        ...result.belonging,
        ...overlay.belonging,
        imageSrc: campus.imageSrc.replace("1600", "2400"),
        imageAlt: campus.imageAlt,
      };
      result.experiences = [...result.experiences];
      result.experiences[overlay.experienceIndex] = overlay.experienceOverride;
    }
  }

  return result;
}
