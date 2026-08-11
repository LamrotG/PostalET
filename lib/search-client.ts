import type { PlaceWithClaims } from '@/lib/types';

type Place = PlaceWithClaims;

let DATA: Place[] | null = null;
let loadedLocale: string | null = null;
let indexesBuilt = false;

const byPostalCode = new Map<string, Place[]>();
const bySlug = new Map<string, Place>();
const normalizedName = new Map<string, Place[]>();
const condensedName = new Map<string, Place[]>();

function normalize(text: string): string {
  if (!text) return "";
  try {
    // Keep Unicode letters/numbers/space; replace other punctuation with space
    return text
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
}

async function loadDataLocale(locale: string): Promise<Place[]> {
  if (DATA && loadedLocale === locale) return DATA;
  // always load per-locale data and reset indexes
  const path = `/data/${locale}.json`;
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  DATA = (await res.json()) as Place[];
  loadedLocale = locale;
  // reset indexes for new dataset
  indexesBuilt = false;
  byPostalCode.clear();
  bySlug.clear();
  normalizedName.clear();
  condensedName.clear();
  return DATA;
}

function buildIndexes(data: Place[]) {
  if (indexesBuilt) return;
  for (const place of data) {
    bySlug.set(place.slug, place);

    const n = normalize((place.search_text || place.name || place.full_name) as string);
    const bucket = normalizedName.get(n) ?? [];
    bucket.push(place);
    normalizedName.set(n, bucket);

    const condensed = n.replace(/\s+/g, "");
    const cb = condensedName.get(condensed) ?? [];
    cb.push(place);
    condensedName.set(condensed, cb);

    for (const claim of place.postal_code_claims ?? []) {
      if (!claim.postal_code) continue;
      const key = String(claim.postal_code).trim();
      const list = byPostalCode.get(key) ?? [];
      list.push(place);
      byPostalCode.set(key, list);
    }
  }
  indexesBuilt = true;
}

function exactPostalSearch(q: string): Place[] {
  const list = byPostalCode.get(q) ?? [];
  return list;
}

function tokenSearch(q: string): Place[] {
  const n = normalize(q);
  const tokens = n.split(" ").filter(Boolean);
  if (tokens.length === 0) return [];
  const matches = new Map<string, { place: Place; score: number }>();
  for (const [key, places] of normalizedName.entries()) {
    const keyTokens = key.split(" ");
    let score = 0;
    for (const t of tokens) {
      for (const kt of keyTokens) {
        if (kt === t) score += 10;
        else if (kt.startsWith(t)) score += 5;
        else if (kt.includes(t)) score += 1;
      }
    }
    if (score > 0) {
      for (const p of places) {
        const existing = matches.get(p.id);
        if (!existing) matches.set(p.id, { place: p, score });
        else existing.score += score;
      }
    }
  }

  return [...matches.values()].sort((a, b) => b.score - a.score).map((r) => r.place);
}

export async function searchPlacesClient(query: string, locale: string = 'en'): Promise<Place[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const data = await loadDataLocale(locale);
  buildIndexes(data);

  const isPostal = /^\d+$/.test(trimmed);
  if (isPostal) {
    // exact postal or prefix
    const exact = exactPostalSearch(trimmed);
    if (exact.length > 0) return exact.slice(0, 20);
    // prefix search across claims
    const results: Place[] = [];
    for (const place of data) {
      for (const claim of place.postal_code_claims ?? []) {
        if (claim.postal_code && String(claim.postal_code).startsWith(trimmed)) {
          results.push(place);
          break;
        }
      }
      if (results.length >= 20) break;
    }
    return results;
  }

  // text search
  // 1. exact name
  const n = normalize(trimmed);
  const exact = normalizedName.get(n) ?? [];
  if (exact.length > 0) return exact.slice(0, 20);

  // try condensed (no-space) exact match, e.g., 'addisababa'
  const condensedQuery = n.replace(/\s+/g, "");
  const condensedExact = condensedName.get(condensedQuery) ?? [];
  if (condensedExact.length > 0) return condensedExact.slice(0, 20);

  // 2. token search
  const tokenResults = tokenSearch(trimmed);
  return tokenResults.slice(0, 20);
}

// Levenshtein distance for small fuzzy fallback
function levenshtein(a: string, b: string) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

// Expose fuzzy search fallback for callers that want it
export async function fuzzySearchClient(query: string, locale: string = 'en'): Promise<Place[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const data = await loadDataLocale(locale);
  buildIndexes(data);
  const n = normalize(trimmed);
  const condensedQuery = n.replace(/\s+/g, "");

  const candidates: Array<{ place: Place; dist: number }> = [];
  for (const [key, places] of condensedName.entries()) {
    const d = levenshtein(condensedQuery, key);
    if (d <= 2) {
      for (const p of places) candidates.push({ place: p, dist: d });
    }
  }
  return candidates.sort((a, b) => a.dist - b.dist).map((c) => c.place).slice(0, 20);
}

const SearchClient = { searchPlacesClient, fuzzySearchClient };
export default SearchClient;
