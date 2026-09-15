import { INTERESTS } from "@/lib/interests";
import {
  DEFAULT_CONTENT,
  PERSONALIZED_CONTENT,
  type PersonalizedContent,
} from "@/lib/personalization";
import {
  DEFAULT_SPRINT3,
  SPRINT3_CONTENT,
  type Sprint3Content,
} from "@/lib/sprint3-content";
import {
  CAMPUSES,
  LEARNING_STYLES,
  CAMPUS_OVERLAYS,
  LEARNING_OVERLAYS,
} from "@/lib/sprint4-content";
import {
  ARIZONA_BEATS,
  CAMPUS_IMMERSION,
  DEFAULT_CAMPUS_IMMERSION,
  GLOBAL_PLACES,
} from "@/lib/sprint5-content";
import { getVisitContent, SENDOFF } from "@/lib/sprint7-content";
import type { CampusId, InterestId } from "@/types/experience";

export type ContentFieldType = "copy" | "image" | "meta";

export interface ContentEntry {
  id: string;
  topic: string;
  topicOrder: number;
  contentBlock: string;
  sceneOrder: number;
  sceneName: string;
  section: string;
  field: string;
  variant: string;
  value: string;
  sourceFile: string;
  fieldType: ContentFieldType;
}

const SCENE_NAMES: Record<number, string> = {
  1: "Opening",
  2: "Campus Life",
  3: "Interest Choice",
  4: "Personalized Mirror",
  5: "Path Reveal",
  6: "Momentum",
  7: "Student Voice",
  8: "Stat Beats",
  9: "Real Experiences",
  10: "You Belong",
  11: "Learning Style",
  12: "Campus Choice",
  13: "Campus Immersion",
  14: "Arizona",
  15: "Unexpected Places",
  16: "Future Snapshot",
  17: "Picture Yourself",
  18: "Next Step",
  19: "Sendoff",
};

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const INTEREST_ORDER = INTERESTS.map((interest) => interest.id);
const LEARNING_ORDER = LEARNING_STYLES.map((style) => style.id);
const CAMPUS_ORDER = CAMPUSES.map((campus) => campus.id);

function interestLabel(id: string): string {
  return INTERESTS.find((interest) => interest.id === id)?.label ?? id;
}

function learningLabel(id: string): string {
  return LEARNING_STYLES.find((style) => style.id === id)?.label ?? id;
}

function campusLabel(id: string): string {
  return CAMPUSES.find((campus) => campus.id === id)?.label ?? id;
}

function resolveTopic(entry: Pick<ContentEntry, "sceneOrder" | "variant" | "section">): {
  topic: string;
  topicOrder: number;
} {
  if (entry.variant.startsWith("interest:")) {
    const id = entry.variant.replace("interest:", "");
    const index = INTEREST_ORDER.indexOf(id as InterestId);
    if (entry.sceneOrder === 3 && entry.section === "Interest card") {
      return { topic: "Shared · Interest selection", topicOrder: 2 };
    }
    return {
      topic: `Path · ${interestLabel(id)}`,
      topicOrder: 100 + (index >= 0 ? index : 99),
    };
  }

  if (entry.variant.startsWith("learning:")) {
    const id = entry.variant.replace("learning:", "");
    const index = LEARNING_ORDER.indexOf(id as (typeof LEARNING_ORDER)[number]);
    const isOverlay =
      entry.section.includes("Overlay") || entry.sceneOrder === 8 || entry.sceneOrder === 10;
    if (isOverlay) {
      return {
        topic: `Learning style · ${learningLabel(id)}`,
        topicOrder: 200 + (index >= 0 ? index : 99),
      };
    }
    return {
      topic: "Shared · Learning style selection",
      topicOrder: 15,
    };
  }

  if (entry.variant.startsWith("campus:")) {
    const id = entry.variant.replace("campus:", "");
    const index = CAMPUS_ORDER.indexOf(id as CampusId);
    const isSharedSelection =
      entry.sceneOrder === 12 && entry.section === "Campus card";
    if (isSharedSelection) {
      return {
        topic: "Shared · Campus selection",
        topicOrder: 16,
      };
    }
    return {
      topic: `Campus · ${campusLabel(id)}`,
      topicOrder: 300 + (index >= 0 ? index : 99),
    };
  }

  if (entry.sceneOrder <= 2) {
    return { topic: "Shared · Opening", topicOrder: 1 };
  }
  if (entry.sceneOrder === 3) {
    return { topic: "Shared · Interest selection", topicOrder: 2 };
  }
  if (entry.sceneOrder === 11) {
    return { topic: "Shared · Learning style selection", topicOrder: 15 };
  }
  if (entry.sceneOrder === 12) {
    return { topic: "Shared · Campus selection", topicOrder: 16 };
  }
  if (entry.sceneOrder === 13 || entry.sceneOrder === 14 || entry.sceneOrder === 15) {
    return { topic: "Shared · Place & setting", topicOrder: 17 };
  }
  if (entry.sceneOrder === 17) {
    return { topic: "Shared · Visit & picture yourself", topicOrder: 19 };
  }
  if (entry.sceneOrder >= 16) {
    return { topic: "Shared · Closing & next steps", topicOrder: 20 };
  }

  return { topic: "Shared · Default path (no interest selected)", topicOrder: 10 };
}

function enrichEntry(
  params: Omit<ContentEntry, "id" | "topic" | "topicOrder" | "contentBlock"> & { id?: string },
): ContentEntry {
  const { topic, topicOrder } = resolveTopic(params);
  return {
    id:
      params.id ??
      `${params.sceneOrder}-${slugify(params.section)}-${slugify(params.field)}-${slugify(params.variant)}`,
    topic,
    topicOrder,
    contentBlock: `${params.section} · ${params.field}`,
    ...params,
  };
}

function add(
  rows: ContentEntry[],
  params: Omit<ContentEntry, "id" | "topic" | "topicOrder" | "contentBlock"> & { id?: string },
): void {
  rows.push(enrichEntry(params));
}

function addMirror(
  rows: ContentEntry[],
  sceneOrder: number,
  section: string,
  variant: string,
  mirror: PersonalizedContent["mirror"],
  sourceFile: string,
): void {
  const fields: Array<[string, string, ContentFieldType]> = [
    ["preline", mirror.preline, "copy"],
    ["headline", mirror.headline, "copy"],
    ["emphasis", mirror.emphasis, "copy"],
    ["subline", mirror.subline, "copy"],
    ["imageSrc", mirror.imageSrc, "image"],
    ["imageAlt", mirror.imageAlt, "copy"],
  ];
  for (const [field, value, fieldType] of fields) {
    add(rows, {
      sceneOrder,
      sceneName: SCENE_NAMES[sceneOrder] ?? "Unknown",
      section,
      field,
      variant,
      value,
      sourceFile,
      fieldType,
    });
  }
  if (mirror.imageFeature) {
    for (const [field, value] of Object.entries(mirror.imageFeature)) {
      add(rows, {
        sceneOrder,
        sceneName: SCENE_NAMES[sceneOrder] ?? "Unknown",
        section: `${section} · image feature`,
        field,
        variant,
        value,
        sourceFile,
        fieldType: "copy",
      });
    }
  }
}

function addMomentum(
  rows: ContentEntry[],
  sceneOrder: number,
  section: string,
  variant: string,
  momentum: PersonalizedContent["momentum"],
  sourceFile: string,
): void {
  for (const [field, value] of Object.entries(momentum)) {
    add(rows, {
      sceneOrder,
      sceneName: SCENE_NAMES[sceneOrder] ?? "Unknown",
      section,
      field,
      variant,
      value,
      sourceFile,
      fieldType: field === "imageSrc" ? "image" : "copy",
    });
  }
}

function addSprint3(
  rows: ContentEntry[],
  interestId: InterestId | "default",
  content: Sprint3Content,
): void {
  const variant = interestId === "default" ? "default" : `interest:${interestId}`;
  const sourceFile =
    interestId === "default"
      ? "src/lib/sprint3-content.ts"
      : `src/lib/sprint3-content.ts (${interestId})`;

  const voiceFields: Array<[string, string, ContentFieldType]> = [
    ["quote", content.studentVoice.quote, "copy"],
    ["name", content.studentVoice.name, "copy"],
    ["context", content.studentVoice.context, "copy"],
    ["imageSrc", content.studentVoice.imageSrc, "image"],
    ["imageAlt", content.studentVoice.imageAlt, "copy"],
  ];
  for (const [field, value, fieldType] of voiceFields) {
    add(rows, {
      sceneOrder: 7,
      sceneName: SCENE_NAMES[7],
      section: "Student voice",
      field,
      variant,
      value,
      sourceFile,
      fieldType,
    });
  }

  content.statBeats.forEach((beat, index) => {
    for (const [field, value] of Object.entries(beat)) {
      if (!value) continue;
      add(rows, {
        sceneOrder: 8,
        sceneName: SCENE_NAMES[8],
        section: `Stat beat ${index + 1}`,
        field,
        variant,
        value,
        sourceFile,
        fieldType: "copy",
      });
    }
  });

  content.experiences.forEach((exp, index) => {
    for (const [field, value] of Object.entries(exp)) {
      add(rows, {
        sceneOrder: 9,
        sceneName: SCENE_NAMES[9],
        section: `Experience ${index + 1}`,
        field,
        variant,
        value,
        sourceFile,
        fieldType: field === "imageSrc" ? "image" : "copy",
      });
    }
  });

  for (const [field, value] of Object.entries(content.belonging)) {
    add(rows, {
      sceneOrder: 10,
      sceneName: SCENE_NAMES[10],
      section: "Belonging",
      field,
      variant,
      value,
      sourceFile,
      fieldType: field === "imageSrc" ? "image" : "copy",
    });
  }
}

export function buildContentMatrix(): ContentEntry[] {
  const rows: ContentEntry[] = [];

  const openingLines = [
    "Your future",
    "doesn't start",
    "with choosing",
    "a university.",
    "It starts",
    "with imagining",
    "what's possible.",
  ];
  openingLines.forEach((line, index) => {
    add(rows, {
      sceneOrder: 1,
      sceneName: SCENE_NAMES[1],
      section: "Headline",
      field: `line ${index + 1}`,
      variant: "default",
      value: line,
      sourceFile: "src/components/scenes/Scene1Opening.tsx",
      fieldType: "copy",
    });
  });
  add(rows, {
    sceneOrder: 1,
    sceneName: SCENE_NAMES[1],
    section: "UI",
    field: "scroll indicator",
    variant: "default",
    value: "Scroll to explore",
    sourceFile: "src/components/ui/ScrollIndicator.tsx",
    fieldType: "copy",
  });

  const campusLines = [
    "Some people arrive",
    "knowing exactly",
    "where they're going.",
    "Most don't.",
    "Either way...",
    "you're in the right place.",
  ];
  campusLines.forEach((line, index) => {
    add(rows, {
      sceneOrder: 2,
      sceneName: SCENE_NAMES[2],
      section: "Headline",
      field: `line ${index + 1}`,
      variant: "default",
      value: line,
      sourceFile: "src/components/scenes/Scene2CampusLife.tsx",
      fieldType: "copy",
    });
  });

  for (const interest of INTERESTS) {
    add(rows, {
      sceneOrder: 3,
      sceneName: SCENE_NAMES[3],
      section: "Interest card",
      field: "label",
      variant: `interest:${interest.id}`,
      value: interest.label,
      sourceFile: "src/lib/interests.ts",
      fieldType: "copy",
    });
    add(rows, {
      sceneOrder: 3,
      sceneName: SCENE_NAMES[3],
      section: "Interest card",
      field: "emoji",
      variant: `interest:${interest.id}`,
      value: interest.emoji,
      sourceFile: "src/lib/interests.ts",
      fieldType: "meta",
    });
  }

  const scene3Ui: Array<[string, string]> = [
    ["headline", "What pulls you in?"],
    ["body (gated)", "Choose one to continue — or explore degrees first, then come back and tap your pick."],
    ["body (selected)", "Tap what resonates. Your path adapts from here."],
    ["status (saved)", "Saved — scroll to see your path"],
    ["gate prompt", "Pick one to continue"],
    ["gate CTA", "Or browse all degrees at ASU first →"],
    ["post-select CTA", "Browse degrees for your interest →"],
  ];
  for (const [field, value] of scene3Ui) {
    add(rows, {
      sceneOrder: 3,
      sceneName: SCENE_NAMES[3],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene3Interests.tsx",
      fieldType: "copy",
    });
  }

  addMirror(rows, 4, "Mirror", "default", DEFAULT_CONTENT.mirror, "src/lib/personalization.ts");
  addMomentum(rows, 6, "Momentum", "default", DEFAULT_CONTENT.momentum, "src/lib/personalization.ts");
  addSprint3(rows, "default", DEFAULT_SPRINT3);

  for (const interest of INTERESTS) {
    const content = PERSONALIZED_CONTENT[interest.id];
    addMirror(
      rows,
      4,
      "Mirror",
      `interest:${interest.id}`,
      content.mirror,
      "src/lib/personalization.ts",
    );
    addMomentum(
      rows,
      6,
      "Momentum",
      `interest:${interest.id}`,
      content.momentum,
      "src/lib/personalization.ts",
    );
    addSprint3(rows, interest.id, SPRINT3_CONTENT[interest.id]);

    content.paths.forEach((path, index) => {
      for (const [field, value] of Object.entries(path)) {
        if (value === undefined) continue;
        add(rows, {
          sceneOrder: 5,
          sceneName: SCENE_NAMES[5],
          section: `Path ${index + 1}`,
          field,
          variant: `interest:${interest.id}`,
          value: String(value),
          sourceFile: "src/lib/personalization.ts",
          fieldType: field === "imageSrc" ? "image" : field === "href" ? "meta" : "copy",
        });
      }
    });
  }

  const scene5Ui: Array<[string, string]> = [
    ["kicker (selected)", "Your path"],
    ["kicker (default)", "Explore paths"],
    ["headline", "Three moments that could be yours."],
  ];
  for (const [field, value] of scene5Ui) {
    add(rows, {
      sceneOrder: 5,
      sceneName: SCENE_NAMES[5],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene5PathReveal.tsx",
      fieldType: "copy",
    });
  }

  add(rows, {
    sceneOrder: 6,
    sceneName: SCENE_NAMES[6],
    section: "Scene UI",
    field: "helper",
    variant: "default",
    value: "More of your story is coming — two choices below shape what follows",
    sourceFile: "src/components/scenes/Scene6Momentum.tsx",
    fieldType: "copy",
  });

  for (const style of LEARNING_STYLES) {
    for (const [field, value] of Object.entries(style)) {
      add(rows, {
        sceneOrder: 11,
        sceneName: SCENE_NAMES[11],
        section: "Learning style tile",
        field,
        variant: `learning:${style.id}`,
        value: String(value),
        sourceFile: "src/lib/sprint4-content.ts",
        fieldType: field === "emoji" ? "meta" : "copy",
      });
    }

    const overlay = LEARNING_OVERLAYS[style.id];
    add(rows, {
      sceneOrder: 11,
      sceneName: SCENE_NAMES[11],
      section: "Overlay · voice context suffix",
      field: "suffix",
      variant: `learning:${style.id}`,
      value: overlay.voiceContextSuffix.trim(),
      sourceFile: "src/lib/sprint4-content.ts",
      fieldType: "copy",
    });
    add(rows, {
      sceneOrder: 11,
      sceneName: SCENE_NAMES[11],
      section: "Overlay · belonging subline suffix",
      field: "suffix",
      variant: `learning:${style.id}`,
      value: overlay.belongingSublineSuffix.trim(),
      sourceFile: "src/lib/sprint4-content.ts",
      fieldType: "copy",
    });
    for (const [field, value] of Object.entries(overlay.statOverride)) {
      if (!value) continue;
      add(rows, {
        sceneOrder: 8,
        sceneName: SCENE_NAMES[8],
        section: `Overlay stat (replaces beat ${overlay.statBeatIndex + 1})`,
        field,
        variant: `learning:${style.id}`,
        value,
        sourceFile: "src/lib/sprint4-content.ts",
        fieldType: "copy",
      });
    }
  }

  const scene11Ui: Array<[string, string]> = [
    ["kicker", "Go deeper"],
    ["headline line 1", "How do you"],
    ["headline line 2", "learn best?"],
    ["body", "This shapes what comes next — programs, spaces, and stories picked for you."],
    ["helper link", "Not sure how you learn best? Browse degrees at ASU first →"],
    ["status (saved)", "Saved — one more choice below"],
  ];
  for (const [field, value] of scene11Ui) {
    add(rows, {
      sceneOrder: 11,
      sceneName: SCENE_NAMES[11],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene11LearningStyle.tsx",
      fieldType: "copy",
    });
  }

  for (const campus of CAMPUSES) {
    for (const [field, value] of Object.entries(campus)) {
      add(rows, {
        sceneOrder: 12,
        sceneName: SCENE_NAMES[12],
        section: "Campus card",
        field,
        variant: `campus:${campus.id}`,
        value: String(value),
        sourceFile: "src/lib/sprint4-content.ts",
        fieldType: field === "imageSrc" ? "image" : "copy",
      });
    }
  }

  const scene12Ui: Array<[string, string]> = [
    ["kicker", "Almost there"],
    ["headline line 1", "Where do you"],
    ["headline line 2", "see yourself?"],
    [
      "body",
      "Tap a campus to select it for your path. Explore first if you want — each card links out to campus info, degrees, and visits.",
    ],
    ["helper", "Not ready to choose? Open any link below, then come back and tap your pick."],
    ["status", "{campusLabel} selected — scroll to see it come alive"],
    ["selected badge", "Selected ✓"],
  ];
  for (const [field, value] of scene12Ui) {
    add(rows, {
      sceneOrder: 12,
      sceneName: SCENE_NAMES[12],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene12CampusChoice.tsx",
      fieldType: "copy",
    });
  }

  for (const [field, value] of Object.entries(DEFAULT_CAMPUS_IMMERSION)) {
    add(rows, {
      sceneOrder: 13,
      sceneName: SCENE_NAMES[13],
      section: "Immersion",
      field,
      variant: "default",
      value,
      sourceFile: "src/lib/sprint5-content.ts",
      fieldType: field === "imageSrc" ? "image" : "copy",
    });
  }

  for (const campus of CAMPUSES) {
    const immersion = CAMPUS_IMMERSION[campus.id];
    for (const [field, value] of Object.entries(immersion)) {
      add(rows, {
        sceneOrder: 13,
        sceneName: SCENE_NAMES[13],
        section: "Immersion",
        field,
        variant: `campus:${campus.id}`,
        value,
        sourceFile: "src/lib/sprint5-content.ts",
        fieldType: field === "imageSrc" ? "image" : "copy",
      });
    }
  }

  add(rows, {
    sceneOrder: 13,
    sceneName: SCENE_NAMES[13],
    section: "Scene UI",
    field: "CTA",
    variant: "default",
    value: "Browse degrees on degrees.asu.edu",
    sourceFile: "src/components/scenes/Scene13CampusImmersion.tsx",
    fieldType: "copy",
  });

  ARIZONA_BEATS.forEach((beat, index) => {
    for (const [field, value] of Object.entries(beat)) {
      if (!value) continue;
      add(rows, {
        sceneOrder: 14,
        sceneName: SCENE_NAMES[14],
        section: `Arizona stat ${index + 1}`,
        field,
        variant: "default",
        value,
        sourceFile: "src/lib/sprint5-content.ts",
        fieldType: "copy",
      });
    }
  });

  const scene14Ui: Array<[string, string]> = [
    ["kicker", "The Southwest"],
    ["headline line 1", "Arizona isn't a backdrop."],
    ["headline line 2", "It's part of the story."],
  ];
  for (const [field, value] of scene14Ui) {
    add(rows, {
      sceneOrder: 14,
      sceneName: SCENE_NAMES[14],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene14Arizona.tsx",
      fieldType: "copy",
    });
  }

  GLOBAL_PLACES.forEach((place, index) => {
    for (const [field, value] of Object.entries(place)) {
      if (value === undefined) continue;
      add(rows, {
        sceneOrder: 15,
        sceneName: SCENE_NAMES[15],
        section: `Place ${index + 1}`,
        field,
        variant: "default",
        value: String(value),
        sourceFile: "src/lib/sprint5-content.ts",
        fieldType: field === "imageSrc" ? "image" : field === "href" ? "meta" : "copy",
      });
    }
  });

  const scene15Ui: Array<[string, string]> = [
    ["kicker", "Beyond campus"],
    ["headline line 1", "Go to class in"],
    ["headline line 2", "unexpected places."],
    ["subhead", "4,300+ students in global programs each year · 65+ countries"],
  ];
  for (const [field, value] of scene15Ui) {
    add(rows, {
      sceneOrder: 15,
      sceneName: SCENE_NAMES[15],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene15UnexpectedPlaces.tsx",
      fieldType: "copy",
    });
  }

  const scene7Ui: Array<[string, string]> = [
    ["quote footer kicker", "Golden Conversations"],
    ["ribbon suffix", "· your path"],
  ];
  for (const [field, value] of scene7Ui) {
    add(rows, {
      sceneOrder: 7,
      sceneName: SCENE_NAMES[7],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene7StudentVoice.tsx",
      fieldType: "copy",
    });
  }

  add(rows, {
    sceneOrder: 8,
    sceneName: SCENE_NAMES[8],
    section: "Scene UI",
    field: "kicker",
    variant: "default",
    value: "What does it mean?",
    sourceFile: "src/components/scenes/Scene8StatBeats.tsx",
    fieldType: "copy",
  });

  const scene9Ui: Array<[string, string]> = [
    ["kicker", "Real experiences"],
    ["headline (default)", "Not brochures."],
    ["subhead (default)", "Actual programs. Actual people."],
    ["headline (personalized)", "Picked for your path."],
    ["subhead (personalized)", "Programs matched to you."],
    ["experience CTA", "View degree on degrees.asu.edu"],
  ];
  for (const [field, value] of scene9Ui) {
    add(rows, {
      sceneOrder: 9,
      sceneName: SCENE_NAMES[9],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene9RealExperiences.tsx",
      fieldType: "copy",
    });
  }

  add(rows, {
    sceneOrder: 10,
    sceneName: SCENE_NAMES[10],
    section: "Scene UI",
    field: "helper",
    variant: "default",
    value: "More of your story is coming",
    sourceFile: "src/components/scenes/Scene10Belonging.tsx",
    fieldType: "copy",
  });

  for (const campus of CAMPUSES) {
    const overlay = CAMPUS_OVERLAYS[campus.id];
    for (const [field, value] of Object.entries(overlay.belonging)) {
      add(rows, {
        sceneOrder: 10,
        sceneName: SCENE_NAMES[10],
        section: "Campus overlay · belonging",
        field,
        variant: `campus:${campus.id}`,
        value: String(value),
        sourceFile: "src/lib/sprint4-content.ts",
        fieldType: "copy",
      });
    }
    for (const [field, value] of Object.entries(overlay.experienceOverride)) {
      add(rows, {
        sceneOrder: 9,
        sceneName: SCENE_NAMES[9],
        section: `Campus overlay · experience (replaces panel ${overlay.experienceIndex + 1})`,
        field,
        variant: `campus:${campus.id}`,
        value: String(value),
        sourceFile: "src/lib/sprint4-content.ts",
        fieldType: field === "imageSrc" ? "image" : "copy",
      });
    }
  }

  const themeHeadlines: Record<string, { headline: string; emphasis: string }> = {
    tech: { headline: "Built for", emphasis: "innovators." },
    human: { headline: "Made for", emphasis: "helpers." },
    creative: { headline: "Designed for", emphasis: "creators." },
    impact: { headline: "Ready to", emphasis: "change things." },
    venture: { headline: "Fueled by", emphasis: "ambition." },
    science: { headline: "Driven by", emphasis: "curiosity." },
    play: { headline: "Powered by", emphasis: "imagination." },
    environment: { headline: "Rooted in", emphasis: "purpose." },
    open: { headline: "Wide open", emphasis: "possibility." },
  };
  for (const interest of INTERESTS) {
    const copy = themeHeadlines[interest.theme];
    add(rows, {
      sceneOrder: 16,
      sceneName: SCENE_NAMES[16],
      section: "Snapshot theme headline",
      field: "headline",
      variant: `interest:${interest.id}`,
      value: copy.headline,
      sourceFile: "src/lib/snapshot.ts",
      fieldType: "copy",
    });
    add(rows, {
      sceneOrder: 16,
      sceneName: SCENE_NAMES[16],
      section: "Snapshot theme headline",
      field: "emphasis",
      variant: `interest:${interest.id}`,
      value: copy.emphasis,
      sourceFile: "src/lib/snapshot.ts",
      fieldType: "copy",
    });
  }

  const scene16Ui: Array<[string, string]> = [
    ["kicker (personalized)", "This is your path"],
    ["headline (personalized)", "Your Future Snapshot"],
    ["kicker (default)", "Your snapshot"],
    ["headline (default)", "Keep exploring"],
    ["helper", "Make your choices above to unlock your full snapshot"],
    ["share CTA", "Share my snapshot"],
    ["share success", "Shared ✓"],
    ["copy success", "Copied to clipboard ✓"],
    ["share error", "Could not share — try again"],
    ["share helper", "Send it to a friend, a parent, or save it for later"],
    ["card label", "{year} · Future Snapshot"],
    ["card section", "On your radar"],
    ["card tag", "#FutureSunDevil"],
  ];
  for (const [field, value] of scene16Ui) {
    add(rows, {
      sceneOrder: 16,
      sceneName: SCENE_NAMES[16],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene16FutureSnapshot.tsx",
      fieldType: "copy",
    });
  }

  const visitVariants: Array<{ variant: string; campusId: CampusId | null; campusLabel?: string }> = [
    { variant: "campus-specific", campusId: "tempe", campusLabel: "Tempe" },
    { variant: "online", campusId: "online" },
    { variant: "undecided", campusId: null },
  ];
  for (const item of visitVariants) {
    const visit = getVisitContent(item.campusId, item.campusLabel);
    for (const [field, value] of Object.entries(visit)) {
      if (field === "href") continue;
      add(rows, {
        sceneOrder: 17,
        sceneName: SCENE_NAMES[17],
        section: "Visit CTA",
        field,
        variant: item.variant,
        value: String(value),
        sourceFile: "src/lib/sprint7-content.ts",
        fieldType: "copy",
      });
    }
  }

  const scene18Ui: Array<[string, string]> = [
    ["kicker", "When you're ready"],
    ["headline line 1", "The door is open."],
    ["headline line 2", "No pressure. Just possibility."],
    ["tile CTA", "Explore →"],
  ];
  for (const [field, value] of scene18Ui) {
    add(rows, {
      sceneOrder: 18,
      sceneName: SCENE_NAMES[18],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene18NextStep.tsx",
      fieldType: "copy",
    });
  }

  for (const [field, value] of Object.entries(SENDOFF)) {
    add(rows, {
      sceneOrder: 19,
      sceneName: SCENE_NAMES[19],
      section: "Sendoff",
      field,
      variant: "default",
      value,
      sourceFile: "src/lib/sprint7-content.ts",
      fieldType: "copy",
    });
  }

  const scene19Ui: Array<[string, string]> = [
    ["primary CTA", "Apply to ASU"],
    ["secondary CTA", "Start over"],
  ];
  for (const [field, value] of scene19Ui) {
    add(rows, {
      sceneOrder: 19,
      sceneName: SCENE_NAMES[19],
      section: "Scene UI",
      field,
      variant: "default",
      value,
      sourceFile: "src/components/scenes/Scene19Sendoff.tsx",
      fieldType: "copy",
    });
  }

  return rows.sort((a, b) => {
    if (a.topicOrder !== b.topicOrder) return a.topicOrder - b.topicOrder;
    if (a.sceneOrder !== b.sceneOrder) return a.sceneOrder - b.sceneOrder;
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.field.localeCompare(b.field);
  });
}

export function entriesToCsv(
  entries: ContentEntry[],
  edits: Record<string, string>,
  options?: { blankProposedWhenUnchanged?: boolean },
): string {
  const blankProposed = options?.blankProposedWhenUnchanged ?? false;
  const header = [
    "Topic",
    "Content block",
    "Scene",
    "Scene name",
    "Current copy",
    "Proposed copy",
    "Notes",
    "Status",
    "Source file",
    "Field ID",
    "Variant",
  ];
  const lines = [header.join(",")];

  for (const entry of entries) {
    const proposed = edits[entry.id] ?? entry.value;
    const isChanged = proposed !== entry.value;
    const proposedCell = blankProposed && !isChanged ? "" : isChanged ? proposed : blankProposed ? "" : proposed;
    const status = isChanged ? "changed" : "unchanged";
    const row = [
      entry.topic,
      entry.contentBlock,
      entry.sceneOrder,
      entry.sceneName,
      entry.value,
      proposedCell,
      "",
      status,
      entry.sourceFile,
      entry.id,
      entry.variant,
    ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`);
    lines.push(row.join(","));
  }

  return lines.join("\n");
}

export function getTopicOptions(
  entries: ContentEntry[],
): Array<{ topic: string; topicOrder: number; count: number }> {
  const map = new Map<string, { topicOrder: number; count: number }>();
  for (const entry of entries) {
    const existing = map.get(entry.topic);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(entry.topic, { topicOrder: entry.topicOrder, count: 1 });
    }
  }
  return [...map.entries()]
    .sort(([, a], [, b]) => a.topicOrder - b.topicOrder)
    .map(([topic, { topicOrder, count }]) => ({ topic, topicOrder, count }));
}

export function getSceneOptions(entries: ContentEntry[]): Array<{ order: number; name: string; count: number }> {
  const map = new Map<number, { name: string; count: number }>();
  for (const entry of entries) {
    const existing = map.get(entry.sceneOrder);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(entry.sceneOrder, { name: entry.sceneName, count: 1 });
    }
  }
  return [...map.entries()]
    .sort(([a], [b]) => a - b)
    .map(([order, { name, count }]) => ({ order, name, count }));
}

export function getVariantLabel(variant: string): string {
  if (variant === "default") return "Default";
  if (variant.startsWith("interest:")) return `Interest · ${variant.replace("interest:", "")}`;
  if (variant.startsWith("learning:")) return `Learning · ${variant.replace("learning:", "")}`;
  if (variant.startsWith("campus:")) return `Campus · ${variant.replace("campus:", "")}`;
  return variant;
}
