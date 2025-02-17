import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function Pagination({ currentPage, totalPages, hasNextPage, hasPrevPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Button variant="outline" size="icon" asChild disabled={!hasPrevPage}>
        <Link href={`/blog?page=${currentPage - 1}`}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button key={page} variant={currentPage === page ? "default" : "outline"} size="icon" asChild>
            <Link href={`/blog?page=${page}`}>{page}</Link>
          </Button>
        ))}
      </div>

      <Button variant="outline" size="icon" asChild disabled={!hasNextPage}>
        <Link href={`/blog?page=${currentPage + 1}`}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Link>
      </Button>
    </div>
  )
}

