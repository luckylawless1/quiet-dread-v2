// Two Days of Quiet Dread (v2) — one code-review comment that approves
// a pull request while carrying quiet existential dread.
// The program writes the comment to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dread here is legacy: the code will outlive the people who wrote it.
// Flat approval, no exclamation — the understatement carries it.
const LINE =
  "Approved. The tests pass, the comments are polite, and the code will outlive us both.";

// Gate: exactly one line, 1–140 chars, not only whitespace.
if (
  LINE.trim().length === 0 ||
  LINE.length > 140 ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  throw new Error("entry fails the gate: must be one line of 1-140 chars");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back byte verification: what we wrote is exactly what is on disk.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
console.log(`wrote ${LINE.length} chars to ${outPath}`);
console.log(LINE);
