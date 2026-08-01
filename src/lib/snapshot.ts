import type { Interest } from "@/types/experience";
import type { CampusOption, LearningStyle } from "@/types/experience";
import type { Sprint3Content } from "@/lib/sprint3-content";
import { getProgramLink } from "@/lib/asu-links";

export interface FutureSnapshot {
  year: string;
  headline: string;
  emphasis: string;
  interest: { emoji: string; label: string };
  learningStyle: { emoji: string; label: string } | null;
  campus: { label: string; vibe: string } | null;
  programs: { name: string; headline: string; href: string }[];
  heroStat: { stat: string; label: string };
  quote: { text: string; name: string };
  themeWord: string;
  accentColor: string;
  shareText: string;
}

const THEME_HEADLINES: Record<Interest["theme"], { headline: string; emphasis: string }> = {
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

export function buildFutureSnapshot(params: {
  interest?: Interest;
  learningStyle?: LearningStyle;
  campus?: CampusOption;
  sprint3: Sprint3Content;
  accentColor: string;
  themeWord?: string;
}): FutureSnapshot {
  const { interest, learningStyle, campus, sprint3, accentColor, themeWord } = params;

  const theme = interest?.theme ?? "open";
  const copy = THEME_HEADLINES[theme];

  const programs = sprint3.experiences.map((exp) => ({
    name: exp.program,
    headline: exp.headline,
    href: getProgramLink(exp.program),
  }));

  const heroStat = sprint3.statBeats[0] ?? {
    stat: "#1",
    label: "in innovation",
  };

  const quote = {
    text: sprint3.studentVoice.quote,
    name: sprint3.studentVoice.name,
  };

  const shareLines = [
    "My ASU Future Snapshot ✨",
    "",
    interest ? `I'm drawn to: ${interest.label}` : "",
    learningStyle ? `I learn best: ${learningStyle.label}` : "",
    campus ? `Campus vibe: ${campus.label}` : "",
    "",
    "Programs on my radar:",
    ...programs.map((p) => `→ ${p.name}`),
    "",
    `${heroStat.stat} ${heroStat.label}`,
    "",
    "Explore yours → asu.edu/myfuture",
  ].filter(Boolean);

  return {
    year: new Date().getFullYear().toString(),
    headline: copy.headline,
    emphasis: copy.emphasis,
    interest: {
      emoji: interest?.emoji ?? "✨",
      label: interest?.label ?? "Still exploring",
    },
    learningStyle: learningStyle
      ? { emoji: learningStyle.emoji, label: learningStyle.label }
      : null,
    campus: campus ? { label: campus.label, vibe: campus.vibe } : null,
    programs,
    heroStat: { stat: heroStat.stat, label: heroStat.label },
    quote,
    themeWord: themeWord ?? theme,
    accentColor,
    shareText: shareLines.join("\n"),
  };
}

export async function shareSnapshot(snapshot: FutureSnapshot): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: "My ASU Future Snapshot",
        text: snapshot.shareText,
      });
      return "shared";
    } catch {
      /* user cancelled or unsupported — fall through to clipboard */
    }
  }

  try {
    await navigator.clipboard.writeText(snapshot.shareText);
    return "copied";
  } catch {
    return "failed";
  }
}
