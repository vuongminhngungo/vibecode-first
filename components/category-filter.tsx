"use client"

import { Globe, Crosshair, Shield, AlertTriangle } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { NewsCategory } from "@/lib/types"

interface CategoryFilterProps {
  activeCategory: NewsCategory
  onCategoryChange: (category: NewsCategory) => void
}

const categories = [
  { id: "all" as NewsCategory, label: "All News", icon: Globe },
  { id: "world" as NewsCategory, label: "World", icon: Globe },
  { id: "war" as NewsCategory, label: "War", icon: Crosshair },
  { id: "conflict" as NewsCategory, label: "Conflict", icon: AlertTriangle },
  { id: "military" as NewsCategory, label: "Military", icon: Shield },
]

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filter:</span>
      <ToggleGroup
        type="single"
        value={activeCategory}
        onValueChange={(value) => value && onCategoryChange(value as NewsCategory)}
        className="flex-wrap justify-start"
      >
        {categories.map((category) => (
          <ToggleGroupItem
            key={category.id}
            value={category.id}
            aria-label={`Filter by ${category.label}`}
            className="gap-1.5 text-xs"
          >
            <category.icon className="h-3.5 w-3.5" />
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
