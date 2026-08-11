/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const enPath = path.join(repoRoot, 'public', 'data', 'en.json');
const amPath = path.join(repoRoot, 'public', 'data', 'am.json');

if (!fs.existsSync(enPath) || !fs.existsSync(amPath)) {
  console.error('Localized datasets missing; run generate-localized-data.js');
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath,'utf8'));
const am = JSON.parse(fs.readFileSync(amPath,'utf8'));

const enById = new Map(en.map(p => [p.id, p]));
const amById = new Map(am.map(p => [p.id, p]));

const missingInAm = [];
const missingInEn = [];
const mismatchedSlugs = [];
const mismatchedPostal = [];

for (const [id, p] of enById.entries()) {
  const a = amById.get(id);
  if (!a) { missingInAm.push(id); continue; }
  if (p.slug !== a.slug) mismatchedSlugs.push(id);
  const pCodes = new Set((p.postal_code_claims||[]).map(c=>String(c.postal_code||'')));
  const aCodes = new Set((a.postal_code_claims||[]).map(c=>String(c.postal_code||'')));
  for (const code of pCodes) if (!aCodes.has(code)) mismatchedPostal.push({id, code});
}

for (const [id] of amById.entries()) {
  if (!enById.has(id)) missingInEn.push(id);
}

let ok = true;
if (missingInAm.length>0) { ok=false; console.error('Missing IDs in am:', missingInAm.length); }
if (missingInEn.length>0) { ok=false; console.error('Missing IDs in en:', missingInEn.length); }
if (mismatchedSlugs.length>0) { ok=false; console.error('Mismatched slugs for IDs:', mismatchedSlugs.length); }
if (mismatchedPostal.length>0) { ok=false; console.error('Postal code mismatches count:', mismatchedPostal.length); }

if (!ok) process.exit(1);

console.log('Locale datasets validated: IDs, slugs, and postal codes match.');
