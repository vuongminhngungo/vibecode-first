import { NextRequest, NextResponse } from "next/server"
import { mockArticles } from "@/lib/mock-data"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = mockArticles.find((a) => a.id === id)

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error("[API] Error fetching article:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch article",
      },
      { status: 500 }
    )
  }
}
