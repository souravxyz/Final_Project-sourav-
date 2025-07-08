import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function BookingPagination({
  darkMode,
  currentPage,
  totalPages,
  setCurrentPage,
  paginatedRows,
  filteredRows,
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center mt-8 pt-5 border-t ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div
        className={`text-sm mb-3 sm:mb-0 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Showing {paginatedRows.length} of {filteredRows.length} bookings
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          } text-sm transition-colors`}
        >
          <FiChevronLeft size={16} /> Previous
        </button>

        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          } text-sm transition-colors`}
        >
          Next <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
