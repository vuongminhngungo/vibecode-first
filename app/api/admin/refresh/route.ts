import { NextRequest, NextResponse } from "next/server"
import { clearCache, getCacheStats } from "@/lib/news-cache"
import { fetchNews, fetchWarNews } from "@/lib/news-service"

// Admin endpoint to manually refresh the news cache
// In production, you should add authentication to this endpoint

export async function POST(request: NextRequest) {
  try {
    // Optional: Check for admin API key
    const authHeader = request.headers.get("authorization")
    const adminKey = process.env.ADMIN_API_KEY

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      )
    }

    // Clear existing cache
    clearCache()

    // Prefetch common queries
    await Promise.all([
      fetchNews({ category: "general" }),
      fetchNews({ category: "world" }),
      fetchWarNews(),
    ])

    const stats = getCacheStats()

    return NextResponse.json({
      success: true,
      message: "Cache refreshed successfully",
      stats,
    })
  } catch (error) {
    console.error("[Admin] Error refreshing cache:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh cache",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const stats = getCacheStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("[Admin] Error getting cache stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get cache stats",
      },
      { status: 500 }
    )
  }
}
