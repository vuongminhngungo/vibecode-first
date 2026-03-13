"use client"

import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ExternalLink, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { NewsArticle } from "@/lib/types"

interface TimelineItemProps {
  article: NewsArticle
  isLast?: boolean
}

export function TimelineItem({ article, isLast = false }: TimelineItemProps) {
  const categoryColors: Record<string, string> = {
    world: "bg-blue-500",
    war: "bg-red-500",
    conflict: "bg-orange-500",
    military: "bg-emerald-500",
  }

  const categoryTextColors: Record<string, string> = {
    world: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    war: "bg-red-500/10 text-red-500 border-red-500/20",
    conflict: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    military: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  }

  return (
    <div className="flex gap-4">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            article.category ? categoryColors[article.category] : "bg-primary"
          }`}
        >
          <Clock className="h-5 w-5 text-white" />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-border" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isLast ? "" : "pb-8"}`}>
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={article.publishedAt}>
            {format(new Date(article.publishedAt), "MMMM d, yyyy 'at' h:mm a")}
          </time>
        </div>

        <Link href={`/article/${article.id}`}>
          <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
              {article.urlToImage && (
                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md sm:aspect-[4/3] sm:w-36">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {article.category && (
                    <Badge
                      variant="outline"
                      className={categoryTextColors[article.category] || ""}
                    >
                      {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {article.source.name}
                  </span>
                </div>
                <h3 className="mb-2 line-clamp-2 font-semibold leading-tight group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {article.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {article.author && `By ${article.author}`}
                  </span>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs" asChild>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      Original
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
