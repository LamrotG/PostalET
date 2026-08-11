import fs from "fs";
import path from "path";
import type {
  Place,
  PlaceWithClaims,
  PostalCodeClaim,
  ResolvedPostalCode,
  ConfidenceLevel,
  RegionInfo,
} from "@/lib/types";

export async function searchPlaces(
  query: string,
  lang: "en" | "am" = "en",
): Promise<Place[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];
  const jsonPath = getLocaleDataPath(lang);
  if (!fs.existsSync(jsonPath)) return [];
  const raw = fs.readFileSync(jsonPath, "utf8");
  const places: Place[] = JSON.parse(raw);

  const isPostal = /^\d+$/.test(trimmed);
  if (isPostal) {
    const matches: Place[] = [];
    for (const p of places) {
      for (const c of (p as PlaceWithClaims).postal_code_claims ?? []) {
        if (c.postal_code && String(c.postal_code).startsWith(trimmed)) {
          matches.push(p);
          break;
        }
      }
      if (matches.length >= 20) break;
    }
    return matches;
  }

  const searchColumn = lang === "am" ? "search_text_am" : "search_text";
  const results: Place[] = [];
  for (const p of places) {
    const v = (searchColumn === "search_text_am" ? p.search_text_am : p.search_text) ?? p.search_text ?? p.name ?? "";
    if (v && String(v).toLowerCase().includes(trimmed)) {
      results.push(p);
    }
    if (results.length >= 20) break;
  }
  return results;
}

export async function getPlaceBySlug(
  slug: string,
  lang: "en" | "am" = "en",
): Promise<PlaceWithClaims | null> {
  try {
    const jsonPath = getLocaleDataPath(lang);
    if (!fs.existsSync(jsonPath)) return null;
    const raw = fs.readFileSync(jsonPath, "utf8");
    const places: PlaceWithClaims[] = JSON.parse(raw);
    const found = places.find((p) => p.slug === slug);
    return found ?? null;
  } catch {
    return null;
  }
}

const POPULAR_PLACE_NAMES = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Adama",
  "Gondar",
  "Hawassa",
  "Bahir Dar",
  "Jimma",
  "Dessie",
  "Harar",
  "Debre Birhan",
  "Shashamane",
  "Adigrat",
  "Adwa",
];

export async function getPopularPlaces(lang: "en" | "am" = "en"): Promise<PlaceWithClaims[]> {
  try {
    const jsonPath = getLocaleDataPath(lang);
    if (!fs.existsSync(jsonPath)) return [];
    const raw = fs.readFileSync(jsonPath, "utf8");
    const places: PlaceWithClaims[] = JSON.parse(raw);
    const filtered = places.filter((p) => POPULAR_PLACE_NAMES.includes(p.name));
    return filtered.slice(0, 14);
  } catch {
    return [];
  }
}

export async function getPlacesByRegion(
  region: string,
  lang: "en" | "am" = "en",
): Promise<PlaceWithClaims[]> {
  try {
    const jsonPath = getLocaleDataPath(lang);
    if (!fs.existsSync(jsonPath)) return [];
    const raw = fs.readFileSync(jsonPath, "utf8");
    const places: PlaceWithClaims[] = JSON.parse(raw);
    return places.filter((p) => p.region === region);
  } catch {
    return [];
  }
}

export async function getRegions(lang: "en" | "am" = "en"): Promise<RegionInfo[]> {
  try {
    const jsonPath = getLocaleDataPath(lang);
    if (!fs.existsSync(jsonPath)) return [];
    const raw = fs.readFileSync(jsonPath, "utf8");
    const places: Place[] = JSON.parse(raw);
    const seen = new Map();
    for (const p of places) {
      if (!seen.has(p.region)) seen.set(p.region, { region: p.region, region_am: null });
    }
    return [...seen.values()];
  } catch {
    return [];
  }
}

export async function getRelatedPlaces(place: Place, lang: "en" | "am" = "en"): Promise<Place[]> {
  try {
    const jsonPath = getLocaleDataPath(lang);
    if (!fs.existsSync(jsonPath)) return [];
    const raw = fs.readFileSync(jsonPath, "utf8");
    const places: Place[] = JSON.parse(raw);
    return places.filter((p) => p.region === place.region && p.id !== place.id).slice(0, 6);
  } catch {
    return [];
  }
}

function getLocaleDataPath(lang: "en" | "am"): string {
  return path.join(process.cwd(), "public", "data", `${lang}.json`);
}

export function resolvePostalCode(
  claims: PostalCodeClaim[],
): ResolvedPostalCode {
  if (claims.length === 0) {
    return {
      postal_code: null,
      confidence: "unverified",
      claim_count: 0,
      sources: [],
    };
  }

  const hasOfficial = claims.some((c) => c.source_tier === "official");
  if (hasOfficial) {
    const officialClaim = claims.find((c) => c.source_tier === "official")!;
    return {
      postal_code: officialClaim.postal_code,
      confidence: "high",
      claim_count: claims.length,
      sources: claims.map((c) => c.source_name),
    };
  }

  const postalCodes = claims.map((c) => c.postal_code);
  const allAgree = postalCodes.every((code) => code === postalCodes[0]);

  if (allAgree && claims.length >= 2) {
    return {
      postal_code: postalCodes[0],
      confidence: "medium",
      claim_count: claims.length,
      sources: claims.map((c) => c.source_name),
    };
  }

  // Single source or disagreement — low confidence, use the most common code
  const frequency = new Map<string, number>();
  for (const code of postalCodes) {
    frequency.set(code, (frequency.get(code) ?? 0) + 1);
  }
  const mostCommon = [...frequency.entries()].sort((a, b) => b[1] - a[1])[0];

  let confidence: ConfidenceLevel = "low";
  if (!allAgree) confidence = "low";

  return {
    postal_code: mostCommon[0],
    confidence,
    claim_count: claims.length,
    sources: claims.map((c) => c.source_name),
  };
}

export function getConfidenceLabel(confidence: ConfidenceLevel): string {
  const labels: Record<ConfidenceLevel, string> = {
    high: "High — verified by an official source",
    medium: "Medium — multiple sources agree",
    low: "Low — single or conflicting sources",
    unverified: "Unverified — no claims found",
  };
  return labels[confidence];
}
