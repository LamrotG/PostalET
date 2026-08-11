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

const readCsvLines = (p) => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(Boolean);
const placesLines = readCsvLines(placesPath);
const placesHeader = placesLines[0].split(',').map(h=>h.trim());
const pidIdxPlaces = placesHeader.indexOf('place_id');
if (pidIdxPlaces === -1) {
  console.error('places.csv missing place_id header');
  process.exit(1);
}
const placeIds = new Set();
for (let i=1;i<placesLines.length;i++){
  const parts = placesLines[i].split(',');
  const pid = parts[pidIdxPlaces] ? parts[pidIdxPlaces].trim() : '';
  if (pid) placeIds.add(pid);
}

const claimsLines = readCsvLines(claimsPath);
const claimsHeader = claimsLines[0].split(',').map(h=>h.trim());
const pidIdxClaims = claimsHeader.indexOf('place_id');
if (pidIdxClaims === -1) {
  console.error('postalcode.csv missing place_id header');
  process.exit(1);
}

const kept = [claimsLines[0]];
let removedCount = 0;
for (let i=1;i<claimsLines.length;i++){
  const parts = claimsLines[i].split(',');
  const pid = parts[pidIdxClaims] ? parts[pidIdxClaims].trim() : '';
  if (!pid || placeIds.has(pid)) {
    kept.push(claimsLines[i]);
  } else {
    removedCount++;
  }
}

fs.writeFileSync(claimsPath, kept.join('\n'));
console.log(`Removed ${removedCount} claims referencing missing place_ids from postalcode.csv`);
