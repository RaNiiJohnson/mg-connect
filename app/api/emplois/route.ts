import { NextRequest, NextResponse } from "next/server";
import { getJobOffersOptimized } from "@/lib/database";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const contractType = searchParams.get("contract") || "";
  const city = searchParams.get("city") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const result = await getJobOffersOptimized({
      search,
      type,
      contractType,
      city,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching job offers:", error);
    return NextResponse.json(
      { error: "Failed to fetch job offers" },
      { status: 500 }
    );
  }
}
