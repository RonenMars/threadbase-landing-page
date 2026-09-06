import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { computePrivacyContentHash } from "./privacy-content-hash.mjs";

const metaPath = fileURLToPath(
  new URL("../content/privacy-meta.json", import.meta.url),
);

const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const nextHash = computePrivacyContentHash();

if (nextHash === meta.contentHash) {
  console.log(
    `privacy copy unchanged (hash ${nextHash.slice(0, 12)}…); nothing to do`,
  );
  process.exit(0);
}

const previousHash = meta.contentHash;
const previousDate = meta.lastUpdated;

meta.contentHash = nextHash;
// UTC, so a run between 00:00 and 03:00 IDT stamps the previous calendar day.
meta.lastUpdated = new Date().toISOString().slice(0, 10);

writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);

console.log(
  `privacy-meta.json updated: hash ${previousHash.slice(0, 12)}… → ${nextHash.slice(0, 12)}…, lastUpdated ${previousDate} → ${meta.lastUpdated}`,
);
