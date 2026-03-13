"use client"

import { useState, useMemo } from "react"
import { AlertTriangle, Shield, Crosshair, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { NewsCard } from "@/components/news-card"
import { WorldMap } from "@/components/world-map"
import { mockArticles, conflictRegions, searchArticles } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const warKeywords = ["war", "military", "conflict", "invasion", "defense", "troops", "combat", "attack"]

type WarFilter = "all" | "war" | "conflict" | "military"

export default function WarConflictsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<WarFilter>("all")

  // Filter articles related to war/conflict/military
  const warRelatedArticles = useMemo(() => {
    let articles = mockArticles.filter(
      (article) =>
        article.category === "war" ||
        article.category === "conflict" ||
        article.category === "military" ||
        warKeywords.some(
          (keyword) =>
            article.title.toLowerCase().includes(keyword) ||
            article.description?.toLowerCase().includes(keyword) ||
            article.content?.toLowerCase().includes(keyword)
        )
    )

    if (activeFilter !== "all") {
      articles = articles.filter((article) => article.category === activeFilter)
    }

    articles = searchArticles(articles, searchQuery)
    return articles
  }, [searchQuery, activeFilter])

  const stats = [
    {
      label: "Active Conflicts",
      value: conflictRegions.filter((r) => r.severity === "high").length,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      label: "Monitored Regions",
      value: conflictRegions.length,
      icon: Crosshair,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Military Reports",
      value: mockArticles.filter((a) => a.category === "military").length,
      icon: Shield,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Total Coverage",
      value: warRelatedArticles.length,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const filters = [
    { id: "all" as WarFilter, label: "All Reports" },
    { id: "war" as WarFilter, label: "War" },
    { id: "conflict" as WarFilter, label: "Conflict" },
    { id: "military" as WarFilter, label: "Military" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="px-4 py-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">War & Conflicts</h1>
              <p className="text-muted-foreground">
                Real-time monitoring of global military conflicts and tensions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* World Map */}
        <div className="mb-8">
          <WorldMap regions={conflictRegions} />
        </div>

        {/* Keyword Tags */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Monitored Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {warKeywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="capitalize">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          <ToggleGroup
            type="single"
            value={activeFilter}
            onValueChange={(value) => value && setActiveFilter(value as WarFilter)}
          >
            {filters.map((filter) => (
              <ToggleGroupItem key={filter.id} value={filter.id} className="text-xs">
                {filter.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-medium text-foreground">{warRelatedArticles.length}</span> results for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Conflict Reports</h2>
          <span className="text-sm text-muted-foreground">
            {warRelatedArticles.length} articles
          </span>
        </div>

        {warRelatedArticles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {warRelatedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <p className="text-lg font-medium">No conflict reports found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
