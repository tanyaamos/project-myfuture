# Project MyFuture

An immersive, cinematic admissions experience for Arizona State University — built for high school juniors and seniors who expect premium digital storytelling, not a traditional university website.

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **GSAP** + **ScrollTrigger**
- **Framer Motion**
- **Lenis** smooth scrolling
- **Zustand** global experience state

## Getting Started

```bash
cd ~/Projects/project-myfuture
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sprint 1 — First 60 Seconds

| Scene | Experience |
|-------|------------|
| **1 — Opening** | Fullscreen cinematic background, pinned scroll typography, scroll + progress indicators |
| **2 — Campus Life** | Warm campus energy, scroll-triggered text reveals |
| **3 — Interests** | Bright "What pulls you in?" with floating interactive cards |

Selecting an interest saves to global state (`useExperienceStore`) and persists to `localStorage` — future scenes will personalize based on `selectedInterest` and `theme`.

## Sprint 2 — Your Path Unfolds

| Scene | Experience |
|-------|------------|
| **4 — Mirror** | Full-screen personalized transition — headline, accent color, and imagery react to your interest |
| **5 — Path Reveal** | Pinned horizontal scroll through 3 cinematic moments tailored to your selection |
| **6 — Momentum** | Big stat + emotional closing beat — different for every interest |

All Sprint 2 content lives in `src/lib/personalization.ts`. Add or edit interest copy there; scenes consume it via `usePersonalizedContent()`.

## Sprint 3 — Voices, Proof & Belonging

Inspired by the 2026 ASU Viewbook — student-first storytelling, isolated stat beats, real program names, soft close.

| Scene | Experience |
|-------|------------|
| **7 — Student Voice** | Golden Conversations-style pull quote with real attribution, full-screen photo |
| **8 — Stat Beats** | Pinned scroll through 3 cinematic proof points — one number, one line, full screen |
| **9 — Real Experiences** | Alternating reveals of actual ASU programs (Dreamscape Learn, MIX Center, Venture Devils, etc.) |
| **10 — Belonging** | Chapter `03.` emotional close — personalized "you belong" beat |

Sprint 3 content lives in `src/lib/sprint3-content.ts`, keyed by interest selection.

## Sprint 4 — Second Choice Branching

Two new interactive scenes after Scene 6 reshape everything that follows.

| Scene | Experience |
|-------|------------|
| **11 — Learning Style** | "How do you learn best?" — hands-on, collaborative, independent, or still exploring |
| **12 — Campus Choice** | "Where do you see yourself?" — Tempe, Downtown, Polytechnic, West Valley, Online, or not sure |

All three choices (interest + learning + campus) merge via `getEnhancedSprint3Content()` in `src/lib/sprint4-content.ts`. Scenes 7–10 react automatically — stats, programs, imagery, and belonging copy all shift.

Profile state persists in `useExperienceStore`: `selectedInterest`, `selectedLearningStyle`, `selectedCampus`.

## Sprint 5 — Place as Character

Campus choice becomes cinematic immersion, then Arizona, then the world.

| Scene | Experience |
|-------|------------|
| **13 — Campus Immersion** | Full-screen pinned cinematic of your chosen campus — one vibe word, viewbook copy |
| **14 — Arizona** | Pinned scroll through 5 landscape stats — Sedona, Grand Canyon, 300 sunny days |
| **15 — Unexpected Places** | Horizontal scroll — Antarctica, LA, London, Bermuda, D.C. |

Content in `src/lib/sprint5-content.ts`. Placed after Scene 12, before student voices.

## Sprint 6 — Your Future Snapshot

Spotify Wrapped-style recap — the shareable peak of the experience.

| Scene | Experience |
|-------|------------|
| **16 — Future Snapshot** | Pinned scroll builds your personal card step-by-step: interest, learning style, campus, 3 programs, hero stat, quote |

Share button copies a text summary to clipboard (or uses native share on mobile). Snapshot logic in `src/lib/snapshot.ts`.

## Sprint 7 — Soft Conversion Close & Media Pipeline

Viewbook-inspired soft close — no hard sell, just open doors.

| Scene | Experience |
|-------|------------|
| **17 — Picture Yourself** | Campus-aware visit invite — "See Tempe for yourself" with real ASU links |
| **18 — Next Step** | Four immersive connection tiles — tours, virtual explore, admission contact, @FutureSunDevils |
| **19 — Sendoff** | Emotional close — "Thank you, Sun Devils." with `#FutureSunDevil` tag |

**Media pipeline:** `src/lib/media.ts` centralizes all image paths. Drop production assets into `public/images/` (see `public/images/README.md`). `MediaImage` tries local first, falls back to Unsplash automatically.

Content in `src/lib/sprint7-content.ts`. Placed after Scene 16.

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── scenes/             # Scene1Opening, Scene2CampusLife, Scene3Interests
│   ├── ui/                 # Reusable UI (VideoBackground, cards, indicators)
│   ├── layout/             # ExperienceShell
│   └── providers/          # LenisProvider
├── hooks/                  # useLenisScroll, useScrollProgress
├── lib/                    # GSAP setup, interests data, personalization hints
├── store/                  # Zustand experience store
└── types/                  # Shared TypeScript types
```

## Placeholder Media

Drop production assets into:

- `public/videos/opening-cinematic.mp4` — Scene 1 slow cinematic loop
- `public/videos/campus-energy.mp4` — Scene 2 campus movement
- `public/images/` — Scene and campus photos (see `public/images/README.md`)

Until videos/images are added, high-quality Unsplash images are used as fallbacks with Ken Burns motion.

## Brand

| Token | Value |
|-------|-------|
| Maroon | `#8C1D40` |
| Gold | `#FFC627` |
| Neutrals | Sandstone palette |
| Charcoal | `#1A1A1A` |

## Accessibility

- WCAG AA contrast on interactive elements
- Skip link, focus-visible rings, aria labels on cards and progress
- `prefers-reduced-motion` disables cinematic animations

## What's Next

The full 19-scene experience is complete. Future work could include:

- Swapping Unsplash placeholders for real ASU photography and video
- Analytics on scene completion and share events
- A/B testing connection path CTAs

Scenes read personalization from:

```tsx
import { useExperienceStore } from "@/store/experience-store";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
```

The `theme` field on each interest drives accent colors, tone, and content paths.
