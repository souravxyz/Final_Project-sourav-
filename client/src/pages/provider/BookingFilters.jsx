import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";

export default function BookingFilters({
  darkMode,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredRows,
  rows,
}) {
  const statusOptions = [
    { value: "all", label: "All Bookings" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div
      className={`sticky top-0 z-10 mb-6 p-4 rounded-xl shadow-sm ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-100"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch
              className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>
          <input
            type="text"
            placeholder="Search by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:ring-purple-500"
                : "bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-200 focus:ring-purple-500"
            } border focus:outline-none focus:ring-1`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX
                className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <div
            className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            } border`}
          >
            <FiFilter
              className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`appearance-none bg-transparent pr-6 cursor-pointer text-sm focus:outline-none ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {statusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={darkMode ? "bg-gray-700 text-gray-100" : ""}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <FiChevronDown
              className={`absolute right-3 pointer-events-none ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>

          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={clearFilters}
              className={`px-3 py-2.5 rounded-lg text-sm flex items-center gap-1 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              <FiX size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Result Count */}
      {filteredRows.length !== rows.length && (
        <div className="mt-3 text-sm flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Showing {filteredRows.length} of {rows.length} bookings
          </span>
        </div>
      )}
    </div>
  );
}
