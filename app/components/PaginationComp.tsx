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
  // Build visible pages
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    }
  }

  // Insert ellipsis where needed
  const items: (number | "ellipsis")[] = [];

  for (let i = 0; i < pageNumbers.length; i++) {
    if (i > 0 && pageNumbers[i] - pageNumbers[i - 1] > 1) {
      items.push("ellipsis");
    }

    items.push(pageNumbers[i]);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {items.map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`?page=${item}`}
                isActive={item === currentPage}
              >
                {item < 10 ? `0${item}` : item}
              </PaginationLink>
            )}
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
