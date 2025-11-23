import { NextRequest, NextResponse } from "next/server";
import { getJobOffersOptimized } from "@/lib/database";
import { getUser } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search") || undefined;
  const type = searchParams.get("type") || undefined;
  const contractType = searchParams.get("contract") || undefined;
  const city = searchParams.get("city") || undefined;
  const bookmarked = searchParams.get("bookmarked") === "true";

  const parsedPage = parseInt(searchParams.get("page") ?? "", 10);
  const parsedLimit = parseInt(searchParams.get("limit") ?? "", 10);
  const page =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : undefined;
  const limit =
    Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : undefined;

  try {
    const user = await getUser();

    const result = await getJobOffersOptimized({
      search,
      type,
      contractType,
      city,
      page,
      limit,
      userId: user?.id,
      bookmarkedOnly: bookmarked,
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
