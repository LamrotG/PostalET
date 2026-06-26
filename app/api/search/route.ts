import { NextRequest, NextResponse } from "next/server";
import { searchPlaces } from "@/lib/data";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  if (query.trim().length < 2) {
    return NextResponse.json([]);
  }

  const places = await searchPlaces(query);
  return NextResponse.json(places);
}
