# ASU Production Images

Drop production assets here matching paths in `src/lib/media.ts`. Components load local paths first and fall back to Unsplash placeholders when a file is missing.

## Brand (`brand/`)

| File | Used in |
|------|---------|
| `asu-logo.svg` | Opening header, sendoff, persistent brand mark (preferred) |
| `asu-logo.png` | Same — used if SVG is missing |

Drop the official ASU logo at `public/images/brand/asu-logo.svg`. Until then, the app shows a maroon/gold **ASU** wordmark text fallback.

## Scenes (`scenes/`)

| File | Used in |
|------|---------|
| `opening.jpg` | Scene 1 (optional — currently uses video fallback) |
| `campus-life.jpg` | Scene 2 (optional — currently uses video fallback) |
| `campus-visit.jpg` | Scene 17 — Picture Yourself |
| `sun-devil-welcome.jpg` | Scene 19 — Sendoff |

## Campuses (`campuses/`)

Used in **Scene 10 (You belong)** and **Scene 17 (See [campus] for yourself)** when a campus is selected.

| File | Campus |
|------|--------|
| `tempe.jpg` | Tempe |
| `downtown.jpg` | Downtown Phoenix |
| `polytechnic.jpg` | Polytechnic |
| `west-valley.jpg` | West Valley |
| `online.jpg` | ASU Online |
| `all-campuses.jpg` | Undecided / general |

## Campus immersion (`campus-immersion/`)

Used in **Scene 13** (Energy / Community / etc. — the pinned campus section after you pick a campus).

| File | Campus background |
|------|-------------------|
| `tempe.jpg` | Tempe wide shot |
| `downtown.jpg` | Downtown wide shot |
| `polytechnic.jpg` | Polytechnic wide shot |
| `west-valley.jpg` | West Valley wide shot |
| `online.jpg` | ASU Online |
| `undecided.jpg` | Undecided |

| File | Student portrait (right side) |
|------|-----------------------------|
| `tempe-student.jpg` | Tempe |
| `downtown-student.jpg` | Downtown |
| `polytechnic-student.jpg` | Polytechnic |
| `west-valley-student.jpg` | West Valley |
| `online-student.jpg` | ASU Online |
| `undecided-student.jpg` | Undecided |

Recommended: 2400px wide, JPG or WebP, optimized for web.
