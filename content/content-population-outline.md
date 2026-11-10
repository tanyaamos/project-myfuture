# Project MyFuture — Content population outline

Use this document to gather copy, links, and assets from stakeholders.  
**Scroll order in the live experience** is listed below. Scene 2 (Campus Life) is merged into Scene 1.

**Legend**

| Column | Meaning |
|--------|---------|
| **Required** | Must have for launch-quality experience |
| **Variant** | Repeat block for each interest / campus / learning style |
| **Asset path** | Drop file at path under `public/` (see `public/images/README.md`) |

---

## A. Global / shared

| Section | Fields to populate | Required | Notes |
|---------|-------------------|----------|-------|
| Brand | ASU logo SVG or PNG | Recommended | `public/images/brand/asu-logo.svg` |
| Progress UI | (none — auto %) | — | No copy |
| Footer actions | Apply URL, Start over behavior | Optional | Apply → admission.asu.edu |

---

## B. Scene 1 — Opening (includes campus-life lines)

| Block | Field | Example / guidance | Asset |
|-------|-------|-------------------|-------|
| Hero | Background image | Cinematic, emotional, not campus-specific | `public/images/scenes/opening.jpg` |
| Hero | Background video (optional) | Loops if present | `public/videos/opening-cinematic.mp4` |
| Opening copy | Line 1 (plain) | "Your future " | — |
| Opening copy | Line 1 (gold emphasis) | "doesn't start with choosing a university." | — |
| Opening copy | Line 2 (plain) | "It starts with imagining " | — |
| Opening copy | Line 2 (gold emphasis) | "what's possible." | — |
| Campus-life copy | Lines 1–6 | "Some people arrive…" through "you're in the right place." | — |
| UI | Scroll hint label | "Scroll to explore" | — |

---

## C. Scene 3 — Interest choice (required interaction)

| Block | Field | Required | Notes |
|-------|-------|----------|-------|
| Section | Headline | "What pulls you in?" | — |
| Section | Body (no selection) | Gate + browse degrees link | — |
| Section | Body (after selection) | Encouragement to scroll | — |
| **Per interest (×9)** | Emoji | e.g. 🚀 | — |
| | Label | e.g. "Build things" | — |
| | Internal ID | build, help, create, change-world, business, discover, games, planet, exploring | Do not change without dev |

**Interests:** Build things · Help people · Create · Change the world · Start a business · Discover · Design games · Protect the planet · Still exploring

---

## D. Default path (shown until interest is selected)

Used in Scenes 4–6 and parts of 7–10 when no interest is chosen.

### Scene 4 — Mirror

| Field | |
|-------|---|
| Preline | |
| Headline | |
| Emphasis (gold line) | |
| Subline | |
| Hero image + alt | |

### Scene 5 — Path reveal (3 panels)

| Panel | Title | Description | Image + alt | Optional link label + URL |
|-------|-------|-------------|-------------|---------------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

| UI | Kicker | e.g. "Explore paths" |
| UI | Section headline | e.g. "Three moments that could be yours." |

### Scene 6 — Momentum

| Field | |
|-------|---|
| Stat (large number) | |
| Stat label | |
| Headline | |
| Subline | |
| Background image + alt | |
| Teaser line (optional) | Points to Scenes 11–12 |

---

## E. Per-interest path (×9) — Scenes 4–6 + 7–10 base

**Repeat this block for each interest.**  
Source in product: `SPRINT3_CONTENT` + `PERSONALIZED_CONTENT` in code.

### Scene 4 — Mirror (interest)

| Field | |
|-------|---|
| Preline, headline, emphasis, subline | |
| Hero image + alt | |
| Optional image credit / feature kicker | |

### Scene 5 — Path reveal (interest)

| Kicker | Headline | 3× (title, description, image, alt, optional link) |

### Scene 6 — Momentum (interest)

| Stat, stat label, headline, subline, image, alt |

### Scene 7 — Student voice

| Quote | Name | Context line | Image + alt |

### Scene 8 — Stat beats (3 full-screen beats)

| Beat | Stat | Label | Sublabel (optional) |
|------|------|-------|---------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

| UI | Kicker | e.g. "What does it mean?" |

### Scene 9 — Real experiences (3 panels)

| Panel | Program name | Headline | Description | Image + alt |
|-------|--------------|----------|-------------|-------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

| UI | Section headline (partial personalization) | |
| UI | Degree link | Mapped from program name → degrees.asu.edu (provide program keywords if needed) |

### Scene 10 — You belong

| Chapter # | Preline | Headline | Emphasis | Subline | Image + alt |

---

## F. Learning style (Scene 11) + overlays

### Scene 11 — Cards (×4)

| Style | Emoji | Label | Tagline |
|-------|-------|-------|---------|
| Hands-on | | | |
| With people | | | |
| On my own | | | |
| Still exploring | | | |

| UI | Kicker | e.g. "Go deeper" |
| UI | Headline + subline | |
| UI | Browse degrees fallback link | |

### Learning-style overlays (affects Scenes 7, 8, 10 — not Scene 9)

**Per learning style (×4):**

| Field | Purpose |
|-------|---------|
| Suffix on student voice context | e.g. " · learns by doing" |
| One stat beat override | stat, label, sublabel |
| Belonging subline suffix | Appended to interest belonging subline |

---

## G. Campus choice (Scene 12) + overlays

### Scene 12 — Campus cards (×6)

| Campus | Label | Vibe word | Short description (card) | Card image + alt |
|--------|-------|-----------|--------------------------|------------------|
| Tempe | | | | |
| Downtown Phoenix | | | | |
| Polytechnic | | | | |
| West Valley | | | | |
| ASU Online | | | | |
| Not sure yet | | | | |

| UI | Kicker, headline, helper copy | |
| Per card | Explore campus URL | campus.asu.edu/… |
| Per card | Degrees URL | degrees.asu.edu filter |
| Per card | Plan a visit URL | visit.asu.edu/… |

### Campus overlay — Scene 13 immersion (×6)

| Campus | Label (kicker) | Vibe (gold) | Headline | Subline | Detail paragraph | Background image |
|--------|----------------|-------------|----------|---------|------------------|------------------|
| Each campus | | | | | | `public/images/campus-immersion/{campus}.jpg` |

| UI | CTA label | e.g. "Explore ASU campuses" |
| UI | CTA URL | https://campus.asu.edu/ |

**Default (no campus):** Four campuses. / One university. / overview copy / image

### Campus overlay — replaces ONE Real Experience panel (Scene 9)

| Campus | Which panel (1–3) | Program | Headline | Description | Image + alt |
|--------|-------------------|---------|----------|-------------|-------------|

### Campus overlay — Scene 10 belonging tweaks

| Campus | Preline | Headline | Emphasis | Belonging image |
|--------|---------|----------|----------|-----------------|

---

## H. Place & setting (all users)

### Scene 14 — Arizona (5 beats)

| UI | Kicker | e.g. "The Southwest" |
| UI | Section headline | |
| Beat 1–5 | Stat | Label | Sublabel |

### Scene 15 — Unexpected places (horizontal scroll)

| UI | Kicker | e.g. "Beyond campus" |
| UI | Headline + stat line | |
| Place 1–5+ | Title | Description | Image + alt | Learn more URL |

---

## I. Recap & conversion

### Scene 16 — Future snapshot

| UI | Kicker (partial vs full) | |
| UI | Headline | |
| Generated | Pulls from interest + learning + campus + programs | No manual copy unless snapshot template changes |

### Scene 17 — Picture yourself

**Variants:** specific campus · online · undecided

| Variant | Preline | Headline | Emphasis | Subline | CTA label | URL |
|---------|---------|----------|----------|---------|-----------|-----|

| Asset | Background | `public/images/campuses/{campus}.jpg` or `scenes/campus-visit.jpg` |

### Scene 18 — Next step (connection tiles)

| Tile | Label (small) | Headline | Description | CTA text | URL |
|------|---------------|----------|-------------|----------|-----|
| Visit / Experience ASU | | Walk the campus / Visit {campus} | | Schedule or Explore | visit.asu.edu or campus visit |
| Explore campus | | | | Explore | campus.asu.edu |
| College / degrees | | | | Explore | degrees.asu.edu |
| Browse degrees | | | | Explore | |
| Admission contact | | | | Explore | |
| @FutureSunDevils | | | | Explore | Instagram |

### Scene 19 — Sendoff

| Field | |
|-------|---|
| Headline | |
| Emphasis | |
| Subline | |
| Hashtag | |
| Hero image + alt | `public/images/scenes/sun-devil-welcome.jpg` |
| Apply CTA | |

---

## J. Asset checklist (summary)

| Folder | Purpose |
|--------|---------|
| `public/images/brand/` | Logo |
| `public/images/scenes/` | Opening, visit, sendoff, belonging, etc. |
| `public/images/campuses/` | Scene 10, 17 campus backgrounds |
| `public/images/campus-immersion/` | Scene 13 wide + optional student portrait |
| `public/videos/` | Optional opening / campus loop videos |

**Recommended:** 2400px wide heroes, 1600px panels, JPG/WebP, web-optimized.

---

## K. Personalization matrix (for planners)

| User choice | Affects |
|-------------|---------|
| **Interest** | Scenes 4–6, 7–10 base content, accent color, degree browse links |
| **Learning style** | Student voice context, one stat beat, belonging subline |
| **Campus** | Scene 13 immersion, one Scene 9 panel, Scene 10 belonging, Scene 17 visit copy |

---

## L. Optional: content matrix export

The repo can export a full field list to CSV/XLSX:

```bash
npm run export:content-matrix   # if script exists in package.json
```

Editor UI: `/content` route (Content Matrix Editor).

---

*Template for Project MyFuture · align with `src/lib/content-matrix.ts` scene numbering*
