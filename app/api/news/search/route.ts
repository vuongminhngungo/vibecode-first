import { NextRequest, NextResponse } from "next/server"
import { fetchNews } from "@/lib/news-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query is required",
        },
        { status: 400 }
      )
    }

    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10)
    const page = parseInt(searchParams.get("page") || "1", 10)

    const articles = await fetchNews({
      query,
      pageSize,
      page,
    })

    return NextResponse.json({
      success: true,
      data: articles,
      meta: {
        query,
        total: articles.length,
        page,
        pageSize,
      },
    })
  } catch (error) {
    console.error("[API] Error searching news:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search news",
      },
      { status: 500 }
    )
  }
}
