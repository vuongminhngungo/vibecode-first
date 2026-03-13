"use client"

import { useState, useMemo } from "react"
import { format, isToday, isYesterday, startOfDay } from "date-fns"
import { Header } from "@/components/header"
import { TimelineItem } from "@/components/timeline-item"
import { CategoryFilter } from "@/components/category-filter"
import { mockArticles, filterArticlesByCategory, searchArticles } from "@/lib/mock-data"
import type { NewsCategory } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export default function TimelinePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all")

  const filteredArticles = useMemo(() => {
    let articles = filterArticlesByCategory(mockArticles, activeCategory)
    articles = searchArticles(articles, searchQuery)
    // Sort by date descending
    return articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }, [activeCategory, searchQuery])

  // Group articles by date
  const groupedArticles = useMemo(() => {
    const groups: Record<string, typeof filteredArticles> = {}
    
    filteredArticles.forEach((article) => {
      const date = startOfDay(new Date(article.publishedAt)).toISOString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(article)
    })

    return Object.entries(groups).map(([date, articles]) => ({
      date,
      articles,
    }))
  }, [filteredArticles])

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isToday(date)) return "Today"
    if (isYesterday(date)) return "Yesterday"
    return format(date, "EEEE, MMMM d, yyyy")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="px-4 py-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">Event Timeline</h1>
          <p className="mt-1 text-muted-foreground">
            Follow global events as they unfold in chronological order
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-medium text-foreground">{filteredArticles.length}</span> results for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Timeline */}
        {groupedArticles.length > 0 ? (
          <div className="space-y-8">
            {groupedArticles.map(({ date, articles }) => (
              <div key={date}>
                {/* Date Header */}
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="secondary" className="text-sm font-medium">
                    {getDateLabel(date)}
                  </Badge>
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm text-muted-foreground">
                    {articles.length} {articles.length === 1 ? "event" : "events"}
                  </span>
                </div>

                {/* Timeline Items */}
                <div className="ml-4">
                  {articles.map((article, index) => (
                    <TimelineItem
                      key={article.id}
                      article={article}
                      isLast={index === articles.length - 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <p className="text-lg font-medium">No events found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
