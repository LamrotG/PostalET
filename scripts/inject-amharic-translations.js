/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const translationPath = path.join(repoRoot, 'AmharicTranslation.csv');
const amPath = path.join(repoRoot, 'public', 'data', 'am.json');

if (!fs.existsSync(translationPath)) {
  console.error('AmharicTranslation.csv not found at repo root');
  process.exit(1);
}

if (!fs.existsSync(amPath)) {
  console.error('public/data/am.json not found; run generate-localized-data.js first');
  process.exit(1);
}

function parseCsv(csv) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const header = lines.shift();
  if (!header) return [];
  const columns = header.split(',').map((col) => col.trim());

  return lines.map((line) => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);

    const row = {};
    for (let idx = 0; idx < columns.length; idx += 1) {
      row[columns[idx]] = values[idx] ?? '';
    }
    return row;
  });
}

const rawCsv = fs.readFileSync(translationPath, 'utf8');
const rows = parseCsv(rawCsv);
const translations = new Map();
for (const row of rows) {
  if (!row.id) continue;
  translations.set(row.id, {
    name: row.name || null,
    full_name: row.full_name || null,
    region: row.region || null,
    zone: row.zone || null,
    search_text: row.search_text || null,
  });
}

const amData = JSON.parse(fs.readFileSync(amPath, 'utf8'));
const missingTranslationIds = [];
const updated = amData.map((entry) => {
  const translation = translations.get(entry.id);
  if (!translation) {
    missingTranslationIds.push(entry.id);
    return entry;
  }

  return {
    ...entry,
    name: translation.name ?? entry.name,
    full_name: translation.full_name ?? entry.full_name,
    region: translation.region ?? entry.region,
    zone: translation.zone ?? entry.zone,
    search_text: translation.search_text ?? entry.search_text,
  };
});

fs.writeFileSync(amPath, JSON.stringify(updated, null, 2), 'utf8');

console.log(`Updated ${updated.length} Amharic entries in public/data/am.json`);
if (missingTranslationIds.length > 0) {
  console.warn(`Warning: ${missingTranslationIds.length} entries in public/data/am.json had no translation row.`);
  console.warn('Missing IDs:', missingTranslationIds.slice(0, 20).join(', '));
  process.exitCode = 0;
}
