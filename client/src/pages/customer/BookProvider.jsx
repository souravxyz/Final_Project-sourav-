import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  useCreateBooking,
  useBookedSlots,
} from "../../hooks/bookings/useBooking";
import { FiCalendar, FiClock, FiCheck, FiX, FiLoader } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useProviderProfile } from "../../hooks/auth/useProviderProfile";
import { getImageUrl } from "../../utils/getImageUrl";
import { toast } from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// Razorpay dynamic script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function BookProvider() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const queryClient = useQueryClient();
  const { width, height } = useWindowSize();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;
  const { data: provider } = useProviderProfile(providerId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedDate = watch("date");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);

  const { data: bookedSlots = [] } = useBookedSlots(providerId, selectedDate);
  const createBooking = useCreateBooking();

  // Generate time slots from 8AM to 8PM in 30 minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const allSlots = generateTimeSlots();

  // Floating particles effect
  useEffect(() => {
    const particles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      color: darkMode
        ? `hsla(${Math.random() * 60 + 200}, 80%, 60%, 0.3)`
        : `hsla(${Math.random() * 60 + 200}, 80%, 60%, 0.2)`,
    }));
    setParticles(particles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX) % 100,
          y: (p.y + p.speedY) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [darkMode]);

  const handlePayment = async (bookingData) => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?", {
        position: "bottom-center",
        style: {
          background: darkMode ? "#1f2937" : "#fff",
          color: darkMode ? "#fff" : "#1f2937",
        },
      });
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: (provider?.charges || 500) * 100,
      currency: "INR",
      name: "Book My Service",
      description: `Booking for ${bookingData.service}`,
      image: "/logo.png",
      handler: function (response) {
        setShowConfetti(true);
        toast.success("Payment Successful! Booking confirmed.", {
          position: "bottom-center",
          style: {
            background: darkMode ? "#1f2937" : "#fff",
            color: darkMode ? "#fff" : "#1f2937",
          },
        });

        createBooking.mutate(bookingData, {
          onSuccess: () => {
            queryClient.invalidateQueries(["customerBookings", userId]);
            setTimeout(() => {
              navigate("/customer/dashboard");
            }, 3000);
          },
        });
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#6366f1",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const onSubmit = (data) => {
    if (!userId) {
      toast.error("Please login to book a service", {
        position: "bottom-center",
        style: {
          background: darkMode ? "#1f2937" : "#fff",
          color: darkMode ? "#fff" : "#1f2937",
        },
      });
      navigate("/login");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a time slot", {
        position: "bottom-center",
        style: {
          background: darkMode ? "#1f2937" : "#fff",
          color: darkMode ? "#fff" : "#1f2937",
        },
      });
      return;
    }

    const bookingData = {
      ...data,
      userId,
      providerId,
      time: selectedSlot,
    };

    handlePayment(bookingData);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setValue("time", slot);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } relative overflow-hidden`}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          onConfettiComplete={() => setShowConfetti(false)}
          colors={["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"]}
        />
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `scale(${
                Math.sin(Date.now() / 1000 + particle.id) * 0.3 + 0.7
              })`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl ${
            darkMode ? "bg-gray-800/70 backdrop-blur-sm" : "bg-white"
          } shadow-2xl overflow-hidden border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="grid md:grid-cols-2">
            {/* Provider Info */}
            <div
              className={`p-8 ${darkMode ? "bg-gray-800/80" : "bg-gray-50"}`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 mb-8"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20"></div>
                  <img
                    src={
                      provider?.user?.profilePic
                        ? getImageUrl(provider.user.profilePic)
                        : "/default.jpg"
                    }
                    alt={provider?.user?.name}
                    className="relative z-10 w-20 h-20 rounded-full object-cover border-2 border-gray-600/50"
                  />
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {provider?.user?.name || "Loading..."}
                  </h2>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    {provider?.services?.join(", ") || "Service Provider"}
                  </p>
                </div>
              </motion.div>

              <div className="space-y-6">
                {/* Date Picker */}
                <div>
                  <h3
                    className={`text-lg font-semibold mb-4 flex items-center ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    <FiCalendar className="mr-2" />
                    Select Date
                  </h3>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date", { required: "Please select a date" })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3
                      className={`text-lg font-semibold mb-4 flex items-center ${
                        darkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      <FiClock className="mr-2" />
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {allSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = selectedSlot === slot;
                        return (
                          <motion.button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => handleSlotSelect(slot)}
                            onHoverStart={() =>
                              !isBooked && setHoveredSlot(slot)
                            }
                            onHoverEnd={() => setHoveredSlot(null)}
                            whileHover={!isBooked ? { scale: 1.05 } : {}}
                            whileTap={!isBooked ? { scale: 0.95 } : {}}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                              isBooked
                                ? darkMode
                                  ? "bg-gray-700/20 text-gray-500 cursor-not-allowed"
                                  : "bg-gray-200/80 text-gray-500 cursor-not-allowed"
                                : isSelected
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                                : darkMode
                                ? hoveredSlot === slot
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-700/50 text-gray-300"
                                : hoveredSlot === slot
                                ? "bg-gray-200 text-gray-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {isBooked ? (
                              <span className="flex items-center justify-center gap-1">
                                <FiX className="text-red-400" />
                                {slot}
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-1">
                                {isSelected && (
                                  <FiCheck className="text-white" />
                                )}
                                {slot}
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.time.message}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Complete Your Booking
              </motion.h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label
                    className={`block mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Service Needed
                  </label>
                  <input
                    type="text"
                    {...register("service", {
                      required: "Please specify the service",
                    })}
                    placeholder="e.g. AC Repair, Plumbing, Electrical Work"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                  />
                  {errors.service && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.service.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label
                    className={`block mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Special Instructions
                  </label>
                  <textarea
                    {...register("additionalNotes")}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="Any special requirements or details..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700/50" : "bg-blue-50"
                  }`}
                >
                  <p
                    className={`text-lg font-semibold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    Service Charges: ₹{provider?.charges || 0}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Payment will be processed securely via Razorpay
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={createBooking.isLoading || !selectedSlot}
                    whileHover={
                      !createBooking.isLoading && selectedSlot
                        ? {
                            scale: 1.02,
                            boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)",
                          }
                        : {}
                    }
                    whileTap={
                      !createBooking.isLoading && selectedSlot
                        ? { scale: 0.98 }
                        : {}
                    }
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all relative overflow-hidden ${
                      createBooking.isLoading || !selectedSlot
                        ? darkMode
                          ? "bg-gray-500/30 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    }`}
                  >
                    {createBooking.isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <FiLoader className="animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">Confirm Booking</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 hover:opacity-100 transition-opacity"></span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
