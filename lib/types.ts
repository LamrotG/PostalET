export type PlaceType = string;

export interface Place {
  id: string;
  name: string;
  full_name: string;
  region: string;
  zone: string | null;
  place_type: PlaceType;
  slug: string;
  search_text: string;
  latitude: number | null;
  longitude: number | null;
}

export interface PostalCodeClaim {
  id: string;
  place_id: string;
  postal_code: string;
  source_name: string;
  source_url: string | null;
  source_tier: "official" | "aggregator" | "community" | "unknown";
  source_independence: "primary" | "secondary" | "derivative";
  verified_at: string | null;
  notes: string | null;
}

export type ConfidenceLevel = "high" | "medium" | "low" | "unverified";

export interface PlaceWithClaims extends Place {
  postal_code_claims: PostalCodeClaim[];
}

export interface ResolvedPostalCode {
  postal_code: string | null;
  confidence: ConfidenceLevel;
  claim_count: number;
  sources: string[];
}
