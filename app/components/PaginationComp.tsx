import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationComp({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={currentPage == page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
