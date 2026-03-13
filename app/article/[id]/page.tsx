import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, ExternalLink, Calendar, User, Building2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockArticles } from "@/lib/mock-data"
import { NewsCard } from "@/components/news-card"

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const article = mockArticles.find((a) => a.id === id)

  if (!article) {
    notFound()
  }

  const categoryColors: Record<string, string> = {
    world: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    war: "bg-red-500/10 text-red-500 border-red-500/20",
    conflict: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    military: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = mockArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </Button>
          <div className="flex-1" />
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="gap-2" asChild>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Read Original
            </a>
          </Button>
        </div>
      </header>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Hero Image */}
        {article.urlToImage && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {article.category && (
            <Badge
              variant="outline"
              className={categoryColors[article.category] || ""}
            >
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Badge>
          )}
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            {article.source.name}
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(new Date(article.publishedAt), "MMMM d, yyyy 'at' h:mm a")}
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-balance text-3xl font-bold leading-tight md:text-4xl">
          {article.title}
        </h1>

        {/* Author */}
        {article.author && (
          <div className="mb-8 flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>By {article.author}</span>
          </div>
        )}

        {/* Description */}
        {article.description && (
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            {article.description}
          </p>
        )}

        <Separator className="my-8" />

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {article.content ? (
            article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="leading-relaxed">
              {article.description}
            </p>
          )}
        </div>

        {/* Source Link */}
        <Card className="mt-8">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Continue reading on</p>
              <p className="font-medium">{article.source.name}</p>
            </div>
            <Button asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Read Full Article
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export function generateStaticParams() {
  return mockArticles.map((article) => ({
    id: article.id,
  }))
}
