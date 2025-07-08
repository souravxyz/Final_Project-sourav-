import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useDarkMode } from "../../context/DarkModeContext";
import DashboardHeader from "./provider/DashboardHeader";
import ProfileSummary from "./provider/ProfileSummary";
import BookingsSection from "./provider/BookingsSection";
import ReviewsSection from "./provider/ReviewsSection";
import EditProfileModal from "./provider/EditProfileModal";

import {
  useProviderProfileMutation,
  useProviderDashboard,
} from "../../hooks/dashboard/useProviderDashboard";
import { useUpdateBookingStatus } from "../../hooks/bookings/useBooking";
import { useUserProfile } from "../../hooks/auth/useAuth";

export default function ProviderDashboard() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  // ✅ Fetch current user first
  const { data: user, isLoading: userLoading } = useUserProfile();

  // ✅ Now fetch the provider dashboard
  const {
    profileData: providerProfile,
    bookings,
    reviews,
    isLoading: isDashboardLoading,
  } = useProviderDashboard(user?._id);

  const isLoading = userLoading || isDashboardLoading;

  const isProfileIncomplete =
    !providerProfile ||
    !providerProfile.location ||
    providerProfile.services?.length === 0 ||
    !providerProfile.charges;

  const providerId = providerProfile?._id;

  const updateStatusMutation = useUpdateBookingStatus();

  const [myProfile, setMyProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const profileMutation = useProviderProfileMutation();

  const { register, handleSubmit, control, reset, setValue } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  useEffect(() => {
    if (providerProfile) {
      setMyProfile(providerProfile);
      reset({
        bio: providerProfile.bio || "",
        location: providerProfile.location || "",
        services: providerProfile.services?.join(", ") || "",
        charges: providerProfile.charges || 0,
        availability: providerProfile.availability || [{ day: "", slots: [] }],
      });
    }
  }, [providerProfile, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      services:
        typeof data.services === "string"
          ? data.services
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : data.services,
      charges: Number(data.charges) || 0,
    };

    profileMutation.mutate(formattedData, {
      onSuccess: () => {
        setShowEditModal(false);
        toast.success("Profile updated successfully!");
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          user={providerProfile?.user}
          myProfile={myProfile}
          reviews={reviews}
          providerId={providerId}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setShowEditModal={setShowEditModal}
          isProfileIncomplete={isProfileIncomplete}
        />

        <div className="mt-8 space-y-8">
          <ProfileSummary myProfile={myProfile} darkMode={darkMode} />
          <BookingsSection
            bookings={bookings || []}
            darkMode={darkMode}
            updateStatusMutation={updateStatusMutation}
          />
          <ReviewsSection reviews={reviews || []} darkMode={darkMode} />
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          myProfile={myProfile}
          user={providerProfile?.user}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          onSubmit={onSubmit}
          control={control}
          setValue={setValue}
          profileMutation={profileMutation}
          fields={fields}
          append={append}
          remove={remove}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
