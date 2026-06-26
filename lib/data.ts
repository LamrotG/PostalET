import { supabase } from "@/lib/supabase";
import type {
  Place,
  PlaceWithClaims,
  PostalCodeClaim,
  ResolvedPostalCode,
  ConfidenceLevel,
} from "@/lib/types";

export async function searchPlaces(query: string): Promise<Place[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const isPostalCode = /^\d+$/.test(trimmed);

  if (isPostalCode) {
    const { data: claims } = await supabase
      .from("postal_code_claims")
      .select("place_id")
      .ilike("postal_code", `${trimmed}%`);

    if (!claims || claims.length === 0) return [];

    const placeIds = [...new Set(claims.map((c) => c.place_id))];
    const { data: places } = await supabase
      .from("places")
      .select("*")
      .in("id", placeIds)
      .order("name")
      .limit(20);

    return places ?? [];
  }

  const { data } = await supabase
    .from("places")
    .select("*")
    .ilike("search_text", `%${trimmed}%`)
    .order("name")
    .limit(20);

  return data ?? [];
}

export async function getPlaceBySlug(
  slug: string,
): Promise<PlaceWithClaims | null> {
  const { data: place } = await supabase
    .from("places")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!place) return null;

  const { data: claims } = await supabase
    .from("postal_code_claims")
    .select("*")
    .eq("place_id", place.id)
    .order("source_tier");

  return {
    ...place,
    postal_code_claims: claims ?? [],
  };
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
];

export async function getPopularPlaces(): Promise<Place[]> {
  const { data } = await supabase
    .from("places")
    .select("*")
    .in("name", POPULAR_PLACE_NAMES)
    .order("name")
    .limit(12);

  return data ?? [];
}

export async function getPlacesByRegion(region: string): Promise<Place[]> {
  const { data } = await supabase
    .from("places")
    .select("*")
    .eq("region", region)
    .order("name");

  return data ?? [];
}

export async function getRegions(): Promise<string[]> {
  const { data } = await supabase
    .from("places")
    .select("region")
    .order("region");

  if (!data) return [];

  return [...new Set(data.map((row) => row.region))];
}

export async function getRelatedPlaces(place: Place): Promise<Place[]> {
  const { data } = await supabase
    .from("places")
    .select("*")
    .eq("region", place.region)
    .neq("id", place.id)
    .order("name")
    .limit(6);

  return data ?? [];
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
