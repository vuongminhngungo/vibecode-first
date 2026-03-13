import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4">
        <Skeleton className="mb-2 h-4 w-16" />
        <Skeleton className="mb-2 h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
      </CardContent>
      <CardFooter className="border-t px-4 py-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="ml-auto h-4 w-16" />
      </CardFooter>
    </Card>
  )
}

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TimelineItemSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-full w-0.5" />
      </div>
      <div className="flex-1 pb-8">
        <Skeleton className="mb-2 h-4 w-24" />
        <Card>
          <CardContent className="flex gap-4 p-4">
            <Skeleton className="h-20 w-28 shrink-0 rounded-md" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function TimelineSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }).map((_, i) => (
        <TimelineItemSkeleton key={i} />
      ))}
    </div>
  )
}

export function MapSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-[2/1] w-full" />
      </CardContent>
    </Card>
  )
}
