export interface NewsArticle {
  id: string
  title: string
  description: string | null
  content: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    id: string | null
    name: string
  }
  author: string | null
  category?: string
}

export interface NewsApiResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export type NewsCategory = "all" | "world" | "war" | "conflict" | "military"

export interface ConflictRegion {
  id: string
  name: string
  coordinates: [number, number]
  articleCount: number
  severity: "low" | "medium" | "high"
}
