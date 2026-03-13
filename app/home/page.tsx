"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { NewsCard } from "@/components/news-card"
import { CategoryFilter } from "@/components/category-filter"
import { StatsCards } from "@/components/stats-cards"
import { WorldMap } from "@/components/world-map"
import { mockArticles, conflictRegions, filterArticlesByCategory, searchArticles } from "@/lib/mock-data"
import type { NewsCategory } from "@/lib/types"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all")

  const filteredArticles = useMemo(() => {
    let articles = filterArticlesByCategory(mockArticles, activeCategory)
    articles = searchArticles(articles, searchQuery)
    return articles
  }, [activeCategory, searchQuery])

  const conflictArticles = mockArticles.filter(
    (a) => a.category === "war" || a.category === "conflict" || a.category === "military"
  )

  const featuredArticle = filteredArticles[0]
  const remainingArticles = filteredArticles.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="px-4 py-6 lg:px-8">
        {/* Stats */}
        <StatsCards
          totalArticles={mockArticles.length}
          conflictArticles={conflictArticles.length}
          lastUpdated="2 min ago"
          trendingTopics={conflictRegions.length}
        />

        {/* Category Filter */}
        <div className="mt-8">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-medium text-foreground">{filteredArticles.length}</span> results for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Featured Article */}
        {featuredArticle && !searchQuery && (
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold">Featured Story</h2>
            <NewsCard article={featuredArticle} variant="featured" />
          </div>
        )}

        {/* News Grid */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {searchQuery ? "Search Results" : "Latest Headlines"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredArticles.length} articles
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(searchQuery ? filteredArticles : remainingArticles).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
              <p className="text-lg font-medium">No articles found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* World Map Section */}
        <div id="map" className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Active Conflict Regions</h2>
          <WorldMap regions={conflictRegions} />
        </div>
      </div>
    </div>
  )
}
