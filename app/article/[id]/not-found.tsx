import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ArticleNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">Article Not Found</h1>
      <p className="mt-2 text-center text-muted-foreground">
        The article you are looking for does not exist or has been removed.
      </p>
      <Button asChild className="mt-6">
        <Link href="/home">Return to Home</Link>
      </Button>
    </div>
  )
}
