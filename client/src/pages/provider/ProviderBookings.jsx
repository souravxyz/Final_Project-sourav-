import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProviderDashboard } from "../../hooks/dashboard/useProviderDashboard";
import { useDarkMode } from "../../context/DarkModeContext";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import BookingFilters from "./BookingFilters";
import BookingsList from "./BookingsList";
import BookingPagination from "./BookingPagination";

export default function ProviderBookings() {
  const { darkMode } = useDarkMode();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const { profileData, bookings, isLoading } = useProviderDashboard(userId);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const bookingsPerPage = 5;

  useEffect(() => {
    if (bookings?.length) {
      setRows(bookings);
      setFilteredRows(bookings);
    }
  }, [bookings]);

  useEffect(() => {
    let result = rows;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.userId?.name?.toLowerCase().includes(term) ||
          booking.service.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    setFilteredRows(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, rows]);

  const totalPages = Math.ceil(filteredRows.length / bookingsPerPage) || 1;
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  if (isLoading) return <LoadingState darkMode={darkMode} />;
  if (!profileData)
    return <p className="text-center mt-20">Provider profile not found.</p>;
  if (!rows.length) return <EmptyState darkMode={darkMode} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`min-h-screen px-4 py-8 max-w-7xl mx-auto ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div className="mb-8 text-center">
        <h2
          className={`text-3xl font-bold mb-2 ${
            darkMode ? "text-purple-300" : "text-purple-600"
          }`}
        >
          Your Bookings
        </h2>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Manage your upcoming and past appointments
        </p>
      </div>

      <BookingFilters
        darkMode={darkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredRows={filteredRows}
        rows={rows}
      />

      <BookingsList darkMode={darkMode} paginatedRows={paginatedRows} />

      {totalPages > 1 && (
        <BookingPagination
          darkMode={darkMode}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          paginatedRows={paginatedRows}
          filteredRows={filteredRows}
        />
      )}
    </motion.div>
  );
}
