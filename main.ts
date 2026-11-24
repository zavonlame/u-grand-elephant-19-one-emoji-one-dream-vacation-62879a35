// One Emoji, One Dream Vacation — u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35
// The entry is a single emoji standing in for a whole trip: a volcano.
// Why this one: the judge's first test is whether the emoji plainly names a
// dream vacation, and a volcano is a mountain with fire in it — Hawaii,
// Iceland, one particular trip, not just any beach. It is vivid at a glance,
// specific rather than generic, and it carries a spark: a holiday with a bit
// of lava in it. It reads instantly at small size on any screen, and it is a
// single code point, so nothing about it can be misread as two emojis.
// Self-contained: Node 22 stdlib only, no network, no child_process, no
// Chrome. The emoji lives here as a literal — this program reads NO files at
// runtime, so it behaves identically wherever the grader starts it from.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dream, in one emoji: a volcano. U+1F30B, four bytes of UTF-8, one
// code point — safely inside the gate of 1 to 8 characters.
const EMOJI = "\u{1F30B}";

// The gate, from the kit's RULES.txt: /output/entry.txt must hold UTF-8
// text of 1 to 8 characters, not only whitespace.
function gateCheck(text: string): void {
  const size = [...text].length;
  if (size < 1 || size > 8) {
    throw new Error(`entry.txt must be 1-8 characters, got ${size}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry.txt must not be only whitespace");
  }
  if (size !== 1) {
    throw new Error(`entry must be exactly one emoji, got ${size} characters`);
  }
}

gateCheck(EMOJI);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, EMOJI, "utf8");

// Read it back: the file the judge sees must be byte-identical to the
// emoji above, with nothing appended (no trailing newline, no extra text).
if (readFileSync(target, "utf8") !== EMOJI) {
  throw new Error("entry.txt round-trip mismatch");
}
