import type { Language } from "@/lib/language-context";
import type { Place } from "@/lib/types";

export interface LocalizedPlace {
  name: string;
  full_name: string;
  region: string;
  zone: string | null;
}

export function localizePlace(place: Place, lang: Language): LocalizedPlace {
  if (lang !== "am") {
    return {
      name: place.name,
      full_name: place.full_name,
      region: place.region,
      zone: place.zone,
    };
  }

  return {
    name: place.name_am || place.name,
    full_name: place.full_name_am || place.full_name,
    region: place.region_am || place.region,
    zone: place.zone_am || place.zone,
  };
}

export function localizeRegionName(
  region: string,
  region_am: string | null,
  lang: Language,
): string {
  return lang === "am" && region_am ? region_am : region;
}
