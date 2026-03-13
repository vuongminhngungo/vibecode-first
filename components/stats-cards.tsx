"use client"

import { Globe, AlertTriangle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardsProps {
  totalArticles: number
  conflictArticles: number
  lastUpdated: string
  trendingTopics: number
}

export function StatsCards({
  totalArticles,
  conflictArticles,
  lastUpdated,
  trendingTopics,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Total Articles",
      value: totalArticles.toLocaleString(),
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Conflict Reports",
      value: conflictArticles.toLocaleString(),
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Last Updated",
      value: lastUpdated,
      icon: Clock,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Active Regions",
      value: trendingTopics.toString(),
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
  )
}
