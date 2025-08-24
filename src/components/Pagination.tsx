"use client"

import { ChevronIcon } from "./icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const MAX_NAVIGABLE_PAGE_INDEX = 500;

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}: PaginationProps) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Limit total pages to the maximum navigable page index
  const limitedTotalPages = Math.min(totalPages, MAX_NAVIGABLE_PAGE_INDEX);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= limitedTotalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 1; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(limitedTotalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < limitedTotalPages - 1) {
      rangeWithDots.push("...", limitedTotalPages);
    } else if (limitedTotalPages > 1) {
      rangeWithDots.push(limitedTotalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center max-w-[90%] mx-auto justify-center gap-4 ${className} scale-[80%] md:scale-100`}>
      {/* Previous button */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
            rotate-180
            ${currentPage <= 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:text-brand/70 hover:bg-slate-300"
            }
          `}
          aria-label="Previous page"
        >
          <ChevronIcon />
        </button>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {visiblePages.map((page, index) => (
          <div key={`page_${index}`}>
            {page === "..." ? (
              <span className="px-3 py-2 text-slate-500">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-none
                  ${currentPage === page 
                    ? "bg-brand text-white"
                    : "text-lg font-medium  hover:text-brand  hover:bg-slate-300"
                  }
                `}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next button */}
      {currentPage < limitedTotalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= limitedTotalPages}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
            ${currentPage >= limitedTotalPages
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:text-brand/70 hover:bg-slate-300"
            }
          `}
          aria-label="Next page"
        >
          <ChevronIcon />
        </button>
      )}
    </div>
  );
}
