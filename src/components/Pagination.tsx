import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, maxPage, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);
  
  const visiblePages = pages.filter(page => {
    if (maxPage <= 5) return true;
    if (page === 1 || page === maxPage) return true;
    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
    return false;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 glass-effect rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} className="text-gray-300" />
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          const isGap = index > 0 && page - visiblePages[index - 1] > 1;

          return (
            <div key={page} className="flex items-center">
              {isGap && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`
                  min-w-[40px] h-10 glass-effect rounded-lg transition-colors
                  ${currentPage === page 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'hover:bg-white/20 text-gray-300'
                  }
                `}
              >
                {page}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPage}
        className="p-2 glass-effect rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={20} className="text-gray-300" />
      </button>
    </div>
  );
}