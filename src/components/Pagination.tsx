"use client"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}: PaginationProps) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
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

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-200
          ${currentPage <= 1
            ? "border-slate-300 text-slate-400 cursor-not-allowed"
            : "border-slate-400 text-slate-600 hover:bg-slate-50 hover:border-fuchsia-500 hover:text-fuchsia-600"
          }
        `}
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={`page_${index}`}>
            {page === "..." ? (
              <span className="px-3 py-2 text-slate-500">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`
                  w-10 h-10 rounded-md border transition-all duration-200
                  ${currentPage === page
                    ? "bg-fuchsia-600 border-fuchsia-600 text-white"
                    : "border-slate-400 text-slate-600 hover:bg-slate-50 hover:border-fuchsia-500 hover:text-fuchsia-600"
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
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-200
          ${currentPage >= totalPages
            ? "border-slate-300 text-slate-400 cursor-not-allowed"
            : "border-slate-400 text-slate-600 hover:bg-slate-50 hover:border-fuchsia-500 hover:text-fuchsia-600"
          }
        `}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}
