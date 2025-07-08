import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useCustomerBookings } from "../../hooks/dashboard/useCustomerDashboard";
import { useCancelBooking } from "../../hooks/bookings/useBooking";
import { useForm } from "react-hook-form";
import { useReview } from "../../hooks/review/useReview";
import { useQueryClient } from "@tanstack/react-query";
import { useDarkMode } from "../../context/DarkModeContext";
import BookingsControls from "../customer/bookings/BookingControls";
import BookingsList from "../customer/bookings/BookingList";
import ReviewModal from "../customer/bookings/ReviewModal";

import "react-toastify/dist/ReactToastify.css";
import { useUserProfile } from "../../hooks/auth/useAuth";

export default function MyBookings() {
  const { darkMode } = useDarkMode();
  const { data: user, isLoading: userLoading } = useUserProfile();
  const userId = user?._id || user?.id;
  const queryClient = useQueryClient();
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useCustomerBookings(userId);
  const cancelMutation = useCancelBooking(userId);

  const reviewMutation = useReview();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProviderId, setCurrentProviderId] = useState(null);
  const [hoveredBooking, setHoveredBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelMutation.mutate(bookingId, {
        onSuccess: () => {
          toast.success("Booking cancelled");
          queryClient.invalidateQueries(["customerBookings", userId]);
        },
        onError: () => {
          toast.error("Failed to cancel booking");
        },
      });
    }
  };

  const handleReviewSubmit = (data) => {
    reviewMutation.mutate(
      {
        ...data,
        userId,
        providerId: currentProviderId,
        bookingId: selectedBooking?._id,
      },
      {
        onSuccess: () => {
          setShowModal(false);
          reset();
          queryClient.invalidateQueries(["customerBookings", userId]);
        },
      }
    );
  };

  const handleExport = () => {
    const exportData = filteredBookings.map((booking) => ({
      Service: booking.service,
      Provider: booking.providerId?.user?.name,
      Date: dayjs(booking.date).format("MMM D, YYYY"),
      Time: booking.time,
      Status: booking.status,
      Price: booking.price || "N/A",
    }));

    alert(
      `Exported data for ${exportData.length} bookings:\n\n${JSON.stringify(
        exportData,
        null,
        2
      )}`
    );
  };

  useEffect(() => {
    let result = bookings;

    if (filter === "upcoming") {
      result = result.filter((b) =>
        dayjs(`${b.date} ${b.time}`).isAfter(dayjs())
      );
    } else if (filter === "past") {
      result = result.filter((b) =>
        dayjs(`${b.date} ${b.time}`).isBefore(dayjs())
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.providerId?.user?.name?.toLowerCase().includes(term) ||
          b.service?.toLowerCase().includes(term) ||
          b.status?.toLowerCase().includes(term)
      );
    }

    setFilteredBookings(result);
  }, [bookings, filter, searchTerm]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl font-bold mb-6 text-center ${
            darkMode
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              : "text-gray-900"
          }`}
        >
          My Bookings
        </motion.h2>
        <BookingsControls
          darkMode={darkMode}
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          refetch={refetch}
          handleExport={handleExport}
        />

        <BookingsList
          darkMode={darkMode}
          filteredBookings={filteredBookings}
          hoveredBooking={hoveredBooking}
          setHoveredBooking={setHoveredBooking}
          handleCancel={handleCancel}
          setCurrentProviderId={setCurrentProviderId}
          setSelectedBooking={setSelectedBooking}
          setShowModal={setShowModal}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <ReviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        darkMode={darkMode}
        selectedBooking={selectedBooking}
        handleSubmit={handleSubmit(handleReviewSubmit)}
        register={register}
        errors={errors}
        reviewMutation={reviewMutation}
      />
    </div>
  );
}
