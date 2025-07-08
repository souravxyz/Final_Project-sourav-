import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProviderBookings,
  getProviderReviews,
  getProviderByUserId,
  saveProviderProfile,
  getAllProviders,
} from "../../api/apiHandler";

export const useProviderDashboard = (userId) => {
  // First, fetch provider profile by userId
  const profileQuery = useQuery({
    queryKey: ["providerProfile", userId],
    queryFn: () => getProviderByUserId(userId),
    enabled: !!userId,
  });

  const providerId = profileQuery.data?._id;

  const bookingsQuery = useQuery({
    queryKey: ["providerBookings", providerId],
    queryFn: () => getProviderBookings(providerId),
    enabled: !!providerId,
  });

  const reviewsQuery = useQuery({
    queryKey: ["providerReviews", providerId],
    queryFn: () => getProviderReviews(providerId),
    enabled: !!providerId,
  });

  return {
    profileData: profileQuery.data || null,
    bookings: bookingsQuery.data || [],
    reviews: reviewsQuery.data || [],
    isLoading:
      profileQuery.isLoading ||
      bookingsQuery.isLoading ||
      reviewsQuery.isLoading,
  };
};

export const useProviderProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveProviderProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providerProfile"] });
      alert("Profile saved successfully");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to save profile");
    },
  });
};

export const useProviders = (filters) => {
  return useQuery({
    queryKey: ["providers", filters],
    queryFn: () => getAllProviders(filters),
    keepPreviousData: true,
  });
};
