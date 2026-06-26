import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://postal-et.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: places } = await supabase
    .from("places")
    .select("slug")
    .order("name");

  const { data: regionRows } = await supabase
    .from("places")
    .select("region")
    .order("region");

  const regions = regionRows
    ? [...new Set(regionRows.map((r) => r.region))]
    : [];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/directory`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const regionPages: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${BASE_URL}/directory/${encodeURIComponent(region)}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const placePages: MetadataRoute.Sitemap = (places ?? []).map((place) => ({
    url: `${BASE_URL}/place/${place.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...regionPages, ...placePages];
}
