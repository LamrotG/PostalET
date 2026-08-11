#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const filePath = path.join(repoRoot, 'postalcode.csv');
if (!fs.existsSync(filePath)) {
  console.error('postalcode.csv not found');
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);
if (lines.length === 0) {
  console.error('postalcode.csv is empty');
  process.exit(1);
}

const out = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  // remove first column up to first comma
  const firstComma = line.indexOf(',');
  if (firstComma === -1) continue;
  const rest = line.slice(firstComma + 1);
  // For header line where first column might be 'id', replace header accordingly
  if (i === 0) {
    // header: id,place_id,postal_code,... -> place_id,postal_code,...
    out.push(rest);
  } else {
    out.push(rest);
  }
}

fs.writeFileSync(filePath, out.join('\n'));
console.log('Removed first column from postalcode.csv');
