import { motion, AnimatePresence } from "framer-motion";
import { useCustomerDashboard } from "../../hooks/dashboard/useCustomerDashboard";
import { useDarkMode } from "../../context/DarkModeContext";
import { useState } from "react";
import { FiPlus, FiCalendar } from "react-icons/fi";

// Import components
import { FloatingOrbs } from "./customer/FloatingOrbs";
import { DashboardHeader } from "./customer/DashboardHeader";
import { SummaryCard } from "./customer/SummaryCard";
import { NextAppointment } from "./customer/NextAppointment";
import { RecentActivity } from "./customer/RecentActivity";
import { StatusTabs } from "./customer/StatusTabs";
import { BookingCard } from "./customer/BookingCard";
import ReviewModal from "./customer/ReviewModal";
import { useUserProfile } from "../../hooks/auth/useAuth";

export default function CustomerDashboard() {
  const { data: user } = useUserProfile();
  const userId = user?._id || user?.id;

  const { bookings, isLoading } = useCustomerDashboard(userId);
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedBooking(null);
    setShowReviewModal(false);
  };

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.date) > new Date() && b.status !== "cancelled"
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "cancelled"
  ).length;

  const nextAppointment = bookings
    .filter((b) => new Date(b.date) > new Date() && b.status !== "cancelled")
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const recentActivity = bookings
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  if (isLoading) return <LoadingSpinner darkMode={darkMode} />;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } overflow-hidden relative`}
    >
      {darkMode && <FloatingOrbs />}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader user={user} bookings={bookings} darkMode={darkMode} />

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="Total Bookings"
            value={totalBookings}
            icon="calendar"
            color="blue"
            darkMode={darkMode}
          />
          <SummaryCard
            title="Upcoming"
            value={upcomingBookings}
            icon="clock"
            color="purple"
            delay={0.4}
            darkMode={darkMode}
          />
          <SummaryCard
            title="Cancelled"
            value={cancelledBookings}
            icon="cancel"
            color="red"
            delay={0.5}
            darkMode={darkMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <NextAppointment appointment={nextAppointment} darkMode={darkMode} />
          <RecentActivity activities={recentActivity} darkMode={darkMode} />
        </div>

        <StatusTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
        />

        <AnimatePresence>
          {filteredBookings.length === 0 ? (
            <EmptyState activeTab={activeTab} darkMode={darkMode} />
          ) : (
            <motion.div
              key="bookings-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  darkMode={darkMode}
                  openReviewModal={handleOpenReviewModal}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showReviewModal && selectedBooking && (
        <ReviewModal
          booking={selectedBooking}
          onClose={handleCloseReviewModal}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

const LoadingSpinner = ({ darkMode }) => (
  <div
    className={`min-h-screen flex items-center justify-center ${
      darkMode ? "bg-gray-900" : "bg-gray-50"
    }`}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`w-12 h-12 border-4 ${
        darkMode ? "border-blue-500" : "border-blue-600"
      } border-t-transparent rounded-full`}
    />
  </div>
);

const EmptyState = ({ activeTab, darkMode }) => (
  <motion.div
    key="empty-state"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4 }}
    className={`rounded-3xl shadow-xl p-12 text-center ${
      darkMode
        ? "bg-gray-800/50 backdrop-blur-lg border border-gray-700/30"
        : "bg-white border border-gray-200"
    }`}
  >
    <div
      className={`text-5xl mb-4 ${
        darkMode ? "text-gray-600" : "text-gray-300"
      }`}
    >
      <FiCalendar />
    </div>
    <h3
      className={`text-lg font-medium mb-2 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      No {activeTab === "all" ? "" : activeTab} bookings found
    </h3>
    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
      {activeTab === "all"
        ? "You don't have any bookings yet."
        : `You don't have any ${activeTab} bookings.`}
    </p>
  </motion.div>
);
