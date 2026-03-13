import type { NewsArticle } from "./types"

interface CacheEntry {
  data: NewsArticle[]
  timestamp: number
}

// In-memory cache (for serverless, consider using Redis/Upstash for persistence)
const cache = new Map<string, CacheEntry>()

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000

export function getCachedNews(key: string): NewsArticle[] | null {
  const entry = cache.get(key)
  
  if (!entry) {
    return null
  }
  
  const now = Date.now()
  if (now - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  
  return entry.data
}

export function setCachedNews(key: string, data: NewsArticle[]): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export function clearCache(): void {
  cache.clear()
}

export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  }
}
