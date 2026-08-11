/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const src = path.join(repoRoot, 'public', 'postal.json');
if (!fs.existsSync(src)) {
  console.error('public/postal.json not found — run generator first');
  process.exit(1);
}

const raw = fs.readFileSync(src,'utf8');
const places = JSON.parse(raw);

const outDir = path.join(repoRoot, 'public', 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// English dataset: keep fields as-is but remove any removed fields
const en = places.map(p => ({
  ...p,
  search_text: p.search_text || '',
  postal_code_claims: p.postal_code_claims || [],
}));

// Amharic dataset: scaffold by copying English values — to be translated later
const am = en.map(p => ({
  ...p,
  // placeholder: copy English strings into Amharic dataset for now
  name: p.name,
  full_name: p.full_name,
  region: p.region,
  zone: p.zone,
  search_text: p.search_text,
}));

fs.writeFileSync(path.join(outDir, 'en.json'), JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'am.json'), JSON.stringify(am, null, 2), 'utf8');

console.log(`Wrote ${en.length} records to public/data/en.json and public/data/am.json`);
