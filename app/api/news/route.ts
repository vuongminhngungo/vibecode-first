import { NextRequest, NextResponse } from "next/server"
import { fetchNews } from "@/lib/news-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category") || "general"
    const query = searchParams.get("q") || undefined
    const country = searchParams.get("country") || "us"
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10)
    const page = parseInt(searchParams.get("page") || "1", 10)

    const articles = await fetchNews({
      category,
      query,
      country,
      pageSize,
      page,
    })

    return NextResponse.json({
      success: true,
      data: articles,
      meta: {
        total: articles.length,
        page,
        pageSize,
      },
    })
  } catch (error) {
    console.error("[API] Error fetching news:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
      },
      { status: 500 }
    )
  }
}
