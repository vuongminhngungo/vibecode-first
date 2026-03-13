"use client"

import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ExternalLink, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { NewsArticle } from "@/lib/types"

interface NewsCardProps {
  article: NewsArticle
  variant?: "default" | "compact" | "featured"
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const categoryColors: Record<string, string> = {
    world: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    war: "bg-red-500/10 text-red-500 border-red-500/20",
    conflict: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    military: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  }

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.id}`}>
        <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
          <CardContent className="flex gap-4 p-4">
            {article.urlToImage && (
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-between">
              <h3 className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{article.source.name}</span>
                <span className="text-border">|</span>
                <span>{format(new Date(article.publishedAt), "MMM d")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <Link href={`/article/${article.id}`}>
        <Card className="group relative overflow-hidden">
          {article.urlToImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {article.category && (
              <Badge 
                variant="outline" 
                className={`mb-3 ${categoryColors[article.category] || ""}`}
              >
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </Badge>
            )}
            <h2 className="mb-2 line-clamp-2 text-xl font-bold text-white md:text-2xl">
              {article.title}
            </h2>
            <p className="line-clamp-2 text-sm text-white/80">
              {article.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(article.publishedAt), "MMMM d, yyyy")}
              </span>
              <span>{article.source.name}</span>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/article/${article.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
        {article.urlToImage && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-4">
          {article.category && (
            <Badge 
              variant="outline" 
              className={`mb-2 ${categoryColors[article.category] || ""}`}
            >
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Badge>
          )}
          <h3 className="mb-2 line-clamp-2 font-semibold leading-tight group-hover:text-primary">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {article.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {article.author && (
              <>
                <User className="h-3.5 w-3.5" />
                <span className="max-w-[100px] truncate">{article.author}</span>
                <span className="text-border">|</span>
              </>
            )}
            <span>{article.source.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {format(new Date(article.publishedAt), "MMM d")}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
