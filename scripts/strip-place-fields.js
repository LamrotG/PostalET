/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const outPath = path.join(repoRoot, 'public', 'postal.json');
if (!fs.existsSync(outPath)) {
  console.error('public/postal.json not found');
  process.exit(1);
}

const raw = fs.readFileSync(outPath, 'utf8');
let data;
try { data = JSON.parse(raw); } catch (e) { console.error('invalid json'); process.exit(1); }

const drop = new Set(['latitude','longitude','name_am','full_name_am','region_am','zone_am','search_text_am']);

for (const p of data) {
  for (const k of drop) delete p[k];
  // also remove any claim-level fields with those suffixes
  if (Array.isArray(p.claims)) {
    for (const c of p.claims) {
      for (const k of drop) delete c[k];
    }
  }
}

fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log('Stripped unwanted fields from public/postal.json');
