import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import { buildContentMatrix, getTopicOptions, type ContentEntry } from "../src/lib/content-matrix";

const outDir = join(process.cwd(), "content");
const xlsxPath = join(outDir, "content-matrix.xlsx");
const csvPath = join(outDir, "content-matrix.csv");

const SHEET_COLUMNS = [
  "Content block",
  "Scene",
  "Scene name",
  "Current copy",
  "Proposed copy",
  "Notes",
  "Source file",
  "Field ID",
] as const;

const TOPIC_DESCRIPTIONS: Record<string, string> = {
  "Shared · Opening": "Scenes 1–2 — first impression copy",
  "Shared · Interest selection": "Scene 3 — interest cards and choice UI",
  "Shared · Default path (no interest selected)":
    "Fallback copy before someone picks an interest",
  "Shared · Learning style selection": "Scene 11 — how you learn tiles and UI",
  "Shared · Campus selection": "Scene 12 — campus cards and choice UI",
  "Shared · Place & setting": "Arizona stats, global places, default campus immersion",
  "Shared · Visit & picture yourself": "Scene 17 — tour and visit CTAs",
  "Shared · Closing & next steps": "Snapshot, connection paths, sendoff",
};

function entryToRow(entry: ContentEntry): string[] {
  return [
    entry.contentBlock,
    String(entry.sceneOrder),
    entry.sceneName,
    entry.value,
    "",
    "",
    entry.sourceFile,
    entry.id,
  ];
}

function toSheetName(topic: string, used: Set<string>): string {
  let name = topic
    .replace(/·/g, "-")
    .replace(/[:\\/?*[\]]/g, "")
    .trim();
  if (name.length > 31) name = name.slice(0, 31).trim();

  let candidate = name;
  let suffix = 2;
  while (used.has(candidate)) {
    const base = name.slice(0, Math.max(1, 31 - String(suffix).length - 1));
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  used.add(candidate);
  return candidate;
}

function buildWorkbook(entries: ContentEntry[]): XLSX.WorkBook {
  const workbook = XLSX.utils.book_new();
  const usedSheetNames = new Set<string>();
  const topicOptions = getTopicOptions(entries);

  const indexRows: string[][] = [
    ["Topic", "Tab name", "Fields", "What's in this tab"],
  ];

  for (const { topic, count } of topicOptions) {
    const topicEntries = entries.filter((entry) => entry.topic === topic);
    const sheetName = toSheetName(topic, usedSheetNames);
    const description =
      TOPIC_DESCRIPTIONS[topic] ??
      (topic.startsWith("Path ·")
        ? "All personalized copy for this interest path"
        : topic.startsWith("Learning style ·")
          ? "Overlays that change stats, voice, or belonging"
          : topic.startsWith("Campus ·")
            ? "Campus card, immersion scene, and overlays"
            : "");

    indexRows.push([topic, sheetName, String(count), description]);

    const rows = [SHEET_COLUMNS.slice(), ...topicEntries.map(entryToRow)];
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    sheet["!cols"] = [
      { wch: 36 },
      { wch: 8 },
      { wch: 22 },
      { wch: 64 },
      { wch: 64 },
      { wch: 28 },
      { wch: 42 },
      { wch: 36 },
    ];
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  }

  const indexSheet = XLSX.utils.aoa_to_sheet(indexRows);
  indexSheet["!cols"] = [{ wch: 42 }, { wch: 28 }, { wch: 10 }, { wch: 52 }];
  workbook.SheetNames.unshift("Start here");
  workbook.Sheets["Start here"] = indexSheet;

  return workbook;
}

function buildCombinedCsv(entries: ContentEntry[]): string {
  const header = ["Topic", ...SHEET_COLUMNS];
  const lines = [header.join(",")];

  for (const entry of entries) {
    const row = [entry.topic, ...entryToRow(entry)].map((cell) =>
      `"${String(cell).replace(/"/g, '""')}"`,
    );
    lines.push(row.join(","));
  }

  return lines.join("\n");
}

mkdirSync(outDir, { recursive: true });

const entries = buildContentMatrix();
const workbook = buildWorkbook(entries);

XLSX.writeFile(workbook, xlsxPath);
writeFileSync(csvPath, buildCombinedCsv(entries), "utf8");

const publicDir = join(process.cwd(), "public");
mkdirSync(publicDir, { recursive: true });
XLSX.writeFile(workbook, join(publicDir, "content-matrix.xlsx"));

console.log(`Wrote ${getTopicOptions(entries).length} tabs to ${xlsxPath}`);
console.log(`Wrote ${entries.length} rows to ${csvPath} (combined backup)`);
console.log(`Published download copy to public/content-matrix.xlsx`);
