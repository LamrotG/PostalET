import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://postal-et.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jsonPath = path.join(process.cwd(), "public", "postal.json");
  if (!fs.existsSync(jsonPath)) {
    return [
      { url: `${BASE_URL}/en`, changeFrequency: "weekly", priority: 1 },
      { url: `${BASE_URL}/en/about`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE_URL}/en/directory`, changeFrequency: "weekly", priority: 0.8 },
    ];
  }

  const raw = fs.readFileSync(jsonPath, "utf8");
  const places = JSON.parse(raw) as Array<{ slug: string; region?: string }>;
  const regions = [...new Set(places.map((p) => p.region))] as string[];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/en/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/en/directory`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/am`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/am/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/am/directory`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const regionPages: MetadataRoute.Sitemap = regions.flatMap((region: string) => [
    {
      url: `${BASE_URL}/en/directory/${encodeURIComponent(region)}`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/am/directory/${encodeURIComponent(region)}`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ]);

  const placePages: MetadataRoute.Sitemap = (places ?? []).flatMap((place) => [
    {
      url: `${BASE_URL}/en/place/${place.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/am/place/${place.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]);

  return [...staticPages, ...regionPages, ...placePages];
}
