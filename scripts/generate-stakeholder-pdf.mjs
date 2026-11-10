import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = join(__dirname, "../content/Project-MyFuture-Scene-Flow-Guide.pdf");

const MAROON = "#8C1D40";
const GOLD = "#FFC627";
const CHARCOAL = "#1A1A1A";
const MUTED = "#555555";

mkdirSync(dirname(output), { recursive: true });

const doc = new PDFDocument({ size: "LETTER", margins: { top: 54, bottom: 54, left: 54, right: 54 } });
const stream = createWriteStream(output);
doc.pipe(stream);

function heading(text, size = 18) {
  doc.moveDown(0.6);
  doc.font("Helvetica-Bold").fontSize(size).fillColor(MAROON).text(text, { width: 504 });
  doc.moveDown(0.25);
}

function subheading(text) {
  doc.moveDown(0.35);
  doc.font("Helvetica-Bold").fontSize(12).fillColor(CHARCOAL).text(text, { width: 504 });
  doc.moveDown(0.15);
}

function body(text) {
  doc.font("Helvetica").fontSize(10.5).fillColor(CHARCOAL).text(text, {
    width: 504,
    lineGap: 3,
  });
}

function bullet(text) {
  doc.font("Helvetica").fontSize(10.5).fillColor(CHARCOAL).text(`• ${text}`, {
    width: 488,
    indent: 12,
    lineGap: 2,
  });
}

function divider() {
  doc.moveDown(0.4);
  doc.strokeColor("#E8E4DF").lineWidth(1).moveTo(54, doc.y).lineTo(558, doc.y).stroke();
  doc.moveDown(0.5);
}

// Cover
doc.font("Helvetica-Bold").fontSize(26).fillColor(MAROON).text("Project MyFuture", { width: 504 });
doc.moveDown(0.15);
doc.font("Helvetica-Bold").fontSize(16).fillColor(CHARCOAL).text("Scene Flow Guide", { width: 504 });
doc.moveDown(0.25);
doc.font("Helvetica").fontSize(11).fillColor(MUTED).text("For stakeholders · ASU undergraduate admissions experience", {
  width: 504,
});
doc.rect(54, doc.y + 8, 504, 4).fill(GOLD);
doc.moveDown(1.2);

heading("The big idea", 16);
body(
  "This is a scroll-driven admissions story, not a traditional website. Students move through cinematic chapters and make three choices that personalize what they see:",
);
doc.moveDown(0.2);
bullet("Interest — what pulls them in");
bullet("Learning style — how they learn best");
bullet("Campus — where they see themselves");
doc.moveDown(0.3);
body("Those choices shape headlines, stats, programs, imagery, and links for the rest of the journey.");

divider();

heading("One-line flow", 14);
body(
  "Inspire → choose your path → show your future → pick how & where you learn → feel the place → prove it with real students & programs → affirm belonging → recap your story → invite a visit → close with pride.",
);

divider();

heading("Act 1 — Hook & invitation", 16);

subheading("Scene 1 — Opening (includes former Scene 2 copy)");
body("Purpose: Set the emotional tone and lower the pressure.");
bullet('Opens on a cinematic hero image');
bullet('"Your future doesn\'t start with choosing a university. It starts with imagining what\'s possible."');
bullet('Campus-life copy follows in the same spot: "Some people arrive… Either way, you\'re in the right place."');
body("Stakeholder framing: Lead with possibility and reassurance, not rankings or application pressure.");

subheading("Scene 3 — What pulls you in?");
body("Purpose: First interactive moment — start personalization.");
bullet("Floating interest cards: Build things, Help people, Create, Change the world, and more");
bullet("Student must pick one to continue");
body("Stakeholder framing: This is the fork in the road. Everything after reflects their curiosity.");

divider();

heading("Act 2 — Your path takes shape", 16);

subheading("Scene 4 — Personalized mirror");
body("Confirms their interest with a full-screen transition — headline, color, and imagery shift.");

subheading("Scene 5 — Path reveal");
body("Three cinematic horizontal-scroll moments tailored to their interest. Proof of life, not a degree list.");

subheading("Scene 6 — Momentum");
body("One big emotional stat and closing line. Leaves them feeling this could be real for them.");

divider();

heading("Act 3 — Deeper personalization", 16);

subheading("Scene 11 — How do you learn best?");
body("Second choice: Hands-on, With people, On my own, Still exploring.");

subheading("Scene 12 — Where do you see yourself?");
body("Third choice: Tempe, Downtown Phoenix, Polytechnic, West Valley, ASU Online, or Not sure yet.");

divider();

heading("Act 4 — Place as character", 16);

subheading("Scene 13 — Campus immersion");
body('Cinematic campus moment — e.g. Tempe: Energy — "The heartbeat of ASU."');

subheading("Scene 14 — Arizona");
body("Landscape stats: sunny days, Sedona, Grand Canyon, national parks.");

subheading("Scene 15 — Unexpected places");
body("Horizontal scroll: Antarctica, LA, London, Bermuda, D.C. — global reach.");

divider();

heading("Act 5 — Proof & belonging", 16);

subheading("Scene 7 — Student voice");
body("Real student quote and photo — human proof.");

subheading("Scene 8 — Stat beats");
body("Three full-screen proof points; content adapts to all three choices.");

subheading("Scene 9 — Real experiences");
body("Named programs: Dreamscape Learn, Venture Devils, MIX Center, etc.");

subheading("Scene 10 — You belong");
body('Personalized "you belong here" moment before the recap.');

divider();

heading("Act 6 — Recap & soft conversion", 16);

subheading("Scene 16 — Future snapshot");
body('Shareable recap card — "Spotify Wrapped" for their ASU path.');

subheading("Scene 17 — Picture yourself");
body('"See Tempe for yourself" — soft visit CTA with real ASU tour links.');

subheading("Scene 18 — Next step");
body("Four connection tiles: visit, explore campus, browse degrees, connect with admission.");

subheading("Scene 19 — Sendoff");
body('"Thank you, Sun Devils." + #FutureSunDevil — warm brand close, not a form wall.');

divider();

heading("Scene reference", 14);
const rows = [
  ["1", "Opening", "Scroll", "Tone + campus-life copy"],
  ["3", "Interests", "Required choice", "Branches entire story"],
  ["4", "Mirror", "Scroll", "Reflects interest"],
  ["5", "Path reveal", "Scroll", "3 path moments"],
  ["6", "Momentum", "Scroll", "Hero stat"],
  ["11", "Learning style", "Choice", "Refines proof content"],
  ["12", "Campus choice", "Choice", "Campus immersion + CTAs"],
  ["13", "Campus immersion", "Scroll", "Campus cinematic"],
  ["14", "Arizona", "Scroll", "Place as character"],
  ["15", "Unexpected places", "Scroll", "Global reach"],
  ["7", "Student voice", "Scroll", "Human proof"],
  ["8", "Stat beats", "Scroll", "Credibility"],
  ["9", "Real experiences", "Scroll", "Named programs"],
  ["10", "Belonging", "Scroll", "Emotional affirmation"],
  ["16", "Future snapshot", "Share", "Personal recap"],
  ["17", "Picture yourself", "CTA", "Visit invite"],
  ["18", "Next step", "CTA", "Four connection paths"],
  ["19", "Sendoff", "Scroll", "Brand close"],
];

const colX = [54, 88, 188, 300];
const colW = [30, 94, 106, 258];
let tableY = doc.y + 4;

doc.font("Helvetica-Bold").fontSize(8.5).fillColor("#FFFFFF");
doc.rect(colX[0], tableY, 504, 18).fill(MAROON);
doc.fillColor("#FFFFFF").text("Scene", colX[0] + 4, tableY + 5, { width: colW[0] });
doc.text("Name", colX[1] + 4, tableY + 5, { width: colW[1] });
doc.text("Interaction", colX[2] + 4, tableY + 5, { width: colW[2] });
doc.text("Purpose", colX[3] + 4, tableY + 5, { width: colW[3] });
tableY += 18;

rows.forEach((row, i) => {
  const rowH = 22;
  if (tableY + rowH > 720) {
    doc.addPage();
    tableY = 54;
  }
  if (i % 2 === 0) doc.rect(colX[0], tableY, 504, rowH).fill("#FAF8F5");
  doc.font("Helvetica").fontSize(8.5).fillColor(CHARCOAL);
  doc.text(row[0], colX[0] + 4, tableY + 6, { width: colW[0] });
  doc.text(row[1], colX[1] + 4, tableY + 6, { width: colW[1] });
  doc.text(row[2], colX[2] + 4, tableY + 6, { width: colW[2] });
  doc.text(row[3], colX[3] + 4, tableY + 6, { width: colW[3] });
  tableY += rowH;
});

doc.y = tableY + 12;

divider();
heading("Demo tips", 14);
bullet("Scene 3 — first interaction; everything after reacts to this");
bullet("Scenes 11 & 12 — second and third layers of personalization");
bullet("Scene 16 — strong wow moment (shareable recap)");
bullet("Scenes 17–18 — soft conversion with real ASU links");

doc.moveDown(0.5);
body("Note: Scene 2 is no longer separate — its copy lives inside Scene 1 on the same hero image.");

doc.moveDown(1);
doc.font("Helvetica-Oblique").fontSize(9).fillColor(MUTED).text(
  "Project MyFuture · Built for ASU undergraduate admissions",
  { align: "center", width: 504 },
);

doc.end();

stream.on("finish", () => {
  console.log(`Wrote ${output}`);
});
