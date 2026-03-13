import type { NewsArticle, NewsApiResponse } from "./types"
import { getCachedNews, setCachedNews } from "./news-cache"
import { mockArticles } from "./mock-data"

// NEWS API Configuration
// Supports: NewsAPI (newsapi.org) or GNews (gnews.io)
const NEWS_API_KEY = process.env.NEWS_API_KEY
const NEWS_API_BASE_URL = process.env.NEWS_API_URL || "https://newsapi.org/v2"

interface FetchNewsOptions {
  category?: string
  query?: string
  country?: string
  pageSize?: number
  page?: number
}

export async function fetchNews(options: FetchNewsOptions = {}): Promise<NewsArticle[]> {
  const {
    category = "general",
    query,
    country = "us",
    pageSize = 20,
    page = 1,
  } = options

  // Generate cache key
  const cacheKey = `news:${category}:${query || "all"}:${country}:${page}`

  // Check cache first
  const cachedData = getCachedNews(cacheKey)
  if (cachedData) {
    console.log(`[NewsService] Cache hit for: ${cacheKey}`)
    return cachedData
  }

  console.log(`[NewsService] Cache miss for: ${cacheKey}`)

  // If no API key, return mock data
  if (!NEWS_API_KEY) {
    console.log("[NewsService] No API key configured, using mock data")
    return mockArticles
  }

  try {
    // Build URL based on whether it's a search or category query
    let url: string
    
    if (query) {
      // Search everything endpoint
      url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`
    } else {
      // Top headlines endpoint
      url = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "GlobalNewsTracker/1.0",
      },
      next: {
        revalidate: 300, // Revalidate every 5 minutes
      },
    })

    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`)
    }

    const data: NewsApiResponse = await response.json()

    if (data.status !== "ok") {
      throw new Error("News API returned error status")
    }

    // Transform and add IDs to articles
    const articles: NewsArticle[] = data.articles.map((article, index) => ({
      ...article,
      id: `${category}-${page}-${index}-${Date.now()}`,
      category: mapToCategory(category, article.title, article.description),
    }))

    // Cache the results
    setCachedNews(cacheKey, articles)

    return articles
  } catch (error) {
    console.error("[NewsService] Error fetching news:", error)
    // Return mock data as fallback
    return mockArticles
  }
}

export async function fetchWarNews(): Promise<NewsArticle[]> {
  const warKeywords = ["war", "conflict", "military", "invasion", "defense"]
  
  const cacheKey = "news:war-conflicts"
  const cachedData = getCachedNews(cacheKey)
  
  if (cachedData) {
    return cachedData
  }

  if (!NEWS_API_KEY) {
    return mockArticles.filter(
      (article) =>
        article.category === "war" ||
        article.category === "conflict" ||
        article.category === "military"
    )
  }

  try {
    const query = warKeywords.join(" OR ")
    const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=50&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`

    const response = await fetch(url, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`)
    }

    const data: NewsApiResponse = await response.json()

    const articles: NewsArticle[] = data.articles.map((article, index) => ({
      ...article,
      id: `war-${index}-${Date.now()}`,
      category: determineWarCategory(article.title, article.description),
    }))

    setCachedNews(cacheKey, articles)
    return articles
  } catch (error) {
    console.error("[NewsService] Error fetching war news:", error)
    return mockArticles.filter(
      (article) =>
        article.category === "war" ||
        article.category === "conflict" ||
        article.category === "military"
    )
  }
}

function mapToCategory(
  apiCategory: string,
  title?: string,
  description?: string | null
): string {
  const text = `${title || ""} ${description || ""}`.toLowerCase()

  if (
    text.includes("war") ||
    text.includes("invasion") ||
    text.includes("attack")
  ) {
    return "war"
  }

  if (
    text.includes("conflict") ||
    text.includes("tension") ||
    text.includes("crisis")
  ) {
    return "conflict"
  }

  if (
    text.includes("military") ||
    text.includes("defense") ||
    text.includes("troops") ||
    text.includes("army")
  ) {
    return "military"
  }

  return "world"
}

function determineWarCategory(
  title?: string,
  description?: string | null
): string {
  const text = `${title || ""} ${description || ""}`.toLowerCase()

  if (text.includes("war") || text.includes("invasion")) {
    return "war"
  }

  if (
    text.includes("military") ||
    text.includes("defense") ||
    text.includes("troops")
  ) {
    return "military"
  }

  return "conflict"
}
