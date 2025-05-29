// src/app/dashboard/students/components/Pagination.tsx

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        上一頁
      </button>
      <span className="px-3 py-1 text-gray-700">
        第 {currentPage} 頁 / 共 {totalPages} 頁
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        下一頁
      </button>
    </div>
  );
}