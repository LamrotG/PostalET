export interface DataSource {
  name: string;
  shortName: string;
  url: string;
  description: string;
  tier: "primary" | "supporting";
}

export const PRIMARY_SOURCE: DataSource = {
  name: "Youbianku Ethiopia Postal Codes",
  shortName: "Youbianku",
  url: "https://en.youbianku.com/Ethiopia",
  description:
    "Comprehensive Ethiopian postal code directory organized by region, zone, and locality.",
  tier: "primary",
};

export const SUPPORTING_SOURCES: DataSource[] = [
  {
    name: "Ethiopian Postal Codes (September 2019)",
    shortName: "ET Postcodes Doc",
    url: "https://www.scribd.com/document/577572522/ET-Postcodes-Sep19-v1-230919",
    description:
      "Archived Ethiopian postal code dataset from September 2019.",
    tier: "supporting",
  },
  {
    name: "TechHabesha Postal Code Guide",
    shortName: "TechHabesha",
    url: "https://techhabesha.com/ethiopian-postal-code-zip-code/",
    description: "Ethiopian postal code reference guide.",
    tier: "supporting",
  },
  {
    name: "PostcodeBase Ethiopia",
    shortName: "PostcodeBase",
    url: "https://eth.postcodebase.com/",
    description: "Searchable Ethiopian postal code database.",
    tier: "supporting",
  },
];

export const ALL_SOURCES: DataSource[] = [PRIMARY_SOURCE, ...SUPPORTING_SOURCES];

export const UPU_SOURCE = {
  name: "Universal Postal Union (UPU)",
  description:
    "Ethiopian postal addressing format guide, defining the 4-digit postal code structure.",
};

const GENERIC_SOURCE_URLS = [
  "https://en.youbianku.com/Ethiopia",
  "https://eth.youbianku.com/Ethiopia",
  "https://www.scribd.com/document/577572522/ET-Postcodes-Sep19-v1-230919",
  "https://techhabesha.com/ethiopian-postal-code-zip-code/",
  "https://eth.postcodebase.com/",
  "https://eth.postcodebase.com",
];

export function isGenericSourceUrl(url: string): boolean {
  const normalized = url.replace(/\/+$/, "");
  return GENERIC_SOURCE_URLS.some(
    (generic) => normalized === generic.replace(/\/+$/, ""),
  );
}

export function getDirectoryUrl(url: string): string {
  const normalized = url.replace(/\/+$/, "");
  if (
    normalized === "https://en.youbianku.com/Ethiopia" ||
    normalized === "https://eth.youbianku.com/Ethiopia"
  ) {
    return `${normalized}#Ethiopia_Postcode_List`;
  }
  return url;
}
