"use client"

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ConflictRegion } from "@/lib/types"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface WorldMapProps {
  regions: ConflictRegion[]
}

export function WorldMap({ regions }: WorldMapProps) {
  const getSeverityColor = (severity: ConflictRegion["severity"]) => {
    switch (severity) {
      case "high":
        return "fill-red-500"
      case "medium":
        return "fill-orange-500"
      case "low":
        return "fill-yellow-500"
      default:
        return "fill-primary"
    }
  }

  const getSeveritySize = (severity: ConflictRegion["severity"]) => {
    switch (severity) {
      case "high":
        return 12
      case "medium":
        return 10
      case "low":
        return 8
      default:
        return 8
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Global Conflict Map</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[2/1] w-full bg-muted/30">
          <ComposableMap
            projectionConfig={{
              scale: 147,
              center: [0, 20],
            }}
            className="h-full w-full"
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="fill-muted stroke-border outline-none transition-colors hover:fill-muted-foreground/20"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {regions.map((region) => (
                <Marker
                  key={region.id}
                  coordinates={[region.coordinates[1], region.coordinates[0]]}
                >
                  <g className="cursor-pointer">
                    <circle
                      r={getSeveritySize(region.severity) + 4}
                      className={`${getSeverityColor(region.severity)} opacity-30`}
                    />
                    <circle
                      r={getSeveritySize(region.severity)}
                      className={getSeverityColor(region.severity)}
                    />
                    <title>{`${region.name}: ${region.articleCount} articles`}</title>
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div className="border-t p-4">
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Badge
                key={region.id}
                variant="secondary"
                className="gap-1.5"
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    region.severity === "high"
                      ? "bg-red-500"
                      : region.severity === "medium"
                      ? "bg-orange-500"
                      : "bg-yellow-500"
                  }`}
                />
                {region.name}
                <span className="text-muted-foreground">({region.articleCount})</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
