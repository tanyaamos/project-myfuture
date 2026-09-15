# Content Matrix

## Use this file (recommended)

**`content-matrix.xlsx`** — one tab per topic.

1. Open in Excel or upload to Google Drive → Open with Google Sheets
2. Start on the **Start here** tab — it lists every topic and links to its tab
3. Jump to a tab like **Path - Protect the planet** to edit that path only
4. Fill **Proposed copy** and **Notes**; leave blank if no change

### Tabs

| Tab | Contents |
|-----|----------|
| **Start here** | Index of all topics |
| **Shared - Opening** | Scenes 1–2 |
| **Shared - Interest selection** | All 9 interest cards + Scene 3 UI |
| **Path - Build things** (etc.) | Mirror, stats, quote, experiences, belonging for that path |
| **Learning style - Hands-on** (etc.) | Stat/voice/belonging overlays |
| **Campus - Tempe** (etc.) | Campus card, immersion, overlays |
| **Shared - Closing & next steps** | Snapshot, sendoff, next step |

## Backup CSV

**`content-matrix.csv`** — all topics in one sheet (for dev tools). Prefer the `.xlsx` for editing.

## Regenerate from codebase

```bash
npm run content:export
```

Back up your Proposed copy first — this overwrites both files.

## Web editor

`/content` in the running app — same content, grouped by topic, with CSV export.
