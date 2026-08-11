/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const placesPath = path.join(repoRoot, 'places.csv');
const claimsPath = path.join(repoRoot, 'postalcode.csv');

if (!fs.existsSync(placesPath) || !fs.existsSync(claimsPath)) {
  console.error('places.csv or postalcode.csv missing');
  process.exit(1);
}

function parseFirstColumnSet(csvPath, colName) {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(',').map(h=>h.trim());
  const idx = header.indexOf(colName);
  if (idx === -1) return null;
  const set = new Set();
  for (let i=1;i<lines.length;i++){
    const parts = lines[i].split(',');
    const val = parts[idx] ? parts[idx].trim() : '';
    if (val) set.add(val);
  }
  return set;
}

const placeIds = parseFirstColumnSet(placesPath, 'place_id');
if (!placeIds) {
  console.error('places.csv does not include `place_id` header');
  process.exit(1);
}

// read all place_id values from postalcode.csv (now first column is place_id)
const claimsContent = fs.readFileSync(claimsPath,'utf8');
const claimLines = claimsContent.split(/\r?\n/).filter(Boolean);
const claimHeader = claimLines[0].split(',').map(h=>h.trim());
const claimIdx = claimHeader.indexOf('place_id');
if (claimIdx === -1) {
  console.error('postalcode.csv does not include place_id header');
  process.exit(1);
}

const missing = new Set();
const present = new Set();
for (let i=1;i<claimLines.length;i++){
  const parts = claimLines[i].split(',');
  const pid = parts[claimIdx] ? parts[claimIdx].trim() : '';
  if (!pid) continue;
  if (!placeIds.has(pid)) missing.add(pid);
  else present.add(pid);
}

console.log('place ids in postalcode.csv:', present.size);
console.log('missing place_ids referenced:', missing.size);
if (missing.size>0) {
  for (const m of missing) console.log(' -', m);
}
