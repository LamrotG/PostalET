import { NextRequest, NextResponse } from "next/server";
import { searchPlaces } from "@/lib/data";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const lang = request.nextUrl.searchParams.get("lang") === "am" ? "am" : "en";

  if (query.trim().length < 2) {
    return NextResponse.json([]);
  }

  const places = await searchPlaces(query, lang);
  return NextResponse.json(places);
}
