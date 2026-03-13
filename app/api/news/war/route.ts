import { NextResponse } from "next/server"
import { fetchWarNews } from "@/lib/news-service"

export async function GET() {
  try {
    const articles = await fetchWarNews()

    return NextResponse.json({
      success: true,
      data: articles,
      meta: {
        total: articles.length,
        keywords: ["war", "conflict", "military", "invasion", "defense"],
      },
    })
  } catch (error) {
    console.error("[API] Error fetching war news:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch war news",
      },
      { status: 500 }
    )
  }
}
