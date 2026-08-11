#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

function parseCsv(content) {
  const rows = [];
  let cur = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === '"') {
      if (inQuotes && content[i + 1] === '"') {
        cur += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (cur.length > 0 || row.length > 0) {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
      }
      // skip consecutive CR/LF
      while (content[i + 1] === '\n' || content[i + 1] === '\r') i++;
      continue;
    }
    if (!inQuotes && ch === ',') {
      row.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

function readCsvFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const rows = parseCsv(content);
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim());
  const data = rows.slice(1).map((r, idx) => {
    const obj = {};
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = r[i] !== undefined ? r[i] : "";
    }
    return obj;
  });
  return data;
}

function validateAndMerge(places, claims) {
  const placesById = new Map();
  for (const p of places) {
    if (!p.place_id) throw new Error("place missing place_id: " + JSON.stringify(p));
    placesById.set(p.place_id, Object.assign({}, p, { postal_code_claims: [] }));
  }

  const errors = [];
  for (const c of claims) {
    if (!c.place_id) {
      errors.push(`claim missing place_id: ${JSON.stringify(c)}`);
      continue;
    }
    const place = placesById.get(c.place_id);
    if (!place) {
      errors.push(`claim references unknown place_id ${c.place_id}`);
      continue;
    }
    place.postal_code_claims.push(c);
  }

  if (errors.length > 0) {
    console.error("Validation errors:");
    for (const e of errors) console.error(" - ", e);
    throw new Error("Data validation failed. Fix CSVs and re-run the script.");
  }

  const output = [...placesById.values()].map((p) => {
    // normalize some fields
    return {
      id: p.place_id,
      name: p.name || "",
      full_name: p.full_name || "",
      region: p.region || "",
      zone: p.zone || "",
      place_type: p.place_type || "",
      slug: p.slug || "",
      search_text: p.search_text || "",
      postal_code_claims: p.postal_code_claims.map((c) => ({
        id: c.id || null,
        place_id: c.place_id,
        postal_code: c.postal_code || null,
        source_name: c.source_name || null,
        source_url: c.source_url || null,
        source_tier: c.source_tier || null,
        source_independence: c.source_independence || null,
        verified_at: c.verified_at || null,
        notes: c.notes || null,
      })),
    };
  });

  return output;
}

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const placesPath = path.join(repoRoot, "places.csv");
  const claimsPath = path.join(repoRoot, "postalcode.csv");

  if (!fs.existsSync(placesPath)) {
    console.error("places.csv not found at repo root");
    process.exit(1);
  }
  if (!fs.existsSync(claimsPath)) {
    console.error("postalcode.csv not found at repo root");
    process.exit(1);
  }

  const places = readCsvFile(placesPath);
  const claims = readCsvFile(claimsPath);

  const merged = validateAndMerge(places, claims);

  const outDir = path.join(repoRoot, "public");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const outPath = path.join(outDir, "postal.json");
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf8");
  console.log(`Wrote ${merged.length} place records to ${outPath}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
